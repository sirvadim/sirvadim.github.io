import myclass from "./main2"
import Logic from "./Logic"
import addText from "./core/addText"
import addGraphic from "./core/addGraphic"
import addCircle from "./core/addCircle"
import addButton from "./core/addButton"
import addTicket from "./core/addTicket"

var app = new myclass("hello!");

var _W = 1920; // game width
var _H = 1080; // game height

var renderer, stage; // pixi;

let tickets = [
	/*[
	[],[]
	]*/
]

let numOfTickets = 1;
let currentTicket = 1;

function init() {
	//initialize the stage
	renderer = PIXI.autoDetectRenderer(_W, _H);
	console.log(document.body);
	document.body.appendChild(renderer.view);
	stage = new PIXI.Container();
	renderer.backgroundColor = 0x2F4F4F;
	/*пример текста*/
	var newText = new addText(currentTicket+"/"+numOfTickets);
	newText.x = 520;
	newText.y = 200;

	stage.addChild(newText);

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

	let btn_roll = new addButton("roll", 200, 400, "roll");
	stage.addChild(btn_roll);

	let btn_ticket = new addButton("new ticket", 200, 520, "new ticket");
	stage.addChild(btn_ticket);

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
		if(numOfTickets==25){
			alert("TICKETS LIMIT!");
			return;
		}
		numOfTickets++;
		arrow1.visible=true;
		newText.setText(currentTicket+"/"+numOfTickets);
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
	let _ticket = new addTicket();
	let ticket = _ticket.getObj();
	stage.addChild(ticket);
	ticket.x=450;
	ticket.y=250;
	let arrow1 = PIXI.Sprite.fromImage('../../images/buttons/arrow.png');
	let arrow2 = PIXI.Sprite.fromImage('../../images/buttons/arrow.png');
	stage.addChild(arrow1);
	stage.addChild(arrow2);
	arrow1.scale.x/=-8;
	arrow1.scale.y/=8;
	arrow2.scale.x/=8;
	arrow2.scale.y/=8;
	arrow1.x=720
	arrow2.x=360
	arrow1.y = 450;
	arrow2.y = 450;

	arrow1.interactive = true;
	arrow1.buttonMode = true;

	arrow2.interactive = true;
	arrow2.buttonMode = true;

	arrow1.visible=false;
	arrow2.visible=false;
	arrow1.mousedown = function (moveData) {
		_ticket.getNums();
		_ticket.changeField();
		currentTicket++;
		newText.setText(currentTicket+"/"+numOfTickets);
		if(currentTicket == numOfTickets){
			arrow1.visible=false;
			arrow2.visible=true;
		}
	}

	arrow2.mousedown = function (moveData) {
		currentTicket--;
		newText.setText(currentTicket+"/"+numOfTickets);
		if(currentTicket == 1){
			arrow1.visible=true;
			arrow2.visible=false;
		}
	}

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
