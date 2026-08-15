"use strict";

/*
|--------------------------------------------------------------------------
| Nuova Fattura di Acquisto
|--------------------------------------------------------------------------
| Inserimento manuale fattura fornitore.
|--------------------------------------------------------------------------
*/

function showNewPurchasingInvoices(){

    const workspace =
        document.getElementById("km-workspace");


    workspace.innerHTML = `

        <div class="km-page km-customers-page km-purchasing-invoice-new">

            <div class="km-page-header">

                <h1>
                    Nuova Fattura di Acquisto
                </h1>

            </div>


            <div class="km-form-container">

                <!-- =====================================================
                     FORNITORE
                     ===================================================== -->

                <div class="km-form-section">

                    <div class="km-form-section-title">
                        FORNITORE
                    </div>


                    <div class="km-form-grid">

                        <div class="km-form-field">

                            <label>
                                Fornitore
                            </label>

                            <select
                                id="purchasing-invoice-supplier"
                                onchange="populatePurchasingInvoiceSupplier()">

                                <option value="">
                                    Seleziona fornitore
                                </option>

                                ${
                                    suppliers.map(
                                        supplier => `

                                            <option
                                                value="${supplier.code}">

                                                ${supplier.companyName}

                                            </option>

                                        `
                                    ).join("")
                                }

                            </select>

                        </div>

                    </div>

                </div>


                <!-- =====================================================
                     DATI FORNITORE
                     ===================================================== -->

                <div class="km-form-section">

                    <div class="km-form-section-title">
                        DATI FORNITORE
                    </div>


                    <div class="km-form-grid">

                        <div class="km-form-field">

                            <label>
                                Ragione sociale
                            </label>

                            <input
                                id="purchasing-invoice-company-name"
                                type="text"
                                readonly>

                        </div>


                        <div class="km-form-field">

                            <label>
                                Indirizzo
                            </label>

                            <input
                                id="purchasing-invoice-address"
                                type="text"
                                readonly>

                        </div>


                        <div class="km-form-field">

                            <label>
                                Comune
                            </label>

                            <input
                                id="purchasing-invoice-city"
                                type="text"
                                readonly>

                        </div>


                        <div class="km-form-field">

                            <label>
                                Provincia
                            </label>

                            <input
                                id="purchasing-invoice-province"
                                type="text"
                                readonly>

                        </div>


                        <div class="km-form-field">

                            <label>
                                Nazione
                            </label>

                            <input
                                id="purchasing-invoice-country"
                                type="text"
                                readonly>

                        </div>

                    </div>

                </div>


                <!-- =====================================================
                     DATI FATTURA
                     ===================================================== -->

                <div class="km-form-section">

                    <div class="km-form-section-title">
                        DATI FATTURA
                    </div>


                    <div class="km-form-grid">

                        <div class="km-form-field">

                            <label>
                                Numero
                            </label>

                            <input
                                id="purchasing-invoice-number"
                                type="text"
                                placeholder="Numero fattura">

                        </div>


                        <div class="km-form-field">

                            <label>
                                Data
                            </label>

                            <input
                                id="purchasing-invoice-date"
                                type="date">

                        </div>


                        <div class="km-form-field">

                            <label>
                                Totale imponibile
                            </label>

                            <input
                                id="purchasing-invoice-taxable-amount"
                                type="text"
                                inputmode="decimal"
                                placeholder="0,00 €">

                        </div>


                        <div class="km-form-field">

                            <label>
                                IVA
                            </label>

                            <input
                                id="purchasing-invoice-vat-amount"
                                type="text"
                                inputmode="decimal"
                                placeholder="0,00 €">

                        </div>

                        <div class="km-form-field">

                            <label>
                                Spese di Trasporto
                            </label>

                            <input
                                id="purchasing-invoice-trasportcosts-amount"
                                type="text"
                                inputmode="decimal"
                                placeholder="0,00 €">

                        </div>

                        <div class="km-form-field">

                            <label>
                                Bolli
                            </label>

                            <input
                                id="purchasing-invoice-stampduty-amount"
                                type="text"
                                inputmode="decimal"
                                placeholder="0,00 €">

                        </div>


                        <div class="km-form-field">

                            <label>
                                Totale fattura
                            </label>

                            <input
                                id="purchasing-invoice-amount"
                                type="text"
                                inputmode="decimal"
                                placeholder="0,00 €">

                        </div>

                    </div>

                </div>


                <!-- =====================================================
                     NOTE
                     ===================================================== -->

                <div class="km-form-section">

                    <div class="km-form-section-title">
                        NOTE
                    </div>


                    <div class="km-form-field">

                        <label>
                            Note
                        </label>

                        <textarea
                            id="purchasing-invoice-notes"
                            rows="5"
                            placeholder="Eventuali note relative alla fattura o al materiale">
                        </textarea>

                    </div>

                </div>


                <!-- =====================================================
                     AZIONI
                     ===================================================== -->

                <div class="km-form-actions">

                    <button
                        type="button"
                        class="km-button"
                        onclick="renderPurchasingInvoicesPage()">

                        Annulla

                    </button>


                    <button
                        type="button"
                        class="km-button km-button-primary"
                        onclick="saveNewPurchasingInvoice()">

                        Salva

                    </button>

                </div>

            </div>

        </div>

    `;

}


/*
|--------------------------------------------------------------------------
| Popolamento dati fornitore
|--------------------------------------------------------------------------
*/

function populatePurchasingInvoiceSupplier(){

    const select =
        document.getElementById(
            "purchasing-invoice-supplier"
        );


    if(!select){

        return;

    }


    const supplier =
        suppliers.find(
            item =>
                item.code === select.value
        );


    const fields = {

        companyName:
            document.getElementById(
                "purchasing-invoice-company-name"
            ),

        address:
            document.getElementById(
                "purchasing-invoice-address"
            ),

        city:
            document.getElementById(
                "purchasing-invoice-city"
            ),

        province:
            document.getElementById(
                "purchasing-invoice-province"
            ),

        country:
            document.getElementById(
                "purchasing-invoice-country"
            )

    };


    if(!supplier){

        Object.values(fields)
            .forEach(
                field => {

                    if(field){

                        field.value = "";

                    }

                }
            );

        return;

    }


    fields.companyName.value =
        supplier.companyName || "";


    fields.address.value =
        supplier.address || "";


    fields.city.value =
        supplier.city || "";


    fields.province.value =
        supplier.province || "";


    fields.country.value =
        supplier.country || "";

}


/*
|--------------------------------------------------------------------------
| Salvataggio nuova fattura
|--------------------------------------------------------------------------
*/

function saveNewPurchasingInvoice(){

    const supplierSelect =
        document.getElementById(
            "purchasing-invoice-supplier"
        );

    const numberInput =
        document.getElementById(
            "purchasing-invoice-number"
        );

    const dateInput =
        document.getElementById(
            "purchasing-invoice-date"
        );

    const taxableAmountInput =
        document.getElementById(
            "purchasing-invoice-taxable-amount"
        );

    const vatAmountInput =
        document.getElementById(
            "purchasing-invoice-vat-amount"
        );

    const transportcostsAmountInput =
        document.getElementById(
            "purchasing-invoice-trasportcosts-amount"
        );

    const stampdutyAmountInput =
        document.getElementById(
            "purchasing-invoice-stampduty-amount"
        );

    const amountInput =
        document.getElementById(
            "purchasing-invoice-amount"
        );

    const notesInput =
        document.getElementById(
            "purchasing-invoice-notes"
        );


    if(!supplierSelect.value){

        alert(
            "Seleziona un fornitore."
        );

        return;

    }


    if(!numberInput.value.trim()){

        alert(
            "Inserisci il numero della fattura."
        );

        return;

    }


    if(!dateInput.value){

        alert(
            "Inserisci la data della fattura."
        );

        return;

    }

    if(!taxableAmountInput.value.trim()){

        alert(
            "Inserisci il totale imponibile della fattura."
        );

        return;

    }


    if(!vatAmountInput.value.trim()){

        alert(
            "Inserisci l'importo IVA della fattura."
        );

        return;

    }

    if(!transportcostsAmountInput.value.trim()){

        alert(
            "Inserisci i costi di trasporto."
        );

        return;

    }

    if(!stampdutyAmountInput.value.trim()){

        alert(
            "Inserisci il valore del bollo."
        );

        return;

    }


    if(!amountInput.value.trim()){

        alert(
            "Inserisci il totale della fattura."
        );

        return;

    }


    const supplier =
        suppliers.find(
            item =>
                item.code === supplierSelect.value
        );


    if(!supplier){

        alert(
            "Fornitore non trovato."
        );

        return;

    }

    const dateParts =
        dateInput.value.split("-");

    const formattedDate =
        dateParts.length === 3
            ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
            : dateInput.value;


    const formattedAmount =
        amountInput.value.trim().endsWith("€")
            ? amountInput.value.trim()
            : `${amountInput.value.trim()} €`;

    const invoice = {

        number:
            numberInput.value.trim(),

        date:
            formattedDate,

        companyName:
            supplier.companyName || "",

        address:
            supplier.address || "",

        city:
            supplier.city || "",

        province:
            supplier.province || "",

        country:
            supplier.country || "",

        taxableAmount:
            taxableAmountInput.value.trim(),

        vatAmount:
            vatAmountInput.value.trim(),

        transportcostsAmount:
            transportcostsAmountInput.value.trim(),

        stampdutyAmount:
            stampdutyAmountInput.value.trim(),

        amount:
            formatPurchasingInvoiceAmount(
                amountInput.value
            ),

        notes:
            notesInput.value.trim(),

        supplierCode:
            supplier.code

    };

    
    purchasinginvoiceList.push(
        invoice
    );


    renderPurchasingInvoicesPage();

}

function formatPurchasingInvoiceAmount(value){

    if(value === null || value === undefined || value === ""){

        return "";

    }

    let normalized =
        String(value)
            .trim()
            .replace("€", "")
            .trim()
            .replace(/\./g, "")
            .replace(",", ".");

    const number =
        parseFloat(normalized);

    if(Number.isNaN(number)){

        return String(value).trim();

    }

    return number.toLocaleString(
        "it-IT",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ) + " €";

}