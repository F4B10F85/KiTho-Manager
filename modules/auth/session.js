"use strict";

/*
|--------------------------------------------------------------------------
| Session Manager
|--------------------------------------------------------------------------
| Gestisce la sessione dell'utente autenticato.
|--------------------------------------------------------------------------
*/

let currentUser = null;

/**
 * Imposta l'utente corrente.
 */
function setCurrentUser(user) {

    currentUser = user;

}

/**
 * Restituisce l'utente corrente.
 */
function getCurrentUser() {

    return currentUser;

}

/**
 * Chiude la sessione.
 */
function clearCurrentUser() {

    currentUser = null;

}

/**
 * Verifica se esiste una sessione attiva.
 */
function isLogged() {

    return currentUser !== null;

}