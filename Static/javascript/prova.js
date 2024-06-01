document.addEventListener('DOMContentLoaded', () => {
    // Per controllo se funziona
    console.log('ciaoooo funziona');

    document.querySelector('#buttProva').addEventListener('click', () => {
        prova("ciaooooo ho cliccato il bottone!!!")
        });

    // Assegno ai "bottoni" il link che devono raggiungere
    navbar_header();

    //alert("boh");
});


function prova(messaggio) {
    console.log(messaggio);
}


function navbar_header() {

    console.log('dentro funzione');

    // Home (/)
    document.querySelector('#home').addEventListener('click', function() {
        console.log('home');
        window.location.href = 'https://gianlucaspendolini.github.io/';
    });

    console.log('info');
    // Info (/about)
    document.querySelector('#info').addEventListener('click', function() {
        console.log('/about');
        window.location.href = 'https://gianlucaspendolini.github.io/about';
    });

    console.log('progetti');
    // Progetti (/projects/)
    document.querySelector('#progetti').addEventListener('click', function() {
        console.log('/projects/');
        window.location.href = 'https://gianlucaspendolini.github.io/projects/';
    });

    console.log('utili');
    // Utili (/utilities/)
    document.querySelector('#utili').addEventListener('click', function() {
        console.log('/utilities/');
        window.location.href = 'https://gianlucaspendolini.github.io/utilities/';
    });

    console.log('altro');
    // Altro (/generic/)
    document.querySelector('#altro').addEventListener('click', function() {
        console.log('/generic/');
        window.location.href = 'https://gianlucaspendolini.github.io/generic/';
    });

    // Assegnati tutti i link
    console.log('Assegnati i link');
}