"use strict";

function showDocuments(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page">

            <div class="km-page-header">

                <h1>

                    Documenti

                </h1>

            </div>

            <div class="km-tabs">

                <button class="km-tab active"
                        onclick="showDocumentsTab('orders')">

                    Ordini

                </button>

                <button class="km-tab"
                        onclick="showDocumentsTab('ddt')">

                    DDT

                </button>

                <button class="km-tab"
                        onclick="showDocumentsTab('invoice')">

                    Fatture

                </button>

                <button class="km-tab"
                        onclick="showDocumentsTab('production')">

                    Produzione

                </button>

                <button class="km-tab"
                        onclick="showDocumentsTab('warehouse')">

                    Magazzino

                </button>

            </div>

            <div id="km-documents-content" class="km-page-content"></div>

            <div class="km-company-footer">

                <button class="km-button">

                    Ripristina predefiniti

                </button>

                <div class="km-company-footer-right">

                    <button class="km-button">

                        Annulla

                    </button>

                    <button class="km-button km-button-primary">

                        Salva

                    </button>

                </div>

            </div>

        </div>

    `;

    showDocumentsTab("orders");

}

function showDocumentsTab(tabId){

    const content = document.getElementById("km-documents-content");

    document
        .querySelectorAll(".km-tabs .km-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });

    const activeTab = document.querySelector(
        `.km-tabs .km-tab[onclick="showDocumentsTab('${tabId}')"]`
    );

    if(activeTab){

        activeTab.classList.add("active");

    }
    
    switch(tabId){

        case "orders":

            content.innerHTML = `

                <div class="km-documents-section">

                    <div class="km-documents-placeholder">

                        Layout Ordini Standard KiTho Business
                        <br><br>
                        (in costruzione)

                    </div>

                </div>

            `;

            break;

        case "ddt":

            content.innerHTML = `

                <div class="km-documents-section">

                    <div class="km-documents-placeholder">

                        Layout DDT Standard KiTho Business
                        <br><br>
                        (in costruzione)

                    </div>

                </div>

            `;

            break;

        case "invoice":

            content.innerHTML = `

                <div class="km-documents-section">

                    <div class="km-documents-placeholder">

                        Layout Fatture Standard KiTho Business
                        <br><br>
                        (in costruzione)

                    </div>

                </div>

            `;

            break;

        case "production":

            content.innerHTML = `

                <div class="km-documents-section">

                    <div class="km-documents-placeholder">

                        Layout Produzione Standard KiTho Business
                        <br><br>
                        (in costruzione)

                    </div>

                </div>

            `;

            break;

        case "warehouse":

            content.innerHTML = `

                <div class="km-documents-section">

                    <div class="km-documents-placeholder">

                        Layout Magazzino Standard KiTho Business
                        <br><br>
                        (in costruzione)

                    </div>

                </div>

            `;

            break;

    }

}