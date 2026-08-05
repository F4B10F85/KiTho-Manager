"use strict";

/*
|--------------------------------------------------------------------------
| DDT Module
|--------------------------------------------------------------------------
| Gestione DDT.
|--------------------------------------------------------------------------
*/

const ddtList = [

    {
        code: "DDT0001",
        date: "04/07/2026",
        companyName: "Rossi S.r.l.",
        address: "Via Roma 15",
        city: "Milano",
        province: "MI",
        country: "Italia"
    },

    {
        code: "DDT0002",
        date: "14/07/2026",
        companyName: "Boutique World",
        address: "Hundstrasse 10",
        city: "Berlin",
        province: "EE",
        country: "Deutchland"
    },

    {
        code: "DDT0003",
        date: "15/07/2026",
        companyName: "Nuovi Cuccioli",
        address: "Via Roma 1",
        city: "Calvagese della Riviera",
        province: "BS",
        country: "Italia"
    },

    {
        code: "DDT0004",
        date: "17/07/2026",
        companyName: "Luxury Pet",
        address: "Rue de la Republique 4",
        city: "Paris",
        province: "EE",
        country: "France"
    },

    {
        code: "DDT0005",
        date: "20/07/2026",
        companyName: "Marco Fumagalli",
        address: "Via Milano 6",
        city: "Verona",
        province: "VR",
        country: "Italia"
    },

    {
        code: "DDT0006",
        date: "28/07/2026",
        companyName: "Equitazione e non solo",
        address: "Via Cavour 7",
        city: "Modena",
        province: "MO",
        country: "Italia"
    },

    {
        code: "DDT0007",
        date: "29/07/2026",
        companyName: "Perrito",
        address: "Calle Alemania",
        city: "Valencia",
        province: "EE",
        country: "Spain"
    }

];


/*
|--------------------------------------------------------------------------
| Pagina DDT
|--------------------------------------------------------------------------
*/

function renderDDTPage(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>Documenti di Trasporto</h1>

            </div>

            <div class="km-customers-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewDDT()">

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

                <div id="km-ddt-table"></div>

            </div>

        </div>

    `;

    createTable({

        containerId: "km-ddt-table",

        columns: [

            {
                title: "",
                type: "details",
                onClick: "showDDTDetails"
            },

            {
                key: "code",
                title: "Codice"
            },

            {
                key: "date",
                title: "Data"
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
                title: "Azioni",
                type: "actions"
            }

        ],

        data: ddtList,

        filters: true

    });

}


/*
|--------------------------------------------------------------------------
| Nuovo DDT
|--------------------------------------------------------------------------
*/

function showNewDDT(){

    alert("Scheda nuovo DDT in costruzione.");

}


/*
|--------------------------------------------------------------------------
| Dettaglio DDT
|--------------------------------------------------------------------------
*/

function showDDTDetails(ddtCode){

    const document = ddtList.find(
        item => item.code === ddtCode
    );

    if(!document){
        return;
    }

    alert(`Scheda DDT: ${document.companyName}`);

}