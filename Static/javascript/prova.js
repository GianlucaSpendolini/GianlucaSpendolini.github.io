document.addEventListener('DOMContentLoaded', () => {
    // Per controllo se funziona
    console.log('ciaoooo funziona');

    document.querySelector('#buttProva').addEventListener('click', () => {
        prova("ciaooooo ho cliccato il bottone!!!")
        });

    // Assegno ai "bottoni" il link che devono raggiungere
    navbar_element_clicked();

    //alert("boh");
});


function prova(messaggio) {
    console.log(messaggio);
}


function navbar_element_clicked() {

    console.log('dentro funzione');

    // Home
    document.querySelector('#home').addEventListener('click', function() {
        console.log('home');
        fetch('https://gianlucaspendolini.github.io', {
            method: 'GET'
        });
    });
}