const ERC20          = artifacts.require("ERC20")
const Referrer       = artifacts.require("Referrer")
const LotteryFactory = artifacts.require("LotteryFactory")
const Lottery        = artifacts.require("Lottery")
const Miner          = artifacts.require("BlockMiner")

let lotteryAddress = null

const BET = 10**18

const _sellOverBlock     = web3.eth.blockNumber + 40
const _stopLotteryBlock  = _sellOverBlock + 30
const _closeLotteryBlock = _stopLotteryBlock + 30
const _multiplier = 10

let lottery = null

function checkBalance(index) {
  return ERC20.deployed().then(function(contract){
      return contract.balanceOf.call(arrPlayers[index])
    }).then(function(result){
      return result
  })
}

function Mine(addr, numBlocksToMine) {
  return new Promise(async function (resolve) {
    const contract = await Miner.deployed()
    let miners = [];
    for (let ii = 0; ii < numBlocksToMine; ii++) {
      miners.push(contract.mine({from: addr}));
    }
    return Promise.all(miners).then(resolve);
  });
};

let OWNER
let arrPlayers
let referal

function initLottery(accounts) {
  OWNER = accounts[0]
  referal = accounts[1]
  arrPlayers = []

  for(let i = 2; i < 10; i++){
    arrPlayers.push(accounts[i])
  }

  describe.skip('Test block miner', function(){
    const startblock = web3.eth.blockNumber
    const mineblocks = 2
    const endblock   = startblock + mineblocks

    it('mine '+mineblocks+' blocks for start lottery', async function(){
      var tx = await Miner(OWNER, mineblocks)
      assert.equal(web3.eth.blockNumber , endblock, 'miner not work')
    })

  })

  it.skip('Mine blocks for closeLottery', async ()=>{
    const waitBlocks = _stopLotteryBlock - web3.eth.blockNumber
    await Miner(OWNER, waitBlocks)
  })

  describe('init', function(){
    
    it('get BET', function(){
      return ERC20.deployed().then(function(contract){
        accounts.forEach(function(account){
          contract.faucet({from:account})
        })
      })
    })

    it('sent BET to CONTRACT', function(){
      return ERC20.deployed().then(function(contract){
        contract.transfer(LotteryFactory.address, 10*BET)
      })
    })

  })

  describe('check balance', function(){

    it('OWNER BALANCE', function(){
      return ERC20.deployed().then(function(contract){
          return contract.balanceOf.call(OWNER)
        }).then(function(result){
          assert.equal(result.toNumber(), 90*BET, 'invalid balance')
      })
    })

    it('CONTRACT BALANCE', function(){
      return ERC20.deployed().then(function(contract){
          return contract.balanceOf.call(LotteryFactory.address)
        }).then(function(result){
          assert.equal(result.toNumber(), 10 * 10**18, 'invalid balance')
      })
    })
  })

  describe('set referrer', function(){
    let contrRef;
    before(async ()=>{
      contrRef = await Referrer.deployed();
    })

    it('setService', async function(){
      await contrRef.setService(arrPlayers[1], OWNER, referal, {from:OWNER});
    })

    it('getService', async function(){
      return contrRef.getService.call(arrPlayers[1]).then(function(result){
        let _referrer = result[1];
        assert(_referrer == referal, "invalid address referal");
      })
    })
  })

  describe('create lottery', function(){
    let Factory = null
    let erc20;
    let jackpot;
    before(async ()=>{
      Factory = await LotteryFactory.deployed()
      erc20 = await ERC20.deployed();
    })

    it('JACKPOT BALANCE', function(){
      return Factory.jackpot.call().then(function(result){
        jackpot = result.toNumber();
        //assert(jackpot > 0, "jackpot is empty");
      })
    })
    
    it('Check bank and jackpot', function(){
      return erc20.balanceOf.call(Factory.address).then(function(result){
        assert(result.toNumber() >= jackpot, "jackpot > factory balance");
      })
    })
    
    it('deploy lottery from factory', async ()=>{
      await Factory.createLottery(_sellOverBlock, _stopLotteryBlock, _closeLotteryBlock, {from:OWNER})
      lotteryAddress = await Factory.lotteries.call(0)

      assert( lotteryAddress.substr(0,2)=='0x' )
    })

    it('check new Lottery contract owner ', async function(){
      const lottery       = await Lottery.at(lotteryAddress)
      const lottery_owner = await lottery.owner()
      assert( lottery_owner == OWNER )
    })
  })
}

function parseArray(obj) {
  var array = obj;
  var newArray = [];
  
    for (var i = 0; i < array.length; i++) {
    newArray.push(array[i].toNumber());
  }
  
  console.log("ticket:", newArray);
}

contract('general test', function(accounts){

  initLottery(accounts)

  describe('play', function(){

    before(async ()=>{
      lottery = await Lottery.at(lotteryAddress)
    })

    it('Approve lottery contract', async ()=>{
      const erc20 = await ERC20.deployed()
      const playerBalance = (await erc20.balanceOf(arrPlayers[1])).toNumber()
      const allowbet = playerBalance
      const res = await erc20.approve(lotteryAddress, allowbet, {from:arrPlayers[1]})
      const allowed = (await erc20.allowance(arrPlayers[1], lotteryAddress)).toNumber()
      assert.equal(allowed, allowbet, 'allowance error')
    })
    
    it('check balance', function () {
      return ERC20.deployed().then(function(contract){
        return contract.balanceOf.call(arrPlayers[1])
      }).then(function(result){
        assert(result.toNumber()/BET >= 2, "balance = 0");
      })
    })

    it('Buy tickets', async ()=>{
      let powerPlay = (Math.random()>0.5);
      let countTickets = Math.ceil(Math.random()*25);
      let arTickets = [];
      for(let i = 0; i < countTickets*6; i++){
        if(i%6==5){
          arTickets.push(Math.ceil(Math.random()*26))
        }else{
          arTickets.push(Math.ceil(Math.random()*69))
        }
      }
      await lottery.buyTicket(countTickets, arTickets, powerPlay, {from:arrPlayers[1]})
    })

    it('PLAYER BALANCE', function(){
      return ERC20.deployed().then(function(contract){
          return contract.balanceOf.call(arrPlayers[1])
        }).then(function(result){
          //console.log("player balance:", result.toNumber()/BET)
          //assert.equal(result.toNumber(), 90*BET, 'invalid balance')
      })
    })
  })

  describe('Finish lottery', function(){
    it('Mine blocks for closeLottery', async ()=>{
      const waitBlocks = _stopLotteryBlock - web3.eth.blockNumber
      await Mine(OWNER, waitBlocks)
    })

    it('set winner', async() => {
      const res = await lottery.chooseWinTicket({from:OWNER})
      assert((typeof res.receipt === 'object'))
    })

    it.skip('set winner', async() => {
      const res = await lottery.setWinTicket(1,2,3,4,5,1,{from:OWNER})
      //console.log(res.receipt)
      assert((typeof res.receipt === 'object'))
    })

    it('check winner choosen', async() => {
      const boolWinTicket = await lottery.winTicketChoosen({from:OWNER})
      assert((boolWinTicket === true))
    })
  })

  describe('Take reward', function(){

    it('PLAYER BALANCE', function(){
      return ERC20.deployed().then(function(contract){
          return contract.balanceOf.call(arrPlayers[1])
        }).then(function(result){
          console.log("player balance:", result.toNumber()/BET)
      })
    })

    it('Get user/player tickets', async ()=>{
      var wTicket = []
      const winTicket = await lottery.winTicket.call()
      winTicket.forEach((number,i)=>{
        if(typeof(number) == "object"){
          wTicket[i] = number.toNumber()
        }
      })
      console.log('>>>>>>',wTicket)
    })

    it('Get reward', async ()=>{
      const reward = await lottery.getReward({from:arrPlayers[1]})
    })

    it('PLAYER BALANCE', function(){
      return ERC20.deployed().then(function(contract){
          return contract.balanceOf.call(arrPlayers[1])
        }).then(function(result){
          console.log("player balance:", result.toNumber()/BET)
      })
    })
    
    it('close', async() => {
      const waitBlocks = _closeLotteryBlock - web3.eth.blockNumber
      await Mine(OWNER, waitBlocks)
      const closeLot = await lottery.closeLottery({from:OWNER})
    })
    
    it('PLAYER BALANCE', function(){
      return ERC20.deployed().then(function(contract){
          return contract.balanceOf.call(arrPlayers[1])
        }).then(function(result){
          console.log("player balance:", result.toNumber()/BET)
      })
    })

    it('check closed', async() => {
      let Factory = await LotteryFactory.deployed()
      const flag_close = await Factory.activeLotteries.call(lotteryAddress)
      assert.isNotOk(flag_close,'Lottery open!')
    })
  })

})

contract('refund test', function(accounts){

  initLottery(accounts)

  describe('play', function(){
    before(async ()=>{
      lottery = await Lottery.at(lotteryAddress)
    })

    it('Approve lottery contract', async ()=>{
      const erc20 = await ERC20.deployed()
      const playerBalance = (await erc20.balanceOf(arrPlayers[1])).toNumber()
      const allowbet = playerBalance
      const res = await erc20.approve(lotteryAddress, allowbet, {from:arrPlayers[1]})
      const allowed = (await erc20.allowance(arrPlayers[1], lotteryAddress)).toNumber()

      assert.equal(allowed, allowbet, 'allowance error')
    })

    it('PLAYER BALANCE', function(){
      return ERC20.deployed().then(function(contract){
          return contract.balanceOf.call(arrPlayers[1])
        }).then(function(result){
          assert(result.toNumber()/BET >= 2, "balance = 0");
      })
    })

    it('Buy tickets', async ()=>{
      let powerPlay = (Math.random()>0.5);
      let countTickets = Math.ceil(Math.random()*25);
      let arTickets = [];
      for(let i = 0; i < countTickets*6; i++){
        if(i%6==5){
          arTickets.push(Math.ceil(Math.random()*26))
        }else{
          arTickets.push(Math.ceil(Math.random()*69))
        }
      }
      await lottery.buyTicket(countTickets, arTickets, powerPlay, {from:arrPlayers[1]})
    })

    it('PLAYER BALANCE', function(){
      return ERC20.deployed().then(function(contract){
          return contract.balanceOf.call(arrPlayers[1])
        }).then(function(result){
          //console.log(result.toNumber()/BET)
          //assert.equal(result.toNumber(), 90*BET, 'invalid balance')
      })
    })
  })

  describe('Finish lottery', function(){
    
    it('Mine blocks for closeLottery', async ()=>{
      const waitBlocks = _stopLotteryBlock - web3.eth.blockNumber
      await Mine(OWNER, waitBlocks)
    })

    it.skip('set winner', async() => {
      const res = await lottery.chooseWinTicket({from:OWNER})
      assert((typeof res.receipt === 'object'))
    })

    it('check winner choosen', async() => {
      const boolWinTicket = await lottery.winTicketChoosen({from:OWNER})
      assert((boolWinTicket === false))
    })
  })

  describe('Take reward', function(){

    it.skip('Get user/player tickets', async ()=>{
      const ticketsCount = await lottery.checkMyTicket.call(arrPlayers[1])
    })

    it.skip('Get reward', async ()=>{
      const reward = await lottery.getReward({from:arrPlayers[1]})
    })

    it('PLAYER BALANCE', function(){
      return ERC20.deployed().then(function(contract){
          return contract.balanceOf.call(arrPlayers[1])
        }).then(function(result){
          console.log("player balance:", result.toNumber()/BET)
          //assert.equal(result.toNumber(), 90*BET, 'invalid balance')
      })
    })
    

    it('close', async() => {
      const waitBlocks = _closeLotteryBlock - web3.eth.blockNumber + 500
      await Mine(OWNER, waitBlocks)
    })

    it('refund', async ()=>{
      const ref = await lottery.refund({from:arrPlayers[1]})
    })

    it('PLAYER BALANCE', function(){
      return ERC20.deployed().then(function(contract){
          return contract.balanceOf.call(arrPlayers[1])
        }).then(function(result){
          console.log("player balance:", result.toNumber()/BET)
          assert(result.toNumber()/BET >= 2, "balance = 0");
      })
    })

    it('check active lottery', async() => {
      let Factory = await LotteryFactory.deployed()
      const flag_close = await Factory.activeLotteries.call(lotteryAddress)
      console.log(flag_close)
      assert.isOk(flag_close,'Lottery closed!')
      // const waitBlocks = _stopLotteryBlock - web3.eth.blockNumber
      // await Miner(OWNER, waitBlocks)
    })

  })

})