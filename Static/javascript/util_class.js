/* 
    CLASSI UTILI
        - ...
            
*/

import { 
    points_number 
} from "./util_function.js";

import { 
    path 
} from "./util_variable.js";

document.addEventListener('DOMContentLoaded', () => {
    
    console.log("ciao: ", points_number(window.location.pathname));
});


// Classe per la manipolazione del testo inserito dall'utente
export class UserText {

    // Prendo le variabili
    constructor(text) {

        // Testo da convertire
        this.text = text;
    }

    /*
        Conversioni
    */
    convert(from) {

        // Richiamo il file JSON
        fetch(`${points_number(path)}Static/json/encoding-map.json`)
        .then(response => response.json())
        .then(data => {

            // Prendo i dati relativi al cosa voglio tradurre
            this.chars = data[from];
            return data;

        });

        // return this;
        
    }

    // Binario
    toBinary() {

        // Testo convertito
        let binary = [];

        // Ritorno l'array unito -> testo convertito
        return binary.join('');
    }

    // Esadecimale
    toHexa() {

        // Testo convertito
        let hexa = [];

        // Ritorno l'array unito -> testo convertito
        return hexa.join('');
    }

    // Morse
    toMorse() {

        // Testo convertito
        let morse = [];
        // let mmt = [];

        // Converto ogni carattere
        this.text.toUpperCase().split('').forEach(char => {

            // Prendo il carattere
            let converted_char = char;
            // let mmmt;

            // Se non è un 'a capo' lo converto
            if (char !== '\n') {

                // Variabile per capire se ho trovato il carattere tra quelli elencati o è estraneo dagli elenchi
                // let found = false;
                
                // Itero ogni oggetto cercando di trovare il carattere
                for (let group of this.chars) {

                    // // Controllo se è tra le chiavi
                    // if (Object.keys(group).includes(char)) {
                    //     converted_char = group[char];
                    //     // found = true;
                    //     break;
                    // }
                    // // Altrimenti segnalo l'errore
                    // else {
                    //     converted_char = '#';
                    // }

                    switch (this.from) {
                        // Testo normale
                        case 'text':

                            // Controllo se è tra le chiavi
                            if (Object.keys(group).includes(char)) {
                                converted_char = group[char];
                                found = true;
                            }
                            // Altrimenti segnalo l'errore
                            else {
                                converted_char = '#';
                            }
                            
                            break;

                        // Morse
                        default:
                            
                            // Controllo se è tra i valori
                            if (Object.values(group).includes(char)) {
                                converted_char = Object.entries(group).find(([k, v]) => v === char)?.[0];
                                found = true;
                            }
                            // Altrimenti segnalo l'errore
                            else {
                                converted_char = '#';
                            }

                            break;
                    }

                    if (found) {
                        break;
                    }
                }
            }

            // Aggiungo l'elemento all'array
            morse.push(converted_char);
            // mmt.push(mmmt);
        });

        // Ritorno l'array unito -> testo convertito
        return morse.join(' ');
        // return mmt;
    }

    // Ottale
    toOctal() {

        // Testo convertito
        let octal = [];

        // Ritorno l'array unito -> testo convertito
        return octal.join('');
    }

    // Testo semplice
    toText() {

        // Testo convertito
        let simple_text = [];
        // let mmt = [];

        // Converto ogni carattere
        this.text.split(' ').forEach(char => {

            // Prendo il carattere
            let converted_char = char;

            // Se non è un 'a capo' lo converto
            if (char !== '\n') {

                // Variabile per capire se ho trovato il carattere tra quelli elencati o è estraneo dagli elenchi
                // let found = false;
                // let mmmt;
                
                // Itero ogni oggetto cercando di trovare il carattere
                for (let group of this.chars) {
                                        
                    // // Controllo se è tra i valori
                    // if (Object.values(group).includes(char)) {
                    //     converted_char = Object.entries(group).find(([k, v]) => v === char)?.[0];
                    //     // found = true;
                    //     break;
                    // }
                    // // Altrimenti segnalo l'errore
                    // else {
                    //     converted_char = '#';
                    // }

                    switch (this.from) {

                        // Binario
                        case 'binary':
                            //
                            break;
            
                        // Esadecimale
                        case 'hexadecimal':
                            //
                            break;
            
                        // Morse
                        case 'morse':
                                        
                            // Controllo se è tra i valori
                            if (Object.values(group).includes(char)) {
                                converted_char = Object.entries(group).find(([k, v]) => v === char)?.[0];
                                found = true;
                            }
                            // Altrimenti segnalo l'errore
                            else {
                                converted_char = '#';
                            }
            
                            break;
            
                        // Ottale
                        case 'octal':
                            //
                            break;
            
                        // Default (text)
                        default:
            
                            // Lascio il testo com'è
                            simple_text.push(this.text);
            
                            break;
                    }
                    // mmmt = [this.from, Object.values(group).includes(char), Object.values(group), group, converted_char, Object.entries(group).find(([k, v]) => v === char)?.[0]];
                    // mmt.push(mmmt);

                    if (found) {
                        break;
                    }
                }
            }

            // Aggiungo l'elemento all'array
            simple_text.push(converted_char);
        });

        // Ritorno l'array unito -> testo convertito
        return simple_text.join('');
        // return mmt;
    }


    /*
        Ricerca
    */

    find(pattern) {

        //
    }
}