"use strict";


/*
|--------------------------------------------------------------------------
| Login Screen
|--------------------------------------------------------------------------
| Costruisce la schermata di accesso.
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Mostra la schermata di login
|--------------------------------------------------------------------------
*/

function showLogin(){

    const app =
        document.getElementById(
            "app"
        );


    app.innerHTML = `

        <div class="km-login">

            <div class="km-login-card">

                <img
                    src="assets/images/logo_KTB.png"
                    alt="KiTho Business"
                    class="km-login-logo"
                >

                <div class="km-login-title">

                    KiTho Business

                </div>

                <div class="km-login-subtitle">

                    Business Management System

                </div>

                <input
                    id="login-username"
                    type="text"
                    placeholder="Nome utente"
                    autocomplete="username"
                >

                <input
                    id="login-password"
                    type="password"
                    placeholder="Password"
                    autocomplete="current-password"
                >

                <button
                    id="login-button"
                    class="km-button km-button-primary"
                    onclick="login()">

                    Accedi

                </button>

                <div
                    id="login-message"
                    class="km-login-message">
                </div>

                <div
                    id="km-version"
                    class="km-login-version">
                </div>

            </div>

        </div>

    `;


    document
        .getElementById(
            "km-version"
        )
        .innerHTML = `

            Versione ${APP.version} (${APP.milestone})

            <br>

            ${APP.copyright}

        `;


    /*
    |----------------------------------------------------------------------
    | Enter dalla password
    |----------------------------------------------------------------------
    */

    const passwordInput =
        document.getElementById(
            "login-password"
        );


    if(passwordInput){

        passwordInput.addEventListener(
            "keydown",
            event => {

                if(
                    event.key ===
                    "Enter"
                ){

                    login();

                }

            }
        );

    }

}


/*
|--------------------------------------------------------------------------
| Esegue il login
|--------------------------------------------------------------------------
*/

async function login(){

    const username =
        document
            .getElementById("login-username")
            .value
            .trim();


    const password =
        document
            .getElementById("login-password")
            .value;


    const message =
        document.getElementById(
            "login-message"
        );


    message.textContent =
        "Autenticazione in corso...";


    try{

        const result =
            await authenticate(
                username,
                password
            );


        if(!result.success){

            message.textContent =
                result.message;

            return;

        }


        message.textContent =
            "";


        /*
        |--------------------------------------------------------------------------
        | Salviamo l'utente applicativo nella sessione KiTho.
        |--------------------------------------------------------------------------
        */

        setCurrentUser(
            result.user
        );


        /*
        |--------------------------------------------------------------------------
        | Firebase ha già creato la sessione.
        |--------------------------------------------------------------------------
        */

        buildApplication();


    }catch(error){

        console.error(
            "Errore durante il login:",
            error
        );


        message.textContent =
            "Errore durante il login.";

    }

}