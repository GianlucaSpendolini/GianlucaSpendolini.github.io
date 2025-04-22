/* 
    FUNZIONI UTILI 
        - add_css_js
            - Funzione per aggiungere i file js e css
        - advertiment_capslock
            - Funzione per avvisare se capslock è attivo
        - advertiment_numlock
            - Funzione per avvisare se blocco numerico non è attivo
        - check_anylock
            - Funzione contenente tutti gli eventi per controllare se attivi alcuni blocchi
        - clickable_path
            - Funzione per creare un percorso cliccabile da inserire nell'apposita sezione
        - insert_examples
            - Funzione per inserire esempi (di codice o di altro)
        - insert_in_head
            - Funzione per inserire i meta-tag
        - insert_my_json
            - Inserire i dati salvati nei file json che creo
        - json_to_element
            - Funzione ricorsiva per inserire in autormatico gli elementi della tabella nel giusto formato
        - movement_into_pages
            - Funzione per capire se voglio la lista delle pagine (per avere un minimo di percorso)
        - points_number
            - Creo un array di 'punti' per tornare sempre alla home (./../etc)
        - show_details
            - Mostra i dettagli di un tag details in una sezione apposita sotto la lista
        - start_end_table
            - Aggiungo dei bottoni prima e dopo per andare in cima o in fondo ad una tabella
        - svg
            - Funzione per capire il mese e mettere l'SVG giusto
        - togglePasswordVisibility
            - Settare icona per vedere o meno password
        - wishes_function
            - Inserisce gli auguri in una sezione apposita
*/


import {
    date, 
    path
} from "./util_variable.js";


// Funzione per aggiungere i file js e css
export function add_css_js(points_path) {
    /* File generali per ogni pagina */

    // Lista generale 
    var lista_generale = {
        css: [
            `${points_path}Static/css/code.css`,
            `${points_path}Static/css/image.css`,
            `${points_path}Static/css/media.css`,
            `${points_path}Static/css/style.css`,
            `${points_path}Static/css/table.css`
        ],
        js: [
            ``
        ]
    };

    // Itero la lista generale contenente CSS e JS
    for (var type in lista_generale) {

        // CSS
        if (type === 'css') {

            // Seleziono l'head
            let head = document.querySelector('head');

            // Itero su ogni componente da aggiungere
            for (const path of lista_generale[type]) {
                // Creo l'elemento
                var css = document.createElement('link');
                // href
                css.href = path;
                // rel
                css.rel = 'stylesheet';
                // type
                css.type = 'text/css';
                // media
                css.media = 'screen';
                // Aggiungo l'elemento all'head
                head.appendChild(css);
            }
        }

        // JavaScript
        else if (type === 'js') {

            // Seleziono il corpo 
            let body = document.querySelector('body');

            // Itero su ogni componente da aggiungere
            for (const path of lista_generale[type]) {
                // Creo l'elemento
                var js = document.createElement('script');
                // src
                js.src = path;
                // type
                js.type = 'module';
                // media
                js.media = 'screen';
                // Aggiungo l'elemento al body
                body.appendChild(js);
            }
        }
    };
}


// Funzione per avvisare se capslock è attivo
export function advertiment_capslock(event) {
                
    // Dove inserire il messaggio
    let container = document.getElementById('warning');
    
    if (event.getModifierState('CapsLock')) {
        if (!document.querySelector('span#caps-lock')) {
            // Creo il messaggio
            let span = document.createElement('span');
            span.className = 'warning';
            span.id = 'caps-lock';
            span.innerText = 'Attenzione! Blocco maiuscole ATTIVO!';
    
            container.appendChild(span);
        }
    
        // Se il container è nascosto -> lo mostro
        if (container.style.display === 'none') {
            container.style.display = 'block';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
        }
    }
    else {
        // Provo a vedere se avevo inserito l'elemento
        let span = document.querySelector('span#caps-lock');
        if (span) {
            container.removeChild(span);
        }

        // Se il container è vuoto -> lo nascondo
        if (container.innerHTML === '') {
            container.style.display = 'none';
        }
    }
}


// Funzione per avvisare se blocco numerico non è attivo
export function advertiment_numlock(event) {
                
    // Dove inserire il messaggio
    let container = document.getElementById('warning');
    
    if (!event.getModifierState('NumLock')) {
        if (!document.querySelector('span#num-lock')) {
            // Creo il messaggio
            let span = document.createElement('span');
            span.className = 'warning';
            span.id = 'num-lock';
            span.innerText = 'Attenzione! Blocco numerico NON ATTIVO!';
            
            container.appendChild(span);
        }

        // Se il container è nascosto -> lo mostro
        if (container.style.display === 'none') {
            container.style.display = 'block';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
        }
    }
    else {
        let span = document.querySelector('span#num-lock');
        if (span) {
            container.removeChild(span);
        }

        // Se il container è vuoto -> lo nascondo
        if (container.innerHTML === '') {
            container.style.display = 'none';
        }
    }
}


// Funzione contenente eventi per controllare se qualche blocco è attivo
export function checkAnyState(passwordField) {

    // Controllo se il campo password è passato come stringa
    if (typeof passwordField === 'string') {
        // Seleziono campo password
        passwordField = document.getElementById('passwordField');
    }
    
    // Eventi
    passwordField.addEventListener('click', event => {
        advertiment_capslock(event);
        advertiment_numlock(event);
    });
    passwordField.addEventListener('keydown', event => {
        advertiment_capslock(event);
        advertiment_numlock(event);
    });
    passwordField.addEventListener('keyup', event => {
        advertiment_capslock(event);
        advertiment_numlock(event);
    });
    document.addEventListener('mousemove', event => {
        advertiment_capslock(event);
        advertiment_numlock(event);
    });
}


// Funzione per creare un percorso cliccabile da inserire nell'apposita sezione
export function clickable_path(path) {

    // Prendo gli elementi del percorso
    let path_elements = path.split('/');

    // Variabile per capire se sono nell'index di una directory (URL finisce con '')
    let is_index = false;

    // Tolgo il primo e gli ultimi due elementi (non ha senso voler tornare sulla stessa pagina in cui si è)
    path_elements.shift();
    // Tolgo l'ultimo ed il penultimo solo se sono nella index della sezione
    if (path_elements[path_elements.length - 1] === '') {
        path_elements.pop();
        // Aggiorno la variabile se mi trovo in un index di una directory
        is_index = true;
    }
    path_elements.pop();

    // Variabile per contare di quanto devo tornare indietro (+ 1 per mettere dir prima se non sono in index e + 1 per inserire riferimento  pagina stessa -> commenta ultimo pop)
    let count = is_index ? path_elements.length : path_elements.length - 1;

    // Creo la variabile da restituire
    let path_to_move_into_pages = [];

    // Itero su ogni componente
    for (let e of path_elements) {
        
        // Creo l'array al quale mettero' eventuali puntini doppi
        let rif = './';
    
        // Itero per vedere se e quanti puntini devo aggiungere 
        for (let i = 0; i < count; i++) {
            rif += '../';
        }

        // Creo l'elemento in cui inserire il riferimento
        let a = document.createElement('a');

        // Aggiungo il nome e l'attributo di riferimento
        a.innerHTML = e;
        a.href = rif; //points_number(elements_list_copy.join('/'));

        // Inserisco l'elemento alla lista
        path_to_move_into_pages.push(a);

        // // Elimino il secondo elemento della lista 
        // delete elements_list_copy[1];

        // Diminuisco il conteggio
        count -= 1;
    }

    // Ritorno l'array
    return path_to_move_into_pages;
}


// Funzione per inserire esempi (di codice o di altro)
export async function insert_examples(reason, script_name) {
    
    // Controllo il motivo
    switch (reason) {

        // Code
        case 'code':

            // Prendo i dati dal JSON
            let response = await fetch(`${points_number(path)}Static/json/descriptions.json`);
            let data = await response.json();
            let page_ref = data['scripts'][script_name];
            
            // Itero su ogni id che trovo (riferiti ai div in cui devo inserire i dati)
            Object.keys(page_ref).forEach( id_ref => {

                // Prendo il div di riferimento
                let div_ref = document.getElementById(id_ref);

                // Prendo le descrizioni, creo l'elenco e lo appendo all'elemento
                div_ref.append('Funzionamento:');
                div_ref.appendChild(json_to_element('ul', page_ref[id_ref]['description']))

                // Itero su ogni esempio da inserire
                page_ref[id_ref]['to insert'].forEach( exmpl => {

                    // Creo il div nel quale inserire l'esempio ed il codice associato (con gli stili)
                    let div = document.createElement('div');
                    div.style.borderStyle = 'solid';
                    div.style.borderColor = 'black';
                    div.style.padding = '10px';
    
                    // Creo il titolo della sezione e lo inserisco nel div
                    let h3 = document.createElement('h3');
                    h3.innerText = 'Esempio pratico + codice';
                    div.appendChild(h3);
    
                    // Creo il div dell'esempio e aggiungo gli elementi
                    let example_div = document.createElement('div');
                    example_div.innerHTML = exmpl.HTML ? exmpl['HTML'].join('\n') : '<div align="center">Non è presente alcun esempio pratico</div>';
    
                    // Appendo il div di esempio
                    div.appendChild(example_div);
                    
                    // Creo la variabile per i dettagli e aggiungo le caratteristiche
                    let details = document.createElement('details');
                    details.style.paddingTop = '10px';
    
                    // Aggiungo del codice HTML
                    details.innerHTML = `
                        <summary>Codice di esempio</summary>
                        <div>
                            <code></code>
                        </div>
                    `;
    
                    // Aggiungo il codice
                    details.querySelector('code').innerHTML = exmpl['example'].join('\n');//.replaceAll(/\n( {4}|\t){6}/g, '\n');
                    details.querySelector('code').style.whiteSpace = 'pre-wrap';
    
                    // Aggiungo i dettagli al div
                    div.appendChild(details);
    
                    // Inserisco i dettagli nel div
                    div_ref.append(div);
                    
                    // Eseguo il codice javascript
                    (new Function(exmpl.JavaScript ? exmpl['JavaScript'].join('\n') : '/* Non ci sono codici di esempio da eseguire */'))();

                });

            });

            break;

        // Default
        default:
            break;

     }
}


// Funzione per inserire i meta-tag
export function insert_in_head(meta_tags) {
    // Inserisco i meta-tag
    document.querySelector('head title').insertAdjacentHTML('beforebegin', meta_tags);
}


// Funzione per inserire dei contenuti dei miei file JSON in una determinata sezione
export async function insert_my_json(file_description, points) {

    // Variabile per eventuali specifiche chiavi da prendere dentro quella parte del JSON (k: {'k': v})
    let specific_description;

    if ([
        'scripts'
    ].includes(file_description.split(' ')[0])) {
        // Divido la stringa in un array (per prendere il primo elemento)
        let splitted = file_description.split(' ');
        // Assegno la sezione in cui voglio andare
        file_description = splitted[0];
        // Elimino file_description dall'array
        delete splitted[0];
        // Unisco eliminando eventuali spazi bianchi
        specific_description = splitted.join(' ').trim();
    }

    switch (file_description) {

        // /about
        case 'about':

            fetch(`${points}Static/json/progress.json`)
            .then(response => response.json())
            .then(data => {
                //
                // console.log("prova invio:, ", data);

                // Prendo i progetti in cui ho usato i linguaggi
                let projects = data['languages'];

                // Prendo i frameworks
                let frameworks = data['frameworks'];

                // Prendo il totale della mia esperienza
                let total_experience = Object.keys(projects).length * 100;

                // Creo una variabile per contenere ogni linguaggio inserito
                let languages = {};

                // Itero su ogni progetto
                for (let [k, v] of Object.entries(projects)) {

                    // Per ogni linguaggio inserito -> associo la %
                    for (let [language, percentage] of Object.entries(v)) {

                        // Se esisteva nell'oggetto -> prendo il numero e lo sommo con quello trovato ora
                        if (Object.keys(languages).includes(language)) {
                            languages[language] += percentage;
                        }

                        // Altrimenti aggiungo questo valore
                        else {
                            languages[language] = percentage;
                        }

                    }
                }

                // Prendo come riferimento il container
                let details_container = document.querySelector('.details-container');

                // Itero ogni linguaggio
                for (let [language, percentage] of Object.entries(languages)) {

                    // Creo il dettaglio 
                    let detail = document.createElement('details');

                    // Creo il sommario
                    let summary = document.createElement('summary');
                    summary.innerHTML = `
                        <label for="${language}">${language}</label>
                        <meter id="${language}" max="${total_experience}" min="0" value="${percentage}"></meter>
                    `;

                    // Creo il paragrafo per contenere il contenuto
                    let p = document.createElement('p');
                    p.style.color = 'black';
                    p.style.padding = '0px 10px';
                    // Se esisteva nell'oggetto -> aggiungo i frameworks per quel linguaggio
                    if (Object.keys(frameworks).includes(language)) {
                        p.appendChild(json_to_element('ul', frameworks[language]));
                    }
                    // Altrimenti avviso che non ci sono frameworks per quel linguaggio
                    else {
                        p.innerText = 'Non sono presenti framework per questo linguaggio.';
                    }

                    // Aggiungo i figli al tag details
                    detail.appendChild(summary);
                    detail.appendChild(p);

                    // Aggiungo il detail al container
                    details_container.appendChild(detail);
                }

                // Aggiungo l'evento per vedere un dettaglio alla volta
                show_details(details_container);
            });

            break;

        // /changes/changes_table (in caso voglio inserire i dati nella tabella delle modifiche)
        case 'changes table':
            fetch(`${points}Static/json/changes_table_elements.json`)
            .then(response => response.json())
            .then(data=> {
                // Corpo della tabella da riempire
                const tBody = document.querySelector('tbody');

                // Tolgo l'ultimo elemento dell'array (lo "scheletro" di ogni riga della tabella)
                data.pop();

                data.forEach(element => {

                    // Creo la riga 
                    const tr = document.createElement('tr');

                    // Creo la casella per la data
                    let td_data = document.createElement('td');
                    td_data.className = 'tData';
                    td_data.innerHTML = element.tData;
                    tr.appendChild(td_data);

                    // Creo la casella per la descrizione
                    let td_descrizione = document.createElement('td');
                    td_descrizione.className = 'tDescrizione';
                    for (let [k, v] of Object.entries(element.tDescrizione)) {

                        // Se non ho il valore, inserisco quella parte
                        if (v) {
                            // Aggiungo il "titolo" dell'elenco
                            td_descrizione.append(k);
            
                            // Creo la lista di dettagli da inserire
                            const ul = json_to_element('ul', v);
            
                            // Aggiungo la lista
                            td_descrizione.appendChild(ul);
            
                            // Aggiungo uno spazio
                            td_descrizione.append('\n');
                        }
                    }

                    // Creo la casella per commenti aggiuntivi
                    let td_aggiunte = document.createElement('td');
                    td_aggiunte.className = 'tAggiunte';
                    // Controllo se c'è qualcosa
                    if (element.tAggiunte) {

                        // Prendo il contenuto
                        const tAggiunte = element.tAggiunte;

                        // Controllo se è una stringa
                        if (typeof tAggiunte === 'string') {
                            td_aggiunte.innerHTML = tAggiunte;
                        }
                        // Altrimenti eseguo lo stesso procedimento usato per gli elenchi
                        else {

                            // Controllo se la componente è un array
                            if (Array.isArray(tAggiunte)) {
                                // Iterare su ogni componente
                                tAggiunte.forEach(e => {
                                    // Controllo se l'elemento è una stringa
                                    if (typeof e === 'string'){
                                        // Aggiungo normalmente
                                        td_aggiunte.append(e);
                    
                                        // Aggiungo uno spazio
                                        td_aggiunte.appendChild(document.createElement('br'));
                                    }
                                    // Altrimenti lo aggiungo mandandolo in pasto alla funzione
                                    else {
                                        // Itero ogni componente
                                        for (let [k, v] of Object.entries(e)) {
        
                                            // Aggiungo la chiave
                                            td_aggiunte.append(k);
        
                                            // Aggiungo la lista che ne esce
                                            td_aggiunte.appendChild(json_to_element('ul', v));
                            
                                            // Aggiungo uno spazio
                                            td_aggiunte.append('\n');
                                        }
                    
                                        // Aggiungo uno spazio
                                        td_aggiunte.append('\n');
                                    }
                                });
                            }
                            else {
                                // Itero ogni componente
                                for (let [k, v] of Object.entries(tAggiunte)) {

                                    // Aggiungo la chiave
                                    td_aggiunte.append(k);

                                    // Aggiungo la lista che ne esce
                                    td_aggiunte.appendChild(json_to_element('ul', v));
                    
                                    // Aggiungo uno spazio
                                    td_aggiunte.append('\n');
                                }
                            }
                        }
                    }
                    // Altrimenti inserisco, in grassetto, che non c'è nulla
                    else {
                        td_aggiunte.innerHTML = '<b>Niente da aggiungere</b>';
                    }

                    // Aggiungo i dati alla riga
                    tr.appendChild(td_data);
                    tr.appendChild(td_descrizione);
                    tr.appendChild(td_aggiunte);

                    // Aggiungo la riga alla tabella
                    tBody.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Errore nel caricamento del file JSON:', error)
            });

            break;

        default:
            // Non faccio nulla
            break;
    }
}


// Funzione ricorsiva per inserire in autormatico gli elementi della tabella nel giusto formato
export function json_to_element(element, json_part) {

    // Se l'elemento è una stringa -> ritorno direttamente la stringa
    if (typeof json_part === 'string') {
        return json_part;
    }

    // Altrimenti, creo la variabile nella quale inserire l'elemento definitivo...
    let element_to_return = null;

    // ...e controllo che elemento voglio
    switch (element) {

        // caso 'ul'
        case 'ul':
            // Creo una variabile per l'elenco
            let ul = document.createElement('ul');

            // Se l'elemento è un array -> voglio l'elenco puntato (fornisco una serie di punti)
            if (Array.isArray(json_part)) {
                // Per ogni elemento -> appendo ciò che ritorna dalla funzione (perchè ogni elemento della lista)
                json_part.forEach(j => {

                    // Prendo ciò che mi ritorna la funzione
                    let j_to_ul = json_to_element('ul', j);

                    // Se stringa -> inserisco la stringa e basta
                    if (typeof j_to_ul === 'string' || (j_to_ul && j_to_ul.firstChild && j_to_ul.firstChild.nodeType === Node.TEXT_NODE && j_to_ul.firstChild.nodeValue.trim() !== '')) {
                        
                        // Creo la linea
                        let li = document.createElement('li');

                        // Aggiungo ciò che ritorna dalla funzione alla linea
                        li.append(j_to_ul);          

                        // Ogni elemento lo aggiungo come punto della lista
                        ul.appendChild(li);
                    }
                    // Altrimenti -> itero su ogni elemento e lo inserisco
                    else {

                        // Per ogni figlio dell'elemento -> lo aggiungo alla lista ul
                        while (j_to_ul.firstChild) {
                            ul.append(j_to_ul.firstChild);
                        }
                    }
                });
            }
            // Altrimenti voglio che da quel momento si inserisca un sottoinsieme (sotto la 'chiave' voglio il 'valore')
            else {
                // Itero su ogni coppia chiave:valore
                for (let [k, v] of Object.entries(json_part)) {
                    
                    // Creo la linea
                    let li = document.createElement('li');

                    // Aggiungo la chiave e poi il contenuto che mi ritorna
                    li.append(k);

                    // Se è una stringa -> lo faccio diventare array
                    if (typeof v === 'string') {
                        li.append(json_to_element('ul', [v]));
                    }
                    // Altrimenti continuo come prima
                    else {
                        li.append(json_to_element('ul', v));
                    }

                    // Aggiungo l'elemento alla lista
                    ul.appendChild(li);
                }
            }

            // Assegno l'elemento
            element_to_return = ul;

            break;

        // Caso generico
        default:
            break;
    }

    // Ritorno l'elemento
    return element_to_return;
}


// Funzione per capire se voglio la lista delle pagine (per avere un minimo di percorso)
export function movement_into_pages(points, path) {

    let p = document.querySelector('p.movement_into_pages');

    if (p) {
    
        // // Inserisco la frase
        // p.innerHTML = '';
    
        // Creo l'elemento per la home
        let a = document.createElement('a');
        a.innerText = 'Home';
        a.href = points;
    
        // Inserisco l'elemento per Home ed il primo separatore
        p.appendChild(a);
        p.append(' / ');
        
        // Inserisco la lista nell'apposita sezione
        clickable_path(path).forEach(e => {
            // Inserisco l'elemento
            p.appendChild(e);
            // Inserisco la barra spaziatrice
            p.append(' / ');
        });
    }
}


// Creo un array di 'punti' per tornare sempre alla home (./../etc)
export function points_number(path) {

    // Faccio lo split
    var s = path.split('/');

    // Tolgo il primo e l'ultimo elemento
    s.shift();
    s.pop();

    // Creo l'array al quale mettero' eventuali puntini doppi
    var a = './';

    // Itero per vedere se e quanti puntini devo aggiungere
    for (let e of s) {
        a += '../';
    }

    // Ritorno l'array
    return a;

}


// Funzione per mostrare la lista di dettagli e far apparire il contenuto in un div sottostante
export function show_details(container, to_see_in_another_block=false) {

    // Itero ogni dettaglio
    container.querySelectorAll('.details-container details').forEach((detail) => {
        // Aggiungo l'evento se clicco sopra
        detail.addEventListener('click', event => {

            if (to_see_in_another_block) {
                // Blocco l'apertura del tag
                event.preventDefault();

                if (container.lastElementChild.tagName !== 'DIV') {
                    // Tolgo l'ultimo elemento (quello vecchio)
                    container.removeChild(container.lastElementChild);
                }
    
                // Creo un elemento da inserire in coda al contenitore
                let p = document.createElement('p');
                p.innerHTML = detail.querySelector('p').innerHTML;
                let p_style = p.style;
                // p_style.marginTop = '20px';
                // p_style.borderTop = '1px solid #ccc';
                
                // Inserisco il contenuto nel contenitore
                container.appendChild(p);
            }

            else {
                // Itero nuovamente sui dettagli
                container.querySelectorAll('.details-container details').forEach((otherDetail) => {
                    // Chiudo ogni dettaglio diverso da quello cliccato
                    if (otherDetail !== detail) {
                        // Rimuovo l'attributo
                        otherDetail.removeAttribute('open');
                    }
                });
            }
        });

        if (to_see_in_another_block) {
            // Aggiungo l'evento se clicco da altre parti
            detail.addEventListener('mouseout', () => {
                if (container.lastElementChild.tagName !== 'DIV') {
                    // Tolgo l'ultimo elemento (quello vecchio)
                    container.removeChild(container.lastElementChild);
                }
            });
        }
    });
}


// Funzione per inserire bottoni per andare in cima o in fondo in una tabella più velocemente
export function start_end_table(table) {

    // Prendo il riferimento del main contenente la tabella
    let main = document.querySelector('main');

    // Creo il bottone ed il riferimento per andare in cima
    let to_end = document.createElement('div');
    to_end.style.margin = '10px 0px';
    // Creo il bottone
    let button_to_end = `<a href="#table-end" name="table-start"><button>Vai alla fine della tabella</button></a>`;
    to_end.innerHTML = button_to_end;
    to_end.align = 'center';

    // Creo il bottone ed il riferimento per andare in fondo
    let to_start = document.createElement('div');
    to_start.style.margin = '10px 0px';
    // Creo il bottone
    let button_to_start = `<a href="#table-start" name="table-end"><button>Vai all'inizio della tabella</button></a>`;
    to_start.innerHTML = button_to_start;
    to_start.align = 'center';

    // Inserisco gli elementi
    main.insertBefore(to_end, table);
    main.insertBefore(to_start, table.nextElementSibling);

}


// Funzione per capire il mese e mettere l'SVG giusto
export function svg(month) {
    // Inizializzo la variabile
    let svgs = {};

    let icons_path = 'Static/images/icons/';
    
    // Vado a vedere il mese esatto (+1 perchè parte da 0)
    switch (month + 1) {
            
        // In caso sia pasqua
        case 4:
            
            svgs.favicon = `${icons_path}04_favicon.svg`;
            svgs.non_barrato = `${icons_path}04_nb.svg`;
            svgs.barrato = `${icons_path}04_b.svg`;
            
            break;
            
        // In caso sia estate
        case 6:
        case 7:
        case 8:
            
            svgs.favicon = `${icons_path}06_07_08_favicon.svg`;
            svgs.non_barrato = `${icons_path}06_07_08_nb.svg`;
            svgs.barrato = `${icons_path}06_07_08_b.svg`;
            
            break;
            
        // In caso sia halloween
        case 10:
            
            svgs.favicon = `${icons_path}10_favicon.svg`;
            svgs.non_barrato = `${icons_path}10_nb.svg`;
            svgs.barrato = `${icons_path}10_nb.svg`;
            
            break;
            
        // In caso sia inverno
        case 12:
            
            svgs.favicon = `${icons_path}12_favicon.svg`;
            svgs.non_barrato = `${icons_path}12_nb.svg`;
            svgs.barrato = `${icons_path}12_b.svg`;
            
            break;
        
        // In generale (default)
        default:
            
            svgs.favicon = `${icons_path}00_favicon.svg`;
            svgs.non_barrato =  `${icons_path}00_nb.svg`;
            svgs.barrato =  `${icons_path}00_b.svg`;
            
            break;
    }
    
    // Ritorno gli svg che mi servono        
    return svgs;
        
}


// Settare icona per vedere o meno password
export function togglePasswordVisibility(passwordField, button, svgs) {

    // Se il campo di testo è una stringa
    if (typeof passwordField === 'string') {
        // Prendo il campo della password
        passwordField = document.getElementById(passwordField);
    }

    if (passwordField.type === "password") {
        // Cambio il tipo
        passwordField.type = "text";
        // Inserisco l'svg
        if (button.tagName === 'IMG') {
            button.src = points_number(path) + svg(date.getMonth()).non_barrato;
            button.alt = 'Hide';
            button.title = 'Hide password';
        } else {
            button.innerHTML = svgs.non_barrato;
        }
    } else {
        // Cambio il tipo
        passwordField.type = "password";
        // Inserisco l'svg
        if (button.tagName === 'IMG') {
            button.src = points_number(path) + svg(date.getMonth()).barrato;
            button.alt = 'Show';
            button.title = 'Show password';
        } else {
            button.innerHTML = svgs.barrato;
        }
    }
}


// Funzione per inserire gli auguri
export function wishes_function(date) {

    // Seleziono la parte degli auguri
    let wishes = document.getElementById('wishes');

    // Prendo il mese ed il giorno per confrontarli successivamente
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let actual_day = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}`;

    switch (actual_day) {

        // Capodanno
        case '01/01':
            // Colore
            wishes.style.color = 'black';
            // Testo
            wishes.innerHTML = `
                <h3>
                    Tanti auguri per questo nuovo anno!
                </h3>
                    
                <br />
                
                Spero che questo ${date.getFullYear()} sia un anno pieno di novità...positive ovviamente :)
            `;
            // Mostro l'elemento
            wishes.style.display = 'block';

            break;

        // San valentino
        case '14/02':
            // Colore
            wishes.style.color = 'pink';
            // Background
            wishes.style.backgroundColor = 'black';
            // Testo
            wishes.innerHTML = `
                <h3>
                    Buon San Valentino!
                    <br /><br />
                    Che questo giorno possa essere per te il più romantico di sempre.
                </h3>
            `;
            // Mostro l'elemento
            wishes.style.display = 'block';

            break;

        // Pesce d'aprile
        case '01/04':
            // Colore
            wishes.style.color = 'transparent';
            // Testo
            wishes.innerHTML = `
                <h3>
                    Buon pesce d'aprile!
                </h3>
            `;
            // Mostro l'elemento
            wishes.style.display = 'block';
            
            // Cambio colore se passo sopra con il mouse
            wishes.addEventListener('mouseover', () => {
                wishes.style.backgroundColor = 'black';
                wishes.style.color = 'yellow';
            });
            // Cambio colore se tolgo il mouse
            wishes.addEventListener('mouseout', () => {
                wishes.style.backgroundColor = 'transparent';
                wishes.style.color = 'transparent';
            });

            break;

        // Pasqua
        case '20/04':
            // Colore
            wishes.style.color = 'green';
            // Testo
            wishes.innerHTML = `
                <h3>
                    Buona Pasqua...e buona scorpacciata di cioccolato!
                </h3>
            `;
            // Mostro l'elemento
            wishes.style.display = 'block';

            break;

        // Giornata del lavoratore
        case '01/05':
            // Colore
            wishes.style.color = 'black';
            // Testo
            wishes.innerHTML = `
                <h3>
                    Buona giornata del lavoratore...anche se non lavori!
                </h3>
            `;
            // Mostro l'elemento
            wishes.style.display = 'block';

            break;

        // Anniversario Betta-Me
        case '22/10':
            // Colore
            wishes.style.color = '#00BFFF';
            wishes.style.backgroundColor = '#1F305E';
            // Anni di sopportazione
            let as = date.getFullYear() - 2023;
            //Altri dati
            let h = date.getHours();
            let m = date.getMinutes();
            // Testo
            wishes.innerHTML = h >= 4 ? `
                <h3>
                    Buon anniversario!
                    <br /><br />
                    Questo per ricordarti che ${as === 1 ? 'è un' : 'sono'} ${as} ann${as === 1 ? 'o' : 'i'} che ci sopportiamo :)
                </h3>
                <code>
                    00100000 00100000 00100000 01011111 01011111 00100000 00100000 00100000 00100000 01011111 01011111&nbsp;
                    <br />
                    &nbsp;01111100 00100000 00101111 00100000 00100000 01011100 01011111 01011111 00101111 00100000 00100000 01011100 00100000 01111100&nbsp;
                    <br />
                    &nbsp;01111100 00100000 01011100 00100000 00100000 00100000 00100000 00100000 00100000 00100000 00100000 00101111 00100000 01111100&nbsp;
                    <br />
                    &nbsp;01111100 00100000 00100000 01011100 00100000 00100000 01001100 01010101 00100000 00100000 00101111 00100000 00100000 01111100&nbsp;
                    <br />
                    &nbsp;01111100 00100000 00100000 00100000 01011100 00100000 00100000 00100000 00100000 00101111 00100000 00100000 00100000 01111100&nbsp;
                    <br />
                    &nbsp;01111100 00100000 00100000 00100000 00100000 01011100 00100000 00100000 00101111 00100000 00100000 00100000 00100000 01111100&nbsp;
                    <br />
                    &nbsp;01111100 00100000 00100000 00100000 00100000 00100000 01011100 00101111 00100000 00100000 00100000 00100000 00100000 01111100
                </code>
            ` : `
                <h3>
                    We, che controlli? Non è ancora arrivata l'ora!
                    <br /><br />
                    Torna tra 
                    ${(h - 3 > 0 || (h - 3 === 0 && m === 0)) ? ((h - 2 === 0 && m > 0) || (h - 3 === 0 && m === 0) ? '1 ora' : `${4 - (h + 1)} ore`) + ' e' : ''} 
                    ${60 - m} minut${m === 59 ? 'o' : 'i'} :)
                </h3>
            `;
            // Mostro l'elemento
            wishes.style.display = 'block';

            break;

        // Halloween
        case '31/10':
            // Colore
            wishes.style.color = 'orange';
            // Testo
            wishes.innerHTML = `
                <h3>
                    Buon Halloween...che sia questo il più spaventoso di sempre!
                </h3>
            `;
            // Mostro l'elemento
            wishes.style.display = 'block';

            break;

        // Natale
        case '25/12':
            // Colore
            wishes.style.color = 'red';
            // Testo
            wishes.innerHTML = `
                <h3>
                    Tantissimi auguri di buon Natale!
                </h3>
            `;
            // Mostro l'elemento
            wishes.style.display = 'block';

            break;

        // Default -> elimino il div
        default:
            wishes.remove();

            break;
    }
}
