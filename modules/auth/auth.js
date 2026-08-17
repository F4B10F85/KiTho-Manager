"use strict";

/*
|--------------------------------------------------------------------------
| Authentication Engine
|--------------------------------------------------------------------------
| Gestisce autenticazione Firebase e autorizzazione applicativa.
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Cerca un utente tramite username
|--------------------------------------------------------------------------
*/

function findUser(username){

    return users.find(
        user =>
            user.username ===
            String(username ?? "").trim().toUpperCase()
    );

}


/*
|--------------------------------------------------------------------------
| Autenticazione
|--------------------------------------------------------------------------
*/

async function authenticate(
    username,
    password
){

    const user =
        findUser(username);


    if(!user){

        return {

            success:
                false,

            message:
                "Utente inesistente"

        };

    }


    if(!user.active){

        return {

            success:
                false,

            message:
                "Utente disattivato"

        };

    }


    if(!user.firebaseEmail){

        return {

            success:
                false,

            message:
                "Utente non configurato per l'autenticazione."

        };

    }


    try{

        const firebaseUser =
            await window.authAPI.login(

                user.firebaseEmail,

                password

            );


        /*
        |--------------------------------------------------------------------------
        | Verifichiamo che Firebase abbia autenticato effettivamente un utente.
        |--------------------------------------------------------------------------
        */

        if(!firebaseUser){

            return {

                success:
                    false,

                message:
                    "Autenticazione Firebase non riuscita."

            };

        }


        /*
        |--------------------------------------------------------------------------
        | Controllo UID Firebase
        |--------------------------------------------------------------------------
        */

        if(
            firebaseUser.uid !==
            user.firebaseUid
        ){

            await window.authAPI.logout();

            return {

                success:
                    false,

                message:
                    "Utente Firebase non autorizzato."

            };

        }


        /*
        |--------------------------------------------------------------------------
        | Controllo opzionale di corrispondenza email.
        |--------------------------------------------------------------------------
        */

        if(
            firebaseUser.email?.toLowerCase() !==
            user.firebaseEmail.toLowerCase()
        ){

            await window.authAPI.logout();

            return {

                success:
                    false,

                message:
                    "Utente Firebase non corrispondente."

            };

        }


        return {

            success:
                true,

            user,

            firebaseUser

        };

    }catch(error){

        console.error(
            "Errore autenticazione Firebase:",
            error
        );


        let message =
            "Errore durante l'autenticazione.";


        switch(error.code){

            case "auth/invalid-credential":
            case "auth/wrong-password":
            case "auth/user-not-found":

                message =
                    "Nome utente o password errati.";

                break;


            case "auth/invalid-email":

                message =
                    "Configurazione email Firebase non valida.";

                break;


            case "auth/too-many-requests":

                message =
                    "Troppi tentativi. Riprova più tardi.";

                break;

        }


        return {

            success:
                false,

            message

        };

    }

}