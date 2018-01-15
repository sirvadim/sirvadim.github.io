function ItemBox(prnt) {
	PIXI.Container.call( this );
	
	var _self = this;
	var tfVal;
	
	_self.init = function(prnt) {
		this._prnt = prnt;
		this.name = "ItemBox";
		this._selected = false;
		this._disabled = false;
		
		var size = 150;
		this.cell = new PIXI.Graphics();
		this.cell.beginFill(0xFFC893).drawRect(-size/2, -size/2, size, size).endFill();
		this.addChild(this.cell);
		this.over = new PIXI.Graphics();
		this.over.beginFill(0xFFF7D2).drawRect(-size/2, -size/2, size, size).endFill();
		this.over.visible = false;
		this.addChild(this.over);
		this.lock = new PIXI.Graphics();
		this.lock.beginFill(0x999999).drawRect(-size/2, -size/2, size, size).endFill();
		this.lock.visible = false;
		this.addChild(this.lock);
		
		tfVal= addText("", 50, "#ffffff", "#000000", "center", 100, 4)
		tfVal.x = 0;
		tfVal.y = -tfVal.height/2
		this.addChild(tfVal);
		
		this.w = this.cell.width;
		this.h = this.cell.height;
	}
	
	_self.setDisabled = function(value) {
		_self._disabled = value;
		_self.lock.visible = value;
	}
	
	_self.openBox = function(value) {
		tfVal.setText(value);
	}
	
	_self.refresh = function() {
		_self.setDisabled(false);
		tfVal.setText("");
	}
	
	_self.init(prnt);
}

ItemBox.prototype = Object.create(PIXI.Container.prototype);
ItemBox.prototype.constructor = ItemBox;
