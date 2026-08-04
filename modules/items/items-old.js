"use strict";

/*
|--------------------------------------------------------------------------
| Anagrafica Articoli
|--------------------------------------------------------------------------
*/

function showItems(){

    const workspace = document.querySelector(".km-workspace");

    workspace.innerHTML = renderItemsPage();

    initItemsTable();

}

function renderItemsPage(){

    return `

        <div class="ktb-page">

            <div class="ktb-page-header">

                <h1>Articoli</h1>

            </div>

            <div class="ktb-page-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewItem()">

                    + Aggiungi articolo

                </button>

            </div>

            <div id="items-table"></div>

        </div>

    `;

}

function initItemsTable(){

    createTable({

        containerId:"items-table",

        filters:true,

        columns:[

            {

                type:"details",

                onClick:"showItemDetails"

            },

            {

                key:"code",

                title:"Codice"

            },

            {

                key:"description",

                title:"Descrizione"

            },

            {

                key:"family",

                title:"Famiglia"

            },

            {

                key:"unit",

                title:"UM"

            },

            {

                key:"price",

                title:"Prezzo"

            },

            {

                key:"active",

                title:"Stato",

                type:"status"

            }

        ],

        data:getItems()

    });

}

/*
|--------------------------------------------------------------------------
| Mock
|--------------------------------------------------------------------------
*/

function getItems(){

    return [

        {

            code:"KT.CS.XXS.YEL.01.05.00",

            description:"Collare Standard XXS Giallo",

            family:"Collari",

            unit:"PZ",

            price:"€ 45,00",

            active:true

        },

        {

            code:"KT.CS.XS.RED.01.00.00",

            description:"Collare Standard XS Rosso",

            family:"Collari",

            unit:"PZ",

            price:"€ 47,00",

            active:true

        },

        {

            code:"KT.PT.M.BLU.00.00.00",

            description:"Pettorina M Blu",

            family:"Pettorine",

            unit:"PZ",

            price:"€ 89,00",

            active:true

        },

        {

            code:"KT.CC.S.NAT.02.04.01",

            description:"Collare Caramella S Naturale",

            family:"Collari",

            unit:"PZ",

            price:"€ 63,00",

            active:false

        },

        {

            code:"KT.CA.L.BRN.00.00.00",

            description:"Capezza L Marrone",

            family:"Capezze",

            unit:"PZ",

            price:"€ 112,00",

            active:true

        }

    ];

}

/*
|--------------------------------------------------------------------------
| Azioni
|--------------------------------------------------------------------------
*/
/*
function showNewItem(){

    console.log("Nuovo articolo");

}

function showItemDetails(code){

    console.log(code);

}
*/