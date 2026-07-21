"use strict";

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
| Gestisce la navigazione interna del gestionale.
|--------------------------------------------------------------------------
*/

function navigate(page) {

    switch (page) {

        case "dashboard":
            showDashboard();
            break;

        case "new-order":
            showNewOrder();
            break;

        case "customers":
            showCustomers();
            break;

        case "orders":
            showOrders();
            break;

        case "production":
            showProduction();
            break;

        case "ddt":
            showDDT();
            break;

        case "invoices":
            showInvoices();
            break;

        case "warehouse":
            showWarehouse();
            break;

        case "statistics":
            showStatistics();
            break;

        case "settings":
            showSettings();
            break;

        default:

            setWorkspaceTitle("Pagina non trovata");

    }

}