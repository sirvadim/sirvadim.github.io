import myclass from "./main2"
import Logic from "./Logic"
import addText from "./core/addText"
import addGraphic from "./core/addGraphic"
import addCircle from "./core/addCircle"
import addButton from "./core/addButton"
import addTicket from "./core/addTicket"
import ResizeManager from "./core/ResizeManager"

let app = new myclass("hello!");

let _W = 1920; // game width
let _H = 1080; // game height

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

function init() {
	//initialize the stage
	var s=document.documentElement.style;
	s.cssText=s.cssText?"":"overflow:hidden;width:100%;height:100%";

	renderer = PIXI.autoDetectRenderer(_W, _H);
	// console.log(document.body);
	document.body.appendChild(renderer.view);
	stage = new PIXI.Container();
	renderer.backgroundColor = 0x2F4F4F;

	let newText = new addText(currentTicket+"/"+numOfTickets,_W/2,200);
	newText.x -= newText.width/2;

	stage.addChild(newText);
	let balance_txt = new addText(balance+" bets",100,100);

	stage.addChild(balance_txt);

	let address_txt = new addText("address: "+address,100,50);

	stage.addChild(address_txt);

	let btn_roll = new addButton("roll", 200, 1010, "roll");
	stage.addChild(btn_roll);

	let btn_ticket = new addButton("new ticket", 600, 1010, "new ticket");
	stage.addChild(btn_ticket);
/*
	let btn_remove_ticket = new addButton("remove ticket", 1000, 1010, "remove ticket");
	stage.addChild(btn_remove_ticket);
*/
	//слой в котором лежит графика билетов
	let layer_tickets = new PIXI.Container();
	//win ticket
	let arrResult = [];
	let res_x = _W/2-90;
	for(let i = 0; i < 6; i++){
		let result_layer = new PIXI.Container();
		let bb;

		if(i == 5)
			bb = PIXI.Sprite.fromImage('../../images/buttons/btnNR_0001.png')
		else
			bb = PIXI.Sprite.fromImage('../../images/buttons/btnNW_0001.png')

		result_layer.addChild(bb);
		result_layer.tf = new addText(i,13,3,20,undefined,undefined,"center");
		result_layer.tf.visible = false;
		result_layer.x = res_x;
		result_layer.y = 50;
		result_layer.addChild(result_layer.tf);
		res_x += 30;
		stage.addChild(result_layer);

		arrResult.push(result_layer);
	}

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
			let blue = 0;
			let red = 0;
			BlueNumbersArray[i].forEach(function(item, i, arr) {
		  		for(let j = 0; j < 5; j++)
		  			if(item.name == logic.arr1[j])
		  				blue++;
			});
			if(RedNumberArray[i] == logic.red)
		  		red++;
			// console.log("itog:",white, red);
			let prize = _logic.getDataPrize();
			if(prize[white+"_"+red]){
				console.log("выигрыш: ",prize[white+"_"+red]);
				balance += prize[white+"_"+red];
			} else {
				console.log("проиграл")
			}
		}
		balance_txt.setText(balance+" bets");


		for(let i = 0; i < 6; i++){
			arrResult[i].tf.visible = true;
			if(i == 5)
				arrResult[i].tf.setText(logic.red);
			else
				arrResult[i].tf.setText(logic.arr1[i]);
		}
	};

	btn_ticket.mousedown = function (moveData) {
		if(numOfTickets==25){
			alert("TICKETS LIMIT!");
			return;
		}

		if (balance < 2){
			alert("not enough balance!");
			return;
		}

		numOfTickets++;
		currentTicket++;
		arrow1.visible=true;
		newText.setText(currentTicket+"/"+numOfTickets);

		balance -= 2;
		balance_txt.setText(balance+" bets");

		createTicket(false);



	};
/*
	btn_remove_ticket.mousedown = function (moveData) {
		
	}
*/
	function createTicket(_bool){
		//добавление билета. колбэк-удаление этого билета
		let _ticket = new addTicket(_bool,function(){
			if(currentTicket == 1){
				alert("cant remove first ticket")
				return;
			}

			stage.removeChild(tickets[currentTicket-1].getObj());
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

			balance += 2;
			balance_txt.setText(balance+" bets");
		},stage);

		let ticket = _ticket.getObj();
		tickets.push(_ticket)
		stage.addChild(ticket);
		ticket.x=_W/2 - ticket.width/2;
		ticket.y=_H/2 - ticket.height/2;
		console.log("ticket.width",ticket.width)
		console.log("ticket.height",ticket.height)
	}

	createTicket(true);

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
		console.log(tickets[currentTicket-1])
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
		arrow2.visible = true;
	}
	//стрелка назад
	arrow2.mousedown = function (moveData) {
		let _mas = tickets[currentTicket-1].getBlueNums();
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
		arrow1.visible = true;
	}

	/*
		(возможно подчеркивать красным те числа, которые не угадал, а зеленым которые угадал)
	*/
	// renderer.autoResize = true;
	// console.log(renderer)
	let _ResizeManager = new ResizeManager;
	window.addEventListener("resize", function(){_ResizeManager.onResize(renderer, stage, _W, _H)}, false);
	_ResizeManager.onResize(renderer, stage, _W, _H);
	update();
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
init()
function update() {
	renderer.render(stage);
	requestAnimationFrame(update);
}