/**
 * Created by DAO.casino
 * Treasure Of DAO - Menu
 * v 1.0.0
 */

/*eslint no-undef: "none"*/

var ScrMenu = function(){
	PIXI.Container.call( this );
	
	var _self = this;
	var _arButtons = [];
	var _btnStart;
	
	// INIT
	_self.init = function(){
		var bg = new PIXI.Graphics();
		bg.beginFill(0xffffff).drawRect(0, 0, _W, _H).endFill();
		this.addChild(bg);
		
		_self.createGui();
		
		this.interactive = true;
		this.on("mouseup", this.touchHandler);
		this.on("mousedown", this.touchHandler);
		this.on("mousemove", this.touchHandler);
		this.on("touchstart", this.touchHandler);
		this.on("touchmove", this.touchHandler);
		this.on("touchend", this.touchHandler);
	}
	
	_self.createGui = function() {
		var tfTitle = addText(_W/2, _H/2 - 50 - 200, getText("title_game"), 100, "#000000", undefined, "center", 400);
		this.addChild(tfTitle);
		this.tfTitle = tfTitle;
		var tfVersion = addText(_W - 10, _H  -50 - 10, version, 24, "#000000", undefined, "right", 400);
		this.addChild(tfVersion);
		this.tfVersion = tfVersion;
		
		_btnStart = addButtonGr("btnStart", _W/2, 800, "start");
		this.addChild(_btnStart);
		_arButtons.push(_btnStart);
	};
	
	// CLICK
	_self.clickStart = function() {
		// _self.removeAllListener();
		addScreen("ScrGame");
		/*
        var _logic = new GameLogic(50); // создание класса
        for (var i = 0; i < 10; i++) {
        	
            var objBet = _logic.setBet(1);
            var objBox = _logic.runGame();          
            if(objBox.objGame.result == true)
            	_logic.closeGame();
            var curBal = _logic.balance();
            // узнаем результат и баланс игрока
            console.log("id game:", i+1,
                        "bet:", objBox.objGame.betGame, 
                        "result:", objBox.objGame.result,
                        "profit:", objBox.objGame.profitGame,
                        "balance:", curBal); 
        }*/
	};
	
	_self.clickCell = function(item_mc) {
		if(item_mc._disabled){
			return;
		}
		
		item_mc._selected = false;
		if(item_mc.name == "btnStart"){
			_self.clickStart();
		}
	};
	
	_self.checkButtons = function(evt){
		var mouseX = evt.data.global.x;
		var mouseY = evt.data.global.y;
		
		for (var i = 0; i < _arButtons.length; i++) {
			var item_mc = _arButtons[i];
			if(hit_test_rec(item_mc, item_mc.w, item_mc.h, mouseX, mouseY)){
				if(item_mc._selected == false){
					item_mc._selected = true;
					if(item_mc.over){
						item_mc.over.visible = true;
					}
				}
			} else {
				if(item_mc._selected){
					item_mc._selected = false;
					if(item_mc.over){
						item_mc.over.visible = false;
					}
				}
			}
		}
	};

	_self.touchHandler = function(evt){
		var phase = evt.type;
		
		if(phase=="mousemove" || phase == "touchmove" || phase == "touchstart"){
			this.checkButtons(evt);
		} else if (phase == "mousedown" || phase == "touchend") {
			for (var i = 0; i < _arButtons.length; i++) {
				var item_mc = _arButtons[i];
				if(item_mc._selected){
					this.clickCell(item_mc);
					i--;
					return;
				}
			}
		}
	};
	
	// UPDATE
	_self.update = function(diffTime) {
		if(options_pause){
			return;
		}
	};
	
	// REMOVE
	_self.removeAllListener = function() {
		clearClips();
		this.off("mouseup", this.touchHandler);
		this.off("mousedown", this.touchHandler);
		this.off("mousemove", this.touchHandler);
		this.off("touchstart", this.touchHandler);
		this.off("touchmove", this.touchHandler);
		this.off("touchend", this.touchHandler);
	};
	
	_self.init();
	
	return _self;
};

ScrMenu.prototype = Object.create(PIXI.Container.prototype);
ScrMenu.prototype.constructor = ScrMenu;