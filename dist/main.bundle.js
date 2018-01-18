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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _main2.default("hello!");
var logic = new _Logic2.default("hello!");

var _W = 1920; // game width
var _H = 1080; // game height

var renderer, stage; // pixi;

function init() {
	//initialize the stage
	renderer = PIXI.autoDetectRenderer(_W, _H);
	console.log(document.body);
	document.body.appendChild(renderer.view);
	stage = new PIXI.Container();
	var layer = new PIXI.Container();

	var graphics = new PIXI.Graphics();

	graphics.beginFill(0xFFFF00);

	// set the line style to have a width of 5 and set the color to red
	graphics.lineStyle(5, 0xFF0000);

	// draw a rectangle
	graphics.drawRect(0, 0, 300, 200);

	layer.addChild(graphics);
	stage.addChild(layer);
	var newText = new _addText2.default("helooo wooorld", undefined, undefined, undefined, undefined, "#ff00fc");
	//var newGr = new addGraphic();
	var newC = new _addCircle2.default("1");
	//stage.addChild(newGr)
	stage.addChild(newText);
	stage.addChild(newC);

	console.log("???");

	var _x = 1300;
	var _y = 100;
	for (var i = 1; i <= 69; i++) {

		var newCircle = new _addCircle2.default(i, _x, _y, i, 25);
		if (i % 8 == 0) {
			_y += 55;
			_x = 1300;
		} else _x += 55;
		stage.addChild(newCircle);
	}
	console.log(newText.getSize());
	console.log(newText.getSize());
	console.log(newText.getSize());
	/*stage.interactive = true;
 stage.mousedown = function (moveData) {	console.log("mousedown stage ");};
 */
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logic = function Logic() {
	_classCallCheck(this, Logic);

	var dataPrize = [];
	var dataPowerPlay = [];
	var arWhiteBalls = [];
	var dataTickets = [];
	var redBalls = 0;
	var totalTicket = 1000;
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
};

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
	obj.interactive = true;

	obj.mousedown = function (moveData) {
		console.log(obj.name);
		obj.over.visible = !obj.over.visible;
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addGraphic = function addGraphic(name) {
	var _x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var _y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	var _scGr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

	var _scaleX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

	var _scaleY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

	_classCallCheck(this, addGraphic);

	var obj = new PIXI.Container();

	var objImg = null;
	obj.setImg = function (name) {
		objImg = addObj(name);
		obj.addChild(objImg);
		obj.over = addObj(name + "Over");
		if (obj.over) {
			obj.over.visible = false;
			obj.addChild(obj.over);
		} else obj.over = null;

		obj.lock = addObj(name + "Lock");
		if (obj.lock) {
			obj.lock.visible = false;
			obj.addChild(obj.lock);
		} else obj.lock = null;

		obj.sc = _scGr;
		obj.scale.x = _scGr * _scaleX;
		obj.scale.y = _scGr * _scaleY;
		obj.vX = _scaleX;
		obj.vY = _scaleY;
		obj.x = _x;
		obj.y = _y;
		obj.w = objImg.width * _scGr;
		obj.h = objImg.height * _scGr;
		obj.r = obj.w / 2;
		obj.rr = obj.r * obj.r;
		obj.name = name;
		obj._selected = false;
		if (obj.w < 50) obj.w = 50;
		if (obj.h < 50) obj.h = 50;
	};

	obj.setImg(name);

	return obj;
};

exports.default = addGraphic;

/***/ })
/******/ ]);