"use strict";

const {setGlobalOptions} = require("firebase-functions");
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");
const {initializeApp} = require("firebase-admin/app");


/*
|----------------------
| Firebase Admin
|----------------------
*/

initializeApp();


const adminAuth =
    getAuth();


const db =
    getFirestore();


/*
|----------------------
| Configurazione globale
|----------------------
*/

setGlobalOptions({

  maxInstances: 10,

});


/*
|----------------------
| UTENTI CORE
|----------------------
|
| Fabio e Giulia sono gli amministratori proprietari
| dell'azienda e possono creare nuovi utenti.
|
*/

const CORE_USERS = [

  "wg6mQd43mJNSWUsfKEqeQDpe24i1",

  "Pa8BQHXo4MefPQV7EJKT7DvgtHn1",

];


/*
|----------------------
| CREAZIONE UTENTE
|----------------------
|
| Crea:
|
| 1. utente Firebase Authentication
| 2. documento users/{uid} in Firestore
|
*/

exports.createFirebaseUser = onCall(

    async (request) => {
      /*
        |----------------------
        | AUTENTICAZIONE
        |----------------------
        */

      if (!request.auth) {
        throw new HttpsError(

            "unauthenticated",

            "Utente non autenticato.",

        );
      }


      /*
        |----------------------
        | AUTORIZZAZIONE
        |----------------------
        */

      if (
        !CORE_USERS.includes(
            request.auth.uid,
        )
      ) {
        throw new HttpsError(

            "permission-denied",

            "Non sei autorizzato a creare nuovi utenti.",

        );
      }


      /*
        |----------------------
        | DATI RICEVUTI
        |----------------------
        */

      const {

        email,

        password,

      } =
            request.data || {};


      if (
        typeof email !== "string" ||
            !email.trim()
      ) {
        throw new HttpsError(

            "invalid-argument",

            "L'indirizzo email è obbligatorio.",

        );
      }


      if (
        typeof password !== "string" ||
            password.length < 6
      ) {
        throw new HttpsError(

            "invalid-argument",

            "La password deve contenere almeno 6 caratteri.",

        );
      }


      const normalizedEmail =
            email
                .trim()
                .toLowerCase();


      /*
        |----------------------
        | CREAZIONE FIREBASE AUTH
        |----------------------
        */

      let firebaseUser;


      try {
        firebaseUser =
                await adminAuth.createUser({

                  email:
                        normalizedEmail,

                  password,

                });
      } catch (error) {
        console.error(
            "Errore creazione utente Firebase:",
            error,
        );


        if (
          error.code ===
                "auth/email-already-exists"
        ) {
          throw new HttpsError(

              "already-exists",

              "Esiste già un utente Firebase con questo indirizzo email.",

          );
        }


        throw new HttpsError(

            "internal",

            "Impossibile creare l'utente Firebase.",

        );
      }


      /*
        |----------------------
        | CREAZIONE DOCUMENTO FIRESTORE
        |----------------------
        */

      try {
        await db
            .collection("users")
            .doc(firebaseUser.uid)
            .set({

              uid:
                        firebaseUser.uid,

              email:
                        firebaseUser.email ?? "",

              createdAt:
                        FieldValue.serverTimestamp(),

              lastLogin:
                        null,

              updatedAt:
                        FieldValue.serverTimestamp(),

            });
      } catch (error) {
        console.error(
            "Errore creazione documento Firestore:",
            error,
        );


        /*
            |----------------------
            | ROLLBACK
            |----------------------
            |
            | Se Firestore fallisce dopo la creazione
            | dell'utente Auth, eliminiamo l'utente Auth
            | per evitare un account "orfano".
            |
            */

        try {
          await adminAuth.deleteUser(
              firebaseUser.uid,
          );
        } catch (deleteError) {
          console.error(
              "Errore rollback utente Firebase:",
              deleteError,
          );
        }


        throw new HttpsError(

            "internal",

            "Utente Firebase creato ma impossibile" +
            "completare la registrazione. " +
            "Operazione annullata.",

        );
      }


      /*
        |----------------------
        | RISULTATO
        |----------------------
        */

      return {

        success:
                true,

        uid:
                firebaseUser.uid,

        email:
                firebaseUser.email,

      };
    },

);
