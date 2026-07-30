"use strict";

/*
|--------------------------------------------------------------------------
| Table Component
|--------------------------------------------------------------------------
| Componente riutilizzabile per la visualizzazione di tabelle.
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Cell Renderer
|--------------------------------------------------------------------------
*/

function renderCell(column, row){

    if(column.render){

        return column.render(row);

    }

    switch(column.type){

        case "details":

            return `
                <button
                    class="km-action-button km-details-button"
                    title="Visualizza dettagli"
                    onclick="showCustomerDetails('${row.code}')">

                    🔍

                </button>
            `;

        case "badge":

            return renderBadge(

                row[column.key],

                column.badgeType

            );

        case "date":

            return formatDate(

                row[column.key]

            );

        case "actions":

            return renderActions(row);

        default:

            return row[column.key] ?? "";

    }

}

/*
|--------------------------------------------------------------------------
| Badge Renderer
|--------------------------------------------------------------------------
*/

/*
switch(column.type){

    case "badge":

        return renderBadge(
            row[column.key],
            column.badgeType
        );

    case "date":

        return formatDate(
            row[column.key]
        );

    case "actions":

        return renderActions(row);

    case "details":

        return `
            <button
                class="km-action-button km-details-button"
                title="Visualizza dettagli"
                onclick="showCustomerDetails('${row.code}')">

                🔍

            </button>
        `;

    default:

        return row[column.key] ?? "";

}
*/
/*
|--------------------------------------------------------------------------
| Date Formatter
|--------------------------------------------------------------------------
*/

function formatDate(value){

    if(!value){

        return "-";

    }

    const date = new Date(value);

    if(isNaN(date)){

        return "-";

    }

    return date.toLocaleString(

        "it-IT",

        {

            day:"2-digit",

            month:"2-digit",

            year:"numeric",

            hour:"2-digit",

            minute:"2-digit"

        }

    );

}

/*
|--------------------------------------------------------------------------
| Actions Renderer
|--------------------------------------------------------------------------
*/

function renderActions(row){

    return `

        <div class="km-table-actions">

            <button
                class="km-action-button km-edit-button"
                title="Modifica">

                ✏

            </button>

            <button
                class="km-action-button km-delete-button"
                title="Elimina">

                🗑

            </button>

            <button
                class="km-action-button km-lock-button"
                title="Blocca">

                🔒

            </button>

        </div>

    `;

}


function createTable(config) {

    const container = document.getElementById(config.containerId);

    container.innerHTML = "";

    const table = document.createElement("table");

    table.className = "km-table";

    /*
    |--------------------------------------------------------------------------
    | Header
    |--------------------------------------------------------------------------
    */

    const thead = document.createElement("thead");

    const headRow = document.createElement("tr");

    config.columns.forEach(column => {

        const th = document.createElement("th");

        th.textContent = column.title;

        if(column.type === "actions"){

            th.classList.add("km-actions-column");

        }

        headRow.appendChild(th);

    });

    thead.appendChild(headRow);


    /*
    |--------------------------------------------------------------------------
    | Filtri
    |--------------------------------------------------------------------------
    */

    let filterRow = null;

    if(config.filters){

        filterRow = document.createElement("tr");

        filterRow.className = "km-table-filter-row";

        config.columns.forEach(column => {

            if(column.type === "details"){

                const filterCell = document.createElement("td");

                filterCell.className = "km-details-column";

                filterRow.appendChild(filterCell);

                return;

            }

            const filterCell = document.createElement("td");

            if(column.type === "actions"){

                filterCell.classList.add("km-actions-column");

            }

            const input = document.createElement("input");

            input.type = "text";

            input.className = "km-table-filter";

            input.placeholder = "Cerca...";

            input.dataset.key = column.key;


            input.addEventListener("input", function(){

                renderFilteredRows();

            });


            filterCell.appendChild(input);

            filterRow.appendChild(filterCell);

        });

        thead.appendChild(filterRow);

    }

    table.appendChild(thead);


    /*
    |--------------------------------------------------------------------------
    | Body
    |--------------------------------------------------------------------------
    */

    const tbody = document.createElement("tbody");

    table.appendChild(tbody);

    container.appendChild(table);


    /*
    |--------------------------------------------------------------------------
    | Rendering righe
    |--------------------------------------------------------------------------
    */

    function renderFilteredRows(){

        tbody.innerHTML = "";

        let filteredData = [...config.data];


        if(config.filters){

            const filters = {};

            filterRow
                .querySelectorAll(".km-table-filter")
                .forEach(input => {

                    const value = input.value
                        .trim()
                        .toLowerCase();

                    if(value){

                        filters[input.dataset.key] = value;

                    }

                });


            filteredData = filteredData.filter(row => {

                return Object.entries(filters).every(
                    ([key, value]) => {

                        return String(
                            row[key] ?? ""
                        )
                        .toLowerCase()
                        .includes(value);

                    }
                );

            });

        }


        filteredData.forEach(row => {

            const tr = document.createElement("tr");

            config.columns.forEach(column => {

                const td = document.createElement("td");

                if(column.type === "actions"){

                    td.classList.add("km-actions-column");

                }

                if(column.type === "details"){

                    td.classList.add("km-details-column");

                }

                td.innerHTML = renderCell(
                    column,
                    row
                );

                tr.appendChild(td);

            });

            tbody.appendChild(tr);

        });

    }


    /*
    |--------------------------------------------------------------------------
    | Primo rendering
    |--------------------------------------------------------------------------
    */

    renderFilteredRows();

}