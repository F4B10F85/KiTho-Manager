"use strict";

/*
|--------------------------------------------------------------------------
| MODELLO INTERNO FATTURA FORNITORE
|--------------------------------------------------------------------------
|
| Modello normalizzato utilizzato dal gestionale dopo la lettura
| del file XML FatturaPA.
|
*/

const supplierInvoice = {

    /*
    |--------------------------------------------------------------------------
    | IDENTIFICAZIONE DOCUMENTO
    |--------------------------------------------------------------------------
    */

    id: "",

    documentType: {
        label: "",
        code: ""
    },

    number: "",
    date: "",
    currency: "EUR",

    causali: [],

    purchaseOrder: {
        lineReferences: [],
        documentId: "",
        itemNumber: ""
    },

    transport: {
        carrier: {
            companyName: "",
            vatNumber: ""
        },
        deliveryDateTime: ""
    },

    


    /*
    |--------------------------------------------------------------------------
    | FORNITORE
    |--------------------------------------------------------------------------
    */

    supplier: {

        id: "",
        code: "",

        companyName: "",

        vatNumber: "",
        taxCode: "",

        address: "",
        postalCode: "",
        city: "",
        province: "",
        country: "",

        recipientCode: "",
        pec: ""

    },


    /*
    |--------------------------------------------------------------------------
    | CESSIONARIO / COMMITTENTE
    |--------------------------------------------------------------------------
    |
    | Rappresenta la nostra azienda destinataria della fattura.
    |
    */

    customer: {

        companyName: "",

        vatNumber: "",
        taxCode: "",

        address: "",
        postalCode: "",
        city: "",
        province: "",
        country: "",

        recipientCode: "",
        pec: ""

    },


    /*
    |--------------------------------------------------------------------------
    | RIGHE FATTURA
    |--------------------------------------------------------------------------
    |
    | supplierCode viene mantenuto volutamente.
    |
    | Non crea né modifica automaticamente un nostro articolo.
    | In futuro potrà essere utilizzato per il matching:
    |
    | codice fornitore → codice articolo interno
    |
    */

    rows: [

        /*
        {
            lineNumber: 0,

            supplierCode: "",
            description: "",

            quantity: 0,
            unitOfMeasure: "",

            unitPrice: 0,
            discount: 0,
            surcharge: 0,

            totalPrice: 0,

            vatRate: 0,
            vatNature: {
                label: "",
                code: ""
            }
        }
        */

    ],


    /*
    |--------------------------------------------------------------------------
    | RIEPILOGO IVA
    |--------------------------------------------------------------------------
    */

    vatSummary: [

        /*
        {
            vatRate: 0,

            taxableAmount: 0,
            vatAmount: 0,

            vatNature: {
                label: "",
                code: ""
            }
        }
        */

    ],


    /*
    |--------------------------------------------------------------------------
    | TOTALI
    |--------------------------------------------------------------------------
    */

    totals: {

        taxableAmount: 0,

        vatAmount: 0,

        stampDuty: 0,

        withholding: 0,

        contributions: 0,

        totalAmount: 0

    },


    /*
    |--------------------------------------------------------------------------
    | PAGAMENTI
    |--------------------------------------------------------------------------
    |
    | Questi dati saranno utilizzabili anche per alimentare
    | il calendario della Dashboard.
    |
    */

    payments: [

        /*
        {
            conditions: "",
            method: "",

            dueDate: "",

            amount: 0,

            bank: "",
            iban: "",
            bic: ""
        }
        */

    ],


    /*
    |--------------------------------------------------------------------------
    | RITENUTE
    |--------------------------------------------------------------------------
    */

    withholdingTaxes: [

        /*
        {
            type: {
                label: "",
                code: ""
            },

            taxableAmount: 0,
            rate: 0,
            amount: 0
        }
        */

    ],


    /*
    |--------------------------------------------------------------------------
    | CONTRIBUTI PREVIDENZIALI
    |--------------------------------------------------------------------------
    */

    socialContributions: [

        /*
        {
            type: {
                label: "",
                code: ""
            },

            taxableAmount: 0,
            rate: 0,
            amount: 0
        }
        */

    ],


    /*
    |--------------------------------------------------------------------------
    | DATI ELETTRONICI / SdI
    |--------------------------------------------------------------------------
    */

    electronicData: {

        sdiId: "",

        transmissionDate: "",

        deliveryStatus: ""

    },


    /*
    |--------------------------------------------------------------------------
    | DATI DOCUMENTALI
    |--------------------------------------------------------------------------
    */

    sourceXml: {

        fileName: "",

        content: ""

    }

};

function parseSupplierInvoiceCausali(xml){

    return getXmlValues(
        xml,
        "Causale"
    );

}

function parseSupplierInvoicePurchaseOrder(xml){

    const orderNode =
        xml.getElementsByTagName(
            "DatiOrdineAcquisto"
        )[0];

    if(!orderNode){

        return {

            lineReferences: [],
            documentId: "",
            itemNumber: ""

        };

    }

    return {

        lineReferences:
            getXmlValues(
                orderNode,
                "RiferimentoNumeroLinea"
            )
            .map(
                value =>
                    parseXmlNumber(
                        value
                    )
            ),

        documentId:
            getXmlValue(
                orderNode,
                "IdDocumento"
            ),

        itemNumber:
            getXmlValue(
                orderNode,
                "NumItem"
            )

    };

}

function parseSupplierInvoiceTransport(xml){

    const transportNode =
        xml.getElementsByTagName(
            "DatiTrasporto"
        )[0];

    if(!transportNode){

        return {

            carrier: {
                companyName: "",
                vatNumber: ""
            },

            deliveryDateTime: ""

        };

    }

    const carrierNode =
        transportNode.getElementsByTagName(
            "DatiAnagraficiVettore"
        )[0];

    if(!carrierNode){

        return {

            carrier: {
                companyName: "",
                vatNumber: ""
            },

            deliveryDateTime:
                getXmlValue(
                    transportNode,
                    "DataOraConsegna"
                )

        };

    }

    const idFiscal =
        carrierNode.getElementsByTagName(
            "IdFiscaleIVA"
        )[0];

    return {

        carrier: {

            companyName:
                getXmlValue(
                    carrierNode,
                    "Denominazione"
                ),

            vatNumber:
                idFiscal
                    ? getXmlValue(
                        idFiscal,
                        "IdCodice"
                    )
                    : ""

        },

        deliveryDateTime:
            getXmlValue(
                transportNode,
                "DataOraConsegna"
            )

    };

}