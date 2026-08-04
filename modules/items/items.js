"use strict";

/*
|--------------------------------------------------------------------------
| Anagrafica Articoli
|--------------------------------------------------------------------------
*/

const items = [

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



/*
|--------------------------------------------------------------------------
| Pagina Corrieri
|--------------------------------------------------------------------------
*/

function renderItemsPage() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>

                    Articoli

                </h1>

            </div>


            <div class="km-customer-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewItem()">

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

                <div id="km-items-table"></div>

            </div>

        </div>

    `;


    createTable({

        containerId: "km-items-table",

        columns: [

            {
                title: "",
                type: "details",
                onClick:"showItemsDetails"
            },

            {
                key: "code",
                title: "Codice"
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
                key:"active",
                title:"Stato",
                type:"status"
            }

            

        ],

        data: items,

        filters: true

    });

}