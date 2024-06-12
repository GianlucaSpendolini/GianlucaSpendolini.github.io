# GianlucaSpendolini.github.io

Non so' cosa scrivere...però mi serviva una modifica :)


# -->> UPDATE <<--

## 14/02/2024

Creazione primi file
- Aggiunta file index.html

Aggiunta progetto Django
- Prove se funziona
- Tolto perché non funziona*

Aggiunta file .php
- Eliminati poiché non funzionano*

Aggiornamento .gitignore
- Ignora cartelle
  - .vs
  - pycache (tolto)
- Ignora file
  - README.md
 
*poiché posso creare solo siti statici e non dinamici

## 15/02/2024

Aggiunte sezioni
- Games/
  - games.html -> games/index.html
  - scratch.html
- Projects/
  - projects/index.html
- Static/
  - css/style.css

Modifica
- index.html
  - Tolta la parte "di prova" e tenuta solo parte vera e propria
- Spostato la parte "di prova" in prova.html e messo link che punta a prova.html
- Aggiunta immagine scratch.png + ridimensionamento

## 16/02/2024

Aggiornamento .gitignore
- Descrizione migliore (con più commenti)

## 17/20/2024

Modifica index.html
- Aggiunta commento Alessia

## 20/02/2024

Aggiornamento projects/index.html
- Aggiunta collegamenti a canali instagram
- Aggiunta commento indicativo per inserimento i successivi blocchi

## 22/02/2024

Aggiunta pagine e sezioni
- /changes/
	- index.html
		- Indica ogni file sotto questa cartella e una descrizione
	- changes_table.html
		- Tabella contenente tutte le modifiche
- /generic/
	- index.html
		- Inserimento link a progetti per i miei amici (cartella di prova, per questa sezione faro' una repo su GitHub condivisa)
- /projects/web/
  - index.html
    - Indica i link ai vari siti che non fanno direttamente parte di questo progetto
- about.html
  - Pagina in cui parlo di me e fornisco contatti per potermi scrivere

Aggiornamento 
- style.css
	- Inserimento classe "movement_into_pages" per i link per "viaggiare tra le pagine"
	- Inserimento classe "tData", "tDescrizione", "tAggiunte" per la tabella dei cambiamenti (in modo che prenda la pagina)
- .gitignore
	- Inserimento prova.html (perche' avro' una sezione per la prova ma piu' avanti)
	- Inserimento generic/index.html (perche' avro' una nuova repo online che potro' accedere con il link in Home)
- index.html
  - Aggiunta parte dove parlo della pagina dove "parlo" di me

Modifica /games/
- Spostamento intera cartella sotto /project/

## 23/02/2024

Aggiornamento
- /projects/index.html
  - Lettere accentate con "lettera'"
- index.html
  - Modifica al posto del link completo, uso "/generic/"
- about.html
  - Sistemati i linl per i social e per la mail
  - Aggiunte foto per
    - Mail
    - Linkedin
    - Git Hub
    - Telegram
- /web/index.html
  - Aggiunti link per tornare a sezione precedente o alla home
- Generale
  - Cambio nome link da 'sito' a Home
 
Aggiunte
- /Static/css/photo.css
  - Contiene ogni cambiamento per ogni tipo di immagine (es icone o sfondi)
- /Static/css/table.css
  - Contiene ogni cambiamento per ogni tipo di tabelle (es generale o per contatti)

## 24/02/2024

Aggiornamento
- /css/image.css
	- Ridimensionamento loghi (10% della cella)
- /css/table.css
	- Ridimensionamento tabella generale (50% della larghezza totale)

## 26/02/2024

Aggiornamento
- /css/table.css
	- Larghezza colonne changes_table
- readme.md
	- Aggiornamento readme con data di oggi e 24/02/2024

## 27/02/2024

Aggiornamento
- /css/table.css
    - Modifica dimensioni tabella contatti (25% con 30% e 20%)
    - Aggiunto css "text-align: center;" per allineare il testo all'interno
- /css/image.css
    - Modifica dimensioni (in scala) delle icone
- about.html
    - Inserito attributo "align" con valore "center" per allineare al centro la tabella

Aggiunta in /css/table.css
- Classe "change" per diverse parti della tabella
    - Righe
    - Dati
    - Header
    - Tabella (in se')
- In modo da applicare le modifiche solo alla tabella dei cambiamenti*
    - Quella dei contatti deve essere fatta in altro modo e con altre caratteristiche

Provo con dimensioni 
- Tabella 12.5%
- Icone: 80% (poiche' abbiamo diminuito di 1/8 la dimensione della tabella -> la incremento per 8 volte)


*Non funziona -> provare con altro approccio
**Tolta poichè posso fare "attributi a discesa" usando: table.change 'tag' {}

## 21/03/2024

Aggiornamento
- prova.html
  - Suddivisione struttura pagina nei tag "header", "main" e "footer"
  - Inserimento elenchi puntati come riga
    - Applicazione distanziamento elementi (padding 10px)
    - Posizionarlo nel centro del contenitore
  - Inserimento elementi già presenti nel "body" in "main"
    - Tolti i link che rimandano ad Home poiche' gia' inserito nel menu' dell'header
- image.css
  - Le icone inserite nei footer messe con massimo e minimo dimensionamento
- style.css
  - Modifiche a tag
    - ul
    - li
    - footer
    - section
  - Colore al tag
    - "h1" negli header
    - "footer" come sfondo

## 22/03/2024

Aggiornamento
- Applicazione modifiche "body" ai tag "header" e "main" a tutti gli altri script
- Risoluzione problemi tag (in generale)
  - Centralizzazione dei contenuti rispetto ai contenitori

## 23/03/2024

Aggiornamento
- prova.html
  - Maggiore padding ai lati degli elementi del tag "ul" in header
- Applicazioni modifiche per avere url senza estensione dei file (NO /'file'.'estenzione' MA /'file')
  - Anche per /generic/
 
## 25/03/2024

Aggiornamento
- prova.html
  - Tolti i punti nei tag "section" laterali
    - Lasciati i tag laterali per permettere di metterli a 2/5 e 4/5
  - Controllo funzionamento per monitor di diverse dimensioni
- Applicazione modifiche tag "footer" a tutti gli script con sistemazione riferimenti nei tag "a"
  - Anche per /generic/

## 27/03/2024

Aggiornamento
- index.html
  - tolto il doppione del tag "hr"
- /projects/web/index.html
  - aggiornato il link che porta al sito del Mario Negri (da "clinicalweb-twin" tolto "-twin")
 
 ## 07/05/2024

 Aggiunta
 - /static/javascript/prova.js
   - funzione prova()

Aggiornamento
- prova.html
  - prova utilizzo funzione prova() con bottone "Cliccami"
 
Controlla perchè non riesce a importare file/la funzione js

## 16/05/2024

Aggiornamento
- prova.html
  - spostamento file js di prova in fondo
  - aggiunto meta tag con descrizione e per dispositivi
  - aggiunto tag nav
  - tolto l'onclick
- /Static/javascript/prova.js
  - aggiunto event listener per DOMContentLoaded
    - aggiunti alert e console log
    - aggiunto addEventListener all'id del bottone
  - modifica alla funzione di prova per fargli dire quello che metto come messaggio
- /Static/css/style.css
  - aggiunto stile per renderlo responsivo sui dispositivi più piccoli

 Aggiungere nuovo setTimeout per vedere se aggiunge il "click" al bottone;
 Vedere se si può mettere l'inserimento (giusto) automatico di elementi in header e footer

 ## 01/06/2024

 Aggiornamento
 - /javascript/prova.js
   - sistemato bottone "cliccami" per controllo codice js
   - inserimento possibilità di aggiungere link a bottoni della nav
- /css/style.css
  - aggiunti i selettori per prendere anche nav e bottoni

Bloccare ad una certa distanza i bottoni della navbar, in modo che, andando a rimpicciolire, si distanziano fino ad una distanza minima e, allargando, si allargano fino ad una certa e poi si bloccano.

## 02/06/2024

Aggiunta
- /javascript/scripts.js
  - aggiunta assegnazione automatica dei link ai bottoni tramite id
  - aggiunto controllo in base all'url
    - per parte di "/about" aggiunta l'età

Aggiornamento
- about.html
  - file js generico
  - contenitore dove inserire l'età
 
Fare in modo che i bottoni vengano inseriti in automatico ed aggiungere solo il blocco nav nei file html.

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

# Altro

...

## Modifiche di prova

25/03/2024
