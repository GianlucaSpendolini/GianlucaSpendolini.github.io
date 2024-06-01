document.addEventListener('DOMContentLoaded', () => {
    // Per controllo se funziona
    console.log('ciaoooo funziona');

    setTimeout( () => {
        document.querySelector('#buttProva').addEventListener('click', prova("ciaooooo ho cliccato il bottone!!!"));
        }, 2000);

    //alert("boh");
});


function prova(messaggio) {
    console.log(messaggio);
}