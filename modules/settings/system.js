"use strict";

function showSystem() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page">

            <h2 class="km-page-title">

                Sistema

            </h2>

            <div class="km-system-section">

                <h3>Numerazione documenti</h3>

                <div class="km-company-form">

                    <div class="km-company-label">
                        Primo numero Ordini
                    </div>

                    <div class="km-company-field">
                        <input type="text">
                    </div>

                    <div class="km-company-label">
                        Primo numero DDT
                    </div>

                    <div class="km-company-field">
                        <input type="text">
                    </div>

                    <div class="km-company-label">
                        Primo numero Fatture
                    </div>

                    <div class="km-company-field">
                        <input type="text">
                    </div>

                </div>

            </div>

            <div class="km-system-section">

                <h3>Impostazioni generali</h3>

                <div class="km-company-form">

                    <div class="km-company-label">
                        Valuta
                    </div>

                    <div class="km-company-field">

                        <select>

                            <option>EUR (€)</option>
                            <option>USD ($)</option>
                            <option>GBP (£)</option>
                            <option>JPY (¥)</option>

                        </select>

                    </div>

                    <div class="km-company-label">
                        Formato data
                    </div>

                    <div class="km-company-field">

                        <select>

                            <option>GG/MM/AAAA</option>
                            <option>MM/GG/AAAA</option>
                            <option>GG/MM/AA</option>
                            <option>MM/GG/AA</option>

                        </select>

                    </div>

                    <div class="km-company-label">
                        Decimali
                    </div>

                    <div class="km-company-field">

                        <select>

                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>

                        </select>

                    </div>

                    <div class="km-company-label">
                        Separatore decimali
                    </div>

                    <div class="km-company-field">

                        <select>

                            <option>,</option>
                            <option>.</option>

                        </select>
                    </div>
    
                    <div class="km-company-label">
                        Separatore migliaia
                    </div>

                    <div class="km-company-field">

                        <select>

                            <option>,</option>
                            <option>.</option>

                        </select>
                    
                    </div>

                </div>

            </div>

            <div class="km-system-section">

                <h3>Backup</h3>

                <div class="km-system-buttons">

                    <button class="km-button">

                        Esporta Database

                    </button>

                    <button class="km-button">

                        Importa Database

                    </button>

                    <button class="km-button">

                        Backup Manuale

                    </button>

                </div>

            </div>

            <div class="km-system-section">

                <h3>Informazioni software</h3>

                <div class="km-company-form">

                    <div class="km-company-label">
                        Versione
                    </div>

                    <div class="km-company-value">
                        1.0.0
                    </div>

                    <div class="km-company-label">
                        Build
                    </div>

                    <div class="km-company-value">
                        2026.07
                    </div>

                    <div class="km-company-label">
                        Database
                    </div>

                    <div class="km-company-value">
                        Firebase
                    </div>

                    <div class="km-company-label">
                        Ultimo aggiornamento
                    </div>

                    <div class="km-company-value">
                        25/07/2026
                    </div>

                </div>

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

}