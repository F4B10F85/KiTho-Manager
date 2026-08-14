"use strict";

/*
|--------------------------------------------------------------------------
| Invoice Module
|--------------------------------------------------------------------------
| Gestione Fatture.
|--------------------------------------------------------------------------
*/

const purchasinginvoiceList = [
    {
        number: "FT089",
        date: "01/08/2026",
        companyName: "Conceria Rossi",
        address: "Via Roma 10",
        city: "Arzignano",
        province: "VI",
        country: "Italia",
        amount: "1.845,60 €"
    },

    {
        number: "FT58A-99",
        date: "02/08/2026",
        companyName: "Leather World",
        address: "Via Milano 5",
        city: "Vicenza",
        province: "VI",
        country: "Italia",
        amount: "682,40 €"
    },

    {
        number: "FT01-26",
        date: "03/08/2026",
        companyName: "Ricamificio Italia",
        address: "Via Torino 18",
        city: "Padova",
        province: "PD",
        country: "Italia",
        amount: "3.956,25 €"
    },

    {
        number: "FT9987-01-26",
        date: "05/08/2026",
        companyName: "Crystal Fashion",
        address: "Via Venezia 22",
        city: "Treviso",
        province: "TV",
        country: "Italia",
        amount: "5.248,90 €"
    },

    {
        number: "FT012",
        date: "06/08/2026",
        companyName: "Packaging Group",
        address: "Via Bologna 3",
        city: "Verona",
        province: "VR",
        country: "Italia",
        amount: "2.418,70 €"
    },

    {
        number: "FT-ERRE-13/26",
        date: "08/08/2026",
        companyName: "Conceria Rossi",
        address: "Via Roma 10",
        city: "Arzignano",
        province: "VI",
        country: "Italia",
        amount: "764,15 €"
    },

    {
        number: "FT0014",
        date: "10/08/2026",
        companyName: "Leather World",
        address: "Via Milano 5",
        city: "Vicenza",
        province: "VI",
        country: "Italia",
        amount: "6.934,80 €"
    },

    {
        number: "FT0000587",
        date: "11/08/2026",
        companyName: "Crystal Fashion",
        address: "Via Venezia 22",
        city: "Treviso",
        province: "TV",
        country: "Italia",
        amount: "987,50 €"
    },

    {
        number: "FT00-021-26",
        date: "13/08/2026",
        companyName: "Packaging Group",
        address: "Via Bologna 3",
        city: "Verona",
        province: "VR",
        country: "Italia",
        amount: "8.145,20 €"
    },
];


/*
|--------------------------------------------------------------------------
| Pagina Fatture
|--------------------------------------------------------------------------
*/

function renderPurchasingInvoicesPage(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>Fatture di Acquisto</h1>

            </div>

            <div class="km-customers-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewPurchasingInvoices()">

                    + Nuovo

                </button>

                <button
                    class="km-button km-button-export"
                    onclick="importSupplierInvoiceXmlFromFile()">

                    Importa XML
                <img
                        src="assets/images/xml.png"
                        class="km-button-icon"
                        alt="xml">

                </button>

                <button
                    class="km-button km-button-export km-button-excel"
                    >

                        Esporta
                    <img
                        src="assets/images/excel.png"
                        class="km-button-icon"
                        alt="Excel">
                    
                </button>

            </div>

            <div class="km-customers-table-wrapper">

                <div id="km-purchasing-invoices-table"></div>

            </div>

        </div>

    `;

    createTable({

        containerId: "km-purchasing-invoices-table",

        columns: [

            {
                title:"",
                type:"details",
                onClick:"showPurchasingInvoicesDetails"
            },

            {
                key:"number",
                title:"Numero"
            },

            {
                key:"date",
                title:"Data"
            },
        
            {
                key:"companyName",
                title:"Ragione sociale"
            },

            {
                key:"address",
                title:"Indirizzo"
            },

            {
                key:"city",
                title:"Comune"
            },

            {
                key:"province",
                title:"Provincia"
            },

            {
                key:"country",
                title:"Nazione"
            },

            {
                key:"amount",
                title:"Totale"
            }

        ],

        data: purchasinginvoiceList,

        filters:true

    });

}

/*
|--------------------------------------------------------------------------
| IMPORTAZIONE FATTURA XML
|--------------------------------------------------------------------------
*/

function importSupplierInvoiceXmlFromFile(){

    const input =
        document.createElement("input");

    input.type =
        "file";

    input.accept =
        ".xml,text/xml";

    input.onchange =
        function(){

            const file =
                input.files[0];

            if(!file){

                return;

            }

            importSupplierInvoiceXml(
                file
            );

        };

    input.click();

}