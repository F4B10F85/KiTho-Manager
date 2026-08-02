"use strict";

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
| Gestisce la navigazione interna del gestionale.
|--------------------------------------------------------------------------
*/

function navigate(page) {

    const user = getCurrentUser();

    const moduleId = getModuleId(page);

    if (!hasModuleAccess(user.role, moduleId)) {

        alert("Accesso negato.");

        return;

    }

    setActiveMenu(page);

    setNavigationContext(page);

    switch (page) {

        case "dashboard":
            showDashboard();
            break;

        case "new-order":
            showNewOrder();
            break;

        case "orders-list":
            showOrdersList();
            break;

        case "records":
            showCustomers();
            break;

        case "orders":
            showOrders();
            break;
        
        case "purchasing":
            showPurchasing();
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

        case "items":
            showItems();
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

        case "company":
            showCompany();
            break;

        case "access":
            showAccess();
            break;

        case "documents":
            showDocuments();
            break;

        case "appearance":
            showAppearance();
            break;

        case "system":
            showSystem();
            break;

        default:

            console.error("Pagina non trovata:", page);

    }

}

/*
|--------------------------------------------------------------------------
| Evidenzia il menu attivo
|--------------------------------------------------------------------------
*/

