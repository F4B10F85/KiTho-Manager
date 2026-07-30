"use strict";

/*
|--------------------------------------------------------------------------
| Customers Module
|--------------------------------------------------------------------------
| Gestione anagrafica clienti.
|--------------------------------------------------------------------------
*/

const customers = [

    {
        code: "C00001",
        companyName: "Rossi S.r.l.",
        address: "Via Roma 15",
        city: "Milano",
        province: "MI",
        country: "Italia",
        taxCode: "01234567890",
        phone: "338/9874101",
        email: "rossi@gmail.com"
    },

    {
        code: "C00002",
        companyName: "Bianchi S.p.A.",
        address: "Via Verdi 28",
        city: "Torino",
        province: "TO",
        country: "Italia",
        taxCode: "02345678901",
        phone: "328/33341431",
        email: "bianchii@gmail.com"
    },

    {
        code: "C00003",
        companyName: "Alfa Industrie S.r.l.",
        address: "Via Dante 7",
        city: "Bergamo",
        province: "BG",
        country: "Italia",
        taxCode: "03456789012",
        phone: "339/9779784",
        email: "alfa@industrie.com"
    },

    {
        code: "C00004",
        companyName: "Beta Commerciale S.r.l.",
        address: "Via Manzoni 42",
        city: "Brescia",
        province: "BS",
        country: "Italia",
        taxCode: "04567890123",
        phone: "379/1232456",
        email: "angelo@commerciale.com"
        
    },

    {
        code: "C00005",
        companyName: "Boutique World",
        address: "Hundstrasse 10",
        city: "Berlin",
        province: "EE",
        country: "Deutchland",
        taxCode: "04577722123",
        phone: "339/9779784",
        email: "boutique@email.com"
    },

    {
        code: "C00006",
        companyName: "Marco Fumagalli",
        address: "Via Milano 6",
        city: "Verona",
        province: "VR",
        country: "Italia",
        taxCode: "08787990123",
        phone: "339/9779784",
        email: "marco922@libero.it"
    },

    {
        code: "C00007",
        companyName: "Felino Matto",
        address: "Via Cas Nuove",
        city: "Piacenza",
        province: "PC",
        country: "Italia",
        taxCode: "04567814447",
        phone: "339/9779784",
        email: "matto@felino.com"
    },

    {
        code: "C00008",
        companyName: "Nuovi Cuccioli",
        address: "Via Roma 1",
        city: "Calvagese della Riviera",
        province: "BS",
        country: "Italia",
        taxCode: "05867890887",
        phone: "339/9779784",
        email: "claudia.chiesa@gmail.com"
    },

    {
        code: "C00009",
        companyName: "Luxury Pet",
        address: "Rue de la Republique 4",
        city: "Paris",
        province: "EE",
        country: "France",
        taxCode: "07767770123",
        phone: "339/9779784",
        email: "paris@luxurypet.com"
    },

    {
        code: "C00010",
        companyName: "Equitazione e non solo",
        address: "Via Cavour 7",
        city: "Modena",
        province: "MO",
        country: "Italia",
        taxCode: "04117111123",
        phone: "339/9779784",
        email: "riccardo.marini@me.com"
    },

    {
        code: "C00011",
        companyName: "Cane&Gatto",
        address: "Via Alighieri 8",
        city: "Trento",
        province: "TN",
        country: "Italia",
        taxCode: "04337893333",
        phone: "339/9779784",
        email: "info@yahoo.it"
    },

    {
        code: "C00012",
        companyName: "Bianchi&Bianchi",
        address: "Via Vesuvio 18",
        city: "Napoli",
        province: "NA",
        country: "Italia",
        taxCode: "05537855533",
        phone: "339/5779555",
        email: "ugo@gmail.it"
    },

    {
        code: "C00013",
        companyName: "Perrito",
        address: "Calle Alemania",
        city: "Valencia",
        province: "EE",
        country: "Spain",
        taxCode: "05544855093",
        phone: "3478/987410",
        email: "carmela@perrito.es"
    }

];


/*
|--------------------------------------------------------------------------
| Pagina Clienti
|--------------------------------------------------------------------------
*/

function renderCustomersPage() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>

                    Clienti

                </h1>

            </div>


            <div class="km-customers-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewCustomer()">

                    + Nuovo

                </button>

            </div>


            <div class="km-customers-table-wrapper">

                <div id="km-customers-table"></div>

            </div>

        </div>

    `;


    createTable({

        containerId: "km-customers-table",

        columns: [

            {
                title: "",
                type: "details"
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
                title: "Stato"
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

        data: customers,

        filters: true

    });

}


/*
|--------------------------------------------------------------------------
| Nuovo cliente
|--------------------------------------------------------------------------
*/

function showNewCustomer() {

    alert("Scheda nuovo cliente in costruzione.");

}

function showCustomerDetails(customerCode) {

    const customer = customers.find(
        customer => customer.code === customerCode
    );

    if(!customer){

        return;

    }

    alert(
        `Scheda cliente: ${customer.companyName}`
    );

}