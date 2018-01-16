export default class addGraphic {
	constructor(_x = 0, _y = 0, _w = 100, _h = 100, _color = 0xFFC893, rotate = 0){
		let obj = new PIXI.Container();

		let objImg = new PIXI.Graphics();
		objImg.beginFill(_color).drawRect(-_w/2, -_h/2, _w, _h).endFill();
		obj.addChild(objImg);
		
		obj.x = _x;
		obj.y = _y;
		obj.w = _w;
		obj.h = _h;
		obj.rotation = rotate; 
		return obj;
	}
}