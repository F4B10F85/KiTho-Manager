"use strict";

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
| Gestisce la navigazione interna del gestionale.
|--------------------------------------------------------------------------
*/

function navigate(page) {

    highlightMenu(page);

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

/*
|--------------------------------------------------------------------------
| Evidenzia il menu attivo
|--------------------------------------------------------------------------
*/

function highlightMenu(page) {

    const buttons = document.querySelectorAll(".km-menu-button");

    buttons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.page === page) {

            button.classList.add("active");

        }

    });

}