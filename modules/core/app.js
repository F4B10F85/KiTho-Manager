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

/* 
 * Costruisce l'applicazione.
 *
 * developerMode = true
 * → bypass autenticazione Firebase
 * → utilizza l'utente locale di sviluppo
 *
 * developerMode = false
 * → autenticazione Firebase reale
 * → mostra login se nessun utente è autenticato
*/


function buildApplication(){

    /*
    |--------------------------------------------------------------------------
    | Developer mode
    |--------------------------------------------------------------------------
    |
    | Durante lo sviluppo bypassiamo Firebase e impostiamo direttamente
    | l'utente tecnico.
    |
    */
    
    if(APP.developerMode){

        const user =
            findUser(
                "FABIO.FILIPPINI"
            );


        setCurrentUser(
            user
        );


        buildLayout();

        navigate(
            "dashboard"
        );


        return;

    }
      

    /*
    |--------------------------------------------------------------------------
    | Produzione
    |--------------------------------------------------------------------------
    |
    | In modalità normale l'accesso deve essere già stato effettuato
    | tramite Firebase Authentication.
    |
    */
    
    
    const firebaseUser =
        window.authAPI.getCurrentFirebaseUser();


    const user =
        getCurrentUser();


    if(
        firebaseUser &&
        user
    ){

        buildLayout();

        navigate(
            "dashboard"
        );


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

    const exportButton =
        event.target.closest(".km-button-excel");

    if(
        exportButton &&
        exportButton.id !== "km-import-excel"
    ){

        exportCurrentPage();

        return;

    }

}
