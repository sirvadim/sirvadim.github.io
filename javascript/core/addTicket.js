import addText from "./addText";
import Preloader from "./Preloader";
//TODO оптимизировать циклы, избавиться от одинакового кода
export default class addTicket{
	//constructor выполняется по умолчанию
	constructor(first,callback,parent){
		//TODO параметром будет флаг показывающий, является ли билет первым (если он первый, не будет крестика)
		//также передавать родителя и колбэк
		//указывает на конструктор
		let _self = this;
		//слой, в который отрисовываются все ячейки (графика)
		let obj = new PIXI.Container();
		//массив, в который пушатся синие (для клика и получения номера)
		let mas = [];
		//массив, в который пушатся красные (для клика и получения номера)
		let mas2 = [];
		//координаты, в которые отрисовываются ячейки
		let _x = 19;
		let _y = 12;
		
		//счет (чтобы нельзя было нажать все ячейки)
		this.score = 0;
		this.score2 = 0;

		let bg_ticket_layer = new PIXI.Container();
		let bg_ticket = new PIXI.Sprite.fromImage(Preloader.getimg('bgTicket').path);
		//bg_ticket.x-=12;
		//bg_ticket.y-=12;
		bg_ticket_layer.addChild(bg_ticket);
		/*
				let bg_ticket_layer = new PIXI.Container();

		var graphics = new PIXI.Graphics();

	graphics.beginFill(0xFFFF00);

	// set the line style to have a width of 5 and set the color to red
	graphics.lineStyle(5, 0xFF0000);

	// draw a rectangle
	graphics.drawRect(0, 0, 300,600);

	bg_ticket_layer.addChild(graphics);
*/

		obj.addChild(bg_ticket_layer);
		bg_ticket_layer.width = bg_ticket_layer.width;

		//TODO рисуем крестик для удаления билета
		//if(first == false){
			let close_btn = new PIXI.Sprite.fromImage(Preloader.getimg('btnClose').path);
			//close_btn.y = 556;
			close_btn.y = 520;
			close_btn.x = 108.5-22;
			close_btn.interactive = true;
			close_btn.buttonMode = true;

			close_btn.mousedown = (e) => {
				// close_btn.
				let target = e.target || e.currentTarget
				if(callback) callback(target);
			}

			obj.addChild(close_btn);
		//}
		
		//рисуем синие
		for(let i = 1; i < 70; i++){
			let newBlueField = new PIXI.Container();
			
			let bb = PIXI.Sprite.fromImage('../../images/cellW.png');
			let bb2 = PIXI.Sprite.fromImage('../../images/cellWS.png');
			let bb3 = PIXI.Sprite.fromImage('../../images/buttons/btnRed.png');
			let bb4 = PIXI.Sprite.fromImage('../../images/buttons/btnGreen.png');

			newBlueField.addChild(bb);
			newBlueField.addChild(bb2);
			newBlueField.addChild(bb3);
			newBlueField.addChild(bb4);

			bb4.visible= false;
			bb3.visible= false;

			bb2.visible = false;
			bb.visible = true;
			obj.addChild(newBlueField);	
			newBlueField.x = _x;
			newBlueField.y = _y;
			newBlueField.name = i;

			obj.tf = new addText(i,_x+13,_y+3,20,undefined,undefined,"center");
			obj.addChild(obj.tf);
			
			// if(i%6)_y+=26;
			if(i%6==0){
				_y += 30;
				_x = 19;
			} else {
				_x += 30;
			}

			newBlueField.interactive = true;
			newBlueField.buttonMode = true;


			newBlueField.mousedown = (e) => {
				// console.log(e.target.name);
				if(bb.visible && this.score > 4)
					return

				if(bb.visible)
					this.score ++;
				else
					this.score --;

				bb2.visible = !bb2.visible;
				bb.visible = !bb.visible;
				// console.log(this.score)
			}
			mas.push(newBlueField);
		}

		_y += 40;
		_x = 19;

		//рисуем красные
		for(let i = 1; i < 27; i++){
			let newBlueField = new PIXI.Container();
			
			let bb = PIXI.Sprite.fromImage('../../images/cellR.png')
			let bb2 = PIXI.Sprite.fromImage('../../images/cellRS.png')
			let bb3 = PIXI.Sprite.fromImage('../../images/btnRed.png');
			let bb4 = PIXI.Sprite.fromImage('../../images/btnGreen.png');
			newBlueField.addChild(bb);
			newBlueField.addChild(bb2);
			newBlueField.addChild(bb3);
			newBlueField.addChild(bb4);

			bb4.visible= false;
			bb3.visible= false;
			bb2.visible = false;
			bb.visible = true;
			obj.addChild(newBlueField);	
			newBlueField.x = _x;
			newBlueField.y = _y;
			newBlueField.name = i;

			obj.tf = new addText(i,_x+13,_y+3,20,"#000000",undefined,"center");
			obj.addChild(obj.tf);
			
			// if(i%6)_y+=26;
			if(i%6==0){
				_y += 30;
				_x = 19;
			} else {
				_x += 30;
			}

			newBlueField.interactive = true;
			newBlueField.buttonMode = true;
			
			newBlueField.mousedown = function (moveData) {
				// console.log(this.name);
				if(bb.visible && _self.score2 > 0)
					return

				if(bb.visible)
					_self.score2 ++;
				else
					_self.score2 --;
				
				bb2.visible = !bb2.visible;
				bb.visible = !bb.visible;
				// console.log(_self.score2)
			}
			mas2.push(newBlueField);
		}
		this.obj = obj;
		this.mas = mas;
		this.mas2 = mas2;
	}

	getObj(){
		//возвращаем слой, чтобы нарисовать его на экране
		return this.obj;
	}

	changeField(){
		//очищаем поле от выбранных ячеек (для переключения между билетами)
		this.score = 0;
		this.score2 = 0;
		this.mas.forEach(function(item, i, arr) {
			if(item.children[1].visible == true){
		  		item.children[1].visible = false;
		  		item.children[0].visible = true;
			}
		});
		this.mas2.forEach(function(item, i, arr) {
			if(item.children[1].visible == true){
		  		item.children[1].visible = false;
		  		item.children[0].visible = true;
			}
		});
	}

	getBlueNums(){
		//получаем массив с номерами синих
		let numArr = [];
		this.mas.forEach(function(item, i, arr) {
			if(item.children[1].visible == true){
				numArr.push(item.name);
			}
		});
		return numArr;
	}

	getRedNums(){
		//получаем массив с номерами красных
		let numArr = undefined;
		this.mas2.forEach(function(item, i, arr) {
			if(item.children[1].visible == true){
				numArr = item.name;
			}
		});
		return numArr;
	}

	changeFieldVisTrue(_masBlue, _red){
		//отображаем заполненный билет
		// console.log("changeFieldVisTrue",_masBlue, _red)

		//синие
		if(_masBlue){
			this.score = _masBlue.length;
			this.mas.forEach(function(item, i, arr) {
				for(let j = 0; j < _masBlue.length; j++){
					// console.log(item.name,_masBlue[j])
					if(item.children[1].visible == false && item.name == _masBlue[j]){
				  		item.children[1].visible = true;
				  		item.children[0].visible = false;
					}
				}
			});
		}

		//красные
		if(_red != undefined){
			// console.log("2")
			this.score2 = 1;
			this.mas2.forEach(function(item, i, arr) {
				if(item.children[1].visible == false && item.name == _red){
			  		item.children[1].visible = true;
			  		item.children[0].visible = false;
				}
			});
		}

	}

}