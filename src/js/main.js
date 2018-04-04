import WEB3 from 'web3'

let _wallet = {
	address: false,
	privateKey: false,
	balance: {
		bet: 0,
		eth: 0
	},
	link: ''
}
const web3 = new WEB3(new WEB3.providers.HttpProvider("https://ropsten.infura.io/JCnK5ifEPH9qcQkX0Ahl"))
const wallet_pass = '1234'
let ERC20 = {}
const gasprice = 40 * 1000000000
const gaslimit = 40 * 100000

let reward = 0;
const abiERC20 = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"faucetTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"faucet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]')
const abi = JSON.parse('[{"constant": true,"inputs": [{"name": "","type": "address"},{"name": "","type": "uint256"}],"name": "usersTickets","outputs": [{"name": "wb1","type": "uint8"},{"name": "wb2","type": "uint8"},{"name": "wb3","type": "uint8"},{"name": "wb4","type": "uint8"},{"name": "wb5","type": "uint8"},{"name": "rb","type": "uint8"},{"name": "pp","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "chooseWinTicket","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "getReward","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "winTicketChoosen","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "numberOfTickets","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "blockForRandom","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "refund","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "player","type": "address"}],"name": "checkMyTicket","outputs": [{"name": "","type": "uint256[2]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getCurrentBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "closeLottery","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "stopLotteryBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint8"}],"name": "dataPrize","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "sellOverBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "closeLotteryBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "winTicket","outputs": [{"name": "wb1","type": "uint8"},{"name": "wb2","type": "uint8"},{"name": "wb3","type": "uint8"},{"name": "wb4","type": "uint8"},{"name": "wb5","type": "uint8"},{"name": "rb","type": "uint8"},{"name": "pp","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_numberOfTickets","type": "uint8"},{"name": "_tickets","type": "uint8[]"}],"name": "buyTicket","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint8"}],"name": "dataPowerPlay","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_manager","type": "address"}],"name": "setManager","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "wb1","type": "uint8"},{"name": "wb2","type": "uint8"},{"name": "wb3","type": "uint8"},{"name": "wb4","type": "uint8"},{"name": "wb5","type": "uint8"},{"name": "rb","type": "uint8"}],"name": "setWinTicket","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [{"name": "_token","type": "address"},{"name": "_owner","type": "address"},{"name": "_sellOverBlock","type": "uint256"},{"name": "_stopLotteryBlock","type": "uint256"},{"name": "_closeLotteryBlock","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [],"name": "WinTicketChoosen","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "","type": "uint256"}],"name": "RewardRecieved","type": "event"},{"anonymous": false,"inputs": [],"name": "jackpotRecieved","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"},{"indexed": true,"name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"}]')

const erc20address = "0x5D1E47F703729fc87FdB9bA5C20fE4c1b7c7bf57"
ERC20 = new web3.eth.Contract(abiERC20, erc20address)

// const abiLotteryFactory = JSON.parse('[{"constant": true,"inputs": [],"name": "getSellOverBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "activeLotteries","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "lotteries","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "jackpot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getStopLotteryBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "token","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getCloseLotteryBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "bank","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [{"name": "_token","type": "address"},{"name": "_jackpot","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"},{"indexed": true,"name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"name": "payJackpot","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_sellOverBlock","type": "uint256"},{"name": "_stopLotteryBlock","type": "uint256"},{"name": "_closeLotteryBlock","type": "uint256"}],"name": "createLottery","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_bank","type": "uint256"},{"name": "_jackpot","type": "uint256"}],"name": "closeLottery","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}]')
let abiLotteryFactory = [{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "activeLotteries","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "lotteries","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_sellOverBlock","type": "uint256"},{"name": "_stopLotteryBlock","type": "uint256"},{"name": "_closeLotteryBlock","type": "uint256"}],"name": "createLottery","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"name": "payJackpot","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "jackpot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_bank","type": "uint256"},{"name": "_jackpot","type": "uint256"}],"name": "closeLottery","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "bank","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "activeLottery","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "adrRef","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getLengthLotteries","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "token","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [{"name": "_token","type": "address"},{"name": "_ref","type": "address"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"},{"indexed": true,"name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"}]
let abiLottery = [{"constant": true,"inputs": [{"name": "","type": "address"},{"name": "","type": "uint256"}],"name": "usersTickets","outputs": [{"name": "wb1","type": "uint8"},{"name": "wb2","type": "uint8"},{"name": "wb3","type": "uint8"},{"name": "wb4","type": "uint8"},{"name": "wb5","type": "uint8"},{"name": "rb","type": "uint8"},{"name": "pp","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "multiplier","outputs": [{"name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "chooseWinTicket","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "getReward","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "winTicketChoosen","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "numberOfTickets","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "blockForRandom","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "refund","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "player","type": "address"}],"name": "checkMyTicket","outputs": [{"name": "","type": "uint256[2]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_numberOfTickets","type": "uint8"},{"name": "_tickets","type": "uint8[]"},{"name": "_pp","type": "bool"}],"name": "buyTicket","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getCurrentBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "jackpot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "closeLottery","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "bank","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "stopLotteryBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint8"}],"name": "dataPrize","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "sellOverBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "closeLotteryBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "winTicket","outputs": [{"name": "wb1","type": "uint8"},{"name": "wb2","type": "uint8"},{"name": "wb3","type": "uint8"},{"name": "wb4","type": "uint8"},{"name": "wb5","type": "uint8"},{"name": "rb","type": "uint8"},{"name": "pp","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint8"}],"name": "dataPowerPlay","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_player","type": "address"}],"name": "getLengthTickets","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_manager","type": "address"}],"name": "setManager","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "wb1","type": "uint8"},{"name": "wb2","type": "uint8"},{"name": "wb3","type": "uint8"},{"name": "wb4","type": "uint8"},{"name": "wb5","type": "uint8"},{"name": "rb","type": "uint8"}],"name": "setWinTicket","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [{"name": "_token","type": "address"},{"name": "_ref","type": "address"},{"name": "_owner","type": "address"},{"name": "_sellOverBlock","type": "uint256"},{"name": "_stopLotteryBlock","type": "uint256"},{"name": "_closeLotteryBlock","type": "uint256"},{"name": "_jackpot","type": "uint256"},{"name": "_bank","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"name": "reward","type": "uint256"}],"name": "RewardRecieved","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"},{"indexed": true,"name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"}]

const addressLotteryFactory = "0x91aeF03aeA449e1012678680De301A7FCb6B50BE";
let contractLotteryFactory = new web3.eth.Contract(abiLotteryFactory, addressLotteryFactory);

let _pp = 0
let _numOfTickets = 0
let _ticketsArr = [];

//лотерея для покупки билета
// const abiLottery = JSON.parse('[{"constant": true,"inputs": [],"name": "winTicketChoosen","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "blockForRandom","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "player","type": "address"}],"name": "checkMyTicket","outputs": [{"name": "","type": "uint256[2]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "sellOverBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "stopLotteryBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "numberOfTickets","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "multiplier","outputs": [{"name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "jackpot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint8"}],"name": "dataPowerPlay","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "bank","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "winTicket","outputs": [{"name": "wb1","type": "uint8"},{"name": "wb2","type": "uint8"},{"name": "wb3","type": "uint8"},{"name": "wb4","type": "uint8"},{"name": "wb5","type": "uint8"},{"name": "rb","type": "uint8"},{"name": "pp","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"},{"name": "","type": "uint256"}],"name": "usersTickets","outputs": [{"name": "wb1","type": "uint8"},{"name": "wb2","type": "uint8"},{"name": "wb3","type": "uint8"},{"name": "wb4","type": "uint8"},{"name": "wb5","type": "uint8"},{"name": "rb","type": "uint8"},{"name": "pp","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint8"}],"name": "dataPrize","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "closeLotteryBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getCurrentBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "wb1","type": "uint8"},{"name": "wb2","type": "uint8"},{"name": "wb3","type": "uint8"},{"name": "wb4","type": "uint8"},{"name": "wb5","type": "uint8"},{"name": "rb","type": "uint8"}],"name": "setWinTicket","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [{"name": "_token","type": "address"},{"name": "_owner","type": "address"},{"name": "_sellOverBlock","type": "uint256"},{"name": "_stopLotteryBlock","type": "uint256"},{"name": "_closeLotteryBlock","type": "uint256"},{"name": "_jackpot","type": "uint256"},{"name": "_bank","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": false,"inputs": [],"name": "getReward","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"},{"indexed": true,"name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "reward","type": "uint256"}],"name": "RewardRecieved","type": "event"},{"anonymous": false,"inputs": [],"name": "WinTicketChoosen","type": "event"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "refund","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_numberOfTickets","type": "uint8"},{"name": "_tickets","type": "uint8[]"},{"name": "_pp","type": "bool"}],"name": "buyTicket","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_manager","type": "address"}],"name": "setManager","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "chooseWinTicket","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "closeLottery","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}]')
const addressLottery = "0xDa77054124B1236B0B67e245D2a11d0a54E66265";
let contractLottery = new web3.eth.Contract(abiLottery, addressLottery);
let _allowance = 0

class MainJS {

	//будет выполняться в браузере, вызывать методы

	constructor() {
		let _self = this
		let str = "test string    ok 		lol"
		console.log(str)
		async function start() {
			await _self.initAccount()
			await _self.allowance()
			_self.select_rnd_tickets()
			_self.fill_tickets(_numOfTickets)
			// if(_allowance == 0)
			await _self.ERC20approve(addressLottery, 0)
			await _self.ERC20approve(addressLottery, 4 * 10 ** 18)
			await _self.buy_tickets()
			// await _self.checkMyTicket()
			//if(reward > 0)
			// await _self.getReward()
		}
		// start()
	}

	returnAddressLottery() {
		return addressLottery
	}

	getAccountFromServer(localStorageStatusKey = 'statusGetAccountfromServer') {
		const status = localStorage.getItem(localStorageStatusKey)

		if (status) {
			if (status === 'wait') {
				return new Promise((resolve, reject) => {
					let waitTimer = () => {
						setTimeout(() => {
							const newStatus = localStorage.getItem(localStorageStatusKey)
							if (typeof newStatus === 'object' && newStatus.privateKey) {
								_wallet = newStatus
								resolve(newStatus)
							} else {
								waitTimer()
							}
						}, 1000)
					}
					waitTimer()
				})
			}
			return
		}

		localStorage.setItem(localStorageStatusKey, 'wait')

		return fetch('https://platform.dao.casino/faucet?get=account')
			.then(res => res.json())
			.then(acc => {
				console.log(['Server account data:', acc], typeof(_wallet))
				localStorage.setItem(localStorageStatusKey, JSON.stringify(acc))
				// _wallet.openkey = acc.address
				_wallet = acc

				return _wallet
				// return acc.privateKey
			})
			.catch(e => {
				// Utils.debugLog(e)
				return false
			})
	}

	async getBetBalance() {
		let _betBalance = await ERC20.methods.balanceOf(_wallet.address).call()
		return parseInt(_betBalance) / 10 ** 18
	}

	async getEthBalance() {
		let _ethBalance = await web3.eth.getBalance(_wallet.address)
		return parseInt(_ethBalance) / 10 ** 18
	}

	getOpenkey() {
		return _wallet.address
	}

	async initAccount() {

		_wallet = {
			address: '0x21c621D4d75FcbdCa6f062C7131B06FCA399fFd1',
			privateKey: '0x6c3e01c4ba6b3584d233cae9677525f2a03f1ef277de6f51803521d0b7b287ba',
			balance: {
				bet: 5,
				eth: 1
			},
			link: 'https://ropsten.etherscan.io/address/0x21c621D4d75FcbdCa6f062C7131B06FCA399fFd1'
		}

		// 		_wallet = {
		// 	address: '0x03c6eAc074F9132feF8A6f1Aeb7Df8Deac507D4D', 
		// 	privateKey: '0x45d090a0ca46a6bd3df07923fbeb6631b1c257112e0047c2140b0d2fa5039c89', 
		// 	// balance: {bet: 5, eth: 1}, 
		// 	link: 'https://ropsten.etherscan.io/address/0x03c6eAc074F9132feF8A6f1Aeb7Df8Deac507D4D'
		// }

		web3.eth.accounts.wallet.add(_wallet.privateKey)

		if (_wallet)
			return _wallet

		const web3wallet = localStorage.getItem('web3wallet')
		let privateKey = _wallet.privateKey

		if (web3wallet) {
			try {
				_wallet.address = `0x${JSON.parse(web3wallet).address}`
			} catch (e) {
				console.log(['Error!', e], 'error')
			}
		}

		if (!_wallet.address) {
			const dataAcc = await this.getAccountFromServer()
			privateKey = dataAcc.privateKey || web3.eth.accounts.create().privateKey

			localStorage.setItem('web3wallet', JSON.stringify(
				web3.eth.accounts.encrypt(
					privateKey,
					wallet_pass
				)
			))
			console.log([' 👤 New account created:', _wallet.address])
		}

		web3.eth.accounts.wallet.add(privateKey)

		console.log(' 🔑 Account ' + _wallet.address + ' restored from localStorage')
		console.log("return wallet", _wallet)
		console.log("typeof", typeof(_wallet))
		return _wallet
	}

	async allowance() {
		// console.log(_wallet.address, contractLottery)
		_allowance = await ERC20.methods.allowance(_wallet.address, addressLottery).call()
		_allowance /= 10 ** 18
		console.log("allowance", parseInt(_allowance))
		return parseInt(_allowance)
	}

	ERC20approve(spender, amount, callback = false) {
		return new Promise(async (resolve, reject) => {
			// this.timeout(100000)
			console.log('Check how many tokens user ' + _wallet.address + ' is still allowed to withdraw from contract ' + spender + ' . . . ')
			let allowance = await ERC20.methods.allowance(_wallet.address, spender).call()
			console.log('💸 allowance:', allowance)

			console.group('Call .approve on ERC20')
			console.log('Allow paychannel to withdraw from your account, multiple times, up to the ' + amount + ' amount.')

			const approveAmount = amount

			console.log(spender, approveAmount, _wallet.address)
			const gasLimit = await ERC20.methods.approve(spender, approveAmount).estimateGas({
				from: _wallet.address
			})
			const receipt = await ERC20.methods.approve(spender, approveAmount)
				.send({
					from: _wallet.address,
					gasPrice: 1.4 * gasprice,
					gas: gaslimit
				})
				.on('transactionHash', transactionHash => {
					console.log('# approve TX pending', transactionHash)
					console.log('https://ropsten.etherscan.io/tx/' + transactionHash)
				})
				.on('error', err => {
					if (err) {
						console.error("fail...", err)
						reject(err, true)
					}
				})

			console.log('📌 ERC20.approve receipt')

			allowance = await ERC20.methods.allowance(_wallet.address, spender).call()
			console.log('💸💸💸 allowance:', allowance)
			console.groupEnd()

			resolve()

			if (callback) callback(allowance)
		})
	}

	select_rnd_tickets(val) {
		//выбираем количество билетов и возвращаем
		// _numOfTickets = this.getRandomNumber(1, 1)
		_numOfTickets = val
		return _numOfTickets
	}

	fill_tickets(num_of_tickets) {
		_ticketsArr = []
		//заполняем каждый билет случайными числами без совпадений в билете
		console.log("num_of_tickets", num_of_tickets)
		//билеты
		for (let i = 0; i < num_of_tickets; i++) {
			//1 билет
			// countNum = 7 - количество чисел в биете (вкл pp)
			// while(countNum> 0)
			// rnd = getRandomNumber
			// _arrTicket.indexOf(rnd) -> push -> countNum--

			let countNum = 0;

			let _arrTicket = []

			while (countNum < 5) {
				let num = this.getRandomNumber(1, 69)
				if (_arrTicket.indexOf(num) == -1) {
					_arrTicket.push(num)
					_ticketsArr.push(num)
					countNum++
				}
			}
			let rndnum = this.getRandomNumber(1, 26)
			_arrTicket.push(rndnum)
			_ticketsArr.push(rndnum)
			// _arrTicket.push(this.getRandomNumber(0,1))
			console.log("_arrTicket", _arrTicket, _arrTicket.length)
			//проверка на совпадение числа
			//заполнение числом если нет совпадения
			//новый рандом если совпало

			//добавляем билет в массив глобала
		}
		console.log("_ticketsArr", _ticketsArr, _ticketsArr.length)

		// _ticketsArr[1][3] = 70 для фейла теста
		return _ticketsArr
	}

	buy_tickets() {
		//подумать как дождаться подтверждения
		//написать скрипт с созданием лотереи
		return new Promise(async (resolve, reject) => {
			console.log("_numOfTickets, _ticketsArr, _pp", _numOfTickets, _ticketsArr, _pp)

			const receipt = await contractLottery.methods.buyTicket(_numOfTickets, _ticketsArr, _pp).send({
				from: _wallet.address,
				gas: 900000,
				gasPrice: 40 * 1000000000
			}).on('transactionHash', transactionHash => {
				console.log('# buyTicket TX pending', transactionHash)
				console.log('https://ropsten.etherscan.io/tx/' + transactionHash)
			}).on('error', err => {
				if (err) {
					console.error(err)
					reject(err, true)
				}
			});

			console.log('📌 contract.buyTicket receipt:')
			resolve()
		})
	}

	async checkMyTicket() {
		reward = await contractLottery.methods.checkMyTicket(_wallet.address).call()
		console.log("reward", parseInt(reward) / 10 ** 18)
		return parseInt(reward) / 10 ** 18
	}

	async getReward() {
		// let reward = await contractLottery.methods.getReward(_wallet.address).call()
		// console.log("reward",parseInt(reward)/10**18)
		return new Promise(async (resolve, reject) => {
			await contractLottery.methods.getReward().send({
				from: _wallet.address,
				gas: 900000,
				gasPrice: 40 * 1000000000
			}).on('transactionHash', transactionHash => {
				console.log('# getReward TX pending', transactionHash)
				console.log('https://ropsten.etherscan.io/tx/' + transactionHash)
			}).on('error', err => {
				console.error(err)
				reject(false, err)
			});
			resolve()
		})

		// return parseInt(reward)/10**18
	}

	getRandomNumber(min, max) {
		return Math.ceil(Math.random() * (max - min)) + min;
	}

}

window.MainJS = new MainJS()
export default window.MainJS