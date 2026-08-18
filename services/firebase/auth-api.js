"use strict";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updatePassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    auth
} from "./firebase-auth.js";


async function login(
    email,
    password
){

    const result =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    return result.user;

}


async function logout(){

    await signOut(
        auth
    );

}


function observeAuthState(
    callback
){

    return onAuthStateChanged(
        auth,
        callback
    );

}


function getCurrentFirebaseUser(){

    return auth.currentUser;

}


window.authAPI = {

    login,

    logout,

    observeAuthState,

    getCurrentFirebaseUser,

    changePassword,

    /*createFirebaseUser*/

};

async function changePassword(
    currentPassword,
    newPassword
){

    const user =
        auth.currentUser;


    if(!user){

        throw new Error(
            "Nessun utente autenticato."
        );

    }


    if(!user.email){

        throw new Error(
            "L'utente autenticato non possiede un indirizzo email."
        );

    }


    /*
    |----------------------------------------------------------------------
    | Firebase richiede una nuova autenticazione per operazioni sensibili.
    |----------------------------------------------------------------------
    */

    await signInWithEmailAndPassword(
        auth,
        user.email,
        currentPassword
    );


    await updatePassword(
        user,
        newPassword
    );

}

/*
async function createFirebaseUser(
    email,
    password
){

    const result =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );


    return result.user;

}
*/