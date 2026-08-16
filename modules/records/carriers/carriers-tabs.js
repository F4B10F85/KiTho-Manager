"use strict";

let currentCarrier = null;

function showCarrierTab(tabId, carrier = null){

    const content =
        document.getElementById(
            "km-customer-content"
        );


    if(!carrier){

        carrier =
            currentCarrier || {};

    }


    currentCarrier =
        carrier;


    switch(tabId){

        case "anagraphic":

            content.innerHTML =
                renderCarrierAnagraphic(
                    currentCarrier
                );

            break;


        case "contacts":

            content.innerHTML =
                renderCarrierContacts(
                    currentCarrier
                );

            break;


        case "notes":

            content.innerHTML =
                renderCarrierNotes(
                    currentCarrier
                );

            break;

    }

}

function saveCurrentCarrierTab(tabId){

    if(!currentCarrier){

        return;

    }


    switch(tabId){

        case "anagraphic":

            currentCarrier.code =
                document.getElementById(
                    "carrier-code"
                )?.value || "";


            currentCarrier.companyName =
                document.getElementById(
                    "carrier-company-name"
                )?.value.trim() || "";


            currentCarrier.address =
                document.getElementById(
                    "carrier-address"
                )?.value.trim() || "";


            currentCarrier.city =
                document.getElementById(
                    "carrier-city"
                )?.value.trim() || "";


            currentCarrier.province =
                document.getElementById(
                    "carrier-province"
                )?.value.trim() || "";


            currentCarrier.country =
                document.getElementById(
                    "carrier-country"
                )?.value.trim() || "";


            currentCarrier.vatNumber =
                document.getElementById(
                    "carrier-vat-number"
                )?.value.trim() || "";


            currentCarrier.type =
                document.getElementById(
                    "carrier-type"
                )?.value || "";


            currentCarrier.active =
                document.getElementById(
                    "carrier-active"
                )?.value === "true";


            break;


        case "contacts":

            currentCarrier.phone =
                document.getElementById(
                    "carrier-phone"
                )?.value.trim() || "";


            currentCarrier.email =
                document.getElementById(
                    "carrier-email"
                )?.value.trim() || "";


            currentCarrier.pec =
                document.getElementById(
                    "carrier-pec"
                )?.value.trim() || "";


            currentCarrier.website =
                document.getElementById(
                    "carrier-website"
                )?.value.trim() || "";


            currentCarrier.contactPerson =
                document.getElementById(
                    "carrier-contact-person"
                )?.value.trim() || "";


            break;


        case "notes":

            currentCarrier.notes =
                document.getElementById(
                    "carrier-notes"
                )?.value || "";


            break;

    }

}

function switchCarrierTab(tabId){

    const activeTab =
        document.querySelector(
            ".km-tab.active[data-tab]"
        );


    if(activeTab){

        const currentTabId =
            activeTab.dataset.tab;


        saveCurrentCarrierTab(
            currentTabId
        );

    }


    setActiveCarrierTab(
        tabId
    );


    showCarrierTab(
        tabId,
        currentCarrier
    );

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

function renderCarrierTabs(){

    return `

        <div class="km-tabs">

            <button
                class="km-tab active"
                data-tab="anagraphic"
                onclick="switchCarrierTab('anagraphic')">

                Anagrafica

            </button>


            <button
                class="km-tab"
                data-tab="contacts"
                onclick="switchCarrierTab('contacts')">

                Contatti

            </button>


            <button
                class="km-tab"
                data-tab="notes"
                onclick="switchCarrierTab('notes')">

                Note

            </button>

        </div>

    `;

}