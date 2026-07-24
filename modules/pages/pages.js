"use strict";

/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
| Ogni funzione rappresenta una pagina del gestionale.
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
|
| Dashboard temporanea.
|
| In questa fase mostra solamente il logo aziendale.
|
| FUTURA IMPLEMENTAZIONE:
|
| - KPI commerciali
| - Ordini da evadere
| - Produzione
| - DDT
| - Statistiche
|
|--------------------------------------------------------------------------
*/


function showDashboard() {

    //setWorkspaceTitle("Dashboard");

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-dashboard">

            <img
                src="assets/images/logo_KTB.png"
                class="km-dashboard-logo"
                alt="KiTho Business">

        </div>

    `;

}

function showNewOrder() {

    setWorkspacePage("new-order");

}

function showOrders() {

    setWorkspacePage("orders");

}

function showProduction() {

    setWorkspacePage("production");

}

function showDDT() {

    setWorkspacePage("ddt");

}

function showInvoices() {

    setWorkspacePage("invoices");

}

function showWarehouse() {

    setWorkspacePage("warehouse");

}

function showStatistics() {

    setWorkspacePage("statistics");

}

function showSettings() {

    setWorkspacePage("settings");

}

function showCompany() {

    const workspace =
        document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page-placeholder">

            <h2>Azienda</h2>

            <p>
                Modulo disponibile dalla milestone M8.
            </p>

        </div>

    `;

}

function showAccess() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page">

            <h2 class="km-page-title">

                Accessi

            </h2>

            <div id="km-tabs-container"></div>

            <div id="km-tab-content"></div>

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

        <div class="km-placeholder">

            <h3>

                Utenti

            </h3>

            <button class="km-primary-button">

                + Nuovo utente

            </button>

            <p>

                Elenco utenti disponibile dalla milestone M8.

            </p>

        </div>

    `;

}

function showRolesTab() {

    document.getElementById("km-tab-content").innerHTML = `

        <div class="km-placeholder">

            <h3>

                Ruoli

            </h3>

            <p>

                Gestione ruoli disponibile dalla milestone M8.

            </p>

        </div>

    `;

}

function showPermissionsTab() {

    document.getElementById("km-tab-content").innerHTML = `

        <div class="km-placeholder">

            <h3>

                Permessi

            </h3>

            <p>

                Matrice permessi disponibile dalla milestone M8.

            </p>

        </div>

    `;

}


/**
function showAccess() {

    const workspace =
        document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page-placeholder">

            <h2>Accessi</h2>

            <p>
                Modulo disponibile dalla milestone M8.
            </p>

        </div>

    `;

}
*/
function showDocuments() {

    const workspace =
        document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page-placeholder">

            <h2>Documenti</h2>

            <p>
                Modulo disponibile dalla milestone M8.
            </p>

        </div>

    `;

}

function showAppearance() {

    const workspace =
        document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page-placeholder">

            <h2>Aspetto</h2>

            <p>
                Modulo disponibile dalla milestone M8.
            </p>

        </div>

    `;

}

function showSystem() {

    const workspace =
        document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page-placeholder">

            <h2>Sistema</h2>

            <p>
                Modulo disponibile dalla milestone M8.
            </p>

        </div>

    `;

}

function showCustomers() {

    setWorkspacePage("customers");

}

function showSuppliers() {

    setWorkspacePage("suppliers");

}

function showAgents() {

    setWorkspacePage("agents");

}

function showCarriers() {

    setWorkspacePage("carriers");

}

function showDDTSales() {

    setWorkspacePage("ddt-sales");

}

function showDDTGift() {

    setWorkspacePage("ddt-gift");

}

function showDDTAccountSale() {

    setWorkspacePage("ddt-account-sale");

}

function showOrdersList() {

    setWorkspacePage("orders-list");

}