import VarUtil from '../util/varUtil'
import Personaggio from '../model/personaggio'

let instance = null;

export default class CharacterUtil {

    constructor() {
        if (!instance) {
            instance = this;
            this.listaPersonaggi = [];
            this.varUtil = new VarUtil();
            this.gattino = false;
            this.listaFrasi = [];
        }
        return instance;
    }

    createCharacter() {
        var personaggio = new Personaggio();
        personaggio.carattere = this.getRandomCharacter();
        if (!this.gattino) {
            personaggio.frase = 'Hai trovato il gattino!';
            this.gattino = true;
        } else {
            personaggio.frase = this.getRandomQuote();
        }
        personaggio.colore = this.getRandomColor();
        for (let personaggioPresente in this.listaPersonaggi) {
            if (personaggioPresente.colore === personaggio.colore && personaggioPresente.carattere === personaggio.carattere) {
                console.log("carattere e colore già presenti")
                return this.createCharacter();
            }
        }
        return personaggio;
    }

    addCharacter(personaggio) {
        this.listaPersonaggi.push(personaggio);
    }

    getListCharacters() {
        return this.listaPersonaggi;
    }

    getCharacterQuote(cellX, cellY) {
        for (let personaggio of this.listaPersonaggi) { //modificare con arrow function
            if (cellX === personaggio.cellaX && cellY === personaggio.cellaY) {
                return personaggio.frase;
            }
        }
    }

    getRandomColor() {
        var values = ['00', '33', '66', '99', 'cc', 'ff'];
        var l = values.length;
        var color = '#' + values[this.varUtil.getRandomIndex(l)] + values[this.varUtil.getRandomIndex(l)] + values[this.varUtil.getRandomIndex(l)];
        if (color==='#000000'){
            console.log ("E' uscito" + color);
            return getRandomColor();
        } else {
            return color;
        }
    }

    getRandomCharacter() {
        var values = '1234567890!£$%&/()=qwertyuiopasdfghjklzxcvbnm,.-QWERTYUIOPASDFGHJKLZXCVBNM+?^°*é><';
        return values[this.varUtil.getRandomIndex(values.length)];
    }

    getRandomQuote(quotes) {
        if (!quotes) {
            var quotes = ['Un biglietto della fortuna che dice: "Ma sarà igienico un biglietto in un biscotto?"',
                'Tony Santagata su un monopattino',
                'John Lennon con una bottiglia di Vecchia Romagna piena di monetine',
                'Gli occhiali da sole di Elwood Blues',
                'Una biglia con un ciclista dentro che urla "Liberatemi!"',
                'Un anello di una bottiglietta di plastica',
                'Un capello di Donald Trump. Vero.',
                'Una cartolina: "Saluti da Quarto Oggiaro"',
                "Claudio Bisio che corre dietro la Metro Verde",
                'Un paio di pantaloni scozzesi',
                'Un foglietto con su scritto: "Vota Bill Murray"',
                'Una ruota di bicicletta legata ad un palo',
                'Una 126 Turbo'
            ];
        }

        var candidate = quotes[this.varUtil.getRandomIndex(quotes.length)];
        if (this.listaFrasi.includes(candidate)) {
            console.log("frase già presente:" + candidate);
            let index = quotes.indexOf(candidate);
            quotes.splice(index, 1)
            return this.getRandomQuote(quotes);
        } else {
            this.listaFrasi.push(candidate);
            return candidate;
        }
    }
}
