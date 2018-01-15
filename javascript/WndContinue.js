/**
 * Created by DAO.casino
 * Treasure Of DAO - WndDep
 * v 1.0.0
 */

/*eslint no-undef: "none"*/

var WndContinue = function(prnt, callback, bet){
	PIXI.Container.call( this );
	
	var _self = this;
	var _callback = callback;
	var _arButtons = [];
	var _btnOk;
	var _tfDesc;
	var _wLine = 400;
	var _head;
	var _boolDrag = false;
	var _dtxtBet;
	var maxbet = bet;
	var curbet = 0;
	var mybet = 0;
	// INIT

	_self.init = function(){
		var w = 600;
		var h = 400;
		var rect = new PIXI.Graphics();
		rect.beginFill(0x000000).drawRect(-_W/2, -_H/2, _W, _H).endFill();
		rect.alpha = 0.5;
		_self.addChild(rect);
		var bg = new PIXI.Graphics();
		bg.beginFill(0x000000).drawRect(-w/2, -h/2, w, h).endFill();
		bg.alpha = 0.7;
		_self.addChild(bg);
		
		_btnYes = addButtonGr("btnYes", -100, 130, "yes", 120, 70, 30, 0x088027, 0x67AA66);
		_self.addChild(_btnYes);
		_arButtons.push(_btnYes);

		_btnNo = addButtonGr("btnNo", 100, 130, "no", 120, 70, 30, 0xff0000, 0xff6666);
		_self.addChild(_btnNo);
		_arButtons.push(_btnNo);
		
		_tfDesc = addText("do you want to continue?", 26, "#FFCC00", "#000000", "center", 500, 3)
		_tfDesc.y = -120;
		_self.addChild(_tfDesc);

		_self.interactive = true;
		_self.on('mousedown', _self.touchHandler);
		_self.on('mousemove', _self.touchHandler);
		_self.on('mouseup', _self.touchHandler);
		_self.on('touchstart', _self.touchHandler);
		_self.on('touchmove', _self.touchHandler);
		_self.on('touchend', _self.touchHandler);
	}

	_self.roundTo5 = function(num) {
		return Math.round(num/5)*5;
	}

	_self.clickObj = function(item_mc) {
		var name = item_mc.name
		item_mc._selected = false;
		if(item_mc.over){
			item_mc.over.visible = false;
		}
		if(item_mc.overSc){
			item_mc.scale.x = 1*item_mc.sc;
			item_mc.scale.y = 1*item_mc.sc;
		}
		
		if(item_mc.name == "btnYes" || item_mc.name == "btnNo"){
			prnt.closeWindow(_self);
			if(_callback){
				_callback(item_mc.name);
			}
		}

	}
	
	_self.checkButtons = function(evt){
		var phase = evt.type; 
		var mouseX = evt.data.global.x - _self.x
		var mouseY = evt.data.global.y - _self.y;
		for (var i = 0; i < _arButtons.length; i++) {
			var item_mc = _arButtons[i];
			if(hit_test_rec(item_mc, item_mc.w, item_mc.h, mouseX, mouseY)){
				if(item_mc.visible && 
				item_mc._selected == false && 
				!item_mc._disabled){
					item_mc._selected = true;
					if(item_mc.over){
						item_mc.over.visible = true;
					} else if(item_mc.overSc){
						item_mc.scale.x = 1.1*item_mc.sc;
						item_mc.scale.y = 1.1*item_mc.sc;
					}
				}
			} else {
				if(item_mc._selected){
					item_mc._selected = false;
					if(item_mc.over){
						item_mc.over.visible = false;
					} else if(item_mc.overSc){
						item_mc.scale.x = 1*item_mc.sc;
						item_mc.scale.y = 1*item_mc.sc;
					}
				}
			}
		}
	}
	
	_self.touchHandler = function(evt){	
		if(!_self.visible){
			return false;
		}
		// mousedown , mousemove, mouseup
		// touchstart, touchmove, touchend
		var phase = evt.type; 
		var item_mc; //MovieClip
		var i = 0;
		
		if(phase == 'touchstart' || phase == 'mousedown'){
			_self.checkButtons(evt);
		} else if(phase=='mousemove' || phase == 'touchmove'){
			_self.checkButtons(evt);
		} else if (phase == 'mouseup' || phase == 'touchend') {
			if(_boolDrag==true)
				_boolDrag = false;
			for (i = 0; i < _arButtons.length; i ++) {
				item_mc = _arButtons[i];
				if(item_mc.visible&& item_mc._selected){
					_self.clickObj(item_mc);
					return;
				}
			}
		}
	}
	
	_self.removeAllListener = function() {
		this.interactive = false;
		this.off('mousedown', this.touchHandler);
		this.off('mousemove', this.touchHandler);
		this.off('mouseup', this.touchHandler);
		this.off('touchstart', this.touchHandler);
		this.off('touchmove', this.touchHandler);
		this.off('touchend', this.touchHandler);
	}
	
	_self.init();
	
	return _self;
};

WndContinue.prototype = Object.create(PIXI.Container.prototype);
WndContinue.prototype.constructor = WndContinue;