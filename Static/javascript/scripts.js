document.addEventListener('DOMContentLoaded', () => {
    // Cose da fare inizialmente (inserire connessioni nei bottoni)
    navbar_header();

    // In base alla sezione in cui mi trovo, faccio qualcosa
    setTimeout(what_page(window.location.pathname), 0);
});


function what_page(path) {
    // Prova
    if (path === '/prova') {
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