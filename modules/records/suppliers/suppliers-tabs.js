"use strict";

function showSupplierTab(tabId, supplier = {}){

    const content = document.getElementById("km-customer-content");

    switch(tabId){

        case "anagraphic":

            content.innerHTML =
                renderSupplierAnagraphic(supplier);

            break;

        case "contacts":

            content.innerHTML =
                renderSupplierContacts(supplier);

            break;

        case "notes":

            content.innerHTML =
                renderSupplierNotes(supplier);

            break;

    }

}

function setActiveSupplierTab(tabId){

    document
        .querySelectorAll(".km-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });

    document
        .querySelector(`[data-tab="${tabId}"]`)
        .classList.add("active");

}

function renderSupplierTabs(showDocuments = true){

    return `

        <div class="km-tabs">

            <button
                class="km-tab active"
                data-tab="anagraphic"
                onclick="

                    switchSupplierTab('anagraphic');

                ">

                Anagrafica

            </button> 

            <button
                class="km-tab"
                data-tab="contacts"
                onclick="

                    switchSupplierTab('contacts');

                ">

                Contatti

            </button>

            <button
                class="km-tab"
                data-tab="notes"
                onclick="

                    switchSupplierTab('notes');

                ">

                Note

            </button>

        </div>

    `;

}

function switchSupplierTab(tabId){

    const activeTab =
        document.querySelector(
            ".km-tab.active[data-tab]"
        );


    if(activeTab){

        const currentTabId =
            activeTab.dataset.tab;


        saveCurrentSupplierTab(
            currentTabId
        );

    }


    setActiveSupplierTab(
        tabId
    );


    showSupplierTab(
        tabId,
        currentSupplier
    );

}

function saveCurrentSupplierTab(tabId){

    if(!currentSupplier){

        return;

    }


    switch(tabId){

        case "anagraphic":

            currentSupplier.code =
                document.getElementById(
                    "supplier-code"
                )?.value || "";


            currentSupplier.companyName =
                document.getElementById(
                    "supplier-company-name"
                )?.value.trim() || "";


            currentSupplier.address =
                document.getElementById(
                    "supplier-address"
                )?.value.trim() || "";


            currentSupplier.city =
                document.getElementById(
                    "supplier-city"
                )?.value.trim() || "";


            currentSupplier.province =
                document.getElementById(
                    "supplier-province"
                )?.value.trim() || "";


            currentSupplier.country =
                document.getElementById(
                    "supplier-country"
                )?.value.trim() || "";


            currentSupplier.vatNumber =
                document.getElementById(
                    "supplier-vat-number"
                )?.value.trim() || "";


            currentSupplier.type =
                document.getElementById(
                    "supplier-type"
                )?.value || "";


            currentSupplier.active =
                document.getElementById(
                    "supplier-active"
                )?.value === "true";


            break;

        case "contacts":

            currentSupplier.phone =
                document.getElementById(
                    "supplier-phone"
                )?.value.trim() || "";


            currentSupplier.email =
                document.getElementById(
                    "supplier-email"
                )?.value.trim() || "";


            currentSupplier.pec =
                document.getElementById(
                    "supplier-pec"
                )?.value.trim() || "";


            currentSupplier.website =
                document.getElementById(
                    "supplier-website"
                )?.value.trim() || "";


            currentSupplier.contactPerson =
                document.getElementById(
                    "supplier-contact-person"
                )?.value.trim() || "";


            break;

        case "notes":

            currentSupplier.notes =
                document.getElementById(
                    "supplier-notes"
                )?.value || "";


            break;

    }

}