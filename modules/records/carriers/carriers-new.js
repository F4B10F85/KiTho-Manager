"use strict";

/*
|--------------------------------------------------------------------------
| Nuovo Trasportatore
|--------------------------------------------------------------------------
*/

function showNewCarrier(){

    const workspace = document.querySelector(".km-workspace");

    workspace.innerHTML = `

        <div class="km-customer-page">

            <div class="km-page-header">

                <h1>Nuovo Trasportatore</h1>

            </div>

            ${renderCarrierTabs(false)}

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

    showCarrierTab("anagraphic");

}

