"use strict";

/*
|--------------------------------------------------------------------------
| Warehouse Module
|--------------------------------------------------------------------------
| Gestione Magazzino.
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Pagina Magazzino
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
                    onclick="importpnWarehouse()">

                    Carica da Excel

                </button>

                <button
                    class="km-button km-button"
                    onclick="exportpnWarehouse()">

                    Estrapola in Excel

                </button>

            </div>

            <div class="km-customers-table-wrapper">

                <div id="km-stock-pnwarehouse-table"></div>

            </div>

        </div>

    `;

   

}

