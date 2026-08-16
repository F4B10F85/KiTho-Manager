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

    const codeInput =
        document.getElementById(
            "supplier-code"
        );

    const companyNameInput =
        document.getElementById(
            "supplier-company-name"
        );

    const addressInput =
        document.getElementById(
            "supplier-address"
        );

    const cityInput =
        document.getElementById(
            "supplier-city"
        );

    const provinceInput =
        document.getElementById(
            "supplier-province"
        );

    const countryInput =
        document.getElementById(
            "supplier-country"
        );

    const vatNumberInput =
        document.getElementById(
            "supplier-vat-number"
        );

    const typeInput =
        document.getElementById(
            "supplier-type"
        );

    const activeInput =
        document.getElementById(
            "supplier-active"
        );


    if(!companyNameInput.value.trim()){

        alert(
            "Inserisci la ragione sociale."
        );

        return;

    }


    const newSupplier = {

        code:
            codeInput.value,

        companyName:
            companyNameInput.value.trim(),

        address:
            addressInput.value.trim(),

        city:
            cityInput.value.trim(),

        province:
            provinceInput.value.trim(),

        country:
            countryInput.value.trim(),

        vatNumber:
            vatNumberInput.value.trim(),

        type:
            typeInput.value,

        active:
            activeInput.value === "true"

    };


    suppliers.push(
        newSupplier
    );


    renderSuppliersPage();

}