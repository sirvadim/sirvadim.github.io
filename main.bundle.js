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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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


var _main = __webpack_require__(2);

var _main2 = _interopRequireDefault(_main);

var _Logic = __webpack_require__(3);

var _Logic2 = _interopRequireDefault(_Logic);

var _addText = __webpack_require__(0);

var _addText2 = _interopRequireDefault(_addText);

var _addGraphic = __webpack_require__(4);

var _addGraphic2 = _interopRequireDefault(_addGraphic);

var _addCircle = __webpack_require__(5);

var _addCircle2 = _interopRequireDefault(_addCircle);

var _addButton = __webpack_require__(6);

var _addButton2 = _interopRequireDefault(_addButton);

var _addTicket = __webpack_require__(7);

var _addTicket2 = _interopRequireDefault(_addTicket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _main2.default("hello!");

var _W = 1920; // game width
var _H = 1080; // game height

var renderer, stage; // pixi;

var tickets = [
	/*[
 [],[]
 ]*/
];

var numOfTickets = 1;
var currentTicket = 1;

function init() {
	//initialize the stage
	renderer = PIXI.autoDetectRenderer(_W, _H);
	console.log(document.body);
	document.body.appendChild(renderer.view);
	stage = new PIXI.Container();
	renderer.backgroundColor = 0x2F4F4F;
	/*пример текста*/
	var newText = new _addText2.default(currentTicket + "/" + numOfTickets);
	newText.x = 520;
	newText.y = 200;

	stage.addChild(newText);

	var _x = 1000;
	var _y = 100;
	var NUM_group1 = 5;
	var NUM_group2 = 1;

	var num_group1 = 0;
	var num_group2 = 0;

	var mas_btns1 = [];
	var mas_btns2 = [];

	var _loop = function _loop() {
		var newCircle = new _addCircle2.default(i, _x, _y, i, 25);
		mas_btns1.push(newCircle);
		newCircle.mousedown = function (moveData) {
			if (num_group1 > 4 && !newCircle.over.visible) return;
			newCircle.over.visible ? num_group1-- : num_group1++;
			newCircle.over.visible = !newCircle.over.visible;
		};
		if (i % 8 == 0) {
			_y += 55;
			_x = 1000;
		} else _x += 55;
		stage.addChild(newCircle);
	};

	for (var i = 1; i <= 69; i++) {
		_loop();
	}

	_x = 1000;
	_y = 700;

	var _loop2 = function _loop2() {

		var newCircle = new _addCircle2.default(i, _x, _y, i, 25);
		mas_btns2.push(newCircle);

		newCircle.mousedown = function (moveData) {
			if (num_group2 > 0 && !newCircle.over.visible) return;
			newCircle.over.visible ? num_group2-- : num_group2++;
			newCircle.over.visible = !newCircle.over.visible;
		};
		if (i % 8 == 0) {
			_y += 55;
			_x = 1000;
		} else _x += 55;
		stage.addChild(newCircle);
	};

	for (var i = 1; i <= 26; i++) {
		_loop2();
	}

	var btn_roll = new _addButton2.default("roll", 200, 400, "roll");
	stage.addChild(btn_roll);

	var btn_ticket = new _addButton2.default("new ticket", 200, 520, "new ticket");
	stage.addChild(btn_ticket);

	btn_roll.mousedown = function (moveData) {
		var _logic = new _Logic2.default();
		var logic = _logic.getResults();
		// console.log("logic",logic)
		// console.log("btn_roll");
		var white = 0;
		var red = 0;
		mas_btns1.forEach(function (item, i, arr) {
			if (item.over.visible) {
				for (var j = 0; j < 5; j++) {
					if (item.name == logic.arr1[j]) white++;
				}
			}
		});
		mas_btns2.forEach(function (item, i, arr) {
			if (item.over.visible) {
				if (item.name == logic.red) red++;
			}
		});
		// console.log("itog:",white, red);
		var prize = _logic.getDataPrize();
		if (prize[white + "_" + red]) {
			console.log("выигрыш: ", prize[white + "_" + red]);
		} else {
			console.log("проиграл");
		}

		for (var i = tickets.length - 1; i >= 0; i--) {
			var _white = 0;
			var _red = 0;
			var curticket = tickets[i];
			var whites = curticket[0];
			console.log(curticket[0], curticket[1]);

			for (var k = 0; k < 5; k++) {
				for (var j = 0; j < 5; j++) {
					if (whites[k] == logic.arr1[j]) _white++;
				}
			}

			if (curticket[1] == logic.red) {
				_red++;
			}

			prize = _logic.getDataPrize();
			if (prize[_white + "_" + _red]) {
				console.log("выигрыш: ", prize[_white + "_" + _red]);
			} else {
				console.log("проиграл");
			}
		}
	};

	btn_ticket.mousedown = function (moveData) {
		if (numOfTickets == 25) {
			alert("TICKETS LIMIT!");
			return;
		}
		numOfTickets++;
		arrow1.visible = true;
		newText.setText(currentTicket + "/" + numOfTickets);
		/*
  		let white = 0;
  		let red = 0;
  		let mas_ticket = [];
  		let mas_white = [];
  		let num_red;
  		mas_btns1.forEach(function(item, i, arr) {
  		  	if(item.over.visible){
  		  		white++;
  		  		mas_white.push(item.name);
  		  	}
  		});
  		mas_btns2.forEach(function(item, i, arr) {
  		  	if(item.over.visible){
    				red++;
    				num_red = item.name;
  		  	}
  		});
  
  		if (white != 5 || red != 1){
  			alert("fill ticket correctly!");
  			return;
  		}
  
  		mas_ticket.push(mas_white);
  		mas_ticket.push(num_red);
  
  		tickets.push(mas_ticket);
  
  		mas_btns1.forEach(function(item, i, arr) {
  		  	if(item.over.visible){
  		  		item.over.visible = !item.over.visible;
  		  	}
  		});
  		mas_btns2.forEach(function(item, i, arr) {
  		  	if(item.over.visible){
  		  		item.over.visible = !item.over.visible;
  		  	}
  		});
  
  		num_group1 = 0;
  		num_group2 = 0;
  
  		console.log("new ticket! prev length:",tickets.length);*/
	};
	//покупка тикетов, получение выигрыша
	/*stage.interactive = true;
 stage.mousedown = function (moveData) {	console.log("mousedown stage ");};
 */
	var _ticket = new _addTicket2.default();
	var ticket = _ticket.getObj();
	stage.addChild(ticket);
	ticket.x = 450;
	ticket.y = 250;
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
	arrow1.y = 450;
	arrow2.y = 450;

	arrow1.interactive = true;
	arrow1.buttonMode = true;

	arrow2.interactive = true;
	arrow2.buttonMode = true;

	arrow1.visible = false;
	arrow2.visible = false;
	arrow1.mousedown = function (moveData) {
		_ticket.getNums();
		_ticket.changeField();
		currentTicket++;
		newText.setText(currentTicket + "/" + numOfTickets);
		if (currentTicket == numOfTickets) {
			arrow1.visible = false;
			arrow2.visible = true;
		}
	};

	arrow2.mousedown = function (moveData) {
		currentTicket--;
		newText.setText(currentTicket + "/" + numOfTickets);
		if (currentTicket == 1) {
			arrow1.visible = true;
			arrow2.visible = false;
		}
	};

	update();
}
var getTime = function getTime() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	return hours + ':' + minutes;
};

init();
function update() {
	renderer.render(stage);
	requestAnimationFrame(update);
}

console.log("work!");
console.log(PIXI);

/***/ }),
/* 2 */
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
/* 3 */
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
				console.log("dataPrize:", obj.res, dataPrize[obj.res]);
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
		/*
  	static getResults(){
  		return result;
  	}
  /*
  	get getResults(){
  		return result;
  	}*/

	}]);

	return Logic;
}();

exports.default = Logic;

/***/ }),
/* 4 */
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
/* 5 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addText = __webpack_require__(0);

var _addText2 = _interopRequireDefault(_addText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addTicket = function () {
	function addTicket() {
		var _this = this;

		_classCallCheck(this, addTicket);

		var obj = new PIXI.Container();
		var mas = [];
		var _x = 0;
		var _y = 0;
		var _self = this;
		this.score = 0;
		this.score2 = 0;

		console.log(this.score);
		console.log(this.score2);

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
			console.log(newBlueField.height);

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
				console.log(e.target.name);
				if (bb.visible && _this.score > 4) return;

				if (bb.visible) _this.score++;else _this.score--;

				bb2.visible = !bb2.visible;
				bb.visible = !bb.visible;
				console.log(_this.score);
			};
			mas.push(newBlueField);
		};

		for (var i = 1; i < 70; i++) {
			_loop(i);
		}

		_y += 60;
		_x = 0;

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
			console.log(newBlueField.height);

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
				console.log(this.name);
				if (bb.visible && _self.score2 > 0) return;

				if (bb.visible) _self.score2++;else _self.score2--;

				bb2.visible = !bb2.visible;
				bb.visible = !bb.visible;
				console.log(_self.score2);
			};
			mas.push(newBlueField);
		};

		for (var i = 1; i < 30; i++) {
			_loop2(i);
		}
		this.obj = obj;
		//return obj;
		this.mas = mas;
	}

	_createClass(addTicket, [{
		key: 'getObj',
		value: function getObj() {
			//console.log(this.obj);
			return this.obj;
		}
	}, {
		key: 'changeField',
		value: function changeField() {
			var _self = this;
			_self.score = 0;
			_self.score2 = 0;
			this.mas.forEach(function (item, i, arr) {
				if (item.children[1].visible == true) {
					item.children[1].visible = false;
					item.children[0].visible = true;
				}
			});
			console.log("works");
		}
	}, {
		key: 'getNums',
		value: function getNums() {
			var numArr = [];
			this.mas.forEach(function (item, i, arr) {
				if (item.children[1].visible == true) {
					numArr.push(item.name);
					console.log(item.name);
				}
			});
			return numArr;
		}
	}]);

	return addTicket;
}();

exports.default = addTicket;

/***/ })
/******/ ]);