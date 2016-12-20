export default class VarUtil {

    constructor() {
        console.log("util caricate");
    }

    getRandomIndex(i) {
        return Math.floor(Math.random() * i);
    }

    centerObject(object, direction, gameX, gameY) {
        if (direction === 'x' ||direction==='xy') {
            object.x = gameX/2 - object.width / 2;
        }
        if (direction === 'y'||direction==='xy') {
            object.y = gameY/2 - object.height / 2;
        }

    }


}
