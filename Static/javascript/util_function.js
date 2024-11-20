/* 
    FUNZIONI UTILI 
        - add_css_js
            - Funzione per aggiungere i file js e css
        - insert_in_head
            - Funzione per inserire i meta-tag
        - json_to_element
            - Funzione ricorsiva per inserire in autormatico gli elementi della tabella nel giusto formato
        - points_number
            - Creo un array di 'punti' per tornare sempre alla home (./../etc)
        - svg
            - Funzione per capire il mese e mettere l'SVG giusto
        - togglePasswordVisibility
            - Settare icona per vedere o meno password
*/


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

            // Seleziono l'head
            let head = document.querySelector('head');

            // Itero su ogni componente da aggiungere
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
                head.appendChild(css);
            }
        }

        // JavaScript
        else if (type === 'js') {

            // Seleziono il corpo 
            let body = document.querySelector('body');

            // Itero su ogni componente da aggiungere
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
                body.appendChild(js);
            }
        }
    };
}


// Funzione per creare un percorso cliccabile da inserire nell'apposita sezione
export function clickable_path(path) {

    // Prendo gli elementi del percorso
    let path_elements = path.split('/');

    // Creo una lista momentanea da usare (copiata dalla originale)
    let elements_list_copy = path_elements;

    // Tolgo il primo e l'ultimo elemento
    path_elements.shift();
    path_elements.pop();

    // Variabile per contare di quanto devo tornare indietro
    let count = path_elements.length;

    // Creo la variabile da restituire
    let path_to_move_into_pages = [];

    // Itero su ogni componente
    for (let e of path_elements) {
        
        // // Creo l'array al quale mettero' eventuali puntini doppi
        // let rif = './';
    
        // // Itero per vedere se e quanti puntini devo aggiungere
        // for (let i = 0; i < count; i++) {
        //     rif += '../';
        // }

        // Creo l'elemento in cui inserire il riferimento
        let a = document.createElement('a');

        // Aggiungo il nome e l'attributo di riferimento
        a.innerHTML = e;
        a.href = points_number(elements_list_copy.join('/'));

        // Inserisco l'elemento alla lista
        path_to_move_into_pages.push(a);

        // Elimino il secondo elemento della lista 
        delete elements_list_copy[1];
    }

    // Ritorno l'array
    return path_to_move_into_pages.join(' / ') + ' /';
}


// Funzione per inserire i meta-tag
export function insert_in_head(meta_tags) {
    // Inserisco i meta-tag
    document.querySelector('head title').insertAdjacentHTML('beforebegin', meta_tags);
}


// Funzione ricorsiva per inserire in autormatico gli elementi della tabella nel giusto formato
export function json_to_element(element, json_part) {

    // Se l'elemento è una stringa -> ritorno direttamente la stringa
    if (typeof json_part === 'string') {
        return json_part;
    }

    // Altrimenti, creo la variabile nella quale inserire l'elemento definitivo...
    let element_to_return = null;

    // ...e controllo che elemento voglio
    switch (element) {

        // caso 'ul'
        case 'ul':
            // Creo una variabile per l'elenco
            let ul = document.createElement('ul');

            // Se l'elemento è un array -> voglio l'elenco puntato (fornisco una serie di punti)
            if (Array.isArray(json_part)) {
                // Per ogni elemento -> appendo ciò che ritorna dalla funzione (perchè ogni elemento della lista)
                json_part.forEach(j => {

                    // Prendo ciò che mi ritorna la funzione
                    let j_to_ul = json_to_element('ul', j);

                    // Se stringa -> inserisco la stringa e basta
                    if (typeof j_to_ul === 'string' || (j_to_ul && j_to_ul.firstChild && j_to_ul.firstChild.nodeType === Node.TEXT_NODE && j_to_ul.firstChild.nodeValue.trim() !== '')) {
                        
                        // Creo la linea
                        let li = document.createElement('li');

                        // Aggiungo ciò che ritorna dalla funzione alla linea
                        li.append(j_to_ul);          

                        // Ogni elemento lo aggiungo come punto della lista
                        ul.appendChild(li);
                    }
                    // Altrimenti -> itero su ogni elemento e lo inserisco
                    else {

                        // Per ogni figlio dell'elemento -> lo aggiungo alla lista ul
                        while (j_to_ul.firstChild) {
                            ul.append(j_to_ul.firstChild);
                        }
                    }
                });
            }
            // Altrimenti voglio che da quel momento si inserisca un sottoinsieme (sotto la 'chiave' voglio il 'valore')
            else {
                // Itero su ogni coppia chiave:valore
                for (let [k, v] of Object.entries(json_part)) {
                    
                    // Creo la linea
                    let li = document.createElement('li');

                    // Aggiungo la chiave e poi il contenuto che mi ritorna
                    li.append(k);

                    // Se è una stringa -> lo faccio diventare array
                    if (typeof v === 'string') {
                        li.append(json_to_element('ul', [v]));
                    }
                    // Altrimenti continuo come prima
                    else {
                        li.append(json_to_element('ul', v));
                    }

                    // Aggiungo l'elemento alla lista
                    ul.appendChild(li);
                }
            }

            // Assegno l'elemento
            element_to_return = ul;

            break;

        // Caso generico
        default:
            break;
    }

    // Ritorno l'elemento
    return element_to_return;
}


// Creo un array di 'punti' per tornare sempre alla home (./../etc)
export function points_number(path) {
    console.log(path);
    // Faccio lo split
    var s = path.split('/');

    // Tolgo il primo e l'ultimo elemento
    s.shift();
    s.pop();

    // Creo l'array al quale mettero' eventuali puntini doppi
    var a = './';

    // Itero per vedere se e quanti puntini devo aggiungere
    for (let e of s) {
        a += '../';
    }

    // Ritorno l'array
    return a;
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