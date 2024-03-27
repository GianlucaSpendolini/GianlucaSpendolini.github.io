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

# Altro

...

## Modifiche di prova

25/03/2024
