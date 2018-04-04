export default class addText {
	constructor(text, _x = 0, _y = 0, size = 24, color = "#000000", glow = undefined, _align = "left", width = 600, px = 2, font = "Times New Roman"){
		let style = {
			font : size + "px " + font,
			fill : color,
			align : _align,
			wordWrap : true,
			wordWrapWidth : width
		};
		
		if(glow){
			style.stroke = glow,
			style.strokeThickness = px
		}
		
		let obj = new PIXI.Container();
		
		let tfMain = new PIXI.Text(text, style);
		tfMain.y = 0;
		obj.addChild(tfMain);
		if(_align == "left")
			tfMain.x = 0;
		else if(_align == "right")
			tfMain.x = -tfMain.width;
		else
			tfMain.x = - tfMain.width/2;
		
		obj.width = Math.ceil(tfMain.width);
		obj.height = Math.ceil(tfMain.height);
		
		obj.setText = function(value){
			tfMain.text = value;
			if(_align == "left")
				tfMain.x = 0;
			else if(_align == "right")
				tfMain.x = -tfMain.width;
			else
				tfMain.x = - tfMain.width/2;
		};
		
		obj.getText = function(){
			return tfMain.text;
		};

		obj.getSize = function(){
			return style;
		}

		obj.x = _x;
		obj.y = _y;
		
		return obj;
	}
}