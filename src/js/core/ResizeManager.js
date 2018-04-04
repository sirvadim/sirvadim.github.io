export default class ResizeManager {
    constructor(){
        this.globalScale = 1;
        this.isCanvas = true;
        this.renderSize = 1;
        this.stageScale = 1;
    }

    onResize(renderer, stage, _W, _H){
        if (!renderer) return;

        let realW = window.innerWidth;
        let realH = window.innerHeight;

        this.globalScale = Math.min(realW / _W, realH / _H);

        if (renderer instanceof PIXI.CanvasRenderer)
            this.isCanvas = true;
        else
            this.isCanvas = false;

        renderer.resize(_W/this.renderSize, _H/this.renderSize);

        renderer.view.style.width = _W * this.globalScale + 'px';
        renderer.view.style.height = _H * this.globalScale+ 'px';

        renderer.view.style.position = 'absolute';
        renderer.view.style.left = (realW / 2 - _W * this.globalScale / 2) + 'px';
        renderer.view.style.top = (realH / 2 - _H * this.globalScale / 2) + 'px';

        stage.scale.x = this.stageScale;
        stage.scale.y = this.stageScale;

    }
}