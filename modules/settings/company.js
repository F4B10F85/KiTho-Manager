"use strict";

function showCompany() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-company-page">

            <h2 class="km-page-title">

                Azienda

            </h2>

            <div id="km-company-tabs"></div>

            <div
                id="km-company-content"
                class="km-company-content">
            </div>

            <div class="km-company-footer">

                <button class="km-button">

                    Annulla

                </button>

                <button class="km-button km-button-primary">

                    Salva

                </button>

            </div>

        </div>

        `;

    createTabs({

        containerId: "km-company-tabs",

        tabs: [

            { id:"general", title:"Generale" },

            { id:"tax", title:"Dati Fiscali" },

            { id:"bank", title:"Banca" },

            { id:"branding", title:"Branding" }

        ],

        activeTab:"general",

        onChange:showCompanyTab

    });

}

function showCompanyTab(tabId){

    const content = document.getElementById("km-company-content");

    switch(tabId){

        case "general":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">
                            Ragione Sociale
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Indirizzo
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Località
                        </div>
                        <div class="km-company-field km-company-inline">

                            <input type="text">

                            <span>Prov.</span>

                            <input type="text">

                        </div>

                        <div class="km-company-label">
                            CAP
                        </div>
                        <div class="km-company-field km-company-inline-large">

                            <input type="text">

                            <span>Stato</span>

                            <input type="text">

                        </div>

                        <div class="km-company-label">
                            Cellulare
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            E-mail
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            PEC
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Sito Web
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Pagina Instagram
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                    </div>

                </div>

            `;

            break;

        case "tax":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">
                            P. IVA
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Codice Fiscale
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Regime Fiscale
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Numero REA
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            IVA - Prezzo di vendita
                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>IVA Esclusa</option>

                                <option>IVA Compresa</option>

                            </select>

                        </div>

                        <div class="km-company-label">
                            IVA - Prezzo di acquisto
                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>IVA Esclusa</option>

                                <option>IVA Compresa</option>

                            </select>

                        </div>

                    </div>

                </div>

            `;

            break;

        case "bank":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">
                            Banca 1
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            IBAN 1
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            BIC / SWIFT 1
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Intestatario conto 1
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-spacer"></div>

                        <div class="km-company-label">
                            Banca 2
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            IBAN 2
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            BIC / SWIFT 2
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Intestatario conto 2
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                    </div>

                </div>

            `;

            break;

        case "branding":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">

                            Logo aziendale

                        </div>

                        <div class="km-company-field">

                            <div class="km-branding-row">

                                <button
                                    class="km-button"
                                    id="km-upload-logo">

                                    Carica

                                </button>

                                <input
                                    type="file"
                                    id="km-logo-input"
                                    accept="image/*"
                                    hidden>

                                <div
                                    class="km-logo-preview"
                                    id="km-logo-preview">

                                    Nessun logo caricato

                                </div>

                            </div>

                        </div>

                        <div class="km-company-label">

                            Logo filigrana

                        </div>

                        <div class="km-company-field">

                            <div class="km-branding-row">

                                <button
                                    class="km-button"
                                    id="km-upload-watermark">

                                    Carica

                                </button>

                                <input
                                    type="file"
                                    id="km-watermark-input"
                                    accept="image/*"
                                    hidden>

                                <div
                                    class="km-logo-preview"
                                    id="km-watermark-preview">

                                    Nessun logo caricato

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            `;

            initBrandingPreview();

            break;

    }

}

function initBrandingPreview(){

    setupPreview(

        "km-upload-logo",

        "km-logo-input",

        "km-logo-preview"

    );

    setupPreview(

        "km-upload-watermark",

        "km-watermark-input",

        "km-watermark-preview"

    );

}

function setupPreview(buttonId,inputId,previewId){

    const button=document.getElementById(buttonId);

    const input=document.getElementById(inputId);

    const preview=document.getElementById(previewId);

    button.onclick=()=>input.click();

    input.onchange=()=>{

        const file=input.files[0];

        if(!file){

            return;

        }

        const reader=new FileReader();

        reader.onload=e=>{

            preview.innerHTML=`

                <img src="${e.target.result}">

            `;

        };

        reader.readAsDataURL(file);

    };

}