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

        case "attachments":

            content.innerHTML =
                renderSupplierAttachments(supplier);

            initSupplierAttachments(supplier);

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

                    setActiveSupplierTab('anagraphic');
                    showSupplierTab('anagraphic');

                ">

                Anagrafica

            </button> 

            <button
                class="km-tab"
                data-tab="contacts"
                onclick="

                    setActiveSupplierTab('contacts');
                    showSupplierTab('contacts');

                ">

                Contatti

            </button>

            <button
                class="km-tab"
                data-tab="notes"
                onclick="

                    setActiveSupplierTab('notes');
                    showSupplierTab('notes');

                ">

                Note

            </button> 

            <button
                class="km-tab"
                data-tab="attachments"
                onclick="

                    setActiveSupplierTab('attachments');
                    showSupplierTab('attachments');

                ">

                Allegati

            </button> 

        </div>

    `;

}