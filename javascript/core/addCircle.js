import addText from "./addText";
export default class addCircle {
	constructor(_name, _x = 0, _y = 0, _title, _r = 50, _sizeTF = 30, _color = 0xFFC893, _colorOver = 0xFFF7D2){
		var obj = new PIXI.Container();
		 
		var objImg = new PIXI.Graphics();
		objImg.beginFill(_color).drawCircle(0, 0, _r).endFill();
		objImg.position.set(1, 1);
		obj.addChild(objImg);
		obj.over = new PIXI.Graphics();
		obj.over.beginFill(_colorOver).drawCircle(0, 0, _r).endFill();
		obj.over.visible = false;
		obj.addChild(obj.over);
		obj.lock = new PIXI.Graphics();
		obj.lock.beginFill(0x999999).drawCircle(0, 0, _r).endFill();
		obj.lock.visible = false;
		obj.addChild(obj.lock);

		if(_title){
			obj.tf = new addText(_title, 0, -_sizeTF/2, _sizeTF, "#ffffff", "#000000", "center", _r-20, 4);
			obj.addChild(obj.tf);
		}
		
		obj.sc = 1;
		obj.x = _x;
		obj.y = _y;
		obj.r = _r;
		obj.name = _name;
		obj._selected = false;
		obj._disabled = false;
		obj.interactive = true;
		obj.buttonMode = true;
		
		obj.setDisabled = function(value){
			obj._disabled = value;
			obj.lock.visible = value;
		};

		

		return obj;
	}
}



function a () {
	var b = 1
	function c () {
		
	}
}