"use strict";

/*
|--------------------------------------------------------------------------
| Nuovo Cliente
|--------------------------------------------------------------------------
*/

function showNewCustomer(){

    const workspace = document.querySelector(".km-workspace");

    workspace.innerHTML = `

        <div class="km-customer-page">

            <div class="km-page-header">

                <h1>Nuovo Cliente</h1>

            </div>

            ${renderCustomerTabs()}

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

    showCustomerTab("anagraphic");

}

