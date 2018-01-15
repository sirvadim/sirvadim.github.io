var ScrGame = function(){
	
	PIXI.Container.call( this );
	
	var _self = this;
	var _arButtons = [], _btnChests = [], _arHistory = [], _arHistory2 = [], _arHistory3 = [];

	var _currentWindow, _wndInfo, _wndDep, _wndBet, _wndWin, _logic, _wndHistory, _btnStart;
	var dtxtBet, dtxtBet2, betchannel, betgame, _newGameBtn, wnd_mc, _closeChannelBtn, _bWindow = false;
    var _playerChip, _opponentChip, _firstStep, dtxtPlayerDice, dtxtOpponentDice, _btnFullScreen, _btnHistory;

    var sum1_txt, sum2_txt, sum_split_txt, condition_txt;


    var his1mc, his2mc;

	var back_mc, game_mc, face_mc, chips_mc, cards_mc, gfx_mc, warning_mc, wnd_mc;

    //GAME
	

    var _logic = new GameLogic();
	
	_self.init = function(){
		var bg = addObj("bgGame"+rndBg, _W/2, _H/2);
		scaleBack = _W/bg.w;
		bg.scale.x = scaleBack;
		bg.scale.y = scaleBack;
		_self.addChild(bg);
		this.addChild(bg);
		
		this.interactive = true;
		this.on("mouseup", this.touchHandler);
		this.on("mousedown", this.touchHandler);
		this.on("mousemove", this.touchHandler);
		this.on("touchstart", this.touchHandler);
		this.on("touchmove", this.touchHandler);
		this.on("touchend", this.touchHandler);

		var doc = window.document;
		var docEl = doc.documentElement;
		this._fRequestFullScreen = docEl.requestFullscreen || 
									docEl.mozRequestFullScreen || 
									docEl.webkitRequestFullScreen || 
									docEl.msRequestFullscreen;
		this._fCancelFullScreen = doc.exitFullscreen || 
									doc.mozCancelFullScreen || 
									doc.webkitExitFullscreen || 
									doc.msExitFullscreen;

		dtxtBet = addText(100,100,"balance: "+_logic.balance(), 24, "#000000");
		this.addChild(dtxtBet);

		sum1_txt = addText(1200,140,"sum player: 0", 24, "#000000");
		this.addChild(sum1_txt);

		sum_split_txt = addText(1200,170,"sum split: 0", 24, "#000000");
		this.addChild(sum_split_txt);

		sum2_txt = addText(1400,140,"sum bank: 0", 24, "#000000");
		this.addChild(sum2_txt);

		condition_txt = addText(1600,140,"result: "+_logic.balance(), 24, "#000000");
		this.addChild(condition_txt);
		
		

		_btnStand = addButtonGr("btnStand", _W/2, 500, "stand");
		this.addChild(_btnStand);
		_arButtons.push(_btnStand);

		_btnHit = addButtonGr("btnHit", _W/2, 700, "hit");
		this.addChild(_btnHit);
		_arButtons.push(_btnHit);

		_runGame = addButtonGr("runGame", _W/2, 900, "run");
		this.addChild(_runGame);
		_arButtons.push(_runGame);

		_btnSplit = addButtonGr("btnSplit", _W/2+200, 500, "split");
		this.addChild(_btnSplit);
		_arButtons.push(_btnSplit);

		_btnDouble = addButtonGr("btnDouble", _W/2+200, 700, "double");
		this.addChild(_btnDouble);
		_arButtons.push(_btnDouble);


		his1mc = new PIXI.Container();
		his2mc = new PIXI.Container();
		this.addChild(his1mc);
		this.addChild(his2mc);

		_self.createLayers();
		// _self.createArrays();
		// _self.createBooleans();
		
		_logic.mixDeck();
		_self.createBtn();
	}

	_self.createButton = function(name, title, x, y, sc){
		if(sc){}else{sc=1}
		
		var btn = addButton(name, x, y, sc);
		btn.interactive = true;
		btn.buttonMode=true;
		btn.overSc=true;
		btn.disabled=false;
		face_mc.addChild(btn);
		_arButtons.push(btn);
		
		var tf = addText(getText(title), 46, "#FFFFFF", "#000000", "center", 200, 6)
		tf.x = 0;
		tf.y = 120;
		btn.addChild(tf);
		
		return btn;
	}

	_self.createLayers = function(){
		face_mc = new PIXI.Container();
		back_mc = new PIXI.Container();
		game_mc = new PIXI.Container();
		chips_mc = new PIXI.Container();
		cards_mc = new PIXI.Container();
		gfx_mc = new PIXI.Container();
		warning_mc = new PIXI.Container();
		wnd_mc = new PIXI.Container();
		
		game_mc.addChild(chips_mc);
		game_mc.addChild(cards_mc);
		_self.addChild(back_mc);
		_self.addChild(game_mc);
		_self.addChild(gfx_mc);
		_self.addChild(face_mc);
		_self.addChild(warning_mc);
		_self.addChild(wnd_mc);
	}

	_self.createBtn = function(){
		var doc = window.document;
		var docEl = doc.documentElement;
		this._fRequestFullScreen = docEl.requestFullscreen || 
									docEl.mozRequestFullScreen || 
									docEl.webkitRequestFullScreen || 
									docEl.msRequestFullscreen;
		this._fCancelFullScreen = doc.exitFullscreen || 
									doc.mozCancelFullScreen || 
									doc.webkitExitFullscreen || 
									doc.msExitFullscreen;
									
		var scGui = 0.5;
		var offsetY = 50;
		var btnDeal = this.createButton("btnDeal", "deal", _W/2+90, 950, scGui);
		this.btnDeal = btnDeal;
		var btnClear = this.createButton("btnClearBets", "remove_bet", _W/2-90, 950, scGui);
		this.btnClear = btnClear;
		var btnHit = this.createButton("btnHit", "hit", _W/2+90, 950, scGui);
		this.btnHit = btnHit;
		var btnStand = this.createButton("btnStand", "stand", _W/2-90, 950, scGui);
		this.btnStand = btnStand;
		btnDeal.alpha = 0.5;
		btnClear.alpha = 0.5;
		btnHit.alpha = 0.5;
		btnHit.alpha = 0.5;
		btnStand.alpha = 0.5;
		btnHit.visible = false;
		btnStand.visible = false;
		btnDeal.hint = getText("hint_deal");
		btnClear.hint = getText("hint_remove");
		
		if(options_split){
			var btnSplit = this.createButton("btnSplit", "split", 1650, 800, scGui);
			this.btnSplit = btnSplit;
			btnSplit.alpha = 0.5;
			btnSplit.hint = getText("hint_split");
		}
		if(options_double){
			var btnDouble = this.createButton("btnDouble", "double", 1500, 890, scGui);
			this.btnDouble = btnDouble;
			btnDouble.alpha = 0.5;
			btnDouble.hint = getText("hint_double");
		}
		
		if(!options_rpc && !options_debug){
			var btnContract = addButton("btnContract", 80, _H - 80);
			btnContract.name = "btnSmart";
			btnContract.interactive = true;
			btnContract.buttonMode=true;
			btnContract.overSc = true;
			btnContract.hint2 = getText("hint_contract");
			this.addChild(btnContract);
			_arButtons.push(btnContract);
		}
		
		var startY = _H - 80;
		var offsetY = 110;
		var btnDao = addButton("btnDao", _W - 80, startY);
		btnDao.interactive = true;
		btnDao.buttonMode=true;
		btnDao.overSc = true;
		this.addChild(btnDao);
		_arButtons.push(btnDao);
		var btnFullscreen = addButton("btnFullscreen", _W - 80, startY - offsetY*1);
		btnFullscreen.interactive = true;
		btnFullscreen.buttonMode=true;
		btnFullscreen.overSc = true;
		this.addChild(btnFullscreen);
		_arButtons.push(btnFullscreen);
		var btnReset = addButton("btnReset", _W - 80, startY - offsetY*2);
		btnReset.interactive = true;
		btnReset.buttonMode=true;
		btnReset.overSc = true;
		this.addChild(btnReset);
		_arButtons.push(btnReset);
		var btnExit = addButton("btnCashout", _W - 80, startY - offsetY*3);
		btnExit.interactive = true;
		btnExit.buttonMode=true;
		btnExit.overSc = true;
		this.btnExit = btnExit;
		this.addChild(btnExit);
		_arButtons.push(btnExit);
		var btnHistory = addButton("btnHistory", _W - 80, startY - offsetY*4);
		btnHistory.name = "btnHistory";
		btnHistory.interactive = true;
		btnHistory.buttonMode=true;
		btnHistory.overSc = true;
		this.btnHistory = btnHistory;
		this.addChild(btnHistory);
		_arButtons.push(btnHistory);
		var btnFB = addButton("btnFacebookShare", _W - 80, 70, 0.35);
		btnFB.name = "btnShare";
		btnFB.interactive = true;
		btnFB.buttonMode=true;
		btnFB.overSc = true;
		this.addChild(btnFB);
		_arButtons.push(btnFB);
		var btnTweet = addButton("btnTweetShare", _W - 80, 180, 0.35);
		btnTweet.name = "btnTweet";
		btnTweet.interactive = true;
		btnTweet.buttonMode=true;
		btnTweet.overSc = true;
		this.addChild(btnTweet);
		_arButtons.push(btnTweet);
		
		btnFB.hint2 = getText("share_facebook");
		btnTweet.hint2 = getText("tweet");
		btnDao.hint2 = getText("home");
		btnFullscreen.hint2 = getText("fullscreen");
		btnExit.hint2 = getText("cash_out");
		btnReset.hint2 = getText("reset_data");
		btnHistory.hint2 = getText("history_game");
		
		if(options_debug){
			btnExit.visible = false;
			btnReset.visible = false;
		}
		
		var posX = _W/2-680;
		var posY = _H/2+180+offsetY;
		var stepX = 90;
		var stepY = 50;
		var indexX = 1;
		
		for (var i = 1; i < 7; i++) {
			_self.addBtnChip("chip_"+i, posX+stepX*(indexX-1), posY+stepY*(i-1));
			
			indexX++;
			if(i%3==0){
				indexX = 0;
				posX = _W/2-640;
				posY = _H/2+100+offsetY;
			}
		}
		_self.showChips(false);
		_self.isCashoutAvailable();
	}

	_self.update = function(diffTime) {
		if(options_pause)
			return;
	};
	
	_self.clickCell = function(item_mc) {
		if(item_mc._disabled){
			return;
		}
		item_mc._selected = false;

		if(item_mc.name == "btnHit"){
			_logic.hit()
			_self.checkBtns()
			if(_logic.getGame().secondHand == true && _logic.getGame().secondHandStand == false){
				var _playerCards = _logic.getGame().arSplit;
				var nc = _logic.getNameCard(_playerCards[_playerCards.length-1]);
				_self.pushSplitHistory(nc._cardPoint, nc._cardSymbol);
			} else {
				var _playerCards = _logic.getGame().player;
				var nc = _logic.getNameCard(_playerCards[_playerCards.length-1]);
				_self.pushPlayerHistory(nc._cardPoint, nc._cardSymbol);
			}


			sum1_txt.setText("sum player: "+_logic.solveSum(_logic.getGame().player));
			sum2_txt.setText("sum bank: "+_logic.solveSum(_logic.getGame().bankroller));
		} else if(item_mc.name == "btnStand"){
			_logic.stand();
			dtxtBet.setText("balance: "+_logic.balance());
			var _bankCards = _logic.getGame().bankroller;
			for(var i = 1; i < _bankCards.length; i++){
				var c = _logic.getNameCard(_bankCards[i]);
				_self.pushBankHistory(c._cardPoint, c._cardSymbol);
			}
			sum1_txt.setText("sum player: "+_logic.solveSum(_logic.getGame().player));
			sum2_txt.setText("sum bank: "+_logic.solveSum(_logic.getGame().bankroller));
		} else if (item_mc.name == "runGame"){
			_logic.runGame()
			_self.checkBtns()
			dtxtBet.setText("balance: "+_logic.balance());
			_arHistory1 = [];
			_arHistory2 = [];
			_arHistory3 = [];

			this.removeChild(his1mc);
			this.removeChild(his2mc);
			his1mc = new PIXI.Container();
			his2mc = new PIXI.Container();
			this.addChild(his1mc);
			this.addChild(his2mc);

			var _playerCards = _logic.getGame().player;
			var _bankCards 	 = _logic.getGame().bankroller;
			var c1 = _logic.getNameCard(_playerCards[0]);
			var c2 = _logic.getNameCard(_playerCards[1]);
			var c = _logic.getNameCard(_bankCards[0]);

			_self.pushPlayerHistory(c1._cardPoint, c1._cardSymbol);
			_self.pushPlayerHistory(c2._cardPoint, c2._cardSymbol);
			_self.pushBankHistory(c._cardPoint, c._cardSymbol);

			sum1_txt.setText("sum player: "+_logic.solveSum(_logic.getGame().player));
			sum2_txt.setText("sum bank: "+_logic.solveSum(_logic.getGame().bankroller));
		} else if (item_mc.name == "btnSplit"){
			_logic.split();
			_arHistory1.pop()
			var _playerCards = _logic.getGame().arSplit;
			var nc = _logic.getNameCard(_playerCards[_playerCards.length-1]);
			_self.pushSplitHistory(nc._cardPoint, nc._cardSymbol);
			var _playerCards2 = _logic.getGame().player;
			var nc = _logic.getNameCard(_playerCards2[_playerCards2.length-1]);
			_self.pushPlayerHistory(nc._cardPoint, nc._cardSymbol);
		} else if (item_mc.name == "btnDouble"){
			_logic.double()
		}
	};

	_self.pushPlayerHistory = function(arg, arg2) {
		_arHistory1.push(arg);
		if(arg == arg2)
			arg2 = "";

		var _x;
		var _y;
		
		if(_logic.getGame().secondHand == true){
			console.log("fdhfj", _arHistory1.length);
			_x = 100 + 55*_arHistory1.length;
			_y = 200;
		} else {
			_x = 100;
			_y = 140+30*_arHistory1.length;
		}

		var newText = addText(_x,_y,arg+" "+arg2,24,"#000000");
		his1mc.addChild(newText);
	}

	_self.pushSplitHistory = function(arg, arg2) {
		_arHistory3.push(arg);
		if(arg == arg2)
			arg2 = "";
		var newText = addText(100+55*_arHistory3.length,170,arg+" "+arg2,24,"#000000");
		his1mc.addChild(newText);
	}

	_self.pushBankHistory = function(arg, arg2) {
		_arHistory2.push(arg);
		if(arg == arg2)
			arg2 = "";
		var newText = addText(900,140+30*_arHistory2.length,arg+" "+arg2,24,"#000000");
		his2mc.addChild(newText);

	}

	_self.checkBtns = function() {
		_btnSplit.visible = _logic.checkSplit();
		_btnDouble.visible = _logic.checkDouble();
	}
	_self.checkButtons = function(evt){
		var mouseX = evt.data.global.x;
		var mouseY = evt.data.global.y;
		
		for (var i = 0; i < _arButtons.length; i++) {
			var item_mc = _arButtons[i];
			if(hit_test_rec(item_mc, item_mc.w, item_mc.h, mouseX, mouseY)){
				if(item_mc._selected == false && item_mc._disabled == false){
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
		if(_bWindow)
			return;
		var phase = evt.type;
		
		if(phase=="mousemove" || phase == "touchmove" || 
			phase == "touchstart" || phase == "mousedown"){
			this.checkButtons(evt);
		} else if (phase == "mouseup" || phase == "touchend") {
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

}

ScrGame.prototype = Object.create(PIXI.Container.prototype);
ScrGame.prototype.constructor = ScrGame;