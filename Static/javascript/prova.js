document.addEventListener('DOMContentLoaded', function () {
    // Per controllo se funziona
    console.log('ciaoooo funziona');
    alert("boh");

    document.querySelector('#buttProva').addEventListener('click', prova("ciaooooo"));
});


function prova(messaggio) {
    console.log(messaggio);
}