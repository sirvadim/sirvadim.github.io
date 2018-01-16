import myclass from "./main2"
import addText from "./core/addText"
import addGraphic from "./core/addGraphic"

var app = new myclass("hello!");


var _W = 800; // game width
var _H = 600; // game height

var renderer, stage; // pixi;

/*

хотрелоад

*/

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
var newText = new addText("helooo wooorld",undefined,undefined,undefined,undefined,"#ff00fc");
var newGr = new addGraphic();
stage.addChild(newGr)
stage.addChild(newText);
console.log(newText.getText())
	update();

	console.log("???")
}
init()
function update() {
	renderer.render(stage);
	requestAnimationFrame(update);
}

console.log("work!")
console.log(PIXI)
