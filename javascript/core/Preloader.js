export default new class Preloader {
    constructor() {
        this.preloader = new PIXI.loaders.Loader();
        this.allimg = [];
    }

    add(params) {
        this.preloader.add(params.name, params.path)
    }

    addAll(params, callback) {
        for (let i = 0; i < params.length; i++) {
            this.preloader.add(params[i].name, params[i].path);
            this.allimg.push(params[i]);
        }
        this.preloader.on("progress", function(){console.log("progress!")});
		this.preloader.load(function(){
			console.log("complete!");
			if(callback)
				callback();
		});
    }

    getimg(name) {
        for (let i = 0; i < this.allimg.length; i++)
            if (this.allimg[i].name === name)
                return this.allimg[i]
    }
}