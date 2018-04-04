pragma solidity ^0.4.18;

import "./dependencies/Ownable.sol";
import "./dependencies/interfaces.sol";
import "./dependencies/ReentrancyGuard.sol";
import "./dependencies/SafeMath.sol";
import "./dependencies/Types.sol";

contract LotteryFactory is Ownable {

  using SafeMath for uint256;
  using Types for *;
  uint256 public jackpot;
  uint256 public bank;
  address[] public lotteries;
  mapping (address => bool) public activeLotteries;
  mapping (address => Types.Ticket[]) public multiDrawsTickets;
  mapping (address => uint) public numEndDraws;
  mapping (uint8 => uint) public dataDraws;
  address public token;
  address public adrRef;
  bool public activeLottery;
  ERC20Interface betToken;
  RefInterface referrer;


  function LotteryFactory(address _token, address _ref) public {
    token = _token;
    adrRef = _ref;
    betToken = ERC20Interface(_token);
    referrer = RefInterface(_ref);
    dataDraws[5] = 150;
    dataDraws[10] = 200;
    dataDraws[25] = 225;
    dataDraws[52] = 250;
  }

  function createLottery(
  uint256 _sellOverBlock,
  uint256 _stopLotteryBlock,
  uint256 _closeLotteryBlock
  ) public onlyOwner
  {
    require(!activeLottery);
    jackpot = betToken.balanceOf(this) - bank;
    require(betToken.balanceOf(this) >= jackpot);
    address newLottery = new Lottery(token, adrRef, owner, _sellOverBlock, _stopLotteryBlock, _closeLotteryBlock, jackpot, bank);
    activeLotteries[newLottery] = true;
    lotteries.push(newLottery);
    activeLottery = true;
    if (bank > 0) {
      betToken.transfer(newLottery, bank);
    }
  }

  function payJackpot(address _to, uint256 _value) public {
    require(activeLotteries[msg.sender]);
    betToken.transfer(_to, _value);
  }

  function closeLottery(uint256 _bank,  uint256 _jackpot) public {
    require(activeLotteries[msg.sender]);
    jackpot = jackpot.add(_jackpot);
    bank = bank.add(_bank);
    activeLottery = false;
    activeLotteries[msg.sender] = false;
  }

  function buyMultidraw(uint8 _numberOfTickets, uint8[] _tickets, bool _pp, uint8 _numDraws) public {
    require(numEndDraws[msg.sender] < getLengthLotteries());
    require(_numDraws <= 52);
    require(_numberOfTickets == 5 || _numberOfTickets == 10 || _numberOfTickets == 25 || _numberOfTickets == 52);
    delete multiDrawsTickets[msg.sender];
    numEndDraws[msg.sender] = getLengthLotteries() + _numDraws;
    uint256 tokenAmount = 2 ether * uint256(_numberOfTickets);
    if (_pp == true) {
      tokenAmount += 1 ether * uint(_numberOfTickets);
    }
    tokenAmount = tokenAmount.mul(_numDraws).mul(dataDraws[_numDraws]).div(1000);
    require(betToken.allowance(msg.sender, this) >= tokenAmount);

    address ref;
    (, ref) = referrer.getService(msg.sender);
    if(ref != 0){
      uint256 rewardRef = tokenAmount.mul(16).div(100);
      betToken.transfer(msg.sender, rewardRef);
      tokenAmount -= rewardRef;
    }

    betToken.transferFrom(msg.sender, this, tokenAmount);
    bank = bank.add(tokenAmount);
    for (uint8 i = 0; i < uint(_numberOfTickets) * 6; i += 6) {
      require((_tickets[i] <= 69 && _tickets[i] >= 0) &&
      (_tickets[i+1] <= 69 && _tickets[i+1] >= 0) &&
      (_tickets[i+2] <= 69 && _tickets[i+2] >= 0) &&
      (_tickets[i+3] <= 69 && _tickets[i+3] >= 0) &&
      (_tickets[i+4] <= 69 && _tickets[i+4] >= 0) &&
      (_tickets[i+5] <= 26 && _tickets[i+5] >= 0));

      multiDrawsTickets[msg.sender].push(Types.Ticket(_tickets[i],
      _tickets[i+1],
      _tickets[i+2],
      _tickets[i+3],
      _tickets[i+4],
      _tickets[i+5],
      _pp));
    }
  }

  function getLengthLotteries() view public returns(uint) {
    return lotteries.length;
  }

  function getLengthMultiDraws(address player) view public returns(uint8) {
    return uint8(multiDrawsTickets[player].length);
  }
  /*
  function getTicketMultiDraws(address player, uint8 index) view public returns(Types.Ticket) {
    return multiDrawsTickets[player][index];
  }*/
  /*
  function getTicketMultiDraws(address player, uint8 index) view public returns(uint8, uint8, uint8, uint8, uint8, uint8, bool) {
    return (multiDrawsTickets[player][index].wb1, 
    multiDrawsTickets[player][index].wb2, 
    multiDrawsTickets[player][index].wb3, 
    multiDrawsTickets[player][index].wb4, 
    multiDrawsTickets[player][index].wb5, 
    multiDrawsTickets[player][index].rb, 
    multiDrawsTickets[player][index].pp);
  }*/

  function getNumEndDraws(address player) view public returns(uint) {
    return numEndDraws[player];
  }
}

contract Lottery is Ownable, ReentrancyGuard {

  using SafeMath for uint256;
  using Types for *;

  uint8 _seed = 0;

  mapping (uint8 => uint) public dataPrize; // 50 => 1000000, 41 => 50000, ......
  mapping (address => Types.Ticket[]) public usersTickets;
  mapping (uint8 => uint) public dataPowerPlay;
  uint256 public jackpot;
  uint256 public bank;
  address lotteryManager;
  Types.Ticket public winTicket;
  ERC20Interface betToken;
  RefInterface referrer;
  LotteryFactory factory;
  uint256 public sellOverBlock; // after this block new tickets will not accepted
  uint256 public stopLotteryBlock; // before this block wiiner's tikcet must be choosen
  uint256 public closeLotteryBlock; // all players must get their reward before this block
  uint256 public blockForRandom;  //  this block will be use as a seed
  uint256 public numberOfTickets;
  uint8 public multiplier; // coefficient for calculating winnings from a powerplay 
  address adrFactory;
  bool public winTicketChoosen;

  address[] jackpotWinners;


  modifier onlyOwnerOrLotteryManager() {
    require(msg.sender == owner || msg.sender == lotteryManager);
    _;
  }

  modifier sellIsActive() {
    require(block.number < sellOverBlock);
    _;
  }

  modifier sellFinished() {
    require(block.number > sellOverBlock);
    _;
  }

  modifier rewardAllowed() {
    require(winTicketChoosen && block.number < closeLotteryBlock);
    _;
  }


  function Lottery(address _token,
  address _ref,
  address _owner,
  uint256 _sellOverBlock,
  uint256 _stopLotteryBlock,
  uint256 _closeLotteryBlock,
  uint256 _jackpot,
  uint256 _bank) public
  {
    //require(_sellOverBlock + 249 < _stopLotteryBlock && _stopLotteryBlock + 5952 < _closeLotteryBlock); // 5952 = 1 day
    require(_sellOverBlock + 29 < _stopLotteryBlock && _stopLotteryBlock + 29 < _closeLotteryBlock); // for test
    betToken = ERC20Interface(_token);
    referrer = RefInterface(_ref);
    factory = LotteryFactory(msg.sender);
    dataPrize[50] = 1000000 ether; // 1/11,688,053.52
    dataPrize[41] = 50000 ether; // 1/913,129.18
    dataPrize[40] = 100 ether; // 1/36,525.17
    dataPrize[31] = 100 ether; // 1/14,494.11
    dataPrize[30] = 7 ether; // 1/579.76
    dataPrize[21] = 7 ether; // 1/701.33
    dataPrize[11] = 4 ether; // 1/91.98
    dataPrize[1] = 4 ether; // 1/38.32
    dataPrize[0] = 0;
    dataPowerPlay[0] = 1;
    dataPowerPlay[1] = 2;
    dataPowerPlay[2] = 3;
    dataPowerPlay[3] = 4;
    dataPowerPlay[4] = 5;
    dataPowerPlay[5] = 10;
    owner = _owner;
    sellOverBlock = _sellOverBlock;
    stopLotteryBlock = _stopLotteryBlock;
    closeLotteryBlock = _closeLotteryBlock;
    //blockForRandom = sellOverBlock + 248; // 248 blocks = 1 hour
    blockForRandom = sellOverBlock + 2; // for tests
    uint8 rnd = random(43,block.number); //  1- 10X, 2 - 5X, 3 - 4X, 13-3X, 24 - 2X.
    if(rnd < 2){
      multiplier = 5;
    } else if (rnd < 4){
      multiplier = 4;
    } else if (rnd < 7){
      multiplier = 3;
    } else if (rnd < 20){
      multiplier = 2;
    } else {
      multiplier = 1;
    }

    adrFactory = msg.sender;
    jackpot = _jackpot;
    bank = _bank;
  }

  function setManager(address _manager) public onlyOwner {
    lotteryManager = _manager;
  }

  function buyTicket(uint8 _numberOfTickets, uint8[] _tickets, bool _pp) sellIsActive public {
    uint drawsLength = factory.getLengthMultiDraws(msg.sender);
    require(drawsLength + usersTickets[msg.sender].length + uint256(_numberOfTickets) <= 25);
    uint256 tokenAmount = 2 ether * uint256(_numberOfTickets);
    if (_pp == true) {
      tokenAmount += 1 ether * uint(_numberOfTickets);
    }
    require(betToken.allowance(msg.sender, this) >= tokenAmount);
    address ref;
    (, ref) = referrer.getService(msg.sender);
    if(ref != 0){
      uint256 rewardRef = tokenAmount.mul(16).div(100);
      betToken.transfer(msg.sender, rewardRef);
      tokenAmount -= rewardRef;
    }

    betToken.transferFrom(msg.sender, this, tokenAmount);
    bank = bank.add(tokenAmount);
    numberOfTickets += uint(_numberOfTickets);
    for (uint8 i = 0; i < uint(_numberOfTickets) * 6; i += 6) {
      require((_tickets[i] <= 69 && _tickets[i] >= 0) &&
      (_tickets[i+1] <= 69 && _tickets[i+1] >= 0) &&
      (_tickets[i+2] <= 69 && _tickets[i+2] >= 0) &&
      (_tickets[i+3] <= 69 && _tickets[i+3] >= 0) &&
      (_tickets[i+4] <= 69 && _tickets[i+4] >= 0) &&
      (_tickets[i+5] <= 26 && _tickets[i+5] >= 0));

      usersTickets[msg.sender].push(Types.Ticket(_tickets[i],
      _tickets[i+1],
      _tickets[i+2],
      _tickets[i+3],
      _tickets[i+4],
      _tickets[i+5],
      _pp));
    }
  }

  function random(uint8 upper, uint256 _blockForRandom) internal returns (uint8 randomNumber) { // must be internal
    _seed = uint8(keccak256(block.blockhash(_blockForRandom), _seed));
    return _seed % upper + 1;
  }

  function chooseWinTicket() public {
    require(block.number > blockForRandom);
    uint8[5] memory arRnd;
    uint8 count = 0;
    while(count < 5){
      uint8 rnd = random(69, blockForRandom);
      if(indexOf(arRnd, rnd) == 0){
        arRnd[count] = rnd;
        count ++;
      }
    }
    winTicket.wb1 = arRnd[0];
    winTicket.wb2 = arRnd[1];
    winTicket.wb3 = arRnd[2];
    winTicket.wb4 = arRnd[3];
    winTicket.wb5 = arRnd[4];
    winTicket.rb = random(26, blockForRandom);
    winTicketChoosen = true;
  }

  function indexOf(uint8[5] array, uint8 value) pure internal returns(uint) {
    for (uint8 i = 0; i < array.length; i++) {
      if(array[i] == value){
        return i+1;
      }
    }
    return 0;
  }

  function refund() public nonReentrant {
    require(block.number > stopLotteryBlock && winTicketChoosen == false);
    uint valueToRefund;
    valueToRefund = 2 ether * usersTickets[msg.sender].length; // decimals 8
	  Types.Ticket memory firstTicket = usersTickets[msg.sender][0];
    if (firstTicket.pp == true) {
      valueToRefund += 1 ether * usersTickets[msg.sender].length;
    }
    address ref;
    (, ref) = referrer.getService(msg.sender);
    if(ref != 0){
      uint256 rewardRef = valueToRefund.mul(16).div(100);
      valueToRefund -= rewardRef;
    }

    delete usersTickets[msg.sender];
    betToken.transfer(msg.sender, valueToRefund);
  }
  
  function checkMyTicket(address player) public view returns(uint256[2]) {
    require(winTicketChoosen);
    uint256[2] memory count;
    count[0] = 0;
    count[1] = 0;
    Types.Ticket memory _ticket;
    uint8 wbCount;
    uint8 rbGlobal;
    /*uint8 wb1;
    uint8 wb2;
    uint8 wb3;
    uint8 wb4;
    uint8 wb5;
    uint8 rb;
    bool pp;*/
    uint8 drawsLength = factory.getLengthMultiDraws(player);
    uint8 countTicket = uint8(usersTickets[player].length) + drawsLength;
    bool multidraws = (factory.numEndDraws(player) <= factory.getLengthLotteries());

    for (uint8 i = 0; i < countTicket; i++) {
      if(countTicket > drawsLength && multidraws){
        if(i > drawsLength-1){
          // 1
          //_ticket = factory.getTicketMultiDraws(player, i-drawsLength);

          // 2
          //(wb1, wb2, wb3, wb4, wb5, rb, pp) = factory.getTicketMultiDraws(player, i-drawsLength);
          //_ticket = Types.Ticket(wb1, wb2, wb3, wb4, wb5, rb, pp);

          // 3
          //_ticket = Types.Ticket(factory.getTicketMultiDraws(player, i-drawsLength));
        } else {
          _ticket = usersTickets[player][i];
        }
      } else if(drawsLength > 0 && multidraws){
        //_ticket = factory.getTicketMultiDraws(player, i-drawsLength);

        //(wb1, wb2, wb3, wb4, wb5, rb, pp) = factory.getTicketMultiDraws(player, i-drawsLength);
        //_ticket = Types.Ticket(wb1, wb2, wb3, wb4, wb5, rb, pp);

        //_ticket = Types.Ticket(factory.getTicketMultiDraws(player, i-drawsLength));
      } else {
        _ticket = usersTickets[player][i];
      }
      
      wbCount = 0;
      rbGlobal = 0;
      if (_ticket.wb1 == winTicket.wb1) {
        wbCount++;
      }
      if (_ticket.wb2 == winTicket.wb2) {
        wbCount++;
      }
      if (_ticket.wb3 == winTicket.wb3) {
        wbCount++;
      }
      if (_ticket.wb4 == winTicket.wb4) {
        wbCount++;
      }
      if (_ticket.wb5 == winTicket.wb5) {
        wbCount++;
      }
      if (_ticket.rb == winTicket.rb) {
        rbGlobal = 1;
      }
      uint8 category = wbCount * 10 + rbGlobal;
      if (category == 51) {
          count[1] = 1;
      } else if (_ticket.pp && category == 50) {
		      count[0] = count[0].add(2000000); // match 5 + powerplay
      } else if (_ticket.pp) {
          count[0] = count[0].add(dataPrize[category] * dataPowerPlay[multiplier]); // powerplay
      } else {
          count[0] = count[0].add(dataPrize[category]);
      }
    }
    return count;
  }

  event RewardRecieved(uint256 reward);

  function getReward() public nonReentrant rewardAllowed {
    uint256 reward = checkMyTicket(msg.sender)[0];
    uint256 jack = checkMyTicket(msg.sender)[1];
    delete usersTickets[msg.sender];
    if (jack == 1) {
      jackpotWinners.push(msg.sender);
    } else if (reward > 0) {
      betToken.transfer(msg.sender, reward);
      RewardRecieved(reward);
    }
  }

  function closeLottery() public nonReentrant onlyOwnerOrLotteryManager {
    require(closeLotteryBlock < block.number);
    uint256 tokenAmount = betToken.balanceOf(this);
    serviceReward(tokenAmount);
  }

  function getCurrentBlock() public view returns(uint256) {
    return block.number;
  }

  function getLengthTickets(address _player) public view returns(uint256) {
    return usersTickets[_player].length;
  }

  function serviceReward(uint256 _value) internal {
    uint256 jackpotValue;
    uint256 valueForBank = _value.mul(42).div(100); // 42 % for bank
    uint256 valueForJackpot = _value.mul(42).div(100); // 42 % for Jackpot
    uint256 valueForOwner = _value.mul(16).div(100); // 16 % for owner

    if (jackpotWinners.length > 0) {
      jackpotValue = jackpot.div(jackpotWinners.length);
      for (uint256 i = 0; i < jackpotWinners.length; i++) {
        factory.payJackpot(jackpotWinners[i],jackpotValue);
      }
    }

    betToken.transfer(adrFactory, valueForBank.add(valueForJackpot));
    betToken.transfer(owner, valueForOwner);
    factory.closeLottery(valueForJackpot, valueForBank);
  }
  
  function setWinTicket(uint8 wb1, // only for tests
  uint8 wb2,
  uint8 wb3,
  uint8 wb4,
  uint8 wb5,
  uint8 rb) public {
    winTicket.wb1 = wb1;
    winTicket.wb2 = wb2;
    winTicket.wb3 = wb3;
    winTicket.wb4 = wb4;
    winTicket.wb5 = wb5;
    winTicket.rb = rb;

    winTicketChoosen = true;
  }
}
