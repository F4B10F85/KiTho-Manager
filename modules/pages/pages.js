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