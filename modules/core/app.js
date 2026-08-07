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

    /*
    |--------------------------------------------------------------------------
    | Eventi globali
    |--------------------------------------------------------------------------
    */

    document.addEventListener("click", handleGlobalClick);

    buildApplication();

}

/**
 * Costruisce l'applicazione - utilizzare per login vero.

function buildApplication() {

    if (getCurrentUser()) {

        buildLayout();

        navigate("dashboard");

    } else {

        showLogin();

    }

}
*/


/**
 * Costruisce l'applicazione - utilizzare per sviluppo.
*/

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



/*
|--------------------------------------------------------------------------
| Eventi Globali
|--------------------------------------------------------------------------
*/

function handleGlobalClick(event){

    const exportButton = event.target.closest(".km-button-excel");

    if(exportButton){

        exportCurrentPage();

        return;

    }

}
