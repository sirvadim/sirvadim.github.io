/*eslint no-undef: "none"*/

var _W = 1920;
var _H = 1080;
var version = "v. 1.0.0";
var dataAnima = [];
var dataMovie = [];
var arClips = [];
var language;

var currentScreen, scrContainer;
var startTime;
var renderer, stage, preloader; // pixi;
var sprites_loaded = false;
var fontMain = "Archivo Black";
var rndBg = String(Math.ceil(Math.random()*2));
// options
var options_debug = true;
var options_dc = false;

var options_test        = false;
var options_ethereum    = true;
var options_mainet      = false;
var options_ropsten     = true;
var options_rinkeby     = false;
var options_testnet     = options_ropsten || options_rinkeby;
var options_rpc         = false;
var options_music       = true;
var options_sound       = true;
var options_mobile      = true;
var options_pause       = false;
var options_fullscreen  = false;
var options_speedgame   = false;
var options_splitdouble = true;
var options_split = true;
var options_double = true;
var options_save = false;
var options_multiplayer = true;

var ERROR_CONNECTION = 0;
var ERROR_KEYTHEREUM = 1;
var ERROR_BUF = 2;
var ERROR_KEY = 3;
var ERROR_BANK = 4;
var ERROR_CONTRACT = 5;
var ERROR_BALANCE = 6;
var ERROR_DEAL = 7;
var ERROR_MAX_BET = 8;
var ERROR_BANKROLLER = 9;
var ERROR_BALANCE_BET = 10;

var TIME_NEW_CARD  = 600;
var TIME_SHOW_BTN  = 300;


function init() {
	if(typeof console === "undefined"){ console = {}; }
	
	if(options_dc){
		window.Casino = new CasinoJS({network: 'ropsten'});
		window.lightwallet = Casino.Account.lightWallet;
	}

	// hide scroll
	var s=document.documentElement.style;
	s.cssText=s.cssText?"":"overflow:hidden;width:100%;height:100%";
	// document.body.scroll = "no";
	
	//initialize the stage
	renderer = PIXI.autoDetectRenderer(_W, _H);
	document.body.appendChild(renderer.view);
	stage = new PIXI.Container();
	
	window.addEventListener("resize", onResize, false);
	
	startTime = getTimer();
	onResize();
	update();
	
	language = new daoLang();
	language.add_lang_xml('en');
	language.loadSettings();
	
	scrContainer = new PIXI.Container();
	stage.addChild(scrContainer);
	
	loadManifest();
	

}

function iniSetArt(set_name) {	
	var json = preloader.resources[set_name]
	if(json){}else{
		console.log("ERROR: " + set_name + " is undefined");
		return;
	}
	json = json.data;
	
	var frames = json.frames;
	var data = preloader.resources[set_name].textures; 
	// console.log("set_name:", set_name);
	
	if(data && frames){
		for (var namePng in frames) {
			var index = namePng.indexOf(".png");
			var nameFrame = namePng;
			if (index > 1) {
				nameFrame = namePng.slice(0, index);
			}
			dataAnima[nameFrame] = data[namePng];
			// console.log("nameFrame:", nameFrame);
		}
	}
}


function loadManifest(){
	preloader = new PIXI.loaders.Loader();
	
	preloader.add("logo", "images/logo.png");
	preloader.add("bgMenu", "images/bg/bgMenu.jpg");
	preloader.add("bgGame1", "images/bg/bgGame1.jpg");
	preloader.add("bgGame2", "images/bg/bgGame2.jpg");
	preloader.add("wndInfo", "images/bg/wndInfo.png");
	
	preloader.add("images/texture/ItemsTexure.json");
	
	
	//сохраняем счетчик кол-ва файлов для загрузки
	preloader.on("progress", handleProgress);
	preloader.load(handleComplete);
}

function textureLoad() {
	if(!options_test){
		// iniSet("images/texture/AnimaTexture.json");
		iniSetArt("images/texture/ItemsTexure.json");
	}
}

function spritesLoad() {
	if(sprites_loaded){
		return true;
	}
	sprites_loaded = true;
	
	var img, data;
}

function handleProgress(){
	var percent = preloader.progress;
}

function handleComplete(evt) {
	spritesLoad();
	textureLoad();
	onResize();
	
	start();
}

function getTimer(){
	var d = new Date();
	var n = d.getTime();
	return n;
}

function refreshTime(){
	startTime = getTimer();
}

function update() {
	requestAnimationFrame(update);
	renderer.render(stage);
	
	if(options_pause){
		return;
	}
	var diffTime = getTimer() - startTime;
	if(diffTime > 29){
		if (currentScreen) {
			currentScreen.update(diffTime);
		}
		
		startTime = getTimer();
	}
}

function clearClips() {
	for (var i = 0; i < arClips.length; i++) {
		var clip = arClips[i];
		if(clip){
			clip.removed_from_stage();
			clip.die();
		}
	}
	
	arClips = [];
}

function removeSelf(obj) {
	if (obj) {
		if (obj.parent.contains(obj)) {
			obj.parent.removeChild(obj);
		}
	}
}

function start() {
	addScreen("ScrMenu");
	// addScreen("ScrGame");
}

function addScreen(name) {
	if(currentScreen){
		scrContainer.removeChild(currentScreen);
	}
	
	currentScreen = new window[name]();
	scrContainer.addChild(currentScreen);
	currentScreen.name = name;
}
// for protoyupe





function addButtonGr(_name, _x, _y, _title, _w, _h, _sizeTF, _color, _colorOver) {
	if(_x){}else{_x = 0;}
	if(_y){}else{_y = 0;}
	if(_w){}else{_w = 65;}
	if(_h){}else{_h = 65;}
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
		obj.tf = addText(0, -_sizeTF/2 , _title, _sizeTF, "#ffffff", "#000000", "center", _w-20, 4);
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
// for release
function addObj(name, _x, _y, _scGr, _scaleX, _scaleY) {
	if(_x){}else{_x = 0;}
	if(_y){}else{_y = 0;}
	if(_scGr){}else{_scGr = 1;}
	if(_scaleX){}else{_scaleX = 1;}
	if(_scaleY){}else{_scaleY = 1;}
	var obj = new PIXI.Container();
	obj.scale.x = _scGr*_scaleX;
	obj.scale.y = _scGr*_scaleY;
	
	var objImg = null;
	if(dataAnima[name]){
		objImg = new PIXI.Sprite(dataAnima[name]);
	} else if(dataMovie[name]){
		objImg = new PIXI.extras.MovieClip(dataMovie[name]);
		objImg.stop();
	}else{
		var data = preloader.resources[name];
		if(data){
			objImg = new PIXI.Sprite(data.texture);
		} else {
			return null;
		}
	}
	objImg.anchor.x = 0.5;
	objImg.anchor.y = 0.5;
	obj.w = objImg.width*obj.scale.x;
	obj.h = objImg.height*obj.scale.y;
	obj.addChild(objImg);
	obj.x = _x*_scGr;
	obj.y = _y*_scGr;
	obj.name = name;
	obj.img = objImg;
	obj.r = obj.w/2;
	obj.rr = obj.r*obj.r;
	
	return obj;
}

function addButton2(name, _x, _y, _scGr, _scaleX, _scaleY) {
	if(_x){}else{_x = 0;}
	if(_y){}else{_y = 0;}
	if(_scGr){}else{_scGr = 1;}
	if(_scaleX){}else{_scaleX = 1;}
	if(_scaleY){}else{_scaleY = 1;}
	var obj = new PIXI.Container();
	
	var data = preloader.resources[name];
	var objImg = null;
	if(data){
		objImg = new PIXI.Sprite(data.texture);
		objImg.anchor.x = 0.5;
		objImg.anchor.y = 0.5;
		obj.addChild(objImg);
	} else {
		return null;
	}
	
	data = preloader.resources[name + "Over"];
	if(data){
		obj.over = new PIXI.Sprite(data.texture);
		obj.over.anchor.x = 0.5;
		obj.over.anchor.y = 0.5;
		obj.over.visible = false;
		obj.addChild(obj.over);
	} else {
		obj.over = null;
	}
	
	data = preloader.resources[name + "Lock"];
	if(data){
		obj.lock = new PIXI.Sprite(data.texture);
		obj.lock.anchor.x = 0.5;
		obj.lock.anchor.y = 0.5;
		obj.lock.visible = false;
		obj.addChild(obj.lock);
	} else {
		obj.lock = null;
	}
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
	if(obj.w < 50){
		obj.w = 50;
	}
	if(obj.h < 50){
		obj.h = 50;
	}
	
	return obj;
}

function getText(txt) {
	return language.get_txt(txt);
}
function getXMLDocument(url){  
    var xml;  
    if(window.XMLHttpRequest){   
        xml=new XMLHttpRequest();  
        xml.open("GET", url, false);  
        xml.send(null);  
        return xml.responseXML;  
    } else {
        if(window.ActiveXObject){
            xml=new ActiveXObject("Microsoft.XMLDOM");  
            xml.async=false;  
            xml.load(url);  
            return xml;  
        } else {  
            console.log("Loading XML is not supported by the browser");  
            return null;  
        } 
	}
}

function get_dd(p1, p2) {
	var dx=p2.x-p1.x;
	var dy=p2.y-p1.y;
	return dx*dx+dy*dy;
}
function getDD(x1, y1, x2, y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	return dx*dx+dy*dy;
}
function hit_test(mc,rr,tx,ty) {
	var dx = mc.x - tx;
	var dy = mc.y - ty;
	var dd = dx*dx+dy*dy;
	if(dd<rr){
		return true;
	}
	return false;
}
function hit_test_rec(mc, w, h, tx, ty) {
	if(tx>mc.x-w/2 && tx<mc.x+w/2){
		if(ty>mc.y-h/2 && ty<mc.y+h/2){
			return true;
		}
	}
	return false;
}
function numToHex(num) {
	return num.toString(16);
}
function hexToNum(str) {
	return parseInt(str, 16);
}
function pad(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}
function makeID(){
	var count = 64;
	var str = "0x";
	var possible = "abcdef0123456789";
	var t = String(getTimer());
	count -= t.length;
	str += t;

	for( var i=0; i < count; i++ ){
		str += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	
	return str;
}

function visGame() {
	//play
	options_pause = false;
	refreshTime();
	
	if(currentScreen){
		// ScreenGame.resetTimer();
	}
}

function hideGame() {
	//pause
	options_pause = true;
	refreshTime();
}

visibly.onVisible(visGame);
visibly.onHidden(hideGame);
