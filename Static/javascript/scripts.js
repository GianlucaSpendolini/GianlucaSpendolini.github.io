// Importo funzioni da file esterni
import { add_css_js, points_number, what_page } from './util_function.js';

document.addEventListener('DOMContentLoaded', () => {

    // Creazione variabili generali da usare

    // Prendo il nome del percorso
    var path = window.location.pathname;

    // Prendo i punti da aggiungere per tornare indietro
    var points = points_number(path);
    //console.log(points);

    // Elenco dei link che devo assegnare ai rispettivi bottoni
    var links_list = [
        `${points}`,
        `${points}about`,
        `${points}projects/`,
        `${points}utilities/`,
        `${points}generic/`
    ];


    /* Cose da fare inizialmente (inserire connessioni nei bottoni)*/
    // add_css_js(points);
    create_header(links_list);
    create_footer(points, links_list);


    /* Cose da fare successivamente */

    // Aggiungo il CSS e il codice JavaScript
    add_css_js(points);
    
    // Capisco in che pagina mi trovo
    what_page(path);

    // setTimeout(() => {console.log('fine');}, 0);
});


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
        'https://linkedin.com/in/gianluca-spendolini-7b66b321b',
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
                    li.innerHTML = `<a href='${links_4_icons[i]}'><img alt='${images_4_icons[i]['alt']}' class='${images_4_icons[i]['class']}' src='${images_4_icons[i]['src']}' /></a>`;

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