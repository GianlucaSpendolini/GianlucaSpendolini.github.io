# GianlucaSpendolini.github.io

Non so' cosa scrivere...però mi serviva una modifica :)


# -->> UPDATE <<--

## 03/06/2024

Aggiornamento
- ogni file html
  - tolti i bottoni da nav per essere inseriti in automatico
- /css/style.css
  - dato alla nav justyfy-content: space-evenly
- /javascript/scripts.js
  - creata funzione per inserire in automatico i bottoni (inserita nel DOMContentLoaded)
 
Fare in modo di centrare i bottoni: prova ad inserire un div (con align center) dentro il quale mettere il nav (togli display grid e metti flex).

## 04/06/2024

Aggiornamento
- ogni file html
  - sostituzione tag nav con tag 'div' (id = nav-bar) dentro il quale colloco la nav
- /css/style.css
  - centrata la nav e data una larghezza massima
  - sostituito la display 'grid' con 'flex' (direction column)
  - dato al footer la proptietà justify-content = space-evenly
 
Inserisci in automatico "section" o le cose dentro "section" dando ad entrambi degli id per riferimento.

## 13/06/2024

Aggiornamento
- ogni file html
  - tolto contenuto main e footer per inserimento automatico tramite js (se url non inizia con /generic/)
- /javascript/scripts.js
  - modifica a funzioni per header -> inserito in automatico il contenuto
  - aggiunta funzione per inserimento automatico del footer
  - aggiunto switch-case per capire in che pagina ci troviamo e fare azioni di conseguenza
- /css/style.css
  - modifica padding di aside in 'about'
 
Fare in modo che, per schermo molto stretto, il footer non sbordi ma resti in colonna.

## 15/06/2024

Aggiornamento
- /projects/games/scratch
  - aggiunti quasi tutti i link per i giochi di scratch
  - aggiunte le descrizioni dei giochi e relativi avvertimenti
- /projects/
  - corretto riferimento nella pagina per #games
- /about
  - inserimento link per riferimenti nella pagina delle varie sezioni
  - aggiunti titoli per presentazione e contatti/cv
 
Inserire un modo per inviare mail in changes o da qualche altra parte. 
Inserire gioco di gruppo su /scratch.

## 16/06/2024

Aggiornamento
- /about
  - correzione elenco per introduzione aggiungendo punti laterali
  - correzione "." con ":" per introduzione
  - correzione attributo name (introduzione - presentazione)
- /css/style.css
  - inizio suddivisione file per parte generale/in comune/specifiche
 
## 18/06/2024

Aggiunta
- /Static/javascript/util_class.js
  - file creato per contenere tutte le classi che posso importare ed usare in altri file js
- /Static/javascript/util_function.js
  - contiene le funzioni che posso importare ed usare anche in altri file js
  - funzione per inserire in automatico file js e css
  - funzione per inserire i meta tag
- /Static/css/media.css
  - contiene tutte le '@media' query per tutti i file
  - riadattamento parti codice in base a dimensione schermo
 
Aggiornamento
- tutti i file html
  - tolti tutti i meta-tag perchè inseriti automaticamente tramite js
- /Static/javascript/scripts.js
  - spostata funzione points_number in util_function.js
  - aggiunto inserimento automatico tag meta
- /Static/css/style.css
  - spostati codici css '@media' in media.css
  - suddivisione file in base allo scopo del codice (maggiore ordine)
 
Sistemare footer nel riadattamento schermo cellulare quando è orizzontale (icone escono).
Rendere non automatico l'overflow del nav in /about in modo da mettere la descrizione sopra e non a lato e sotto inserire la parte descrittiva (anch'essa non auto l'overflow): mettere flex-direction column?

## 09/07/2024

Aggiornamento
- /Static/javascript/util_function.js
  - aggiunte nuove funzioni per scambiare icona in base a vedo/non vedo la password
  - aggiunta funzione per scegliere le icone in base al mese

Sistema la funzione in modo che restituisca l'icona.

## 10/07/2024

Aggiunta
- /Static/image/icons/
  - icone in formato svg
- /Static/javascript/
  - util_variable.js
    - inserimento variabili utili globali
 
Aggiornamento
- /Static/javascript/util_function.js
  - migliorata funzione per selezionare icone in base al mese in modo che seleziona solo nome dell'icona con path
  - cambiato nome per la funzione insert_meta -> insert_in_head
- /Static/javascript/scripts.js
  - inserito dell'icona favicon prima dei tag meta
  - importazione variabili globali utili da file esterno

# Altro

...

## Modifiche di prova

25/03/2024
