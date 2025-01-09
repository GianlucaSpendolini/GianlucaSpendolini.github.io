/* IMPORTAZIONE DA FILE ESTERNI */


// Importo funzioni da file esterni
import { 
    add_css_js, 
    clickable_path, 
    insert_in_head, 
    insert_my_json, 
    json_to_element, 
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
    movement_into_pages(points);
});



/* FUNZIONI GENERICHE */


// Funzione per sistemare l'header
function create_header(links_list) {
    console.log(links_list);

    // Creo un array differente per poter togliere "altro"
    let list_of_links = links_list;
    console.log(list_of_links);

    // Vado a togliere il link del blog perchè non voglio venga inserito nell'header
    list_of_links.splice(4, 1);
    console.log(list_of_links);

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
    if (buttons_name.length != list_of_links.length - 1) {
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
    console.log(links_list);

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

            break;

        // Home
        case '/':

            //Titolo
            title.innerHTML = 'Home';

            // Header title
            header_title.innerHTML = 'Home';

            // Creo eventuali contenuti dei meta-tag
            let contenuto_m_tag = 'Sito web personale di Gianluca Spendolini, utilizzato principalmente per sperimentare i linguaggi CSS, HTML e JavaScript.';
            // Creo lista meta-tag
            let m_tags = `<meta name="description" content="${contenuto_m_tag}" />`;
            // Inserisco i meta tag
            insert_in_head(m_tags);

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

            break;

        // /changes_table
        case '/changes/changes_table':

            // Titolo
            title.innerHTML = 'Changes table';

            // Header title
            header_title.innerHTML = 'Tabella dei cambiamenti';

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


// Funzione per capire se voglio la lista delle pagine (per avere un minimo di percorso)
function movement_into_pages(points) {

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