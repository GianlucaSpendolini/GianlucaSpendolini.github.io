document.addEventListener('DOMContentLoaded', () => {

    // Creazione variabili generali da usare

    // Elenco dei nomi dei bottoni
    var buttons_name = [
        'Home',
        'Info',
        'Progetti',
        'Utili',
        'Altro'
    ];

    // Elenco dei link che devo assegnare ai rispettivi bottoni
    var links_list = [
        'https://gianlucaspendolini.github.io/',
        'https://gianlucaspendolini.github.io/about',
        'https://gianlucaspendolini.github.io/projects/',
        'https://gianlucaspendolini.github.io/utilities/',
        'https://gianlucaspendolini.github.io/generic/'
    ];

    // Cose da fare inizialmente (inserire connessioni nei bottoni)
    create_header(buttons_name, links_list);
    create_footer(links_list);

    // In base alla sezione in cui mi trovo, faccio qualcosa
    setTimeout(what_page(window.location.pathname), 0);
});


function what_page(path) {

    switch (path) {

        // Prova
        case '/prova':
            //navbar_header();
            //creazione_header();
            console.log('Ciao prova');
            break;

        // About
        case '/about':
            const date = new Date();
            var my_age = date.getFullYear() - 2001;

            if (date.getDate() < 11 || (date.getMonth() + 1) < 9) {
                my_age -= 1;
            }
            // Inserisco il mio anno nella presentazione
            document.querySelector('#my-age').innerHTML = my_age;

            break;
        default:
            // Non faccio nulla
    }
    /*// Prova
    if (path === '/prova') {
        //navbar_header();
        //creazione_header();
        console.log('Ciao prova');
    }

    // About
    if (path === '/about') {
        const date = new Date();
        var my_age = date.getFullYear() - 2001;

        if (date.getDate() < 11 || (date.getMonth() + 1) < 9) {
            my_age -= 1;
        }
        // Inserisco il mio anno nella presentazione
        document.querySelector('#my-age').innerHTML = my_age;
    }*/
}


function navbar_header() {

    console.log('dentro funzione');

    // Home (/)
    document.querySelector('#home').addEventListener('click', function() {
        console.log('home');
        window.location.href = 'https://gianlucaspendolini.github.io/';
    });

    // Info (/about)
    document.querySelector('#info').addEventListener('click', function() {
        console.log('/about');
        window.location.href = 'https://gianlucaspendolini.github.io/about';
    });

    // Progetti (/projects/)
    document.querySelector('#progetti').addEventListener('click', function() {
        console.log('/projects/');
        window.location.href = 'https://gianlucaspendolini.github.io/projects/';
    });

    // Utili (/utilities/)
    document.querySelector('#utili').addEventListener('click', function() {
        console.log('/utilities/');
        window.location.href = 'https://gianlucaspendolini.github.io/utilities/';
    });

    // Altro (/generic/)
    document.querySelector('#altro').addEventListener('click', function() {
        console.log('/generic/');
        window.location.href = 'https://gianlucaspendolini.github.io/generic/';
    });

    // Assegnati tutti i link
    console.log('Assegnati i link');
}


function create_header(buttons_name, links_list) {

    // Vado a selezionare la navbar dell'header
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
function create_footer(links_list) {

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
            src: 'https://gianlucaspendolini.github.io/Static/images/LinkedIn-Logos/LI-In-Bug.png'
        },
        {
            alt: 'Logo Git Hub',
            class: 'github icona',
            src: 'https://gianlucaspendolini.github.io/Static/images/github-mark/github-mark.png'
        },
        {
            alt: 'Logo Telegram',
            class: 'icona telegram',
            src: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg'
        }
    ];

    // Seleziono il footer
    var footer = document.querySelector('footer');

    // Ciclo perchè i passaggi sono gli stessi ma ripetuti due volte
    for (j = 0; j < 2; j++) {

        // Inserisco i link nella section di sx
        var ul = document.createElement('ul');

        // Lavoro per la prima lista
        if (j === 0) {
            // Aggiungo la classe all'ul
            ul.classList.add('sezioni');

            // Inserisco ogni elemento della lista dei nomi (non uso .foreach perchè mi serve il 'n' + 1)
            for (i = 0; i < links_name.length; i++) {

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
        section = document.createElement('section');
        section.appendChild(ul);
        console.log('section: ', section);

        // Aggiungo la section al footer
        footer.appendChild(section);
        console.log('footer: ', footer);
    }
}