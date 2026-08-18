"use strict"

function saveCurrentCustomerTab(tabId){

    if(!currentCustomer){

        return;

    }


    switch(tabId){

        case "anagraphic":

            currentCustomer.code =
                document.getElementById(
                    "customer-code"
                )?.value || "";


            currentCustomer.companyName =
                document.getElementById(
                    "customer-company-name"
                )?.value.trim() || "";


            currentCustomer.address =
                document.getElementById(
                    "customer-address"
                )?.value.trim() || "";


            currentCustomer.city =
                document.getElementById(
                    "customer-city"
                )?.value.trim() || "";


            currentCustomer.province =
                document.getElementById(
                    "customer-province"
                )?.value.trim() || "";


            currentCustomer.country =
                document.getElementById(
                    "customer-country"
                )?.value.trim() || "";


            currentCustomer.vatNumber =
                document.getElementById(
                    "customer-vat-number"
                )?.value.trim() || "";


            currentCustomer.type =
                document.getElementById(
                    "customer-type"
                )?.value || "";


            currentCustomer.active =
                document.getElementById(
                    "customer-active"
                )?.value === "true";


            break;


        case "contacts":

            currentCustomer.phone =
                document.getElementById(
                    "customer-phone"
                )?.value.trim() || "";


            currentCustomer.email =
                document.getElementById(
                    "customer-email"
                )?.value.trim() || "";


            currentCustomer.pec =
                document.getElementById(
                    "customer-pec"
                )?.value.trim() || "";


            currentCustomer.website =
                document.getElementById(
                    "customer-website"
                )?.value.trim() || "";


            currentCustomer.contactPerson =
                document.getElementById(
                    "customer-contact-person"
                )?.value.trim() || "";


            break;


        case "commercial":

            currentCustomer.customerType =
                document.getElementById(
                    "customer-classification"
                )?.value || "";


            currentCustomer.priceList =
                document.getElementById(
                    "customer-price-list"
                )?.value || "";


            currentCustomer.discountCategory =
                document.getElementById(
                    "customer-discount-category"
                )?.value || "";


            currentCustomer.agent =
                document.getElementById(
                    "customer-agent"
                )?.value || "";


            currentCustomer.paymentMethod =
                document.getElementById(
                    "customer-payment-method"
                )?.value || "";


            currentCustomer.companyBankId =
                document.getElementById(
                    "customer-bank"
                )?.value || "";


            break;

        case "tax":

            currentCustomer.vatCode =
                document.getElementById(
                    "customer-vat-code"
                )?.value || "";


            currentCustomer.sdiCode =
                document.getElementById(
                    "customer-sdi-code"
                )?.value.trim() || "";


            currentCustomer.invoicePec =
                document.getElementById(
                    "customer-invoice-pec"
                )?.value.trim() || "";


            break;

        case "notes":

            currentCustomer.notes =
                document.querySelector(
                    ".km-customer-notes"
                )?.value || "";

            break;

    }

}

async function showCustomerTab(tabId, customer = null){

    const content =
        document.getElementById(
            "km-customer-content"
        );


    if(!customer){

        customer =
            currentCustomer || {};

    }


    currentCustomer =
        customer;


    switch(tabId){

        case "anagraphic":

            content.innerHTML =
                renderCustomerAnagraphic(
                    currentCustomer
                );

            break;


        case "contacts":

            content.innerHTML =
                renderCustomerContacts(
                    currentCustomer
                );

            break;


        case "commercial":

            await ensureAgentsLoaded();

            content.innerHTML =
                renderCustomerCommercial(
                    currentCustomer
                );

            break;


        case "tax":

            content.innerHTML =
                renderCustomerTax(
                    currentCustomer
                );

            break;


        case "documents":

            content.innerHTML =
                renderCustomerDocuments(
                    currentCustomer
                );

            initCustomerDocuments(
                currentCustomer
            );

            break;


        case "notes":

            content.innerHTML =
                renderCustomerNotes(
                    currentCustomer
                );

            break;


        case "attachments":

            content.innerHTML =
                renderCustomerAttachments(
                    currentCustomer
                );

            initCustomerAttachments(
                currentCustomer
            );

            break;

    }

}

function setActiveCustomerTab(tabId){

    document
        .querySelectorAll(".km-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });

    document
        .querySelector(`[data-tab="${tabId}"]`)
        .classList.add("active");

}

async function switchCustomerTab(tabId){

    const activeTab =
        document.querySelector(
            ".km-tab.active[data-tab]"
        );


    if(activeTab){

        const currentTabId =
            activeTab.dataset.tab;


        saveCurrentCustomerTab(
            currentTabId
        );

    }


    setActiveCustomerTab(
        tabId
    );


    await showCustomerTab(
        tabId,
        currentCustomer
    );

}

function renderCustomerTabs(showDocuments = true){

    return `

        <div class="km-tabs">

            <button
                class="km-tab active"
                data-tab="anagraphic"
                onclick="switchCustomerTab('anagraphic')">

                Anagrafica

            </button>


            <button
                class="km-tab"
                data-tab="contacts"
                onclick="switchCustomerTab('contacts')">

                Contatti

            </button>


            <button
                class="km-tab"
                data-tab="commercial"
                onclick="switchCustomerTab('commercial')">

                Commerciale

            </button>


            <button
                class="km-tab"
                data-tab="tax"
                onclick="switchCustomerTab('tax')">

                Fiscale

            </button>


            ${showDocuments ? `

                <button
                    class="km-tab"
                    data-tab="documents"
                    onclick="switchCustomerTab('documents')">

                    Documenti

                </button>

            ` : ""}


            <button
                class="km-tab"
                data-tab="notes"
                onclick="switchCustomerTab('notes')">

                Note

            </button>


            <button
                class="km-tab"
                data-tab="attachments"
                onclick="switchCustomerTab('attachments')">

                Allegati

            </button>


        </div>

    `;

}
