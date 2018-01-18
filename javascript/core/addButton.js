export default class addButton {
	constructor(_name, _x, _y, _title, _w, _h, _sizeTF, _color, _colorOver){
		if(_x){}else{_x = 0;}
		if(_y){}else{_y = 0;}
		if(_w){}else{_w = 200;}
		if(_h){}else{_h = 70;}
		if(_sizeTF){}else{_sizeTF = 30;}
		if(_color){}else{_color = 0xFFC893;}
		if(_colorOver){}else{_colorOver = 0xFFF7D2;}
		
		var obj = new PIXI.Container();

		var objImg = new PIXI.Graphics();
		objImg.beginFill(_color).drawRect(-_w/2, -_h/2, _w, _h).endFill();
		obj.addChild(objImg);
		obj.over = new PIXI.Graphics();
		obj.over.beginFill(_colorOver).drawRect(-_w/2, -_h/2, _w, _h).endFill();
		obj.over.visible = false;
		obj.addChild(obj.over);
		obj.lock = new PIXI.Graphics();
		obj.lock.beginFill(0x999999).drawRect(-_w/2, -_h/2, _w, _h).endFill();
		obj.lock.visible = false;
		obj.addChild(obj.lock);
		
		if(_title){
			obj.tf = addText(_title, _sizeTF, "#ffffff", "#000000", "center", _w-20, 4);
			obj.tf.x = 0;
			obj.tf.y = -obj.tf.height/2;
			obj.addChild(obj.tf);
		}
		
		obj.sc = 1;
		obj.x = _x;
		obj.y = _y;
		obj.w = _w;
		obj.h = _h;
		obj.r = obj.w/2;
		obj.rr = obj.r*obj.r;
		obj.name = _name;
		obj._selected = false;
		obj._disabled = false;
		obj.interactive = true;
		obj.buttonMode=true;
		if(obj.w < 50){
			obj.w = 50;
		}
		if(obj.h < 50){
			obj.h = 50;
		}
		
		obj.setDisabled = function(value){
			obj._disabled = value;
			obj.lock.visible = value;
		};
		
		return obj;
	}
}