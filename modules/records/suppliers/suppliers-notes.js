"use strict";

/*
|--------------------------------------------------------------------------
| TAB Note Fornitore
|--------------------------------------------------------------------------
*/

function renderSupplierNotes(supplier = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-field">

                <textarea
                    id="supplier-notes"
                    class="km-customer-notes"
                    placeholder="Scrivi qui tutte le note relative al fornitore..."
                >${supplier.notes ?? ""}</textarea>

            </div>

        </div>

    `;

}