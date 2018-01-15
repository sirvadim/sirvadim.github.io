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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(1);

var _main2 = _interopRequireDefault(_main);

var _addText = __webpack_require__(2);

var _addText2 = _interopRequireDefault(_addText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _main2.default("hello!");
var newText = new _addText2.default("helooo wooorld");
console.log("work!");

/***/ }),
/* 1 */
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
/* 2 */
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
	var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "#FFFFFF";
	var glow = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

	var _align = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "center";

	var width = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 600;
	var px = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 2;
	var font = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : "Archivo Black";

	_classCallCheck(this, addText);

	var style;

	if (glow) {
		style = {
			font: size + "px " + font,
			fill: color,
			align: _align,
			stroke: glow,
			strokeThickness: px,
			wordWrap: true,
			wordWrapWidth: width
		};
	} else {
		style = {
			font: size + "px " + font,
			fill: color,
			align: _align,
			wordWrap: true,
			wordWrapWidth: width
		};
	}

	var obj = new PIXI.Container();

	var tfMain = new PIXI.Text(text, style);
	tfMain.y = 0;
	obj.addChild(tfMain);
	if (_align == "left") {
		tfMain.x = 0;
	} else if (_align == "right") {
		tfMain.x = -tfMain.width;
	} else {
		tfMain.x = -tfMain.width / 2;
	}

	obj.width = Math.ceil(tfMain.width);
	obj.height = Math.ceil(tfMain.height);

	obj.setText = function (value) {
		tfMain.text = value;
		if (_align == "left") {
			tfMain.x = 0;
		} else if (_align == "right") {
			tfMain.x = -tfMain.width;
		} else {
			tfMain.x = -tfMain.width / 2;
		}
	};

	obj.getText = function () {
		return tfMain.text;
	};

	obj.x = _x;
	obj.y = _y;

	return obj;
};

exports.default = addText;

/***/ })
/******/ ]);