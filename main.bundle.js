/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addText = function addText(text) {
	var _x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var _y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 24;
	var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "#000000";
	var glow = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

	var _align = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "left";

	var width = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 600;
	var px = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 2;
	var font = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : "Times New Roman";

	_classCallCheck(this, addText);

	var style = {
		font: size + "px " + font,
		fill: color,
		align: _align,
		wordWrap: true,
		wordWrapWidth: width
	};

	if (glow) {
		style.stroke = glow, style.strokeThickness = px;
	}

	var obj = new PIXI.Container();

	var tfMain = new PIXI.Text(text, style);
	tfMain.y = 0;
	obj.addChild(tfMain);
	if (_align == "left") tfMain.x = 0;else if (_align == "right") tfMain.x = -tfMain.width;else tfMain.x = -tfMain.width / 2;

	obj.width = Math.ceil(tfMain.width);
	obj.height = Math.ceil(tfMain.height);

	obj.setText = function (value) {
		tfMain.text = value;
		if (_align == "left") tfMain.x = 0;else if (_align == "right") tfMain.x = -tfMain.width;else tfMain.x = -tfMain.width / 2;
	};

	obj.getText = function () {
		return tfMain.text;
	};

	obj.getSize = function () {
		return style;
	};

	obj.x = _x;
	obj.y = _y;

	return obj;
};

exports.default = addText;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = new (function () {
				function Preloader() {
								_classCallCheck(this, Preloader);

								this.preloader = new PIXI.loaders.Loader();
								this.allimg = [];
								// this.load_bool = false
				}

				_createClass(Preloader, [{
								key: "add",
								value: function add(params) {
												this.preloader.add(params.name, params.path);
								}
				}, {
								key: "addAll",
								value: function addAll(params, callback) {

												for (var i = 0; i < params.length; i++) {
																//console.log(params[i].name, params[i].path)
																this.preloader.add(params[i].name, params[i].path);
																this.allimg.push(params[i]);
												}
												this.preloader.on("progress", function () {
																console.log("progress!");
												});
												this.preloader.load(function () {
																// this.load_bool = true;
																console.log("complete!");
																if (callback) {
																				callback();
																}
												});
								}
				}, {
								key: "getimg",
								value: function getimg(name) {
												// if(this.load_bool == false) return;
												for (var i = 0; i < this.allimg.length; i++) {
																if (this.allimg[i].name === name) {
																				return this.allimg[i];
																}
												}
								}
				}]);

				return Preloader;
}())();
/*

export default class Manifest {
	constructor(){
		preloader = new PIXI.loaders.Loader();
	
		preloader.add("bg", "../../images/items/bgTicket.png");
		preloader.add("bgMenu", "../../images/buttons/btnNW_0003.png");
		preloader.add("bgGame1", "../../images/buttons/btnNW_0001.png");
		preloader.add("bgGame1", "../../images/buttons/btnNR_0001.png");
		preloader.add("bgGame1", "../../images/buttons/btnNR_0003.png");
		
		// preloader.add("images/texture/ItemsTexure.json");
		
		
		//сохраняем счетчик кол-ва файлов для загрузки
		preloader.on("progress", handleProgress);
		preloader.load(handleComplete);

		function handleProgress(){
			var percent = preloader.progress;
		}

		function handleComplete(evt) {
			console.log("load complete")
			// spritesLoad();
			// textureLoad();
			// onResize();
			
			// start();
		}
	}
}



    {
        name:"bg",
        path:"../../images/items/bgTicket.png"
    }
*/

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(3);

var _main2 = _interopRequireDefault(_main);

var _Logic = __webpack_require__(4);

var _Logic2 = _interopRequireDefault(_Logic);

var _addText = __webpack_require__(0);

var _addText2 = _interopRequireDefault(_addText);

var _addGraphic = __webpack_require__(5);

var _addGraphic2 = _interopRequireDefault(_addGraphic);

var _addCircle = __webpack_require__(6);

var _addCircle2 = _interopRequireDefault(_addCircle);

var _addButton = __webpack_require__(7);

var _addButton2 = _interopRequireDefault(_addButton);

var _addTicket = __webpack_require__(8);

var _addTicket2 = _interopRequireDefault(_addTicket);

var _ResizeManager2 = __webpack_require__(9);

var _ResizeManager3 = _interopRequireDefault(_ResizeManager2);

var _Preloader = __webpack_require__(1);

var _Preloader2 = _interopRequireDefault(_Preloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _main2.default("hello!");

var _W = 1920; // game width
var _H = 1080; // game height

var renderer = void 0,
    stage = void 0; // pixi;

var address = "0x000000000";
var balance = 100; //100 bets

//массив для визуальных билетов (графика)
var tickets = [];
//массивы для результатов
var BlueNumbersArray = [];
var RedNumberArray = [];

var numOfTickets = 1;
var currentTicket = 1;

function init() {
	//initialize the stage
	var s = document.documentElement.style;
	s.cssText = s.cssText ? "" : "overflow:hidden;width:100%;height:100%";

	renderer = PIXI.autoDetectRenderer(_W, _H);
	// console.log(document.body);
	document.body.appendChild(renderer.view);
	stage = new PIXI.Container();
	renderer.backgroundColor = 0x2F4F4F;

	var newText = new _addText2.default(currentTicket + "/" + numOfTickets, _W / 2, 200);
	newText.x -= newText.width / 2;

	stage.addChild(newText);
	var balance_txt = new _addText2.default(balance + " bets", 100, 100);

	stage.addChild(balance_txt);

	var address_txt = new _addText2.default("address: " + address, 100, 50);

	stage.addChild(address_txt);

	var btn_roll = new _addButton2.default("roll", 200, 1010, "roll");
	stage.addChild(btn_roll);

	var btn_ticket = new _addButton2.default("new ticket", 600, 1010, "new ticket");
	stage.addChild(btn_ticket);

	//прелоадер, колбэк-запуск игры
	_Preloader2.default.addAll([{
		name: "bg",
		path: "../../images/items/bgTicket.png"
	}, {
		name: "blue_selected",
		path: "../../images/buttons/btnNW_0003.png"
	}, {
		name: "blue",
		path: "../../images/buttons/btnNW_0001.png"
	}], function () {
		start();
	});

	function start() {
		//слой в котором лежит графика билетов
		var layer_tickets = new PIXI.Container();
		stage.addChild(layer_tickets);
		//win ticket
		var arrResult = [];
		var res_x = _W / 2 - 90;
		for (var i = 0; i < 6; i++) {
			var result_layer = new PIXI.Container();
			var bb = void 0;

			if (i == 5) bb = PIXI.Sprite.fromImage('../../images/buttons/btnNR_0001.png');else bb = PIXI.Sprite.fromImage('../../images/buttons/btnNW_0001.png');

			result_layer.addChild(bb);
			result_layer.tf = new _addText2.default(i, 13, 3, 20, undefined, undefined, "center");
			result_layer.tf.visible = false;
			result_layer.x = res_x;
			result_layer.y = 50;
			result_layer.addChild(result_layer.tf);
			res_x += 30;
			stage.addChild(result_layer);

			arrResult.push(result_layer);
		}

		btn_roll.mousedown = function (moveData) {
			for (var _i = 0; _i < numOfTickets; _i++) {
				if (tickets[_i].getBlueNums().length != 5 || tickets[_i].getRedNums() == undefined) {
					alert("fill ticket correctly!");
					return;
				}
			}

			var _logic = new _Logic2.default();
			var logic = _logic.getResults();

			var white = 0;
			var red = 0;

			//мы не можем отследить, менялись ли значения в текущем билете, прежде чем был нажат ролл.
			//заново получаем его данные
			/*let _mas = _ticket.getBlueNums();
   BlueNumbersArray[currentTicket] = _mas;
   let _num = _ticket.getRedNums();
   RedNumberArray[currentTicket] = _num;
   	//проверка на заполненность ВСЕХ билетов включая текущий
   if(BlueNumbersArray[currentTicket] == undefined || RedNumberArray[currentTicket] == undefined){
   	alert("fill ticket correctly!");
   	return;
   }*/

			//все билеты заполнены! проверяем каждый на выигрыш

			var _loop = function _loop(_i2) {
				//i наш текущий билет
				//подсчитываем сколько мы угадали синих

				//и угадали ли мы красный

				//показываем результат
				var blue = 0;
				var red = 0;
				tickets[_i2].getBlueNums().forEach(function (item, i, arr) {
					for (var j = 0; j < 5; j++) {
						if (item.name == logic.arr1[j]) blue++;
					}
				});
				if (tickets[_i2].getRedNums() == logic.red) red++;
				// console.log("itog:",white, red);
				var prize = _logic.getDataPrize();
				if (prize[white + "_" + red]) {
					console.log("выигрыш: ", prize[white + "_" + red]);
					balance += prize[white + "_" + red];
				} else {
					console.log("проиграл");
				}
			};

			for (var _i2 = 0; _i2 < numOfTickets; _i2++) {
				_loop(_i2);
			}
			balance_txt.setText(balance + " bets");

			for (var _i3 = 0; _i3 < 6; _i3++) {
				arrResult[_i3].tf.visible = true;
				if (_i3 == 5) arrResult[_i3].tf.setText(logic.red);else arrResult[_i3].tf.setText(logic.arr1[_i3]);
			}
		};
		btn_ticket.mousedown = function (moveData) {
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
			arrow1.visible = true;
			newText.setText(currentTicket + "/" + numOfTickets);

			balance -= 2;
			balance_txt.setText(balance + " bets");

			createTicket(false);
		};
		function createTicket(_bool) {
			//добавление билета. колбэк-удаление этого билета
			var _ticket = new _addTicket2.default(_bool, function () {
				if (currentTicket == 1) {
					alert("cant remove first ticket");
					return;
				}

				layer_tickets.removeChild(tickets[currentTicket - 1].getObj());
				numOfTickets--;
				BlueNumbersArray.splice(currentTicket);
				RedNumberArray.splice(currentTicket);
				tickets.splice(currentTicket - 1);
				newText.setText(currentTicket + "/" + numOfTickets);
				//arrow2.mousedown();

				_ticket.changeField();
				currentTicket--;
				newText.setText(currentTicket + "/" + numOfTickets);
				_ticket.changeFieldVisTrue(BlueNumbersArray[currentTicket], RedNumberArray[currentTicket]);

				if (currentTicket == 1) {
					arrow2.visible = false;
				}

				if (numOfTickets == 1) arrow1.visible = false;

				balance += 2;
				balance_txt.setText(balance + " bets");

				if (_bool == false) layer_tickets.x += ticket.width / 2;
			}, stage);

			var ticket = _ticket.getObj();
			tickets.push(_ticket);
			layer_tickets.addChild(ticket);
			ticket.x = _W / 2 - ticket.width / 2 + 230 * (tickets.length - 1);
			ticket.y = _H / 2 - ticket.height / 2;
			if (_bool == false) layer_tickets.x -= ticket.width / 2;
			// console.log("ticket.width",ticket.width)
			// console.log("ticket.height",ticket.height)
			// console.log("ticket.width",ticket.x)
			// console.log("ticket.height",ticket.y)
		};

		createTicket(true);

		var arrow1 = PIXI.Sprite.fromImage('../../images/buttons/arrow.png');
		var arrow2 = PIXI.Sprite.fromImage('../../images/buttons/arrow.png');
		stage.addChild(arrow1);
		stage.addChild(arrow2);
		arrow1.scale.x /= -8;
		arrow1.scale.y /= 8;
		arrow2.scale.x /= 8;
		arrow2.scale.y /= 8;
		arrow1.x = 720;
		arrow2.x = 360;
		arrow1.y = 840;
		arrow2.y = 840;

		arrow1.interactive = true;
		arrow1.buttonMode = true;

		arrow2.interactive = true;
		arrow2.buttonMode = true;

		arrow1.visible = true;
		arrow2.visible = true;

		//стрелка вперед
		arrow1.mousedown = function (moveData) {
			/*console.log(tickets[currentTicket-1])
   console.log(tickets[currentTicket])
   	let _mas = tickets[currentTicket-1].getBlueNums();
   BlueNumbersArray[currentTicket] = _mas;
   let _num = tickets[currentTicket-1].getRedNums();
   RedNumberArray[currentTicket] = _num;
   tickets[currentTicket-1].changeField();
   currentTicket++;
   newText.setText(currentTicket+"/"+numOfTickets);
   tickets[currentTicket-1].changeFieldVisTrue(BlueNumbersArray[currentTicket],RedNumberArray[currentTicket]);
   if(currentTicket == numOfTickets){
   	arrow1.visible = false;
   }
   arrow2.visible = true;*/
			layer_tickets.x += 100;
		};
		//стрелка назад
		arrow2.mousedown = function (moveData) {
			/*let _mas = tickets[currentTicket-1].getBlueNums();
   BlueNumbersArray[currentTicket] = _mas;
   let _num = tickets[currentTicket-1].getRedNums();
   RedNumberArray[currentTicket] = _num;
   tickets[currentTicket-1].changeField();
   currentTicket--;
   newText.setText(currentTicket+"/"+numOfTickets);
   console.log("tickets:",BlueNumbersArray[currentTicket]);
   tickets[currentTicket-1].changeFieldVisTrue(BlueNumbersArray[currentTicket],RedNumberArray[currentTicket]);
   if(currentTicket == 1){
   	arrow2.visible = false;
   }
   arrow1.visible = true;*/
			layer_tickets.x -= 100;
		};

		/*
  	(возможно подчеркивать красным те числа, которые не угадал, а зеленым которые угадал)
  */
		// renderer.autoResize = true;
		// console.log(renderer)
		var _ResizeManager = new _ResizeManager3.default();
		window.addEventListener("resize", function () {
			_ResizeManager.onResize(renderer, stage, _W, _H);
		}, false);
		_ResizeManager.onResize(renderer, stage, _W, _H);
		update();
	}

	/*
 	let btn_remove_ticket = new addButton("remove ticket", 1000, 1010, "remove ticket");
 	stage.addChild(btn_remove_ticket);
 */
}

/*
рядом с каждым билетом крестик
при удалении чистить во всех массивах - и с графикой, и с логикой
*/

/*
пример стрелочной функции
let getTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return hours + ':' + minutes;
};
*/
init();
function update() {
	renderer.render(stage);
	requestAnimationFrame(update);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var myclass = function myclass(text) {
	_classCallCheck(this, myclass);

	console.log(text);
};

exports.default = myclass;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logic = function () {
	function Logic() {
		_classCallCheck(this, Logic);

		var dataPrize = [];
		var dataPowerPlay = [];
		var arWhiteBalls = [];
		var dataTickets = [];
		var redBalls = 0;
		var totalTicket = 1;
		var priceTicket = 2;
		var gotMoney = 0;
		var paidMoney = 0;

		function init() {
			console.log("init");

			dataPrize["5_1"] = "jackpot"; // 1/292,201,338.00
			dataPrize["5_0"] = 1000000; // 1/11,688,053.52
			dataPrize["4_1"] = 50000; // 1/913,129.18
			dataPrize["4_0"] = 100; // 1/36,525.17
			dataPrize["3_1"] = 100; // 1/14,494.11
			dataPrize["3_0"] = 7; // 1/579.76
			dataPrize["2_1"] = 7; // 1/701.33
			dataPrize["1_1"] = 4; // 1/91.98
			dataPrize["0_1"] = 4; // 1/38.32
			dataPowerPlay[0] = 1;
			dataPowerPlay[1] = 2;
			dataPowerPlay[2] = 3;
			dataPowerPlay[3] = 4;
			dataPowerPlay[4] = 5;
			dataPowerPlay[5] = 10;

			redBalls = getBalls(arWhiteBalls);
			console.log("casinoBalls:", arWhiteBalls, redBalls);
			setTicket(totalTicket);
			checkResult();
			showWinners();
		}
		/*
  		returnResult = function(){
  			return arWhiteBalls;
  		}
  */
		init();

		function getBalls(ar) {
			var rnd = 0;
			var count = 5;

			while (count > 0) {
				rnd = Math.ceil(Math.random() * 69);
				if (ar.indexOf(rnd) == -1) {
					ar.push(rnd);
					count--;
				}
			}

			return Math.ceil(Math.random() * 26);
		}

		function setTicket(value) {
			for (var i = 0; i < value; i++) {
				var ar = []; // white balls
				var rb = 0; // red ball
				var pp = Math.round(Math.random() * 5); //power play
				var price = priceTicket + pp;
				rb = getBalls(ar);
				dataTickets.push({ ar: ar, rb: rb, pp: pp, white: 0, red: 0, res: "" });
				gotMoney += price;
				// console.log("ticketBalls:", ar, rb);
			}
		}

		function checkResult() {
			var count = 0;
			for (var i = 0; i < dataTickets.length; i++) {
				var obj = dataTickets[i];
				for (var j = 0; j < arWhiteBalls.length; j++) {
					if (obj.ar.indexOf(arWhiteBalls[j]) > -1) {
						obj.white++;
					}
				}
				if (obj.rb == redBalls) {
					obj.red = 1;
				}
				obj.res = String(obj.white) + "_" + String(obj.red);
				// if(obj.white == 4 && obj.red == 1){
				// count++;
				// }
				//console.log("dataPrize:", obj.res, dataPrize[obj.res]);
			}
			// console.log("count 4:", count);
		}

		function showWinners() {
			var countWinners = 0;
			for (var i = 0; i < dataTickets.length; i++) {
				var obj = dataTickets[i];
				var prize = dataPrize[obj.res];
				if (prize) {
					countWinners++;
					if (prize == "jackpot") {
						console.log("jackpot");
					} else {
						var coef = dataPowerPlay[obj.pp];
						paidMoney += prize * coef;
					}
				}
			}

			console.log("countWinners:", String(countWinners) + "/" + String(totalTicket));
			console.log("gotMoney:", gotMoney);
			console.log("paidMoney:", paidMoney);
		}

		this.dataPrize = dataPrize;

		this.result = {
			arr1: arWhiteBalls,
			red: redBalls
		};
	}

	_createClass(Logic, [{
		key: "getResults",
		value: function getResults() {
			return this.result;
		}
	}, {
		key: "getDataPrize",
		value: function getDataPrize() {
			return this.dataPrize;
		}
	}]);

	return Logic;
}();

exports.default = Logic;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addGraphic = function addGraphic() {
	var _x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	var _y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var _w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

	var _h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

	var _color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0xFFC893;

	var rotate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

	_classCallCheck(this, addGraphic);

	var obj = new PIXI.Container();

	var objImg = new PIXI.Graphics();
	objImg.beginFill(_color).drawRect(-_w / 2, -_h / 2, _w, _h).endFill();
	obj.addChild(objImg);

	obj.x = _x;
	obj.y = _y;
	obj.w = _w;
	obj.h = _h;
	obj.rotation = rotate;
	return obj;
};

exports.default = addGraphic;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _addText = __webpack_require__(0);

var _addText2 = _interopRequireDefault(_addText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addCircle = function addCircle(_name) {
	var _x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var _y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	var _title = arguments[3];

	var _r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;

	var _sizeTF = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 30;

	var _color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0xFFC893;

	var _colorOver = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0xFFF7D2;

	_classCallCheck(this, addCircle);

	var obj = new PIXI.Container();

	var objImg = new PIXI.Graphics();
	objImg.beginFill(_color).drawCircle(0, 0, _r).endFill();
	objImg.position.set(1, 1);
	obj.addChild(objImg);
	obj.over = new PIXI.Graphics();
	obj.over.beginFill(_colorOver).drawCircle(0, 0, _r).endFill();
	obj.over.visible = false;
	obj.addChild(obj.over);
	obj.lock = new PIXI.Graphics();
	obj.lock.beginFill(0x999999).drawCircle(0, 0, _r).endFill();
	obj.lock.visible = false;
	obj.addChild(obj.lock);

	if (_title) {
		obj.tf = new _addText2.default(_title, 0, -_sizeTF / 2, _sizeTF, "#ffffff", "#000000", "center", _r - 20, 4);
		obj.addChild(obj.tf);
	}

	obj.sc = 1;
	obj.x = _x;
	obj.y = _y;
	obj.r = _r;
	obj.name = _name;
	obj._selected = false;
	obj._disabled = false;
	obj.interactive = true;
	obj.buttonMode = true;

	obj.setDisabled = function (value) {
		obj._disabled = value;
		obj.lock.visible = value;
	};

	return obj;
};

exports.default = addCircle;


function a() {
	var b = 1;
	function c() {}
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _addText = __webpack_require__(0);

var _addText2 = _interopRequireDefault(_addText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addButton = function addButton(_name, _x, _y, _title, _w, _h, _sizeTF, _color, _colorOver) {
	_classCallCheck(this, addButton);

	if (_x) {} else {
		_x = 0;
	}
	if (_y) {} else {
		_y = 0;
	}
	if (_w) {} else {
		_w = 200;
	}
	if (_h) {} else {
		_h = 70;
	}
	if (_sizeTF) {} else {
		_sizeTF = 30;
	}
	if (_color) {} else {
		_color = 0xFFC893;
	}
	if (_colorOver) {} else {
		_colorOver = 0xFFF7D2;
	}

	var obj = new PIXI.Container();

	var objImg = new PIXI.Graphics();
	objImg.beginFill(_color).drawRect(-_w / 2, -_h / 2, _w, _h).endFill();
	obj.addChild(objImg);
	obj.over = new PIXI.Graphics();
	obj.over.beginFill(_colorOver).drawRect(-_w / 2, -_h / 2, _w, _h).endFill();
	obj.over.visible = false;
	obj.addChild(obj.over);
	obj.lock = new PIXI.Graphics();
	obj.lock.beginFill(0x999999).drawRect(-_w / 2, -_h / 2, _w, _h).endFill();
	obj.lock.visible = false;
	obj.addChild(obj.lock);

	if (_title) {
		obj.tf = new _addText2.default(_title, 0, 0, _sizeTF, "#ffffff", "#000000", "center", _w - 20, 4);
		obj.tf.x = 0;
		obj.tf.y = -obj.tf.height / 2;
		obj.addChild(obj.tf);
	}

	obj.sc = 1;
	obj.x = _x;
	obj.y = _y;
	obj.w = _w;
	obj.h = _h;
	obj.r = obj.w / 2;
	obj.rr = obj.r * obj.r;
	obj.name = _name;
	obj._selected = false;
	obj._disabled = false;
	obj.interactive = true;
	obj.buttonMode = true;
	if (obj.w < 50) {
		obj.w = 50;
	}
	if (obj.h < 50) {
		obj.h = 50;
	}

	obj.setDisabled = function (value) {
		obj._disabled = value;
		obj.lock.visible = value;
	};

	return obj;
};

exports.default = addButton;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addText = __webpack_require__(0);

var _addText2 = _interopRequireDefault(_addText);

var _Preloader = __webpack_require__(1);

var _Preloader2 = _interopRequireDefault(_Preloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//TODO оптимизировать циклы, избавиться от одинакового кода
var addTicket = function () {
	//constructor выполняется по умолчанию
	function addTicket(first, callback, parent) {
		var _this = this;

		_classCallCheck(this, addTicket);

		//TODO параметром будет флаг показывающий, является ли билет первым (если он первый, не будет крестика)
		//также передавать родителя и колбэк
		//указывает на конструктор
		var _self = this;
		//слой, в который отрисовываются все ячейки (графика)
		var obj = new PIXI.Container();
		//массив, в который пушатся синие (для клика и получения номера)
		var mas = [];
		//массив, в который пушатся красные (для клика и получения номера)
		var mas2 = [];
		//координаты, в которые отрисовываются ячейки
		var _x = 0;
		var _y = 0;

		//счет (чтобы нельзя было нажать все ячейки)
		this.score = 0;
		this.score2 = 0;

		var bg_ticket_layer = new PIXI.Container();
		var bg_ticket = new PIXI.Sprite.fromImage(_Preloader2.default.getimg('bg').path);
		bg_ticket.x -= 12;
		bg_ticket.y -= 12;
		bg_ticket_layer.addChild(bg_ticket);

		obj.addChild(bg_ticket_layer);
		bg_ticket_layer.width = bg_ticket_layer.width;

		//TODO рисуем крестик для удаления билета
		if (first == false) {
			var close_btn = new PIXI.Sprite.fromImage(_Preloader2.default.getimg('blue_selected').path);
			close_btn.y = -25;
			close_btn.x = 174;
			close_btn.interactive = true;
			close_btn.buttonMode = true;

			close_btn.mousedown = function (e) {
				// close_btn.
				if (callback) callback();
			};

			obj.addChild(close_btn);
		}

		//рисуем синие

		var _loop = function _loop(i) {
			var newBlueField = new PIXI.Container();

			var bb = PIXI.Sprite.fromImage('../../images/buttons/btnNW_0001.png');
			var bb2 = PIXI.Sprite.fromImage('../../images/buttons/btnNW_0003.png');
			newBlueField.addChild(bb);
			newBlueField.addChild(bb2);
			bb2.visible = false;
			bb.visible = true;
			obj.addChild(newBlueField);
			newBlueField.x = _x;
			newBlueField.y = _y;
			newBlueField.name = i;

			obj.tf = new _addText2.default(i, _x + 13, _y + 3, 20, undefined, undefined, "center");
			obj.addChild(obj.tf);

			// if(i%6)_y+=26;
			if (i % 6 == 0) {
				_y += 30;
				_x = 0;
			} else {
				_x += 30;
			}

			newBlueField.interactive = true;
			newBlueField.buttonMode = true;

			newBlueField.mousedown = function (e) {
				// console.log(e.target.name);
				if (bb.visible && _this.score > 4) return;

				if (bb.visible) _this.score++;else _this.score--;

				bb2.visible = !bb2.visible;
				bb.visible = !bb.visible;
				// console.log(this.score)
			};
			mas.push(newBlueField);
		};

		for (var i = 1; i < 70; i++) {
			_loop(i);
		}

		_y += 40;
		_x = 0;

		//рисуем красные

		var _loop2 = function _loop2(i) {
			var newBlueField = new PIXI.Container();

			var bb = PIXI.Sprite.fromImage('../../images/buttons/btnNR_0001.png');
			var bb2 = PIXI.Sprite.fromImage('../../images/buttons/btnNR_0003.png');
			newBlueField.addChild(bb);
			newBlueField.addChild(bb2);
			bb2.visible = false;
			bb.visible = true;
			obj.addChild(newBlueField);
			newBlueField.x = _x;
			newBlueField.y = _y;
			newBlueField.name = i;

			obj.tf = new _addText2.default(i, _x + 13, _y + 3, 20, undefined, undefined, "center");
			obj.addChild(obj.tf);

			// if(i%6)_y+=26;
			if (i % 6 == 0) {
				_y += 30;
				_x = 0;
			} else {
				_x += 30;
			}

			newBlueField.interactive = true;
			newBlueField.buttonMode = true;

			newBlueField.mousedown = function (moveData) {
				// console.log(this.name);
				if (bb.visible && _self.score2 > 0) return;

				if (bb.visible) _self.score2++;else _self.score2--;

				bb2.visible = !bb2.visible;
				bb.visible = !bb.visible;
				// console.log(_self.score2)
			};
			mas2.push(newBlueField);
		};

		for (var i = 1; i < 30; i++) {
			_loop2(i);
		}
		this.obj = obj;
		this.mas = mas;
		this.mas2 = mas2;
	}

	_createClass(addTicket, [{
		key: "getObj",
		value: function getObj() {
			//возвращаем слой, чтобы нарисовать его на экране
			return this.obj;
		}
	}, {
		key: "changeField",
		value: function changeField() {
			//очищаем поле от выбранных ячеек (для переключения между билетами)
			this.score = 0;
			this.score2 = 0;
			this.mas.forEach(function (item, i, arr) {
				if (item.children[1].visible == true) {
					item.children[1].visible = false;
					item.children[0].visible = true;
				}
			});
			this.mas2.forEach(function (item, i, arr) {
				if (item.children[1].visible == true) {
					item.children[1].visible = false;
					item.children[0].visible = true;
				}
			});
		}
	}, {
		key: "getBlueNums",
		value: function getBlueNums() {
			//получаем массив с номерами синих
			var numArr = [];
			this.mas.forEach(function (item, i, arr) {
				if (item.children[1].visible == true) {
					numArr.push(item.name);
				}
			});
			return numArr;
		}
	}, {
		key: "getRedNums",
		value: function getRedNums() {
			//получаем массив с номерами красных
			var numArr = undefined;
			this.mas2.forEach(function (item, i, arr) {
				if (item.children[1].visible == true) {
					numArr = item.name;
				}
			});
			return numArr;
		}
	}, {
		key: "changeFieldVisTrue",
		value: function changeFieldVisTrue(_masBlue, _red) {
			//отображаем заполненный билет
			// console.log("changeFieldVisTrue",_masBlue, _red)

			//синие
			if (_masBlue) {
				this.score = _masBlue.length;
				this.mas.forEach(function (item, i, arr) {
					for (var j = 0; j < _masBlue.length; j++) {
						// console.log(item.name,_masBlue[j])
						if (item.children[1].visible == false && item.name == _masBlue[j]) {
							item.children[1].visible = true;
							item.children[0].visible = false;
						}
					}
				});
			}

			//красные
			if (_red != undefined) {
				// console.log("2")
				this.score2 = 1;
				this.mas2.forEach(function (item, i, arr) {
					if (item.children[1].visible == false && item.name == _red) {
						item.children[1].visible = true;
						item.children[0].visible = false;
					}
				});
			}
		}
	}]);

	return addTicket;
}();

exports.default = addTicket;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResizeManager = function () {
    function ResizeManager() {
        _classCallCheck(this, ResizeManager);

        this.globalScale = 1;
        this.isCanvas = true;
        this.renderSize = 1;
        this.stageScale = 1;
    }

    _createClass(ResizeManager, [{
        key: 'onResize',
        value: function onResize(renderer, stage, _W, _H) {
            if (!renderer) return;

            var realW = window.innerWidth;
            var realH = window.innerHeight;

            this.globalScale = Math.min(realW / _W, realH / _H);

            if (renderer instanceof PIXI.CanvasRenderer) this.isCanvas = true;else this.isCanvas = false;

            renderer.resize(_W / this.renderSize, _H / this.renderSize);

            renderer.view.style.width = _W * this.globalScale + 'px';
            renderer.view.style.height = _H * this.globalScale + 'px';

            renderer.view.style.position = 'absolute';
            renderer.view.style.left = realW / 2 - _W * this.globalScale / 2 + 'px';
            renderer.view.style.top = realH / 2 - _H * this.globalScale / 2 + 'px';

            stage.scale.x = this.stageScale;
            stage.scale.y = this.stageScale;
        }
    }]);

    return ResizeManager;
}();

exports.default = ResizeManager;

/***/ })
/******/ ]);