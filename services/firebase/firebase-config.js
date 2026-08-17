"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

const firebaseConfig = {

    apiKey: "AIzaSyAdCF954OosT08Z_Fwrr45N1oN_886Yltc",

    authDomain: "kitho-business.firebaseapp.com",

    projectId: "kitho-business",

    storageBucket: "kitho-business.firebasestorage.app",

    messagingSenderId: "283567243498",

    appId: "1:283567243498:web:f92107782705ad2b0c5793"

};

const firebaseApp =
    initializeApp(firebaseConfig);

export {
    firebaseApp
};