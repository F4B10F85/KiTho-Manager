"use strict";

/*
|--------------------------------------------------------------------------
| Scheda Cliente
|--------------------------------------------------------------------------
*/

function showCustomerDetails(customerCode){

    const customer = customers.find(

        customer => customer.code === customerCode

    );

    if(!customer){

        return;

    }


    const workspace =
        document.querySelector(".km-workspace");


    workspace.innerHTML = `

        <div class="km-customer-page">

            <div class="km-page-header">

                <h1>${customer.companyName}</h1>

            </div>


            ${renderCustomerSummary(customer)}


            ${renderCustomerTabs()}


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
                    onclick="saveCustomerChanges('${customer.code}')">

                    Salva

                </button>

            </div>

        </div>

    `;


    showCustomerTab(
        "anagraphic",
        customer
    );

}




/**
FUNZIONE_v01 PER LA FASCIA RIASSUNTIVA


function renderCustomerSummary(customer){

    return `

        <div class="km-customer-summary">

            <div class="km-summary-card">

                <div class="km-summary-title">

                    Ordini

                </div>

                <div class="km-summary-value">

                    0

                </div>

            </div>

            <div class="km-summary-card">

                <div class="km-summary-title">

                    DDT

                </div>

                <div class="km-summary-value">

                    0

                </div>

            </div>

            <div class="km-summary-card">

                <div class="km-summary-title">

                    Fatture

                </div>

                <div class="km-summary-value">

                    0

                </div>

            </div>

            <div class="km-summary-card">

                <div class="km-summary-title">

                    Ultimo ordine

                </div>

                <div class="km-summary-value">

                    --

                </div>

            </div>

            <div class="km-summary-card">

                <div class="km-summary-title">

                    Totale fatturato

                </div>

                <div class="km-summary-value">

                    € 0,00

                </div>

            </div>

        </div>

    `;

}
*/

/**
FUNZIONE_v21 PER LA FASCIA RIASSUNTIVA

function renderCustomerSummary(){

    return `

        <div class="km-customer-summary">

            <div class="km-customer-summary-left">

                <div class="km-summary-card">

                    <span>Ordini</span>

                    <strong>0</strong>

                </div>

                <div class="km-summary-card">

                    <span>DDT</span>

                    <strong>0</strong>

                </div>

                <div class="km-summary-card">

                    <span>Fatture</span>

                    <strong>0</strong>

                </div>

                <div class="km-summary-card">

                    <span>Ultimo ordine</span>

                    <strong>--</strong>

                </div>

                <div class="km-summary-card">

                    <span>Totale fatturato</span>

                    <strong>€ 0,00</strong>

                </div>

            </div>

            <div class="km-customer-summary-right">

                <div class="km-summary-status">

                    <div class="km-summary-title">

                        Stato Cliente

                    </div>

                    <div>

                        ● Attivo

                    </div>

                    <div>

                        Creato: --

                    </div>

                    <div>

                        Ultima modifica: --

                    </div>

                </div>

            </div>

        </div>

    `;

}
*/

/**
FUNZIONE_v03 PER LA FASCIA RIASSUNTIVA
*/

function renderCustomerSummary(customer){

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
                <div class="km-summary-title">Stato cliente</div>
                <div class="km-summary-value">
                    🟢 Attivo
                </div>
            </div>

        </div>

    `;

}

function saveNewCustomer(){

    const codeInput =
        document.getElementById(
            "customer-code"
        );


    const companyNameInput =
        document.getElementById(
            "customer-company-name"
        );


    const addressInput =
        document.getElementById(
            "customer-address"
        );


    const cityInput =
        document.getElementById(
            "customer-city"
        );


    const provinceInput =
        document.getElementById(
            "customer-province"
        );


    const countryInput =
        document.getElementById(
            "customer-country"
        );


    const vatNumberInput =
        document.getElementById(
            "customer-vat-number"
        );


    const typeInput =
        document.getElementById(
            "customer-type"
        );


    const activeInput =
        document.getElementById(
            "customer-active"
        );


    if(!companyNameInput.value.trim()){

        alert(
            "Inserisci la ragione sociale."
        );

        return;

    }


    const newCustomer = {

        code:
            codeInput.value,

        companyName:
            companyNameInput.value.trim(),

        address:
            addressInput.value.trim(),

        city:
            cityInput.value.trim(),

        province:
            provinceInput.value.trim(),

        country:
            countryInput.value.trim(),

        vatNumber:
            vatNumberInput.value.trim(),

        type:
            typeInput.value,

        active:
            activeInput.value === "true"

    };


    customers.push(
        newCustomer
    );


    renderCustomersPage();

}