document.addEventListener('DOMContentLoaded', () => {
    // Cose da fare inizialmente (inserire connessioni nei bottoni)
    //navbar_header();

    // In base alla sezione in cui mi trovo, faccio qualcosa
    setTimeout(what_page(window.location.pathname), 0);
});


function what_page(path) {
    // Prova
    if (path === '/prova') {
        //navbar_header();
        creazione_pulsanti();
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
    }
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


function creazione_pulsanti() {

    // Elenco dei nomi dei bottoni
    var bottons_name = [
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

    var navbar = document.querySelector('header nav');

    console.log('prima del controllo if');

    // Controllo se la lunghezza non corrisponde e blocco nel caso
    if (bottons_name.length != links_list.length) {
        navbar.append = 'La lunghezza della lista dei bottoni e quella dei link non corrisponde';
    }
    else {

        for (let i = 0; i < bottons_name.length; i++) {
            // Creo l'elemento che devo inserire
            var element = document.createElement('button');

            // Inserisco il nome del bottone dalla lista
            element.innerText = bottons_name[i];

            element.addEventListener('click', function() {
                console.log(bottons_name[i]);
                window.location.href = links_list[i];
            });

            navbar.appendChild(element);
        }

    }
}