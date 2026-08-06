"use strict";

const boms = [];

let bomModified = true;

/*
|--------------------------------------------------------------------------
| Nuova Distinta Base
|--------------------------------------------------------------------------
*/

function showNewBOM(){

    const workspace = document.querySelector(".km-workspace");

    workspace.innerHTML = `

        <div class="km-bom-page">

            <div class="km-page-header">

                <h1>Nuova Distinta Base</h1>

            </div>

            <div class="km-bom-header">

                <div class="km-item-selector">

                    <input
                        id="km-bom-parent-code"
                        class="km-input km-item-code"
                        placeholder="Codice articolo"
                        oninput="searchItems(this)"
                        onkeydown="navigateItemResults(event)">

                    <div class="km-item-results"></div>

                </div>

                <input
                    id="km-bom-parent-description"
                    class="km-input km-item-description"
                    placeholder="Descrizione articolo"
                    readonly>

            </div>

            <div class="km-bom-table">

                <div class="km-bom-head">

                    <span>Codice</span>
                    <span>Descrizione</span>
                    <span>U.M.</span>
                    <span>Q.tà</span>
                    <span>Tipo Componente</span>
                    <span></span>
                    <span></span>
                    

                </div>

                <div id="km-bom-body"></div>

            </div>

            <div class="km-form-footer">

                <button
                    id="km-bom-save"
                    class="km-button km-button-primary"
                    onclick="validateBOM()">

                    Salva

                </button>

                <button
                    class="km-button km-button-danger"
                    onclick="goBack('bom')">

                    Chiudi

                </button>

            </div>

        </div>

    `;

}

function createBOMRow(){

    const body = document.getElementById("km-bom-body");

    const lastRow = body.lastElementChild;

    if(lastRow){

        const code = lastRow.querySelector(".km-item-code").value.trim();

        const qty = lastRow.querySelector('input[type="number"]').value.trim();

        if(code !== "" && qty === ""){

            alert("Completa la riga corrente prima di aggiungere un nuovo componente.");

            return;

        }

    }

    const row = document.createElement("div");

    row.className = "km-bom-row";

    row.innerHTML = `

        <div class="km-item-selector">

            <input
                id="km-bom-parent-code"
                class="km-input km-item-code"
                placeholder="Codice componente"
                oninput="searchItems(this)"
                onkeydown="navigateItemResults(event)">

            <div class="km-item-results"></div>

        </div>

        <input
            id="km-bom-parent-description"
            class="km-input km-item-description"
            readonly>

        <input
            class="km-input km-unit"
            readonly>

        <input
            type="number"
            class="km-input"
            oninput="markBOMAsModified()">

        <select class="km-select km-item-type"
                onchange="markBOMAsModified()">

            <option value="materiale">

                Materiale

            </option>

            <option value="fantasma">

                Fantasma

            </option>

        </select>

        

        <button
            class="km-button-plus"
            onclick="createBOMRow()">

            +

        </button>

        <button
            class="km-button-delete"
            onclick="removeBOMRow(this)">

            -

        </button>

    `;

    body.appendChild(row);

    refreshBOMButtons();

    const codeInput = row.querySelector(".km-item-code");

    if(codeInput){

        codeInput.focus();

    }

}

function refreshBOMButtons(){

    const rows = document.querySelectorAll(".km-bom-row");

    rows.forEach((row,index)=>{

        const plus = row.querySelector(".km-button-plus");

        if(plus){

            plus.style.display =
                index === rows.length-1
                ? "block"
                : "none";

        }

    });

}

function validateBOM(){

    const rows = document.querySelectorAll(".km-bom-row");

    for(const row of rows){

        const code = row.querySelector(".km-item-code").value.trim();

        const qty = row.querySelector('input[type="number"]').value.trim();

        if(code === ""){

            alert("Inserisci tutti i componenti della distinta.");

            return false;

        }

        if(qty === ""){

            alert("Compila la quantità di tutti i componenti.");

            return false;

        }

        if(Number(qty) <= 0){

            alert("La quantità deve essere maggiore di zero.");

            return false;

        }

    }

    const bom = {

        article:{

            code: document.querySelector(".km-bom-header .km-item-code").value,

            description: document.querySelector(".km-bom-header .km-item-description").value

        },

        components:[]

    };

    document.querySelectorAll(".km-bom-row").forEach(row => {

        bom.components.push({

            code: row.querySelector(".km-item-code").value,

            description: row.querySelector(".km-item-description").value,

            unit: row.querySelector(".km-unit").value,

            quantity: Number(
                row.querySelector('input[type="number"]').value
            ),

            type: row.querySelector(".km-item-type").value

        });

    });

    boms.push(bom);

    console.table(boms);

    bomModified = false;

    updateSaveButton(true);

    return true;

}

function updateSaveButton(saved = false){

    const button = document.getElementById("km-bom-save");

    if(!button){

        return;

    }

    if(saved){

        button.textContent = "✓ Salvato";

        button.classList.add("km-button-success");

    }else{

        button.textContent = "Salva";

        button.classList.remove("km-button-success");

    }

}

function markBOMAsModified(){

    if(!bomModified){

        bomModified = true;

        updateSaveButton(false);

    }

}