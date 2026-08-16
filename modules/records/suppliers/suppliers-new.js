"use strict";

/*
|--------------------------------------------------------------------------
| Nuovo Fornitore
|--------------------------------------------------------------------------
*/


function showNewSupplier(){

    const workspace =
        document.querySelector(".km-workspace");


    const newSupplierCode =
        getNextSupplierCode();


    workspace.innerHTML = `

        <div class="km-customer-page">

            <div class="km-page-header">

                <h1>Nuovo Fornitore</h1>

            </div>

            ${renderSupplierTabs(false)}

            <div id="km-customer-content"></div>

            <div class="km-company-footer">

                <button
                    type="button"
                    class="km-button"
                    onclick="renderSuppliersPage()">

                    Annulla

                </button>

                <button
                    type="button"
                    class="km-button km-button-primary"
                    onclick="saveNewSupplier()">

                    Salva

                </button>

            </div>

        </div>

    `;


    showSupplierTab(
        "anagraphic",
        {
            code: newSupplierCode
        }
    );

}

