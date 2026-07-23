# KiTho Business

> Project Journal

---

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