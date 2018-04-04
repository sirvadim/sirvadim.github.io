const WEB3 = require('web3')

const web3 = new WEB3(new WEB3.providers.HttpProvider('https://ropsten.infura.io/jpzl7JZnoS8BsVAkn2oa'))
const abiLotteryFactory = [ { constant: true,
    inputs: [ [Object] ],
    name: 'activeLotteries',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'lotteries',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'jackpot',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'bank',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'owner',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: false,
    inputs: [ [Object] ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'token',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { inputs: [ [Object], [Object] ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor' },
  { anonymous: false,
    inputs: [ [Object], [Object] ],
    name: 'OwnershipTransferred',
    type: 'event' },
  { constant: false,
    inputs: [ [Object], [Object], [Object] ],
    name: 'createLottery',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function' },
  { constant: false,
    inputs: [ [Object], [Object] ],
    name: 'payJackpot',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function' },
  { constant: false,
    inputs: [ [Object], [Object] ],
    name: 'closeLottery',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'getSellOverBlock',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'getStopLotteryBlock',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'getCloseLotteryBlock',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' } ]
const addressLotteryFactory = "0xf5267cefa827a07463fd4202ba6701a5aa56b022";
const addressERC20 = "0x5D1E47F703729fc87FdB9bA5C20fE4c1b7c7bf57";
let addressLottery = "0x04c22d78d54242453a84596e37debb02c2444977";
let addressPlayer = "0x03c6eAc074F9132feF8A6f1Aeb7Df8Deac507D4D";
const dc = 10**18;
contractLotteryFactory = new web3.eth.Contract(abiLotteryFactory, addressLotteryFactory);

function init(){
  // 1)
  // let contractF = LotteryFactory.at(addressLotteryFactory)
  // let erc20 = ERC20.at(addressERC20)
  // let contractL = Lottery.at(addressLottery)

  // 2)
  // contractF.jackpot.call().then(function(res){console.log(res.toNumber()/dc)})
  // erc20.balanceOf.call(addressLotteryFactory).then(function(result){console.log(result.toNumber()/dc);})
  // contractF.token.call().then(function(res){console.log("token:", res)})
  // erc20.faucetTo(addressLotteryFactory, 200*dc)

  // let sellOverBlock = 0
  // contractF.getSellOverBlock().then(function(res){sellOverBlock = res.toNumber() + 100}) // +40
  // contractF.getStopLotteryBlock().then(function(res){console.log("stopLotteryBlock:", res.toNumber())}) //  +80
  // contractF.getCloseLotteryBlock().then(function(res){console.log("closeLotteryBlock:", res.toNumber())}) // +120

  // 3)
  // contractF.createLottery(sellOverBlock, sellOverBlock+100, sellOverBlock+200)

  // 4)
  // erc20.approve(addressLottery, 0)
  // contractL.buyTicket(1, [1,2,3,4,5,6], false)
  // contractL.setWinTicket(7,8,9,10,11,6);
  // contractL.checkMyTicket(addressPlayer)
  // contractL.getReward()
  // contractL.closeLottery()
}

init();
/*
async getBetBalance() {
  let _betBalance = await ERC20.methods.balanceOf(_wallet.address).call()
  return parseInt(_betBalance)/10**8
}

async getEthBalance() {
  let _ethBalance = await web3.eth.getBalance(_wallet.address)
  return parseInt(_ethBalance)/10**18
}*/


