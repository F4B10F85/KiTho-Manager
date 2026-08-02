function renderSupplierAnagraphic(supplier = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Codice cliente

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${supplier.code ?? ""}"
                        readonly>

                </div>

                <div class="km-company-label">

                    Ragione sociale

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${supplier.businessName ?? ""}"
                        >

                </div>

                <div class="km-company-label">

                    Indirizzo

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${supplier.address ?? ""}">

                </div>

                <div class="km-company-label">

                    Comune

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${supplier.city ?? ""}">

                </div>

                <div class="km-company-label">

                    Provincia

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${supplier.province ?? ""}">

                </div>

                <div class="km-company-label">

                    Stato

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${supplier.country ?? ""}">

                </div>

                <div class="km-company-label">

                    P.IVA / Codice Fiscale

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${supplier.vatNumber ?? ""}">

                </div>

                <div class="km-company-label">

                    Tipo cliente

                </div>

                <div class="km-company-field">

                    <select>

                        <option ${supplier.type==="company"?"selected":""}>

                            Società di Capitali

                        </option>

                        <option ${supplier.type==="private"?"selected":""}>

                            Privato

                        </option>

                    </select>

                </div>

                <div class="km-company-label">

                    Stato anagrafica

                </div>

                <div class="km-company-field">

                    <select>

                        <option ${supplier.active!==false?"selected":""}>

                            Attivo

                        </option>

                        <option ${supplier.active===false?"selected":""}>

                            Non attivo

                        </option>

                    </select>

                </div>

            </div>

        </div>

    `;

}

