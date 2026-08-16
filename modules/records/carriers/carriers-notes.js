"use strict";

/*
|--------------------------------------------------------------------------
| TAB Note Trasportatore
|--------------------------------------------------------------------------
*/

function renderCarrierNotes(carrier = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-field">

                <textarea
                    id="carrier-notes"
                    class="km-customer-notes"
                    placeholder="Scrivi qui tutte le note relative al trasportatore..."
                >${carrier.notes ?? ""}</textarea>

            </div>

        </div>

    `;

}