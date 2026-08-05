"use strict";

/*
|--------------------------------------------------------------------------
| Warehouse Adjustment
|--------------------------------------------------------------------------
| Rettifica Inventariale
|--------------------------------------------------------------------------
*/

function renderWarehouseAdjustmentPage(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

    <div class="km-page">

        <div class="km-page-header">

            <button
                class="km-button km-button-neutral"
                onclick="goBack('pn-warehouse')">

                ← Indietro

            </button>

            <h1>Rettifica Inventariale</h1>

        </div>

        <div class="km-form-header">

            <label>Data Movimento</label>

            <input
                type="date"
                class="km-input km-date-input"
                id="movement-date">

        </div>

        <div class="km-adjustment-table">

            <div class="km-adjustment-head">

                <span>Codice</span>
                <span>Descrizione</span>
                <span>Magazzino</span>
                <span>Giacenza</span>
                <span>Nuova</span>
                <span>Δ</span>
                <span>Motivo</span>
                <span></span>
                <span></span>

            </div>

            <div id="km-adjustment-body"></div>

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

    createAdjustmentRow();

}

function createAdjustmentRow(){

    const body = document.getElementById("km-adjustment-body");

    const row = document.createElement("div");

    row.className = "km-adjustment-row";

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

        <select class="km-input km-warehouse">

            <option value="">Seleziona...</option>
            <option>Magazzino Principale</option>
            <option>Produzione</option>
            <option>Difettoso</option>

        </select>

        <input
            class="km-input km-current-stock"
            readonly
            value="0">

        <input
            type="number"
            class="km-input km-new-stock"
            oninput="updateAdjustmentDifference(this)">

        <input
            class="km-input km-difference"
            readonly>

        <input class="km-input">

        <button
            class="km-button-plus"
            onclick="createAdjustmentRow()">

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

function updateAdjustmentDifference(input){

    const row = input.closest(".km-adjustment-row");

    const currentStock = Number(
        row.querySelector(".km-current-stock").value
    );

    const newStock = Number(input.value);

    const difference = newStock - currentStock;

    const differenceField = row.querySelector(".km-difference");

    differenceField.value =
        difference > 0 ? "+" + difference : difference;

}