"use strict";

/*
|--------------------------------------------------------------------------
| Nuovo Cliente
|--------------------------------------------------------------------------
*/

function showNewCustomer(){

    const workspace = document.querySelector(".km-workspace");

    const newCustomerCode = getNextCustomerCode();

    workspace.innerHTML = `

        <div class="km-customer-page">

            <div class="km-page-header">

                <h1>Nuovo Cliente</h1>

            </div>

            ${renderCustomerTabs(false)}

            <div id="km-customer-content"></div>

            <div class="km-company-footer">

                <button
                    type="button"
                    class="km-button"
                    onclick="renderCustomersPage()">

                    Annulla

                </button>


                <button
                    type="button"
                    class="km-button km-button-primary"
                    onclick="saveNewCustomer()">

                    Salva

                </button>

            </div>

        </div>

    `;

    showCustomerTab(
        "anagraphic",
        {
            code: newCustomerCode
        }
    );

}

function getNextCustomerCode(){

    let maxNumber = 0;

    customers.forEach(
        customer => {

            const match =
                String(customer.code || "")
                    .match(/^C(\d+)$/);

            if(!match){

                return;

            }

            const number =
                parseInt(
                    match[1],
                    10
                );

            if(number > maxNumber){

                maxNumber = number;

            }

        }
    );


    return `C${String(maxNumber + 1).padStart(5, "0")}`;

}
