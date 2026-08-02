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

            content.innerHTML = 
                content.innerHTML = renderCustomerTax(customer);

            break;

        case "documents":

            content.innerHTML =
                content.innerHTML = renderCustomerDocuments(customer);
                
                initCustomerDocuments(customer);

            break;

        case "notes":

            content.innerHTML =
                renderCustomerNotes(customer);

            break;

        case "attachments":

            content.innerHTML =
                renderCustomerAttachments(customer);

                initCustomerAttachments(customer);

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

function renderCustomerTabs(showDocuments = true){

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

            ${showDocuments ? `

                <button
                    class="km-tab"
                    data-tab="documents"
                    onclick="

                        setActiveCustomerTab('documents');
                        showCustomerTab('documents');

                    ">

                    Documenti

            ` : ""} 

            <button
                class="km-tab"
                data-tab="notes"
                onclick="

                    setActiveCustomerTab('notes');
                    showCustomerTab('notes');

                ">

                Note

            </button> 

            <button
                class="km-tab"
                data-tab="attachments"
                onclick="

                    setActiveCustomerTab('attachments');
                    showCustomerTab('attachments');

                ">

                Allegati

            </button> 

        </div>

    `;

}