/* 
    CLASSI UTILI
        - ...
            
*/

import { points_number } from "./util_function.js";

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
    convert() {

        // Converto in maiuscolo per ricercare le lettere meglio
        this.textUpper = this.text.toUpperCase();

        return this;
        
    }

    // Binario
    toBinary(from) {
        return '';
    }

    // Esadecimale
    toHexa(from) {
        return '';
    }

    // Morse
    toMorse(from) {

        // Testo convertito
        let morse = [];
        // let mmt = [];

        let chars = [

            // Lettere
            {
                'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.',
                'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.',
                'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-',
                'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..'
            },

            // Numeri
            {
                '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
                '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
            },

            // Simboli
            {
                '.': '.-.-.-', ',': '--..--', ':': '---...', '?': '..--..', '=': '-...-', '-': '-....-', '(': '-.--.',
                ')': '-.--.-', '\"': '.-..-.', '\'': '.----.', '/': '-..-.', '_': '..--.-', '@': '.--.-.', '!': '-.-.--'
            }
        ]

        // Converto ogni carattere
        this.textUpper.split('').forEach(char => {

            // Prendo il carattere
            let converted_char = char;
            // let mmmt;

            // Se non è un 'a capo' lo converto
            if (char !== '\n') {

                // Controllare se non è uno spazio (in caso sia testo normale)
                
                // Itero ogni oggetto cercando di trovare il carattere
                for (let group of chars) {

                    switch (from) {
                        // Testo normale
                        case 'text':

                            // Controllo se è tra le chiavi
                            if (Object.keys(group).includes(char)) {
                                converted_char = group[char];
                                break;
                            }
                            // Altrimenti segnalo l'errore
                            else {
                                if (char === ' ') {
                                    converted_char = '/';
                                }
                                else {
                                    converted_char = '#';
                                }
                            }
                            
                            break;

                        // Morse
                        default:
                            
                            // Controllo se è tra i valori
                            if (Object.values(group).includes(char)) {
                                converted_char = Object.entries(group).find(([k, v]) => v === char)?.[0];
                                break;
                            }
                            // Altrimenti segnalo l'errore
                            else {
                                converted_char = '#';
                            }

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
    toOctal(from) {
        return '';
    }

    // Testo semplice
    toText(from) {

        // Variabile che conterrà il testo semplice
        let simple_text;

        // Cerco in base a cosa voglio trovare
        switch (from) {

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
                //
                break;

            // Ottale
            case 'octal':
                //
                break;

            // Default (text)
            default:

                // Lascio il testo com'è
                simple_text = this.text;

                break;
        }

        return simple_text;
    }


    /*
        Ricerca
    */

    find(pattern) {

        //
    }
}