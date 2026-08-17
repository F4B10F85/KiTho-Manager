"use strict";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    firebaseApp
} from "./firebase-config.js";


const auth =
    getAuth(
        firebaseApp
    );


export {
    auth
};