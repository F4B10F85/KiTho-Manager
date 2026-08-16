"use strict";

/*
|--------------------------------------------------------------------------
| Suppliers Module
|--------------------------------------------------------------------------
| Gestione anagrafica Fornitori.
|--------------------------------------------------------------------------
*/

const suppliers = [

    {
        code:"F00001",
        companyName:"Fedex Express Italy S.r.l",
        address:"Via Enrico Stassano 20 ",
        city:"Brescia",
        province:"BS",
        country: "Italia",
        taxCode:"09399880153",
        phone:"800 123 800",
        email:"fedexexpressitalysrl@legalmail.it"
    },

    {
        code:"F00002",
        companyName:"SOCIETA' ALPHA SRL",
        address:"VIALE ROMA 543",
        city:"Sassari",
        province:"SS",
        country: "Italia",
        taxCode:"01234567890",
        phone:"099 877441",
        email:"alpha"
    }
];



/*
|--------------------------------------------------------------------------
| Pagina Clienti
|--------------------------------------------------------------------------
*/

function renderSuppliersPage() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>

                    Fornitori

                </h1>

            </div>


            <div class="km-customer-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewSupplier()">

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


            <div class="km-customer-table-wrapper">

                <div id="km-suppliers-table"></div>

            </div>

        </div>

    `;


    createTable({

        containerId: "km-suppliers-table",

        columns: [

            {
                title: "",
                type: "details",
                onClick:"showSupplierDetails"
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
                title: "P.Iva"
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

        data: suppliers,

        filters: true

    });

}

function getNextSupplierCode(){

    let maxNumber = 0;

    suppliers.forEach(
        supplier => {

            const match =
                String(supplier.code || "")
                    .match(/^F(\d+)$/);

            if(!match){

                return;

            }

            const number =
                parseInt(
                    match[1],
                    10
                );

            if(number > maxNumber){

                maxNumber = number;

            }

        }
    );


    return `F${String(maxNumber + 1).padStart(5, "0")}`;

}