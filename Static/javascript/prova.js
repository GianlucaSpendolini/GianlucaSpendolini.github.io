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
            let td_escrizione = document.createElement('td');
            td_escrizione.className = 'tDescrizione';
            for (let [k, v] of Object.entries(element.tDescrizione)) {
                // Aggiungo il "titolo" dell'elenco
                td_escrizione.append(k);
                // Creo la lista iniziale
                const ul = document.createElement('ul');
                // Continuo con anche la funzione per prendere ogni elemento e farlo diventare un elenco
                console.log(k, ":", v ? v : "only k");

                // Aggiungo uno spazio
                td_escrizione.append('\n');
            }

            // Creo la casella per commenti aggiuntivi
            let td_aggiunta = document.createElement('td');
            td_aggiunta.className = 'tAggiunta';

            // Controllo se c'è qualcosa
            // Altrimenti inserisco, in grassetto, che non c'è nulla

            container.appendChild(ul);
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