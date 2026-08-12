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


function showDashboard(){

    renderDashboard();

}

function showOrders() {

    setWorkspacePage("orders");

}

function showSalesOrders() {

    setWorkspacePage("sales-order");

}

function showPurchasingOrders() {

    setWorkspacePage("purchasing-order");

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

function showSalesInvoices() {

    setWorkspacePage("sales-invoices");

}

function showPurchasingInvoices() {

    setWorkspacePage("purchasing-invoices");

}

function showWarehouse() {

    setWorkspacePage("warehouse");

}

function showStockWarehouse() {

    setWorkspacePage("stock-warehouse");

}

function showPNWarehouse() {

    setWorkspacePage("pn-warehouse");

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

    setWorkspacePage("access");

}

function showWarehouses() {

    renderWarehousesPage();

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

function showBOM(){

    setWorkspacePage("bom");

}