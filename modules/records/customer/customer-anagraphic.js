function renderCustomerAnagraphic(customer = {}){

    return `

        <div class="km-company-section">

            <div class="km-company-form">

                <div class="km-company-label">

                    Codice cliente

                </div>

                <div class="km-company-field">

                    <input
                        id="customer-code"
                        type="text"
                        value="${customer.code ?? ""}"
                        readonly>

                </div>


                <div class="km-company-label">

                    Ragione sociale

                </div>

                <div class="km-company-field">

                    <input
                        id="customer-company-name"
                        type="text"
                        value="${customer.companyName ?? customer.businessName ?? ""}">

                </div>


                <div class="km-company-label">

                    Indirizzo

                </div>

                <div class="km-company-field">

                    <input
                        id="customer-address"
                        type="text"
                        value="${customer.address ?? ""}">

                </div>


                <div class="km-company-label">

                    Comune

                </div>

                <div class="km-company-field">

                    <input
                        id="customer-city"
                        type="text"
                        value="${customer.city ?? ""}">

                </div>


                <div class="km-company-label">

                    Provincia

                </div>

                <div class="km-company-field">

                    <input
                        id="customer-province"
                        type="text"
                        value="${customer.province ?? ""}">

                </div>


                <div class="km-company-label">

                    Stato

                </div>

                <div class="km-company-field">

                    <input
                        id="customer-country"
                        type="text"
                        value="${customer.country ?? ""}">

                </div>


                <div class="km-company-label">

                    P.IVA / Codice Fiscale

                </div>

                <div class="km-company-field">

                    <input
                        id="customer-vat-number"
                        type="text"
                        value="${customer.vatNumber ?? ""}">

                </div>


                <div class="km-company-label">

                    Tipo cliente

                </div>

                <div class="km-company-field">

                    <select id="customer-type">

                        <option
                            value="company"
                            ${customer.type === "company" ? "selected" : ""}>

                            Società di Capitali

                        </option>

                        <option
                            value="private"
                            ${customer.type === "private" ? "selected" : ""}>

                            Privato

                        </option>

                    </select>

                </div>


                <div class="km-company-label">

                    Stato anagrafica

                </div>

                <div class="km-company-field">

                    <select id="customer-active">

                        <option
                            value="true"
                            ${customer.active !== false ? "selected" : ""}>

                            Attivo

                        </option>

                        <option
                            value="false"
                            ${customer.active === false ? "selected" : ""}>

                            Non attivo

                        </option>

                    </select>

                </div>

            </div>

        </div>

    `;

}

function saveCustomerChanges(customerCode){

    const codeInput =
        document.getElementById(
            "customer-code"
        );


    const companyNameInput =
        document.getElementById(
            "customer-company-name"
        );


    const addressInput =
        document.getElementById(
            "customer-address"
        );


    const cityInput =
        document.getElementById(
            "customer-city"
        );


    const provinceInput =
        document.getElementById(
            "customer-province"
        );


    const countryInput =
        document.getElementById(
            "customer-country"
        );


    const vatNumberInput =
        document.getElementById(
            "customer-vat-number"
        );


    const typeInput =
        document.getElementById(
            "customer-type"
        );


    const activeInput =
        document.getElementById(
            "customer-active"
        );


    if(!companyNameInput.value.trim()){

        alert(
            "Inserisci la ragione sociale."
        );

        return;

    }


    const customerIndex =
        customers.findIndex(

            customer =>
                customer.code === customerCode

        );


    if(customerIndex === -1){

        alert(
            "Cliente non trovato."
        );

        return;

    }


    const updatedCustomer = {

        ...customers[customerIndex],

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


    customers[customerIndex] =
        updatedCustomer;


    renderCustomersPage();

}