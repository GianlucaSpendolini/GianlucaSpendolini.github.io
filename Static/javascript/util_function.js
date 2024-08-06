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
                // Creo l'elemento
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
                // Creo l'elemento
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


// Funzione per inserire i meta-tag
export function insert_in_head(meta_tags) {
    // Inserisco i meta-tag
    document.querySelector('head title').insertAdjacentHTML('beforebegin', meta_tags);
}

// Settare icona per vedere o meno password
export function togglePasswordVisibility(button, svgs) {
    let passwordField = document.getElementById("passwordField");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        button.innerHTML = svgs.barrato;
    } else {
        passwordField.type = "password";
        button.innerHTML = svgs.non_barrato;
    }
}

// Funzione per capire il mese e mettere l'SVG giusto
export function svg(month) {
    // Inizializzo la variabile
    let svgs = {};

    let icons_path = 'Static/images/icons/';
    
    // Vado a vedere il mese esatto (+1 perchè parte da 0)
    switch (month + 1) {
            
        // In caso sia pasqua
        case 4:
            
            svgs.favicon = `${icons_path}04_favicon.svg`;
            svgs.non_barrato = `${icons_path}04_nb.svg`;
            svgs.barrato = `${icons_path}04_b.svg`;
            
            break;
            
        // In caso sia estate
        case 6:
        case 7:
        case 8:
            
            svgs.favicon = `${icons_path}06_07_08_favicon.svg`;
            svgs.non_barrato = `${icons_path}06_07_08_nb.svg`;
            svgs.barrato = `${icons_path}06_07_08_b.svg`;
            
            break;
            
        // In caso sia halloween
        case 10:
            
            svgs.favicon = `${icons_path}10_favicon.svg`;
            svgs.non_barrato = `${icons_path}10_nb.svg`;
            svgs.barrato = `${icons_path}10_nb.svg`;
            
            break;
            
        // In caso sia inverno
        case 12:
            
            svgs.favicon = `${icons_path}12_favicon.svg`;
            svgs.non_barrato = `${icons_path}12_nb.svg`;
            svgs.barrato = `${icons_path}12_b.svg`;
            
            break;
        
        // In generale (default)
        default:
            
            svgs.favicon = `${icons_path}00_favicon.svg`;
            svgs.non_barrato =  `${icons_path}00_nb.svg`;
            svgs.barrato =  `${icons_path}00_b.svg`;
            
            break;
    }
    
    // Ritorno gli svg che mi servono        
    return svgs;
        
}