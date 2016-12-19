class Menu extends Phaser.State {

  constructor() {
    super();
  }
  
  create() {
    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'MENU', this.game.global.fontStyleOld);
    text.anchor.set(0.5);

    this.input.onDown.add(this.startGame, this);
  }

  update() {}

  startGame () {
    this.game.state.start('game');
  }

}

export default Menu;