"use strict";

/*
|--------------------------------------------------------------------------
| TAB Note Cliente
|--------------------------------------------------------------------------
*/

function renderCustomerNotes(customer = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-field">

                <textarea

                    class="km-customer-notes"

                    placeholder="Scrivi qui tutte le note relative al cliente..."

                    oninput="customer.notes=this.value"

                >${customer.notes ?? ""}</textarea>

            </div>

        </div>

    `;

}