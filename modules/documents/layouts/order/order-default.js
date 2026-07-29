"use strict";

/*
|--------------------------------------------------------------------------
| Configurazione layout
|--------------------------------------------------------------------------
*/

const ROWS_PER_PAGE = 2;

/*
|--------------------------------------------------------------------------
| Costruzione corpo ordine
|--------------------------------------------------------------------------
*/

function renderOrderBody(items){

    const tbody = document.getElementById("order-body");

    tbody.innerHTML = "";

    for(let i = 0; i < ROWS_PER_PAGE; i++){

        const item = items[i];

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${item?.code ?? ""}</td>

            <td>${item?.description ?? ""}</td>

            <td>${item?.unit ?? ""}</td>

            <td>${item?.qty ?? ""}</td>

            <td>${item?.price ?? ""}</td>

            <td>${item?.discount ?? ""}</td>

            <td>${item?.total ?? ""}</td>

            <td>${item?.vat ?? ""}</td>

        `;

        tbody.appendChild(row);

    }

}

/*
|--------------------------------------------------------------------------
| Preview layout
|--------------------------------------------------------------------------
*/

renderOrderBody([]);