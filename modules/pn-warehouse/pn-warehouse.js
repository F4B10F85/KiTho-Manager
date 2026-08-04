"use strict";

/*
|--------------------------------------------------------------------------
| Warehouse Module
|--------------------------------------------------------------------------
| Gestione Magazzino.
|--------------------------------------------------------------------------
*/

const warehouseMovements = [

    {
        code: "PM0001",
        date: "01/08/2026",
        movement: "Carico",
        item: "KT.CC.M.BLK.02",
        quantity: "+25",
        warehouse: "Magazzino Principale"
    },

    {
        code: "PM0002",
        date: "01/08/2026",
        movement: "Scarico",
        item: "KT.SAC.GRN.18x21",
        quantity: "-8",
        warehouse: "Magazzino Principale"
    },

    {
        code: "PM0003",
        date: "02/08/2026",
        movement: "Trasferimento",
        item: "KT.FIL.BLK",
        quantity: "120",
        warehouse: "Principale → Difettoso"
    },

    {
        code: "PM0004",
        date: "03/08/2026",
        movement: "Carico",
        item: "KT.ANE.SIL.30",
        quantity: "+300",
        warehouse: "Magazzino Principale"
    },

    {
        code: "PM0005",
        date: "04/08/2026",
        movement: "Scarico",
        item: "KT.CM.XL.RED.04",
        quantity: "-3",
        warehouse: "Produzione"
    }

];

/*
|--------------------------------------------------------------------------
| Pagina Prima Nota di Magazzino
|--------------------------------------------------------------------------
*/

function renderPNWarehousePage(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>Prima Nota di Magazzino</h1>

            </div>

            <div class="km-customers-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showWarehouseMovementModal()">

                    + Nuovo Movimento

                </button>

                <button
                    class="km-button km-button-export">

                    Esporta
                    <img
                        src="assets/images/excel.png"
                        class="km-button-icon">

                </button>

            </div>

            <div class="km-customers-table-wrapper">

                <div id="km-pnwarehouse-table"></div>

            </div>

        </div>


        

    `;

   createTable({

        containerId: "km-pnwarehouse-table",

        columns: [

            {
                title:"",
                type:"details",
                onClick:"showPNWarehouseDetails"
            },

            {
                key:"code",
                title:"Codice"
            },

            {
                key:"date",
                title:"Data"
            },

            {
                key:"movement",
                title:"Movimento"
            },

            {
                key:"item",
                title:"Articolo"
            },

            {
                key:"quantity",
                title:"Q.tà"
            },

            {
                key:"warehouse",
                title:"Magazzino"
            },

            {
                title:"Azioni",
                type:"actions",
                renderer:"renderActions_01"
            }

        ],

        data: warehouseMovements,

        filters: true

    });

}

function showWarehouseMovementModal(){

    const existing = document.getElementById("km-movement-modal");

    if(existing){

        existing.remove();

    }

    const modal = document.createElement("div");

    modal.id = "km-movement-modal";

    modal.className = "km-modal-overlay";

    modal.innerHTML = `

        <div class="km-modal">

            <div class="km-modal-header">

                Nuovo Movimento di Magazzino

            </div>

            <div class="km-modal-body">

                <button
                    class="km-button km-button-warning km-modal-button"
                    onclick="startWarehouseMovement('load')">

                    ⬆️ Carico

                </button>

                <button
                    class="km-button km-button-warning km-modal-button"
                    onclick="startWarehouseMovement('unload')">

                    ⬇️ Scarico

                </button>

                <button
                    class="km-button km-button-warning km-modal-button"
                    onclick="startWarehouseMovement('transfer')">

                    🔄 Trasferimento

                </button>

                <button
                    class="km-button km-button-warning km-modal-button"
                    onclick="startWarehouseMovement('transfer')">

                    *️⃣​​ Rettifica Inventariale

                </button>

            </div>

            <div class="km-modal-footer">

                <button
                    class="km-button km-button-danger"
                    onclick="closeWarehouseMovementModal()">

                    Annulla

                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

}

function closeWarehouseMovementModal(){

    const modal = document.getElementById("km-movement-modal");

    if(modal){

        modal.remove();

    }

}

function startWarehouseMovement(type){

    closeWarehouseMovementModal();

    switch(type){

        case "load":
            renderWarehouseLoadPage();
            break;

        case "unload":
            renderWarehouseUnloadPage();
            break;

        case "transfer":
            renderWarehouseTransferPage();
            break;

        case "inventory":
            renderWarehouseInventoryPage();
            break;

    }

}

function renderWarehouseMovementPage(type){

    const workspace = document.getElementById("km-workspace");

    let title = "";

    switch(type){

        case "load":

            title = "Carico di Magazzino";

            break;

        case "unload":

            title = "Scarico di Magazzino";

            break;

        case "transfer":

            title = "Trasferimento di Magazzino";

            break;

    }

    workspace.innerHTML = `

        <div class="km-page">

            <div class="km-page-header">

                <button
                    class="km-button km-button-neutral"
                    onclick="goBack('pn-warehouse')">

                    ← Indietro

                </button>

                <h1>${title}</h1>

            </div>

        </div>

    `;

}

function goBack(previousPage){

    navigate(previousPage);

}

