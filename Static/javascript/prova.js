document.addEventListener('DOMContentLoaded', () => {
    // Per controllo se funziona
    console.log('ciaoooo funziona');

    document.querySelector('#buttProva').addEventListener('click', () => {
        prova("ciaooooo ho cliccato il bottone!!!")
        });

    //alert("boh");
});


function prova(messaggio) {
    console.log(messaggio);
}