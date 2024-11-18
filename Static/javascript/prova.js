document.addEventListener('DOMContentLoaded', () => {
    // Per controllo se funziona
    console.log('ciaoooo funziona');

    document.querySelector('#buttProva').addEventListener('click', () => {
        prova("ciaooooo ho cliccato il bottone!!!")
        });

    // Assegno ai "bottoni" il link che devono raggiungere
    /*navbar_header();*/

    console.log("file di prova js");

    // fetch('./Static/json/prova.json')
    fetch('./Static/json/changes_table_elements.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Errore: ${response.status}`);
        }
        return response.json();
    })
    .then(data=> {
        // Container provvisorio da riempire (sostituire con il tag tbody)
        const container = document.querySelector('tbody');
        data.forEach(element => {
            // Creo la riga 
            const tr = document.createElement('tr');

            // Creo la casella per la data
            let td_data = document.createElement('td');
            td_data.className = 'tData';
            td_data.innerHTML = element.tData;
            tr.appendChild(td_data);

            // Creo la casella per la descrizione
            let td_descrizione = document.createElement('td');
            td_descrizione.className = 'tDescrizione';
            for (let [k, v] of Object.entries(element.tDescrizione)) {

                // Se non ho il valore, inserisco quella parte
                if (v) {
                    // Aggiungo il "titolo" dell'elenco
                    td_descrizione.append(k);
    
                    // Creo la lista di dettagli da inserire
                    const ul = json_to_element('ul', v);
    
                    // Aggiungo la lista
                    td_descrizione.appendChild(ul);
                    // console.log(k, ":", v ? v : "only k");
    
                    // Aggiungo uno spazio
                    td_descrizione.append('\n');
                }
            }

            // Creo la casella per commenti aggiuntivi
            let td_aggiunte = document.createElement('td');
            td_aggiunte.className = 'tAggiunte';
            // Controllo se c'è qualcosa
            if (element.tAggiunte) {

                // Prendo il contenuto
                const tAggiunte = element.tAggiunte;

                // Controllo se è una stringa
                if (typeof tAggiunte === 'string') {
                    td_aggiunte.innerHTML = tAggiunte;
                }
                // Altrimenti eseguo lo stesso procedimento usato per gli elenchi
                else {
                    // Itero ogni componente
                    for (let [k, v] of Object.entries(tAggiunte)) {

                        // Controllo se ho una coppia chiave : valore o un array
                        if (v || Object.prototype.toString.call(tAggiunte) === '[object Array]') {
                            // Se ho una coppia chiave valore -> mando la v
                            if (v) {
                                td_aggiunte.appendChild(json_to_element('ul', v));
                            }
                            // Altrimenti invio l'array
                            else {
                                td_aggiunte.appendChild(json_to_element('ul', tAggiunte));
                            }
                        }
                        // Se è una stringa -> la aggiungo normalmente
                        else {
                            td_aggiunte.append(k);
                        }
        
                        // Aggiungo uno spazio
                        td_aggiunte.append('\n');
                    }
                }
            }
            // Altrimenti inserisco, in grassetto, che non c'è nulla
            else {
                td_aggiunte.innerHTML = '<b>Niente da aggiungere</b>';
            }

            // Aggiungo i dati alla riga
            tr.appendChild(td_data);
            tr.appendChild(td_descrizione);
            tr.appendChild(td_aggiunte);

            // Aggiungo la riga alla tabella
            container.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Errore nel caricamento del file JSON:', error)
    });
});


function prova(messaggio) {
    console.log(messaggio);
}


// Funzione ricorsiva per inserire in autormatico gli elementi della tabella nel giusto formato
function json_to_element(element, json_part) {

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
                    console.log('generale: ', j);

                    // Prendo ciò che mi ritorna la funzione
                    let j_to_ul = json_to_element('ul', j);

                    // Se stringa -> inserisco la stringa e basta
                    if (typeof j_to_ul === 'string' || (j_to_ul && j_to_ul.firstChild && j_to_ul.firstChild.nodeType === Node.TEXT_NODE && j_to_ul.firstChild.nodeValue.trim() !== '')) {
                        // Creo la linea
                        let li = document.createElement('li');
                        console.log('if: ', j_to_ul);
                        // Aggiungo ciò che ritorna dalla funzione alla linea
                        // li.append(j_to_ul);
                        if (typeof j_to_ul === 'string') {
                            li.append(j_to_ul);
                        } else {
                            li.appendChild(j_to_ul);
                        }            

                        // Ogni elemento lo aggiungo come punto della lista
                        ul.appendChild(li);
                    }
                    // Altrimenti -> itero su ogni elemento e lo inserisco
                    else {
                        console.log('else: ', j_to_ul);
                        j_to_ul.childNodes.forEach(elemento => {
                            // Aggiungo ogni elemento che contiene l'ul alla lista (so che sono una serie di 'li')
                            ul.append(elemento);
                        });
                        // ul.append(j_to_ul.innerHTML);
                    }
                    
                    // li.append(j_to_ul);
                    // ul.append(li);
                });
            }
            // Altrimenti voglio che da quel momento si inserisca un sottoinsieme (sotto la 'chiave' voglio il 'valore')
            else {
                console.log('pre ul: ', json_part);
                // Itero su ogni coppia chiave:valore
                for (let [k, v] of Object.entries(json_part)) {
                    console.log('parti: ', 'k: ', k, 'v: ',  v);
                    // Creo la linea
                    let li = document.createElement('li');

                    // Aggiungo la chiave e poi il contenuto che mi ritorna
                    li.append(k);
                    li.append(json_to_element('ul', v));
                    console.log('li prima di ul: ', li);
                    console.log('ul prima di ul: ', ul);
                    // li.innerHTML = `${k}\n${json_to_element('ul', v)}`;

                    // Aggiungo l'elemento alla lista
                    ul.appendChild(li);
                    console.log('ul dentro: ', ul, 'k: ', k);
                }
                console.log('ul: ', ul);
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


function navbar_header() {

    console.log('dentro funzione');

    // Home (/)
    document.querySelector('#home').addEventListener('click', function() {
        console.log('home');
        window.location.href = 'https://gianlucaspendolini.github.io/';
    });

    // Info (/about)
    document.querySelector('#info').addEventListener('click', function() {
        console.log('/about');
        window.location.href = 'https://gianlucaspendolini.github.io/about';
    });

    // Progetti (/projects/)
    document.querySelector('#progetti').addEventListener('click', function() {
        console.log('/projects/');
        window.location.href = 'https://gianlucaspendolini.github.io/projects/';
    });

    // Utili (/utilities/)
    document.querySelector('#utili').addEventListener('click', function() {
        console.log('/utilities/');
        window.location.href = 'https://gianlucaspendolini.github.io/utilities/';
    });

    // Altro (/generic/)
    document.querySelector('#altro').addEventListener('click', function() {
        console.log('/generic/');
        window.location.href = 'https://gianlucaspendolini.github.io/generic/';
    });

    // Assegnati tutti i link
    console.log('Assegnati i link');
}