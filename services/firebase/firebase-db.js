"use strict";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    firebaseApp
} from "./firebase-config.js";


const db =
    getFirestore(
        firebaseApp
    );


export {
    db
};