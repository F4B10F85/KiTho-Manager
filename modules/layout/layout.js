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

                    <button onclick="navigate('dashboard')">🏠 Dashboard</button>
                   
                    <button onclick="navigate('new-order')">📝 Nuovo Ordine</button>

                    <button onclick="navigate('customers')">👥 Clienti</button>

                    <button onclick="navigate('orders')">📦 Ordini</button>

                    <button onclick="navigate('production')">🏭 Produzione</button>

                    <button onclick="navigate('ddt')">🚚 DDT</button>

                    <button onclick="navigate('invoices')">🧾 Fatture</button>

                    <button onclick="navigate('warehouse')">📦 Magazzino</button>

                    <button onclick="navigate('statistics')">📊 Statistiche</button>

                    <button onclick="navigate('settings')">⚙ Impostazioni</button>

                </nav>

            </aside>

            <div class="km-content">

                <header class="km-header">

                    KiTho Business

                </header>

                <main class="km-workspace">

                    Workspace

                </main>

            </div>

        </div>

    `;

}