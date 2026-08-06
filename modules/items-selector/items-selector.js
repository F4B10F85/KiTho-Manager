"use strict";

/*
|--------------------------------------------------------------------------
| Item Selector
|--------------------------------------------------------------------------
| Gestione ricerca articoli
|--------------------------------------------------------------------------
*/

let currentSelection = -1;
let currentResults = [];
let currentContainer = null;
let currentInput = null;

function searchItems(input, source = items){

    const query = input.value.trim().toLowerCase();

    const container = input.parentElement.querySelector(".km-item-results");

    if(query.length < 2){

        container.innerHTML = "";
        container.style.display = "none";
        return;

    }

    const results = items.filter(item =>

        item.code.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)

    );

    currentSelection = -1;
    currentResults = results;
    currentContainer = container;
    currentInput = input;

    showItemResults(results, container, input);

}


function showItemResults(results, container, input){

    container.innerHTML = "";

    if(results.length === 0){

        container.style.display = "none";
        return;

    }

    results.forEach((item,index)=>{

        const row = document.createElement("div");

        row.className = "km-item-result";
        row.dataset.index = index;

        row.innerHTML = `
            <span class="km-item-result-code">
                ${item.code}
            </span>
        `;

        row.onclick = () =>{

            selectItem(item, input);

        };

        container.appendChild(row);

    });

    container.style.display = "block";

}


function selectItem(item, input){

    input.value = item.code;

    const row = input.parentElement.parentElement;

    const isComponentRow = input.closest(".km-bom-row");

    if(isComponentRow){

        const parentCode =
            document.getElementById("km-bom-parent-code").value;

        if(item.code === parentCode){

            alert("L'articolo padre non può essere inserito come componente della propria distinta.");

            input.value = "";

            closeItemResults();

            input.focus();

            return;

        }

    }

    const allRows = document.querySelectorAll(".km-bom-row");

    let duplicate = false;

    allRows.forEach(r => {

        if(r === row){

            return;

        }

        const code = r.querySelector(".km-item-code")?.value;

        if(code === item.code){

            duplicate = true;

        }

    });

    if(duplicate){

        alert("Questo componente è già presente nella distinta.");

        input.value = "";

        closeItemResults();

        input.focus();

        return;

    }

    if(row.querySelector(".km-item-code")){

        row.querySelector(".km-item-code").value = item.code;

    }

    if(row.querySelector(".km-item-description")){

        row.querySelector(".km-item-description").value = item.description;

    }

    if(row.querySelector(".km-unit")){

        row.querySelector(".km-unit").value = item.unit || "";

    }

    const stockField = row.querySelector(".km-current-stock");

    if(stockField){

        stockField.value = 18;

    }

    const bomBody = document.getElementById("km-bom-body");

    if(bomBody && bomBody.children.length === 0){

        createBOMRow();

    }

    closeItemResults();

    markBOMAsModified();

}

function closeItemResults(){

    document.querySelectorAll(".km-item-results").forEach(result=>{

        result.innerHTML="";
        result.style.display="none";

    });

    currentSelection=-1;
    currentResults=[];
    currentContainer=null;
    currentInput=null;

}

function removeBOMRow(button){

    const body = document.getElementById("km-bom-body");

    if(body.children.length === 1){

        return;

    }

    const row = button.closest(".km-bom-row");

    if(row){

        row.remove();

    }

    refreshBOMButtons();

    markBOMAsModified();

}

function navigateItemResults(event){

    if(!currentContainer){

        return;

    }

    const rows = currentContainer.querySelectorAll(".km-item-result");

    if(rows.length===0){

        return;

    }

    switch(event.key){

        case "ArrowDown":

            event.preventDefault();

            currentSelection++;

            if(currentSelection>=rows.length){

                currentSelection=0;

            }

            break;

        case "ArrowUp":

            event.preventDefault();

            currentSelection--;

            if(currentSelection<0){

                currentSelection=rows.length-1;

            }

            break;

        case "Enter":

            event.preventDefault();

            if(currentSelection>=0){

                selectItem(currentResults[currentSelection],currentInput);

            }

            return;

        case "Escape":

            closeItemResults();

            return;

        default:

            return;

    }

    rows.forEach(r=>r.classList.remove("km-item-selected"));

    rows[currentSelection].classList.add("km-item-selected");

}