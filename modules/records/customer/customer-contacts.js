"use strict";

/*
|--------------------------------------------------------------------------
| TAB Contatti Cliente
|--------------------------------------------------------------------------
*/

function renderCustomerContacts(customer = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Telefono

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.phone ?? ""}">

                </div>

                <div class="km-company-label">

                    E-mail

                </div>

                <div class="km-company-field">

                    <input
                        type="email"
                        value="${customer.email ?? ""}">

                </div>

                <div class="km-company-label">

                    PEC

                </div>

                <div class="km-company-field">

                    <input
                        type="email"
                        value="${customer.pec ?? ""}">

                </div>

                <div class="km-company-label">

                    Sito internet

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.website ?? ""}">

                </div>

                <div class="km-company-label">

                    Referente

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.contactPerson ?? ""}">

                </div>

            </div>

        </div>

    `;

}