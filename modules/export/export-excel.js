"use strict";

/*
|--------------------------------------------------------------------------
| Export Excel
|--------------------------------------------------------------------------
| Estrazione dati dalla tabella
|--------------------------------------------------------------------------
*/

function extractTableData(containerId){

    const table = document.querySelector(`#${containerId} table`);

    if(!table){

        console.error("Tabella non trovata:", containerId);

        return [];

    }

    const data = [];

    /*
    |--------------------------------------------------------------------------
    | Intestazioni
    |--------------------------------------------------------------------------
    */

    const headers = [];

    table.querySelectorAll("thead th").forEach(th=>{

        headers.push(th.innerText.trim());

    });

    data.push(headers);

    /*
    |--------------------------------------------------------------------------
    | Righe
    |--------------------------------------------------------------------------
    */

    table.querySelectorAll("tbody tr").forEach(tr=>{

        const row = [];

        tr.querySelectorAll("td").forEach(td=>{

            row.push(td.innerText.trim());

        });

        data.push(row);

    });

    return data;

}

function exportTableToExcel(containerId, fileName){

    const data = extractTableData(containerId);

    if(data.length === 0){

        return;

    }

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Dati");

    XLSX.writeFile(workbook, fileName);

}

function exportCurrentPage(){

    const table = document.querySelector(".km-table");

    if(!table){

        alert("Nessuna tabella trovata.");

        return;

    }

    const containerId = table.dataset.containerId;

    const fileName =
        document
            .querySelector(".km-page-header h1")
            .innerText
            .trim()
        + ".xlsx";

    exportTableToExcel(
        containerId,
        fileName
    );

}