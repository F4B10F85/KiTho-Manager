"use strict";

/*
|--------------------------------------------------------------------------
| TAB Note Trasportatore
|--------------------------------------------------------------------------
*/

function renderCarriersNotes(supplier = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-field">

                <textarea

                    class="km-customer-notes"

                    placeholder="Scrivi qui tutte le note relative al cliente..."

                    oninput="supplier.notes=this.value"

                >${carrier.notes ?? ""}</textarea>

            </div>

        </div>

    `;

}