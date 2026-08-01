"use strict";

let currentDocumentFilter = "all";

let currentCustomer = null;

function setDocumentFilter(filter){

    currentDocumentFilter = filter;

    document
        .querySelectorAll(".km-document-filter")
        .forEach(button=>{

            button.classList.remove("active");

        });

    document
        .querySelector(`[data-filter="${filter}"]`)
        ?.classList.add("active");

    initCustomerDocuments(currentCustomer);

}

/*
|--------------------------------------------------------------------------
| TAB Documenti Cliente
|--------------------------------------------------------------------------
*/

function renderCustomerDocuments(customer = {}){

    currentCustomer = customer;

    return `

        <div class="km-company-section">

            <div class="km-document-toolbar">

                <button
                    class="km-tab km-document-filter active"
                    data-filter="all"
                    onclick="setDocumentFilter('all')">

                    Tutti

                </button>

                <button
                    class="km-tab km-document-filter"
                    data-filter="order"
                    onclick="setDocumentFilter('order')">

                    Ordini

                </button>

                <button
                    class="km-tab km-document-filter"
                    data-filter="ddt"
                    onclick="setDocumentFilter('ddt')">

                    DDT

                </button>

                <button
                    class="km-tab km-document-filter"
                    data-filter="invoice"
                    onclick="setDocumentFilter('invoice')">

                    Fatture

                </button>

                <button
                    class="km-tab km-document-filter"
                    data-filter="quote"
                    onclick="setDocumentFilter('quote')">

                    Preventivi

                </button>

                <button
                    class="km-tab"
                    data-filter="production"
                    onclick="setDocumentFilter('production')">

                    Produzione

                </button>

            </div>

            <div id="customer-documents-table"></div>

        </div>

    `;

}

function initCustomerDocuments(customer){

    let data = getCustomerDocuments(customer.code);

    if(currentDocumentFilter !== "all"){

        data = data.filter(document=>

            document.type === currentDocumentFilter

        );

    }

    createTable({

        containerId:"customer-documents-table",

        filters:true,

        columns:[

            {

                key:"date",
                title:"Data",
                type:"shortdate"

            },

            {

                key:"typeLabel",
                title:"Documento"

            },

            {

                key:"code",
                title:"Numero"

            },

            {

                key:"amount",
                title:"Importo"

            },

            {
                type:"details",
                onClick:"openDocument"
            }

        ],

        data:data

    });

}

/*
|--------------------------------------------------------------------------
| DATI MOCK
|--------------------------------------------------------------------------
*/
function getCustomerDocuments(customerCode){

    console.log("DOCUMENTI");

    return [

        {

            date: "31/07/2026",

            type: "invoice",

            typeLabel: "🧾 Fattura",

            code: "FT 0124",

            amount: "€ 1.250,00"

        },

        {

            date: "30/07/2026",

            type: "ddt",

            typeLabel: "🚚 DDT",

            code: "DDT 0087"

        },

        {

            date: "29/07/2026",

            type: "order",

            typeLabel: "📦 Ordine",

            code: "ORD 0055"

        },

        {

            date: "25/07/2026",

            type: "quote",

            typeLabel: "📑 Preventivo",

            code: "PRE 0021"

        },

        {

            date: "18/07/2026",

            type: "production",

            typeLabel: "🏭 Produzione",

            code: "PRD 0012"

        },

        {

            date: "15/07/2026",

            type: "quote",

            typeLabel: "📑 Preventivo",

            code: "PRE 0021"

        },

        {

            date: "13/07/2026",

            type: "ddt",

            typeLabel: "🚚 DDT",

            code: "DDT 0080"

        },

        {

            date: "10/07/2026",

            type: "invoice",

            typeLabel: "🧾 Fattura",

            code: "FT 0101",

            amount: "€ 753,00"

        },

        {

            date: "11/06/2026",

            type: "order",

            typeLabel: "📦 Ordine",

            code: "ORD 0037"

        },

        {

            date: "08/05/2026",

            type: "invoice",

            typeLabel: "🧾 Fattura",

            code: "FT 0124",

            amount: "€ 2.810,35"

        },

    ];

}

function openDocument(type, code){

    console.log(type, code);

}