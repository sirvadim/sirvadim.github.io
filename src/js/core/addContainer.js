export default class addContainer {
	constructor(){
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

		obj.x = _x;
		obj.y = _y;
		
		return obj;
	}
}