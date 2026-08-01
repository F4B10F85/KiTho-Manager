# KiTho Business

> Project Journal


# SALVATAGGI

git add .

git commit -m ""

git push


# LOGIN PER SVILUPPO
assets/config/version.js
developerMode: true

modules/core/app.js








# LOGIN REALE
assets/config/version.js
developerMode: fasle

modules/core/app.js
commentare:
/**
function buildApplication() {
    if (APP.developerMode) {
        const user = findUser("FABIO.FILIPPINI");
        setCurrentUser(user);
        buildLayout();
        navigate("dashboard");
        return;
    }
    showLogin();
}
*/






# DECISIONI

## DEC-001
**Data:** 21/07/2026

**Titolo**
Nome del progetto

**Decisione**
Il nome ufficiale del gestionale è:

KiTho Business

**Motivazione**
Nome ritenuto più rappresentativo del progetto.

---

## DEC-002

**Titolo**
Database

**Decisione**

Firebase

---

## DEC-003

**Titolo**
Architettura

**Decisione**

HTML + CSS + JavaScript Vanilla.

---

# IDEE FUTURE

## IDEA-001

Sidebar Preferiti

**Stato**

Da valutare

**Descrizione**

Sidebar destra personalizzabile con accessi rapidi.

**Motivazione**

Ridurre il numero di click nelle operazioni quotidiane.

---

## IDEA-002

Dashboard dinamica

**Stato**

In standby

**Descrizione**

Dashboard diversa per ogni ruolo utente.

---

# ROADMAP

## Versione 0.1

- [x] Ambiente sviluppo
- [x] Layout Engine
- [ ] Login
- [ ] Dashboard
- [ ] Nuovo Ordine
- [ ] Clienti

MILESTONE M3

Navigation Engine

✔ Router funzionante

✔ Workspace dinamico

✔ Navigazione tra moduli

Versione completata


21/07/26 - 23:26

Cosa comprende questo commit

✅ Introduzione del Breadcrumb Engine.

✅ Header dinamico.

✅ Separazione tra nome dell'applicazione e breadcrumb.

✅ Introduzione delle variabili CSS per i colori.

✅ Miglioramento dell'organizzazione dei componenti CSS.

✅ Sidebar con stato attivo già funzionante.

Siamo a questo punto del progetto
KiTho Business

✔ Layout Engine
✔ Navigation Engine
✔ Workspace Engine
✔ Breadcrumb Engine

↓

Prossimo:
Clienti >> anagrafiche




M5 - Sidebar Engine

e comprenderà:

✅ menu con sottomenù;
✅ apertura/chiusura con animazione;
✅ evidenziazione della voce attiva;
✅ gestione tramite struttura dati;
✅ base pronta per la futura sidebar dei Preferiti (la tua idea, che continuo a ritenere ottima).

Questa milestone chiuderà definitivamente il sistema di navigazione.


Specifica M5 - Sidebar
Voce padre
👥 Anagrafiche                     ▶

Caratteristiche:

icona a sinistra;
testo allineato a sinistra;
freccia completamente a destra;
la freccia ruota all'apertura.


📘 KiTho Business - Standard Sidebar v1.0
Menu principale
icona a sinistra;
testo allineato a sinistra;
freccia all'estrema destra se esistono sottomenù;
nessuna freccia se il menu non ha figli;
pulsante a tutta larghezza;
altezza uniforme.
Sottomenu
stessa larghezza del menu principale;
maggiore padding sinistro;
nessuna icona;
simbolo grafico generato via CSS (::before);
animazione di apertura/chiusura;
click sull'intera riga.
Voce selezionata

La voce attiva avrà:

leggero sfondo;
bordo sinistro colorato (molto sottile);
testo leggermente più marcato.

Non la farei diventare di un blu acceso o verde fluorescente. I gestionali devono accompagnare il lavoro per ore. Un'interfaccia che "urla" stanca.

Menu padre aperto

Quando sei dentro una sottovoce:

👥 Anagrafiche                     ▼

    Clienti        ← attivo

    Fornitori

    Agenti

    Trasportatori

il menu padre rimane aperto automaticamente.

Non deve richiudersi ogni volta che cambi pagina.


Un'altra proposta (questa la metto "in osservazione")

Le frecce:

▶
▼

sono perfette per partire.

In futuro, però, potremmo sostituirle con piccole icone SVG disegnate da noi, animate con una rotazione di 90°. Avremmo un aspetto più uniforme rispetto alle emoji e un controllo totale su dimensioni, spessori e colori.

Non lo farei ora.

Ora usiamo quello che è semplice e funziona. Lo segniamo semplicemente come possibile evoluzione grafica.



M5 - Sidebar Engine

- Sidebar generata dinamicamente
- Menu espandibili
- Supporto ai sottomenu
- Rotazione frecce
- Hover
- Linea guida
- Struttura pronta per moduli futuri


E domani mattina apriamo una milestone completamente nuova:

M6 - Application State

Da lì nascerà uno "stato centrale" che useranno:

sidebar;
router;
breadcrumb;
header;
workspace;
form;
notifiche.

E quando torneremo sulla sidebar, aggiungere la memoria del menu aperto richiederà letteralmente tre righe, invece di dover ripensare tutto.


## UI / UX Architecture Rules

Nessuna finestra deve far "saltare" il layout

Cioè:

una tabella enorme non allarga la sidebar;
una descrizione lunghissima non sposta l'header;
un nome cliente di 80 caratteri non rompe una colonna;
un menu con 37 voci non allunga la pagina.

Ogni zona del gestionale ha i propri limiti e il proprio comportamento di overflow.




Una piccola rifinitura che mi annoterei

Quando blocchiamo l'accesso ad una pagina, oggi mostriamo:

alert("Accesso negato.");

Per la versione attuale va benissimo.

Però io me lo segnerei come TODO.

In una versione più rifinita farei comparire un popup interno di KTB (coerente con la grafica del gestionale) invece dell'alert() del browser, che è un po' spartano. Ma non gli dedicherei nemmeno un minuto adesso: non aggiunge valore funzionale.

## togliere e mettere il login

in config/version.js   e  in modules/core/app.js


Ti propongo una "Developer Mode"

Nel nostro config/version.js (che ormai sta diventando il file delle impostazioni globali) aggiungiamo una proprietà:

"use strict";

const APP = {

    name: "KiTho Business",

    version: "0.7.0",

    milestone: "M7",

    copyright: "© 2026 KiTho Business",

    developerMode: true   <<<<<<<<<<<  CAMBIARE QUESTO IN FALSE >>>>>>>>>>>

};
Poi in buildApplication()

Oggi hai qualcosa del genere:

function buildApplication() {

    showLogin();

}

Lo trasformiamo in:

function buildApplication() {

    if (APP.developerMode) {

        const user = findUser("FABIO.FILIPPINI");

        setCurrentUser(user);

        buildLayout();

        navigate("dashboard");

        return;

    }

    showLogin();

}
Risultato

Quando sviluppi:

developerMode: true

Apri KTB e sei immediatamente dentro come Admin.

Quando vuoi tornare alla modalità normale:

developerMode: false

e ricompare il login.



# DATI SEZIONE AZIENDA

TAB 1 - Generale
Ragione sociale
Nome commerciale
Codice azienda (eventuale)
Logo
Descrizione
TAB 2 - Contatti
Indirizzo
CAP
Città
Provincia
Stato
Telefono
Cellulare
Email
PEC
Sito web
TAB 3 - Fiscale
Partita IVA
Codice fiscale
Codice SDI
REA
Capitale sociale (se servirà)
Regime IVA (eventuale)
TAB 4 - Banca
Banca
IBAN
BIC/SWIFT
Intestatario conto
TAB 5 - Branding
Logo
Colore principale
Colore secondario
Firma documenti
Timbro (eventuale)

# Mxx - Versioning & Deployment
⏳ Versionamento semantico (SemVer)
⏳ version.json generato automaticamente
⏳ Build automatica
⏳ Numero commit visualizzato
⏳ Data dell'ultima release
⏳ Changelog automatico
⏳ Eventuale controllo aggiornamenti

# TASK TABELLA

Una precisazione importante

Fra qualche giorno, quando renderemo dinamico il documento, non fisseremo l'altezza della tabella, ma quella dell'area articoli.

Questo perché:

se hai 3 righe, ci saranno molti spazi vuoti;
se hai 30 righe, la tabella si fermerà a fine area e continuerà sulla pagina successiva.

TODO - Gestione dinamica dei layout di stampa

Area articoli a dimensione fissa, contenuto variabile

Regole:

L'area destinata agli articoli ha altezza fissa (es. 150 mm).
La tabella non ha altezza fissa: riempie l'area disponibile.
Se le righe sono poche, rimane spazio bianco.
Se le righe eccedono l'area disponibile:
viene generata automaticamente una nuova pagina;
l'intestazione della tabella (Codice, Descrizione, ecc.) viene ripetuta;
il numero pagina viene aggiornato;
il riporto dei totali viene gestito solo nell'ultima pagina (o secondo le regole che decideremo).

In futuro il renderer dovrà quindi:

calcolare l'altezza di una riga;
sapere quante righe stanno nell'area articoli;
suddividere automaticamente il documento in più pagine.

Questa è una funzionalità che non va improvvisata. Conviene progettare il renderer con questa logica fin dall'inizio, perché rifarla dopo sarebbe molto più costoso.

Io la considererei una milestone del modulo documenti, non un semplice dettaglio. È una di quelle cose che, una volta implementata bene, verrà riutilizzata identica per ordini, DDT, fatture, packing list e qualsiasi altro documento stampabile.

# Roadmap - Migrazione dati

📌 Roadmap - Migrazione dati
Obiettivo

Consentire a un'azienda già operativa di iniziare a usare KM senza dover ricreare manualmente il proprio archivio storico.

Formati supportati
CSV
Excel (.xlsx)
Entità importabili
Clienti
Fornitori
Articoli
Agenti
Listini
Ordini
DDT
Fatture
Workflow
Selezione file
Anteprima dati
Mappatura colonne → campi KM
Validazione
Importazione
Report finale (importati, duplicati, errori)
Caratteristiche
Nessuna sovrascrittura accidentale.
Possibilità di aggiornare record esistenti.
Gestione duplicati.
Report errori scaricabile.
Motore unico riutilizzabile per tutte le entità.
E aggiungo una nota

Secondo me questa funzione sarà anche un ottimo argomento commerciale.

Perché potrai dire:

"Passare a KM richiede pochi minuti: importa il tuo archivio clienti, fornitori e articoli direttamente da Excel e sei operativo."

È una frase che abbassa tantissimo la barriera all'adozione.