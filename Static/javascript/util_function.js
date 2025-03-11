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
    let caps_lock = document.getElementById('caps-lock');

    if (event.getModifierState('CapsLock')) {
        caps_lock.innerHTML = '<span class="Style2" style="color: red; font-size:18px;">Attenzione! Blocco maiuscole ATTIVO!</span>';
    }
    else {
        caps_lock.innerHTML = '';
    } 
}


// Funzione per avvisare se blocco numerico non è attivo
export function advertiment_numlock(event) {
                
    // Dove inserire il messaggio
    let num_lock = document.getElementById('num-lock');

    if (!event.getModifierState('NumLock')) {
        num_lock.innerHTML = '<span class="Style2" style="color: red; font-size:18px;">Attenzione! Blocco numerico NON ATTIVO!</span>';
    }
    else {
        num_lock.innerHTML = '';
    } 
}


// Funzione contenente eventi per controllare se qualche blocco è attivo
export function check_anylock() {
                
    // Seleziono campo password
    let password = document.getElementById('passwordField');
    
    // Eventi
    password.addEventListener('click', event => {
        advertiment_capslock(event);
        advertiment_numlock(event);
    });
    password.addEventListener('keydown', event => {
        advertiment_capslock(event);
        advertiment_numlock(event);
    });
    password.addEventListener('keyup', event => {
        advertiment_capslock(event);
        advertiment_numlock(event);
    });
    password.addEventListener('mousemove', event => {
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
        // console.log('elc: ', elements_list_copy);

        // Diminuisco il conteggio
        count -= 1;
    }

    // Ritorno l'array
    return path_to_move_into_pages;
}


// Funzione per inserire esempi (di codice o di altro)
export function insert_examples(reason, script_name) {
    
    // Controllo il motivo
    switch (reason) {

        // Code
        case 'code':
        
            // Variabile per contenere i riferimenti ai vari div
            let divs = [];

            // Variabile per contenere tutti gli esempi di codice
            let codes = [];

            //
            let html_examples = [];

            // In base a dove voglio, vado a prendere il nome dello script
            switch (script_name) {

                // Automatic Filling
                case 'automatic filling':

                    divs.push(document.querySelector('#selezionando-un-elemento-da-una-lista-select'));

                    html_examples.push([
                        `  
                        // Seleziono checkbox e radio
                        let cb_profilo_1 = document.getElementsByName('profilo-1')[0];            
                        let cb_profilo_2 = document.getElementsByName('profilo-2')[0];
                        
                        // Selezione dell'elemento select
                        let select = document.getElementById('PROFILO');
                        
                        // Aggiungo l'evento
                        select.addEventListener('change', () => {
                            
                            // Controllo quale elemento è stato scelto in base al valore restituito
                            switch (select.value) {
                            
                                // In caso del profilo 1
                                case 'profilo 1':
                                
                                    cb_profilo_1.checked = true;
                                    cb_profilo_2.checked = false;
                                    
                                    break;
                                
                                // In caso del profilo 2
                                case 'profilo 2':
                                
                                    cb_profilo_1.checked = false;
                                    cb_profilo_2.checked = true;
                                    
                                    break;
                                
                                // In caso non seleziono uno dei profili elencati
                                default:
                                    
                                    // Svuoto campi per abilitazione e non
                                    cb_profilo_1.checked = false;
                                    cb_profilo_2.checked = false;
        
                                    
                                    // Svuoto altri campi
                                    // document.getElementsByName('input-text')[0].value = '';
                                    // document.getElementsByName('textarea')[0].innerHTML = '';
                                    
                                    break;
                            }
                        });
                        `,
                        `
                        <select id="PROFILO">
                            <option value="">...</option>
                            <option value="profilo 1">Profilo 1</option>
                            <option value="profilo 2">Profilo 2</option>
                        </select>
                        
                        <input name="profilo-1" type="checkbox" />
                        <input name="profilo-2" type="checkbox" />
                        `
                    ]);
        
                    codes.push(`
                        <span class="js-comment">
                            /*
                                Codice scritto in JavaScript
                            */
                        </span><br /><br />
                        
                        <span class="js-comment">
                            // Seleziono checkbox e radio
                        </span><br />
                        <span class="js-init">let</span> <span class="js-var">cb_profilo_1</span> = document.<span class="js-func">getElementsByName</span>('profilo-1')[0];<br />            
                        <span class="js-init">let</span> <span class="js-var">cb_profilo_2</span> = document.<span class="js-func">getElementsByName</span>('profilo-2')[0];<br /><br />
                        
                        <span class="js-comment">
                            // Selezione dell'elemento select
                        </span><br />
                        <span class="js-init">let</span> <span class="js-var">select</span> = document.<span class="js-func">getElementById</span>('PROFILO');<br /><br />
                        
                        <span class="js-comment">
                            // Aggiungo l'evento
                        </span><br />
                        select.<span class="js-func">addEventListener</span>('change', () => {<br /><br />&nbsp;
        
                            <span class="js-comment">
                                // Controllo quale elemento è stato scelto in base al valore restituito
                            </span><br />&nbsp;
                            switch (select.value) {<br /><br />&nbsp;&nbsp;
        
                                <span class="js-comment">
                                    // In caso del profilo 1
                                </span><br />&nbsp;&nbsp;
                                case 'profilo 1':<br /><br />&nbsp;&nbsp;&nbsp;
                                
                                    cb_profilo_1.<span class="js-var">checked</span> = true;<br />&nbsp;&nbsp;&nbsp;
                                    cb_profilo_2.<span class="js-var">checked</span> = false;<br /><br />&nbsp;&nbsp;&nbsp;
                                    
                                    break;<br /><br />&nbsp;&nbsp;
        
                                <span class="js-comment">
                                    // In caso del profilo 2
                                </span><br />&nbsp;&nbsp;
                                case 'profilo 2':<br /><br />&nbsp;&nbsp;&nbsp;
                                
                                    cb_profilo_1.<span class="js-var">checked</span> = false;<br />&nbsp;&nbsp;&nbsp;
                                    cb_profilo_2.<span class="js-var">checked</span> = true;<br /><br />&nbsp;&nbsp;&nbsp;
                                    
                                    break;<br /><br />&nbsp;&nbsp;
        
                                <span class="js-comment">
                                    // In caso non seleziono uno dei profili elencati
                                </span><br />&nbsp;&nbsp;
                                default:<br /><br />&nbsp;&nbsp;&nbsp;
        
                                    <span class="js-comment">
                                        // Svuoto campi per abilitazione e non
                                    </span><br />&nbsp;&nbsp;&nbsp;
                                    cb_profilo_1.checked = false;<br />&nbsp;&nbsp;&nbsp;
                                    cb_profilo_2.checked = false;<br /><br />&nbsp;&nbsp;&nbsp;
        
                                    <span class="js-comment">
                                        // Svuoto altri campi
                                    </span><br />&nbsp;&nbsp;&nbsp;
                                    document.<span class="js-func">getElementsByName</span></span>('input-text')[0].value = '';<br />&nbsp;&nbsp;&nbsp;
                                    document.<span class="js-func">getElementsByName</span>('textarea')[0].innerHTML = '';<br /><br />&nbsp;&nbsp;&nbsp;
                                    
                                    break;<br /><br />&nbsp;
                            }<br />
                        });
                    `);
        
                    break;
                
                // Default
                default:
                    break;
            }
        
            // Vado a ciclare ogni elemento per poter aggiungere i codici dove voglio
            for (let pos = 0; pos < divs.length; pos++) {

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
                example_div.innerHTML = html_examples[pos][1];

                // Appendo il div di esempio
                div.appendChild(example_div);
                
                // Creo la variabile per i dettagli
                let details = document.createElement('details');

                // Aggiungo del codice HTML
                details.innerHTML = `
                    <summary>Codice di esempio</summary>
                    <div>
                        <code></code>
                    </div>
                `;

                // Aggiungo il codice
                details.querySelector('code').innerHTML = codes[pos].replaceAll('&nbsp;', '&nbsp;&nbsp;');

                // Aggiungo i dettagli al div
                div.appendChild(details);

                // Inserisco i dettagli nel div
                divs[pos].append(div);
                
                // Eseguo il codice javascript
                (new Function(html_examples[pos][0]))();
            }

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

                //
                // console.log(
                //     "prova invio:", 
                //     languages
                // );
            });

            break;

        // /scripts/automatic-filling (per inserire le descrizioni)
        case 'automatic filling':

            return fetch(`${points}Static/json/descriptions.json`)
            .then(response => response.json())
            .then(data => {

                // Prendo i dati che mi servono
                let descriptions = data['scripts']['automatic filling'];

                // In un ciclo for prendo chiave e valore di ogni elemento
                for (let [div_id, description] of Object.entries(descriptions)) {

                    // Uso la chiave per cercare l'id (le chiavi hanno lo stesso nome degli id dei vari div contenenti i codici)
                    let ref = document.querySelector(`#${div_id}`);
    
                    // Prendo il contenuto, creo l'elenco e lo appendo all'elemento
                    ref.append('Funzionamento:');
                    ref.appendChild(json_to_element('ul', description))

                }
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
export function togglePasswordVisibility(button, svgs) {
    let passwordField = document.getElementById("passwordField");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        button.innerHTML = svgs.barrato;
    } else {
        passwordField.type = "password";
        button.innerHTML = svgs.non_barrato;
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