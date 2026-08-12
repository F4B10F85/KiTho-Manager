"use strict";


function showAccess() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-access-page">

            <h2 class="km-page-title">

                Accessi

            </h2>

            <div id="km-tabs-container"></div>

            <div id="km-tab-content" class="km-page-content"></div>

            <div class="km-company-footer">

                <div class="km-company-footer-right">

                    <button class="km-button">

                        Annulla

                    </button>

                    <button class="km-button km-button-primary">

                        Salva

                    </button>

                </div>

            </div>

        </div>

        

    `;

    createTabs({

        containerId: "km-tabs-container",

        tabs: [

            {
                id: "users",
                title: "Utenti"
            },

            {
                id: "roles",
                title: "Ruoli"
            },

            {
                id: "permissions",
                title: "Permessi"
            }

        ],

        activeTab: "users",

        onChange(tabId) {

            switch (tabId) {

                case "users":

                    showUsersTab();

                    break;

                case "roles":

                    showRolesTab();

                    break;

                case "permissions":

                    showPermissionsTab();

                    break;

            }

        }

    });

}

function showUsersTab() {

    document.getElementById("km-tab-content").innerHTML = `

        <div class="km-list-page">

            <div class="km-list-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewUser()">

                    + Nuovo utente

                </button>

            </div>

            <div class="km-list-body">

                <div id="km-users-table"></div>

            </div>

        </div>

    `;

    createTable({

        containerId:"km-users-table",

        columns:[

            {
                key:"name",
                title:"Nome"
            },

            {
                key:"surname",
                title:"Cognome"
            },

            {
                title:"Ruolo",
                render: row => {

                    const role = getRoleById(row.roleId);

                    return role
                        ? role.name
                        : "";

                }
            },

            {
                key:"lastLogin",
                title:"Ultimo accesso",
                type:"date"
            },

            {
                key:"active",
                title:"Attivo",
                type:"badge"
            },

            {
                title: "Azioni",
                type: "actions",
                renderer: "renderUserActions"
            }

        ],

        data:users

    });

}
function showRolesTab(){

    const roles = getRoles();

    document.getElementById("km-tab-content").innerHTML = `

        <div class="km-list-page">

            <div class="km-list-toolbar">

                <button
                    type="button"
                    class="km-button km-button-primary"
                    onclick="showNewRole()">

                    + Aggiungi ruolo

                </button>

            </div>


            <div class="km-list-body">

                <div id="km-roles-table"></div>

            </div>

        </div>

    `;


    createTable({

        containerId: "km-roles-table",

        columns: [

            {
                key: "name",
                title: "Ruolo"
            },

            {
                key: "active",
                title: "Stato",
                type: "status"
            },

            {
                title: "Azioni",
                type: "actions",
                renderer: "renderRoleActions"
            }

        ],

        data: roles

    });

}

function showNewRole(){

    createModal({

        id: "new-role",

        title: "Nuovo Ruolo",

        size: "medium",

        content: `

            <div class="km-form-group">

                <label for="km-role-name">
                    Nome ruolo
                </label>

                <input
                    type="text"
                    id="km-role-name"
                    class="km-input"
                    autocomplete="off">

            </div>

        `,

        buttons: [

            {
                text: "Annulla",
                action: closeModal
            },

            {

                text: "Salva",

                primary: true,

                action: function(){

                    const input =
                        document.getElementById("km-role-name");

                    if(!input){

                        return;

                    }


                    const name =
                        input.value.trim();


                    if(!name){

                        alert(
                            "Inserisci il nome del ruolo."
                        );

                        return;

                    }


                    const duplicate =
                        rolesArchive.some(
                            role =>
                                String(role.name)
                                    .trim()
                                    .toLowerCase()
                                    === name.toLowerCase()
                        );


                    if(duplicate){

                        alert(
                            "Esiste già un ruolo con questo nome."
                        );

                        return;

                    }


                    const nextId =
                        rolesArchive.length > 0
                            ? Math.max(
                                ...rolesArchive.map(
                                    role => Number(role.id) || 0
                                )
                            ) + 1
                            : 1;


                    rolesArchive.push({

                        id: nextId,

                        name: name,

                        active: true

                    });


                    closeModal();


                    showRolesTab();

                }

            }

        ]

    });

}

function showPermissionsTab() {

    const modules = getSidebarModules();

    const roles = getRoles();

    let html = `

        <div class="km-settings-table">

            <table>

                <thead>

                    <tr>

                        <th>

                            Ruolo

                        </th>

    `;

    modules.forEach(module => {

        html += `

                        <th>

                            ${module}

                        </th>

        `;

    });

    html += `

                    </tr>

                </thead>

                <tbody>

    `;

    roles.forEach(role => {

        html += `

                    <tr>

                        <td>

                            ${role.name}

                        </td>

        `;

        modules.forEach(module => {

            html += `

                        <td>

                            <input
                                type="checkbox"
                                data-role="${role.name}"
                                data-module="${module}">

                        </td>

            `;

        });

        html += `

                    </tr>

        `;

    });

    html += `

                </tbody>

            </table>

        </div>

    `;

    document.getElementById("km-tab-content").innerHTML = html;

}
/*
function testModal(){

    createModal({

        id:"test",

        title:"Nuovo Utente",

        size:"medium",

        content:`

            Questo è il primo Modal
            intelligente di KiTho Business.

        `,

        buttons:[

            {

                text:"Annulla",

                action:closeModal

            },

            {

                text:"Salva",

                primary:true,

                action:function(){

                    alert("Salvataggio simulato");

                }

            }

        ]

    });

}
*/
/*
|--------------------------------------------------------------------------
| RENDER SPECIFICO DEI RUOLI
|--------------------------------------------------------------------------
*/

function renderRoleActions(role){

    const lockIcon =
        role.active === false
            ? "🔓"
            : "🔒";

    const lockTitle =
        role.active === false
            ? "Riattiva ruolo"
            : "Disattiva ruolo";


    return `

        <button
            type="button"
            class="km-action-button"
            title="Modifica ruolo"
            onclick="editRole(${role.id})">

            ✏️

        </button>

        <button
            type="button"
            class="km-action-button"
            title="${lockTitle}"
            onclick="toggleRoleStatus(${role.id})">

            ${lockIcon}

        </button>

        <button
            type="button"
            class="km-action-button"
            title="Elimina ruolo"
            onclick="deleteRole(${role.id})">

            🗑️

        </button>

    `;

}

/*
|--------------------------------------------------------------------------
| FUNZIONE MODIFICA DEI RUOLI
|--------------------------------------------------------------------------
*/

function editRole(roleId){

    const role =
        rolesArchive.find(
            item => item.id === roleId
        );


    if(!role){

        return;

    }


    createModal({

        id: "edit-role",

        title: "Modifica Ruolo",

        size: "medium",

        content: `

            <div class="km-form-group">

                <label for="km-role-name">
                    Nome ruolo
                </label>

                <input
                    type="text"
                    id="km-role-name"
                    class="km-input"
                    value="${role.name}"
                    autocomplete="off">

            </div>

        `,

        buttons: [

            {
                text: "Annulla",
                action: closeModal
            },

            {
                text: "Salva",
                primary: true,

                action: function(){

                    const input =
                        document.getElementById(
                            "km-role-name"
                        );


                    if(!input){

                        return;

                    }


                    const name =
                        input.value.trim();


                    if(!name){

                        alert(
                            "Inserisci il nome del ruolo."
                        );

                        return;

                    }


                    const duplicate =
                        rolesArchive.some(
                            item =>
                                item.id !== roleId &&
                                String(item.name)
                                    .trim()
                                    .toLowerCase()
                                    === name.toLowerCase()
                        );


                    if(duplicate){

                        alert(
                            "Esiste già un ruolo con questo nome."
                        );

                        return;

                    }


                    role.name = name;


                    closeModal();

                    showRolesTab();

                }

            }

        ]

    });

}

/*
|--------------------------------------------------------------------------
| FUNZIONE LUCCHETTO DEI RUOLI
|--------------------------------------------------------------------------
*/

function toggleRoleStatus(roleId){

    const role =
        rolesArchive.find(
            item => item.id === roleId
        );


    if(!role){

        return;

    }


    role.active =
        role.active === false;


    showRolesTab();

}

function deleteRole(roleId){

    const role =
        rolesArchive.find(
            item => item.id === roleId
        );


    if(!role){

        return;

    }


    const confirmed =
        confirm(
            `Vuoi eliminare definitivamente il ruolo "${role.name}"?`
        );


    if(!confirmed){

        return;

    }


    const index =
        rolesArchive.findIndex(
            item => item.id === roleId
        );


    if(index === -1){

        return;

    }


    rolesArchive.splice(
        index,
        1
    );


    showRolesTab();

}

/*
|--------------------------------------------------------------------------
| FUNZIONE LUCCHETTO DEL TAB UTENTI
|--------------------------------------------------------------------------
*/

function renderUserActions(user){

    const lockIcon =
        user.active === false
            ? "🔓"
            : "🔒";


    const lockTitle =
        user.active === false
            ? "Riattiva utente"
            : "Disattiva utente";


    return `

        <button
            type="button"
            class="km-action-button"
            title="Modifica utente"
            onclick="editUser('${user.username}')">

            ✏️

        </button>

        <button
            type="button"
            class="km-action-button"
            title="${lockTitle}"
            onclick="toggleUserStatus('${user.username}')">

            ${lockIcon}

        </button>

        <button
            type="button"
            class="km-action-button"
            title="Elimina utente"
            onclick="deleteUser('${user.username}')">

            🗑️

        </button>

    `;

}

function toggleUserStatus(username){

    const user =
        users.find(
            item => item.username === username
        );

    if(!user){

        return;

    }

    user.active =
        user.active === false;

    showUsersTab();

}

function deleteUser(username){

    const user =
        users.find(
            item => item.username === username
        );

    if(!user){

        return;

    }

    const confirmed =
        confirm(
            `Vuoi eliminare definitivamente l'utente "${user.name} ${user.surname}"?`
        );

    if(!confirmed){

        return;

    }

    const index =
        users.findIndex(
            item => item.username === username
        );

    if(index === -1){

        return;

    }

    users.splice(
        index,
        1
    );

    showUsersTab();

}