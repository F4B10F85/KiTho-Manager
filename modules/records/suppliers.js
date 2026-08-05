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
        companyName:"Conceria Rossi",
        address:"Via Roma 10",
        city:"Arzignano",
        province:"VI",
        country: "Italia",
        taxCode:"01234567890",
        phone:"0444 123456",
        email:"info@conceriarossi.it"
    },

    {
        code:"F00002",
        companyName:"Leather World",
        address:"Via Milano 5",
        city:"Vicenza",
        province:"VI",
        country: "Italia",
        taxCode:"02345678901",
        phone:"0444 987654",
        email:"commerciale@leatherworld.it"
    },

    {
        code:"F00003",
        companyName:"Ricamificio Italia",
        address:"Via Torino 18",
        city:"Padova",
        province:"PD",
        country: "Italia",
        taxCode:"03456789012",
        phone:"049 456789",
        email:"info@ricamificio.it"
    },

    {
        code:"F00004",
        companyName:"Crystal Fashion",
        address:"Via Venezia 22",
        city:"Treviso",
        province:"TV",
        country: "Italia",
        taxCode:"04567890123",
        phone:"0422 654321",
        email:"sales@crystalfashion.it"
    },

    {
        code:"F00005",
        companyName:"Packaging Group",
        address:"Via Bologna 3",
        city:"Verona",
        province:"VR",
        country: "Italia",
        taxCode:"05678901234",
        phone:"045 778899",
        email:"office@packaginggroup.it"
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

        data: suppliers,

        filters: true

    });

}