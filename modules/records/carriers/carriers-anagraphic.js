function renderCarrierAnagraphic(carrier = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Codice trasportatore

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-code"
                        type="text"
                        value="${carrier.code ?? ""}"
                        readonly>

                </div>


                <div class="km-company-label">

                    Ragione sociale

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-business-name"
                        type="text"
                        value="${carrier.businessName ?? ""}">

                </div>


                <div class="km-company-label">

                    Indirizzo

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-address"
                        type="text"
                        value="${carrier.address ?? ""}">

                </div>


                <div class="km-company-label">

                    Comune

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-city"
                        type="text"
                        value="${carrier.city ?? ""}">

                </div>


                <div class="km-company-label">

                    Provincia

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-province"
                        type="text"
                        value="${carrier.province ?? ""}">

                </div>


                <div class="km-company-label">

                    Stato

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-country"
                        type="text"
                        value="${carrier.country ?? ""}">

                </div>


                <div class="km-company-label">

                    P.IVA / Codice Fiscale

                </div>

                <div class="km-company-field">

                    <input
                        id="carrier-vat-number"
                        type="text"
                        value="${carrier.vatNumber ?? ""}">

                </div>


                <div class="km-company-label">

                    Tipo trasportatore

                </div>

                <div class="km-company-field">

                    <select id="carrier-type">

                        <option
                            value="company"
                            ${carrier.type === "company" ? "selected" : ""}>

                            Società di Capitali

                        </option>

                        <option
                            value="private"
                            ${carrier.type === "private" ? "selected" : ""}>

                            Privato

                        </option>

                    </select>

                </div>


                <div class="km-company-label">

                    Stato anagrafica

                </div>

                <div class="km-company-field">

                    <select id="carrier-active">

                        <option
                            value="true"
                            ${carrier.active !== false ? "selected" : ""}>

                            Attivo

                        </option>

                        <option
                            value="false"
                            ${carrier.active === false ? "selected" : ""}>

                            Non attivo

                        </option>

                    </select>

                </div>

            </div>

        </div>

    `;

}

