"use strict";

/*
|--------------------------------------------------------------------------
| Login Screen
|--------------------------------------------------------------------------
| Costruisce la schermata di accesso.
|--------------------------------------------------------------------------
*/

/**
 * Mostra la schermata di login.
 */
function showLogin() {

    const app = document.getElementById("app");

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
                >

                <input
                    id="login-password"
                    type="password"
                    placeholder="Password"
                >

                <button onclick="login()">

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

    document.getElementById("km-version").innerHTML = `
        Versione ${APP.version} (${APP.milestone})
        <br>
        ${APP.copyright}
    `;

}

/**
 * Esegue il login.
 */
function login() {

        const username = document
        .getElementById("login-username")
        .value
        .trim();

    const password = document
        .getElementById("login-password")
        .value;

    const result = authenticate(username, password);

    const message = document.getElementById("login-message");

    if (!result.success) {

        if (result.firstAccess) {

            message.textContent =
                "Primo accesso: è necessario creare una password.";

            return;

        }

        message.textContent = result.message;

        return;

    }

    message.textContent = "";

    setCurrentUser(result.user);

    buildApplication();

}