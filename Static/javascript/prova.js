document.addEventListener('DOMContentLoaded', () => {
    // Per controllo se funziona
    console.log('ciaoooo funziona');

    document.querySelector('#buttProva').addEventListener('click', () => {
        prova("ciaooooo ho cliccato il bottone!!!")
        });

    // Assegno ai "bottoni" il link che devono raggiungere
    /*navbar_header();*/

    console.log("file di prova js");

    fetch('./../Static/json/prova.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Errore: ${response.status}`);
        }
        return response.json();
    })
    .then(data=> {
        const container = document.getElementById('to-fill');
        data.forEach(element => {
            const div = document.createElement('div');

            div.innerHTML = element

            container.appendChild(div);
        });
    }).catch(error => {
        console.error('Errore nel caricamento del file JSON:', error)
    })
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