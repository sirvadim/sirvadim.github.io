import addText from "./addText";
export default class addTicket {
	constructor(){
		let obj = new PIXI.Container();
		let mas = [];
		let _x = 0;
		let _y = 0;
		let _self = this;
		this.score = 0;
		this.score2 = 0;

		console.log(this.score)
		console.log(this.score2)

		for(let i = 1; i < 70; i++){
			let newBlueField = new PIXI.Container();
			
			let bb = PIXI.Sprite.fromImage('../../images/buttons/btnNW_0001.png')
			let bb2 = PIXI.Sprite.fromImage('../../images/buttons/btnNW_0003.png')
			newBlueField.addChild(bb);
			newBlueField.addChild(bb2);
			bb2.visible = false;
			bb.visible = true;
			obj.addChild(newBlueField);	
			newBlueField.x = _x;
			newBlueField.y = _y;
			newBlueField.name = i;
			console.log(newBlueField.height);

			obj.tf = new addText(i,_x+13,_y+3,20,undefined,undefined,"center");
			obj.addChild(obj.tf);
			
			// if(i%6)_y+=26;
			if(i%6==0){
				_y += 30;
				_x = 0;
			} else {
				_x += 30;
			}

			newBlueField.interactive = true;
			newBlueField.buttonMode = true;


			newBlueField.mousedown = (e) => {
				console.log(e.target.name);
				if(bb.visible && this.score > 4)
					return

				if(bb.visible)
					this.score ++;
				else
					this.score --;

				bb2.visible = !bb2.visible;
				bb.visible = !bb.visible;
				console.log(this.score)
			}
			mas.push(newBlueField);
		}

		_y += 60;
		_x = 0;

		for(let i = 1; i < 30; i++){
			let newBlueField = new PIXI.Container();
			
			let bb = PIXI.Sprite.fromImage('../../images/buttons/btnNR_0001.png')
			let bb2 = PIXI.Sprite.fromImage('../../images/buttons/btnNR_0003.png')
			newBlueField.addChild(bb);
			newBlueField.addChild(bb2);
			bb2.visible = false;
			bb.visible = true;
			obj.addChild(newBlueField);	
			newBlueField.x = _x;
			newBlueField.y = _y;
			newBlueField.name = i;
			console.log(newBlueField.height);

			obj.tf = new addText(i,_x+13,_y+3,20,undefined,undefined,"center");
			obj.addChild(obj.tf);
			
			// if(i%6)_y+=26;
			if(i%6==0){
				_y += 30;
				_x = 0;
			} else {
				_x += 30;
			}

			newBlueField.interactive = true;
			newBlueField.buttonMode = true;
			
			newBlueField.mousedown = function (moveData) {
				console.log(this.name);
				if(bb.visible && _self.score2 > 0)
					return

				if(bb.visible)
					_self.score2 ++;
				else
					_self.score2 --;
				
				bb2.visible = !bb2.visible;
				bb.visible = !bb.visible;
				console.log(_self.score2)
			}
			mas.push(newBlueField);
		}
		this.obj = obj;
		//return obj;
		this.mas = mas;

	}

	getObj(){
		//console.log(this.obj);
		return this.obj;
	}

	changeField(){
		let _self = this;
		_self.score = 0;
		_self.score2 = 0;
		this.mas.forEach(function(item, i, arr) {
			if(item.children[1].visible == true){
		  		item.children[1].visible = false;
		  		item.children[0].visible = true;
			}
		});
		console.log("works")
	}

	getNums(){
		let numArr = [];
		this.mas.forEach(function(item, i, arr) {
			if(item.children[1].visible == true){
				numArr.push(item.name);
				console.log(item.name);

			}
		});
		return numArr;
	}

}