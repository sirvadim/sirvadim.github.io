import myclass from "./main2"
import Logic from "./Logic"
import addText from "./core/addText"
import addGraphic from "./core/addGraphic"
import addCircle from "./core/addCircle"
import addButton from "./core/addButton"

var app = new myclass("hello!");

var _W = 1920; // game width
var _H = 1080; // game height

var renderer, stage; // pixi;

let tickets = [
	/*[
	[],[]
	]*/
]

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
	var newText = new addText("dasfagkihfdjhadsappMYAAA",undefined,undefined,undefined,undefined,"#ff00fc");
	//var newGr = new addGraphic();
	var newC = new addCircle("1");
	//stage.addChild(newGr)
	stage.addChild(newText);
	stage.addChild(newC)

	

	console.log("???")

	let _x = 1000;
	let _y = 100;
	const NUM_group1 = 5;
	const NUM_group2 = 1;

	let num_group1 = 0;
	let num_group2 = 0;

	let mas_btns1 = [];
	let mas_btns2 = [];
	
	for (var i = 1; i <= 69; i++) {
		let newCircle = new addCircle(i, _x, _y, i, 25);
		mas_btns1.push(newCircle);
		newCircle.mousedown = function (moveData) {
			if (num_group1 > 4 && !newCircle.over.visible)
				return;
			newCircle.over.visible ? num_group1-- : num_group1++;
			newCircle.over.visible = !newCircle.over.visible
		};
		if(i % 8 == 0){
			_y += 55;
			_x = 1000;
		} else 
			_x += 55;
		stage.addChild(newCircle);
	}

	_x = 1000;
	_y = 700;



	for (var i = 1; i <= 26; i++) {
		
		let newCircle = new addCircle(i, _x, _y, i, 25);
		mas_btns2.push(newCircle);

		newCircle.mousedown = function (moveData) {
			if (num_group2 > 0 && !newCircle.over.visible)
				return;
			newCircle.over.visible ? num_group2-- : num_group2++;
			newCircle.over.visible = !newCircle.over.visible
		};
		if(i % 8 == 0){
			_y += 55;
			_x = 1000;
		} else 
			_x += 55;
		stage.addChild(newCircle);
	}

	let btn_roll = new addButton("roll", 200, 400);
	stage.addChild(btn_roll);

	let btn_ticket = new addButton("new ticket", 200, 520);
	stage.addChild(btn_ticket);

	console.log(newText.getSize())
	console.log(newText.getSize())
	console.log(newText.getSize())

	btn_roll.mousedown = function (moveData) {
		var _logic = new Logic();
		var logic = _logic.getResults();
		// console.log("logic",logic)
		// console.log("btn_roll");
		let white = 0;
		let red = 0;
		mas_btns1.forEach(function(item, i, arr) {
		  	if(item.over.visible){
		  		for(let j = 0; j < 5; j++)
		  			if(item.name == logic.arr1[j])
		  				white++;
		  	}
		});
		mas_btns2.forEach(function(item, i, arr) {
		  	if(item.over.visible){
	  			if(item.name == logic.red)
	  				red++;
		  	}
		});
		// console.log("itog:",white, red);
		var prize = _logic.getDataPrize();
		if(prize[white+"_"+red]){
			console.log("выигрыш: ",prize[white+"_"+red]);
		} else {
			console.log("проиграл")
		}

		for (var i = tickets.length - 1; i >= 0; i--) {
			let white = 0;
			let red = 0;
			let curticket = tickets[i];
			var whites = curticket[0]
			console.log(curticket[0], curticket[1])

			for (var k = 0; k < 5; k++){
				for(let j = 0; j < 5; j++)
					if (whites[k] == logic.arr1[j])
						white ++;
			}

			if(curticket[1] == logic.red){
				red ++;
			}

			prize = _logic.getDataPrize();
			if(prize[white+"_"+red]){
				console.log("выигрыш: ",prize[white+"_"+red]);
			} else {
				console.log("проиграл")
			}
		}
	};

	btn_ticket.mousedown = function (moveData) {
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

		console.log("new ticket! prev length:",tickets.length);
	};
	//покупка тикетов, получение выигрыша
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
