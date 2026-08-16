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


    currentCarrier = {

        code: newCarrierCode

    };


    workspace.innerHTML = `

        <div class="km-customer-page">

            <div class="km-page-header">

                <h1>Nuovo Trasportatore</h1>

            </div>


            ${renderCarrierTabs()}


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
        currentCarrier
    );

}

function saveNewCarrier(){

    /*
    |--------------------------------------------------------------------------
    | 1. Salva nel currentCarrier i dati della TAB attualmente aperta
    |--------------------------------------------------------------------------
    */

    const activeTab =
        document.querySelector(
            ".km-tab.active[data-tab]"
        );


    if(activeTab){

        const currentTabId =
            activeTab.dataset.tab;


        saveCurrentCarrierTab(
            currentTabId
        );

    }


    /*
    |--------------------------------------------------------------------------
    | 2. Controllo obbligatorio ragione sociale
    |--------------------------------------------------------------------------
    */

    if(!currentCarrier.companyName?.trim()){

        alert(
            "Inserisci la ragione sociale."
        );

        return;

    }


    /*
    |--------------------------------------------------------------------------
    | 3. Salva il nuovo trasportatore
    |--------------------------------------------------------------------------
    */

    carriers.push({

        ...currentCarrier,

        companyName:
            currentCarrier.companyName.trim()

    });


    /*
    |--------------------------------------------------------------------------
    | 4. Torna alla tabella Trasportatori
    |--------------------------------------------------------------------------
    */

    currentCarrier = null;

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

function saveCarrierChanges(){

    const activeTab =
        document.querySelector(
            ".km-tab.active[data-tab]"
        );


    if(activeTab){

        const currentTabId =
            activeTab.dataset.tab;


        saveCurrentCarrierTab(
            currentTabId
        );

    }


    if(!currentCarrier){

        return;

    }


    if(
        !currentCarrier.companyName ||
        !currentCarrier.companyName.trim()
    ){

        alert(
            "Inserisci la ragione sociale."
        );

        return;

    }


    const carrierIndex =
        carriers.findIndex(

            carrier =>
                carrier.code === currentCarrier.code

        );


    if(carrierIndex === -1){

        return;

    }


    carriers[carrierIndex] = {

        ...currentCarrier

    };


    currentCarrier = null;


    renderCarriersPage();

}