/* 
    FUNZIONI UTILI 
        - points_number
*/

// Creo un array di 'punti' per tornare sempre alla home (./../etc)
export function points_number(path) {
    // Faccio lo split
    var s = path.split('/');

    // Tolgo il primo e l'ultimo elemento
    s.shift();
    s.pop();

    // Creo l'array al quale mettero' eventuali puntini doppi
    var a = './';

    // Itero per vedere se e quanti puntini devo aggiungere
    for (const e in s) {
        a += '../';
    }

    // Ritorno l'array
    return a;
}


// Funzione per aggiungere i file js e css
export function add_css_js(points_path) {
    /* File generali per ogni pagina */

    // Lista generale 
    var lista_generale = {
        css: [
            `${points_path}Static/css/image.css`,
            `${points_path}Static/css/media.css`,
            `${points_path}Static/css/style.css`,
            `${points_path}Static/css/table.css`
        ],
        js: [
            ``
        ]
    };

    // Itero la lista generale contenente CSS e JS
    for (var type in lista_generale) {

        // CSS
        if (type === 'css') {
            for (const path of lista_generale[type]) {
                // Creo il documento
                var css = document.createElement('link');
                // href
                css.href = path;
                // rel
                css.rel = 'stylesheet';
                // type
                css.type = 'text/css';
                // media
                css.media = 'screen';
                // Aggiungo l'elemento all'head
                document.querySelector('head').appendChild(css);
            }
        }

        // JavaScript
        else if (type === 'js') {
            for (const path of lista_generale[type]) {
                // Creo il documento
                var js = document.createElement('script');
                // src
                js.src = path;
                // type
                js.type = 'module';
                // media
                js.media = 'screen';
                // Aggiungo l'elemento al body
                document.querySelector('body').appendChild(js);
            }
        }
    };
}


// Funzione per capire in che pagina sono e fare determinate cose
export function what_page(path) {

    // Seleziono il tag 'title'
    var title = document.querySelector('title');

    // Seleziono il tag 'header'
    var header_title = document.querySelector('h1.title');

    switch (path) {

        // Prova
        case '/prova':
            //navbar_header();
            //creazione_header();
            console.log('Ciao prova');

            // Titolo
            title.innerHTML = 'Prova';

            // Header title
            header_title.innerHTML = 'Prove';

            break;

        // Home
        case '/':

            //Titolo
            title.innerHTML = 'Home';

            // Header title
            header_title.innerHTML = 'Home';

            break;

        // About
        case '/about':

            // Titolo
            title.innerHTML = 'Contatti';

            // Header title
            header_title.innerHTML = 'About me';

            // Prendo la classe Date per assegnarla da una variabile
            const date = new Date();

            // Calcolo la mia eta'
            var my_age = date.getFullYear() - 2001;

            // Se e' prima del mio compleanno -> vado in dietro di 1 anno
            if (date.getDate() < 11 || (date.getMonth() + 1) < 9) {
                my_age -= 1;
            }

            // Inserisco il mio anno nella presentazione
            document.querySelector('#my-age').innerHTML = my_age;

            break;

        // Changes
        case '/changes/':

            // Titolo
            title.innerHTML = 'Changes';

            // Header title
            header_title.innerHTML = 'Changes';

            break;

        // /changes_table
        case '/changes/changes_table':

            // Titolo
            title.innerHTML = 'Changes table';

            // Header title
            header_title.innerHTML = 'Tabella dei cambiamenti';

            break;

        // Projects
        case '/projects/':

            // Titolo
            title.innerHTML = 'Projects';

            // Header title
            header_title.innerHTML = 'Progetti';

            break;

        // /games/
        case '/projects/games/':

            // Titolo
            title.innerHTML = 'Games';

            // Header title
            header_title.innerHTML = 'Games';

            break;

        // /games/scratch
        case '/projects/games/scratch':

            // Titolo
            title.innerHTML = 'Scratch';

            // Header title
            header_title.innerHTML = 'Pagina di scratch';

            break;

        // /web/
        case '/projects/web/':

            // Titolo
            title.innerHTML = 'Sites';

            // Header title
            header_title.innerHTML = 'Siti';

            break;

        // Utilities
        case '/utilities/':

            // Titolo
            title.innerHTML = 'Utilities';

            // Header title
            header_title.innerHTML = 'Utilities';

            break;

        default:
            // Non faccio nulla
    }
}