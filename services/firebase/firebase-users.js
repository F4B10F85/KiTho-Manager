"use strict";

import {
    collection,
    doc,
    getDocs,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    db
} from "./firebase-db.js";


/*
|--------------------------------------------------------------------------
| Salva / aggiorna i metadati Firebase dell'utente
|--------------------------------------------------------------------------
*/

async function syncFirebaseUser(
    firebaseUser
){

    if(!firebaseUser){

        return;

    }


    const userRef =
        doc(
            db,
            "users",
            firebaseUser.uid
        );


    await setDoc(

        userRef,

        {

            uid:
                firebaseUser.uid,

            email:
                firebaseUser.email ?? "",

            createdAt:
                firebaseUser.metadata?.creationTime ?? null,

            lastLogin:
                firebaseUser.metadata?.lastSignInTime ?? null,

            updatedAt:
                new Date().toISOString()

        },

        {
            merge: true
        }

    );

}

/*
|--------------------------------------------------------------------------
| Recupera gli utenti Firebase
|--------------------------------------------------------------------------
*/

async function getFirebaseUsers(){

    const usersRef =
        collection(
            db,
            "users"
        );


    const snapshot =
        await getDocs(
            usersRef
        );


    return snapshot.docs.map(
        document => {

            return {

                id:
                    document.id,

                ...document.data()

            };

        }
    );

}

export {
    syncFirebaseUser,
    getFirebaseUsers
};

window.firebaseUsersAPI = {

    syncFirebaseUser,

    getFirebaseUsers

};