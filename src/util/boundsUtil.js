import CharacterUtil from '../util/characterUtil'

export default class BoundsUtil {

    constructor(heightCharacter, widthCharacter, heightGame, widthGame) {
        this.heightCharacter = heightCharacter;
        this.widthCharacter = widthCharacter;
        this.heightGame = heightGame - 100;
        this.widthGame = widthGame;
        this.characterUtil = new CharacterUtil();
    }

    getGameBounds() {
        var x = 50;
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

    getMaximumNumberCells() {
        var cellsX = Math.floor(this.widthGame / this.widthCharacter) - 2;
        var cellsY = Math.floor(this.heightGame / this.heightCharacter);
        return { cellsX: cellsX, cellsY: cellsY };
    }

    getNumberCells() {
        var points = this.getGameBounds();
        var cellsX = Math.floor((points[2].x-points[0].x) / this.widthCharacter) - 2;
        var cellsY = Math.floor((points[3].y-points[2].y) / this.heightCharacter);
        return { cellsX: cellsX, cellsY: cellsY };
    }

    getCell(object) {

        var points = this.getGameBounds();

        let cellX = (object.x- points[0].x)/this.widthCharacter;
        let cellY = (object.y- points[0].y)/this.heightCharacter ;
        
        return { x: Math.floor(cellX), y: Math.floor(cellY) };
    }

    setCell(object, cellX, cellY) {

        var points = this.getGameBounds();

        object.x = cellX * this.widthCharacter + points[0].x;
        object.y = cellY * this.heightCharacter + points[0].y;

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
