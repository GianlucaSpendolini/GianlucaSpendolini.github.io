/* IMPORTAZIONE DA FILE ESTERNI */


// Importo funzioni da file esterni
import { add_css_js, clickable_path, insert_in_head, json_to_element, points_number, svg } from './util_function.js';

// Importo variabili da file esterni
import { date, path } from './util_variable.js';



/* EVENTO ELEMENTI DOM CARICATI */


document.addEventListener('DOMContentLoaded', () => {

    // Creazione variabili generali da usare

    // Prendo i punti da aggiungere per tornare indietro
    var points = points_number(path);

    // Elenco dei link che devo assegnare ai rispettivi bottoni
    var links_list = [
        `${points}`,
        `${points}about`,
        `${points}projects/`,
        `${points}utilities/`,
        `${points}generic/`
    ];


    /* Cose da fare inizialmente */

    // Inserisco l'icona
    insert_in_head(`<link href="${points}${svg(date.getMonth()).favicon}" rel="icon" type="image/svg+xml" >`);

    // Inserisco i meta-tag comuni
    insert_in_head(`<meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />`);

    // Creo l'header e il footer
    create_header(links_list);
    create_footer(points, links_list);


    /* Cose da fare successivamente */

    // Aggiungo il CSS e il codice JavaScript
    add_css_js(points);
    
    // Capisco in che pagina mi trovo
    what_page(path, points);

    // setTimeout(() => {console.log('fine');}, 0);
    /* ALTRE COSE DA FARE */

    // Cerco se voglio la lista delle pagine (per avere un minimo di percorso)
    let movement_into_pages = document.querySelector('p.movement_into_pages');
    if (movement_into_pages) {
        // Ripulisco il contenuto momentaneamente
        movement_into_pages.innerHTML = '';
        
        // Inserisco la lista nell'apposita sezione
        clickable_path(path).forEach(e => {
            // Inserisco l'elemento
            movement_into_pages.appendChild(e);
            // Inserisco la barra spaziatrice
            movement_into_pages.append(' / ');
        });
    }
});



/* FUNZIONI GENERICHE */


// Funzione per sistemare l'header
function create_header(links_list) {

    // Elenco dei nomi dei bottoni
    var buttons_name = [
        'Home',
        'Info',
        'Progetti',
        'Utili',
        'Altro'
    ];

    // Aggiungo header solo se non sono in /generic/
    if (!window.location.pathname.startsWith('/generic/')) {

        // Seleziono l'header
        var header = document.querySelector('header');

        // Inserisco una struttura nell'header
        header.innerHTML = `<h1 class="title"></h1>
                            <br />
                            <div align="center" id="nav-bar">
                                <nav></nav>
                            </div>
                            `;
    }

    // Seleziono la navbar
    var navbar = document.querySelector('header nav');

    // Controllo se la lunghezza non corrisponde e blocco nel caso
    if (buttons_name.length != links_list.length) {
        navbar.append = 'La lunghezza della lista dei bottoni e quella dei link non corrisponde';
    }
    else {

        for (let i = 0; i < buttons_name.length; i++) {
            // Creo l'elemento che devo inserire
            var element = document.createElement('button');

            // Inserisco il nome del bottone dalla lista
            element.innerText = buttons_name[i];

            element.addEventListener('click', function() {
                window.location.href = links_list[i];
            });

            navbar.appendChild(element);
        }

    }
}


// Funzione per sistemare il footer in automatico
function create_footer(points_path, links_list) {

    // Creo liste per link/immagini da inserire (section dx e sx)

    // Nomi link prima section
    var links_name = [
        'Info su di me',
        'I miei progetti',
        'Cose utili',
        'Altro'
    ]

    // Elenco delle icone (section sx)
    var links_4_icons = [
        'mailto:alpagi01@gmail.com',
        'https://linkedin.com/in/gianluca-spendolini',
        'https://github.com/GianlucaSpendolini',
        'https://telegram.me/Gianlusp01'
    ];

    // Creo l'elenco delle immagini (section dx)
    var images_4_icons = [
        {
            alt: 'Logo mail',
            class: 'icona mail',
            src: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg'
        },
        {
            alt: 'Logo LinkedIn',
            class: 'icona linkedin',
            src: `${points_path}Static/images/LinkedIn-Logos/LI-In-Bug.png`
        },
        {
            alt: 'Logo Git Hub',
            class: 'github icona',
            src: `${points_path}Static/images/github-mark/github-mark.png`
        },
        {
            alt: 'Logo Telegram',
            class: 'icona telegram',
            src: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg'
        }
    ];

    // Seleziono il footer
    var footer = document.querySelector('footer');

    // Ciclo perche' i passaggi sono gli stessi ma ripetuti due volte
    for (var j = 0; j < 2; j++) {

        // Inserisco i link nella section di sx
        var ul = document.createElement('ul');

        // Lavoro per la prima lista
        if (j === 0) {
            // Aggiungo la classe all'ul
            ul.classList.add('sezioni');

            // Inserisco ogni elemento della lista dei nomi (non uso .foreach perch� mi serve il 'n' + 1)
            for (var i = 0; i < links_name.length; i++) {

                // Creo l'elemento 'li' della lista
                var li = document.createElement('li');

                // Aggiungo il contenuto all'elemento 'li'
                li.innerHTML = `<a href='${links_list[i + 1]}'>${links_name[i]}</a>`;

                // Aggiungo 'li' all'elenco 'ul'
                ul.appendChild(li);
            }
        }
        // Lavoro per la seconda lista
        else if (j === 1) {
            // Aggiungo la classe all'ul
            ul.classList.add('contatti');

            // Controllo che le lunghezze corrispondano (per rapporto 1:1)
            if (links_4_icons.length === images_4_icons.length) {

                // Inserisco ogni elemento della lista delle immagini
                for (i = 0; i < links_4_icons.length; i++) {

                    // Creo l'elemento 'li' della lista
                    var li = document.createElement('li');

                    // Aggiungo la classe 'link' al tag 'li'
                    li.classList.add('link');

                    // Aggiungo il contenuto all'elemento 'li'
                    li.innerHTML = `<a href='${links_4_icons[i]}'>
                                        <img alt='${images_4_icons[i]['alt']}' class='${images_4_icons[i]['class']}' src='${images_4_icons[i]['src']}' />
                                    </a>`;

                    // Aggiungo 'li' all'elenco 'ul'
                    ul.appendChild(li);
                }
            }
            else {
                ul.innerHTML = '<li>Le liste hanno lunghezze differenti</li>';
            }
        }

        // Aggiungo l'elenco 'ul' alla section
        var section = document.createElement('section');
        section.appendChild(ul);

        // Aggiungo la section al footer
        footer.appendChild(section);
    }
}


// Funzione per capire in che pagina sono e fare determinate cose
function what_page(page_path, points_path) {

    // Seleziono il tag 'title'
    var title = document.querySelector('title');

    // Seleziono il tag 'header'
    var header_title = document.querySelector('h1.title');

    switch (page_path) {

        // Prova
        case '/prova':
            //navbar_header();
            //creazione_header();
            console.log('Ciao prova');

            // Titolo
            title.innerHTML = 'Prova';

            // Header title
            header_title.innerHTML = 'Prove';

            break;

        // Home
        case '/':

            //Titolo
            title.innerHTML = 'Home';

            // Header title
            header_title.innerHTML = 'Home';

            // Creo eventuali contenuti dei meta-tag
            const contenuto_m_tag = 'Sito web personale di Gianluca Spendolini, contenente informazioni su progetti, utilità e altro.';
            // Creo lista meta-tag
            const m_tags = `<meta name="description" content="${contenuto_m_tag}" />`;
            // Inserisco i meta tag
            insert_in_head(m_tags);

            break;

        // About
        case '/about':

            // Titolo
            title.innerHTML = 'Contatti';

            // Header title
            header_title.innerHTML = 'About me';

            // Prendo la classe Date per assegnarla da una variabile
            const date = new Date();

            // Calcolo la mia eta'
            var my_age = date.getFullYear() - 2001;

            // Se e' prima del mio compleanno -> vado in dietro di 1 anno
            if (date.getDate() < 11 || (date.getMonth() + 1) < 9) {
                my_age -= 1;
            }

            // Inserisco il mio anno nella presentazione
            document.querySelector('#my-age').innerHTML = my_age;

            break;

        // Changes
        case '/changes/':

            // Titolo
            title.innerHTML = 'Changes';

            // Header title
            header_title.innerHTML = 'Changes';

            break;

        // /changes_table
        case '/changes/changes_table':

            // Titolo
            title.innerHTML = 'Changes table';

            // Header title
            header_title.innerHTML = 'Tabella dei cambiamenti';

            // Inserisco gli elementi della tabella in automatico
            insert_my_json('changes table', points_path);

            break;

        // Projects
        case '/projects/':

            // Titolo
            title.innerHTML = 'Projects';

            // Header title
            header_title.innerHTML = 'Progetti';

            break;

        // /games/
        case '/projects/games/':

            // Titolo
            title.innerHTML = 'Games';

            // Header title
            header_title.innerHTML = 'Games';

            break;

        // /games/scratch
        case '/projects/games/scratch':

            // Titolo
            title.innerHTML = 'Scratch';

            // Header title
            header_title.innerHTML = 'Pagina di scratch';

            break;

        // /socials/
        case '/projects/socials/':

            // Titolo
            title.innerHTML = 'Socials';

            // Header title
            header_title.innerHTML = 'Socials';

            break;

        // /socials/telegram
        case '/projects/socials/telegram':

            // Titolo
            title.innerHTML = 'Telegram';

            // Header title
            header_title.innerHTML = 'Pagina di Telegram';

            break;

        // /web/
        case '/projects/web/':

            // Titolo
            title.innerHTML = 'Sites';

            // Header title
            header_title.innerHTML = 'Siti';

            break;

        // Utilities
        case '/utilities/':

            // Titolo
            title.innerHTML = 'Utilities';

            // Header title
            header_title.innerHTML = 'Utilities';

            break;

        default:
            // Non faccio nulla
            break;
    }
}


// Funzione per 
function insert_my_json(file_description, points) {

    switch (file_description) {

        // In caso voglio inserire i dati nella tabella delle modifiche
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