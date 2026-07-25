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

function renderBadge(value, type = "boolean") {

    switch (type) {

        case "boolean":

            return value

                ? `<span class="km-badge km-badge-success">Attivo</span>`

                : `<span class="km-badge km-badge-danger">Disattivo</span>`;

        default:

            return `<span class="km-badge km-badge-info">${value}</span>`;

    }

}

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

    table.appendChild(thead);

    /*
    |--------------------------------------------------------------------------
    | Body
    |--------------------------------------------------------------------------
    */

    const tbody = document.createElement("tbody");

    config.data.forEach(row => {

        const tr = document.createElement("tr");

        config.columns.forEach(column => {

            const td = document.createElement("td");

            if(column.type === "actions"){

                td.classList.add("km-actions-column");

            }

            td.innerHTML = renderCell(column, row);

            tr.appendChild(td);

        });

        tbody.appendChild(tr);

    });

    table.appendChild(tbody);

    container.appendChild(table);

}