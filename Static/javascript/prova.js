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

    // Home
    document.querySelector('#home').addEventListener('click', function() {
        console.log('home');
        fetch('https://gianlucaspendolini.github.io/', {
            method: 'GET',
            redirect: 'follow'
        })
        .then((response) => {
            // Controllo che risposta mi restituisce
            console.log(response);
        });
    });
}