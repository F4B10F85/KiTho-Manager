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

    setNavigationContext("dashboard");

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

function showPurchasing() {

    setWorkspacePage("purchasing");

}

function showProduction() {

    setWorkspacePage("production");

}

function showItems() {

    setWorkspacePage("items");

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

function showCompany(){

    renderCompanyPage();

}

function showAccess() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page">

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
                    onclick="testModal()">

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
                key:"role",
                title:"Ruolo"
            },

            {
                key:"active",
                title:"Attivo",
                type:"badge"
            },

            {
                key:"lastLogin",
                title:"Ultimo accesso",
                type:"date"
            },

            {
                title:"Azioni",
                type:"actions"
            }

        ],

        data:users

    });

}

function showRolesTab() {

    const roles = getRoles();

    let rows = "";

    roles.forEach(role => {

        rows += `

            <tr>

                <td>

                    ${role.name}

                </td>

                <td class="km-settings-actions">

                    ✏️ 🗑

                </td>

            </tr>

        `;

    });

    document.getElementById("km-tab-content").innerHTML = `

        <div class="km-page">

            <div class="km-settings-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="testModal2()">

                    + Aggiungi ruolo

                </button>

            </div>

            <div class="km-page-content">

                <div class="km-settings-table">

                    <table>

                        <thead>

                            <tr>

                                <th>

                                    Ruolo

                                </th>

                                <th>

                                    Azioni

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            ${rows}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    `;

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

function showDocuments(){

    renderDocumentsPage();

}

function showAppearance(){

    renderAppearancePage();

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

function testModal2(){

    createModal({

        id:"test",

        title:"Nuovo Utente",

        size:"medium",

        content:`

            Questo è il secondo Modal
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