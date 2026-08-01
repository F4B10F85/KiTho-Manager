"use strict";

/*
|--------------------------------------------------------------------------
| TAB Fiscale Cliente
|--------------------------------------------------------------------------
*/

function renderCustomerTax(customer = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Codice IVA

                </div>

                <div class="km-company-field">

                    <select>

                        ${masterData.vatCodes.map(code => `

                            <option
                                value="${code}"
                                ${customer.vatCode === code ? "selected" : ""}>

                                ${code}

                            </option>

                        `).join("")}

                    </select>

                </div>

                <div class="km-company-label">

                    Codice SDI

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.sdiCode ?? ""}">

                </div>

                <div class="km-company-label">

                    PEC fatturazione

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.invoicePec ?? ""}">

                </div>

            </div>

        </div>

    `;

}