"use strict";

/*
|--------------------------------------------------------------------------
| Scheda Fornitore
|--------------------------------------------------------------------------
*/

function showSupplierDetails(supplierCode){

    const supplier = suppliers.find(

        supplier => supplier.code === supplierCode

    );

    if(!supplier){

        return;

    }


    /*
    |--------------------------------------------------------------------------
    | Crea una copia di lavoro
    |--------------------------------------------------------------------------
    */

    currentSupplier = {
        ...supplier
    };


    const workspace =
        document.querySelector(".km-workspace");


    workspace.innerHTML = `

        <div class="km-customer-page">

            <div class="km-page-header">

                <h1>${currentSupplier.companyName}</h1>

            </div>

            ${renderSupplierTabs()}

            <div id="km-customer-content"></div>

            <div class="km-company-footer">

                <button
                    type="button"
                    class="km-button"
                    onclick="cancelSupplierEdit()">

                    Annulla

                </button>

                <button
                    type="button"
                    class="km-button km-button-primary"
                    onclick="saveSupplierChanges()">

                    Salva

                </button>

            </div>

        </div>

    `;


    showSupplierTab(
        "anagraphic",
        currentSupplier
    );

}

/**
FUNZIONE_v03 PER LA FASCIA RIASSUNTIVA
*/

function renderSupplierSummary(supplier){

    return `

        <div class="km-customer-summary">

            <div class="km-summary-card">
                <div class="km-summary-title">Ordini</div>
                <div class="km-summary-value">0</div>
            </div>

            <div class="km-summary-card">
                <div class="km-summary-title">DDT</div>
                <div class="km-summary-value">0</div>
            </div>

            <div class="km-summary-card">
                <div class="km-summary-title">Fatture</div>
                <div class="km-summary-value">0</div>
            </div>

            <div class="km-summary-card">
                <div class="km-summary-title">Ultimo ordine</div>
                <div class="km-summary-value">--</div>
            </div>

            <div class="km-summary-card km-summary-highlight">
                <div class="km-summary-title">Totale fatturato</div>
                <div class="km-summary-value">€ 0,00</div>
            </div>

            <div class="km-summary-card">
                <div class="km-summary-title">Stato fornitore</div>
                <div class="km-summary-value">
                    🟢 Attivo
                </div>
            </div>

        </div>

    `;

}

function cancelSupplierEdit(){

    renderSuppliersPage();

}

function saveSupplierChanges(){

    const activeTab =
        document.querySelector(
            ".km-tab.active[data-tab]"
        );


    if(activeTab){

        const currentTabId =
            activeTab.dataset.tab;


        saveCurrentSupplierTab(
            currentTabId
        );

    }


    if(!currentSupplier){

        return;

    }


    if(
        !currentSupplier.companyName ||
        !currentSupplier.companyName.trim()
    ){

        alert(
            "Inserisci la ragione sociale."
        );

        return;

    }


    const supplierIndex =
        suppliers.findIndex(

            supplier =>
                supplier.code === currentSupplier.code

        );


    if(supplierIndex === -1){

        return;

    }


    suppliers[supplierIndex] = {
        ...currentSupplier
    };


    renderSuppliersPage();

}