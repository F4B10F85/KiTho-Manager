"use strict";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
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

    getCurrentFirebaseUser

};