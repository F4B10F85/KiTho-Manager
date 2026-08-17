"use strict";


/*
|---------------------------------------------------------------------------
| Utenti applicativi
|---------------------------------------------------------------------------
|
| Questo file NON contiene più le password.
|
| Le credenziali di accesso sono gestite esclusivamente da
| Firebase Authentication.
|
| Questo dataset contiene solamente le informazioni applicative
| dell'utente utilizzate da KiTho Business.
|
| Utenti autorizzati:
|
| FABIO.FILIPPINI
| GIULIA.CALDARI
|
|--------------------------------------------------------------------------- 
*/


const users = [

    {
        username:
            "FABIO.FILIPPINI",

        name:
            "Fabio",

        surname:
            "Filippini",

        firebaseEmail:
            "fab.filippini@gmail.com",

        firebaseUid:
            "",

        roleId:
            1,

        active:
            true,

        createdAt:
            "2026-07-20 09:00:00",

        lastLogin:
            null
    },


    {
        username:
            "GIULIA.CALDARI",

        name:
            "Giulia",

        surname:
            "Caldari",

        firebaseEmail:
            "",

        firebaseUid:
            "",

        roleId:
            1,

        active:
            true,

        createdAt:
            "2026-07-15 10:20:00",

        lastLogin:
            null
    }

];