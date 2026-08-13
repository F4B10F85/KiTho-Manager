"use strict";

/*
|--------------------------------------------------------------------------
| IMPORTAZIONE FATTURA FORNITORE DA XML
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| IMPORTAZIONE FILE
|--------------------------------------------------------------------------
*/

function importSupplierInvoiceXml(file){

    if(!file){

        return null;

    }


    const reader =
        new FileReader();


    reader.onload =
        function(event){

            const xmlText =
                event.target.result;


            const invoice =
                parseSupplierInvoiceXml(
                    xmlText,
                    file.name
                );


            if(!invoice){

                return;

            }


            console.log(
                "Fattura fornitore importata:",
                invoice
            );

        };


    reader.readAsText(
        file,
        "UTF-8"
    );

}


/*
|--------------------------------------------------------------------------
| PARSING XML
|--------------------------------------------------------------------------
*/

function parseSupplierInvoiceXml(
    xmlText,
    fileName
){

    const parser =
        new DOMParser();


    const xml =
        parser.parseFromString(
            xmlText,
            "text/xml"
        );


    /*
    |--------------------------------------------------------------------------
    | CONTROLLO XML
    |--------------------------------------------------------------------------
    */

    const parserError =
        xml.querySelector(
            "parsererror"
        );


    if(parserError){

        console.error(
            "XML non valido:",
            parserError.textContent
        );

        return null;

    }


    /*
    |--------------------------------------------------------------------------
    | COPIA MODELLO
    |--------------------------------------------------------------------------
    */

    const invoice =
        JSON.parse(
            JSON.stringify(
                supplierInvoice
            )
        );


    /*
    |--------------------------------------------------------------------------
    | XML ORIGINALE
    |--------------------------------------------------------------------------
    */

    invoice.sourceXml = {

        fileName:
            fileName || "",

        content:
            xmlText

    };


    /*
    |--------------------------------------------------------------------------
    | TESTATA
    |--------------------------------------------------------------------------
    */

    const documentCode =
        getXmlValue(
            xml,
            "TipoDocumento"
        );


    invoice.documentType = {

        code:
            documentCode,

        label:
            getElectronicInvoiceDocumentLabel(
                documentCode
            ) || documentCode

    };


    invoice.number =
        getXmlValue(
            xml,
            "Numero"
        );


    invoice.date =
        getXmlValue(
            xml,
            "Data"
        );


    invoice.currency =
        getXmlValue(
            xml,
            "Divisa"
        ) || "EUR";


    invoice.causali =
        parseSupplierInvoiceCausali(
            xml
        );

    invoice.purchaseOrder =
        parseSupplierInvoicePurchaseOrder(
            xml
        );

    invoice.transport =
        parseSupplierInvoiceTransport(
            xml
        );


    /*
    |--------------------------------------------------------------------------
    | FORNITORE
    |--------------------------------------------------------------------------
    */

    invoice.supplier =
        parseSupplierFromXml(
            xml
        );


    /*
    |--------------------------------------------------------------------------
    | NOSTRA AZIENDA
    |--------------------------------------------------------------------------
    */

    invoice.customer =
        parseCustomerFromXml(
            xml
        );


    /*
    |--------------------------------------------------------------------------
    | RIGHE
    |--------------------------------------------------------------------------
    */

    invoice.rows =
        parseSupplierInvoiceRows(
            xml
        );


    /*
    |--------------------------------------------------------------------------
    | RIEPILOGO IVA
    |--------------------------------------------------------------------------
    */

    invoice.vatSummary =
        parseSupplierInvoiceVatSummary(
            xml
        );


    /*
    |--------------------------------------------------------------------------
    | TOTALI
    |--------------------------------------------------------------------------
    */

    invoice.totals =
        parseSupplierInvoiceTotals(
            xml
        );


    /*
    |--------------------------------------------------------------------------
    | PAGAMENTI
    |--------------------------------------------------------------------------
    */

    invoice.payments =
        parseSupplierInvoicePayments(
            xml
        );


    /*
    |--------------------------------------------------------------------------
    | RITENUTE
    |--------------------------------------------------------------------------
    */

    invoice.withholdingTaxes =
        parseSupplierInvoiceWithholdingTaxes(
            xml
        );


    /*
    |--------------------------------------------------------------------------
    | CONTRIBUTI
    |--------------------------------------------------------------------------
    */

    invoice.socialContributions =
        parseSupplierInvoiceSocialContributions(
            xml
        );


    /*
    |--------------------------------------------------------------------------
    | DATI ELETTRONICI
    |--------------------------------------------------------------------------
    */

    invoice.electronicData =
        parseSupplierInvoiceElectronicData(
            xml
        );


    return invoice;

}


/*
|--------------------------------------------------------------------------
| LETTURA VALORE XML
|--------------------------------------------------------------------------
*/

function getXmlValue(
    parent,
    tagName
){

    const element =
        parent.getElementsByTagName(
            tagName
        )[0];


    if(!element){

        return "";

    }


    return String(
        element.textContent || ""
    ).trim();

}


/*
|--------------------------------------------------------------------------
| LETTURA DI TUTTI I VALORI XML
|--------------------------------------------------------------------------
*/

function getXmlValues(
    parent,
    tagName
){

    return Array.from(
        parent.getElementsByTagName(
            tagName
        )
    )
    .map(
        element =>
            String(
                element.textContent || ""
            ).trim()
    );

}


/*
|--------------------------------------------------------------------------
| CONVERSIONE NUMERO
|--------------------------------------------------------------------------
*/

function parseXmlNumber(
    value
){

    const number =
        Number(
            String(
                value ?? ""
            )
            .replace(",", ".")
        );


    return Number.isFinite(number)
        ? number
        : 0;

}


/*
|--------------------------------------------------------------------------
| FORNITORE
|--------------------------------------------------------------------------
*/

function parseSupplierFromXml(
    xml
){

    const supplierNode =
        xml.getElementsByTagName(
            "CedentePrestatore"
        )[0];


    if(!supplierNode){

        return {

            id:"",
            code:"",
            companyName:"",
            vatNumber:"",
            taxCode:"",
            address:"",
            postalCode:"",
            city:"",
            province:"",
            country:"",
            recipientCode:"",
            pec:""

        };

    }


    const idFiscal =
        supplierNode.getElementsByTagName(
            "IdFiscaleIVA"
        )[0];


    const vatNumber =
        idFiscal
            ? getXmlValue(
                idFiscal,
                "IdCodice"
            )
            : "";


    return {

        id:"",
        code:"",

        companyName:
            getXmlValue(
                supplierNode,
                "Denominazione"
            ),

        vatNumber,

        taxCode:
            getXmlValue(
                supplierNode,
                "CodiceFiscale"
            ),

        address:
            getXmlValue(
                supplierNode,
                "Indirizzo"
            ),

        postalCode:
            getXmlValue(
                supplierNode,
                "CAP"
            ),

        city:
            getXmlValue(
                supplierNode,
                "Comune"
            ),

        province:
            getXmlValue(
                supplierNode,
                "Provincia"
            ),

        country:
            getXmlValue(
                supplierNode,
                "Nazione"
            ),

        recipientCode:
            getXmlValue(
                supplierNode,
                "CodiceDestinatario"
            ),

        pec:
            getXmlValue(
                supplierNode,
                "PECDestinatario"
            )

    };

}


/*
|--------------------------------------------------------------------------
| NOSTRA AZIENDA / CESSIONARIO
|--------------------------------------------------------------------------
*/

function parseCustomerFromXml(
    xml
){

    const customerNode =
        xml.getElementsByTagName(
            "CessionarioCommittente"
        )[0];


    if(!customerNode){

        return {

            companyName:"",
            vatNumber:"",
            taxCode:"",
            address:"",
            postalCode:"",
            city:"",
            province:"",
            country:"",
            recipientCode:"",
            pec:""

        };

    }


    const idFiscal =
        customerNode.getElementsByTagName(
            "IdFiscaleIVA"
        )[0];


    const transmissionNode =
        xml.getElementsByTagName(
            "DatiTrasmissione"
        )[0];


    return {

        companyName:
            getXmlValue(
                customerNode,
                "Denominazione"
            ),

        vatNumber:
            idFiscal
                ? getXmlValue(
                    idFiscal,
                    "IdCodice"
                )
                : "",

        taxCode:
            getXmlValue(
                customerNode,
                "CodiceFiscale"
            ),

        address:
            getXmlValue(
                customerNode,
                "Indirizzo"
            ),

        postalCode:
            getXmlValue(
                customerNode,
                "CAP"
            ),

        city:
            getXmlValue(
                customerNode,
                "Comune"
            ),

        province:
            getXmlValue(
                customerNode,
                "Provincia"
            ),

        country:
            getXmlValue(
                customerNode,
                "Nazione"
            ),

        recipientCode:
            transmissionNode
                ? getXmlValue(
                    transmissionNode,
                    "CodiceDestinatario"
                )
                : "",

        pec:
            transmissionNode
                ? getXmlValue(
                    transmissionNode,
                    "PECDestinatario"
                )
                : ""

    };

}


/*
|--------------------------------------------------------------------------
| RIGHE FATTURA
|--------------------------------------------------------------------------
*/

function parseSupplierInvoiceRows(
    xml
){

    const lineNodes =
        Array.from(
            xml.getElementsByTagName(
                "DettaglioLinee"
            )
        );


    return lineNodes.map(
        line => {

            const vatNatureCode =
                getXmlValue(
                    line,
                    "Natura"
                );


            return {

                lineNumber:
                    parseXmlNumber(
                        getXmlValue(
                            line,
                            "NumeroLinea"
                        )
                    ),

                supplierCode:
                    getXmlValue(
                        line,
                        "CodiceArticolo"
                    ),

                description:
                    getXmlValue(
                        line,
                        "Descrizione"
                    ),

                quantity:
                    parseXmlNumber(
                        getXmlValue(
                            line,
                            "Quantita"
                        )
                    ),

                unitOfMeasure:
                    getXmlValue(
                        line,
                        "UnitaMisura"
                    ),

                unitPrice:
                    parseXmlNumber(
                        getXmlValue(
                            line,
                            "PrezzoUnitario"
                        )
                    ),

                discount:
                    parseXmlNumber(
                        getXmlValue(
                            line,
                            "ScontoMaggiorazione"
                        )
                    ),

                surcharge:0,

                totalPrice:
                    parseXmlNumber(
                        getXmlValue(
                            line,
                            "PrezzoTotale"
                        )
                    ),

                vatRate:
                    parseXmlNumber(
                        getXmlValue(
                            line,
                            "AliquotaIVA"
                        )
                    ),

                vatNature: {

                    label:
                        vatNatureCode
                            ? getElectronicInvoiceVatNatureLabel(
                                vatNatureCode
                            ) || vatNatureCode
                            : "",

                    code:
                        vatNatureCode

                }

            };

        }
    );

}


/*
|--------------------------------------------------------------------------
| RIEPILOGO IVA
|--------------------------------------------------------------------------
*/

function parseSupplierInvoiceVatSummary(
    xml
){

    const summaryNodes =
        Array.from(
            xml.getElementsByTagName(
                "DatiRiepilogo"
            )
        );


    return summaryNodes.map(
        summary => {

            const vatNatureCode =
                getXmlValue(
                    summary,
                    "Natura"
                );


            return {

                vatRate:
                    parseXmlNumber(
                        getXmlValue(
                            summary,
                            "AliquotaIVA"
                        )
                    ),

                taxableAmount:
                    parseXmlNumber(
                        getXmlValue(
                            summary,
                            "ImponibileImporto"
                        )
                    ),

                vatAmount:
                    parseXmlNumber(
                        getXmlValue(
                            summary,
                            "Imposta"
                        )
                    ),

                vatNature: {

                    label:
                        vatNatureCode
                            ? getElectronicInvoiceVatNatureLabel(
                                vatNatureCode
                            ) || vatNatureCode
                            : "",

                    code:
                        vatNatureCode

                }

            };

        }
    );

}


/*
|--------------------------------------------------------------------------
| TOTALI
|--------------------------------------------------------------------------
*/

function parseSupplierInvoiceTotals(xml) {

    const vatSummary =
        parseSupplierInvoiceVatSummary(
            xml
        );

    const taxableAmount =
        vatSummary.reduce(
            (
                total,
                item
            ) =>
                total +
                item.taxableAmount,
            0
        );

    const vatAmount =
        vatSummary.reduce(
            (
                total,
                item
            ) =>
                total +
                item.vatAmount,
            0
        );

    const totalDocumentValue =
        parseXmlNumber(
            getXmlValue(
                xml,
                "ImportoTotaleDocumento"
            )
        );

    const paymentNodes =
        Array.from(
            xml.getElementsByTagName(
                "DettaglioPagamento"
            )
        );

    const paymentTotal =
        paymentNodes.reduce(
            (
                total,
                payment
            ) =>
                total +
                parseXmlNumber(
                    getXmlValue(
                        payment,
                        "ImportoPagamento"
                    )
                ),
            0
        );

    const totalAmount =
        totalDocumentValue > 0
            ? totalDocumentValue
            : paymentTotal;

    return {

        taxableAmount,

        vatAmount,

        stampDuty:
            parseXmlNumber(
                getXmlValue(
                    xml,
                    "ImportoBollo"
                )
            ),

        withholding: 0,

        contributions: 0,

        totalAmount

    };

}


/*
|--------------------------------------------------------------------------
| PAGAMENTI
|--------------------------------------------------------------------------
*/

function parseSupplierInvoicePayments(
    xml
){

    const paymentNodes =
        Array.from(
            xml.getElementsByTagName(
                "DettaglioPagamento"
            )
        );


    return paymentNodes.map(
        payment => {

            return {

                conditions:
                    getXmlValue(
                        payment.parentNode,
                        "CondizioniPagamento"
                    ),

                method:
                    getXmlValue(
                        payment,
                        "ModalitaPagamento"
                    ),

                dueDate:
                    getXmlValue(
                        payment,
                        "DataScadenzaPagamento"
                    ),

                amount:
                    parseXmlNumber(
                        getXmlValue(
                            payment,
                            "ImportoPagamento"
                        )
                    ),

                bank:
                    getXmlValue(
                        payment,
                        "IstitutoFinanziario"
                    ),

                iban:
                    getXmlValue(
                        payment,
                        "IBAN"
                    ),

                bic:
                    getXmlValue(
                        payment,
                        "BIC"
                    )

            };

        }
    );

}


/*
|--------------------------------------------------------------------------
| RITENUTE
|--------------------------------------------------------------------------
*/

function parseSupplierInvoiceWithholdingTaxes(
    xml
){

    const withholdingNodes =
        Array.from(
            xml.getElementsByTagName(
                "DatiRitenuta"
            )
        );


    return withholdingNodes.map(
        withholding => {

            const typeCode =
                getXmlValue(
                    withholding,
                    "TipoRitenuta"
                );


            return {

                type: {

                    code:
                        typeCode,

                    label:
                        typeCode
                            ? getElectronicInvoiceWithholdingLabel(
                                typeCode
                            ) || typeCode
                            : ""

                },

                taxableAmount:
                    parseXmlNumber(
                        getXmlValue(
                            withholding,
                            "ImportoAmmontare"
                        )
                    ),

                rate:
                    parseXmlNumber(
                        getXmlValue(
                            withholding,
                            "Percentuale"
                        )
                    ),

                amount:
                    parseXmlNumber(
                        getXmlValue(
                            withholding,
                            "Importo"
                        )
                    )

            };

        }
    );

}


/*
|--------------------------------------------------------------------------
| CONTRIBUTI PREVIDENZIALI
|--------------------------------------------------------------------------
*/

function parseSupplierInvoiceSocialContributions(
    xml
){

    const contributionNodes =
        Array.from(
            xml.getElementsByTagName(
                "DatiCassaPrevidenziale"
            )
        );


    return contributionNodes.map(
        contribution => {

            const typeCode =
                getXmlValue(
                    contribution,
                    "AlCassa"
                );


            return {

                type: {

                    code:
                        typeCode,

                    label:
                        typeCode
                            ? getElectronicInvoiceSocialContributionLabel(
                                typeCode
                            ) || typeCode
                            : ""

                },

                taxableAmount:
                    parseXmlNumber(
                        getXmlValue(
                            contribution,
                            "ImponibileCassa"
                        )
                    ),

                rate:
                    parseXmlNumber(
                        getXmlValue(
                            contribution,
                            "AliquotaCassa"
                        )
                    ),

                amount:
                    parseXmlNumber(
                        getXmlValue(
                            contribution,
                            "ImportoContributoCassa"
                        )
                    )

            };

        }
    );

}


/*
|--------------------------------------------------------------------------
| DATI ELETTRONICI / SdI
|--------------------------------------------------------------------------
*/

function parseSupplierInvoiceElectronicData(
    xml
){

    const transmissionNode =
        xml.getElementsByTagName(
            "DatiTrasmissione"
        )[0];


    if(!transmissionNode){

        return {

            sdiId:"",
            transmissionDate:"",
            deliveryStatus:""

        };

    }


    /*
    |--------------------------------------------------------------------------
    | ATTENZIONE
    |--------------------------------------------------------------------------
    |
    | ProgressivoInvio NON è l'identificativo SdI.
    | Non lo memorizziamo come sdiId.
    |
    */

    return {

        sdiId:"",

        transmissionDate:"",

        deliveryStatus:""

    };

}

/*
|--------------------------------------------------------------------------
| TEST IMPORTAZIONE FATTURA FORNITORE
|--------------------------------------------------------------------------
*/

function testSupplierInvoiceImport(){

    const input =
        document.createElement("input");

    input.type = "file";

    input.accept = ".xml,text/xml";


    input.onchange =
        function(){

            const file =
                input.files[0];

            if(!file){

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function(){

                    const xmlText =
                        reader.result;


                    const invoice =
                        parseSupplierInvoiceXml(
                            xmlText
                        );


                    console.log(
                        "Fattura fornitore importata:",
                        invoice
                    );


                    showSupplierInvoice(
                        invoice
                    );

                };


            reader.readAsText(file);

        };


    input.click();

}


/*
|--------------------------------------------------------------------------
| RENDER FATTURA FORNITORE
|--------------------------------------------------------------------------
*/

function renderSupplierInvoice(invoice){

    const supplier =
        invoice.supplier || {};

    const customer =
        invoice.customer || {};

    const rows =
        Array.isArray(invoice.rows)
            ? invoice.rows
            : [];

    const vatSummary =
        Array.isArray(invoice.vatSummary)
            ? invoice.vatSummary
            : [];

    const payments =
        Array.isArray(invoice.payments)
            ? invoice.payments
            : [];


    const formatAmount =
        value =>
            formatSupplierInvoiceAmount(
                value
            );


    const formatDate =
        value => {

            if(!value){

                return "";

            }

            const parts =
                String(value).split("-");

            if(parts.length !== 3){

                return value;

            }

            return `${parts[2]}/${parts[1]}/${parts[0]}`;

        };


    const renderParty =
        (
            title,
            party
        ) => {

            return `

                <div class="km-supplier-invoice-party">

                    <div class="km-supplier-invoice-party-title">
                        ${title}
                    </div>

                    <div class="km-supplier-invoice-party-name">
                        ${party.companyName || ""}
                    </div>

                    <div>
                        ${party.address || ""}
                    </div>

                    <div>
                        ${party.postalCode || ""}
                        ${party.city || ""}
                        ${
                            party.province
                                ? `(${party.province})`
                                : ""
                        }
                    </div>

                    <div>
                        ${party.country || ""}
                    </div>

                    ${
                        party.vatNumber
                            ? `
                                <div>
                                    P. IVA:
                                    ${party.vatNumber}
                                </div>
                            `
                            : ""
                    }

                    ${
                        party.taxCode
                            ? `
                                <div>
                                    Codice Fiscale:
                                    ${party.taxCode}
                                </div>
                            `
                            : ""
                    }

                    ${
                        party.recipientCode
                            ? `
                                <div>
                                    Codice Destinatario:
                                    ${party.recipientCode}
                                </div>
                            `
                            : ""
                    }

                    ${
                        party.pec
                            ? `
                                <div>
                                    PEC:
                                    ${party.pec}
                                </div>
                            `
                            : ""
                    }

                </div>

            `;

        };


    return `

        <div class="km-supplier-invoice">

            <!-- =========================================================
                 TESTATA
                 ========================================================= -->

            <div class="km-supplier-invoice-header">

                <div>

                    <div class="km-supplier-invoice-title">
                        FATTURA FORNITORE
                    </div>

                    <div class="km-supplier-invoice-document-type">
                        ${invoice.documentType?.label || ""}
                        ${
                            invoice.documentType?.code
                                ? `(${invoice.documentType.code})`
                                : ""
                        }
                    </div>

                </div>


                <div class="km-supplier-invoice-header-data">

                    <div>

                        <span>
                            Numero
                        </span>

                        <strong>
                            ${invoice.number || ""}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Data
                        </span>

                        <strong>
                            ${formatDate(invoice.date)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Valuta
                        </span>

                        <strong>
                            ${invoice.currency || "EUR"}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- =========================================================
                 FORNITORE / DESTINATARIO
                 ========================================================= -->

            <div class="km-supplier-invoice-parties">

                ${renderParty(
                    "FORNITORE",
                    supplier
                )}

                ${renderParty(
                    "DESTINATARIO",
                    customer
                )}

            </div>


            <!-- =========================================================
                 RIGHE
                 ========================================================= -->

            <div class="km-supplier-invoice-section">

                <div class="km-supplier-invoice-section-title">
                    DETTAGLIO FATTURA
                </div>


                <table class="km-supplier-invoice-table">

                    <thead>

                        <tr>

                            <th class="col-line">
                                #
                            </th>

                            <th class="col-code">
                                Codice fornitore
                            </th>

                            <th class="col-description">
                                Descrizione
                            </th>

                            <th class="col-quantity">
                                Q.tà
                            </th>

                            <th class="col-um">
                                UM
                            </th>

                            <th class="col-price">
                                Prezzo unit.
                            </th>

                            <th class="col-discount">
                                Sconto
                            </th>

                            <th class="col-total">
                                Totale
                            </th>

                            <th class="col-vat">
                                IVA
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${
                            rows.length
                                ? rows.map(
                                    row => `

                                        <tr>

                                            <td class="text-center">
                                                ${row.lineNumber || ""}
                                            </td>

                                            <td>
                                                ${row.supplierCode || ""}
                                            </td>

                                            <td>
                                                ${row.description || ""}
                                            </td>

                                            <td class="text-right">
                                                ${row.quantity ?? ""}
                                            </td>

                                            <td class="text-center">
                                                ${row.unitOfMeasure || ""}
                                            </td>

                                            <td class="text-right">
                                                ${formatAmount(row.unitPrice)}
                                            </td>

                                            <td class="text-right">
                                                ${formatAmount(row.discount)}
                                            </td>

                                            <td class="text-right">
                                                ${formatAmount(row.totalPrice)}
                                            </td>

                                            <td class="text-right">

                                                ${row.vatRate ?? ""}%

                                                ${
                                                    row.vatNature?.code
                                                        ? `
                                                            <small>
                                                                ${row.vatNature.code}
                                                            </small>
                                                        `
                                                        : ""
                                                }

                                            </td>

                                        </tr>

                                    `
                                ).join("")
                                : `
                                    <tr>

                                        <td
                                            colspan="9"
                                            class="km-supplier-invoice-empty"
                                        >
                                            Nessuna riga presente
                                        </td>

                                    </tr>
                                `
                        }

                    </tbody>

                </table>

            </div>


            <!-- =========================================================
                 BLOCCO INFERIORE
                 ========================================================= -->

            <div class="km-supplier-invoice-bottom">


                <!-- =====================================================
                     RIEPILOGO IVA
                     ===================================================== -->

                <div class="km-supplier-invoice-vat">

                    <div class="km-supplier-invoice-section-title">
                        RIEPILOGO IVA
                    </div>


                    <table class="km-supplier-invoice-table">

                        <thead>

                            <tr>

                                <th>
                                    Aliquota
                                </th>

                                <th>
                                    Imponibile
                                </th>

                                <th>
                                    Imposta
                                </th>

                                <th>
                                    Natura
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${
                                vatSummary.length
                                    ? vatSummary.map(
                                        item => `

                                            <tr>

                                                <td>
                                                    ${item.vatRate ?? ""}%
                                                </td>

                                                <td class="text-right">
                                                    ${formatAmount(item.taxableAmount)}
                                                </td>

                                                <td class="text-right">
                                                    ${formatAmount(item.vatAmount)}
                                                </td>

                                                <td>
                                                    ${item.vatNature?.code || ""}
                                                </td>

                                            </tr>

                                        `
                                    ).join("")
                                    : `
                                        <tr>

                                            <td
                                                colspan="4"
                                                class="km-supplier-invoice-empty"
                                            >
                                                Nessun riepilogo IVA
                                            </td>

                                        </tr>
                                    `
                            }

                        </tbody>

                    </table>

                </div>


                <!-- =====================================================
                     TOTALI
                     ===================================================== -->

                <div class="km-supplier-invoice-totals">

                    <div>

                        <span>
                            Imponibile
                        </span>

                        <strong>
                            ${formatAmount(invoice.totals?.taxableAmount)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            IVA
                        </span>

                        <strong>
                            ${formatAmount(invoice.totals?.vatAmount)}
                        </strong>

                    </div>


                    ${
                        invoice.totals?.stampDuty
                            ? `
                                <div>

                                    <span>
                                        Bollo
                                    </span>

                                    <strong>
                                        ${formatAmount(invoice.totals.stampDuty)}
                                    </strong>

                                </div>
                            `
                            : ""
                    }


                    ${
                        invoice.totals?.withholding
                            ? `
                                <div>

                                    <span>
                                        Ritenute
                                    </span>

                                    <strong>
                                        ${formatAmount(invoice.totals.withholding)}
                                    </strong>

                                </div>
                            `
                            : ""
                    }


                    ${
                        invoice.totals?.contributions
                            ? `
                                <div>

                                    <span>
                                        Contributi
                                    </span>

                                    <strong>
                                        ${formatAmount(invoice.totals.contributions)}
                                    </strong>

                                </div>
                            `
                            : ""
                    }


                    <div class="km-supplier-invoice-total">

                        <span>
                            TOTALE DOCUMENTO
                        </span>

                        <strong>
                            ${formatAmount(invoice.totals?.totalAmount)}
                            ${invoice.currency || "EUR"}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- =========================================================
                 PAGAMENTI
                 ========================================================= -->

            ${
                payments.length
                    ? `

                        <div class="km-supplier-invoice-section">

                            <div class="km-supplier-invoice-section-title">
                                PAGAMENTI E SCADENZE
                            </div>


                            <table class="km-supplier-invoice-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Condizioni
                                        </th>

                                        <th>
                                            Modalità
                                        </th>

                                        <th>
                                            Scadenza
                                        </th>

                                        <th>
                                            Importo
                                        </th>

                                        <th>
                                            Banca
                                        </th>

                                        <th>
                                            IBAN
                                        </th>

                                        <th>
                                            BIC
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    ${payments.map(
                                        payment => `

                                            <tr>

                                                <td>
                                                    ${payment.conditions || ""}
                                                </td>

                                                <td>
                                                    ${payment.method || ""}
                                                </td>

                                                <td>
                                                    ${formatDate(payment.dueDate)}
                                                </td>

                                                <td class="text-right">
                                                    ${formatAmount(payment.amount)}
                                                </td>

                                                <td>
                                                    ${payment.bank || ""}
                                                </td>

                                                <td>
                                                    ${payment.iban || ""}
                                                </td>

                                                <td>
                                                    ${payment.bic || ""}
                                                </td>

                                            </tr>

                                        `
                                    ).join("")}

                                </tbody>

                            </table>

                        </div>

                    `
                    : ""
            }


            <!-- =========================================================
                 RITENUTE
                 ========================================================= -->

            ${
                invoice.withholdingTaxes?.length
                    ? `

                        <div class="km-supplier-invoice-section">

                            <div class="km-supplier-invoice-section-title">
                                RITENUTE
                            </div>

                            <table class="km-supplier-invoice-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Tipo
                                        </th>

                                        <th>
                                            Imponibile
                                        </th>

                                        <th>
                                            Aliquota
                                        </th>

                                        <th>
                                            Importo
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    ${invoice.withholdingTaxes.map(
                                        item => `

                                            <tr>

                                                <td>
                                                    ${item.type?.label || item.type?.code || ""}
                                                </td>

                                                <td class="text-right">
                                                    ${formatAmount(item.taxableAmount)}
                                                </td>

                                                <td class="text-right">
                                                    ${item.rate ?? ""}%
                                                </td>

                                                <td class="text-right">
                                                    ${formatAmount(item.amount)}
                                                </td>

                                            </tr>

                                        `
                                    ).join("")}

                                </tbody>

                            </table>

                        </div>

                    `
                    : ""
            }


            <!-- =========================================================
                 CONTRIBUTI
                 ========================================================= -->

            ${
                invoice.socialContributions?.length
                    ? `

                        <div class="km-supplier-invoice-section">

                            <div class="km-supplier-invoice-section-title">
                                CONTRIBUTI PREVIDENZIALI
                            </div>

                            <table class="km-supplier-invoice-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Cassa
                                        </th>

                                        <th>
                                            Imponibile
                                        </th>

                                        <th>
                                            Aliquota
                                        </th>

                                        <th>
                                            Importo
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    ${invoice.socialContributions.map(
                                        item => `

                                            <tr>

                                                <td>
                                                    ${item.type?.label || item.type?.code || ""}
                                                </td>

                                                <td class="text-right">
                                                    ${formatAmount(item.taxableAmount)}
                                                </td>

                                                <td class="text-right">
                                                    ${item.rate ?? ""}%
                                                </td>

                                                <td class="text-right">
                                                    ${formatAmount(item.amount)}
                                                </td>

                                            </tr>

                                        `
                                    ).join("")}

                                </tbody>

                            </table>

                        </div>

                    `
                    : ""
            }


            <!-- =========================================================
                 DATI ELETTRONICI
                 ========================================================= -->

            <div class="km-supplier-invoice-electronic">

                <div>

                    <strong>
                        Dati elettronici
                    </strong>

                </div>

                ${
                    invoice.electronicData?.sdiId
                        ? `
                            <div>
                                SdI:
                                ${invoice.electronicData.sdiId}
                            </div>
                        `
                        : ""
                }

                ${
                    invoice.electronicData?.transmissionDate
                        ? `
                            <div>
                                Trasmissione:
                                ${formatDate(
                                    invoice.electronicData.transmissionDate
                                )}
                            </div>
                        `
                        : ""
                }

                ${
                    invoice.electronicData?.deliveryStatus
                        ? `
                            <div>
                                Stato:
                                ${invoice.electronicData.deliveryStatus}
                            </div>
                        `
                        : ""
                }

            </div>

        </div>

    `;

}

/*
|--------------------------------------------------------------------------
| VISUALIZZA FATTURA FORNITORE
|--------------------------------------------------------------------------
*/
function showSupplierInvoice(invoice){

    console.log(
        "=== SHOW SUPPLIER INVOICE ==="
    );


    const html =
        renderSupplierInvoice(
            invoice
        );


    console.log(
        "HTML GENERATO DAL RENDERER:",
        html
    );


    const oldPreview =
        document.getElementById(
            "km-supplier-invoice-preview"
        );


    if(oldPreview){

        oldPreview.remove();

    }


    const preview =
        document.createElement("div");


    preview.id =
        "km-supplier-invoice-preview";


    preview.style.setProperty(
        "position",
        "fixed",
        "important"
    );

    preview.style.setProperty(
        "top",
        "0",
        "important"
    );

    preview.style.setProperty(
        "left",
        "0",
        "important"
    );

    preview.style.setProperty(
        "right",
        "0",
        "important"
    );

    preview.style.setProperty(
        "bottom",
        "0",
        "important"
    );

    preview.style.setProperty(
        "width",
        "100vw",
        "important"
    );

    preview.style.setProperty(
        "height",
        "100vh",
        "important"
    );

    preview.style.setProperty(
        "z-index",
        "999999",
        "important"
    );

    preview.style.setProperty(
        "overflow",
        "auto",
        "important"
    );

    preview.style.setProperty(
        "background",
        "#eeeeee",
        "important"
    );

    preview.style.setProperty(
        "padding",
        "30px",
        "important"
    );

    preview.style.setProperty(
        "box-sizing",
        "border-box",
        "important"
    );


    preview.innerHTML =
    html;


    document.body.appendChild(
        preview
    );


    const invoicePage =
        preview.firstElementChild;


    if(invoicePage){

        invoicePage.style.setProperty(
            "width",
            "210mm",
            "important"
        );

        invoicePage.style.setProperty(
            "min-width",
            "210mm",
            "important"
        );

        invoicePage.style.setProperty(
            "max-width",
            "210mm",
            "important"
        );

        invoicePage.style.setProperty(
            "min-height",
            "297mm",
            "important"
        );

        invoicePage.style.setProperty(
            "box-sizing",
            "border-box",
            "important"
        );

        invoicePage.style.setProperty(
            "margin",
            "0 auto",
            "important"
        );

        invoicePage.style.setProperty(
            "padding",
            "16mm",
            "important"
        );

        invoicePage.style.setProperty(
            "background",
            "#ffffff",
            "important"
        );

        invoicePage.style.setProperty(
            "display",
            "block",
            "important"
        );

        invoicePage.style.setProperty(
            "box-shadow",
            "0 4px 18px rgba(0,0,0,0.15)",
            "important"
        );


        console.log(
            "ELEMENTO A4:",
            invoicePage
        );

        console.log(
            "LARGHEZZA:",
            invoicePage.getBoundingClientRect().width
        );

        console.log(
            "ALTEZZA:",
            invoicePage.getBoundingClientRect().height
        );

    }
    else{

        console.error(
            "Il renderer non ha restituito un elemento HTML."
        );

    }

}

/*
|--------------------------------------------------------------------------
| FORMATTA IMPORTI
|--------------------------------------------------------------------------
*/

function formatSupplierInvoiceAmount(
    amount){

    return Number(
        amount || 0
    )
    .toLocaleString(
        "it-IT",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}