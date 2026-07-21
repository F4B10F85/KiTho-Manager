"use strict";

/*
|--------------------------------------------------------------------------
| Layout Engine
|--------------------------------------------------------------------------
| Costruisce il layout principale di KiTho Business.
|--------------------------------------------------------------------------
*/

/**
 * Costruisce il layout dell'applicazione.
 */
function buildLayout() {

    const app = document.getElementById("app");

    app.innerHTML = `

        <div class="km-layout">

            <aside class="km-sidebar">

                <div class="km-logo">
                    KiTho Business
                </div>

                <nav class="km-menu">

                    <button
                        class="km-menu-button"
                        data-page="dashboard"
                        onclick="navigate('dashboard')">

                        🏠 Dashboard

                    </button>
                   
                    <button
                        class="km-menu-button"
                        data-page="new-order"
                        onclick="navigate('new-order')">

                        📝 Nuovo ordine

                    </button>

                    <button
                        class="km-menu-button"
                        data-page="customers"
                        onclick="navigate('customers')">

                        👥 Clienti

                    </button>

                    <button
                        class="km-menu-button"
                        data-page="orders"
                        onclick="navigate('orders')">

                        🏠 Ordini

                    </button>

                    <button
                        class="km-menu-button"
                        data-page="production"
                        onclick="navigate('production')">

                        🏭 Produzione

                    </button>

                    <button
                        class="km-menu-button"
                        data-page="ddt"
                        onclick="navigate('ddt')">

                        🚚 DDT

                    </button>

                    <button
                        class="km-menu-button"
                        data-page="invoices"
                        onclick="navigate('invoices')">

                        🧾 Fatture

                    </button>

                    <button
                        class="km-menu-button"
                        data-page="warehouse"
                        onclick="navigate('warehouse')">

                        📦 Magazzino

                    </button>

                    <button
                        class="km-menu-button"
                        data-page="statistics"
                        onclick="navigate('statistics')">

                        📊 Statistiche

                    </button>

                    <button
                        class="km-menu-button"
                        data-page="settings"
                        onclick="navigate('settings')">

                        ⚙ Impostazioni

                    </button>

                </nav>

            </aside>

            <div class="km-content">

                <header class="km-header">

                    <div class="km-header-content">

                        <div class="km-app-name">

                            KiTho Business

                        </div>

                        <div id="km-breadcrumb" class="km-breadcrumb">

                            Dashboard

                        </div>

                    </div>

                </header>

                <main class="km-workspace">

                    Workspace

                </main>

            </div>

        </div>

    `;

}