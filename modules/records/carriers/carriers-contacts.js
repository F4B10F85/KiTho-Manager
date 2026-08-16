"use strict";

/*
|--------------------------------------------------------------------------
| TAB Contatti Corriere
|--------------------------------------------------------------------------
*/

function renderCarrierContacts(carrier = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Telefono

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-phone"
                        type="text"
                        value="${carrier.phone ?? ""}">

                </div>

                <div class="km-company-label">

                    E-mail

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-email"
                        type="email"
                        value="${carrier.email ?? ""}">

                </div>

                <div class="km-company-label">

                    PEC

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-pec"
                        type="email"
                        value="${carrier.pec ?? ""}">

                </div>

                <div class="km-company-label">

                    Sito internet

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-website"
                        type="text"
                        value="${carrier.website ?? ""}">

                </div>

                <div class="km-company-label">

                    Referente

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-contact-person"
                        type="text"
                        value="${carrier.contactPerson ?? ""}">

                </div>

            </div>

        </div>

    `;

}