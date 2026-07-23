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

                        <div class="km-header-left">

                            <div class="km-app-name">

                                KiTho Business

                            </div>

                            <div id="km-breadcrumb" class="km-breadcrumb">

                                Dashboard

                            </div>

                        </div>

                        <div class="km-header-user" id="km-header-user">

                            <div class="km-user-top">

                                <span id="km-user-name" class="km-user-name"></span>

                                <span class="km-user-arrow">▼</span>

                            </div>

                            <div id="km-user-role" class="km-user-role"></div>

                            <div class="km-user-menu" id="km-user-menu">

                                <button
                                    id="km-profile-button"
                                    class="km-user-menu-item">

                                    Profilo

                                </button>

                                <button
                                    id="km-change-password-button"
                                    class="km-user-menu-item">

                                    Cambia password

                                </button>

                                <button
                                    id="km-logout-button"
                                    class="km-user-menu-item">

                                    Logout

                                </button>

                            </div>

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

    const user = getCurrentUser();

    document.getElementById("km-user-name").textContent =
    `${user.name} ${user.surname}`;

    document.getElementById("km-user-role").textContent =
        user.roleDescription;

    const userPanel = document.getElementById("km-header-user");
    const userMenu = document.getElementById("km-user-menu");

    userPanel.addEventListener("click", function (event) {

        event.stopPropagation();

        userMenu.classList.toggle("open");

    });

    document.addEventListener("click", function () {

        userMenu.classList.remove("open");

    });

    document
    .getElementById("km-profile-button")
    .addEventListener("click", function () {

        alert("Modulo Profilo in costruzione.");

    });

document
    .getElementById("km-change-password-button")
    .addEventListener("click", function () {

        alert("Cambio password in costruzione.");

    });

document
    .getElementById("km-logout-button")
    .addEventListener("click", function () {

        logout();

    });

}

