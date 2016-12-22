import Personaggio from '../model/personaggio'

class Game extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.characterUtil = this.game.global.characterUtil;
        this.boundsUtil = this.game.global.boundsUtil;
        this.varUtil = this.game.global.varUtil;
        var cursors = this.game.global.cursors;
        var protagonistaText = this.add.text(0, 0, '#', this.game.global.fontStyleOld);
        this.character = protagonistaText;
        this.fraseText = this.add.text(this.game.width * 0.5, this.game.height - 125, '', this.game.global.fontStyleOld);
        this.boundsUtil.setCell(protagonistaText, this.varUtil.getRandomIndex(this.boundsUtil.getNumberCells().cellsX), this.varUtil.getRandomIndex(this.boundsUtil.getNumberCells().cellsY));
        //numero di personaggi (da cambiare)
        const nPersonaggi = 10;
        this.gattinoTrovato = false;
        console.log("numero celle X:" + this.boundsUtil.getNumberCells().cellsX + " ,numero celle Y:" + this.boundsUtil.getNumberCells().cellsY);

        var gattino = false;
        for (var i = 0; i < nPersonaggi; i++) {
            var personaggio = this.characterUtil.createCharacter();
            var personaggioText = this.add.text(0, 0, personaggio.carattere, this.game.global.fontStyleOld);
            var randomX = this.varUtil.getRandomIndex(this.boundsUtil.getNumberCells().cellsX)
            var randomY = this.varUtil.getRandomIndex(this.boundsUtil.getNumberCells().cellsY);
            personaggioText.addColor(personaggio.colore, 0);
            personaggio.cellaX = randomX;
            personaggio.cellaY = randomY;
            if (personaggio.cellaX === undefined) {
                personaggio.cellaX = 1;
            }
            if (personaggio.cellaY === undefined) {
                personaggio.cellaY = 1;
            }
            if (personaggio.frase === undefined) {
                console.log("wat");
            }
            if (this.boundsUtil.isCellEmpty(personaggio.cellaX, personaggio.cellaY)) {
                this.boundsUtil.setCell(personaggioText, personaggio.cellaX, personaggio.cellaY);
                console.log("cellaX:" + personaggio.cellaX + " ,cellaY:" + personaggio.cellaY)
                this.characterUtil.addCharacter(personaggio);
            } else {
                personaggioText.destroy();
                i--;
                console.log("personaggio rimosso");
            }
        }
        //creazione bordi
        for (let cellX = 0.25; cellX < this.boundsUtil.getNumberCells().cellsX; cellX++) {
            let bordoXZero = this.add.text(0, 0, '-', this.game.global.fontStyleOld);
            this.boundsUtil.setCell(bordoXZero, cellX, -1);
            let bordoXFine = this.add.text(0, 0, '- ', this.game.global.fontStyleOld);
            this.boundsUtil.setCell(bordoXFine, cellX, this.boundsUtil.getNumberCells().cellsY + 2);
        }
        for (let cellY = 0.75; cellY < this.boundsUtil.getNumberCells().cellsY + 2; cellY++) {
            let bordoYZero = this.add.text(0, 0, '¦', this.game.global.fontStyleOld);
            this.boundsUtil.setCell(bordoYZero, 0, cellY - 1);
            let bordoYFine = this.add.text(0, 0, '¦', this.game.global.fontStyleOld);
            this.boundsUtil.setCell(bordoYFine, this.boundsUtil.getNumberCells().cellsX, cellY - 1);
        }

        this.timer = this.game.time.create(false);
        console.log(this.characterUtil.getListCharacters())
    }

    update() {
        var cursors = this.game.global.cursors;
        var bounds = this.game.global.bounds;
        var protagonista = this.character; //refactor
        var boundsUtil = this.game.global.boundsUtil;
        var characterUtil = this.game.global.characterUtil;
        var fraseText = this.fraseText;
        var varUtil = this.varUtil;
        var gameWidth = this.game.width;
        var thisUpdate = this;
        var endGame = function(character) {
            thisUpdate.endGame(character);
        };
        var timer = this.timer;
        var goToMenu = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        var restart = this.game.input.keyboard.addKey(Phaser.Keyboard.R);

        if (!this.gattinoTrovato) {
            cursors.up.pressed = false;
            cursors.up.onDown.add(function() {
                if (!cursors.up.pressed) {
                    var cellaProtagonista = boundsUtil.getCell(protagonista);
                    console.log(cellaProtagonista);
                    if (boundsUtil.isCellEmpty(cellaProtagonista.x, cellaProtagonista.y - 1) && cellaProtagonista.y > 0) {
                        if(cellaProtagonista.y > 0){
                           boundsUtil.setCell(protagonista, cellaProtagonista.x, cellaProtagonista.y - 1);
                        }
                        fraseText.text = '';
                    } else {
                        let frase = characterUtil.getCharacterQuote(cellaProtagonista.x, cellaProtagonista.y - 1);
                        fraseText.text = frase;
                        varUtil.centerObject(fraseText, 'x', gameWidth, null);
                        if (frase === 'Hai trovato il gattino!') {
                            endGame(characterUtil.getCharacterCharacter(cellaProtagonista.x, cellaProtagonista.y - 1));
                        }
                        console.log(frase);
                    }
                    if (this.timer.running) {
                        this.timer.stop();
                    }
                    this.timer.add(Phaser.Timer.SECOND * 0.3, function() {
                        cursors.up.reset(true);
                        this.timer.stop();
                    }, this);
                    this.timer.start();
                    cursors.up.pressed = true;
                }
            }, this);
            cursors.down.pressed = false;
            cursors.down.onDown.add(function() {
                if (!cursors.down.pressed) {
                    var cellaProtagonista = boundsUtil.getCell(protagonista);
                    console.log(cellaProtagonista);
                    if (boundsUtil.isCellEmpty(cellaProtagonista.x, cellaProtagonista.y + 1)) {
                        if(cellaProtagonista.y < boundsUtil.getNumberCells().cellsY){
                            boundsUtil.setCell(protagonista, cellaProtagonista.x, cellaProtagonista.y + 1);
                        }
                        fraseText.text = '';
                    } else {
                        let frase = characterUtil.getCharacterQuote(cellaProtagonista.x, cellaProtagonista.y + 1);
                        fraseText.text = frase;
                        varUtil.centerObject(fraseText, 'x', gameWidth, null);
                        if (frase === 'Hai trovato il gattino!') {
                            endGame(characterUtil.getCharacterCharacter(cellaProtagonista.x, cellaProtagonista.y + 1));
                        }
                        console.log(frase);
                    }
                    if (this.timer.running) {
                        this.timer.stop();
                    }
                    this.timer.add(Phaser.Timer.SECOND * 0.3, function() {
                        cursors.down.reset(true);
                        this.timer.stop();
                    }, this);
                    this.timer.start();
                    cursors.down.pressed = true;
                }
            }, this);
            cursors.left.pressed = false;
            cursors.left.onDown.add(function() {
                if (!cursors.left.pressed) {
                    var cellaProtagonista = boundsUtil.getCell(protagonista);
                    console.log(cellaProtagonista);
                    if (boundsUtil.isCellEmpty(cellaProtagonista.x - 1, cellaProtagonista.y)) {
                        if(cellaProtagonista.x > 0){
                            boundsUtil.setCell(protagonista, cellaProtagonista.x - 1, cellaProtagonista.y);
                        }
                        fraseText.text = '';
                    } else {
                        let frase = characterUtil.getCharacterQuote(cellaProtagonista.x - 1, cellaProtagonista.y);
                        fraseText.text = frase;
                        varUtil.centerObject(fraseText, 'x', gameWidth, null);
                        if (frase === 'Hai trovato il gattino!') {
                            endGame(characterUtil.getCharacterCharacter(cellaProtagonista.x - 1, cellaProtagonista.y));
                        }
                        console.log(frase);
                    }
                    if (this.timer.running) {
                        this.timer.stop();
                    }
                    this.timer.add(Phaser.Timer.SECOND * 0.3, function() {
                        cursors.left.reset(true);
                        this.timer.stop();
                    }, this);
                    this.timer.start();
                    cursors.left.pressed = true;
                }
            }, this);
            cursors.right.pressed = false;
            cursors.right.onDown.add(function() {
                if (!cursors.right.pressed) {
                    var cellaProtagonista = boundsUtil.getCell(protagonista);
                    console.log(cellaProtagonista);
                    if (boundsUtil.isCellEmpty(cellaProtagonista.x + 1, cellaProtagonista.y)) {
                        if(cellaProtagonista.x < boundsUtil.getNumberCells().cellsX){
                            boundsUtil.setCell(protagonista, cellaProtagonista.x + 1, cellaProtagonista.y);
                        }
                        fraseText.text = '';
                    } else {
                        let frase = characterUtil.getCharacterQuote(cellaProtagonista.x + 1, cellaProtagonista.y);
                        fraseText.text = frase;
                        varUtil.centerObject(fraseText, 'x', gameWidth, null);
                        if (frase === 'Hai trovato il gattino!') {
                            endGame(characterUtil.getCharacterCharacter(cellaProtagonista.x + 1, cellaProtagonista.y));
                        }
                        console.log(frase);
                    }
                    if (this.timer.running) {
                        this.timer.stop();
                    }
                    this.timer.add(Phaser.Timer.SECOND * 0.3, function() {
                        cursors.right.reset(true);
                        this.timer.stop();
                    }, this);
                    this.timer.start();
                    cursors.right.pressed = true;
                }
            }, this);
        }
        goToMenu.onDown.add(function() {
            this.characterUtil.reset();
            this.game.state.start('boot');
        }, this)
    };

    endGame(character) {
        var cursors = this.game.global.cursors;
        this.gattinoTrovato = true;
        var loop = this.game.time.create(true);

        var points = this.boundsUtil.getGameBounds();
        var protagonista = this.add.text(0, this.game.height - 75, '#', this.game.global.fontStyleOld);
        var gattino = this.add.text(0, this.game.height - 75, '', this.game.global.fontStyleOld);

        gattino.text = character.carattere;
        gattino.addColor(character.colore, 0);

        this.timer.stop();
        cursors.up.enabled = false;
        cursors.down.enabled = false;
        cursors.left.enabled = false;
        cursors.right.enabled = false;

        if (this.boundsUtil.getNumberCells().cellsX % 2 === 1) {
            this.boundsUtil.setCell(protagonista, 0, null);
            this.boundsUtil.setCell(gattino, this.boundsUtil.getNumberCells().cellsX, null);
        } else {
            this.boundsUtil.setCell(protagonista, 0.5, null);
            this.boundsUtil.setCell(gattino, this.boundsUtil.getNumberCells().cellsX - 0.5, null);
        }
        loop.start();
        loop.loop(Phaser.Timer.SECOND * 0.3, function() {
            this.boundsUtil.setCell(protagonista, this.boundsUtil.getCell(protagonista).x + 1, null);
            this.boundsUtil.setCell(gattino, this.boundsUtil.getCell(gattino).x - 1, null);
            console.log("Cella Protagonista:" + this.boundsUtil.getCell(protagonista).x)
            console.log("Cella Gattino:" + this.boundsUtil.getCell(gattino).x)
            if (this.boundsUtil.getCell(protagonista).x + 1 === this.boundsUtil.getCell(gattino).x || this.boundsUtil.getCell(protagonista).x + 2 === this.boundsUtil.getCell(gattino).x) {
                loop.stop();
                var avviso = this.add.text(0, this.game.height - 45, 'Premi m per tornare al menu', this.game.global.fontStyleOld);
                this.varUtil.centerObject(avviso, 'x', this.game.width);
            }
        }, this);
    }

}

export default Game;
