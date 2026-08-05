"use strict";

/*
|--------------------------------------------------------------------------
| Carriers Module
|--------------------------------------------------------------------------
| Gestione anagrafica Corrieri.
|--------------------------------------------------------------------------
*/

const carriers = [

    {
        code:"T00001",
        companyName:"Trasporti Veloci S.r.l.",
        address:"Via dell'Industria 12",
        city:"Verona",
        province:"VR",
        country:"Italia",
        taxCode:"01765430981",
        phone:"045 8123456",
        email:"info@trasportiveloci.it"
    },

    {
        code:"T00002",
        companyName:"Logistica Nord S.p.A.",
        address:"Via Europa 45",
        city:"Brescia",
        province:"BS",
        country:"Italia",
        taxCode:"02876541092",
        phone:"030 4455667",
        email:"spedizioni@logisticanord.it"
    },

    {
        code:"T00003",
        companyName:"Express Cargo S.r.l.",
        address:"Via Milano 8",
        city:"Padova",
        province:"PD",
        country:"Italia",
        taxCode:"03987652103",
        phone:"049 7788990",
        email:"commerciale@expresscargo.it"
    },

    {
        code:"T00004",
        companyName:"Autotrasporti Bianchi",
        address:"Via delle Rose 21",
        city:"Vicenza",
        province:"VI",
        country:"Italia",
        taxCode:"04123456789",
        phone:"0444 556677",
        email:"info@autotrasportibianchi.it"
    },

    {
        code:"T00005",
        companyName:"Global Freight Italia",
        address:"Via del Lavoro 3",
        city:"Bologna",
        province:"BO",
        country:"Italia",
        taxCode:"05234567890",
        phone:"051 6677889",
        email:"operations@globalfreight.it"
    },

];



/*
|--------------------------------------------------------------------------
| Pagina Corrieri
|--------------------------------------------------------------------------
*/

function renderCarriersPage() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>

                    Corrieri

                </h1>

            </div>


            <div class="km-customer-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewCarrier()">

                    + Nuovo

                </button>

                <button
                    class="km-button km-button-export"
                    onclick="exportStockWarehouse()">

                        Esporta
                    <img
                        src="assets/images/excel.png"
                        class="km-button-icon"
                        alt="Excel">
                    
                </button>

            </div>


            <div class="km-customer-table-wrapper">

                <div id="km-carriers-table"></div>

            </div>

        </div>

    `;


    createTable({

        containerId: "km-carriers-table",

        columns: [

            {
                title: "",
                type: "details",
                onClick:"showCarrierDetails"
            },

            {
                key: "code",
                title: "Codice"
            },

            {
                key: "companyName",
                title: "Ragione sociale"
            },

            {
                key: "address",
                title: "Indirizzo"
            },

            {
                key: "city",
                title: "Comune"
            },

            {
                key: "province",
                title: "Provincia"
            },

            {
                key: "country",
                title: "Nazione"
            },

            {
                key: "taxCode",
                title: "Codice Fiscale"
            },

            {
                key: "phone",
                title: "Telefono"
            },

            {
                key: "email",
                title: "E-mail"
            }

        ],

        data: carriers,

        filters: true

    });

}