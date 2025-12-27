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
        Metodi che ritornano la classe in se' (vanno a migliorare qualcosa)
    */


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
        Metodi che ritornano altri elementi
    */


    /*
        Compara
        - Il testo in memoria con il testo passato come parametro
        - Restituisce differenze
    */
    compare(text) {

        /*
            Restituisce un array in cui, nella i-esima posizione, ci sarà
                - stringa
                    - se il valore vecchio/nuovo è lo stesso
                - array
                    - se il valore vecchio è diverso dal nuovo
                    - formato
                        "old" => 'valore',
                        "new" => 'valore'
        */

        // Rendo array
        let old_arr = this.text.split(' ');
        let new_arr = text.split(' ');

        // Variabile per capire se il testo vecchio sia più corto (o uguale) al nuovo (= serve per dire che solo in caso sia maggiore avrò che old sarà longer altrimenti è shorter)
        let is_old_less_eq = old_arr.length <= new_arr.length;

        // Variabili per gli array più corto e più lungo
        let shorter;
        let longer;

        // Assegno le variabili per l'array più corto e quello più lungo
        if (is_old_less_eq) {
            shorter = old_arr;
            longer = new_arr;
        } else {
            shorter = new_arr;
            longer = old_arr;
        }

        // Per semplicità -> prendo le lunghezze degli array
        let shorter_len = shorter.length;
        let longer_len = longer.length;

        // Array che conterrà l'array completo con le differenze
        let complete_array = Array();

        // Funzione per inserire gli elementi nell'array completo
        let insert_slices_to_complete_array = function(complete_array, is_old_less_eq, slice_shorter, slice_longer) {
            // Se almeno uno è array -> inserisco le differenze
            if ((slice_shorter != slice_longer) || ((slice_shorter === slice_longer) && (Array.isArray(slice_shorter) || Array.isArray(slice_longer)))){
                /*
                    Se l'array delle differenze è sottoforma di
                        - stringa -> se voglio mandarlo a schermo è più semplice (non devo controllare che sia array)
                            - più "lungo" da gestire? nelle 
                        - array -> posso gestire come voglio e poi raggrupparli in stringa
                            - per ora lascio perdere perchè è più complicato
                */
                
                // Valori delle differenze sottoforma di stringhe
                let old_value = is_old_less_eq ? (Array.isArray(slice_shorter) ? slice_shorter.join(' ') : slice_shorter) : (Array.isArray(slice_longer) ? slice_longer.join(' ') : slice_longer);
                let new_value = is_old_less_eq ? (Array.isArray(slice_longer) ? slice_longer.join(' ') : slice_longer) : (Array.isArray(slice_shorter) ? slice_shorter.join(' ') : slice_shorter);

                // // Valori delle differenze sottoforma di array (inserisco eventuali differenze come array o di testo in base a come vengono passati)
                // let old_value = is_old_less_eq ? slice_shorter : slice_longer;
                // let new_value = is_old_less_eq ? slice_longer : slice_shorter;

                complete_array.push({
                    "old" : old_value,
                    "new" : new_value
                });
            } else {
                // Se sono uguali inserisco l'elemento di shorter (indifferente rispetto a longer)
                complete_array.push(slice_shorter);
            }

            // Ritorno l'array con le aggiunte
            return complete_array;
        };

        /*
            Per contare il numero di eventuali elementi che non hanno trovato corrispondenza in short
                - se trovata (quindi > 0) -> da (indx-no_match) all'(indx-1)-esimo di shorter sostituiti da indx_longer a (indx-1) di longer
        */
        let no_match_shorter = 0;

        // Funzione che ritorna una sezione (anche un elemento) tra un punto di inizio a (punto di fine - 1)
        let process_no_match = function(arr, end_index, no_match_shorter, start_point=false, start_index=0) {
            // In caso ho un punto di inizio e la differenza tra inizio-fine è 1
            if (start_point && (end_index - start_index === 1)) {
                // Ritorno l'unico elemento che avrei
                return arr[start_index];
            }
            
            // Altrimenti ritorno la sezione tra un punto di inizio (calcolato se start_point = false) ed uno di fine
            return arr.slice((start_point ? start_index : end_index - no_match_shorter), (start_point ? (end_index - start_index) : no_match_shorter));
        };

        // Valore che verrà usato per l'iterazione di longer (per evitare di cominciare ogni iterazione dall'inizio)
        let longer_idx = 0;

        // Itero l'array più corto
        for (let shorter_idx=0; shorter_idx < shorter_len; shorter_idx++) {
            // Variabile per indicare se ho trovato corrispondenze (default false) -> serve quando non trovo corrispondenze e uno dei no_match_ è > 0
            let any_match = false;

            // Se sono uguali -> aggiungo la stringa all'array
            if (shorter[shorter_idx] === longer[longer_idx]) {
                // In caso ci siano iterazioni che non hanno avuto match
                if (no_match_shorter > 0) {
                    // Aggiungo l'array con le differenze (sottoforma di stringa)
                    complete_array = insert_slices_to_complete_array(
                        complete_array, 
                        is_old_less_eq, 
                        process_no_match(shorter, shorter_idx, no_match_shorter),
                        process_no_match(longer, shorter_idx, null, true, longer_idx)
                    );
                }

                // Aggiungo l'elemento della corrispondenza
                complete_array.push(shorter[shorter_idx]);
                
                // Resetto la variabile
                no_match_shorter = 0;
                // Indico che ho trovato una corrispondenza
                any_match = true;
            } else {

                // Se j===longer_idx-1 -> itero per vedere se trovo corrispondenze
                if (longer_idx === longer_len - 1) {
                    // Itero dall'elemento k=i+1 fino alla fine
                    for (let k=shorter_idx+1; k < shorter_len; k++) {
                        // Controllo se il k-elemento di shorter === (j-1)-esimo elemento di longer
                        if (longer[longer_idx] === shorter[k]) {
                            // Aggiungo l'array con le differenze
                            complete_array = insert_slices_to_complete_array(
                                complete_array,
                                is_old_less_eq,
                                k === shorter_idx + 1 ? (
                                    no_match_shorter === 0 ? shorter[shorter_idx] : process_no_match(shorter, k, no_match_shorter, true, shorter_idx)
                                    ) : process_no_match(shorter, k, no_match_shorter, true, shorter_idx),
                                null
                            );
                            
                            // Inserisco l'elemento uguale trovato
                            complete_array.push(shorter[k]);
                            
                            // Resetto la variabile
                            no_match_shorter = 0;
                            // Indico che ho trovato una corrispondenza
                            any_match = true;
                            // Modifico shorter_idx per saltare gli elementi già controllati (quello di longer lo lascio uguale siccome non ho estratto elementi)
                            shorter_idx = k;
                        }
                    }
                }

                // Itero dalla posizione j=longer_idx+1 gli elementi di longer (controllo eventuali corrispondenze in posizioni successive)
                for (let j=longer_idx+1; j < longer_len; j++) {
                    /*
                        Logica - itero sull'array più lungo -> controllo che j non sia >= shorter
                            - se lo è (sottoforma di array)
                                - array da i-esimo elemento di shorter inserito in "old"
                                - array da j-esimo elemento di longer inserito in "new"
                            - se non lo è -> cerco se il j-esimo elemento di longer corrisponde all'i-esimo elemento di shorter
                                - se corrisponde 
                                    - inserisco tanti null associati alle stringhe trovate prima della corrispondenza (j - i -> il +1 è già in j -> non possono essere uguali perchè === è falso)
                                    - inserisco la corrispondenza
                                - se non corrisponde
                                    - itero dal k=i+1-esimo elemento di shorter e lo confronto con il j-esimo elemento di longer (se j >= shorter -> k < shorter -> non entra)
                                    - se corrisponde
                                        - segno che i (k-i) elementi da i di shorter sono stati sostituiti dai (j-i) elementi da i di longer
                                            - il -1 non lo metto perchè lo slice prende fino a n-1?
                                        - aggiungo il k-esimo elemento di shorter e il j-esimo di longer
                    */
                                        
                    // Se il j-esimo elemento dell'array più lungo = i-esimo dell'array più corto -> inserisco
                    if (shorter[shorter_idx] === longer[j]) {
                        // Inserisco le differenze (per forza essendo che almeno in longer ci sono elementi aggiuntivi)
                        complete_array = insert_slices_to_complete_array(
                            complete_array, 
                            is_old_less_eq, 
                            no_match_shorter === 0 ? null : process_no_match(shorter, shorter_idx, no_match_shorter),
                            j === longer_idx + 1 ? longer[longer_idx] : process_no_match(longer, j, null, true, longer_idx)
                        );

                        // Aggiungo l'elemento della corrispondenza
                        complete_array.push(shorter[shorter_idx]);
                        
                        // Resetto la variabile
                        no_match_shorter = 0;
                        // Indico il nuovo valore dell'elemento longer_idx
                        longer_idx = j;
                        // Indico che ho trovato una corrispondenza
                        any_match = true;
                        
                        break;

                    } else {

                        // Controllo se il k-esimo elemento di shrter è presente nei successivi elementi di shorter
                        for (let k=shorter_idx+1; k < shorter_len; k++) {
                            // Controllo se il k-elemento di shorter === (j-1)-esimo elemento di longer
                            if ((j === longer_idx + 1) && (longer[longer_idx] === shorter[k])) {
                                // Aggiungo l'array con le differenze
                                complete_array = insert_slices_to_complete_array(
                                    complete_array,
                                    is_old_less_eq,
                                    k === shorter_idx + 1 ? (
                                        no_match_shorter === 0 ? shorter[shorter_idx] : process_no_match(shorter, k, no_match_shorter, true, shorter_idx)
                                        ) : process_no_match(shorter, k, no_match_shorter, true, shorter_idx),
                                    null
                                );
                                
                                // Inserisco l'elemento uguale trovato
                                complete_array.push(shorter[k]);
                                
                                // Resetto la variabile
                                no_match_shorter = 0;
                                // Indico che ho trovato una corrispondenza
                                any_match = true;
                                // Modifico shorter_idx per saltare gli elementi già controllati (quello di longer lo lascio uguale siccome non ho estratto elementi)
                                shorter_idx = k;

                                break;
                            }

                            // Se lo trovo -> inserisco l'array
                            if (longer[j] === shorter[k]) {
                                // Aggiungo l'array con le differenze
                                complete_array = insert_slices_to_complete_array(
                                    complete_array, 
                                    is_old_less_eq, 
                                    k === shorter_idx + 1 ? (
                                        no_match_shorter === 0 ? shorter[shorter_idx] : process_no_match(shorter, k, no_match_shorter, true, shorter_idx)
                                        ) : process_no_match(shorter, k, no_match_shorter, true, shorter_idx),
                                    j === longer_idx + 1 ? longer[longer_idx] : process_no_match(longer, j, null, true, longer_idx)
                                );
                                
                                // Inserisco l'elemento uguale trovato
                                complete_array.push(shorter[k]);
                                
                                // Resetto la variabile
                                no_match_shorter = 0;
                                // Indico che ho trovato una corrispondenza
                                any_match = true;
                                // Modifico i per saltare gli elementi già controllati
                                shorter_idx = k;
                                // Indico che nell'array longer sono arrivato al valore j e devo partire da j+1
                                longer_idx = j;

                                break;
                            }
                        }

                    }

                    // Se ho trovato corrispondenze -> fermo il ciclo per non iterare "a vuoto"
                    if (any_match) {
                        break;
                    }
                }
            }

            // Se sono all'ultimo elemento di shorter e ci sono elementi non corrispondenti -> li aggiungo
            if ((shorter_idx >= shorter_len - 1) || (longer_idx >= longer_len - 1)) {

                // Se ho trovato dei match e le iterazioni sono arrivate alla fine o oltre la (lunghezza - 1) -> interrompo
                if (any_match && ((shorter_idx >= shorter_len - 1) && (longer_idx >= longer_len - 1))) {
                    break;
                }

                // Se in generale ho che le iterazioni sono >= lunghezze -> blocco
                if ((shorter_idx >= shorter_len) && (longer_idx >= longer_len)) {
                    break;
                }

                // Se c'è stato un riscontro alla fine delle iterazioni (essendoci stato il riscontro NON devo tener conto di "no match shorter")
                if (any_match) {
                    complete_array = insert_slices_to_complete_array(
                        complete_array, 
                        is_old_less_eq, 
                        shorter_idx === shorter_len - 1 ? null : (
                            shorter_idx === shorter_len - 2 ? shorter[shorter_idx + 1] : shorter.slice(shorter_idx + 1)
                        ),
                        longer_idx === longer_len - 1 ? null : (
                            longer_idx === longer_len - 2 ? longer[longer_idx + 1] : longer.slice(longer_idx + 1)
                        )
                    );

                    break;
                }

                // Se uno o entrambi gli array è di lunghezza 1 E non sono state trovate corrispondenze (altrimenti inserisco più volte la corrispondenza)
                if (((shorter_len === 1) || (longer_len === 1)) && (!any_match)) {
                    // Aggiungo l'array con le differenze
                    complete_array = insert_slices_to_complete_array(
                        complete_array, 
                        is_old_less_eq, 
                        shorter_len === 1 ? shorter[shorter_idx] : shorter.slice(shorter_idx - no_match_shorter),
                        longer_len === 1 ? longer[longer_idx] : longer.slice(longer_idx)
                    );

                    break;
                }

                // Se l'iteratore di shorter e/o di longer non ha ancora finito O è arrivato all'ultimo elemento (quindi c'è ancora qualcosa da inserire)
                if ((shorter_idx <= shorter_len - 1) || (longer_idx <= longer_len - 1)) {
                    // Aggiungo l'array con le differenze
                    complete_array = insert_slices_to_complete_array(
                        complete_array, 
                        is_old_less_eq, 
                        shorter_idx === shorter_len - 1 ? (
                            no_match_shorter === 0 ? shorter[shorter_idx] : shorter.slice(shorter_idx - no_match_shorter)
                            ) : shorter.slice(shorter_idx - no_match_shorter),
                        longer_idx < longer_len - 1 ? longer.slice(longer_idx) : (
                            longer_idx > longer_len ? null : longer[longer_idx]
                        )
                    );
                }
                
                break;
            }

            // Se non sono state trovate corrispondenze
            if (!any_match) {
                no_match_shorter++;
            } else {
                // Se sono state trovate corrispondenze -> aumento index of longer per cercare dall'elemento successivo
                longer_idx += 1;
            }
        }

        // Ritorno l'array con le differenze
        return complete_array;
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

        // Se traduco da esadecimale O in morse -> rendo upper tutti i caratteri
        if (from === 'hexadecimal' || to === 'morse') {
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
            // Se to è esadecimale -> rendo minuscole le lettere
            if (to === 'hexadecimal') {
                converted = converted.map(e => {
                    return e.toLowerCase();
                });
            }
            // Riporto caratteri a blocchi (se non metto spazi -> unisco -> non capibili) -> aggiungo lo spazio
            return converted.join(' ');
        }
        
    }


    /*
        Ricerca
        - Cerca il pattern inserito nel testo specificato all'inizio e restituisce le corrispondenze
        - Se cerco per sostituire -> vado a sostituire
            - Se ho selezionato anche isRegex non c'è alcuna differenza
    */
    findReplace(pattern, isGlobal=false, toReplace={'?': false}) {

        // Se devo sostituire
        if (toReplace['?'] && this.findReplace(pattern, isGlobal)) {
            return this.text.replace(isGlobal ? new RegExp(pattern, 'g') : pattern, toReplace['replacement']);
        }

        // Se cerco una RegEx
        if (isGlobal) {
            return this.text.match(new RegExp(pattern, "g"));
        }

        // Cerco il pattern e restituisco l'array
        return this.text.match(pattern);

    }
}