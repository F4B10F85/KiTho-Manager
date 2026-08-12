"use strict"

function showNewUser(){

    const workspace =
        document.querySelector(".km-workspace");

    workspace.innerHTML = `

        <div class="km-user-page">

            <div class="km-page-header">

                <h1>Nuovo Utente</h1>

            </div>


            <div id="km-user-content"></div>


            <div class="km-company-footer">

                <button
                    type="button"
                    class="km-button"
                    onclick="showAccess();">

                    Annulla

                </button>

                <button
                    type="button"
                    id="km-save-user-button"
                    class="km-button km-button-primary"
                    onclick="saveNewUser();">

                    Salva

                </button>

            </div>

        </div>

    `;

    renderUserForm();

}

function renderUserForm(user = {}){

    const content =
        document.getElementById("km-user-content");

    if(!content){

        return;

    }


    const roleOptions =
        rolesArchive
            .filter(role => role.active !== false)
            .map(
                role => `

                    <option
                        value="${role.id}"
                        ${
                            user.roleId === role.id
                                ? "selected"
                                : ""
                        }>

                        ${role.name}

                    </option>

                `
            )
            .join("");


    content.innerHTML = `

        <div class="km-form-grid">

            <div class="km-form-field">

                <label>
                    Nome
                </label>

                <input
                    type="text"
                    id="km-user-name-input"
                    value="${user.name ?? ""}">

            </div>


            <div class="km-form-field">

                <label>
                    Cognome
                </label>

                <input
                    type="text"
                    id="km-user-surname-input"
                    value="${user.surname ?? ""}">

            </div>


            <div class="km-form-field">

                <label>
                    Username
                </label>

                <input
                    type="text"
                    id="km-user-username-input"
                    value="${user.username ?? ""}">

            </div>


            <div class="km-form-field">

                <label>
                    Password
                </label>

                <div class="km-password-wrapper">

                    <input
                        type="password"
                        id="km-user-password-input"
                        value="${user.password ?? ""}">

                    <button
                        type="button"
                        class="km-password-toggle"
                        title="Mostra password"
                        onclick="toggleUserPassword()">

                        👁

                    </button>

                </div>

            </div>


            <div class="km-form-field">

                <label>
                    Ruolo
                </label>

                <select
                    id="km-user-role-input">

                    <option value="">
                        Seleziona ruolo
                    </option>

                    ${roleOptions}

                </select>

            </div>


            <div class="km-form-field">

                <label>
                    Stato
                </label>

                <select
                    id="km-user-active-input">

                    <option
                        value="true"
                        ${
                            user.active !== false
                                ? "selected"
                                : ""
                        }>

                        Attivo

                    </option>

                    <option
                        value="false"
                        ${
                            user.active === false
                                ? "selected"
                                : ""
                        }>

                        Disattivo

                    </option>

                </select>

            </div>

        </div>

    `;

}

function saveNewUser(){

    const name =
        document.getElementById(
            "km-user-name-input"
        ).value.trim();


    const surname =
        document.getElementById(
            "km-user-surname-input"
        ).value.trim();


    const username =
        document.getElementById(
            "km-user-username-input"
        ).value.trim();


    const password =
        document.getElementById(
            "km-user-password-input"
        ).value;


    const roleIdValue =
        document.getElementById(
            "km-user-role-input"
        ).value;


    const activeValue =
        document.getElementById(
            "km-user-active-input"
        ).value;


    if(!name || !surname || !username){

        alert(
            "Nome, cognome e username sono obbligatori."
        );

        return;

    }


    if(!roleIdValue){

        alert(
            "Seleziona un ruolo."
        );

        return;

    }


    const usernameExists =
        users.some(
            user =>
                user.username.toLowerCase()
                === username.toLowerCase()
        );


    if(usernameExists){

        alert(
            "Esiste già un utente con questo username."
        );

        return;

    }


    users.push({

        username: username,

        name: name,

        surname: surname,

        password: password,

        roleId: Number(roleIdValue),

        active: activeValue === "true",

        createdAt:
            new Date().toISOString(),

        lastLogin: null

    });

    const saveButton =
        document.getElementById(
            "km-save-user-button"
        );


    if(saveButton){

        saveButton.textContent = "Salvato";

        saveButton.disabled = true;

    }

    showUsersTab();

}

function toggleUserPassword(){

    const input =
        document.getElementById(
            "km-user-password-input"
        );

    const button =
        document.querySelector(
            ".km-password-toggle"
        );

    if(!input){

        return;

    }

    if(input.type === "password"){

        input.type = "text";

        if(button){

            button.textContent = "🙈";
            button.title = "Nascondi password";

        }

    } else {

        input.type = "password";

        if(button){

            button.textContent = "👁";
            button.title = "Mostra password";

        }

    }

}


function editUser(username){

    const user =
        users.find(
            item => item.username === username
        );

    if(!user){

        return;

    }

    const workspace =
        document.querySelector(".km-workspace");

    workspace.innerHTML = `

        <div class="km-user-page">

            <div class="km-page-header">

                <h1>Modifica Utente</h1>

            </div>


            <div id="km-user-content"></div>


            <div class="km-company-footer">

                <button
                    type="button"
                    class="km-button"
                    onclick="showAccess();">

                    Annulla

                </button>

                <button
                    type="button"
                    id="km-save-user-button"
                    class="km-button km-button-primary"
                    onclick="saveEditedUser('${user.username}');">

                    Salva

                </button>

            </div>

        </div>

    `;

    renderUserForm(user);

}

function saveEditedUser(username){

    const user =
        users.find(
            item => item.username === username
        );

    if(!user){

        alert("Utente non trovato.");

        return;

    }


    const name =
        document
            .getElementById("km-user-name-input")
            .value
            .trim();

    const surname =
        document
            .getElementById("km-user-surname-input")
            .value
            .trim();

    const password =
        document
            .getElementById("km-user-password-input")
            .value;

    const roleId =
        Number(
            document
                .getElementById("km-user-role-input")
                .value
        );

    const active =
        document
            .getElementById("km-user-active-input")
            .value === "true";


    if(!name || !surname){

        alert("Nome e cognome sono obbligatori.");

        return;

    }


    if(!password){

        alert("La password è obbligatoria.");

        return;

    }


    if(!roleId){

        alert("Seleziona un ruolo.");

        return;

    }


    user.name = name;

    user.surname = surname;

    user.password = password;

    user.roleId = roleId;

    user.active = active;


    alert("Utente modificato correttamente.");

    showAccess();

}