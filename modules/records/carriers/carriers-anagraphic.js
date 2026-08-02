function renderCarrierAnagraphic(carrier = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Codice cliente

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${carrier.code ?? ""}"
                        readonly>

                </div>

                <div class="km-company-label">

                    Ragione sociale

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${carrier.businessName ?? ""}"
                        >

                </div>

                <div class="km-company-label">

                    Indirizzo

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${carrier.address ?? ""}">

                </div>

                <div class="km-company-label">

                    Comune

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${carrier.city ?? ""}">

                </div>

                <div class="km-company-label">

                    Provincia

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${carrier.province ?? ""}">

                </div>

                <div class="km-company-label">

                    Stato

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${carrier.country ?? ""}">

                </div>

                <div class="km-company-label">

                    P.IVA / Codice Fiscale

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${carrier.vatNumber ?? ""}">

                </div>

                <div class="km-company-label">

                    Tipo cliente

                </div>

                <div class="km-company-field">

                    <select>

                        <option ${carrier.type==="company"?"selected":""}>

                            Società di Capitali

                        </option>

                        <option ${carrier.type==="private"?"selected":""}>

                            Privato

                        </option>

                    </select>

                </div>

                <div class="km-company-label">

                    Stato anagrafica

                </div>

                <div class="km-company-field">

                    <select>

                        <option ${carrier.active!==false?"selected":""}>

                            Attivo

                        </option>

                        <option ${carrier.active===false?"selected":""}>

                            Non attivo

                        </option>

                    </select>

                </div>

            </div>

        </div>

    `;

}

