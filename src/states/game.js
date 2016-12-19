import Personaggio from '../model/personaggio'

class Game extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.characterUtil = this.game.global.characterUtil;
        this.boundsUtil = this.game.global.boundsUtil;
        this.varUtil = this.game.global.varUtil;
        var protagonistaText = this.add.text(0, 0, '#', this.game.global.fontStyleOld);
        this.character = protagonistaText;
        this.boundsUtil.setCell(protagonistaText, this.boundsUtil.getNumberCells().cellsX / 2, this.boundsUtil.getNumberCells().cellsY / 2);

        //numero di personaggi (da cambiare)
        const nPersonaggi = 10;
        console.log("numero celle X:" + this.boundsUtil.getNumberCells().cellsX + " ,numero celle Y:" + this.boundsUtil.getNumberCells().cellsY);

        for (var i = 0; i < nPersonaggi; i++) {
            var personaggio = this.characterUtil.createCharacter();
            var personaggioText = this.add.text(0, 0, personaggio.carattere, this.game.global.fontStyleOld);
            var randomX = this.varUtil.getRandomIndex(this.boundsUtil.getNumberCells().cellsX)
            var randomY = this.varUtil.getRandomIndex(this.boundsUtil.getNumberCells().cellsY);

            personaggioText.addColor(personaggio.colore, 0);
            personaggio.cellaX = randomX;
            personaggio.cellaY = randomY;

            if (this.boundsUtil.isCellEmpty(personaggio.cellaX, personaggio.cellaY)) {
                this.boundsUtil.setCell(personaggioText, personaggio.cellaX, personaggio.cellaY);
                console.log("cellaX:" + personaggio.cellaX + " ,cellaY:" + personaggio.cellaY)
                this.characterUtil.addCharacter(personaggio);
            } else {
                personaggioText.destroy();
                i--;
            }
        }
        console.log(this.characterUtil.getListCharacters())
    }

    update() {
        var cursors = this.game.global.cursors;
        var bounds = this.game.global.bounds;
        var text = this.character; //refactor
        var boundsUtil = this.game.global.boundsUtil;
        var characterUtil = this.game.global.characterUtil;

        cursors.up.pressed = false;
        cursors.up.onDown.add(function() {
            if (!cursors.up.pressed) {
                var cellaProtagonista = boundsUtil.getCell(text);
                if (boundsUtil.isCellEmpty(cellaProtagonista.x, cellaProtagonista.y - 1)) {
                    if (text.y - text.height / 2 > bounds[0].y) {
                        text.y = text.y - text.height / 2;
                    }
                } else {
                    let frase = characterUtil.getCharacterQuote(cellaProtagonista.x, cellaProtagonista.y - 1)
                    console.log(frase);
                }
                cursors.up.pressed = true;
            }
        });
        cursors.down.pressed = false;
        cursors.down.onDown.add(function() {
            if (!cursors.down.pressed) {
                var cellaProtagonista = boundsUtil.getCell(text);
                if (boundsUtil.isCellEmpty(cellaProtagonista.x, cellaProtagonista.y + 1)) {
                    if (text.y - text.height / 2 < bounds[3].y) {
                        console.log("giù");
                        text.y = text.y + text.height / 2;
                    }
                } else {
                    let frase = characterUtil.getCharacterQuote(cellaProtagonista.x, cellaProtagonista.y + 1)
                    console.log(frase);
                }
                cursors.down.pressed = true;
            }
        });
        cursors.left.pressed = false;
        cursors.left.onDown.add(function() {
            if (!cursors.left.pressed) {
                var cellaProtagonista = boundsUtil.getCell(text);
                if (boundsUtil.isCellEmpty(cellaProtagonista.x - 1, cellaProtagonista.y)) {
                    if (text.x - text.width > bounds[0].x) {
                        console.log("sinistra");
                        text.x = text.x - text.width;
                    }
                } else {
                    let frase = characterUtil.getCharacterQuote(cellaProtagonista.x - 1, cellaProtagonista.y)
                    console.log(frase);
                }

                cursors.left.pressed = true;
            }
        });
        cursors.right.pressed = false;
        cursors.right.onDown.add(function() {
            if (!cursors.right.pressed) {
                var cellaProtagonista = boundsUtil.getCell(text);
                if (boundsUtil.isCellEmpty(cellaProtagonista.x + 1, cellaProtagonista.y)) {
                    if (text.x + text.width < bounds[3].x) {
                        console.log("destra");
                        text.x = text.x + text.width;
                    }
                } else {
                    let frase = characterUtil.getCharacterQuote(cellaProtagonista.x + 1, cellaProtagonista.y - 1)
                    console.log(frase);
                }

                cursors.right.pressed = true;
            }
        });
    };

    endGame() {
        this.game.state.start('gameover');
    }

}

export default Game;
