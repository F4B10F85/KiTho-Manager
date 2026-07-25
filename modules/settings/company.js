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

            { id:"contacts", title:"Contatti" },

            { id:"tax", title:"Fiscale" },

            { id:"bank", title:"Banca" },

            { id:"branding", title:"Branding" }

        ],

        activeTab:"general",

        onChange:showCompanyTab

    });

}

function showCompanyTab(tabId){

    const content = document.getElementById("km-company-content");

    const sections = {

        general:{

            title:"Generale",

            subtitle:"Informazioni principali dell'azienda."

        },

        contacts:{

            title:"Contatti",

            subtitle:"Recapiti utilizzati nei documenti."

        },

        tax:{

            title:"Fiscale",

            subtitle:"Dati fiscali dell'azienda."

        },

        bank:{

            title:"Banca",

            subtitle:"Coordinate bancarie."

        },

        branding:{

            title:"Branding",

            subtitle:"Logo e personalizzazione."

        }

    };

    const section = sections[tabId];

    content.innerHTML = `

        <div class="km-company-section">

            <h3>

                ${section.title}

            </h3>

            <p>

                ${section.subtitle}

            </p>
        
        </div>

    `;

}
