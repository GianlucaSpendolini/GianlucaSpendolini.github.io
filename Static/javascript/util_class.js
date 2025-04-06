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

        // Tolgo eventuali spazi prima e dopo (se metto 'lettera ', se traduzione code-code, avrò '' come carattere da tradurre -> non trovato -> undefined)
        this.text = this.text.trim();

        // Se traduco in morse -> rendo upper tutti i caratteri
        if (to === 'morse') {
            this.text = this.text.toUpperCase();
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
                                        // PROVA
                                        converted_char = ['prova', this.charsFrom, char, Object.entries(otherGroup), Object.entries(otherGroup).find(([k, v]) => v === char)?.[0]];
                                        text_char = Object.entries(otherGroup).find(([k, v]) => v === char)?.[0];
                                        break;
                                    }
                                }
                                
                                // Se il "to" è il morse -> devo rendere ogni carattere
                                if (to === 'morse') {
                                    // PROVA
                                    converted_char.push(text_char);
                                    // text_char = text_char.toUpperCase();
                                }

                                // Assegno a char il valore del carattere trovato
                                char = text_char;
                            }

                            // Venendo dal testo -> faccio una conversione semplice (in base alla chiave trovo il valore)
                            if (Object.keys(group).includes(char)) {
                                // PROVA
                                converted_char.push(group[char]);
                                // converted_char = group[char];
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
                        // PROVA
                        converted_char.push('#');
                        // converted_char = '#';
                    }
                }
            }

            // Aggiungo l'elemento all'array
            converted.push(converted_char);
        });

        // // Ritorno l'array unito -> testo convertito
        // if (to === 'text') {
        //     // Se testo -> non devo aggiungere spazi altrimenti "inquino"/"altero" l'originale
        //     return converted.join('');
        // }
        // // Altrimenti
        // else {
        //     // Riporto caratteri a blocchi (se non metto spazi -> unisco -> non capibili) -> aggiungo lo spazio
        //     return converted.join(' ');
        // }
        return converted;
        
    }


    /*
        Ricerca
    */

    find(pattern) {

        //
    }
}