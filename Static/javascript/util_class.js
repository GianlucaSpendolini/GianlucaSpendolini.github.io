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

        // Testo dell'utente
        this.text = text;
        
    }

    /*
        Conversione
        - In base da e a cosa vuoi convertire
    */
    async convert(from, to) {

        // Richiamo il file JSON
        let response = await fetch(`${points_number(path)}Static/json/encoding-map.json`);

        // Prendo i dati
        let data = await response.json();
        data = data['encode'];

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

                            // Variabile per indicare il permesso di tradurre -> se da testo lo lascio sempre possibile
                            let permissionToTranslate = true;

                            // Se non viene dal testo -> converto in testo -> continuo con la conversione nell'altro codice
                            if (from !== 'text') {

                                // Al momento tolgo il permesso fino a quando non trovo il carattere
                                permissionToTranslate = false;
                                
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
                                
                                // Se il "to" è il morse -> devo rendere ogni carattere upper SE è stato trovato un valore
                                if (to === 'morse' && text_char) {
                                    text_char = text_char.toUpperCase();
                                }

                                // Assegno a char il valore del carattere SE trovato E SE è incluso nel gruppo di "TO"
                                if (Object.keys(group).includes(text_char)) {
                                    char = text_char;
                                    permissionToTranslate = true;
                                }
                            }
                            
                            // Venendo dal testo -> faccio una conversione semplice (in base alla chiave trovo il valore)
                            if (Object.keys(group).includes(char) && permissionToTranslate) {
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


    /*
        Formattazione corretta
        - Sostituisce eventuali caratteri speciali trovati con il corrispettivo 'normale'
    */
    async correctFormatting() {
        
        // Prendo i caratteri dal json
        let response = await fetch(`${points_number(path)}Static/json/encoding-map.json`);
        let data = await response.json();
        data = data['formatting'];

        // Passo gli elementi attraverso map
        this.text = this.text.split('').map(function(c) {

            // Se carattere appartiene ai caratteri speciali -> lo converto
            return Object.keys(data).includes(c) ? data[c] : c;

        }).join('');

        // Ritorno il testo eventualmente corretto
        return this

    }


    /*
        Ricerca
        - Cerca il pattern inserito nel testo specificato all'inizio e restituisce le corrispondenze
        - Se cerco per sostituire -> vado a sostituire
            - Se ho selezionato anche isRegex non c'è alcuna differenza
    */
    find(pattern, isRegex=false, toReplace=false, replacement=null) {

        // Se devo sostituire
        if (toReplace) {
            return this.text.replace(isRegex ? new RegExp(pattern, 'g') : pattern, replacement);
        }

        // Se cerco una RegEx
        if (isRegex) {
            return this.text.match(new RegExp(pattern, "g"));
        }

        // Cerco il pattern e restituisco l'array
        return this.text.match(pattern);

    }
}