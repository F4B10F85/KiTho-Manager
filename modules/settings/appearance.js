"use strict";

function showAppearance(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page">

            <h2 class="km-page-title">

                Aspetto

            </h2>

            <div id="km-appearance-tabs"></div>

            <div id="km-appearance-content"></div>

            <div class="km-company-footer">

                <button class="km-button">

                    Ripristina predefiniti

                </button>

                <div class="km-company-footer-right">

                    <button class="km-button">

                        Annulla

                    </button>

                    <button class="km-button km-button-primary">

                        Salva

                    </button>

                </div>

            </div>

        </div>

    `;

    createTabs({

        containerId:"km-appearance-tabs",

        tabs:[

            { id:"theme", title:"Tema" },

            { id:"colors", title:"Colori" },

            { id:"workspace", title:"Workspace" },

            { id:"custom", title:"Personalizzazione" }

        ],

        activeTab:"theme",

        onChange:showAppearanceTab

    });

}

function showAppearanceTab(tabId){

    const content = document.getElementById("km-appearance-content");

    switch(tabId){

        case "theme":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">

                            Tema gestionale

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>Chiaro</option>

                                <option>Scuro</option>

                                <option>Automatico</option>

                            </select>

                        </div>

                        <div class="km-company-label">

                            Tema icone

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>Classiche</option>

                                <option>Moderne</option>

                            </select>

                        </div>

                        <div class="km-company-label">

                            Avvio

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>Dashboard</option>

                                <option>Ultima pagina visitata</option>

                            </select>

                        </div>

                    </div>

                </div>

            `;

            break;

        case "colors":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-theme-preview">

                        <div class="km-preview-sidebar">

                            Sidebar

                        </div>

                        <div class="km-preview-main">

                            <div class="km-preview-header">

                                Header

                            </div>

                            <div class="km-preview-workspace">

                                <button class="km-preview-primary">

                                    Salva

                                </button>

                                <button class="km-preview-secondary">

                                    Annulla

                                </button>

                            </div>

                        </div>

                    </div>

                    <div class="km-company-form">

                        <div class="km-company-label">

                            Colore tasto principale

                        </div>

                        <div class="km-company-field km-color-field">

                            <span>#0B5FFF</span>

                            <input
                                type="color"
                                value="#0B5FFF">

                        </div>

                        <div class="km-company-label">

                            Colore tasto secondario

                        </div>

                        <div class="km-company-field km-color-field">

                            <span>#6C757D</span>

                            <input
                                type="color"
                                value="#6C757D">

                        </div>

                        <div class="km-company-label">

                            Sidebar

                        </div>

                        <div class="km-company-field km-color-field">

                            <span>#1F2937</span>

                            <input
                                type="color"
                                value="#1F2937">

                        </div>

                        <div class="km-company-label">

                            Header

                        </div>

                        <div class="km-company-field km-color-field">

                            <span>#FFFFFF</span>

                            <input
                                type="color"
                                value="#FFFFFF">

                        </div>

                        <div class="km-company-label">

                            Workspace

                        </div>

                        <div class="km-company-field km-color-field">

                            <span>#F4F5F7</span>

                            <input
                                type="color"
                                value="#F4F5F7">

                        </div>

                    </div>

                </div>

            `;

            break;

        case "workspace":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">

                            Mostra breadcrumb

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>Sì</option>

                                <option>No</option>

                            </select>

                        </div>

                        <div class="km-company-label">

                            Mostra icone nel menu

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>Sì</option>

                                <option>No</option>

                            </select>

                        </div>

                        <div class="km-company-label">

                            Animazioni interfaccia

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>Attive</option>

                                <option>Ridotte</option>

                                <option>Disattivate</option>

                            </select>

                        </div>

                        <div class="km-company-label">

                            Layout Dashboard

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>Compatta</option>

                                <option>Normale</option>

                                <option>Estesa</option>

                            </select>

                        </div>

                    </div>

                </div>

            `;

            break;

        case "custom":

            content.innerHTML = `

                <div class="km-company-section">

                    <div class="km-company-form">

                        <div class="km-company-label">

                            Conferma prima dell'eliminazione

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>Sì</option>

                                <option>No</option>

                            </select>

                        </div>

                        <div class="km-company-label">

                            Apri dettagli con doppio clic

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>Sì</option>

                                <option>No</option>

                            </select>

                        </div>

                        <div class="km-company-label">

                            Numero righe per pagina

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>10</option>

                                <option selected>25</option>

                                <option>50</option>

                                <option>100</option>

                            </select>

                        </div>

                        <div class="km-company-label">

                            Mostra suggerimenti

                        </div>

                        <div class="km-company-field">

                            <select>

                                <option>Sì</option>

                                <option>No</option>

                            </select>

                        </div>

                    </div>

                </div>

            `;

            break;

    }

}