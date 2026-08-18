"use strict";

/*
|--------------------------------------------------------------------------
| Profilo utente
|--------------------------------------------------------------------------
| Scheda informativa dell'utente autenticato.
|
| Nessun dato è modificabile da questa schermata.
|--------------------------------------------------------------------------
*/


function formatProfileDate(value){

    if(!value){

        return "—";

    }


    const date =
        value instanceof Date
            ? value
            : new Date(value);


    if(Number.isNaN(date.getTime())){

        return String(value);

    }


    return date.toLocaleString(
        "it-IT",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/*
|--------------------------------------------------------------------------
| Nome ruolo
|--------------------------------------------------------------------------
*/

function getProfileRoleName(user){

    if(user?.roleName){

        return user.roleName;

    }


    if(user?.role){

        if(typeof user.role === "string"){

            return user.role;

        }

        if(user.role.name){

            return user.role.name;

        }

        if(user.role.label){

            return user.role.label;

        }

    }


    const rolesById = {

        1:
            "Amministratore",

        2:
            "CEO",

        3:
            "Commerciale",

        4:
            "Magazziniere"

    };


    return rolesById[user?.roleId] || "—";

}


/*
|--------------------------------------------------------------------------
| Profilo
|--------------------------------------------------------------------------
*/

async function showUserProfile(){

    const workspace =
        document.getElementById(
            "km-workspace"
        );


    if(!workspace){

        return;

    }


    const user =
        getCurrentUser();


    if(!user){

        return;

    }


    const firebaseUser =
        window.authAPI
            ?.getCurrentFirebaseUser();


    const firebaseEmail =
        firebaseUser?.email ||
        user.firebaseEmail ||
        "—";


    const firebaseUid =
        firebaseUser?.uid ||
        user.firebaseUid ||
        "—";


    const creationDate =
        firebaseUser?.metadata?.creationTime ||
        user.createdAt ||
        null;


    const lastLogin =
        firebaseUser?.metadata?.lastSignInTime ||
        user.lastLogin ||
        null;


    const fullName =
        `${user.name || ""} ${user.surname || ""}`
            .trim();


    workspace.innerHTML = `

        <div class="km-page km-profile-page">

            <div class="km-page-header">

                <div>

                    <span class="km-profile-eyebrow">
                        ACCOUNT
                    </span>

                    <h1>
                        Profilo
                    </h1>

                </div>

            </div>


            <div class="km-profile-layout">


                <!-- ======================================================
                     IDENTITÀ
                     ====================================================== -->

                <section class="km-profile-hero">

                    <div class="km-profile-avatar">

                        ${
                            String(
                                user.name || "?"
                            )
                            .charAt(0)
                            .toUpperCase()
                        }${
                            String(
                                user.surname || ""
                            )
                            .charAt(0)
                            .toUpperCase()
                        }

                    </div>


                    <div class="km-profile-identity">

                        <h2>
                            ${fullName || "Utente"}
                        </h2>

                        <div class="km-profile-role">

                            ${getProfileRoleName(user)}

                        </div>

                        <div class="km-profile-status">

                            <span
                                class="km-profile-status-dot">
                            </span>

                            ${
                                user.active === false
                                    ? "Account disattivato"
                                    : "Account attivo"
                            }

                        </div>

                    </div>

                </section>


                <!-- ======================================================
                     DATI UTENTE
                     ====================================================== -->

                <section class="km-profile-card">

                    <div class="km-profile-card-header">

                        <div>

                            <span class="km-profile-section-label">
                                IDENTITÀ
                            </span>

                            <h3>
                                Dati utente
                            </h3>

                        </div>

                    </div>


                    <div class="km-profile-grid">


                        <div class="km-profile-field">

                            <span>
                                Nome
                            </span>

                            <strong>
                                ${user.name || "—"}
                            </strong>

                        </div>


                        <div class="km-profile-field">

                            <span>
                                Cognome
                            </span>

                            <strong>
                                ${user.surname || "—"}
                            </strong>

                        </div>


                        <div class="km-profile-field">

                            <span>
                                Nome utente
                            </span>

                            <strong class="km-profile-mono">
                                ${user.username || "—"}
                            </strong>

                        </div>


                        <div class="km-profile-field">

                            <span>
                                Ruolo aziendale
                            </span>

                            <strong>
                                ${getProfileRoleName(user)}
                            </strong>

                        </div>


                    </div>

                </section>


                <!-- ======================================================
                     ACCOUNT
                     ====================================================== -->

                <section class="km-profile-card">

                    <div class="km-profile-card-header">

                        <div>

                            <span class="km-profile-section-label">
                                ACCOUNT
                            </span>

                            <h3>
                                Informazioni account
                            </h3>

                        </div>

                    </div>


                    <div class="km-profile-grid">

                        <div class="km-profile-field">

                            <span>
                                Email
                            </span>

                            <strong>
                                ${firebaseEmail}
                            </strong>

                        </div>


                        <div class="km-profile-field">

                            <span>
                                Stato
                            </span>

                            <strong>

                                <span
                                    class="km-profile-state ${
                                        user.active === false
                                            ? "is-inactive"
                                            : "is-active"
                                    }">

                                    ${
                                        user.active === false
                                            ? "Disattivo"
                                            : "Attivo"
                                    }

                                </span>

                            </strong>

                        </div>


                        <div class="km-profile-field">

                            <span>
                                Account creato
                            </span>

                            <strong>
                                ${formatProfileDate(creationDate)}
                            </strong>

                        </div>


                        <div class="km-profile-field">

                            <span>
                                Ultimo accesso
                            </span>

                            <strong>
                                ${formatProfileDate(lastLogin)}
                            </strong>

                        </div>

                    </div>

                </section>


                <!-- ======================================================
                     SICUREZZA
                     ====================================================== -->

                <section class="km-profile-card km-profile-security">

                    <div class="km-profile-card-header">

                        <div>

                            <span class="km-profile-section-label">
                                SICUREZZA
                            </span>

                            <h3>
                                Autenticazione
                            </h3>

                        </div>

                        <div class="km-profile-security-badge">

                            <span></span>

                            Firebase Authentication

                        </div>

                    </div>


                    <div class="km-profile-security-content">


                        <div class="km-profile-security-row">

                            <div>

                                <span class="km-profile-security-title">
                                    Account autenticato
                                </span>

                                <span class="km-profile-security-description">
                                    L'accesso a KiTho Business è gestito
                                    tramite Firebase Authentication.
                                </span>

                            </div>


                            <strong>
                                Attivo
                            </strong>

                        </div>


                        <div class="km-profile-security-row">

                            <div>

                                <span class="km-profile-security-title">
                                    Identificativo account
                                </span>

                                <span class="km-profile-security-description km-profile-mono">
                                    ${firebaseUid}
                                </span>

                            </div>

                        </div>


                    </div>

                </section>


            </div>

        </div>

    `;

}