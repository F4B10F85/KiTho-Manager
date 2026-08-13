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

# PROMEMORIA PER CONFIGURATORE

Cosa mi serve per capire quanto è riutilizzabile?

Molto meno di quello che pensi.

Mi servono principalmente 4 cose.

1.

La struttura delle cartelle.

Mi basta l'albero.

Tipo

configurator/

components/

services/

data/

...
2.

Il punto di ingresso.

Cioè:

initConfigurator()

showConfigurator()

renderConfigurator()


Qual è la funzione che fa partire tutto.

3.

Come sono strutturati i dati.

Ad esempio

skins[]

sizes[]

decorations[]

...

oppure

JSON.

4.

Come viene generato il codice finale.

Quella funzione mi interessa tantissimo.

Perché secondo me diventerà una funzione "core" di KTB.

Cosa NON mi serve.

Tutto il CSS.

Quello si adatta.

Tutte le pagine.

Tutti gli HTML.

Tutte le icone.

Ti dico già una cosa che farei.

Io estrarrei il configuratore in questo modo.

modules/

configurator/

configurator.js

configurator-render.js

configurator-events.js

configurator-code.js

configurator-data.js

configurator-ui.js

Così il giorno che servirà configurare:

un articolo
una produzione
una variante
un preventivo

richiami semplicemente

openConfigurator()

e lui restituisce

{

    code:

    "KT.CS.XXS.YEL.01.05.00",

    ...

}

# REGOLA PER CREAZIONE PAGINA / MENU

Quando aggiungi una nuova pagina in KiTho, ormai il rito è sempre questo:

✅ menu.js (o il menu dove compare la voce)
✅ router.js
✅ workspace.js (che è quello che ti ha fregato)
✅ index.html (se c'è un nuovo file JS)
✅ controllare che i nomi delle funzioni coincidano


# POPUP COMPONENTE DISTINTA BASE

nel file items-selector.js c'è questo alert:

if(duplicate){

        alert("Questo componente è già presente nella distinta.");

        input.value = "";

        closeItemResults();

        input.focus();

        return;

    }


sarà da sostituire con il popup classico

# IMPORTAZIONE DISTINTA BASE DA EXCEL - PROSSIMA IMPLEMENTAZIONE

1. Excel: una riga = un componente

Non farei un Excel con una riga per distinta e colonne tipo Figlio1, Figlio2, Figlio3. Diventa ingestibile appena una distinta cresce.

Userei invece un formato del genere:

Codice Padre	Descrizione Padre	Codice Componente	Descrizione Componente	Q.tà	U.M.	Tipo
ART001	Tavolo completo	ART010	Piano	1	PZ	Componente
ART001	Tavolo completo	ART011	Gamba	4	PZ	Componente
ART001	Tavolo completo	ART012	Vite M8	8	PZ	Componente
ART002	Sedia completa	ART020	Seduta	1	PZ	Componente
ART002	Sedia completa	ART021	Gamba	4	PZ	Componente

Questo è il formato piatto, ma contiene già la relazione padre → figlio.

2. E per le distinte a due livelli?

Qui viene la parte interessante.

Se ART001 contiene ART010, e ART010 a sua volta ha una propria distinta:

ART001
├── ART010  Piano
│   ├── ART100  Tavola grezza
│   └── ART101  Bordo
├── ART011  Gamba
└── ART012  Vite

nell'Excel avremmo semplicemente:

Padre	Componente	Q.tà
ART001	ART010	1
ART001	ART011	4
ART001	ART012	8
ART010	ART100	1
ART010	ART101	1

Non serve una colonna "livello" per ricostruire la struttura.

Il livello viene ricavato dal rapporto:

ART001 → ART010 → ART100

Questa è una soluzione molto più robusta.

3. La cosa fondamentale: il codice padre deve esistere

A differenza dell'importazione clienti, qui non genererei automaticamente il codice della distinta.

La distinta appartiene a un articolo già presente nell'anagrafica Articoli.

Quindi:

Codice Padre = codice articolo esistente

Il sistema deve verificare:

ART001 → esiste negli articoli?

Se non esiste:

❌ Articolo padre ART001 non presente nell'anagrafica.

Stessa cosa per i componenti.

Se ART010 non esiste, abbiamo un problema da segnalare prima dell'importazione.

4. La procedura di importazione

La farei praticamente come abbiamo fatto con Articoli e Clienti, ma con qualche controllo in più.

Step 1

Importa Excel

↓

Step 2

Anteprima

Mostra:

nome file
foglio
numero righe
prime righe

↓

Step 3

Associa colonne

Campi:

Codice Padre ⭐
Codice Componente ⭐
Descrizione Componente
Quantità ⭐
U.M.
Tipo Componente

La descrizione del padre non la renderei obbligatoria, perché possiamo recuperarla dall'anagrafica articoli.

Anzi, idealmente nemmeno la importerei.

5. Poi farei un riepilogo molto più intelligente

Per esempio:

Riepilogo importazione distinte

🟢 12 distinte valide
🟢 48 componenti validi

🟡 3 distinte già presenti

🔴 2 articoli padre inesistenti

🔴 4 componenti inesistenti

🔴 1 codice componente duplicato nella stessa distinta

⚠️ 2 righe con quantità non valida

⚠️ 1 ciclo rilevato

Quest'ultimo controllo è fondamentale.

6. Il controllo dei cicli

Questo è il problema che non abbiamo con clienti o articoli.

Immagina:

ART001
└── ART002

ART002
└── ART001

Hai creato un ciclo.

Oppure:

ART001
└── ART002
    └── ART003
        └── ART001

Il gestionale dovrebbe rifiutare l'importazione.

Perché altrimenti abbiamo costruito una distinta infinita. Il genere di capolavoro che fa felice solo chi vende consulenze di debugging.

7. E c'è un altro controllo che farei

Se nel file abbiamo:

ART001 → ART010
ART001 → ART010

non importerei semplicemente due righe.

Direi:

⚠️ Il componente ART010 è presente più volte nella distinta ART001.

Poi possiamo decidere se:

bloccare l'importazione
oppure sommare automaticamente le quantità

Io preferisco bloccare e far correggere l'Excel, almeno nella prima versione. È molto più sicuro.

8. La struttura interna

Alla fine il sistema deve costruire qualcosa del genere:

{
    article: {
        code: "ART001",
        description: "Tavolo completo",
        family: "..."
    },

    components: [

        {
            code: "ART010",
            description: "Piano",
            unit: "PZ",
            quantity: 1,
            type: "..."
        },

        {
            code: "ART011",
            description: "Gamba",
            unit: "PZ",
            quantity: 4,
            type: "..."
        }

    ],

    componentsCount: 2,
    lastEdit: "..."
}

Quindi non cambierei la struttura delle BOM già esistente nel gestionale.

Cambierei solamente il modo in cui l'importatore ricostruisce quei dati.

9. Ma soprattutto: come prepari l'Excel?

Io preparerei un template ufficiale "Import Distinte Base.xlsx".

Con una prima riga intestazioni:

Codice Padre
Codice Componente
Quantità
U.M.
Tipo Componente

e magari una seconda riga di esempio, evidenziata o separata, che poi l'utente può cancellare.

Il file reale sarebbe quindi:

Codice Padre | Codice Componente | Quantità | U.M. | Tipo Componente
ART001       | ART010             | 1        | PZ   | Componente
ART001       | ART011             | 4        | PZ   | Componente
ART001       | ART012             | 8        | PZ   | Componente
ART010       | ART100             | 1        | PZ   | Componente
ART010       | ART101             | 2        | PZ   | Componente

E questo permette al gestionale di ricostruire automaticamente:

ART001
├── ART010
│   ├── ART100
│   └── ART101
├── ART011
└── ART012

senza che l'utente debba dirgli esplicitamente "questo è livello 1, questo livello 2".

La mia scelta definitiva

Non farei un Excel gerarchico.

Farei:

Excel piatto → validazione → ricostruzione gerarchica nel gestionale.

E metterei tre livelli di sicurezza:

Anagrafica: padre e componenti devono esistere.
Struttura: niente duplicati e niente cicli.
Dati: quantità obbligatoria e > 0, U.M. coerente, campi identificativi validi.

In più, per la prima versione, permetterei tranquillamente N livelli, anche se oggi normalmente usiamo due. Così non dobbiamo riscrivere l'importatore quando qualcuno scopre improvvisamente che un prodotto contiene un semilavorato che contiene un altro semilavorato. La legge universale delle distinte base è che saranno sempre un livello più profonde del previsto.


# FATTURAZIONE ELETTRONICA

L'Agenzia delle Entrate conferma che le fatture elettroniche devono essere trasmesse tramite SdI e che, tra i canali disponibili, esistono Web Service e FTP, previa attivazione/accreditamento del canale. In alternativa è possibile usare PEC o il portale "Fatture e Corrispettivi".

Quindi sì, possiamo progettare questa cosa

Nel nostro gestionale, quando l'utente fa:

Fatture di vendita → Nuova fattura → Salva/Emetti

il sistema dovrebbe arrivare a qualcosa del genere:

Fattura gestionale
       ↓
Validazione dati fiscali
       ↓
Generazione XML FatturaPA
       ↓
Firma / sigillo secondo il canale previsto
       ↓
Invio a SdI
       ↓
Ricezione esito
       ↓
┌─────────────────────────┐
│ Inviata                 │
│ Consegnata              │
│ Scartata                │
│ Impossibilità consegna  │
└─────────────────────────┘

E soprattutto non basta inviare l'XML e mettere "Inviata". SdI effettua controlli e può scartare la fattura. L'esito deve tornare nel gestionale ed essere associato a quella specifica fattura.

Questo cambia parecchio il progetto

Prima ancora di scrivere una riga di codice, dobbiamo progettare bene la fattura elettronica nel gestionale.

Ci serviranno almeno:

dati del cedente/prestatore
dati del cliente
Partita IVA / Codice Fiscale
codice destinatario / PEC
numero e data fattura
righe, quantità, prezzi e aliquote IVA
imponibile
IVA
totale
natura dell'operazione quando necessaria
eventuale bollo
tipo documento
modalità di pagamento
condizioni e termini di pagamento
dati necessari al tracciato XML
stato di trasmissione
identificativo SdI
ricevuta di scarto/consegna/impossibilità di consegna

Il punto interessante è che il modello dati dei Clienti che abbiamo appena costruito dovrà probabilmente essere ampliato con i dati fiscali/telematici necessari. Il nostro taxCode da solo, evidentemente, non basta.

E c'è una decisione architetturale enorme

Dobbiamo decidere come comunicare con SdI.

Per un gestionale che stiamo costruendo noi, vedo due strade realistiche:

A. Gestionale → intermediario/provider → SdI

È la strada che prenderei seriamente in considerazione per una prima implementazione.

B. Gestionale → canale Web Service SdI direttamente

È tecnicamente possibile, ma comporta accreditamento e gestione tecnica del canale. L'Agenzia descrive il Web Service/FTP come canali telematici dedicati, con richiesta di accreditamento e accordo di servizio.

Non sceglierei A o B a caso. Va valutato come è fatto il nostro gestionale, dove gira, se avrà un backend, che linguaggio usa lato server, come gestiremo certificati/autenticazione, conservazione, ricevute e sicurezza.

E una cosa che considero obbligatoria

Non farei mai:

"clicco Invia → il sistema manda l'XML → speriamo."

Faremo invece uno stato della fattura, per esempio:

Bozza
↓
Validata
↓
XML generato
↓
Inviata a SdI
↓
In elaborazione
↓
Consegnata

oppure:

Inviata a SdI
↓
SCARTATA
↓
Motivo dello scarto
↓
Correggi fattura
↓
Nuovo invio

Questo è fondamentale perché una fattura scartata da SdI non risulta emessa, e deve essere corretta e ritrasmessa.

Quindi sì, ho capito la questione e la considero un requisito architetturale fondamentale del progetto, non una funzione secondaria.

La cosa sensata adesso non è ancora programmare l'invio. È fare prima una mini-progettazione tecnica della fatturazione elettronica, partendo da come oggi sono strutturate nel gestionale le fatture, gli articoli, i clienti e l'azienda cedente. Da lì possiamo stabilire esattamente cosa manca e quale collegamento a SdI conviene implementare.

Qui la parola "provider" rischia di sembrare una cosa astratta, quando in realtà è una società/servizio che paghi e al quale il nostro gestionale si collega via API.

L'Agenzia delle Entrate lo dice proprio così: l'operatore IVA può far trasmettere le fatture a SdI da un soggetto terzo, "solitamente un intermediario o un provider" specializzato nella trasmissione e ricezione delle fatture elettroniche.

In pratica, chi è?

Sono aziende come, per esempio:

Aruba Business
TeamSystem
servizi specializzati esclusivamente in API per la fatturazione elettronica, come OpenAPI.it.

Non sono tutti uguali. Alcuni vendono un gestionale completo di fatturazione, altri offrono soprattutto infrastruttura/API da integrare nel nostro software.

Per noi, la seconda categoria è quella più interessante.

Il modello concreto sarebbe questo

Noi costruiamo il nostro gestionale:

GESTIONALE
    │
    │ API
    ▼
PROVIDER
    │
    │ collegamento SdI
    ▼
AGENZIA ENTRATE / SdI

Il nostro codice potrebbe fare, concettualmente:

inviaFattura(fattura);

e il backend manda al provider i dati/XML.

Il provider si occupa del collegamento con SdI e ci restituisce gli esiti. Alcuni servizi API dichiarano esplicitamente di gestire tramite API invio, firma, ricezione e conservazione delle fatture elettroniche.

E sì, ha un costo

Normalmente sì.

Ma non necessariamente parliamo di "pagare un commercialista ogni mese". Il modello dipende dal servizio:

canone mensile/annuale;
costo per fattura;
pacchetti di fatture;
eventuali costi per firma;
eventuali costi per conservazione a norma;
eventuali costi per API/web service.

Per esempio, Aruba propone un servizio completo che comprende creazione, invio, ricezione e conservazione, mentre il piano Premium è esplicitamente pensato anche per software house e system integrator e include funzionalità Web Services.

Esistono anche servizi molto più "da sviluppatore": OpenAPI.it, per esempio, mette a disposizione API specifiche per automatizzare il flusso e una sandbox gratuita per sviluppare e testare l'integrazione prima di andare in produzione.

Ed è proprio questa la cosa interessante per il nostro progetto

Non dobbiamo necessariamente comprare un altro gestionale.

Possiamo costruire il nostro gestionale, e usare il provider soltanto come infrastruttura fiscale/telematica.

Quindi l'utente continua a vedere:

La mia fattura
Cliente: Rossi S.r.l.
Totale: € 1.250,00
[Emetti e invia]

e dietro le quinte:

Gestionale → API provider → SdI → esito → Gestionale.

Per l'utente finale il provider potrebbe essere completamente invisibile.

E c'è una distinzione ancora più importante

Provider ≠ SdI.

Il provider non sostituisce l'Agenzia delle Entrate.

È il tramite tecnico.

L'Agenzia stessa fa l'esempio del "postino": SdI è il postino che riceve e smista la fattura; il provider è uno dei soggetti attraverso cui noi possiamo consegnargli la busta.

Perciò, quando arriveremo a questa fase, io non partirei scegliendo "Aruba perché conosco Aruba" o "TeamSystem perché è famoso".

Farei prima una comparazione tecnica dei provider disponibili per API, guardando almeno:

costo reale per fattura;
costo fisso;
API disponibili;
sandbox;
generazione XML oppure XML fornito da noi;
invio a SdI;
ricezione notifiche;
gestione degli scarti;
firma digitale;
conservazione a norma;
webhooks;
documentazione API;
affidabilità;
possibilità di usarlo dentro un nostro gestionale.

Perché a quel punto non stiamo scegliendo un software da usare. Stiamo scegliendo un'infrastruttura dalla quale il nostro gestionale dipenderà per una funzione fiscalmente critica. E qui, per una volta, essere paranoici è una forma di buona progettazione.


# ITER PROGETTUALE PER STRUTTURARE GESTIONALE PER AGENZIA DELLE ENTRATE

La prima versione può essere molto semplice:

Fattura nel gestionale → "Genera XML" → Download → Amministrazione → Upload su AdE.

Il gestionale deve occuparsi di:

dati aziendali;
dati cliente;
numero e data fattura;
righe articolo/servizio;
quantità;
prezzi unitari;
sconti, se previsti;
imponibile;
IVA;
totale;
condizioni e modalità di pagamento;
dati obbligatori del tracciato FatturaPA;
generazione dell'XML corretto;
controlli prima del download.

# CONSIGLI PER FATTURAZIONE ELETTRONICA E XML

Per programmare un gestionale che generi file XML validi per l'Agenzia delle Entrate, non ti servono software pronti da usare, ma i fogli di stile, gli schemi di validazione (XSD) e i software di controllo ufficiali forniti dallo Stato per testare il codice.La fattura elettronica italiana segue uno standard rigido chiamato FatturaPA.Risorse ufficiali per programmatoriSchema XSD ufficiale: Scarica lo schema XSD dal Sito FatturaPA per validare la struttura del codice XML che generi (attualmente la versione stabile è la 1.2.2 o successive).Software di controllo Sogei: L'Agenzia delle Entrate fornisce un tool di controllo gratuito online (o integrabile) per verificare che la sintassi dell'XML, i calcoli dell'IVA, i bolli e i codici fiscali siano corretti prima dell'invio.Librerie e strumenti Open Source utiliSe stai programmando il software da zero, puoi usare librerie già pronte che gestiscono la formattazione dei campi e la struttura dei nodi XML:PHP: FatturaPA Open Source (ottima libreria per generare e validare l'XML secondo le specifiche italiane).C# / .NET: FatturaElettronica.NET (libreria open source molto utilizzata in ambiente Microsoft).Python: FatturaPA Python (modulo per la gestione e la lettura/scrittura dello standard).Elementi chiave da programmare nell'XMLNel tuo codice dovrai assicurarti di mappare correttamente i blocchi fondamentali richiesti dal Sistema di Interscambio (SdI):<FatturaElettronicaHeader>: Contiene i dati del fornitore (tu), del cliente (CessionarioCommittente) e il codice destinatario (o PEC).<DatiGenerali>: Contiene tipo di documento (es. TD01 per fattura ordinaria), data, valuta e l'eventuale blocco per il bollo virtuale (DatiBollo).<DatiBeniServizi>: Ciclo iterativo (loop) per inserire le righe degli articoli, quantità, prezzo unitario e codice aliquota IVA.<DatiRiepilogo>: Il riepilogo dei totali divisi per aliquota IVA e natura dell'esenzione (es. N2.1, N4).


Ecco un esempio di codice XML minimale per una fattura ordinaria tra privati (B2B), aggiornato allo standard FatturaPA v1.2.2.Puoi usarlo come modello base da generare con il tuo codice.xml<?xml version="1.0" encoding="UTF-8"?>
<p:FatturaElettronica versione="FPR12" xmlns:ds="http://w3.org" xmlns:p="http://fatturapa.gov.it" xmlns:xsi="http://w3.org" xsi:schemaLocation="http://fatturapa.gov.it fatturapa_v1.2.xsd">
  
  <!-- 1. INTESTAZIONE DELLA FATTURA -->
  <FatturaElettronicaHeader>
    <DatiTrasmissione>
      <IdTrasmittente>
        <IdPaese>IT</IdPaese>
        <IdCodice>01234567890</IdCodice> <!-- Partita IVA di chi invia -->
      </IdTrasmittente>
      <ProgressivoInvio>00001</ProgressivoInvio> <!-- ID univoco progressivo alfanumerico -->
      <FormatoTrasmissione>FPR12</FormatoTrasmissione> <!-- FPR12 per privati, FPA12 per Pubblica Amministrazione -->
      <CodiceDestinatario>0000000</CodiceDestinatario> <!-- 7 zeri se inviata via PEC, oppure il codice di 7 cifre del gestionale del cliente -->
    </DatiTrasmissione>
    
    <!-- Fornitore (Tu / Cedente Prestatore) -->
    <CedentePrestatore>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice>01234567890</IdCodice>
        </IdFiscaleIVA>
        <Anagrafica>
          <Denominazione>Mia Azienda S.R.L.</Denominazione>
        </Anagrafica>
        <RegimeFiscale>RF01</RegimeFiscale> <!-- RF01 = Ordinario, RF19 = Forfettario -->
      </DatiAnagrafici>
      <Sede>
        <Indirizzo>Via Roma 10</Indirizzo>
        <CAP>00100</CAP>
        <Comune>Roma</Comune>
        <Provincia>RM</Provincia>
        <IdPaese>IT</IdPaese>
      </Sede>
    </CedentePrestatore>
    
    <!-- Cliente (Cessionario Committente) -->
    <CessionarioCommittente>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice>09876543210</IdCodice>
        </IdFiscaleIVA>
        <Anagrafica>
          <Denominazione>Nome Cliente S.P.A.</Denominazione>
        </Anagrafica>
      </DatiAnagrafici>
      <Sede>
        <Indirizzo>Corso Milano 25</Indirizzo>
        <CAP>20100</CAP>
        <Comune>Milano</Comune>
        <Provincia>MI</Provincia>
        <IdPaese>IT</IdPaese>
      </Sede>
    </CessionarioCommittente>
  </FatturaElettronicaHeader>

  <!-- 2. CORPO DELLA FATTURA -->
  <FatturaElettronicaBody>
    <DatiGenerali>
      <DatiGeneraliDocumento>
        <TipoDocumento>TD01</TipoDocumento> <!-- TD01 = Fattura Ordinaria -->
        <Divisa>EUR</Divisa>
        <Data>2026-08-13</Data> <!-- Formato YYYY-MM-DD -->
        <Numero>1/2026</Numero> <!-- Numero fattura alfanumerico -->
        <ImportoTotaleDocumento>122.00</ImportoTotaleDocumento> <!-- Importo totale inclusa IVA -->
      </DatiGeneraliDocumento>
    </DatiGenerali>
    
    <!-- Elenco degli articoli (Loop da ciclare nel tuo codice) -->
    <DatiBeniServizi>
      <DettaglioLinee>
        <NumeroLinea>1</NumeroLinea>
        <Descrizione>Consulenza Informatica sviluppo software</Descrizione>
        <PrezzoUnitario>100.00</PrezzoUnitario>
        <PrezzoTotale>100.00</PrezzoTotale>
        <AliquotaIVA>22.00</AliquotaIVA> <!-- Percentuale IVA senza simbolo -->
      </DettaglioLinee>
      
      <!-- Riepilogo IVA (Uno per ogni aliquota usata nelle linee) -->
      <DatiRiepilogo>
        <AliquotaIVA>22.00</AliquotaIVA>
        <ImponibileImporto>100.00</ImponibileImporto>
        <Imposta>22.00</Imposta>
        <EsigibilitaIVA>I</EsigibilitaIVA> <!-- I = esigibilità immediata, S = scissione pagamenti -->
      </DatiRiepilogo>
    </DatiBeniServizi>
  </FatturaElettronicaBody>
</p:FatturaElettronica>
Usa il codice con cautela.Regole importanti per la programmazione del tuo scriptI decimali: I campi numerici (prezzi, imposte, totali) usano il punto . come separatore dei decimali e non contengono separatori delle migliaia (es: 1000.50 e non 1.000,50).I tag vuoti: Evita di generare tag vuoti nel file XML (es. <DatiBollo></DatiBollo>). Se un dato opzionale non è presente, il tag relativo va completamente omesso, altrimenti il Sistema di Interscambio scarterà il file.Codifica: Il file deve essere salvato tassativamente con codifica UTF-8 senza BOM.

# ESEMPIO DI CODICE PER IVA N2.2 E BOLLO IN FATTURA

Ecco come integrare la gestione del bollo virtuale e della Natura IVA N2.2 (operazioni non soggette ad IVA per mancanza del requisito territoriale) nel codice XML del tuo gestionale.⚠️ Regola Fiscale ImportanteSecondo la normativa italiana, se emetti una fattura con codice N2.2 (o altri codici di esclusione/esenzione) e l'importo totale dei servizi non soggetti supera i 77,47 €, sei obbligato ad applicare il bollo virtuale da 2,00 €.💻 Codice XML Integrato (Bollo + N2.2)Ecco i tre blocchi specifici da modificare o aggiungere nel corpo del tuo XML (<FatturaElettronicaBody>).1. Blocco Dati Generali (Inserimento Bollo)Il tag <DatiBollo> va inserito dentro <DatiGeneraliDocumento>. Il valore del tag <BolloVirtuale> deve essere sempre e solo SI.xml<DatiGenerali>
  <DatiGeneraliDocumento>
    <TipoDocumento>TD01</TipoDocumento>
    <Divisa>EUR</Divisa>
    <Data>2026-08-13</Data>
    <Numero>2/2026</Numero>
    <!-- L'importo totale NON include il bollo se lo paga il fornitore, lo include se lo addebiti al cliente -->
    <ImportoTotaleDocumento>150.00</ImportoTotaleDocumento> 
    
    <!-- SEZIONE BOLLO VIRTUALE -->
    <DatiBollo>
      <BolloVirtuale>SI</BolloVirtuale>
      <Importo>2.00</Importo> <!-- Opzionale ma consigliato -->
    </DatiBollo>
    
  </DatiGeneraliDocumento>
</DatiGenerali>
Usa il codice con cautela.2. Blocco Dettaglio Linee (Articoli con IVA N2.2)Nelle linee degli articoli senza IVA, devi impostare l'aliquota a 0.00 e aggiungere tassativamente il tag <Natura> con il valore N2.2.xml<DatiBeniServizi>
  <!-- Linea Articolo Non Soggetto -->
  <DettaglioLinee>
    <NumeroLinea>1</NumeroLinea>
    <Descrizione>Consulenza software a cliente estero (extra-UE)</Descrizione>
    <PrezzoUnitario>150.00</PrezzoUnitario>
    <PrezzoTotale>150.00</PrezzoTotale>
    <AliquotaIVA>0.00</AliquotaIVA> <!-- Aliquota a zero -->
    <Natura>N2.2</Natura> <!-- Natura IVA obbligatoria -->
  </DettaglioLinee>
Usa il codice con cautela.3. Blocco Riepilogo (Chiusura IVA e Natura)Anche nel riepilogo finale devi azzerare l'imposta, riportare la natura N2.2 e aggiungere il tag <RiferimentoNormativo> per spiegare brevemente la legge applicata (es. Art. 7-ter per i servizi generici all'estero).xml  <!-- SEZIONE RIEPILOGO IVA -->
  <DatiRiepilogo>
    <AliquotaIVA>0.00</AliquotaIVA>
    <Natura>N2.2</Natura> <!-- Deve corrispondere alla natura della linea -->
    <ImponibileImporto>150.00</ImponibileImporto>
    <Imposta>0.00</Imposta> <!-- L'imposta calcolata è zero -->
    <RiferimentoNormativo>Inversione contabile - Art. 7-ter DPR 633/72</RiferimentoNormativo>
  </DatiRiepilogo>
</DatiBeniServizi>
Usa il codice con cautela.📌 Note di sviluppo per il tuo DatabaseNel tuo database, quando crei la tabella delle aliquote IVA, ti consiglio di strutturarla così:id_aliquota: INTvalore_percentuale: DECIMAL (es. 22.00, 0.00)codice_natura: VARCHAR (es. NULL per il 22%, N2.2, N4 per gli esenti)riferimento_legge: VARCHAR (il testo da inserire in <RiferimentoNormativo>)In questo modo, quando il tuo script cicla i prodotti, se rileva che codice_natura non è null, genera automaticamente i tag <Natura> e <RiferimentoNormativo> sia nelle linee che nel riepilogo.

# CODICE CON ADDEBITO BOLLO IN FATTURA FATTO PAGARE AL CLIENTE

Quando decidi di addebitare il bollo da 2,00 € al cliente, devi inserire il bollo in due punti diversi del file XML:Nel blocco dei dati generali per dichiarare l'assolvimento virtuale dell'imposta.Come linea di dettaglio aggiuntiva (una riga articolo vera e propria) per chiedere i soldi al cliente.Fiscalmente, il bollo addebitato al cliente è considerato un'operazione esclusa dalla base imponibile IVA e richiede il codice N1 (operazioni escluse ex art. 15 DPR 633/72).Ecco come devi strutturare il codice XML nel tuo gestionale:💻 Codice XML con Bollo addebitato al Cliente1. Blocco Dati Generali (Dichiarazione Bollo)Dichiari la presenza del bollo. L'importo totale del documento deve includere anche i 2,00 € addebitati. Ipotizzando un servizio da 150,00 € (N2.2) + 2,00 € (Bollo), il totale diventa 152.00.xml<DatiGenerali>
  <DatiGeneraliDocumento>
    <TipoDocumento>TD01</TipoDocumento>
    <Divisa>EUR</Divisa>
    <Data>2026-08-13</Data>
    <Numero>3/2026</Numero>
    <ImportoTotaleDocumento>152.00</ImportoTotaleDocumento> <!-- 150.00 + 2.00 -->
    
    <!-- DICHIARAZIONE OBBLIGATORIA DEL BOLLO -->
    <DatiBollo>
      <BolloVirtuale>SI</BolloVirtuale>
      <Importo>2.00</Importo>
    </DatiBollo>
  </DatiGeneraliDocumento>
</DatiGenerali>
Usa il codice con cautela.2. Blocco Dettaglio Linee (Articolo + Riga Bollo)Nel ciclo delle linee, oltre al tuo servizio principale (es. N2.2), devi generare una seconda linea specifica per l'addebito del bollo, impostando l'aliquota a 0.00 e la natura a N1.xml<DatiBeniServizi>
  <!-- Linea 1: Il tuo servizio principale -->
  <DettaglioLinee>
    <NumeroLinea>1</NumeroLinea>
    <Descrizione>Consulenza software a cliente estero (extra-UE)</Descrizione>
    <PrezzoUnitario>150.00</PrezzoUnitario>
    <PrezzoTotale>150.00</PrezzoTotale>
    <AliquotaIVA>0.00</AliquotaIVA>
    <Natura>N2.2</Natura>
  </DettaglioLinee>
  
  <!-- Linea 2: Riga di addebito del bollo al cliente -->
  <DettaglioLinee>
    <NumeroLinea>2</NumeroLinea>
    <Descrizione>Rivalsa imposta di bollo</Descrizione>
    <PrezzoUnitario>2.00</PrezzoUnitario>
    <PrezzoTotale>2.00</PrezzoTotale>
    <AliquotaIVA>0.00</AliquotaIVA> <!-- Aliquota a zero -->
    <Natura>N1</Natura> <!-- Natura N1 specifica per Art. 15 (Escluso) -->
  </DettaglioLinee>
Usa il codice con cautela.3. Blocco Riepilogo (Doppio riepilogo IVA)Dato che nella fattura hai usato due nature diverse (N2.2 e N1), il tuo algoritmo dovrà generare due blocchi <DatiRiepilogo> separati, uno per ciascuna natura.xml  <!-- Riepilogo per il servizio principale (N2.2) -->
  <DatiRiepilogo>
    <AliquotaIVA>0.00</AliquotaIVA>
    <Natura>N2.2</Natura>
    <ImponibileImporto>150.00</ImponibileImporto>
    <Imposta>0.00</Imposta>
    <RiferimentoNormativo>Inversione contabile - Art. 7-ter DPR 633/72</RiferimentoNormativo>
  </DatiRiepilogo>
  
  <!-- Riepilogo per l'addebito del bollo (N1) -->
  <DatiRiepilogo>
    <AliquotaIVA>0.00</AliquotaIVA>
    <Natura>N1</Natura>
    <ImponibileImporto>2.00</ImponibileImporto>
    <Imposta>0.00</Imposta>
    <RiferimentoNormativo>Operazione esclusa ex Art. 15 DPR 633/72</RiferimentoNormativo>
  </DatiRiepilogo>
</DatiBeniServizi>
Usa il codice con cautela.🧠 Logica da implementare nel tuo codice (Backend)Nel tuo script di generazione dell'XML, inserisci questa logica condizionale:SE la somma delle righe non soggette/esenti è maggiore di 77.47 € E l'utente ha spuntato l'opzione "Addebita bollo":Cambia il flag del blocco <DatiBollo> su SI.Fai un push automatico nell'array dei prodotti di una nuova riga con Descrizione = "Rivalsa imposta di bollo", Prezzo = 2.00 e Natura = "N1".Ricalcola l'oggetto dei riepiloghi inserendo la chiave N1 e somma i 2,00 € al totale generale del documento.

# CODICE PER NOMENCLATURA FILE XML PER FATTURA ELETTRONICA

Per non essere scartato immediatamente dal Sistema di Interscambio (SdI), il file XML deve seguire una regola di denominazione estremamente rigida. Se il nome del file non rispetta lo standard, il sistema lo rifiuta prima ancora di leggerne il contenuto.Il nome del file deve essere composto esattamente da 5 elementi, senza spazi interni:\(\text{[Codice\ Paese]}+\text{[Identificativo\ Univoco]}+\text{.}+\text{[Estensione]}\)📋 La struttura esatta del nomeCodice Paese (2 caratteri): Per l'Italia è sempre IT (in maiuscolo).Identificativo Univoco (da 1 a 11 caratteri): Può essere alfanumerico (lettere dalla A alla Z e numeri da 0 a 9). Di solito si usa la Partita IVA di chi emette la fattura (11 cifre).Separatore (1 carattere): Un carattere di sottolineatura _ (underscore).Progressivo (5 caratteri): Un codice alfanumerico univoco per ogni singolo file inviato. Di solito è un contatore incrementale (es. 00001, 00002). Puoi usare lettere e numeri (es. 000A1).Estensione (3 o 4 caratteri): Deve essere .xml (oppure .xml.p7m se decidi di firmarlo digitalmente).💡 Esempio praticoSe la tua Partita IVA è 01234567890 e stai inviando il tuo primo file, il nome del file dovrà essere:IT01234567890_00001.xmlIl file successivo sarà:IT01234567890_00002.xml⚠️ 4 Regole fondamentali per il tuo codice (Backend)Il progressivo NON è il numero della fattura: Il codice di 5 caratteri dopo l'underscore serve solo al Sistema di Interscambio per capire che si tratta di un file nuovo. Se invii due fatture diverse (es. fattura 5 e fattura 6) usando lo stesso progressivo nel nome del file (es. _00001.xml), il secondo file verrà scartato con l'errore "File duplicato".Usa la codifica Base36 per i progressivi: Poiché hai a disposizione solo 5 caratteri per il progressivo, se usi solo i numeri (da 00001 a 99999) potrai inviare al massimo 99.999 file. Utilizzando anche le lettere maiuscole (sistema Base36: 0-9 e A-Z), le combinazioni totali diventano più di 60 milioni (da 00001 a ZZZZZ).Solo maiuscole: Il Codice Paese (IT) e le lettere nel progressivo devono essere tassativamente maiuscole.Nessun carattere speciale: Non inserire trattini, punti aggiuntivi o spazi nel nome del file (es. IT01234567890_fattura-1.xml verrà scartato).


# CODICE PER CREAZIONE NOME FILE XML

Ecco la funzione implementata in JavaScript (valida sia per il backend in Node.js che per il frontend nel browser).Anche in questo caso viene utilizzato il sistema Base36 per garantire oltre 60 milioni di combinazioni uniche con soli 5 caratteri.javascript/**
 * Genera il nome file corretto per la fattura elettronica italiana.
 * @param {string} partitaIva - La Partita IVA dell'emittente (11 cifre).
 * @param {number} ultimoIdDatabase - L'ultimo contatore incrementale salvato nel DB.
 * @returns {string} Il nome del file XML formattato (es. IT01234567890_00001.xml).
 */
function generaNomeFileFattura(partitaIva, ultimoIdDatabase) {
    // 1. Incrementa l'ID del database per il nuovo file
    const nuovoId = ultimoIdDatabase + 1;
    
    // 2. Converte il numero in Base36 (0-9, A-Z) e lo trasforma in maiuscolo
    // In JS, toString(36) converte nativamente in base 36
    const progressivoBase36 = nuovoId.toString(36).toUpperCase();
    
    // 3. Riempie con zeri a sinistra fino a raggiungere esattamente 5 caratteri
    const progressivoFormattato = progressivoBase36.padStart(5, '0');
    
    // 4. Compone e restituisce la stringa finale
    return `IT${partitaIva}_${progressivoFormattato}.xml`;
}

// ESEMPIO DI UTILIZZO:
const pIva = "01234567890";
const ultimoContatoreDati = 105; // Dato recuperato dal tuo database

const nomeFile = generaNomeFileFattura(pIva, ultimoContatoreDati);
console.log(nomeFile); 
// Output: IT01234567890_0002Y.xml (106 in Base36 è "2Y", diventa "0002Y")
Usa il codice con cautela.💡 Consiglio per l'integrazione nel tuo GestionaleSe stai sviluppando un'applicazione moderna (ad esempio con React, Vue o Node/Express), puoi estendere questa funzione aggiungendo un controllo di validazione (Regex) sulla Partita IVA per assicurarti che contenga solo numeri e sia lunga esattamente 11 caratteri prima di generare il file:javascriptif (!/^\d{11}$/.test(partitaIva)) {
    throw new Error("La Partita IVA inserita non è valida.");
}

# TEST IMPORTAZIONE XML AdE

nella console F12:

testSupplierInvoiceImport();