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

                <nav class="km-menu" id="km-menu">

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

    buildSidebar();

}

