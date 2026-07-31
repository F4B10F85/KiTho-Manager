"use strict";

/*
|--------------------------------------------------------------------------
| TAB Commerciale Cliente
|--------------------------------------------------------------------------
*/

function renderCustomerCommercial(customer = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Classificazione

                </div>

                <div class="km-company-field">

                    <select>

                        ${masterData.customerTypes.map(type => `

                            <option
                                value="${type}"
                                ${customer.customerType === type ? "selected" : ""}>

                                ${type}

                            </option>

                        `).join("")}

                    </select>

                </div>

                <div class="km-company-label">

                    Listino

                </div>

                <div class="km-company-field">

                    <select>

                        ${masterData.customerPriceLists.map(list => `

                            <option
                                value="${list}"
                                ${customer.priceList === list ? "selected" : ""}>

                                ${list}

                            </option>

                        `).join("")}

                    </select>

                </div>

                <div class="km-company-label">

                    Categoria sconti

                </div>

                <div class="km-company-field">

                    <select>

                        ${masterData.customerDiscountCategories.map(discount => `

                            <option
                                value="${discount}"
                                ${customer.discountCategory === discount ? "selected" : ""}>

                                ${discount}

                            </option>

                        `).join("")}

                    </select>

                </div>

                <div class="km-company-label">

                    Agente

                </div>

                <div class="km-company-field">
                    
                    <select>

                        <option value=""></option>

                        ${agents.map(agent => `

                            <option
                                value="${agent.code}"
                                ${customer.agent === agent.code ? "selected" : ""}>

                                ${agent.code} - ${agent.name}

                            </option>

                        `).join("")}

                    </select>

                </div>

                <div class="km-company-label">

                    Modalità pagamento

                </div>

                <div class="km-company-field">
                    
                    <select>

                        ${masterData.paymentMethods.map(method => `

                            <option
                                value="${method}"
                                ${customer.paymentMethod === method ? "selected" : ""}>

                                ${method}

                            </option>

                        `).join("")}

                    </select>

                </div>

                <div class="km-company-label">

                    Banca

                </div>

                <div class="km-company-field">
                    
                    <select
                        id="customer-bank"
                        onchange="syncCustomerBank('bank')">

                        <option value=""></option>

                        ${getCompanyBankAccounts().map(account => `

                            <option
                                value="${account.bank}"
                                ${customer.bank === account.bank ? "selected" : ""}>

                                ${account.bank}

                            </option>

                        `).join("")}

                    </select>

                </div>

                <div class="km-company-label">

                    Iban

                </div>

                <div class="km-company-field">
                    
                    <select
                        id="customer-iban"
                        onchange="syncCustomerBank('iban')">

                        <option value=""></option>

                        ${getCompanyBankAccounts().map(account => `

                            <option
                                value="${account.iban}"
                                ${customer.iban === account.iban ? "selected" : ""}>

                                ${account.iban}

                            </option>

                        `).join("")}

                    </select>

                </div>

            </div>

        </div>

    `;

}


function getCompanyBankAccounts(){

    return company.banks.filter(account =>

        account.bank.trim() !== "" ||

        account.iban.trim() !== ""

    );

}
/*
function getCompanyBanks(){

    return company.banks
        .map(account => account.bank)
        .filter(bank => bank.trim() !== "");

}

function getCompanyIbans(){

    return company.banks
        .map(account => account.iban)
        .filter(iban => iban.trim() !== "");

}
*/

function syncCustomerBank(source){

    const bankSelect = document.getElementById("customer-bank");

    const ibanSelect = document.getElementById("customer-iban");

    if(!bankSelect || !ibanSelect){

        return;

    }

    const accounts = getCompanyBankAccounts();

    if(source === "bank"){

        const account = accounts.find(a =>

            a.bank === bankSelect.value

        );

        if(account){

            ibanSelect.value = account.iban;

        }

    }

    if(source === "iban"){

        const account = accounts.find(a =>

            a.iban === ibanSelect.value

        );

        if(account){

            bankSelect.value = account.bank;

        }

    }

}