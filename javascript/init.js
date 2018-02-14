import myclass from "./main2"
import Logic from "./Logic"
import addText from "./core/addText"
import addGraphic from "./core/addGraphic"
import addCircle from "./core/addCircle"
import addButton from "./core/addButton"
import addTicket from "./core/addTicket"
import ResizeManager from "./core/ResizeManager"
import Preloader from "./core/Preloader";
import addInfoWindow from "./core/addInfoWindow";

const acc = DCLib.web3.eth.accounts;
console.log(acc.create().address)

let app = new myclass("hello!");

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
	//initialize the stage
	var s = document.documentElement.style;
	s.cssText = s.cssText ? "" : "overflow:hidden;width:100%;height:100%";

	renderer = PIXI.autoDetectRenderer(_W, _H);
	document.body.appendChild(renderer.view);
	stage = new PIXI.Container();
	renderer.backgroundColor = 0x483E48;

	//прелоадер, колбэк-запуск игры
	Preloader.addAll([{
			name: "bg",
			path: "../../images/items/bgTicket.png"
		}, {
			name: "blue_selected",
			path: "../../images/buttons/btnNW_0003.png"
		}, {
			name: "blue",
			path: "../../images/buttons/btnNW_0001.png"
		}, {
			name: "rules",
			path: "../../images/items/rules.jpg"
		}, {
			name: "red",
			path: "../../images/buttons/btnRed.png"
		}, {
			name: "green",
			path: "../../images/buttons/btnGreen.png"
		}

		, {
			name: "bgRedNum",
			path: "../../images/bgRedNum.png"
		}, {
			name: "bgTicket",
			path: "../../images/bgTicket.png"
		}, {
			name: "bgWhiteNum",
			path: "../../images/bgWhiteNum.png"
		}, {
			name: "btnAdd",
			path: "../../images/btnAdd.png"
		}, {
			name: "btnArrow",
			path: "../../images/btnArrow.png"
		}, {
			name: "btnClose",
			path: "../../images/btnClose.png"
		}, {
			name: "btnContract",
			path: "../../images/btnContract.png"
		}, {
			name: "btnFullscreen",
			path: "../../images/btnFullscreen.png"
		}, {
			name: "btnInstruct",
			path: "../../images/btnInstruct.png"
		}, {
			name: "btnText",
			path: "../../images/btnText.png"
		}, {
			name: "cellR",
			path: "../../images/cellR.png"
		}, {
			name: "cellRS",
			path: "../../images/cellRS.png"
		}, {
			name: "cellW",
			path: "../../images/cellW.png"
		}, {
			name: "cellWS",
			path: "../../images/cellWS.png"
		}, {
			name: "icoBet",
			path: "../../images/icoBet.png"
		}, {
			name: "icoKey",
			path: "../../images/icoKey.png"
		}, {
			name: "icoTime",
			path: "../../images/icoTime.png"
		}, {
			name: "wndInfo",
			path: "../../images/wndInfo.png"
		}
	], function() {
		start();
	})

	function start() {
		let newText = new addText(currentTicket + "/" + numOfTickets, _W / 2, 200);
		newText.x -= newText.width / 2;

		stage.addChild(newText);
		let balance_txt = new addText(balance + " bets", 100, 100);

		stage.addChild(balance_txt);

		let address_txt = new addText("address: " + address, 100, 50);

		stage.addChild(address_txt);


		// let btn_roll = new addButton("roll", 200, 1010, "roll");
		let btn_roll = PIXI.Sprite.fromImage('../../images/btnText.png');
		btn_roll.interactive = true;
		btn_roll.buttonMode = true;
		stage.addChild(btn_roll);
		btn_roll.x = _W / 2 - btn_roll.width / 2;
		btn_roll.y = 880;
		let btn_roll_text = new addText("roll", _W / 2, 880, 72, "#FFFFFF", undefined, "center", undefined, undefined, "Segoe");
		stage.addChild(btn_roll_text);

		// let btn_ticket = new addButton("new ticket", 600, 1010, "new ticket");
		let btn_ticket = PIXI.Sprite.fromImage('../../images/btnAdd.png')
		btn_ticket.interactive = true;
		btn_ticket.buttonMode = true;
		stage.addChild(btn_ticket);
		btn_ticket.y = 980;
		btn_ticket.x = _W / 2 - btn_ticket.width / 2;

		//buttons
		let btn_contract = PIXI.Sprite.fromImage('../../images/btnContract.png')
		btn_contract.interactive = true;
		btn_contract.buttonMode = true;
		stage.addChild(btn_contract);
		btn_contract.y = 580;
		btn_contract.x = 1750;

		let btnInstruct = PIXI.Sprite.fromImage('../../images/btnInstruct.png')
		btnInstruct.interactive = true;
		btnInstruct.buttonMode = true;
		stage.addChild(btnInstruct);
		btnInstruct.y = 700;
		btnInstruct.x = 1750;

		let btnFullscreen = PIXI.Sprite.fromImage('../../images/btnFullscreen.png')
		btnFullscreen.interactive = true;
		btnFullscreen.buttonMode = true;
		stage.addChild(btnFullscreen);
		btnFullscreen.y = 820;
		btnFullscreen.x = 1750;

		stage.addChild(main_layer_tickets);
		main_layer_tickets.addChild(layer_tickets);
		//win ticket
		let arrResult = [];
		let res_x = 0;
		let res_layer = new PIXI.Container();
		for (let i = 0; i < 6; i++) {
			let result_layer = new PIXI.Container();
			let bb;

			if (i == 5)
				bb = PIXI.Sprite.fromImage('../../images/bgWhiteNum.png')
			else
				bb = PIXI.Sprite.fromImage('../../images/bgRedNum.png')

			result_layer.addChild(bb);
			result_layer.tf = new addText(i, 47, 25, 45, undefined, undefined, "center");
			result_layer.tf.visible = false;
			result_layer.x = res_x;
			result_layer.y = 50;
			result_layer.addChild(result_layer.tf);
			res_x += 10 + bb.width;

			arrResult.push(result_layer);
			res_layer.addChild(result_layer);
		}
		stage.addChild(res_layer);
		res_layer.x = _W / 2 - res_layer.width / 2;

		let icoKey = PIXI.Sprite.fromImage('../../images/icoKey.png');
		let icoBet = PIXI.Sprite.fromImage('../../images/icoBet.png');
		let icoTime = PIXI.Sprite.fromImage('../../images/icoTime.png');
		stage.addChild(icoKey);
		stage.addChild(icoBet);
		stage.addChild(icoTime);
		icoKey.y = 10;
		icoBet.y = 80;
		icoTime.y = 150;
		icoKey.x = 10;
		icoBet.x = 10;
		icoTime.x = 10;

		btn_roll.mousedown = function(moveData) {
			//проверка на заполненность ВСЕХ билетов
			for (let i = 0; i < numOfTickets; i++) {
				if (tickets[i].getBlueNums().length != 5 || tickets[i].getRedNums() == undefined) {
					alert("fill ticket correctly!");
					return;
				}
			}

			let _logic = new Logic();
			let logic = _logic.getResults();
			let white = 0;
			let red = 0;

			//все билеты заполнены! проверяем каждый на выигрыш
			for (let i = 0; i < numOfTickets; i++) {
				//i наш текущий билет
				//подсчитываем сколько мы угадали синих
				//и угадали ли мы красный
				//показываем результат
				let blue = 0;
				let red = 0;
				tickets[i].getBlueNums().forEach(function(item, i, arr) {
					for (let j = 0; j < 5; j++)
						if (item.name == logic.arr1[j])
							blue++;
				});
				if (tickets[i].getRedNums() == logic.red)
					red++;
				let prize = _logic.getDataPrize();
				if (prize[white + "_" + red]) {
					console.log("выигрыш: ", prize[white + "_" + red]);
					balance += prize[white + "_" + red];
				} else {
					console.log("проиграл")
				}
			}
			balance_txt.setText(balance + " bets");

			for (let i = 0; i < 6; i++) {
				arrResult[i].tf.visible = true;
				if (i == 5)
					arrResult[i].tf.setText(logic.red);
				else
					arrResult[i].tf.setText(logic.arr1[i]);
			}
		};
		btn_ticket.mousedown = function(moveData) {
			if (numOfTickets == 25) {
				alert("TICKETS LIMIT!");
				return;
			}

			if (balance < 2) {
				alert("not enough balance!");
				return;
			}

			numOfTickets++;
			currentTicket++;
			//arrow1.visible=true;
			newText.setText(currentTicket + "/" + numOfTickets);

			balance -= 2;
			balance_txt.setText(balance + " bets");

			createTicket(false);
		};

		function createTicket(_bool) {
			//добавление билета. колбэк-удаление этого билета
			let _ticket = new addTicket(_bool, function() {
				if (currentTicket == 1) {
					alert("cant remove first ticket")
					return;
				}
				if (numOfTickets <= 5)
					layer_tickets.x += ticket.width / 2 + 10;

				layer_tickets.removeChild(tickets[_ticket.name - 1].getObj());
				numOfTickets--;
				tickets.splice(_ticket.name - 1, 1);
				newText.setText(currentTicket + "/" + numOfTickets);

				_ticket.changeField();
				currentTicket--;
				newText.setText(currentTicket + "/" + numOfTickets);
				_ticket.changeFieldVisTrue(BlueNumbersArray[currentTicket], RedNumberArray[currentTicket]);

				if (counter > 5)
					counter--;

				if (arrow2.visible == true) {
					layer_tickets.x += ticket.width + 20;
				}

				if (counter == numOfTickets) {
					arrow1.visible = false;
				}

				if (counter == 5) {
					arrow2.visible = false;
				}


				balance += 2;
				balance_txt.setText(balance + " bets");

				for (let k = _ticket.name - 1; k < numOfTickets; k++) {
					tickets[k].getObj().x -= 237;
					tickets[k].name -= 1;
				}

			}, stage);
			_ticket.name = currentTicket;
			let ticket = _ticket.getObj();
			tickets.push(_ticket);
			layer_tickets.addChild(ticket);
			ticket.x = _W / 2 - ticket.width / 2 + (237 * (tickets.length - 1));
			ticket.y = _H / 2 - ticket.height / 2;
			if (_bool == false) {
				if (layer_tickets.width <= wMask) {
					layer_tickets.x -= (ticket.width / 2);
					layer_tickets.x -= 10;
				}
			}
			/*else{
				ticket.x-=6.25;
				layer_tickets.x+=6.25;
				ticket.y-=6.25;
			}*/
			//console.log(ticket.width);
			// console.log("WIDTH",layer_tickets.width);
			// console.log("x",layer_tickets.x);

			if (layer_tickets.width > wMask) {
				// layer_tickets.x+=6.5;
				arrow1.visible = true;
				// arrow2.visible = true;
			}
			/*if(layer_tickets.width > wMask){
				layer_tickets.x-=(ticket.width/2)+13;
			}*/
		};

		createTicket(true);

		var wMask = 1165;
		//var wMask = 1402;
		var hMask = 580;

		var masker = new PIXI.Graphics();
		masker.beginFill(0xFF0000, 1);
		masker.drawRect(-wMask / 2, -hMask / 2, wMask, hMask);
		masker.endFill();
		masker.x = _W / 2;
		masker.y = _H / 2;
		masker.alpha = 0.5
		main_layer_tickets.addChild(masker);
		main_layer_tickets.mask = masker;


		//layer_tickets.x += 30;
		// console.log("X:",layer_tickets.x)
		// console.log("WIDTH:",layer_tickets.width);
		let arrow1 = PIXI.Sprite.fromImage('../../images/btnArrow.png');
		let arrow2 = PIXI.Sprite.fromImage('../../images/btnArrow.png');
		stage.addChild(arrow1);
		stage.addChild(arrow2);
		arrow1.scale.x /= -1;
		/*arrow1.scale.y/=8;
		arrow2.scale.x/=8;
		arrow2.scale.y/=8;*/
		arrow1.x = 1920 - 250
		arrow2.x = 250
		arrow1.y = _H / 2 - 50;
		arrow2.y = _H / 2 - 50;

		arrow1.interactive = true;
		arrow1.buttonMode = true;

		arrow2.interactive = true;
		arrow2.buttonMode = true;

		arrow1.visible = false;
		arrow2.visible = false;

		//стрелка вперед
		arrow1.mousedown = function(moveData) {
			// layer_tickets.x+=100
			if (anim == true)
				return;
			anim = true;
			animRight = true;
			animLeft = false;
			counter++;
			createjs.Tween.get(layer_tickets) /*.wait(TIME_NEW_CARD*delay)*/ .to({
				x: layer_tickets.x - 237
			}, 600).call(handleComplete);;
			arrow2.visible = true;
			// console.log(layer_tickets.x, layer_tickets.width)
			if (counter == numOfTickets) {
				arrow1.visible = false;
			}
			arrow2.visible = true;

			/*var t = new TWEEN.Tween( layer_tickets).to({y:0, alpha:1});
			t.start();*/
		}
		//стрелка назад
		arrow2.mousedown = function(moveData) {
			// layer_tickets.x-=100
			if (anim == true)
				return;
			anim = true;
			animRight = false;
			animLeft = true;
			counter--;
			createjs.Tween.get(layer_tickets) /*.wait(TIME_NEW_CARD*delay)*/ .to({
				x: layer_tickets.x + 237
			}, 600).call(handleComplete);;
			// arrow2.visible = false;
			if (counter == 5) {
				arrow2.visible = false;
			}
			arrow1.visible = true;

			/*
			console.log("LALALA",(layer_tickets.x));
			if(layer_tickets.x>=-711){
				console.log("work, ",layer_tickets.x)
				arrow2.visible = false;
			}*/
		}

		function handleComplete() {
			anim = false;
		}

		/*(возможно подчеркивать красным те числа, которые не угадал, а зеленым которые угадал)*/
		let _ResizeManager = new ResizeManager;
		window.addEventListener("resize", function() {
			_ResizeManager.onResize(renderer, stage, _W, _H)
		}, false);
		_ResizeManager.onResize(renderer, stage, _W, _H);
		update();

		let wnd = new addInfoWindow(
			function() {
				stage.removeChild(wnd);
			}
		);
		wnd.x = _W / 2;
		wnd.y = _H / 2;
		stage.addChild(wnd);
	}
}

/*
пример стрелочной функции
let getTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return hours + ':' + minutes;
};
*/
init()
animate();

function update() {
	renderer.render(stage);
	requestAnimationFrame(update);

	var difftime = getTimer() - startTime;
	/*if (diffTime > interval) {
		update(diffTime);
	}*/
	// console.log("x",layer_tickets.x);

	startTime = getTimer();
	/*
		if(animRight)
			layer_tickets.x+=0.4*difftime;
		if(animLeft)
			layer_tickets.x-=0.4*difftime;*/
}

function animate(time) {
	requestAnimationFrame(animate);
	TWEEN.update(time);
}

function getTimer() {
	var d = new Date();
	var n = d.getTime();
	return n;
}

function refreshTime() {
	startTime = getTimer();
}
/*
function update() {
	requestAnimationFrame(update);
	renderer.render(stage);
	
	
		/*
		if(!options_pause){
			for (var i = 0; i < arClips.length; i++) {
				var clip = arClips[i];
				if(clip){
					clip.enter_frame();
				}
			}
		}*/