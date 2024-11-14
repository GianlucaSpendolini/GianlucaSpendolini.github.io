# GianlucaSpendolini.github.io

Non so' cosa scrivere...però mi serviva una modifica :)


# -->> UPDATE <<--
 
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
