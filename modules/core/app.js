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

function initializeApplication(){

    console.clear();

    console.log("========================================");
    console.log("      KiTho Business v0.1.0");
    console.log("========================================");


    /*
    |--------------------------------------------------------------------------
    | Eventi globali
    |--------------------------------------------------------------------------
    */

    document.addEventListener(
        "click",
        handleGlobalClick
    );


    /*
    |--------------------------------------------------------------------------
    | Developer mode
    |--------------------------------------------------------------------------
    */

    if(APP.developerMode){

        buildApplication();

        return;

    }


    /*
    |--------------------------------------------------------------------------
    | Firebase Authentication
    |--------------------------------------------------------------------------
    |
    | Aspettiamo che Firebase abbia terminato il ripristino
    | della sessione prima di costruire l'applicazione.
    |
    */

    window.authAPI.observeAuthState(
        firebaseUser => {

            console.log(
                "Firebase Auth state:",
                firebaseUser
            );


            if(firebaseUser){

                /*
                |----------------------------------------------------------
                | Cerchiamo l'utente applicativo tramite Firebase UID.
                |----------------------------------------------------------
                */

                const user =
                    users.find(
                        item =>
                            item.firebaseUid ===
                            firebaseUser.uid
                    );


                if(user && user.active){

                    setCurrentUser(
                        user
                    );

                }else{

                    setCurrentUser(
                        null
                    );

                }

            }else{

                setCurrentUser(
                    null
                );

            }


            buildApplication();

        }
    );

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


    if(!firebaseUser){

        clearCurrentUser();

        showLogin();

        return;

    }


    const user =
        getCurrentUser();


    if(!user){

        console.error(
            "Utente Firebase autenticato ma utente applicativo non trovato."
        );

        window.authAPI.logout();

        return;

    }


    if(
        !user.firebaseEmail ||
        user.firebaseEmail.toLowerCase() !==
        firebaseUser.email?.toLowerCase()
    ){

        console.error(
            "Corrispondenza utente Firebase/applicativo non valida."
        );

        window.authAPI.logout();

        return;

    }


    if(!user.active){

        console.error(
            "Utente applicativo disattivato."
        );

        window.authAPI.logout();

        return;

    }


    buildLayout();

    navigate(
        "dashboard"
    );

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
