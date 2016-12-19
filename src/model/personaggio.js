export default class Personaggio {

    constructor(carattere, frase, colore, cellaX, cellaY) {
        this._carattere = carattere;
        this._frase = frase;
        this._colore = colore;
        this._cellaX = cellaX;
        this._cellaY = cellaY;
    }

    get carattere() {
        return this._carattere;
    }

    set carattere(carattere) {
        if (carattere) {
            this._carattere = carattere;
        }
    }
    get frase() {
        return this._frase;
    }

    set frase(frase) {
        if (frase) {
            this._frase = frase;
        }
    }
    get colore() {
        return this._colore;
    }

    set colore(colore) {
        if (colore) {
            this._colore = colore;
        }
    }
    get cellaX() {
        return this._cellaX;
    }

    set cellaX(cellaX) {
        if (cellaX) {
            this._cellaX = cellaX;
        }
    }
    get cellaY() {
        return this._cellaY;
    }

    set cellaY(cellaY) {
        if (cellaY) {
            this._cellaY = cellaY;
        }
    }
}
