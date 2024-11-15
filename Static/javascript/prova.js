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
                // Aggiungo il "titolo" dell'elenco
                td_descrizione.append(k);

                // // Creo la lista di dettagli da inserire
                // const ul = create_changes_table(v);

                // // Aggiungo la lista
                // td_descrizione.appendChild(ul);
                console.log(k, ":", v ? v : "only k");

                // Aggiungo uno spazio
                td_descrizione.append('\n');
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
                    td_aggiunte.innerHTML = element.tAggiunte;
                }
                // Altrimenti eseguo lo stesso procedimento usato per gli elenchi
                // else {
                //     td_aggiunte.appendChild(create_changes_table(tAggiunte));
                // }
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

function create_changes_table(elemento) {
    // Se l'elemento è una stringa -> ritorno direttamente la stringa
    if (typeof elemento === 'string') {
        return elemento;
    }
    // Altrimenti
    else {
        // Creo una variabile per la linea
        let ul = document.createElement('li');
        if (Object.prototype.toString.call(elemento) === '[object Array]') {
            elemento.forEach(e => {
                // if 
            });
        }
    }
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