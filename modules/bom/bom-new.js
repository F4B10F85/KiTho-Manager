"use strict";

const boms = [];

let bomModified = true;

/*
|--------------------------------------------------------------------------
| Bivio iniziale
|--------------------------------------------------------------------------
*/


function showCreateBOMChoice(){

    const existing = document.getElementById("km-bom-choice");

    if(existing){

        existing.remove();

    }

    const overlay = document.createElement("div");

    overlay.id = "km-bom-choice";

    overlay.className = "km-modal-overlay";

    overlay.innerHTML = `

        <div class="km-modal">

            <h2>Crea Distinta Base</h2>

            <p>
                Come vuoi creare la nuova distinta?
            </p>

            <div class="km-modal-actions">

                <button
                    class="km-button km-button-zero-to-new"
                    onclick="showNewBOM(); closeBOMChoice()">

                    <span>👤</span> Nuova da zero

                </button>

                <button
                    class="km-button km-button-zero-to-new"
                    onclick="showBOMInheritance(); closeBOMChoice()">

                    <span>👤👤​</span> Eredita da esistente

                </button>

                <button
                    class="km-button km-button-danger"
                    onclick="closeBOMChoice()">

                    Annulla

                </button>

            </div>

        </div>

    `;

    document.body.appendChild(overlay);

}

function closeBOMChoice(){

    const overlay =
        document.getElementById("km-bom-choice");

    if(overlay){

        overlay.remove();

    }

}

function showBOMInheritance(){

    const workspace =
        document.querySelector(".km-workspace");

    workspace.innerHTML = `

        <div class="km-bom-page">

            <div class="km-page-header">

                <h1>Eredita Distinta Base</h1>

            </div>

            <div class="km-bom-header">

                <div class="km-item-selector">

                    <input
                        id="km-bom-inherit-source"
                        class="km-input km-item-code"
                        placeholder="Cerca distinta da ereditare"
                        oninput="searchBOMForInheritance(this)"
                        onkeydown="navigateBOMInheritanceResults(event)">

                    <div
                        class="km-item-results"
                        id="km-bom-inherit-results">
                    </div>

                </div>

            </div>

            <div class="km-form-footer">

                <button
                    id="km-bom-inherit-confirm"
                    class="km-button km-button-primary"
                    onclick="inheritSelectedBOM()"
                    disabled>

                    Eredita

                </button>

                <button
                    class="km-button km-button-danger"
                    onclick="goBack('bom')">

                    Chiudi

                </button>

            </div>

        </div>

    `;

    window.bomInheritanceSource = null;

}

function searchBOMForInheritance(input){

    const query =
        input.value.trim().toLowerCase();

    const container =
        document.getElementById(
            "km-bom-inherit-results"
        );

    if(!container){

        return;

    }

    if(query.length < 2){

        container.innerHTML = "";

        container.style.display = "none";

        return;

    }

    const results = boms.filter(bom => {

        return (
            bom.article.code
                .toLowerCase()
                .includes(query)
            ||
            bom.article.description
                .toLowerCase()
                .includes(query)
        );

    });

    container.innerHTML = "";

    if(results.length === 0){

        container.style.display = "none";

        return;

    }

    results.forEach(bom => {

        const row =
            document.createElement("div");

        row.className =
            "km-item-result";

        row.innerHTML = `

            <span class="km-item-result-code">

                ${bom.article.code}

            </span>

            <span>

                ${bom.article.description}

            </span>

        `;

        row.onclick = () => {

            selectBOMForInheritance(bom);

        };

        container.appendChild(row);

    });

    container.style.display = "block";

}

function selectBOMForInheritance(bom){

    window.bomInheritanceSource = bom;

    const input =
        document.getElementById(
            "km-bom-inherit-source"
        );

    const results =
        document.getElementById(
            "km-bom-inherit-results"
        );

    if(input){

        input.value =
            bom.article.code;

    }

    if(results){

        results.innerHTML = "";

        results.style.display = "none";

    }

    const button =
        document.getElementById(
            "km-bom-inherit-confirm"
        );

    if(button){

        button.disabled = false;

    }

}

function inheritSelectedBOM(){

    const source =
        window.bomInheritanceSource;

    if(!source){

        alert("Seleziona una distinta da ereditare.");

        return;

    }

    const inheritedBOM =
        JSON.parse(
            JSON.stringify(source)
        );

    inheritedBOM.article = {

        code: "",

        description: "",

        family: ""

    };

    inheritedBOM.components =
        inheritedBOM.components.map(component => ({

            code: component.code,

            description: component.description,

            unit: component.unit,

            quantity: component.quantity,

            type: component.type

        }));

    inheritedBOM.componentsCount =
        inheritedBOM.components.length;

    inheritedBOM.lastEdit =
        new Date().toLocaleDateString("it-IT");

    window.editingBOMCode = null;

    window.bomInheritanceSource = null;

    showNewBOM(inheritedBOM);

}

/*
|--------------------------------------------------------------------------
| Nuova Distinta Base
|--------------------------------------------------------------------------
*/

function showNewBOM(bom = null){

    const workspace = document.querySelector(".km-workspace");

    window.editingBOMCode = bom
        ? bom.article.code
        : null;

    workspace.innerHTML = `

        <div class="km-bom-page">

            <div class="km-page-header">

                <h1>${bom ? "Modifica Distinta Base" : "Nuova Distinta Base"}</h1>

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
                    onclick="closeBOM()">

                    Chiudi

                </button>

            </div>

        </div>

    `;

    if(bom){

        window.editingBOMCode = bom.article.code;

        loadExistingBOM(bom);

        if(!bom.article.code){

            window.bomInheritanceMode = true;

        }else{

            window.bomInheritanceMode = false;

        }

    }else{

        window.editingBOMCode = null;

        window.bomInheritanceMode = false;

    }

}

function showItemsBOMDetails(code){

    const bom = boms.find(
        item => item.article.code === code
    );

    if(!bom){

        alert("Distinta Base non trovata.");

        return;

    }

    showNewBOM(bom);

}

function loadExistingBOM(bom){

    const parentCode =
        document.querySelector(
            ".km-bom-header .km-item-code"
        );

    const parentDescription =
        document.querySelector(
            ".km-bom-header .km-item-description"
        );

    if(parentCode){

        parentCode.value =
            bom.article.code;

    }

    if(parentDescription){

        parentDescription.value =
            bom.article.description;

    }

    const body =
        document.getElementById("km-bom-body");

    if(!body){

        return;

    }

    body.innerHTML = "";

    bom.components.forEach(component => {

        createBOMRow();

        const row =
            body.lastElementChild;

        row.querySelector(".km-item-code").value =
            component.code;

        row.querySelector(".km-item-description").value =
            component.description;

        row.querySelector(".km-unit").value =
            component.unit;

        row.querySelector('input[type="number"]').value =
            component.quantity;

        row.querySelector(".km-item-type").value =
            component.type;

    });

    refreshBOMButtons();

    bomModified = false;

    updateSaveButton(true);

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

    const rows =
        document.querySelectorAll(".km-bom-row");


    /* ==========================================================
       VALIDAZIONE COMPONENTI
       ========================================================== */

    if(rows.length === 0){

        alert(
            "La distinta deve contenere almeno un componente."
        );

        return false;

    }


    for(const row of rows){

        const code =
            row
                .querySelector(".km-item-code")
                .value
                .trim();


        const qty =
            row
                .querySelector('input[type="number"]')
                .value
                .trim();


        if(code === ""){

            alert(
                "Inserisci tutti i componenti della distinta."
            );

            return false;

        }


        if(qty === ""){

            alert(
                "Compila la quantità di tutti i componenti."
            );

            return false;

        }


        if(Number(qty) <= 0){

            alert(
                "La quantità deve essere maggiore di zero."
            );

            return false;

        }

    }


    /* ==========================================================
       ARTICOLO PADRE
       ========================================================== */

    const parentCode =
        document
            .querySelector(
                ".km-bom-header .km-item-code"
            )
            .value
            .trim();


    const parentDescription =
        document
            .querySelector(
                ".km-bom-header .km-item-description"
            )
            .value
            .trim();


    /* ==========================================================
       MODALITÀ EREDITATA
       ========================================================== */

    if(window.bomInheritanceMode){

        const inheritedParent =
            window.bomInheritanceParent;


        if(!inheritedParent){

            alert(
                "Seleziona l'articolo padre della nuova distinta."
            );

            return false;

        }

    }


    /* ==========================================================
       VALIDAZIONE ARTICOLO PADRE
       ========================================================== */

    if(!window.bomInheritanceMode){

        if(parentCode === ""){

            alert(
                "Seleziona l'articolo padre della distinta."
            );

            return false;

        }


        if(parentDescription === ""){

            alert(
                "L'articolo padre deve avere una descrizione."
            );

            return false;

        }

    }


    /* ==========================================================
       ARTICOLO PADRE
       ========================================================== */

    const parentItem =
        items.find(
            item => item.code === parentCode
        );


    const bom = {

        article:{

            code: parentCode,

            description: parentDescription,

            family:
                parentItem?.family || ""

        },

        components:[]

    };


    /* ==========================================================
       COMPONENTI
       ========================================================== */

    rows.forEach(row => {

        bom.components.push({

            code:
                row
                    .querySelector(".km-item-code")
                    .value
                    .trim(),

            description:
                row
                    .querySelector(".km-item-description")
                    .value
                    .trim(),

            unit:
                row
                    .querySelector(".km-unit")
                    .value,

            quantity:
                Number(
                    row
                        .querySelector(
                            'input[type="number"]'
                        )
                        .value
                ),

            type:
                row
                    .querySelector(".km-item-type")
                    .value

        });

    });


    /* ==========================================================
       DATI DISTINTA
       ========================================================== */

    bom.componentsCount =
        bom.components.length;


    bom.lastEdit =
        new Date()
            .toLocaleDateString("it-IT");


    /* ==========================================================
       EREDITÀ
       ========================================================== */

    if(window.bomInheritanceMode){

        const inheritedParent =
            window.bomInheritanceParent;


        bom.article.code =
            inheritedParent.code;


        bom.article.description =
            inheritedParent.description;


        bom.article.family =
            inheritedParent.family;


        bom.componentsCount =
            bom.components.length;


        bom.lastEdit =
            new Date()
                .toLocaleDateString("it-IT");


        boms.push(bom);


    /* ==========================================================
       MODIFICA DISTINTA ESISTENTE
       ========================================================== */

    }else if(window.editingBOMCode){

        const index =
            boms.findIndex(
                item =>
                    item.article.code ===
                    window.editingBOMCode
            );


        if(index !== -1){

            boms[index] = bom;

        }


    /* ==========================================================
       NUOVA DISTINTA
       ========================================================== */

    }else{

        boms.push(bom);

    }


    /* ==========================================================
       POST-SALVATAGGIO
       ========================================================== */

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

function closeBOM(){

    if(bomModified){

        const confirmClose = confirm(
            "Ci sono modifiche non salvate. Vuoi chiudere comunque?"
        );

        if(!confirmClose){

            return;

        }

    }

    navigate("bom");

}