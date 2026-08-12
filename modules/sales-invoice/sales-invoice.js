"use strict";

/*
|--------------------------------------------------------------------------
| Invoice Module
|--------------------------------------------------------------------------
| Gestione Fatture.
|--------------------------------------------------------------------------
*/

const salesinvoiceList = [
    {
        number: "FT0001",
        date: "04/07/2026",
        companyName: "Rossi S.r.l.",
        address: "Via Roma 15",
        city: "Milano",
        province: "MI",
        country: "Italia",
        amount: "4.780,50 €"
    },

    {
        number: "FT0002",
        date: "14/07/2026",
        companyName: "Boutique World",
        address: "Hundstrasse 10",
        city: "Berlin",
        province: "EE",
        country: "Deutchland",
        amount: "1.245,00 €"
    },

    {
        number: "FT0003",
        date: "15/07/2026",
        companyName: "Nuovi Cuccioli",
        address: "Via Roma 1",
        city: "Calvagese della Riviera",
        province: "BS",
        country: "Italia",
        amount: "895,40 €"
    },

    {
        number: "FT0004",
        date: "17/07/2026",
        companyName: "Luxury Pet",
        address: "Rue de la Republique 4",
        city: "Paris",
        province: "EE",
        country: "France",
        amount: "7.320,80 €"
    },

    {
        number: "FT0005",
        date: "20/07/2026",
        companyName: "Marco Fumagalli",
        address: "Via Milano 6",
        city: "Verona",
        province: "VR",
        country: "Italia",
        amount: "356,90 €"
    },

    {
        number: "FT0006",
        date: "28/07/2026",
        companyName: "Equitazione e non solo",
        address: "Via Cavour 7",
        city: "Modena",
        province: "MO",
        country: "Italia",
        amount: "2.185,75 €"
    },

    {
        number: "FT0007",
        date: "29/07/2026",
        companyName: "Perrito",
        address: "Calle Alemania",
        city: "Valencia",
        province: "EE",
        country: "Spain",
        amount: "5.964,30 €"
    }
];


/*
|--------------------------------------------------------------------------
| Pagina Fatture
|--------------------------------------------------------------------------
*/

function renderSalesInvoicesPage(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>Fatture di Vendita</h1>

            </div>

            <div class="km-customers-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewSalesInvoices()">

                    + Nuovo

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
                onClick:"showSalesInvoicesDetails"
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
            },

            {
                title:"Azioni",
                type:"actions",
                renderer: "renderActions"
            }

        ],

        data: salesinvoiceList,

        filters:true

    });

}

