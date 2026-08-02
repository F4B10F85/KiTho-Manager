"use strict";

/*
|--------------------------------------------------------------------------
| Warehouse Module
|--------------------------------------------------------------------------
| Gestione Magazzino.
|--------------------------------------------------------------------------
*/

const warehouse = [
    {
        code: "KT.CC.M.BLK.02",
        category: "Collare",
        unit_of_meas: "PZ",
        quantity: "7"

    },
    
    {
        code: "KT.CM.XL.RED.04",
        category: "Collare",
        unit_of_meas: "PZ",
        quantity: "7"
    },
    
    {
        code: "KT.PE.L.BLU.03",
        category: "Collare",
        unit_of_meas: "PZ",
        quantity: "7"
    },

    {
        code: "KT.SAC.GRN.18x21",
        category: "Packaging",
        unit_of_meas: "PZ",
        quantity: "23"
    },
    
    {
        code: "KT.CA.PON.BRO.02",
        category: "Collare",
        unit_of_meas: "PZ",
        quantity: "7"
    },
    
    {
        code: "KT.FIL.BLK",
        category: "Fili",
        unit_of_meas: "mt",
        quantity: "380"
    },
    
    {
        code: "KT.ANE.SIL.30",
        category: "Minuteria",
        unit_of_meas: "PZ",
        quantity: "87"
    },
];


/*
|--------------------------------------------------------------------------
| Pagina Magazzino
|--------------------------------------------------------------------------
*/

function renderWarehousePage(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>Magazzino</h1>

            </div>

            <div class="km-customers-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewWarehouse()">

                    Carica da Excel

                </button>

                <button
                    class="km-button km-button"
                    onclick="showNewWarehouse()">

                    Estrapola Excel

                </button>

            </div>

            <div class="km-customers-table-wrapper">

                <div id="km-warehouse-table"></div>

            </div>

        </div>

    `;

    createTable({

        containerId: "km-warehouse-table",

        columns: [

            {
                title:"",
                type:"details",
                onClick:"showInvoiceDetails"
            },

            {
                key:"code",
                title:"Codice"
            },

            {
                key:"category",
                title:"Categoria"
            },
        
            {
                key:"unit_of_meas",
                title:"U.M."
            },

            {
                key:"quantity",
                title:"Q.tà"
            },

            {
                title:"Azioni",
                type:"actions",
                renderer: "renderActions_01"
            }

        ],

        data: warehouse,

        filters:true

    });

}

