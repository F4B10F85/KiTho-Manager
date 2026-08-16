function renderSupplierAnagraphic(supplier = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Codice fornitore

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-code"
                        type="text"
                        value="${supplier.code ?? ""}"
                        readonly>

                </div>

                <div class="km-company-label">

                    Ragione sociale

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-company-name"
                        type="text"
                        value="${supplier.companyName ?? ""}">

                </div>

                <div class="km-company-label">

                    Indirizzo

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-address"
                        type="text"
                        value="${supplier.address ?? ""}">

                </div>

                <div class="km-company-label">

                    Comune

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-city"
                        type="text"
                        value="${supplier.city ?? ""}">

                </div>

                <div class="km-company-label">

                    Provincia

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-province"
                        type="text"
                        value="${supplier.province ?? ""}">

                </div>

                <div class="km-company-label">

                    Stato

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-country"
                        type="text"
                        value="${supplier.country ?? ""}">

                </div>

                <div class="km-company-label">

                    P.IVA / Codice Fiscale

                </div>

                <div class="km-company-field">

                    <input
                        id="supplier-vat-number"
                        type="text"
                        value="${supplier.vatNumber ?? ""}">

                </div>

                <div class="km-company-label">

                    Tipo cliente

                </div>

                <div class="km-company-field">

                    <select id="supplier-type">

                        <option value="company" ${supplier.type === "company" ? "selected" : ""}>
                            Società di Capitali
                        </option>

                        <option value="private" ${supplier.type === "private" ? "selected" : ""}>
                            Privato
                        </option>

                    </select>

                </div>

                <div class="km-company-label">

                    Stato anagrafica

                </div>

                <div class="km-company-field">

                    <select id="supplier-active">

                        <option value="true" ${supplier.active !== false ? "selected" : ""}>
                            Attivo
                        </option>

                        <option value="false" ${supplier.active === false ? "selected" : ""}>
                            Non attivo
                        </option>

                    </select>

                </div>

            </div>

        </div>

    `;

}

function saveNewSupplier(){

    /*
    |--------------------------------------------------------------------------
    | Sincronizza l'ultima TAB visualizzata
    |--------------------------------------------------------------------------
    */

    const activeTab =
        document.querySelector(
            ".km-tab.active[data-tab]"
        );


    if(activeTab){

        const currentTabId =
            activeTab.dataset.tab;


        saveCurrentSupplierTab(
            currentTabId
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Verifica che esista il fornitore corrente
    |--------------------------------------------------------------------------
    */

    if(!currentSupplier){

        return;

    }


    /*
    |--------------------------------------------------------------------------
    | Validazione dati obbligatori
    |--------------------------------------------------------------------------
    */

    if(
        !currentSupplier.companyName ||
        !currentSupplier.companyName.trim()
    ){

        alert(
            "Inserisci la ragione sociale."
        );

        return;

    }


    /*
    |--------------------------------------------------------------------------
    | Salvataggio
    |--------------------------------------------------------------------------
    */

    suppliers.push(
        currentSupplier
    );


    /*
    |--------------------------------------------------------------------------
    | Torna alla tabella Fornitori
    |--------------------------------------------------------------------------
    */

    renderSuppliersPage();

}