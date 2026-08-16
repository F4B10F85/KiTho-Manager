"use strict";

/*
|--------------------------------------------------------------------------
| Nuovo Trasportatore
|--------------------------------------------------------------------------
*/

function showNewCarrier(){

    const workspace =
        document.querySelector(".km-workspace");


    const newCarrierCode =
        getNextCarrierCode();


    workspace.innerHTML = `

        <div class="km-customer-page">

            <div class="km-page-header">

                <h1>Nuovo Trasportatore</h1>

            </div>


            ${renderCarrierTabs(false)}


            <div id="km-customer-content"></div>


            <div class="km-company-footer">

                <button
                    type="button"
                    class="km-button"
                    onclick="renderCarriersPage()">

                    Annulla

                </button>


                <button
                    type="button"
                    class="km-button km-button-primary"
                    onclick="saveNewCarrier()">

                    Salva

                </button>

            </div>

        </div>

    `;


    showCarrierTab(
        "anagraphic",
        {
            code: newCarrierCode
        }
    );

}

function saveNewCarrier(){

    const codeInput =
        document.getElementById(
            "carrier-code"
        );


    const businessNameInput =
        document.getElementById(
            "carrier-business-name"
        );


    const addressInput =
        document.getElementById(
            "carrier-address"
        );


    const cityInput =
        document.getElementById(
            "carrier-city"
        );


    const provinceInput =
        document.getElementById(
            "carrier-province"
        );


    const countryInput =
        document.getElementById(
            "carrier-country"
        );


    const vatNumberInput =
        document.getElementById(
            "carrier-vat-number"
        );


    const typeInput =
        document.getElementById(
            "carrier-type"
        );


    const activeInput =
        document.getElementById(
            "carrier-active"
        );


    if(!businessNameInput.value.trim()){

        alert(
            "Inserisci la ragione sociale."
        );

        return;

    }


    const newCarrier = {

        code:
            codeInput.value,

        businessName:
            businessNameInput.value.trim(),

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


    carriers.push(
        newCarrier
    );


    renderCarriersPage();

}

function getNextCarrierCode(){

    let maxNumber = 0;

    carriers.forEach(
        carrier => {

            const match =
                String(carrier.code || "")
                    .match(/^T(\d+)$/);

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


    return `T${String(maxNumber + 1).padStart(5, "0")}`;

}