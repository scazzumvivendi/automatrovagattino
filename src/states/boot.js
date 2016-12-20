import BoundsUtil from '../util/boundsUtil'
import VarUtil from '../util/varUtil'
import CharacterUtil from '../util/characterUtil'

class Boot extends Phaser.State {

    constructor() {
        super();
    }

    preload() {
        this.load.image('preloader', 'assets/preloader.gif');
    }

    create() {
        this.game.input.maxPointers = 1;

        //setup device scaling
        if (this.game.device.desktop) {
            this.game.scale.pageAlignHorizontally = true;
        } else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 800;
            this.game.scale.maxHeight = 600;
            this.game.scale.forceOrientation(true);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.setScreenSize(true);
        }

        this.initGlobalVariables();

        this.game.state.start('menu');
    }

    initGlobalVariables() {
        var cursors = this.game.input.keyboard.createCursorKeys();
        var fontStyleOld = { font: "30pt fontVGA", fill: "#ffffff", shadowOffsetX: 0, shadowOffsetY: 0, shadowBlur: 8, shadowColor: '#000000' };
        var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, '?', fontStyleOld);
        const boundsUtil = new BoundsUtil(text.height, text.width,this.game.height, this.game.width);
        const varUtil = new VarUtil();
        const characterUtil = new CharacterUtil();
        const bounds = boundsUtil.getGameBounds();
        text.destroy();
        
        this.game.global = {
            fontStyleOld,
            cursors, 
            bounds,
            boundsUtil,
            varUtil,
            characterUtil
        };
    }

}

export default Boot;
