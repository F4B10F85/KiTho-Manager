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

                    <button>🏠 Dashboard</button>

                    <button>📝 Nuovo Ordine</button>

                    <button>👥 Clienti</button>

                    <button>📦 Ordini</button>

                    <button>🏭 Produzione</button>

                    <button>🚚 DDT</button>

                    <button>🧾 Fatture</button>

                    <button>📦 Magazzino</button>

                    <button>📊 Statistiche</button>

                    <button>⚙ Impostazioni</button>

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