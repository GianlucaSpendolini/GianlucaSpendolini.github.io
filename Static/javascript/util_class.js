/* 
    CLASSI UTILI
        - UserText
            - Classe per la manipolazione del testo inserito dall'utente
            
*/

import { 
    points_number 
} from "./util_function.js";

import { 
    path 
} from "./util_variable.js";


// Classe per la manipolazione del testo inserito dall'utente
export class UserText {

    // Prendo le variabili
    constructor(text) {

        // Testo da convertire
        this.text = text;

        // Variabile per la lista di caratteri
        // this.chars;
    }

    /*
        Conversione
    */
    async convert(from, to) {

        // Richiamo il file JSON
        let response = await fetch(`${points_number(path)}Static/json/encoding-map.json`);

        // Prendo i dati
        let data = await response.json();

        // Prendo i dati che mi servono
        /*
            Di norma in questa funzione viene passato il "in cosa" si vuole tradurre.
            Se si vuole tradurre qualcosa in testo bisogna passare il "da cosa" si vuole tradurre:
                - Avendo la funzione ribaltata -> vado a vedere i valori per capire la chiave (il testo) associato
        */
        if (to === 'text') {
            this.charsTo = data[from];
        }
        else {
            this.charsTo = data[to];
        }
        this.prova = ['prova', data, to, this.charsTo];

        /*
            Modificare il metodo per fare in modo di usare solo il metodo convert per convertire in base ad input ed output
            - in caso di due codici diversi
                - codice di input -> prendo il relativo insieme 
                - traduco in testo normale
                    - traduzione "inversa"
                - codice di output -> prendo il relativo insieme
                - traduco il testo normale tradotto nel codice di output
                    - traduzione "normale"
            - in caso di testo - codice e viceversa
                - prendo solo l'insieme di caratteri relativo al codice NON di testo
                - traduco "normale"/"inverso" -> testo a codice/codice a testo
        */

                
        // Testo convertito
        let converted = [];
        let splitted_text;

        // Divido l'input in base a cosa ho ricevuto
        switch (from) {

            // Se testo -> vado a prendere singoli caratteri (spazi inclusi)
            case 'text':
                splitted_text = this.text.split('');
                break;

            // Altrimenti -> prendo solo i blocchi che identificano i caratteri
            default:
                splitted_text = this.text.split(' ');
                break;

        }

        // Itero la lista dei singoli caratteri
        splitted_text.forEach( char => {

            // Prendo il carattere
            let converted_char = char;

            // Se non è un 'a capo' lo converto
            if (char !== '\n') {

                // Variabile per capire se ho trovato il carattere tra quelli elencati o è estraneo dagli elenchi
                let found = false;
                
                // Itero ogni oggetto cercando di trovare il carattere
                for (let group of this.charsTo) {

                    switch (to) {

                        // Testo normale -> conversione inversa (prendo le chiavi in base al valore trovato)
                        case 'text':
                            
                            // Controllo se è tra i valori
                            if (Object.values(group).includes(char)) {
                                converted_char = Object.entries(group).find(([k, v]) => v === char)?.[0];
                                found = true;
                            }
                            
                            break;

                        // Se voglio il codice
                        default:

                            // Se non viene dal testo -> converto in testo -> continuo con la conversione nell'altro codice
                            if (from !== 'text') {
                                // Prendo i dati che mi servono
                                this.charsFrom = data[from];

                                // Variabile d'appoggio per il carattere convertito in testo
                                let text_char;

                                //Prendo quello da cui proviene e faccio una conversione inversa
                                for (let otherGroup of this.charsFrom) {

                                    // Traduco in testo -> conversione inversa
                                    if (Object.values(otherGroup).includes(char)) {
                                        text_char = Object.entries(otherGroup).find(([k, v]) => v === char)?.[0];
                                        break;
                                    }
                                }
                                
                                // Se il "to" è il morse -> devo rendere ogni carattere
                                if (to === 'morse') {
                                    text_char = text_char.toUpperCase();
                                }

                                // Da testo a codice -> conversione semplice

                                // Assegno a char il valore del carattere trovato
                                char = text_char;
                            }
                            // // Altrimenti
                            // else {
                            //     // Controllo se è tra le chiavi
                            //     if (Object.keys(group).includes(char)) {
                            //         converted_char = group[char];
                            //         found = true;
                            //     }
                            // }

                            // Venendo dal testo -> faccio una conversione semplice (in base alla chiave trovo il valore)
                            if (Object.keys(group).includes(char)) {
                                converted_char = group[char];
                                found = true;
                            }

                            break;

                    }

                    // Se è stato trovato il carattere -> esco dal ciclo
                    if (found) {
                        break;
                    }
                    // Altrimenti assegno il valore non trovato
                    else {
                        converted_char = '#';
                    }
                }
            }

            // Aggiungo l'elemento all'array
            converted.push(converted_char);
        });

        // Ritorno l'array unito -> testo convertito
        if (to === 'text') {
            // Se testo -> non devo aggiungere spazi altrimenti "inquino"/"altero" l'originale
            return converted.join('');
        }
        // Altrimenti
        else {
            // Riporto caratteri a blocchi (se non metto spazi -> unisco -> non capibili) -> aggiungo lo spazio
            return converted.join(' ');
        }
        
    }


    // async convert(to) {
    //     /*
    //         Di norma in questa funzione viene passato il "in cosa" si vuole tradurre.
    //         Se si vuole tradurre qualcosa in testo bisogna passare il "da cosa" si vuole tradurre:
    //             - Avendo la funzione ribaltata -> vado a vedere i valori per capire la chiave (il testo) associato
    //     */

    //     // Richiamo il file JSON
    //     let response = await fetch(`${points_number(path)}Static/json/encoding-map.json`);

    //     // Prendo i dati
    //     let data = await response.json();

    //     // Prendo i dati che mi servono
    //     this.chars = data[to];
    //     this.prova = ['prova', data, to, this.chars];

    //     /*
    //         Modificare il metodo per fare in modo di usare solo il metodo convert per convertire in base ad input ed output
    //         - in caso di due codici diversi
    //             - codice di input -> prendo il relativo insieme 
    //             - traduco in testo normale
    //                 - traduzione "inversa"
    //             - codice di output -> prendo il relativo insieme
    //             - traduco il testo normale tradotto nel codice di output
    //                 - traduzione "normale"
    //         - in caso di testo - codice e viceversa
    //             - prendo solo l'insieme di caratteri relativo al codice NON di testo
    //             - traduco "normale"/"inverso" -> testo a codice/codice a testo
    //     */

    //     return this;
        
    // }

    // // Binario
    // toBinary(from) {

    //     // Testo convertito
    //     let binary = [];

    //     // Ritorno l'array unito -> testo convertito
    //     return binary.join(' ');
    // }

    // // Esadecimale
    // toHexa(from) {

    //     // Testo convertito
    //     let hexa = [];

    //     // Ritorno l'array unito -> testo convertito
    //     return hexa.join(' ');
    // }

    // // Morse
    // toMorse(from) {

    //     // Testo convertito
    //     let morse = [];
    //     // let mmt = [];

    //     // Converto ogni carattere
    //     this.text.toUpperCase().split('').forEach(char => {

    //         // Prendo il carattere
    //         let converted_char = char;
    //         // let mmmt;

    //         // Se non è un 'a capo' lo converto
    //         if (char !== '\n') {

    //             // Variabile per capire se ho trovato il carattere tra quelli elencati o è estraneo dagli elenchi
    //             let found = false;
                
    //             // Itero ogni oggetto cercando di trovare il carattere
    //             for (let group of this.chars) {

    //                 switch (from) {

    //                     // Testo normale
    //                     case 'text':

    //                         // Controllo se è tra le chiavi
    //                         if (Object.keys(group).includes(char)) {
    //                             converted_char = group[char];
    //                             found = true;
    //                         }
    //                         // Altrimenti segnalo l'errore
    //                         else {
    //                             converted_char = '#';
    //                         }
                            
    //                         break;

    //                     // Morse
    //                     default:
                            
    //                         // Controllo se è tra i valori
    //                         if (Object.values(group).includes(char)) {
    //                             converted_char = Object.entries(group).find(([k, v]) => v === char)?.[0];
    //                             found = true;
    //                         }
    //                         // Altrimenti segnalo l'errore
    //                         else {
    //                             converted_char = '#';
    //                         }

    //                         break;

    //                 }

    //                 if (found) {
    //                     break;
    //                 }
    //             }
    //         }

    //         // Aggiungo l'elemento all'array
    //         morse.push(converted_char);
    //         // mmt.push(mmmt);
    //     });

    //     // Ritorno l'array unito -> testo convertito
    //     return morse.join(' ');
    //     // return mmt;
    // }

    // // Ottale
    // toOctal(from) {

    //     // Testo convertito
    //     let octal = [];

    //     // Ritorno l'array unito -> testo convertito
    //     return octal.join(' ');
    // }

    // // Testo semplice
    // toText(from) {

    //     // Testo convertito
    //     let simple_text = [];
    //     // let mmt = [];

    //     // Converto ogni carattere
    //     this.text.split(' ').forEach(char => {

    //         // Prendo il carattere
    //         let converted_char = char;

    //         // Se non è un 'a capo' lo converto
    //         if (char !== '\n') {

    //             // Variabile per capire se ho trovato il carattere tra quelli elencati o è estraneo dagli elenchi
    //             let found = false;
    //             // let mmmt;
                
    //             // Itero ogni oggetto cercando di trovare il carattere
    //             for (let group of this.chars) {

    //                 switch (from) {

    //                     // Binario
    //                     case 'binary':
    //                         //
    //                         break;
            
    //                     // Esadecimale
    //                     case 'hexadecimal':
    //                         //
    //                         break;
            
    //                     // Morse
    //                     case 'morse':
                                        
    //                         // Controllo se è tra i valori
    //                         if (Object.values(group).includes(char)) {
    //                             converted_char = Object.entries(group).find(([k, v]) => v === char)?.[0];
    //                             found = true;
    //                         }
    //                         // Altrimenti segnalo l'errore
    //                         else {
    //                             converted_char = '#';
    //                         }
            
    //                         break;
            
    //                     // Ottale
    //                     case 'octal':
    //                         //
    //                         break;
            
    //                     // Default (text)
    //                     default:
            
    //                         // Lascio il testo com'è
    //                         simple_text.push(this.text);
            
    //                         break;
    //                 }
    //                 // mmmt = [this.from, Object.values(group).includes(char), Object.values(group), group, converted_char, Object.entries(group).find(([k, v]) => v === char)?.[0]];
    //                 // mmt.push(mmmt);

    //                 if (found) {
    //                     break;
    //                 }
    //             }
    //         }

    //         // Aggiungo l'elemento all'array
    //         simple_text.push(converted_char);
    //     });

    //     // Ritorno l'array unito -> testo convertito
    //     return simple_text.join('');
    //     // return mmt;
    // }


    /*
        Ricerca
    */

    find(pattern) {

        //
    }
}