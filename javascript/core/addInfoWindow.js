import addButton from "./addButton";
export default class addInfoWindow {
	constructor(callback){
		var obj = new PIXI.Container();
		

		let bg_layer = new PIXI.Container();

		var graphics = new PIXI.Graphics();

		graphics.beginFill(0xFFFF00);

		// set the line style to have a width of 5 and set the color to red
		graphics.lineStyle(5, 0xFF0000);

		// draw a rectangle
		graphics.drawRect(0, 0, 800,600);

		bg_layer.addChild(graphics);
		obj.addChild(bg_layer);
		bg_layer.x-=obj.width/2;
		bg_layer.y-=obj.height/2;

		let btn_ok = new addButton("ok", 0, 250, "ok");
		obj.addChild(btn_ok);

		let rules_info = PIXI.Sprite.fromImage('../../images/items/rules.jpg')
		bg_layer.addChild(rules_info);
		
		obj.interactive = true;
		rules_info.scale.x*=1.1;
		rules_info.scale.y*=1.1;

		btn_ok.mousedown = (e) => {
			callback();
		}
		/*
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

		*/

		return obj;
	}
}