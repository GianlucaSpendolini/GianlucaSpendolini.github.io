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
        this.converted = this.text.toUpperCase();

        return this;
        
    }

    // Binario
    toBinary() {
        return '';
    }

    // Esadecimale
    toHexa() {
        return '';
    }

    // Morse
    toMorse() {

        // Testo convertito
        let converted = [];

        let chars = [

            // Lettere
            {
                'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.',
                'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.',
                'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-',
                'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..'
            },
            // {
            //     normal : {
            //         'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.',
            //         'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.',
            //         'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-',
            //         'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..'
            //     },
            //     morse : {
            //         '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G',
            //         '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N',
            //         '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U',
            //         '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', '--..': 'Z'
            //     }
            // },

            // Numeri
            {
                '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
                '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
            },
            // {
            //     normal : {
            //         '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
            //         '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
            //     },
            //     morse : {
            //         '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
            //         '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9'
            //     }
            // },

            // Simboli
            {
                '.': '.-.-.-', ',': '--..--', ':': '---...', '?': '..--..', '=': '-...-', '-': '-....-', '(': '-.--.',
                ')': '-.--.-', '\"': '.-..-.', '\'': '.----.', '/': '-..-.', '_': '..--.-', '@': '.--.-.', '!': '-.-.--'
            }
            // {
            //     normal : {
            //         '.': '.-.-.-', ',': '--..--', ':': '---...', '?': '..--..', '=': '-...-', '-': '-....-', '(': '-.--.',
            //         ')': '-.--.-', '\"': '.-..-.', '\'': '.----.', '/': '-..-.', '_': '..--.-', '@': '.--.-.', '!': '-.-.--'
            //     },
            //     morse : {
            //         '.-.-.-': '.', '--..--': ',', '---...': ':', '..--..': '?', '-...-': '=', '-....-': '-', '-.--.': '(',
            //         '-.--.-': ')', '.-..-.': '\"', '.----.': '\'', '-..-.': '/', '..--.-': '_', '.--.-.': '@', '-.-.--': '!'
            //     }
            // }
        ]

        // Converto ogni carattere
        this.text.split('').forEach(char => {

            // Prendo il carattere
            let converted_char = char;

            // Se non è un 'a capo' lo converto
            if (char !== '\n') {
                
                // Itero ogni oggetto cercando di trovare il carattere
                for (o of chars) {

                    // Controllo se è tra le chiavi
                    if (Object.keys(o).includes(char)) {
                        converted_char = o.char;
                    }
                    // Controllo se è tra i valori
                    else if (Object.values(o).includes(char)) {
                        converted_char = Object.entries(e).find(([k, v]) => v === char)?.[0];
                    }
                    // Altrimenti segnalo l'errore
                    else {
                        converted_char = 'err';
                    }
                }

            }

            // Aggiungo l'elemento all'array
            converted.push(converted_char);
        });

        // Ritorno l'array unito -> testo convertito
        return converted.join('');
    }

    // Ottale
    octal() {
        return '';
    }


    /*
        Ricerca
    */

    find(pattern) {

        //
    }
}