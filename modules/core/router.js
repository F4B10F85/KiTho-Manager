"use strict";

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
| Gestisce la navigazione interna del gestionale.
|--------------------------------------------------------------------------
*/

function navigate(page) {

    setActiveMenu(page);

    switch (page) {

        case "dashboard":
            showDashboard();
            break;

        case "new-order":
            showNewOrder();
            break;

        case "records":
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

        case "ddt-sales":
            showDDTSales();
            break;

        case "ddt-gift":
            showDDTGift();
            break;

        case "ddt-account-sale":
            showDDTAccountSale();
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

        case "customers":
            showCustomers();
            break;

        case "suppliers":
            showSuppliers();
            break;

        case "agents":
            showAgents();
            break;

        case "carriers":
            showCarriers();
            break;

        default:

            setWorkspaceTitle("Pagina non trovata");

    }

}

/*
|--------------------------------------------------------------------------
| Evidenzia il menu attivo
|--------------------------------------------------------------------------
*/

