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
    console.log("      KiTho Business v0.1.0");
    console.log("========================================");

    buildApplication();

}

/**
 * Costruisce l'applicazione.
 */
function buildApplication() {

    buildLayout();

}