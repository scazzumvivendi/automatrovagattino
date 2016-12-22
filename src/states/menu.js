class Menu extends Phaser.State {

  constructor() {
    super();
  }
  
  create() {
   var desc = 'In questo gioco tu sei automa (#). \n';
    desc+='Il tuo compito è trovare gattino. \n'
    desc+='Questo compito è complicato dall\'esistenza\n di varie cose che non sono gattino.\n'
    desc+='Automa deve toccare cose per determinare\n se sono gattino o no.\n';
    desc+='Il gioco finisce quando automatrovagattino.\n\n'
    desc+='Puoi muoverti con i cursori.\nPer tornare alla descrizione, premi m.\n'
    desc+='Premi spazio per iniziare.'
    var text = this.add.text(0,0, desc, this.game.global.fontStyleOld);
    this.game.global.varUtil.centerObject(text, 'xy', this.game.width, this.game.height);

    var spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    spaceBar.onDown.add(this.startGame, this);
  }

  update() {}

  startGame () {
    this.game.state.start('game');
  }

}

export default Menu;