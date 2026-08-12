"use strict";

/*
|--------------------------------------------------------------------------
| Anagrafica Articoli
|--------------------------------------------------------------------------
*/

const items = [

    {

        code:"KT.CS.XXS.YEL.01.05.00",

        description:"Collare Standard XXS Giallo",

        family:"Collari",

        unit:"PZ",

        price:"€ 45,00",

        active:true

    },

    {

        code:"KT.CS.XS.RED.01.00.00",

        description:"Collare Standard XS Rosso",

        family:"Collari",

        unit:"PZ",

        price:"€ 47,00",

        active:true

    },

    {

        code:"KT.PT.M.BLU.00.00.00",

        description:"Pettorina M Blu",

        family:"Pettorine",

        unit:"PZ",

        price:"€ 89,00",

        active:true

    },

    {

        code:"KT.CC.S.NAT.02.04.01",

        description:"Collare Caramella S Naturale",

        family:"Collari",

        unit:"PZ",

        price:"€ 63,00",

        active:false

    },

    {

        code:"KT.CA.L.BRN.00.00.00",

        description:"Capezza L Marrone",

        family:"Capezze",

        unit:"PZ",

        price:"€ 112,00",

        active:true

    }

];



/*
|--------------------------------------------------------------------------
| Pagina Articoli
|--------------------------------------------------------------------------
*/

function renderItemsPage() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>

                    Articoli

                </h1>

            </div>


            <div class="km-customer-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewItem()">

                    + Nuovo

                </button>

                <button
                    class="km-button km-button-export km-button-excel"
                    >

                     Esporta
                    <img
                        src="assets/images/excel.png"
                        class="km-button-icon"
                        alt="Excel">
                    
                </button>

                <button
                    type="button"
                    id="km-import-excel"
                    class="km-button km-button-export km-button-excel">

                    Importa

                    <img
                        src="assets/images/excel.png"
                        class="km-button-icon"
                        alt="Excel">

                </button>

                <input
                    type="file"
                    id="km-import-excel-file"
                    accept=".xlsx,.xls"
                    style="display:none;">             

            </div>

            

            <div class="km-customer-table-wrapper">

                <div id="km-items-table"></div>

            </div>

        </div>
        

    `;

/*
|--------------------------------------------------------------------------
| IMPLEMENTAZIONE BOTTONE IMPORTA
|--------------------------------------------------------------------------
*/


    const importButton =
        document.getElementById("km-import-excel");

    const importInput =
        document.getElementById("km-import-excel-file");

    if(importButton && importInput){

        importButton.addEventListener(
            "click",
            () => {

                importInput.click();

            }
        );

    }

/*
|--------------------------------------------------------------------------
| LETTURA FILE EXCEL IMPORATO
|--------------------------------------------------------------------------
*/

    if(importInput){

        importInput.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files[0];

                if(!file){

                    return;

                }

                const reader =
                    new FileReader();

                reader.onload =
                    function(e){

                        const data =
                            new Uint8Array(
                                e.target.result
                            );

                        const workbook =
                            XLSX.read(
                                data,
                                {
                                    type:"array"
                                }
                            );

                        const firstSheetName =
                            workbook.SheetNames[0];

                        const worksheet =
                            workbook.Sheets[
                                firstSheetName
                            ];

                        const rows =
                            XLSX.utils.sheet_to_json(
                                worksheet,
                                {
                                    header:1,
                                    defval:""
                                }
                            );

                        console.log(
                            "Foglio importato:",
                            firstSheetName
                        );

                        console.table(rows);


                        /*
                        |--------------------------------------------------------------------------
                        | Anteprima
                        |--------------------------------------------------------------------------
                        */

                        const previewRows =
                            rows.slice(0,6);

                        const overlay =
                            document.createElement("div");

                        overlay.className =
                            "km-import-overlay";

                        overlay.innerHTML = `

                            <div class="km-import-modal">

                                <div class="km-import-header">

                                    <div>

                                        <h2>
                                            Importa dati
                                        </h2>

                                        <span>
                                            ${file.name}
                                        </span>

                                    </div>

                                </div>


                                <div class="km-import-info">

                                    <span>
                                        Foglio: <strong>
                                            ${firstSheetName}
                                        </strong>
                                    </span>

                                    <span>
                                        Righe trovate: <strong>
                                            ${Math.max(rows.length - 1, 0)}
                                        </strong>
                                    </span>

                                </div>


                                <div class="km-import-preview">

                                    <table>

                                        <thead>

                                            <tr>

                                                ${(
                                                    previewRows[0] || []
                                                ).map(
                                                    header =>
                                                        `<th>${header}</th>`
                                                ).join("")}

                                            </tr>

                                        </thead>

                                        <tbody>

                                            ${previewRows
                                                .slice(1)
                                                .map(
                                                    row => `

                                                        <tr>

                                                            ${
                                                                (
                                                                    previewRows[0] || []
                                                                )
                                                                .map(
                                                                    (_,index) =>
                                                                        `<td>${
                                                                            row[index] ?? ""
                                                                        }</td>`
                                                                )
                                                                .join("")
                                                            }

                                                        </tr>

                                                    `
                                                )
                                                .join("")}

                                        </tbody>

                                    </table>

                                </div>


                                <div class="km-import-actions">

                                    <button
                                        type="button"
                                        class="km-button"
                                        onclick="
                                            this.closest('.km-import-overlay')
                                                .remove();
                                        ">

                                        Annulla

                                    </button>

                                    <button
                                        type="button"
                                        class="km-button km-button-primary"
                                        id="km-import-continue">

                                        Continua

                                    </button>

                                </div>

                            </div>

                        `;

                        document.body.appendChild(overlay);

                        const continueButton =
                            document.getElementById(
                                "km-import-continue"
                            );

                        if(continueButton){

                            continueButton.addEventListener(
                                "click",
                                () => {

                                    showImportMapping(
                                        rows,
                                        file.name,
                                        overlay
                                    );

                                }
                            );

                        }

                    };

                reader.readAsArrayBuffer(file);

            }
        );

    }

    
    createTable({

        containerId: "km-items-table",

        columns: [

            {
                title: "",
                type: "details",
                onClick:"showItemsDetails"
            },

            {
                key: "code",
                title: "Codice"
            },

            {
                key:"description",
                title:"Descrizione"
            },

            {
                key:"family",
                title:"Famiglia"
            },

            {
                key:"unit",
                title:"UM"
            },

            {
                key:"active",
                title:"Stato",
                type:"status"
            }

            

        ],

        data: items,

        filters: true

    });

}

function showImportMapping(
    rows,
    fileName,
    overlay
){

    const headers =
        rows[0] || [];

    const fields = [

        {
            key:"lens",
            label:"Lente",
            required:false
        },

        {
            key:"code",
            label:"Codice",
            required:true
        },

        {
            key:"description",
            label:"Descrizione",
            required:true
        },

        {
            key:"family",
            label:"Famiglia",
            required:false
        },

        {
            key:"unit",
            label:"UM",
            required:false
        },

        {
            key:"status",
            label:"Stato",
            required:false
        }

    ];


    const normalize =
        value =>
            String(value)
                .toLowerCase()
                .trim()
                .replace(/\s+/g,"");


    const findMatch =
        field => {

            const normalizedField =
                normalize(field.label);

            const index =
                headers.findIndex(
                    header =>
                        normalize(header)
                            === normalizedField
                );

            return index;

        };


    overlay.querySelector(
        ".km-import-modal"
    ).innerHTML = `

        <div class="km-import-header">

            <div>

                <h2>
                    Associa colonne
                </h2>

                <span>
                    ${fileName}
                </span>

            </div>

        </div>


        <div class="km-import-mapping">

            ${
                fields.map(
                    field => {

                        const match =
                            findMatch(field);

                        return `

                            <div
                                class="km-import-mapping-row">

                                <div>

                                    <strong>
                                        ${field.label}
                                    </strong>

                                    ${
                                        field.required
                                            ? `<span
                                                class="km-import-required">
                                                *
                                               </span>`
                                            : ""
                                    }

                                </div>


                                <select
                                    class="km-import-column"
                                    data-field="${field.key}">

                                    <option
                                        value="-1">

                                        -- Non importare --

                                    </option>

                                    ${
                                        headers.map(
                                            (
                                                header,
                                                index
                                            ) => `

                                                <option
                                                    value="${index}"
                                                    ${
                                                        index === match
                                                            ? "selected"
                                                            : ""
                                                    }>

                                                    ${header}

                                                </option>

                                            `
                                        ).join("")
                                    }

                                </select>

                            </div>

                        `;

                    }
                ).join("")
            }

        </div>


        <div class="km-import-actions">

            <button
                type="button"
                class="km-button"
                id="km-import-mapping-cancel">

                Annulla

            </button>

            <button
                type="button"
                class="km-button km-button-primary"
                id="km-import-mapping-confirm">

                Importa

            </button>

        </div>

    `;


    overlay.querySelector(
        "#km-import-mapping-cancel"
    ).onclick = () => {

        overlay.remove();

    };


    overlay.querySelector(
        "#km-import-mapping-confirm"
    ).onclick = () => {

        const mapping = {};

        overlay.querySelectorAll(
            ".km-import-column"
        ).forEach(select => {

            mapping[
                select.dataset.field
            ] = Number(select.value);

        });


        /*
        |--------------------------------------------------------------------------
        | Verifica campi obbligatori
        |--------------------------------------------------------------------------
        */

        const requiredFields = [
            "code",
            "description"
        ];

        for(const field of requiredFields){

            if(
                mapping[field] === undefined ||
                mapping[field] === -1
            ){

                alert(
                    "Devi associare tutti i campi obbligatori."
                );

                return;

            }

        }


        console.log(
            "Mappatura import valida:",
            mapping
        );


        /*
        |--------------------------------------------------------------------------
        | Trasformazione righe Excel → articoli
        |--------------------------------------------------------------------------
        */

        const importedItems = [];

        const newItems = [];

        const existingItems = [];

        const duplicateItems = [];

        const invalidItems = [];

        const excelCodes = new Set();

        const existingCodes = new Set(
            items
                .map(item =>
                    String(item.code ?? "")
                        .trim()
                        .toLowerCase()
                )
                .filter(Boolean)
        );


        for(let i = 1; i < rows.length; i++){

            const row = rows[i];

            if(!row || row.length === 0){

                continue;

            }


            const item = {

                lens:
                    mapping.lens !== -1
                        ? String(
                            row[mapping.lens] ?? ""
                        ).trim()
                        : "",

                code:
                    mapping.code !== -1
                        ? String(
                            row[mapping.code] ?? ""
                        ).trim()
                        : "",

                description:
                    mapping.description !== -1
                        ? String(
                            row[mapping.description] ?? ""
                        ).trim()
                        : "",

                family:
                    mapping.family !== -1
                        ? String(
                            row[mapping.family] ?? ""
                        ).trim()
                        : "",

                unit:
                    mapping.unit !== -1
                        ? (
                            String(
                                row[mapping.unit] ?? ""
                            ).trim() || "PZ"
                        )
                        : "PZ",

                active:
                    mapping.status !== -1
                        ? parseImportedItemStatus(
                            row[mapping.status]
                        )
                        : true

            };


            importedItems.push(item);


            /*
            |--------------------------------------------------------------------------
            | Codice mancante
            |--------------------------------------------------------------------------
            */

            if(!item.code){

                invalidItems.push({

                    row:i + 1,

                    item:item

                });

                continue;

            }


            const normalizedCode =
                item.code
                    .trim()
                    .toLowerCase();


            /*
            |--------------------------------------------------------------------------
            | Duplicato interno al file
            |--------------------------------------------------------------------------
            */

            if(excelCodes.has(normalizedCode)){

                duplicateItems.push({

                    row:i + 1,

                    item:item

                });

                continue;

            }


            excelCodes.add(
                normalizedCode
            );


            /*
            |--------------------------------------------------------------------------
            | Articolo già presente
            |--------------------------------------------------------------------------
            */

            if(existingCodes.has(normalizedCode)){

                existingItems.push({

                    row:i + 1,

                    item:item

                });

                continue;

            }


            /*
            |--------------------------------------------------------------------------
            | Nuovo articolo
            |--------------------------------------------------------------------------
            */

            newItems.push({

                row:i + 1,

                item:item

            });

        }


        console.log(
            "Articoli letti:",
            importedItems
        );

        console.log(
            "Nuovi articoli:",
            newItems
        );

        console.log(
            "Articoli già presenti:",
            existingItems
        );

        console.log(
            "Duplicati nel file:",
            duplicateItems
        );

        console.log(
            "Righe senza codice:",
            invalidItems
        );


        console.log(
            "RIEPILOGO IMPORT",
            {
                nuovi:newItems.length,
                giaPresenti:existingItems.length,
                duplicati:duplicateItems.length,
                senzaCodice:invalidItems.length
            }
        );

        showImportSummary(
            overlay,
            newItems,
            existingItems,
            duplicateItems,
            invalidItems
        );

    };

}

function showImportSummary(
    overlay,
    newItems,
    existingItems,
    duplicateItems,
    invalidItems
){

    const modal =
        overlay.querySelector(
            ".km-import-modal"
        );

    if(!modal){

        return;

    }


    modal.innerHTML = `

        <div class="km-import-header">

            <div>

                <h2>
                    Riepilogo importazione
                </h2>

                <span>
                    Verifica i dati prima di procedere
                </span>

            </div>

        </div>


        <div class="km-import-summary">


            <div
                class="km-import-summary-row km-import-summary-new">

                <span class="km-import-summary-icon">
                    🟢
                </span>

                <div>

                    <strong>
                        ${newItems.length}
                    </strong>

                    <span>
                        nuovi articoli
                    </span>

                </div>

            </div>


            <div
                class="km-import-summary-row km-import-summary-existing">

                <span class="km-import-summary-icon">
                    🟡
                </span>

                <div>

                    <strong>
                        ${existingItems.length}
                    </strong>

                    <span>
                        articoli già presenti
                    </span>

                </div>

            </div>


            <div
                class="km-import-summary-row km-import-summary-duplicate">

                <span class="km-import-summary-icon">
                    🔴
                </span>

                <div>

                    <strong>
                        ${duplicateItems.length}
                    </strong>

                    <span>
                        duplicati nel file
                    </span>

                </div>

            </div>


            <div
                class="km-import-summary-row km-import-summary-invalid">

                <span class="km-import-summary-icon">
                    ⚠️
                </span>

                <div>

                    <strong>
                        ${invalidItems.length}
                    </strong>

                    <span>
                        righe senza codice
                    </span>

                </div>

            </div>


        </div>


        <div class="km-import-actions">

            <button
                type="button"
                class="km-button"
                id="km-import-summary-cancel">

                Annulla

            </button>


            <button
                type="button"
                class="km-button km-button-primary"
                id="km-import-summary-confirm">

                Conferma importazione

            </button>

        </div>

    `;


    modal.querySelector(
        "#km-import-summary-cancel"
    ).onclick = () => {

        overlay.remove();

    };


    modal.querySelector(
        "#km-import-summary-confirm"
    ).onclick = () => {

        const success =
            importNewItems(newItems);


        if(!success){

            alert(
                "Errore durante l'importazione."
            );

            return;

        }


        console.log(
            "Importazione completata:",
            newItems
        );

        refreshTable(
            "km-items-table"
        );


        overlay.remove();


        /*
        |--------------------------------------------------------------------------
        | Aggiorna la tabella Articoli
        |--------------------------------------------------------------------------
        */

        

    };

}

/*
|--------------------------------------------------------------------------
| IMPORTAZIONE FINALE ARTICOLI
|--------------------------------------------------------------------------
*/


function importNewItems(newItems){

    if(!Array.isArray(newItems)){

        return false;

    }


    for(const entry of newItems){

        if(!entry || !entry.item){

            continue;

        }


        const item = entry.item;


        /*
        |--------------------------------------------------------------------------
        | Controllo difensivo finale
        |--------------------------------------------------------------------------
        */

        if(!item.code){

            continue;

        }


        const normalizedCode =
            String(item.code)
                .trim()
                .toLowerCase();


        /*
        |--------------------------------------------------------------------------
        | Evita qualsiasi duplicato accidentale
        |--------------------------------------------------------------------------
        */

        const alreadyExists =
            items.some(
                existingItem =>
                    String(
                        existingItem.code ?? ""
                    )
                    .trim()
                    .toLowerCase()
                    === normalizedCode
            );


        if(alreadyExists){

            continue;

        }


        items.push(item);

    }


    return true;

}

function parseImportedItemStatus(value){

    if(value === undefined || value === null){

        return true;

    }


    const normalized =
        String(value)
            .trim()
            .toLowerCase();


    if(
        normalized === "" ||
        normalized === "attivato" ||
        normalized === "attivata" ||
        normalized === "attivo" ||
        normalized === "attiva" ||
        normalized === "active" ||
        normalized === "true" ||
        normalized === "1"
    ){

        return true;

    }


    if(
        normalized === "disattivo" ||
        normalized === "disattiva" ||
        normalized === "disattivato" ||
        normalized === "disattivata" ||
        normalized === "inactive" ||
        normalized === "false" ||
        normalized === "0"
    ){

        return false;

    }


    /*
    |--------------------------------------------------------------------------
    | Valore non riconosciuto
    |--------------------------------------------------------------------------
    |
    | Per sicurezza consideriamo l'articolo attivo.
    |
    */

    return true;

}