/* IMPORTAZIONE DA FILE ESTERNI */


// Importo funzioni da file esterni
import { 
    add_css_js, 
    clickable_path, 
    insert_examples,
    insert_in_head, 
    insert_my_json, 
    json_to_element, 
    movement_into_pages,
    points_number,
    show_details,
    start_end_table, 
    svg,
    wishes_function
} from './util_function.js';

// Importo variabili da file esterni
import { 
    date, 
    path 
} from './util_variable.js';



/* EVENTO ELEMENTI DOM CARICATI */


document.addEventListener('DOMContentLoaded', () => {

    // Creazione variabili generali da usare

    // Prendo i punti da aggiungere per tornare indietro
    let points = points_number(path);

    // Elenco dei link che devo assegnare ai rispettivi bottoni
    let links_list = [
        `${points}`,
        `${points}about`,
        `${points}projects/`,
        `${points}utilities/`,
        `${points}blog/`,
        // `${points}generic/`
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
    what_page(points);

    // setTimeout(() => {console.log('fine');}, 0);


    /* ALTRE COSE DA FARE */

    // Cerco se voglio la lista delle pagine (per avere un minimo di percorso)
    movement_into_pages(points, path);
});



/* FUNZIONI GENERICHE */


// Funzione per sistemare l'header
function create_header(links_list) {

    // Creo un array filtrato in modo che non contenga il link per il blog
    let list_of_links = links_list.filter(item => item !== links_list[4]);

    // Elenco dei nomi dei bottoni
    let buttons_name = [
        'Home',
        'Info',
        'Progetti',
        'Utili',
        // 'Altro'
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
    let navbar = document.querySelector('header nav');

    // Controllo se la lunghezza non corrisponde e blocco nel caso
    if (buttons_name.length !== list_of_links.length) {
        navbar.innerText = 'La lunghezza della lista dei bottoni e quella dei link non corrisponde';
    }
    else {

        for (let i = 0; i < buttons_name.length; i++) {
            // Creo l'elemento che devo inserire
            var element = document.createElement('button');

            // Inserisco il nome del bottone dalla lista
            element.innerText = buttons_name[i];

            element.addEventListener('click', function() {
                window.location.href = list_of_links[i];
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
        'Blog',
        // 'Altro'
    ]

    // Elenco delle icone (section sx)
    var links_4_icons = [
        'mailto:gianluca.spendolini.01@gmail.com',
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
        let ul = document.createElement('ul');

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
                    let li = document.createElement('li');

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
        let section = document.createElement('section');
        section.appendChild(ul);

        // Aggiungo la section al footer
        footer.appendChild(section);
    }
}


// Funzione per capire in che pagina sono e fare determinate cose
function what_page(points_path) {

    // Seleziono il tag 'title'
    var title = document.querySelector('title');

    // Seleziono il tag 'header'
    var header_title = document.querySelector('.title');

    // Dichiaro la variabile per la meta-descrizione
    let meta_descrizione;

    switch (path) {

        // Prova
        case '/prova':
            //navbar_header();
            //creazione_header();
            console.log('Ciao prova');

            // Titolo
            title.innerHTML = 'Prova';

            // Header title
            header_title.innerHTML = 'Prove';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Pagina di prova nella quale faccio i test di nuove funzionalità prima di inserirle ufficialmente nella pagina di destinazione.';

            break;

        // Home
        case '/':

            //Titolo
            title.innerHTML = 'Home';

            // Header title
            header_title.innerHTML = 'Home';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Home page del mio sito. Illustro in breve ciò che si potrà trovare nelle varie parti del sito.';

            // Sistemo i details per le descrizioni
            show_details(document.querySelector('div > div:has(details)'), true);

            // Aggiungo gli auguri
            wishes_function(date);

            break;

        // About
        case '/about':

            // Titolo
            title.innerHTML = 'Contatti';

            // Header title
            header_title.innerHTML = 'About me';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Pagina in cui descrivo molto di me: chi sono, il mio percorso formativo e lavorativo e cose extra in ambito informatico.';

            /*
                Inserimento della mia età
            */
            // Calcolo la mia eta'
            let my_age = date.getFullYear() - 2001;
            // Se e' prima del mio compleanno -> vado in dietro di 1 anno
            if (date.getDate() < 11 || (date.getMonth() + 1) < 9) {
                my_age -= 1;
            }
            // Inserisco il mio anno nella presentazione
            document.querySelector('#my-age').innerHTML = my_age;

            /*
                Inserisco i linguaggi e le loro % (faccio in modo che, aprendo un tag details, tutti gli altri si chiudono -> alla fine)
            */
            insert_my_json('about', points_path);

            break;

        // Changes
        case '/changes/':

            // Titolo
            title.innerHTML = 'Changes';

            // Header title
            header_title.innerHTML = 'Changes';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Index della sezione dei cambiamenti, nella quale registro ogni modifica effettuata.';

            break;

        // /changes_table
        case '/changes/changes_table':

            // Titolo
            title.innerHTML = 'Changes table';

            // Header title
            header_title.innerHTML = 'Tabella dei cambiamenti';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Tabella in cui sono contenuti i cambiamenti effettuati suddivisi per i vari giorni.';

            // Aggiungo i bottoni per andare in cima o in fondo alla tabella più velocemente
            start_end_table(document.querySelector('table'));

            // Inserisco gli elementi della tabella in automatico
            insert_my_json('changes table', points_path);

            break;

        // Projects
        case '/projects/':

            // Titolo
            title.innerHTML = 'Projects';

            // Header title
            header_title.innerHTML = 'Progetti';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Index della sezione dei progetti, nella quale inserisco ogni progetto. La pagina è suddivisa in base alle varie tipologie di progetti.';

            break;

        // /games/
        case '/projects/games/':

            // Titolo
            title.innerHTML = 'Games';

            // Header title
            header_title.innerHTML = 'Games';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Index della sezione dei giochi, nella quale inserisco i riferimenti alle pagine inerenti all\'ambiente di sviluppo nel quale ho sviluppato il gioco.';

            break;

        // /games/scratch
        case '/projects/games/scratch':

            // Titolo
            title.innerHTML = 'Scratch';

            // Header title
            header_title.innerHTML = 'Pagina di scratch';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Pagina dei giochi sviluppati su Scratch.';

            break;

        // /socials/
        case '/projects/socials/':

            // Titolo
            title.innerHTML = 'Socials';

            // Header title
            header_title.innerHTML = 'Socials';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Index della sezione dei social, nella quale sono segnati i vari social per cui ho sviluppato qualcosa.';

            break;

        // /socials/telegram
        case '/projects/socials/telegram':

            // Titolo
            title.innerHTML = 'Telegram';

            // Header title
            header_title.innerHTML = 'Pagina di Telegram';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Pagina di Telegram, nella quale descrivo e riporto i riferimenti ai progetti sviluppati per questo social media.';

            break;

        // /web/
        case '/projects/web/':

            // Titolo
            title.innerHTML = 'Sites';

            // Header title
            header_title.innerHTML = 'Siti';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Index della sezione dei siti, nella quale registro ogni sito che ho sviluppato o che è in fase di sviluppo.';

            break;

        // Utilities
        case '/utilities/':

            // Titolo
            title.innerHTML = 'Utilities';

            // Header title
            header_title.innerHTML = 'Utilities';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Index della sezione di strumenti utili a fare qualcosa, nella quale inserisco ogni strumento. Attualmente in fase di sviluppo (work in progress)!';

            break;

        // /scripts/
        case '/utilities/scripts/':

            // Titolo
            title.innerHTML = 'Scripts';

            // Header title
            header_title.innerHTML = 'Scripts';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Index della sezione di script utili a fare qualcosa, nella quale inserisco ogni riferimento alle pagine. WIP!';

            break;

        // /scripts/automatic-filling
        case '/utilities/scripts/automatic-filling':

            // Titolo
            title.innerHTML = 'Compilazione automatica';

            // Header title
            header_title.innerHTML = 'Compilazione automatica';

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Pagina contenente script inerenti alla compilazione automatica di alcuni campi in base a diversi input.';

            /*
                Inserisco
                - le descrizioni per ogni script di compilazione automatica
                - il codice di esempio
            */
            async () => {
                await insert_my_json('automatic filling', points_path);
                insert_examples('code', 'automatic filling');
            }
            

            break;

        default:

            // Definisco il contenuto della meta-descrizione
            meta_descrizione = 'Yestrday is history, tomorrow is a mistery, but today is a gift; that\' why they call it "present".';

            // Non faccio nulla
            break;
    }

    // Inserisco la meta-descrizione (comune a tutte le pagine)
    insert_in_head(`<meta name="description" content="${meta_descrizione}" />`);
}