function renderCustomerAnagraphic(customer = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Codice cliente

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.code ?? ""}"
                        readonly>

                </div>

                <div class="km-company-label">

                    Ragione sociale

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.businessName ?? ""}"
                        >

                </div>

                <div class="km-company-label">

                    Indirizzo

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.address ?? ""}">

                </div>

                <div class="km-company-label">

                    Comune

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.city ?? ""}">

                </div>

                <div class="km-company-label">

                    Provincia

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.province ?? ""}">

                </div>

                <div class="km-company-label">

                    Stato

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.country ?? ""}">

                </div>

                <div class="km-company-label">

                    P.IVA / Codice Fiscale

                </div>

                <div class="km-company-field">

                    <input
                        type="text"
                        value="${customer.vatNumber ?? ""}">

                </div>

                <div class="km-company-label">

                    Tipo cliente

                </div>

                <div class="km-company-field">

                    <select>

                        <option ${customer.type==="company"?"selected":""}>

                            Società di Capitali

                        </option>

                        <option ${customer.type==="private"?"selected":""}>

                            Privato

                        </option>

                    </select>

                </div>

                <div class="km-company-label">

                    Stato anagrafica

                </div>

                <div class="km-company-field">

                    <select>

                        <option ${customer.active!==false?"selected":""}>

                            Attivo

                        </option>

                        <option ${customer.active===false?"selected":""}>

                            Non attivo

                        </option>

                    </select>

                </div>

            </div>

        </div>

    `;

}

