import Logic from "./Logic"
import addText from "./core/addText"
import addGraphic from "./core/addGraphic"
import addCircle from "./core/addCircle"
import addButton from "./core/addButton"
import addTicket from "./core/addTicket"
import ResizeManager from "./core/ResizeManager"
import Preloader from "./core/Preloader";
import addInfoWindow from "./core/addInfoWindow";
import WEB3 from 'web3'

const myadress = "0x268eD938A4E49Df73B8885D5aE20d0E99F39241a";

// const spender = "0x248736140338cb72e8efda00a72831941339bde1";
const spender = "0x5915c40CC210C6911b602BA84463e99BDeb29aF2";
const abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"activeLotteries","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lotteries","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"jackpot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"closeLottery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_startLotteryBlock","type":"uint256"},{"name":"_stopLotteryBlock","type":"uint256"},{"name":"_closeLotteryBlock","type":"uint256"},{"name":"_tokenAmount","type":"uint256"}],"name":"createLottery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"payJackpot","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_token","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]');
// const spender = "0x98de260ba599c22b781ef40463732641ef22b11d";
// const abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"usersTickets","outputs":[{"name":"wb1","type":"uint8"},{"name":"wb2","type":"uint8"},{"name":"wb3","type":"uint8"},{"name":"wb4","type":"uint8"},{"name":"wb5","type":"uint8"},{"name":"rb","type":"uint8"},{"name":"pp","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"chooseWinTicket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"winTicketChoosen","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"blockForRandom","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"refund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"checkMyTicket","outputs":[{"name":"","type":"uint256[2]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"closeLottery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stopLotteryBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startLotteryBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"dataPrize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"wb1","type":"uint8"},{"name":"wb2","type":"uint8"},{"name":"wb3","type":"uint8"},{"name":"wb4","type":"uint8"},{"name":"wb5","type":"uint8"},{"name":"rb","type":"uint8"},{"name":"pp","type":"uint8"}],"name":"buyTicket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"closeLotteryBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"winTicket","outputs":[{"name":"wb1","type":"uint8"},{"name":"wb2","type":"uint8"},{"name":"wb3","type":"uint8"},{"name":"wb4","type":"uint8"},{"name":"wb5","type":"uint8"},{"name":"rb","type":"uint8"},{"name":"pp","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"dataPowerPlay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_manager","type":"address"}],"name":"setManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wb1","type":"uint8"},{"name":"wb2","type":"uint8"},{"name":"wb3","type":"uint8"},{"name":"wb4","type":"uint8"},{"name":"wb5","type":"uint8"},{"name":"rb","type":"uint8"}],"name":"setWinTicket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_owner","type":"address"},{"name":"_startLotteryBlock","type":"uint256"},{"name":"_stopLotteryBlock","type":"uint256"},{"name":"_closeLotteryBlock","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"WinTicketChoosen","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"uint256"}],"name":"RewardRecieved","type":"event"},{"anonymous":false,"inputs":[],"name":"jackpotRecieved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]')
const amount = 200000000; // 2 bets
const contract_deposit = DCLib.Utils.bet2dec(2); // 2 bets
const address_erc20contract = '0x95a48dca999c89e4e284930d9b9af973a7481287'

// await Eth.ERC20approve(contract_address, contract_deposit);

let _W = 1920; // game width
let _H = 1080; // game height

var fps = 30;
var interval = 1000 / fps;

let renderer, stage; // pixi;

let address = "0x000000000"
let balance = 100; //100 bets

//массив для визуальных билетов (графика)
let tickets = [];
//массивы для результатов
let BlueNumbersArray = [];
let RedNumberArray = [];

let numOfTickets = 1;
let currentTicket = 1;

let animLeft = false,
	animRight = false,
	startTime;

let main_layer_tickets = new PIXI.Container();
//слой в котором лежит графика билетов
let layer_tickets = new PIXI.Container();

//счетчик для стрелок
let counter = 5;
//флаг для анимаций
let anim = false;

function init() {
	//TODO
	//рандомное заполнение билета (одного или всех)

	//initialize the stage

	var s = document.documentElement.style;
	s.cssText = s.cssText ? "" : "overflow:hidden;width:100%;height:100%";

	renderer = PIXI.autoDetectRenderer(_W, _H);
	document.body.appendChild(renderer.view);
	stage = new PIXI.Container();
	renderer.backgroundColor = 0x483E48;

	//прелоадер, колбэк-запуск игры
	// Preloader.addAll()
	console.log(WEB3)
	DCLib.Eth.ERC20approve(spender,amount)
	

	//init contracts
	const contactLottery = new DCLib.web3.eth.Contract(abi, spender);

	contactLottery.methods.createLottery(3655850, 3665850, 3765850, 20000000).send(
		{
			from : DCLib.Account.get().openkey,
			gas : 900000,
			gasPrice : 40*1000000000
		}
	).on('transactionHash', transactionHash=>{
      console.log('# createLottery TX pending', transactionHash)
      console.log('https://ropsten.etherscan.io/tx/'+transactionHash)
    }).on('error', err=>{ 
      console.error(err)
      reject(false, err)
    });

	function start() {
		
		let btn_roll = new addButton("roll", 200, 1010, "roll");
		

		stage.addChild(btn_roll);


		btn_roll.mousedown = function(moveData) {
		};
	}
	start();
}
		
init()

function update() {
	renderer.render(stage);
	requestAnimationFrame(update);

	var difftime = getTimer() - startTime;

	startTime = getTimer();
}


function getTimer() {
	var d = new Date();
	var n = d.getTime();
	return n;
}

function refreshTime() {
	startTime = getTimer();
}