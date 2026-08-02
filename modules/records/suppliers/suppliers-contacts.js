"use strict";

/*
|--------------------------------------------------------------------------
| TAB Contatti Fornitore
|--------------------------------------------------------------------------
*/

function renderSupplierContacts(supplier = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Telefono

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${supplier.phone ?? ""}">

                </div>

                <div class="km-company-label">

                    E-mail

                </div>

                <div class="km-company-field">

                    <input
                        type="email"
                        value="${supplier.email ?? ""}">

                </div>

                <div class="km-company-label">

                    PEC

                </div>

                <div class="km-company-field">

                    <input
                        type="email"
                        value="${supplier.pec ?? ""}">

                </div>

                <div class="km-company-label">

                    Sito internet

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${supplier.website ?? ""}">

                </div>

                <div class="km-company-label">

                    Referente

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${supplier.contactPerson ?? ""}">

                </div>

            </div>

        </div>

    `;

}