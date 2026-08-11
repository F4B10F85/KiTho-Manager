"use strict";

/*
|--------------------------------------------------------------------------
| Gestione Magazzini
|--------------------------------------------------------------------------
|
| Un magazzino può essere:
|
| - gestito senza aree
| - gestito per aree
|
| Il campo "area" indica esclusivamente se il magazzino
| richiede una suddivisione per area.
|
| Non viene qui specificato se l'area appartiene a un
| cliente o a un fornitore.
|
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Anagrafica Magazzini
|--------------------------------------------------------------------------
*/

const warehouses = [

    {
        code: "001",
        description: "Magazzino Principale",
        area: false,
        active: true
    },

    {
        code: "002",
        description: "Magazzino Seconda Scelta",
        area: false,
        active: true
    },

    {
        code: "009",
        description: "Magazzino Clienti",
        area: true,
        active: true
    },

    {
        code: "010",
        description: "Magazzino Fornitori",
        area: true,
        active: true
    }

];


/*
|--------------------------------------------------------------------------
| Pagina Magazzini
|--------------------------------------------------------------------------
*/

function renderWarehousesPage(){

    const workspace =
        document.getElementById("km-workspace");


    if(!workspace){

        return;

    }


    workspace.innerHTML = `

        <div class="km-page km-warehouses-page">


            <div class="km-page-header">

                <h1>
                    Gestione Elenco Magazzini
                </h1>

            </div>


            <div class="km-list-toolbar">


                <button
                    type="button"
                    class="km-button km-button-primary"
                    onclick="showNewWarehouse()">

                    + Nuovo

                </button>


                <button
                    type="button"
                    class="km-button km-button-export km-button-excel">

                    Esporta

                    <img
                        src="assets/images/excel.png"
                        class="km-button-icon"
                        alt="Excel">

                </button>

            </div>

            <div class="km-customer-table-wrapper">

                <div id="km-warehouses-table"></div>
            
            </div>

        </div>

    `;


    /*
    |--------------------------------------------------------------------------
    | Tabella Magazzini
    |--------------------------------------------------------------------------
    */

    createTable({

        containerId: "km-warehouses-table",

        filters: true,

        columns: [


            /*
            |--------------------------------------------------------------------------
            | Dettagli
            |--------------------------------------------------------------------------
            */

            {
                title: "",
                type: "details",
                onClick: "showWarehousesDetails"
            },


            /*
            |--------------------------------------------------------------------------
            | Codice
            |--------------------------------------------------------------------------
            */

            {
                key: "code",
                title: "Codice"
            },


            /*
            |--------------------------------------------------------------------------
            | Descrizione
            |--------------------------------------------------------------------------
            */

            {
                key: "description",
                title: "Magazzino"
            },


            /*
            |--------------------------------------------------------------------------
            | Gestione per area
            |--------------------------------------------------------------------------
            */

            {
                key: "area",
                title: "Gestione per area",
                type: "status"
            },


            /*
            |--------------------------------------------------------------------------
            | Stato
            |--------------------------------------------------------------------------
            */

            {
                key: "active",
                title: "Stato",
                type: "status"
            },


            /*
            |--------------------------------------------------------------------------
            | Azioni
            |--------------------------------------------------------------------------
            */

            {
                title: "Azioni",
                type: "actions"
            }

        ],

        data: warehouses

    });

}


/*
|--------------------------------------------------------------------------
| Nuovo Magazzino
|--------------------------------------------------------------------------
*/

function showNewWarehouse(){

    alert(
        "Scheda nuovo magazzino in costruzione."
    );

}


/*
|--------------------------------------------------------------------------
| Dettagli Magazzino
|--------------------------------------------------------------------------
*/

function showWarehousesDetails(row){

    /*
    |--------------------------------------------------------------------------
    | Placeholder
    |--------------------------------------------------------------------------
    |
    | La scheda verrà implementata quando costruiremo
    | la gestione completa dei magazzini e delle aree.
    |
    */

    console.log(
        "Dettagli magazzino:",
        row
    );

}