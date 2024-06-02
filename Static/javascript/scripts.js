document.addEventListener('DOMContentLoaded', () => {
    // Cose da fare inizialmente (inserire connessioni nei bottoni)

    // In base alla sezione in cui mi trovo, faccio qualcosa
    setTimeout(what_page(window.location.pathname), 0);
});


function what_page(path) {
    // Prova
    if (path === '/prova') {
        alert('Ciao prova');
    }

    // About
    if (path === '/about') {
        const date = new Date();
        var my_age = date.getFullYear() - 2001;

        if (date.getDate() < 11 || (date.getMonth() + 1) < 9) {
            my_age -= 1;
        }
        // Inserisco il mio anno nella presentazione
        document.querySelector('#my-age').innerHTML = my_age;
    }
}