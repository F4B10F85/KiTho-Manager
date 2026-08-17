"use strict";

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

async function logout(){

    try{

        await window.authAPI.logout();

    }catch(error){

        console.error(
            "Errore logout Firebase:",
            error
        );

        return;

    }


    clearCurrentUser();

    buildApplication();

}