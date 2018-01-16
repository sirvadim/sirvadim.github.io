export default class addGraphic {
	constructor(name, _x = 0, _y = 0, _scGr = 1, _scaleX = 1, _scaleY = 1){
		let obj = new PIXI.Container();
		
		let objImg = null;
		obj.setImg = function(name){
			objImg = addObj(name);
			obj.addChild(objImg);
			obj.over = addObj(name + "Over");
			if(obj.over){
				obj.over.visible = false;
				obj.addChild(obj.over);
			} else
				obj.over = null;
			
			obj.lock = addObj(name + "Lock");
			if(obj.lock){
				obj.lock.visible = false;
				obj.addChild(obj.lock);
			} else
				obj.lock = null;
			
			obj.sc = _scGr;
			obj.scale.x = _scGr*_scaleX;
			obj.scale.y = _scGr*_scaleY;
			obj.vX = _scaleX;
			obj.vY = _scaleY;
			obj.x = _x;
			obj.y = _y;
			obj.w = objImg.width*_scGr;
			obj.h = objImg.height*_scGr;
			obj.r = obj.w/2;
			obj.rr = obj.r*obj.r;
			obj.name = name;
			obj._selected = false;
			if(obj.w < 50)
				obj.w = 50;
			if(obj.h < 50)
				obj.h = 50;
		};
		
		obj.setImg(name);
		
		return obj;
	}
}