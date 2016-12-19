import VarUtil from '../util/varUtil'
import Personaggio from '../model/personaggio'

let instance = null;

export default class CharacterUtil {

    constructor() {
        if (!instance) {
            instance = this;
            this.listaPersonaggi = [];
            this.varUtil = new VarUtil();
        }
        return instance;
    }

    createCharacter() {
        var personaggio = new Personaggio();
        personaggio.carattere = this.getRandomCharacter();
        personaggio.frase = this.getRandomQuote();
        personaggio.colore = this.getRandomColor();
        return personaggio;
    }

    addCharacter(personaggio) {
        this.listaPersonaggi.push(personaggio);
    }

    getListCharacters() {
        return this.listaPersonaggi;
    }

    getCharacterQuote(cellX, cellY){
    	for (let personaggio of this.listaPersonaggi) { //modificare con arrow function
            if (cellX === personaggio.cellaX && cellY === personaggio.cellaY) {
                return personaggio.frase;
            } 
        }
    }

    getRandomColor(){
		var values = ['00','33','66','99','cc','ff'];
		var l = values.length;
		return '#'+values[this.varUtil.getRandomIndex(l)]+values[this.varUtil.getRandomIndex(l)]+values[this.varUtil.getRandomIndex(l)];
	}

	getRandomCharacter(){
		var values = '1234567890!£$%&/()=qwertyuiopasdfghjklzxcvbnm,.-QWERTYUIOPASDFGHJKLZXCVBNMòàè+ùì?^ç°*é><';
		return values[this.varUtil.getRandomIndex(values.length)];
	}

    getRandomQuote(){
    	var quotes=['Un biglietto della fortuna che dice: "Ma sarà igienico un biglietto in un biscotto?"',
    				'Tony Santagata su un monociclo', 
    				'John Lennon con una bottiglia di Vecchia Romagna piena di monetine',
    				'Gli occhiali da sole di Elwood Blues',
    				'Una biglia con Mario Cipollini dentro che urla "Liberatemi!"',
    				'Un anello di una bottiglietta di plastica',
    				'Un cepello di Donald Trump. Vero.',
    				'Una cartolina: "Saluti da Quarto Oggiaro"'];
    	return quotes[this.varUtil.getRandomIndex(quotes.length)];
    }
}
