"use strict";

function showCompany() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-company-page">

            <h2 class="km-page-title">

                Azienda

            </h2>

            <div id="km-company-tabs"></div>

            <div
                id="km-company-content"
                class="km-company-content">
            </div>

            <div class="km-company-footer">

                <button class="km-button">

                    Annulla

                </button>

                <button class="km-button km-button-primary">

                    Salva

                </button>

            </div>

        </div>

        `;

    createTabs({

        containerId: "km-company-tabs",

        tabs: [

            { id:"general", title:"Generale" },

            { id:"tax", title:"Dati Fiscali" },

            { id:"bank", title:"Banca" },

            { id:"branding", title:"Branding" },

            { id:"tip-doc", title:"Tipo Documento Ft. Elettronica" },

            { id:"iva", title:"Tipo IVA Ft. Elettronica" },

            { id:"ritenuta", title:"Ritenute Previdenziali Ft. Elettronica" }

        ],

        activeTab:"general",

        onChange:showCompanyTab

    });

}

/*
|--------------------------------------------------------------------------
| TIPI DOCUMENTO FATTURAZIONE ELETTRONICA
|--------------------------------------------------------------------------
|
| label = nome visualizzato nel gestionale
| code  = codice previsto dal tracciato FatturaPA
|
*/

const electronicInvoiceDocumentTypes = [

    {
        code: "TD01",
        label: "Fattura"
    },

    {
        code: "TD02",
        label: "Acconto/Anticipo su fattura"
    },

    {
        code: "TD03",
        label: "Acconto/Anticipo su parcella"
    },

    {
        code: "TD04",
        label: "Nota di Credito"
    },

    {
        code: "TD05",
        label: "Nota di Debito"
    },

    {
        code: "TD06",
        label: "Parcella"
    },

    {
        code: "TD16",
        label: "Integrazione fattura reverse charge interno"
    },

    {
        code: "TD17",
        label: "Integrazione/autofattura per acquisto servizi dall’estero"
    },

    {
        code: "TD18",
        label: "Integrazione per acquisto di beni intracomunitari"
    },

    {
        code: "TD19",
        label: "Integrazione/autofattura per acquisto di beni ex art.17 c.2 DPR 633/72"
    },

    {
        code: "TD20",
        label: "Autofattura per regolarizzazione e integrazione delle fatture"
    },

    {
        code: "TD21",
        label: "Autofattura per splafonamento"
    },

    {
        code: "TD22",
        label: "Estrazione beni da Deposito IVA"
    },

    {
        code: "TD23",
        label: "Estrazione beni da Deposito IVA con versamento dell’IVA"
    },

    {
        code: "TD24",
        label: "Fattura differita di cui all’art.21, comma 4, terzo periodo lett. a) DPR 633/72"
    },

    {
        code: "TD25",
        label: "Fattura differita di cui all’art.21, comma 4, terzo periodo lett. b) DPR 633/72"
    },

    {
        code: "TD26",
        label: "Cessione di beni ammortizzabili e per passaggi interni"
    },

    {
        code: "TD27",
        label: "Fattura per autoconsumo o per cessioni gratuite senza rivalsa"
    },

    {
        code: "TD28",
        label: "Acquisti da San Marino con IVA (fattura cartacea)"
    },

    {
        code: "TD29",
        label: "Comunicazione per omessa o irregolare fatturazione"
    }

];

/*
|--------------------------------------------------------------------------
| OTTIENE IL CODICE XML DAL TIPO DOCUMENTO
|--------------------------------------------------------------------------
*/

function getElectronicInvoiceDocumentCode(
    label
){

    const documentType =
        electronicInvoiceDocumentTypes.find(
            item =>
                item.label === label
        );

    if(!documentType){

        return null;

    }

    return documentType.code;

}


/*
|--------------------------------------------------------------------------
| OTTIENE IL TIPO DOCUMENTO DAL CODICE XML
|--------------------------------------------------------------------------
*/

function getElectronicInvoiceDocumentLabel(
    code
){

    const documentType =
        electronicInvoiceDocumentTypes.find(
            item =>
                item.code === code
        );

    if(!documentType){

        return null;

    }

    return documentType.label;

}


/*
|--------------------------------------------------------------------------
| TIPI IVA FATTURAZIONE ELETTRONICA
|--------------------------------------------------------------------------
|
| label = nome visualizzato nel gestionale
| code  = codice previsto dal tracciato FatturaPA
|
*/


const electronicInvoiceVatNatureTypes = [

    {
        code: "N1",
        label: "Escluse ex art.15 del DPR 633/72"
    },

    {
        code: "N2.1",
        label: "Non soggette ad IVA ai sensi degli artt. da 7 a 7-septies del DPR 633/72"
    },

    {
        code: "N2.2",
        label: "Non soggette - altri casi"
    },

    {
        code: "N3.1",
        label: "Non imponibili - esportazioni"
    },

    {
        code: "N3.2",
        label: "Non imponibili - cessioni intracomunitarie"
    },

    {
        code: "N3.3",
        label: "Non imponibili - cessioni verso San Marino"
    },

    {
        code: "N3.4",
        label: "Non imponibili - operazioni assimilate alle cessioni all'esportazione"
    },

    {
        code: "N3.5",
        label: "Non imponibili - a seguito di dichiarazioni d'intento"
    },

    {
        code: "N3.6",
        label: "Non imponibili - altre operazioni che non concorrono alla formazione del plafond"
    },

    {
        code: "N4",
        label: "Esenti"
    },

    {
        code: "N5",
        label: "Regime del margine / IVA non esposta in fattura"
    },

    {
        code: "N6.1",
        label: "Inversione contabile - cessione di rottami e altri materiali di recupero"
    },

    {
        code: "N6.2",
        label: "Inversione contabile - cessione di oro e argento ai sensi della legge 7/2000 nonché di oreficeria usata ad OPO"
    },

    {
        code: "N6.3",
        label: "Inversione contabile - subappalto nel settore edile"
    },

    {
        code: "N6.4",
        label: "Inversione contabile - cessione di fabbricati"
    },

    {
        code: "N6.5",
        label: "Inversione contabile - cessione di telefoni cellulari"
    },

    {
        code: "N6.6",
        label: "Inversione contabile - cessione di prodotti elettronici"
    },

    {
        code: "N6.7",
        label: "Inversione contabile - prestazioni comparto edile e settori connessi"
    },

    {
        code: "N6.8",
        label: "Inversione contabile - operazioni settore energetico"
    },

    {
        code: "N6.9",
        label: "Inversione contabile - altri casi"
    },

    {
        code: "N7",
        label: "IVA assolta in altro stato UE (servizi di telecomunicazioni, tele-radiodiffusione ed elettronici)"
    }

];

/*
|--------------------------------------------------------------------------
| OTTIENE IL CODICE XML DAL TIPO DOCUMENTO
|--------------------------------------------------------------------------
*/



function getElectronicInvoiceVatNatureCode(label){

    const vatNature =
        electronicInvoiceVatNatureTypes.find(
            item =>
                item.label === label
        );

    if(!vatNature){

        return null;

    }

    return vatNature.code;

}

/*
|--------------------------------------------------------------------------
| OTTIENE IL TIPO DOCUMENTO DAL CODICE XML
|--------------------------------------------------------------------------
*/

function getElectronicInvoiceVatNatureLabel(code){

    const vatNature =
        electronicInvoiceVatNatureTypes.find(
            item =>
                item.code === code
        );

    if(!vatNature){

        return null;

    }

    return vatNature.label;

}

/*
|--------------------------------------------------------------------------
| TIPI RITENUTE PREVIDENZIALI FATTURAZIONE ELETTRONICA
|--------------------------------------------------------------------------
|
| label = nome visualizzato nel gestionale
| code  = codice previsto dal tracciato FatturaPA
|
*/

const electronicInvoiceWithholdingTypes = [

    {
        code: "RT01",
        label: "Ritenuta persone fisiche"
    },

    {
        code: "RT02",
        label: "Ritenuta persone giuridiche"
    },

    {
        code: "RT03",
        label: "Contributo Inps"
    },

    {
        code: "RT04",
        label: "Contributo Enasarco"
    },

    {
        code: "RT05",
        label: "Contributo Enpam"
    },

    {
        code: "RT06",
        label: "Altro contributo previdenziale"
    }

];

/*
|--------------------------------------------------------------------------
| OTTIENE IL CODICE XML DALLA TIPOLOGIA RITENUTA/CONTRIBUTO
|--------------------------------------------------------------------------
*/

function getElectronicInvoiceWithholdingCode(
    label
){

    const withholdingType =
        electronicInvoiceWithholdingTypes.find(
            item =>
                item.label === label
        );

    if(!withholdingType){

        return null;

    }

    return withholdingType.code;

}


function showCompanyTab(tabId){

    const content = document.getElementById("km-company-content");

    switch(tabId){

        case "general":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">
                            Ragione Sociale
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Indirizzo
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Località
                        </div>
                        <div class="km-company-field km-company-inline">

                            <input type="text">

                            <span>Prov.</span>

                            <input type="text">

                        </div>

                        <div class="km-company-label">
                            CAP
                        </div>
                        <div class="km-company-field km-company-inline-large">

                            <input type="text">

                            <span>Stato</span>

                            <input type="text">

                        </div>

                        <div class="km-company-label">
                            Cellulare
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            E-mail
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            PEC
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Sito Web
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Pagina Instagram
                        </div>
                        <div class="km-company-field">
                            <input type="text">
                        </div>

                    </div>

                </div>

            `;

            break;

        case "tax":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">
                            P. IVA
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Codice Fiscale
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Regime Fiscale
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            Numero REA
                        </div>

                        <div class="km-company-field">
                            <input type="text">
                        </div>

                        <div class="km-company-label">
                            IVA - Prezzo di vendita
                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>IVA Esclusa</option>

                                <option>IVA Compresa</option>

                            </select>

                        </div>

                        <div class="km-company-label">
                            IVA - Prezzo di acquisto
                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>IVA Esclusa</option>

                                <option>IVA Compresa</option>

                            </select>

                        </div>

                    </div>

                </div>

            `;

            break;

        case "bank":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">
                            Banca 1
                        </div>

                        <div class="km-company-field">
                            <input
                                type="text"
                                value="${company.banks[0].bank}"
                                oninput="company.banks[0].bank=this.value">
                        </div>

                        <div class="km-company-label">
                            IBAN 1
                        </div>

                        <div class="km-company-field">
                            <input 
                                type="text"
                                value="${company.banks[0].iban}"
                                oninput="company.banks[0].iban=this.value">
                        </div>

                        <div class="km-company-label">
                            BIC / SWIFT 1
                        </div>

                        <div class="km-company-field">
                            <input 
                                type="text"
                                value="${company.banks[0].bic}"
                                oninput="company.banks[0].bic=this.value">
                        </div>

                        <div class="km-company-label">
                            Intestatario conto 1
                        </div>

                        <div class="km-company-field">
                            <input 
                                type="text"
                                value="${company.banks[0].accountHolder}"
                                oninput="company.banks[0].accountHolder=this.value">
                        </div>

                        <div class="km-company-spacer"></div>

                        <div class="km-company-label">
                            Banca 2
                        </div>

                        <div class="km-company-field">
                            <input 
                                type="text"
                                value="${company.banks[1].bank}"
                                oninput="company.banks[1].bank=this.value">
                        </div>

                        <div class="km-company-label">
                            IBAN 2
                        </div>

                        <div class="km-company-field">
                            <input 
                                type="text"
                                value="${company.banks[1].iban}"
                                oninput="company.banks[1].iban=this.value">
                        </div>

                        <div class="km-company-label">
                            BIC / SWIFT 2
                        </div>

                        <div class="km-company-field">
                            <input 
                                type="text"
                                value="${company.banks[1].bic}"
                                oninput="company.banks[1].bic=this.value">
                        </div>

                        <div class="km-company-label">
                            Intestatario conto 2
                        </div>

                        <div class="km-company-field">
                            <input 
                                type="text"
                                value="${company.banks[1].accountHolder}"
                                oninput="company.banks[1].accountHolder=this.value">
                        </div>

                    </div>

                </div>

            `;

            break;

        case "branding":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">

                            Logo aziendale

                        </div>

                        <div class="km-company-field">

                            <div class="km-branding-row">

                                <button
                                    class="km-button"
                                    id="km-upload-logo">

                                    Carica

                                </button>

                                <input
                                    type="file"
                                    id="km-logo-input"
                                    accept="image/*"
                                    hidden>

                                <div
                                    class="km-logo-preview"
                                    id="km-logo-preview">

                                    Nessun logo caricato

                                </div>

                            </div>

                        </div>

                        <div class="km-company-label">

                            Logo filigrana

                        </div>

                        <div class="km-company-field">

                            <div class="km-branding-row">

                                <button
                                    class="km-button"
                                    id="km-upload-watermark">

                                    Carica

                                </button>

                                <input
                                    type="file"
                                    id="km-watermark-input"
                                    accept="image/*"
                                    hidden>

                                <div
                                    class="km-logo-preview"
                                    id="km-watermark-preview">

                                    Nessun logo caricato

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            `;

            initBrandingPreview();

            break;

        case "tip-doc":

            content.innerHTML = `

                <div class="km-company-section km-company-tip-doc-section">

                    <div class="km-company-form km-company-tip-doc-form">

                        <div class="km-company-field km-company-tip-doc-field">


                            <table class="km-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Tipo documento
                                        </th>

                                        <th>
                                            Codice
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>
                                        <td>Fattura</td>
                                        <td>TD01</td>
                                    </tr>

                                    <tr>
                                        <td>Acconto/Anticipo su fattura</td>
                                        <td>TD02</td>
                                    </tr>

                                    <tr>
                                        <td>Acconto/Anticipo su parcella</td>
                                        <td>TD03</td>
                                    </tr>

                                    <tr>
                                        <td>Nota di Credito</td>
                                        <td>TD04</td>
                                    </tr>

                                    <tr>
                                        <td>Nota di Debito</td>
                                        <td>TD05</td>
                                    </tr>

                                    <tr>
                                        <td>Parcella</td>
                                        <td>TD06</td>
                                    </tr>

                                    <tr>
                                        <td>Integrazione fattura reverse charge interno</td>
                                        <td>TD16</td>
                                    </tr>

                                    <tr>
                                        <td>Integrazione/autofattura per acquisto servizi dall’estero</td>
                                        <td>TD17</td>
                                    </tr>

                                    <tr>
                                        <td>Integrazione per acquisto di beni intracomunitari</td>
                                        <td>TD18</td>
                                    </tr>

                                    <tr>
                                        <td>Integrazione/autofattura per acquisto di beni ex art.17 c.2 DPR 633/72</td>
                                        <td>TD19</td>
                                    </tr>

                                    <tr>
                                        <td>Autofattura per regolarizzazione e integrazione delle fatture</td>
                                        <td>TD20</td>
                                    </tr>

                                    <tr>
                                        <td>Autofattura per splafonamento</td>
                                        <td>TD21</td>
                                    </tr>

                                    <tr>
                                        <td>Estrazione beni da Deposito IVA</td>
                                        <td>TD22</td>
                                    </tr>

                                    <tr>
                                        <td>Estrazione beni da Deposito IVA con versamento dell’IVA</td>
                                        <td>TD23</td>
                                    </tr>

                                    <tr>
                                        <td>Fattura differita di cui all’art.21, comma 4, terzo periodo lett. a) DPR 633/72</td>
                                        <td>TD24</td>
                                    </tr>

                                    <tr>
                                        <td>Fattura differita di cui all’art.21, comma 4, terzo periodo lett. b) DPR 633/72</td>
                                        <td>TD25</td>
                                    </tr>

                                    <tr>
                                        <td>Cessione di beni ammortizzabili e per passaggi interni</td>
                                        <td>TD26</td>
                                    </tr>

                                    <tr>
                                        <td>Fattura per autoconsumo o per cessioni gratuite senza rivalsa</td>
                                        <td>TD27</td>
                                    </tr>

                                    <tr>
                                        <td>Acquisti da San Marino con IVA (fattura cartacea)</td>
                                        <td>TD28</td>
                                    </tr>

                                    <tr>
                                        <td>Comunicazione per omessa o irregolare fatturazione</td>
                                        <td>TD29</td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            `;

            break;

        case "iva":

            content.innerHTML = `

                <div class="km-company-section km-company-iva-section">

                    <div class="km-company-form km-company-iva-form">

                        <div class="km-company-field km-company-iva-field">

                            <table class="km-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Natura IVA
                                        </th>

                                        <th>
                                            Codice
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>
                                        <td>Escluse ex art.15 del DPR 633/72</td>
                                        <td>N1</td>
                                    </tr>

                                    <tr>
                                        <td>Non soggette ad IVA ai sensi degli artt. da 7 a 7-septies del DPR 633/72</td>
                                        <td>N2.1</td>
                                    </tr>

                                    <tr>
                                        <td>Non soggette - altri casi</td>
                                        <td>N2.2</td>
                                    </tr>

                                    <tr>
                                        <td>Non imponibili - esportazioni</td>
                                        <td>N3.1</td>
                                    </tr>

                                    <tr>
                                        <td>Non imponibili - cessioni intracomunitarie</td>
                                        <td>N3.2</td>
                                    </tr>

                                    <tr>
                                        <td>Non imponibili - cessioni verso San Marino</td>
                                        <td>N3.3</td>
                                    </tr>

                                    <tr>
                                        <td>Non imponibili - operazioni assimilate alle cessioni all'esportazione</td>
                                        <td>N3.4</td>
                                    </tr>

                                    <tr>
                                        <td>Non imponibili - a seguito di dichiarazioni d'intento</td>
                                        <td>N3.5</td>
                                    </tr>

                                    <tr>
                                        <td>Non imponibili - altre operazioni che non concorrono alla formazione del plafond</td>
                                        <td>N3.6</td>
                                    </tr>

                                    <tr>
                                        <td>Esenti</td>
                                        <td>N4</td>
                                    </tr>

                                    <tr>
                                        <td>Regime del margine / IVA non esposta in fattura</td>
                                        <td>N5</td>
                                    </tr>

                                    <tr>
                                        <td>Inversione contabile - cessione di rottami e altri materiali di recupero</td>
                                        <td>N6.1</td>
                                    </tr>

                                    <tr>
                                        <td>Inversione contabile - cessione di oro e argento ai sensi della legge 7/2000 nonché di oreficeria usata ad OPO</td>
                                        <td>N6.2</td>
                                    </tr>

                                    <tr>
                                        <td>Inversione contabile - subappalto nel settore edile</td>
                                        <td>N6.3</td>
                                    </tr>

                                    <tr>
                                        <td>Inversione contabile - cessione di fabbricati</td>
                                        <td>N6.4</td>
                                    </tr>

                                    <tr>
                                        <td>Inversione contabile - cessione di telefoni cellulari</td>
                                        <td>N6.5</td>
                                    </tr>

                                    <tr>
                                        <td>Inversione contabile - cessione di prodotti elettronici</td>
                                        <td>N6.6</td>
                                    </tr>

                                    <tr>
                                        <td>Inversione contabile - prestazioni comparto edile e settori connessi</td>
                                        <td>N6.7</td>
                                    </tr>

                                    <tr>
                                        <td>Inversione contabile - operazioni settore energetico</td>
                                        <td>N6.8</td>
                                    </tr>

                                    <tr>
                                        <td>Inversione contabile - altri casi</td>
                                        <td>N6.9</td>
                                    </tr>

                                    <tr>
                                        <td>IVA assolta in altro stato UE (servizi di telecomunicazioni, tele-radiodiffusione ed elettronici)</td>
                                        <td>N7</td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            `;

            break;

        case "ritenuta":

            content.innerHTML = `

                <div class="km-company-section km-company-ritenuta-section">

                    <div class="km-company-form km-company-ritenuta-form">

                        <div class="km-company-field km-company-ritenuta-field">

                            <table class="km-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Tipo ritenuta/contributo
                                        </th>

                                        <th>
                                            Codice XML
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>
                                        <td>Ritenuta persone fisiche</td>
                                        <td>RT01</td>
                                    </tr>

                                    <tr>
                                        <td>Ritenuta persone giuridiche</td>
                                        <td>RT02</td>
                                    </tr>

                                    <tr>
                                        <td>Contributo Inps</td>
                                        <td>RT03</td>
                                    </tr>

                                    <tr>
                                        <td>Contributo Enasarco</td>
                                        <td>RT04</td>
                                    </tr>

                                    <tr>
                                        <td>Contributo Enpam</td>
                                        <td>RT05</td>
                                    </tr>

                                    <tr>
                                        <td>Altro contributo previdenziale</td>
                                        <td>RT06</td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            `;

            break;

    }

}

function initBrandingPreview(){

    setupPreview(

        "km-upload-logo",

        "km-logo-input",

        "km-logo-preview"

    );

    setupPreview(

        "km-upload-watermark",

        "km-watermark-input",

        "km-watermark-preview"

    );

}

function setupPreview(buttonId,inputId,previewId){

    const button=document.getElementById(buttonId);

    const input=document.getElementById(inputId);

    const preview=document.getElementById(previewId);

    button.onclick=()=>input.click();

    input.onchange=()=>{

        const file=input.files[0];

        if(!file){

            return;

        }

        const reader=new FileReader();

        reader.onload=e=>{

            preview.innerHTML=`

                <img src="${e.target.result}">

            `;

        };

        reader.readAsDataURL(file);

    };

}