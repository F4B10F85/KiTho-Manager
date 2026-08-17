"use strict";

/*
|--------------------------------------------------------------------------
| Cambio password
|--------------------------------------------------------------------------
*/


function showChangePassword(){

    const workspace =
        document.getElementById(
            "km-workspace"
        );


    if(!workspace){

        return;

    }


    workspace.innerHTML = `

        <div class="km-page km-change-password-page">

            <div class="km-page-header">

                <div>

                    <span class="km-profile-eyebrow">
                        SICUREZZA
                    </span>

                    <h1>
                        Cambia password
                    </h1>

                </div>

            </div>


            <div class="km-change-password-card">

                <div class="km-change-password-intro">

                    <div class="km-change-password-icon">
                        🔐
                    </div>

                    <div>

                        <h2>
                            Aggiorna la tua password
                        </h2>

                        <p>
                            Inserisci la password attuale e scegli
                            una nuova password per il tuo account.
                        </p>

                    </div>

                </div>


                <div class="km-change-password-form">


                    <div class="km-change-password-field">

                        <label for="km-current-password">
                            Password attuale
                        </label>

                        <input
                            id="km-current-password"
                            type="password"
                            autocomplete="current-password"
                            placeholder="Password attuale"
                        >

                    </div>


                    <div class="km-change-password-field">

                        <label for="km-new-password">
                            Nuova password
                        </label>

                        <input
                            id="km-new-password"
                            type="password"
                            autocomplete="new-password"
                            placeholder="Nuova password"
                        >

                    </div>


                    <div class="km-change-password-field">

                        <label for="km-confirm-password">
                            Conferma nuova password
                        </label>

                        <input
                            id="km-confirm-password"
                            type="password"
                            autocomplete="new-password"
                            placeholder="Ripeti la nuova password"
                        >

                    </div>


                    <div
                        id="km-change-password-message"
                        class="km-change-password-message">
                    </div>


                    <div class="km-change-password-actions">

                        <button
                            type="button"
                            class="km-button"
                            onclick="navigate('dashboard')">

                            Annulla

                        </button>


                        <button
                            type="button"
                            class="km-button km-button-primary"
                            onclick="changePassword()">

                            Cambia password

                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;

}


/*
|--------------------------------------------------------------------------
| Cambio password Firebase
|--------------------------------------------------------------------------
*/

async function changePassword(){

    const currentPassword =
        document
            .getElementById(
                "km-current-password"
            )
            .value;


    const newPassword =
        document
            .getElementById(
                "km-new-password"
            )
            .value;


    const confirmPassword =
        document
            .getElementById(
                "km-confirm-password"
            )
            .value;


    const message =
        document
            .getElementById(
                "km-change-password-message"
            );


    message.textContent = "";
    message.className =
        "km-change-password-message";


    if(!currentPassword){

        showChangePasswordMessage(
            "Inserisci la password attuale.",
            "error"
        );

        return;

    }


    if(!newPassword){

        showChangePasswordMessage(
            "Inserisci la nuova password.",
            "error"
        );

        return;

    }


    if(newPassword.length < 6){

        showChangePasswordMessage(
            "La nuova password deve contenere almeno 6 caratteri.",
            "error"
        );

        return;

    }


    if(newPassword !== confirmPassword){

        showChangePasswordMessage(
            "Le nuove password non coincidono.",
            "error"
        );

        return;

    }


    if(newPassword === currentPassword){

        showChangePasswordMessage(
            "La nuova password deve essere diversa da quella attuale.",
            "error"
        );

        return;

    }


    try{

        showChangePasswordMessage(
            "Verifica della password in corso...",
            "loading"
        );


        await window.authAPI.changePassword(
            currentPassword,
            newPassword
        );


        showChangePasswordMessage(
            "Password modificata correttamente.",
            "success"
        );


        setTimeout(
            function(){

                logout();

            },
            1200
        );


    }catch(error){

        console.error(
            "Errore cambio password:",
            error
        );


        let errorMessage =
            "Impossibile modificare la password.";


        switch(error.code){

            case "auth/wrong-password":
            case "auth/invalid-credential":

                errorMessage =
                    "La password attuale non è corretta.";

                break;


            case "auth/weak-password":

                errorMessage =
                    "La nuova password non soddisfa i requisiti di sicurezza.";

                break;


            case "auth/requires-recent-login":

                errorMessage =
                    "Per sicurezza è necessario effettuare nuovamente il login.";

                break;


            case "auth/too-many-requests":

                errorMessage =
                    "Troppi tentativi. Riprova più tardi.";

                break;

        }


        showChangePasswordMessage(
            errorMessage,
            "error"
        );

    }

}


/*
|--------------------------------------------------------------------------
| Messaggi
|--------------------------------------------------------------------------
*/

function showChangePasswordMessage(
    text,
    type
){

    const message =
        document
            .getElementById(
                "km-change-password-message"
            );


    if(!message){

        return;

    }


    message.textContent =
        text;


    message.className =
        `km-change-password-message is-${type}`;

}