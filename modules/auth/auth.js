"use strict";

/*
|--------------------------------------------------------------------------
| Authentication Engine
|--------------------------------------------------------------------------
| Gestisce autenticazione e autorizzazione.
|--------------------------------------------------------------------------
*/

/**
 * Cerca un utente tramite username.
 */
function findUser(username) {

    return users.find(user =>
        user.username === username.toUpperCase()
    );

}

function authenticate(username, password) {

    const user = findUser(username);

    if (!user) {

        return {

            success: false,

            message: "Utente inesistente"

        };

    }

    if (!user.active) {

        return {

            success: false,

            message: "Utente disattivato"

        };

    }

    if (user.password === null) {

        return {

            success: false,

            firstAccess: true,

            user

        };

    }

    if (user.password !== password) {

        return {

            success: false,

            message: "Password errata"

        };

    }

    return {

        success: true,

        user

    };

}