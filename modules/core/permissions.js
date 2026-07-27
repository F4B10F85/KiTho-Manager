"use strict";
console.log("permissions.js caricato");
/*
|--------------------------------------------------------------------------
| Ruoli
|--------------------------------------------------------------------------
*/

const rolesArchive = [

    {
        id: 1,
        name: "Amministratore"
    },

    {
        id: 2,
        name: "Produzione"
    },

    {
        id: 3,
        name: "Magazzino"
    },

    {
        id: 4,
        name: "Commerciale"
    }

];

/*
|--------------------------------------------------------------------------
| Moduli della sidebar
|--------------------------------------------------------------------------
*/

function getSidebarModules(){

    return menu.map(item => item.title);

}

/*
|--------------------------------------------------------------------------
| Ruoli
|--------------------------------------------------------------------------
*/

function getRoles(){

    return rolesArchive;

}