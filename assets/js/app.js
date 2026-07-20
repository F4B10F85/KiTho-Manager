"use strict";

/*
|--------------------------------------------------------------------------
| KiTho Manager
|--------------------------------------------------------------------------
| Entry Point dell'applicazione.
|--------------------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", initializeApplication);

/**
 * Avvia l'applicazione.
 */
function initializeApplication() {

    console.clear();

    console.log("========================================");
    console.log("      KiTho Manager v0.1.0");
    console.log("========================================");

    buildApplication();

}

/**
 * Costruisce l'applicazione.
 */
function buildApplication() {

    const app = document.getElementById("app");

    app.innerHTML = `
    
        <h1>KiTho Manager</h1>

        <p>Il gestionale è stato avviato correttamente.</p>

    `;

}