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

                    class="km-customer-notes"

                    placeholder="Scrivi qui tutte le note relative al cliente..."

                    oninput="supplier.notes=this.value"

                >${supplier.notes ?? ""}</textarea>

            </div>

        </div>

    `;

}