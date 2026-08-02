"use strict";

/*
|--------------------------------------------------------------------------
| Nuovo Fornitore
|--------------------------------------------------------------------------
*/

function showNewSupplier(){

    const workspace = document.querySelector(".km-workspace");

    workspace.innerHTML = `

        <div class="km-customer-page">

            <div class="km-page-header">

                <h1>Nuovo Fornitore</h1>

            </div>

            ${renderSupplierTabs(false)}

            <div id="km-customer-content"></div>

            <div class="km-company-footer">

                <button class="km-button">

                    Annulla

                </button>

                <button class="km-button km-button-primary">

                    Salva

                </button>

            </div>

        </div>

    `;

    showSupplierTab("anagraphic");

}

