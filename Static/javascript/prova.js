document.addEventListener('DOMContentLoaded', () => {
    // Per controllo se funziona
    console.log('ciaoooo funziona');
    alert("boh");

    setTimeout( function() {
        document.querySelector('#buttProva').addEventListener('click', prova("ciaooooo ho cliccato il bottone!!!"));
        }, 250);
});


function prova(messaggio) {
    console.log(messaggio);
}