import CharacterUtil from '../util/characterUtil'

export default class BoundsUtil {

    constructor(heightCharacter, widthCharacter, heightGame, widthGame) {
        this.heightCharacter = heightCharacter / 2;
        this.widthCharacter = widthCharacter;
        this.heightGame = heightGame;
        this.widthGame = widthGame;
        this.characterUtil = new CharacterUtil();
    }

    getGameBounds() {
        var x = 100;
        var y = 50;
        var xStage = -1;
        var yStage = -1;

        while (xStage < 0) {
            xStage = (this.widthGame - this.widthCharacter * x) / 2;
            x--;
        }

        while (yStage < 0) {
            yStage = (this.heightGame - this.heightCharacter * y) / 2;
            y--;
        }

        var points = [{ x: xStage, y: yStage }, { x: xStage, y: this.heightCharacter * y }, { x: this.widthCharacter * x, y: yStage }, { x: this.widthCharacter * x, y: this.heightCharacter * y }];
        return points;
    }

    getNumberCells() {
        var cellsX = Math.floor(this.widthGame / this.widthCharacter) - 2;
        var cellsY = Math.floor(this.heightGame / this.heightCharacter) - 2;
        return { cellsX: cellsX, cellsY: cellsY };
    }

    getCell(object) {

        let cellX = object.x/this.widthCharacter;
        let cellY = object.y/this.heightCharacter;
        
        return { x: Math.floor(cellX), y: Math.floor(cellY) };
    }

    setCell(object, cellX, cellY) {

        object.x = cellX * this.widthCharacter;
        object.y = cellY * this.heightCharacter;

        return object;
    }

    isCellEmpty(cellX, cellY) {
        var listaPersonaggi = this.characterUtil.getListCharacters();
        for (let personaggio of listaPersonaggi) {
            if (cellX === personaggio.cellaX && cellY === personaggio.cellaY) {
                return false;
            }
        }
        return true;
    }

}
