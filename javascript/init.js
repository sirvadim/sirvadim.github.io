import myclass from "./main2"
import Logic from "./Logic"
import addText from "./core/addText"
import addGraphic from "./core/addGraphic"
import addCircle from "./core/addCircle"
import addButton from "./core/addButton"

var app = new myclass("hello!");
var logic = new Logic("hello!");

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
	var newText = new addText("helooo wooorld",undefined,undefined,undefined,undefined,"#ff00fc");
	//var newGr = new addGraphic();
	var newC = new addCircle("1");
	//stage.addChild(newGr)
	stage.addChild(newText);
	stage.addChild(newC)

	

	console.log("???")

	let _x = 1300;
	let _y = 100;
	for (var i = 1; i <= 69; i++) {
		
		let newCircle = new addCircle(i, _x, _y, i, 25);
		if(i % 8 == 0){
			_y += 55;
			_x = 1300;
		} else 
			_x += 55;
		stage.addChild(newCircle);
	}
	console.log(newText.getSize())
	console.log(newText.getSize())
	console.log(newText.getSize())
	/*stage.interactive = true;
	stage.mousedown = function (moveData) {	console.log("mousedown stage ");};
*/
	update();
}
let getTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return hours + ':' + minutes;
};

init()
function update() {
	renderer.render(stage);
	requestAnimationFrame(update);
}

console.log("work!")
console.log(PIXI)
