export default new class Preloader {
    constructor() {
        this.preloader = new PIXI.loaders.Loader();
        this.allimg = [];
        // this.load_bool = false
    }

    add(params) {
        this.preloader.add(params.name, params.path)
    }

    addAll(params, callback) {

        for (let i=0; i < params.length; i++) {
    		//console.log(params[i].name, params[i].path)
            this.preloader.add(params[i].name, params[i].path);
            this.allimg.push(params[i]);
        }
        this.preloader.on("progress", function(){console.log("progress!")});
		this.preloader.load(function(){
			// this.load_bool = true;
			console.log("complete!");
			if(callback){
				callback();
			}
		});
    }

    getimg(name) {
    	// if(this.load_bool == false) return;
        for (let i = 0; i < this.allimg.length; i++) {
            if (this.allimg[i].name === name) {
                return this.allimg[i]
            }
        }
    }
}
/*

export default class Manifest {
	constructor(){
		preloader = new PIXI.loaders.Loader();
	
		preloader.add("bg", "../../images/items/bgTicket.png");
		preloader.add("bgMenu", "../../images/buttons/btnNW_0003.png");
		preloader.add("bgGame1", "../../images/buttons/btnNW_0001.png");
		preloader.add("bgGame1", "../../images/buttons/btnNR_0001.png");
		preloader.add("bgGame1", "../../images/buttons/btnNR_0003.png");
		
		// preloader.add("images/texture/ItemsTexure.json");
		
		
		//сохраняем счетчик кол-ва файлов для загрузки
		preloader.on("progress", handleProgress);
		preloader.load(handleComplete);

		function handleProgress(){
			var percent = preloader.progress;
		}

		function handleComplete(evt) {
			console.log("load complete")
			// spritesLoad();
			// textureLoad();
			// onResize();
			
			// start();
		}
	}
}



    {
        name:"bg",
        path:"../../images/items/bgTicket.png"
    }
*/