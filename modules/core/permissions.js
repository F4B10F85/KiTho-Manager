"use strict";

/*
|--------------------------------------------------------------------------
| Ruoli
|--------------------------------------------------------------------------
*/

const rolesArchive = [

    {
        id: 1,
        name: "Amministratore",
        permissionKey: "ADMIN",
        active: true
    },

    {
        id: 2,
        name: "Produzione",
        permissionKey: "PRODUZIONE",
        active: true
    },

    {
        id: 3,
        name: "Magazzino",
        permissionKey: "MAGAZZINO",
        active: true
    },

    {
        id: 4,
        name: "Commerciale",
        permissionKey: "COMMERCIALE",
        active: true
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

function getRoleById(roleId){

    return rolesArchive.find(
        role => role.id === roleId
    ) ?? null;

}


function getCurrentUserRole(){

    const user = getCurrentUser();

    if(!user){

        return null;

    }

    return getRoleById(user.roleId);

}

