"use strict";

/*
|--------------------------------------------------------------------------
| Warehouse Load
|--------------------------------------------------------------------------
| Carico di Magazzino
|--------------------------------------------------------------------------
*/

function renderWarehouseLoadPage(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

    <div class="km-page">

        <div class="km-page-header">

            <button
                class="km-button km-button-neutral"
                onclick="goBack('pn-warehouse')">

                ← Indietro

            </button>

            <h1>Carico di Magazzino</h1>

        </div>

        <div class="km-form-header">

            <label>Data Movimento</label>

            <input
                type="date"
                class="km-input km-date-input"
                id="movement-date">

        </div>

        <div class="km-movement-table">

            <div class="km-movement-head">

                <span>Codice</span>
                <span>Descrizione</span>
                <span>Magazzino</span>
                <span>Q.tà</span>
                <span>Note</span>
                <span></span>
                <span></span>

            </div>

            <div id="km-movement-body"></div>

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

    createMovementRow();

}

function createMovementRow(){

    const body = document.getElementById("km-movement-body");

    const row = document.createElement("div");

    row.className = "km-movement-row";

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

        <select class="km-input">

            <option>Magazzino Principale</option>
            <option>Produzione</option>
            <option>Difettoso</option>

        </select>

        <input
            type="number"
            class="km-input">

        <input class="km-input">

        <button
            class="km-button-plus"
            onclick="createMovementRow()">

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

function removeMovementRow(button){

    const row = button.closest(".km-movement-row");

    if(!row){

        return;

    }

    const body = row.parentElement;

    if(body.children.length === 1){

        return;

    }

    row.remove();

}