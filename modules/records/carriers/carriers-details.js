"use strict";

/*
|--------------------------------------------------------------------------
| Scheda Trasportatore
|--------------------------------------------------------------------------
*/

function showCarrierDetails(carrierCode){

    const carrier = carriers.find(

        carrier => carrier.code === carrierCode

    );

    if(!carrier){

        return;

    }

    const workspace = document.querySelector(".km-workspace");

    workspace.innerHTML = `

        <div class="km-customer-page">

            <div class="km-page-header">

                <h1>${carrier.companyName}</h1>

            </div>
            
            ${renderCarrierTabs()}

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

    showCarrierTab("anagraphic", carrier);

}



/**
FUNZIONE_v03 PER LA FASCIA RIASSUNTIVA
*/

function renderCarrierSummary(carrier){

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

