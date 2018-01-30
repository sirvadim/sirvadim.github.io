import myclass from "./main2"
import Logic from "./Logic"
import addText from "./core/addText"
import addGraphic from "./core/addGraphic"
import addCircle from "./core/addCircle"
import addButton from "./core/addButton"
import addTicket from "./core/addTicket"
import ResizeManager from "./core/ResizeManager"
import Preloader from "./core/Preloader";
import addInfoWindow from "./core/addInfoWindow";


let app = new myclass("hello!");

let _W = 1920; // game width
let _H = 1080; // game height

var fps = 30;
var interval = 1000/fps;

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

let animLeft = false, animRight = false, startTime;

//слой в котором лежит графика билетов
let layer_tickets = new PIXI.Container();

function init() {
	//initialize the stage
	var s=document.documentElement.style;
	s.cssText=s.cssText?"":"overflow:hidden;width:100%;height:100%";

	renderer = PIXI.autoDetectRenderer(_W, _H);
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

	//прелоадер, колбэк-запуск игры
	Preloader.addAll([
	    {
	        name:"bg", 
	        path:"../../images/items/bgTicket.png"
	    },
	    {
	        name:"blue_selected", 
	        path:"../../images/buttons/btnNW_0003.png"
	    },
	    {
	        name:"blue", 
	        path:"../../images/buttons/btnNW_0001.png"
	    },
	    {
	        name:"rules", 
	        path:"../../images/items/rules.jpg"
	    },
	    {
	        name:"red", 
	        path:"../../images/buttons/btnRed.png"
	    },
	    {
	        name:"green", 
	        path:"../../images/buttons/btnGreen.png"
	    }
	], function(){start();})

	function start(){
		stage.addChild(layer_tickets);
		//win ticket
		let arrResult = [];
		let res_x = 0;
		let res_layer = new PIXI.Container();
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

			arrResult.push(result_layer);
			res_layer.addChild(result_layer);
		}
		stage.addChild(res_layer);
		res_layer.x = _W/2-res_layer.width/2;
		btn_roll.mousedown = function (moveData) {
			//проверка на заполненность ВСЕХ билетов
			for(let i = 0; i < numOfTickets; i++){
				if(tickets[i].getBlueNums().length != 5 || tickets[i].getRedNums() == undefined){
					alert("fill ticket correctly!");
					return;
				}
			}

			let _logic = new Logic();
			let logic = _logic.getResults();
			let white = 0;
			let red = 0;			

			//все билеты заполнены! проверяем каждый на выигрыш
			for(let i = 0; i < numOfTickets; i++){
				//i наш текущий билет
				//подсчитываем сколько мы угадали синих
				//и угадали ли мы красный
				//показываем результат
				let blue = 0;
				let red = 0;
				tickets[i].getBlueNums().forEach(function(item, i, arr) {
			  		for(let j = 0; j < 5; j++)
			  			if(item.name == logic.arr1[j])
			  				blue++;
				});
				if(tickets[i].getRedNums() == logic.red)
			  		red++;
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
			//arrow1.visible=true;
			newText.setText(currentTicket+"/"+numOfTickets);

			balance -= 2;
			balance_txt.setText(balance+" bets");

			createTicket(false);
		};
		function createTicket(_bool){
			//добавление билета. колбэк-удаление этого билета
			let _ticket = new addTicket(_bool,function(){
				if(currentTicket == 1){
					alert("cant remove first ticket")
					return;
				}
				layer_tickets.x+=ticket.width/2;

				layer_tickets.removeChild(tickets[_ticket.name-1].getObj());
				numOfTickets--;
				tickets.splice(_ticket.name-1, 1);
				newText.setText(currentTicket+"/"+numOfTickets);

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

				for(let k = _ticket.name-1; k < numOfTickets; k++){
					tickets[k].getObj().x -= 230;
					tickets[k].name -= 1;
				}

			},stage);
			_ticket.name = currentTicket;
			let ticket = _ticket.getObj();
			tickets.push(_ticket);
			layer_tickets.addChild(ticket);
			ticket.x=_W/2 - ticket.width/2 +(230*(tickets.length-1));
			ticket.y=_H/2 - ticket.height/2;
			if(_bool == false)
				layer_tickets.x-=(ticket.width/2+6);
			/*else{
				ticket.x-=6.25;
				layer_tickets.x+=6.25;
				ticket.y-=6.25;
			}*/
			if(layer_tickets.width > _W){
				arrow1.visible = true;
				arrow2.visible = true;
			}
		};

		createTicket(true);
		layer_tickets.x += 30;
		console.log("X:",layer_tickets.x)
		console.log("WIDTH:",layer_tickets.width);
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
		arrow1.y = 840;
		arrow2.y = 840;

		arrow1.interactive = true;
		arrow1.buttonMode = true;

		arrow2.interactive = true;
		arrow2.buttonMode = true;

		arrow1.visible=false;
		arrow2.visible=false;

		//стрелка вперед
		arrow1.mousedown = function (moveData) {
			// layer_tickets.x+=100
			animRight = true;
			animLeft=false;
			createjs.Tween.get(layer_tickets)/*.wait(TIME_NEW_CARD*delay)*/.to({y:0, alpha:1},300).to({x:layer_tickets.x-120},1000);
			/*var t = new TWEEN.Tween( layer_tickets).to({y:0, alpha:1});
			t.start();*/
		}
		//стрелка назад
		arrow2.mousedown = function (moveData) {
			// layer_tickets.x-=100
			animRight = false;
			animLeft=true;
			createjs.Tween.get(layer_tickets)/*.wait(TIME_NEW_CARD*delay)*/.to({y:0, alpha:1},300).to({x:layer_tickets.x+120},1000);
		}

		/*(возможно подчеркивать красным те числа, которые не угадал, а зеленым которые угадал)*/
		let _ResizeManager = new ResizeManager;
		window.addEventListener("resize", function(){_ResizeManager.onResize(renderer, stage, _W, _H)}, false);
		_ResizeManager.onResize(renderer, stage, _W, _H);
		update();

		let wnd = new addInfoWindow(
			function(){
				stage.removeChild(wnd);
			}
		);
		wnd.x=_W/2;
		wnd.y=_H/2;
		stage.addChild(wnd);
	}
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
animate();
function update() {
	renderer.render(stage);
	requestAnimationFrame(update);

	var difftime = getTimer() - startTime;
	/*if (diffTime > interval) {
		update(diffTime);
	}*/

	startTime = getTimer();
/*
	if(animRight)
		layer_tickets.x+=0.4*difftime;
	if(animLeft)
		layer_tickets.x-=0.4*difftime;*/
}

function animate( time ) {
	requestAnimationFrame( animate );
	TWEEN.update( time );
}

function getTimer(){
	var d = new Date();
	var n = d.getTime();
	return n;
}

function refreshTime(){
	startTime = getTimer();
}
/*
function update() {
	requestAnimationFrame(update);
	renderer.render(stage);
	
	
		/*
		if(!options_pause){
			for (var i = 0; i < arClips.length; i++) {
				var clip = arClips[i];
				if(clip){
					clip.enter_frame();
				}
			}
		}*/
		
		