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

    // Home
    document.querySelector('#home').addEventListener('click', function() {
        fetch('https://gianlucaspendolini.github.io', {
            method: 'GET'
        });
    });
}