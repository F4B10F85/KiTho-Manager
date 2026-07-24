"use strict";

/*
|--------------------------------------------------------------------------
| Table Component
|--------------------------------------------------------------------------
| Componente riutilizzabile per la visualizzazione di tabelle.
|--------------------------------------------------------------------------
*/

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

            td.innerHTML = column.render(row);

            tr.appendChild(td);

        });

        tbody.appendChild(tr);

    });

    table.appendChild(tbody);

    container.appendChild(table);

}