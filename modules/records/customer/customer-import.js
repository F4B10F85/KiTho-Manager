"use strict";

/*
|--------------------------------------------------------------------------
| IMPORT CLIENTI DA EXCEL
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| IMPLEMENTAZIONE BOTTONE IMPORTA
|--------------------------------------------------------------------------
*/

function initializeCustomerImport(){

    const importButton =
        document.getElementById("km-import-customers-excel");

    const importInput =
        document.getElementById("km-import-customers-excel-file");


    if(!importButton || !importInput){

        console.warn(
            "Import clienti: elementi HTML non trovati."
        );

        return;

    }


    importButton.addEventListener(
        "click",
        () => {

            importInput.click();

        }
    );


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
                        "Foglio clienti importato:",
                        firstSheetName
                    );


                    console.table(rows);


                    showCustomerImportPreview(
                        rows,
                        file.name,
                        firstSheetName
                    );

                };


            reader.readAsArrayBuffer(file);

        }
    );

}


/*
|--------------------------------------------------------------------------
| ANTEPRIMA FILE
|--------------------------------------------------------------------------
*/

function showCustomerImportPreview(
    rows,
    fileName,
    firstSheetName
){

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
                        ${fileName}
                    </span>

                </div>

            </div>


            <div class="km-import-info">

                <span>
                    Foglio:
                    <strong>
                        ${firstSheetName}
                    </strong>
                </span>

                <span>
                    Righe trovate:
                    <strong>
                        ${Math.max(rows.length - 1, 0)}
                    </strong>
                </span>

            </div>


            <div class="km-import-preview">

                <table>

                    <thead>

                        <tr>

                            ${
                                (
                                    previewRows[0] || []
                                )
                                .map(
                                    header =>
                                        `<th>${header}</th>`
                                )
                                .join("")
                            }

                        </tr>

                    </thead>


                    <tbody>

                        ${
                            previewRows
                                .slice(1)
                                .map(
                                    row => `

                                        <tr>

                                            ${
                                                (
                                                    previewRows[0] || []
                                                )
                                                .map(
                                                    (_, index) =>
                                                        `<td>${
                                                            row[index] ?? ""
                                                        }</td>`
                                                )
                                                .join("")
                                            }

                                        </tr>

                                    `
                                )
                                .join("")
                        }

                    </tbody>

                </table>

            </div>


            <div class="km-import-actions">

                <button
                    type="button"
                    class="km-button"
                    id="km-customer-import-cancel">

                    Annulla

                </button>


                <button
                    type="button"
                    class="km-button km-button-primary"
                    id="km-customer-import-continue">

                    Continua

                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    overlay
        .querySelector(
            "#km-customer-import-cancel"
        )
        .onclick = () => {

            overlay.remove();

        };


    overlay
        .querySelector(
            "#km-customer-import-continue"
        )
        .onclick = () => {

            showCustomerImportMapping(
                rows,
                fileName,
                overlay
            );

        };

}


/*
|--------------------------------------------------------------------------
| MAPPATURA COLONNE
|--------------------------------------------------------------------------
*/

function showCustomerImportMapping(
    rows,
    fileName,
    overlay
){

    const headers =
        rows[0] || [];


    const fields = [

        {
            key:"companyName",
            label:"Ragione sociale",
            required:true
        },

        {
            key:"address",
            label:"Indirizzo",
            required:false
        },

        {
            key:"city",
            label:"Comune",
            required:false
        },

        {
            key:"province",
            label:"Provincia",
            required:false
        },

        {
            key:"country",
            label:"Nazione",
            required:false
        },

        {
            key:"taxCode",
            label:"Codice Fiscale",
            required:true
        },

        {
            key:"phone",
            label:"Telefono",
            required:false
        },

        {
            key:"email",
            label:"E-mail",
            required:false
        }

    ];


    /*
    |--------------------------------------------------------------------------
    | Normalizzazione intestazioni
    |--------------------------------------------------------------------------
    */

    const normalize =
        value =>
            String(value)
                .toLowerCase()
                .trim()
                .replace(/\s+/g,"");


    /*
    |--------------------------------------------------------------------------
    | Ricerca corrispondenza colonna
    |--------------------------------------------------------------------------
    */

    const findMatch =
        field => {

            const normalizedField =
                normalize(field.label);


            return headers.findIndex(
                header =>
                    normalize(header)
                    === normalizedField
            );

        };


    overlay
        .querySelector(
            ".km-import-modal"
        )
        .innerHTML = `

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


            <div class="km-import-info">

                <span>
                    <strong>
                        Il codice cliente viene generato automaticamente dal gestionale.
                    </strong>
                </span>

            </div>


            <div class="km-import-mapping">

                ${
                    fields
                        .map(
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
                                                    ? `
                                                        <span
                                                            class="km-import-required">

                                                            *

                                                        </span>
                                                    `
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
                                                headers
                                                    .map(
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
                                                    )
                                                    .join("")
                                            }

                                        </select>

                                    </div>

                                `;

                            }
                        )
                        .join("")
                }

            </div>


            <div class="km-import-actions">

                <button
                    type="button"
                    class="km-button"
                    id="km-customer-import-mapping-cancel">

                    Annulla

                </button>


                <button
                    type="button"
                    class="km-button km-button-primary"
                    id="km-customer-import-mapping-confirm">

                    Importa

                </button>

            </div>

        `;


    overlay
        .querySelector(
            "#km-customer-import-mapping-cancel"
        )
        .onclick = () => {

            overlay.remove();

        };


    overlay
        .querySelector(
            "#km-customer-import-mapping-confirm"
        )
        .onclick = () => {

            const mapping = {};


            overlay
                .querySelectorAll(
                    ".km-import-column"
                )
                .forEach(select => {

                    mapping[
                        select.dataset.field
                    ] =
                        Number(
                            select.value
                        );

                });


            /*
            |--------------------------------------------------------------------------
            | Verifica campi obbligatori
            |--------------------------------------------------------------------------
            */

            const requiredFields = [

                "companyName",
                "taxCode"

            ];


            for(const field of requiredFields){

                if(
                    mapping[field] === undefined ||
                    mapping[field] === -1
                ){

                    alert(
                        "Devi associare Ragione sociale e Codice Fiscale."
                    );

                    return;

                }

            }


            processCustomerImport(
                rows,
                mapping,
                overlay
            );

        };

}


/*
|--------------------------------------------------------------------------
| ELABORAZIONE IMPORT
|--------------------------------------------------------------------------
*/

function processCustomerImport(
    rows,
    mapping,
    overlay
){

    const importedCustomers = [];

    const newCustomers = [];

    const existingCustomers = [];

    const duplicateCustomers = [];

    const invalidCustomers = [];


    /*
    |--------------------------------------------------------------------------
    | Clienti già presenti
    |--------------------------------------------------------------------------
    */

    const existingCustomerKeys =
        new Set();


    customers.forEach(
        customer => {

            existingCustomerKeys.add(
                buildCustomerIdentity(
                    customer.companyName,
                    customer.taxCode
                )
            );

        }
    );


    /*
    |--------------------------------------------------------------------------
    | Chiavi già incontrate nel file
    |--------------------------------------------------------------------------
    */

    const excelCustomerKeys =
        new Set();


    /*
    |--------------------------------------------------------------------------
    | Lettura righe Excel
    |--------------------------------------------------------------------------
    */

    for(
        let i = 1;
        i < rows.length;
        i++
    ){

        const row =
            rows[i];


        if(
            !row ||
            row.every(
                value =>
                    String(value ?? "")
                        .trim() === ""
            )
        ){

            continue;

        }


        const customer = {

            /*
            |--------------------------------------------------------------------------
            | IL CODICE NON VIENE MAI LETTO DA EXCEL
            |--------------------------------------------------------------------------
            */

            code:"",


            companyName:
                getImportedValue(
                    row,
                    mapping.companyName
                ),


            address:
                getImportedValue(
                    row,
                    mapping.address
                ),


            city:
                getImportedValue(
                    row,
                    mapping.city
                ),


            province:
                getImportedValue(
                    row,
                    mapping.province
                ),


            country:
                getImportedValue(
                    row,
                    mapping.country
                ),


            taxCode:
                getImportedValue(
                    row,
                    mapping.taxCode
                ),


            phone:
                getImportedValue(
                    row,
                    mapping.phone
                ),


            email:
                getImportedValue(
                    row,
                    mapping.email
                )

        };


        importedCustomers.push(
            customer
        );


        /*
        |--------------------------------------------------------------------------
        | Campi identificativi mancanti
        |--------------------------------------------------------------------------
        */

        if(
            !customer.companyName ||
            !customer.taxCode
        ){

            invalidCustomers.push({

                row:i + 1,

                customer:customer

            });

            continue;

        }


        /*
        |--------------------------------------------------------------------------
        | IDENTITÀ CLIENTE
        |--------------------------------------------------------------------------
        */

        const customerKey =
            buildCustomerIdentity(
                customer.companyName,
                customer.taxCode
            );


        /*
        |--------------------------------------------------------------------------
        | DUPLICATO INTERNO AL FILE
        |--------------------------------------------------------------------------
        */

        if(
            excelCustomerKeys.has(
                customerKey
            )
        ){

            duplicateCustomers.push({

                row:i + 1,

                customer:customer

            });

            continue;

        }


        excelCustomerKeys.add(
            customerKey
        );


        /*
        |--------------------------------------------------------------------------
        | CLIENTE GIÀ PRESENTE
        |--------------------------------------------------------------------------
        */

        if(
            existingCustomerKeys.has(
                customerKey
            )
        ){

            existingCustomers.push({

                row:i + 1,

                customer:customer

            });

            continue;

        }


        /*
        |--------------------------------------------------------------------------
        | NUOVO CLIENTE
        |--------------------------------------------------------------------------
        */

        newCustomers.push({

            row:i + 1,

            customer:customer

        });

    }


    console.log(
        "Clienti letti:",
        importedCustomers
    );


    console.log(
        "Nuovi clienti:",
        newCustomers
    );


    console.log(
        "Clienti già presenti:",
        existingCustomers
    );


    console.log(
        "Duplicati nel file:",
        duplicateCustomers
    );


    console.log(
        "Righe non valide:",
        invalidCustomers
    );


    showCustomerImportSummary(
        overlay,
        newCustomers,
        existingCustomers,
        duplicateCustomers,
        invalidCustomers
    );

}


/*
|--------------------------------------------------------------------------
| IDENTITÀ CLIENTE
|--------------------------------------------------------------------------
|
| Il cliente è identificato dalla coppia:
|
| Ragione Sociale + Codice Fiscale
|
|--------------------------------------------------------------------------
*/

function buildCustomerIdentity(
    companyName,
    taxCode
){

    return [

        normalizeCustomerValue(
            companyName
        ),

        normalizeCustomerValue(
            taxCode
        )

    ].join("|");

}


/*
|--------------------------------------------------------------------------
| NORMALIZZAZIONE CLIENTI
|--------------------------------------------------------------------------
*/

function normalizeCustomerValue(
    value
){

    return String(
        value ?? ""
    )
    .toLowerCase()
    .trim()
    .replace(/\s+/g,"");

}


/*
|--------------------------------------------------------------------------
| LETTURA VALORE IMPORTATO
|--------------------------------------------------------------------------
*/

function getImportedValue(
    row,
    index
){

    if(
        index === undefined ||
        index === null ||
        index === -1
    ){

        return "";

    }


    return String(
        row[index] ?? ""
    ).trim();

}


/*
|--------------------------------------------------------------------------
| RIEPILOGO IMPORTAZIONE
|--------------------------------------------------------------------------
*/

function showCustomerImportSummary(
    overlay,
    newCustomers,
    existingCustomers,
    duplicateCustomers,
    invalidCustomers
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

                <span
                    class="km-import-summary-icon">

                    🟢

                </span>

                <div>

                    <strong>
                        ${newCustomers.length}
                    </strong>

                    <span>
                        nuovi clienti
                    </span>

                </div>

            </div>


            <div
                class="km-import-summary-row km-import-summary-existing">

                <span
                    class="km-import-summary-icon">

                    🟡

                </span>

                <div>

                    <strong>
                        ${existingCustomers.length}
                    </strong>

                    <span>
                        clienti già presenti
                    </span>

                </div>

            </div>


            <div
                class="km-import-summary-row km-import-summary-duplicate">

                <span
                    class="km-import-summary-icon">

                    🔴

                </span>

                <div>

                    <strong>
                        ${duplicateCustomers.length}
                    </strong>

                    <span>
                        duplicati nel file
                    </span>

                </div>

            </div>


            <div
                class="km-import-summary-row km-import-summary-invalid">

                <span
                    class="km-import-summary-icon">

                    ⚠️

                </span>

                <div>

                    <strong>
                        ${invalidCustomers.length}
                    </strong>

                    <span>
                        righe non valide
                    </span>

                </div>

            </div>

        </div>


        <div class="km-import-actions">

            <button
                type="button"
                class="km-button"
                id="km-customer-import-summary-cancel">

                Annulla

            </button>


            <button
                type="button"
                class="km-button km-button-primary"
                id="km-customer-import-summary-confirm">

                Conferma importazione

            </button>

        </div>

    `;


    overlay
        .querySelector(
            "#km-customer-import-summary-cancel"
        )
        .onclick = () => {

            overlay.remove();

        };


    overlay
        .querySelector(
            "#km-customer-import-summary-confirm"
        )
        .onclick = () => {

            const success =
                importNewCustomers(
                    newCustomers
                );


            if(!success){

                alert(
                    "Errore durante l'importazione dei clienti."
                );

                return;

            }


            console.log(
                "Importazione clienti completata:",
                newCustomers
            );


            /*
            |--------------------------------------------------------------------------
            | Aggiorna la tabella Clienti
            |--------------------------------------------------------------------------
            */

            renderCustomersPage();


            overlay.remove();

        };

}


/*
|--------------------------------------------------------------------------
| GENERAZIONE CODICE CLIENTE
|--------------------------------------------------------------------------
|
| Formato:
|
| C00001
| C00002
| C00003
| ...
|
|--------------------------------------------------------------------------
*/

function generateCustomerCode(){

    let maxCode =
        0;


    customers.forEach(
        customer => {

            const code =
                String(
                    customer.code ?? ""
                )
                .trim()
                .toUpperCase();


            const match =
                code.match(
                    /^C(\d+)$/
                );


            if(!match){

                return;

            }


            const number =
                Number(
                    match[1]
                );


            if(
                Number.isFinite(number) &&
                number > maxCode
            ){

                maxCode =
                    number;

            }

        }
    );


    return `C${String(
        maxCode + 1
    ).padStart(5,"0")}`;

}


/*
|--------------------------------------------------------------------------
| IMPORTAZIONE FINALE NUOVI CLIENTI
|--------------------------------------------------------------------------
*/

function importNewCustomers(
    newCustomers
){

    if(
        !Array.isArray(
            newCustomers
        )
    ){

        return false;

    }


    /*
    |--------------------------------------------------------------------------
    | Codici già presenti
    |--------------------------------------------------------------------------
    */

    const usedCodes =
        new Set(
            customers
                .map(
                    customer =>
                        String(
                            customer.code ?? ""
                        )
                        .trim()
                        .toUpperCase()
                )
                .filter(Boolean)
        );


    /*
    |--------------------------------------------------------------------------
    | Chiavi già presenti
    |--------------------------------------------------------------------------
    */

    const existingKeys =
        new Set();


    customers.forEach(
        customer => {

            existingKeys.add(
                buildCustomerIdentity(
                    customer.companyName,
                    customer.taxCode
                )
            );

        }
    );


    /*
    |--------------------------------------------------------------------------
    | Inserimento nuovi clienti
    |--------------------------------------------------------------------------
    */

    for(
        const entry
        of newCustomers
    ){

        if(
            !entry ||
            !entry.customer
        ){

            continue;

        }


        const customer =
            entry.customer;


        /*
        |--------------------------------------------------------------------------
        | Controllo difensivo
        |--------------------------------------------------------------------------
        */

        if(
            !customer.companyName ||
            !customer.taxCode
        ){

            continue;

        }


        const customerKey =
            buildCustomerIdentity(
                customer.companyName,
                customer.taxCode
            );


        /*
        |--------------------------------------------------------------------------
        | Evita duplicati accidentali
        |--------------------------------------------------------------------------
        */

        if(
            existingKeys.has(
                customerKey
            )
        ){

            continue;

        }


        /*
        |--------------------------------------------------------------------------
        | GENERAZIONE AUTOMATICA CODICE
        |--------------------------------------------------------------------------
        */

        let generatedCode =
            generateCustomerCode();


        /*
        |--------------------------------------------------------------------------
        | Sicurezza ulteriore:
        | se il codice è già usato, continua a generare
        |--------------------------------------------------------------------------
        */

        while(
            usedCodes.has(
                generatedCode
            )
        ){

            generatedCode =
                incrementCustomerCode(
                    generatedCode
                );

        }


        customer.code =
            generatedCode;


        /*
        |--------------------------------------------------------------------------
        | Cliente attualmente importato
        |--------------------------------------------------------------------------
        */

        usedCodes.add(
            generatedCode
        );


        existingKeys.add(
            customerKey
        );


        customers.push(
            customer
        );

    }


    return true;

}


/*
|--------------------------------------------------------------------------
| INCREMENTO CODICE CLIENTE
|--------------------------------------------------------------------------
*/

function incrementCustomerCode(
    code
){

    const match =
        String(
            code ?? ""
        )
        .trim()
        .toUpperCase()
        .match(
            /^C(\d+)$/
        );


    if(!match){

        return "C00001";

    }


    const number =
        Number(
            match[1]
        );


    return `C${String(
        number + 1
    ).padStart(5,"0")}`;

}


/*
|--------------------------------------------------------------------------
| AVVIO IMPORT CLIENTI
|--------------------------------------------------------------------------
|
| Da chiamare dopo che renderCustomersPage()
| ha creato il bottone Importa.
|--------------------------------------------------------------------------
*/
