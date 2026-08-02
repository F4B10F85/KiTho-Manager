"use strict";

function showCarrierTab(tabId, carrier = {}){

    const content = document.getElementById("km-customer-content");

    switch(tabId){

        case "anagraphic":

            content.innerHTML =
                renderCarrierAnagraphic(carrier);

            break;

        case "contacts":

            content.innerHTML =
                renderCarrierContacts(carrier);

            break;

        case "notes":

            content.innerHTML =
                renderCarrierNotes(carrier);

            break;

        case "attachments":

            content.innerHTML =
                renderCarrierAttachments(carrier);

            initCarrierAttachments(carrier);

            break;

    }

}

function setActiveCarrierTab(tabId){

    document
        .querySelectorAll(".km-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });

    document
        .querySelector(`[data-tab="${tabId}"]`)
        .classList.add("active");

}

function renderCarrierTabs(showDocuments = true){

    return `

        <div class="km-tabs">

            <button
                class="km-tab active"
                data-tab="anagraphic"
                onclick="

                    setActiveCarrierTab('anagraphic');
                    showCarrierTab('anagraphic');

                ">

                Anagrafica

            </button> 

            <button
                class="km-tab"
                data-tab="contacts"
                onclick="

                    setActiveCarrierTab('contacts');
                    showCarrierTab('contacts');

                ">

                Contatti

            </button>

            <button
                class="km-tab"
                data-tab="notes"
                onclick="

                    setActiveCarrierTab('notes');
                    showCarrierTab('notes');

                ">

                Note

            </button> 

            <button
                class="km-tab"
                data-tab="attachments"
                onclick="

                    setActiveCarrierTab('attachments');
                    showCarrierTab('attachments');

                ">

                Allegati

            </button> 

        </div>

    `;

}