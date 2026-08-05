"use strict";

/*
|--------------------------------------------------------------------------
| Warehouse Transfer
|--------------------------------------------------------------------------
| Trasferimento di Magazzino
|--------------------------------------------------------------------------
*/

function renderWarehouseTransferPage(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

    <div class="km-page">

        <div class="km-page-header">

            <button
                class="km-button km-button-neutral"
                onclick="goBack('pn-warehouse')">

                ← Indietro

            </button>

            <h1>Trasferimento di Magazzino</h1>

        </div>

        <div class="km-form-header">

            <label>Data Movimento</label>

            <input
                type="date"
                class="km-input km-date-input"
                id="movement-date">

        </div>

        <div class="km-transfer-table">

            <div class="km-transfer-head">

                <span>Codice</span>
                <span>Descrizione</span>
                <span>Da Magazzino</span>
                <span>A Magazzino</span>
                <span>Q.tà</span>
                <span>Note</span>
                <span></span>
                <span></span>

            </div>

            <div id="km-transfer-body"></div>

        </div>

        <div class="km-form-footer">

            <button
                class="km-button km-button-primary">

                Salva

            </button>

            <button
                class="km-button km-button-danger"
                onclick="goBack('pn-warehouse')">

                Annulla

            </button>

        </div>

    </div>

    `;

    createTransferRow();

}


/*
|--------------------------------------------------------------------------
| Nuova Riga Trasferimento
|--------------------------------------------------------------------------
*/

function createTransferRow(){

    const body = document.getElementById("km-transfer-body");

    const row = document.createElement("div");

    row.className = "km-transfer-row";

    row.innerHTML = `

        <div class="km-item-selector">

            <input
                class="km-input km-item-code"
                placeholder="Codice articolo"
                oninput="searchItems(this)"
                onkeydown="navigateItemResults(event)">

            <div class="km-item-results"></div>

        </div>

        <input
            class="km-input km-item-description"
            readonly>

        <select 
            class="km-input km-from-warehouse">
            onchange="updateTransferStock(this)">

            <option value="">Seleziona...</option>
            <option>Magazzino Principale</option>
            <option>Produzione</option>
            <option>Difettoso</option>

        </select>

        <select class="km-input km-to-warehouse">

            <option value="">Seleziona...</option>
            <option>Magazzino Principale</option>
            <option>Produzione</option>
            <option>Difettoso</option>

        </select>

        <input
            type="number"
            class="km-input">

        <input
            class="km-input">

        <button
            class="km-button-plus"
            onclick="createTransferRow()">

            +

        </button>

        <button
            class="km-button-delete"
            onclick="removeMovementRow(this)">

            -

        </button>

    `;

    body.appendChild(row);

}