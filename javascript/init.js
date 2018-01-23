import myclass from "./main2"
import Logic from "./Logic"
import addText from "./core/addText"
import addGraphic from "./core/addGraphic"
import addCircle from "./core/addCircle"
import addButton from "./core/addButton"
import addTicket from "./core/addTicket"

let app = new myclass("hello!");

let _W = 1920; // game width
let _H = 1080; // game height

let renderer, stage; // pixi;

let tickets = [
	/*[
	[],[]
	]*/
]

let BlueNumbersArray = [];
let RedNumberArray = [];

let numOfTickets = 1;
let currentTicket = 1;

function init() {
	//initialize the stage
	renderer = PIXI.autoDetectRenderer(_W, _H);
	// console.log(document.body);
	document.body.appendChild(renderer.view);
	stage = new PIXI.Container();
	renderer.backgroundColor = 0x2F4F4F;

	let newText = new addText(currentTicket+"/"+numOfTickets,520,200);

	stage.addChild(newText);

	let btn_roll = new addButton("roll", 200, 400, "roll");
	stage.addChild(btn_roll);

	let btn_ticket = new addButton("new ticket", 200, 520, "new ticket");
	stage.addChild(btn_ticket);

	let btn_remove_ticket = new addButton("remove ticket", 200, 640, "remove ticket");
	stage.addChild(btn_remove_ticket);

	btn_roll.mousedown = function (moveData) {
		let _logic = new Logic();
		let logic = _logic.getResults();

		let white = 0;
		let red = 0;


		//мы не можем отследить, менялись ли значения в текущем билете, прежде чем был нажат ролл.
		//заново получаем его данные
		let _mas = _ticket.getBlueNums();
		BlueNumbersArray[currentTicket] = _mas;
		let _num = _ticket.getRedNums();
		RedNumberArray[currentTicket] = _num;

		//проверка на заполненность ВСЕХ билетов включая текущий
		if(BlueNumbersArray[currentTicket] == undefined || RedNumberArray[currentTicket] == undefined){
			alert("fill ticket correctly!");
			return;
		}

		for(let i = 1; i <= numOfTickets; i++){
			if(BlueNumbersArray[i].length != 5 || RedNumberArray[i] == undefined){
				alert("fill ticket correctly!");
				return;
			}
		}

		//все билеты заполнены! проверяем каждый на выигрыш
		for(let i = 1; i <= numOfTickets; i++){
			//i наш текущий билет
			//подсчитываем сколько мы угадали синих

			//и угадали ли мы красный

			//показываем результат
			/*mas_btns1.forEach(function(item, i, arr) {
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
			let prize = _logic.getDataPrize();
			if(prize[white+"_"+red]){
				console.log("выигрыш: ",prize[white+"_"+red]);
			} else {
				console.log("проиграл")
			}*/

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
	};

	btn_remove_ticket.mousedown = function (moveData) {
		if(currentTicket == 1){
			alert("cant remove first ticket")
			return;
		}

		numOfTickets--;
		BlueNumbersArray.splice(currentTicket);
		RedNumberArray.splice(currentTicket);
		newText.setText(currentTicket+"/"+numOfTickets);
		//arrow2.mousedown();

		_ticket.changeField();
		currentTicket--;
		newText.setText(currentTicket+"/"+numOfTickets);
		_ticket.changeFieldVisTrue(BlueNumbersArray[currentTicket],RedNumberArray[currentTicket]);

		if(currentTicket == 1){
			arrow2.visible = false;
		}

		if(numOfTickets == 1)
			arrow1.visible = false;
	}

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

	//стрелка вперед
	arrow1.mousedown = function (moveData) {
		let _mas = _ticket.getBlueNums();
		BlueNumbersArray[currentTicket] = _mas;
		let _num = _ticket.getRedNums();
		RedNumberArray[currentTicket] = _num;
		_ticket.changeField();
		currentTicket++;
		newText.setText(currentTicket+"/"+numOfTickets);
		_ticket.changeFieldVisTrue(BlueNumbersArray[currentTicket],RedNumberArray[currentTicket]);
		if(currentTicket == numOfTickets){
			arrow1.visible = false;
		}
		arrow2.visible = true;
	}
	//стрелка назад
	arrow2.mousedown = function (moveData) {
		let _mas = _ticket.getBlueNums();
		BlueNumbersArray[currentTicket] = _mas;
		let _num = _ticket.getRedNums();
		RedNumberArray[currentTicket] = _num;
		_ticket.changeField();
		currentTicket--;
		newText.setText(currentTicket+"/"+numOfTickets);
		console.log("tickets:",BlueNumbersArray[currentTicket]);
		_ticket.changeFieldVisTrue(BlueNumbersArray[currentTicket],RedNumberArray[currentTicket]);
		if(currentTicket == 1){
			arrow2.visible = false;
		}
		arrow1.visible = true;
	}

	/*
		при rolle проверять все билеты (что они заполнены)
		показывать результат (возможно подчеркивать красным те числа, которые не угадал, а зеленым которые угадал)
	*/

	update();
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
function update() {
	renderer.render(stage);
	requestAnimationFrame(update);
}