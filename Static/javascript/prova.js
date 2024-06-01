document.addEventListener('DOMContentLoaded', () => {
    // Per controllo se funziona
    console.log('ciaoooo funziona');
    alert("boh");

    setTimeout( () => {
        document.querySelector('#buttProva').addEventListener('click', prova("ciaooooo ho cliccato il bottone!!!"));
        }, 2000);
});


function prova(messaggio) {
    console.log(messaggio);
}