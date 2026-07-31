function showCustomerTab(tabId, customer = {}){

    const content = document.getElementById("km-customer-content");

    switch(tabId){

        case "anagraphic":

            content.innerHTML =
                renderCustomerAnagraphic(customer);

            break;

        case "contacts":

            content.innerHTML =
                renderCustomerContacts(customer);

            break;

        case "commercial":

            content.innerHTML =
                renderCustomerCommercial(customer);

            break;

        case "tax":

            content.innerHTML = "TAB Fiscale";

            break;

        case "documents":

            content.innerHTML = "TAB Documenti";

            break;

        case "notes":

            content.innerHTML = "TAB Note";

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

function renderCustomerTabs(){

    return `

        <div class="km-tabs">

            <button
                class="km-tab active"
                data-tab="anagraphic"
                onclick="

                    setActiveCustomerTab('anagraphic');
                    showCustomerTab('anagraphic');

                ">

                Anagrafica

            </button> 

            <button
                class="km-tab"
                data-tab="contacts"
                onclick="

                    setActiveCustomerTab('contacts');
                    showCustomerTab('contacts');

                ">

                Contatti

            </button> 

            <button
                class="km-tab"
                data-tab="commercial"
                onclick="

                    setActiveCustomerTab('commercial');
                    showCustomerTab('commercial');

                ">

                Commerciale

            </button> 

            <button
                class="km-tab"
                data-tab="tax"
                onclick="

                    setActiveCustomerTab('tax');
                    showCustomerTab('tax');

                ">

                Fiscale

            </button> 

            <button
                class="km-tab"
                data-tab="documents"
                onclick="

                    setActiveCustomerTab('documents');
                    showCustomerTab('documents');

                ">

                Documenti

            </button> 

            <button
                class="km-tab"
                data-tab="notes"
                onclick="

                    setActiveCustomerTab('notes');
                    showCustomerTab('notes');

                ">

                Note

            </button> 

        </div>

    `;

}