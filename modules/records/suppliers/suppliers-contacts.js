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
                        id="supplier-phone"
                        type="text"
                        value="${supplier.phone ?? ""}">

                </div>

                <div class="km-company-label">

                    E-mail

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-email"
                        type="email"
                        value="${supplier.email ?? ""}">

                </div>

                <div class="km-company-label">

                    PEC

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-pec"
                        type="email"
                        value="${supplier.pec ?? ""}">

                </div>

                <div class="km-company-label">

                    Sito internet

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-website"
                        type="text"
                        value="${supplier.website ?? ""}">

                </div>

                <div class="km-company-label">

                    Referente

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-contact-person"
                        type="text"
                        value="${supplier.contactPerson ?? ""}">

                </div>

            </div>

        </div>

    `;

}