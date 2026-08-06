"use strict";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

function renderDashboard(){

    setNavigationContext("dashboard");

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

    <div class="km-dashboard">

        <img
            src="assets/images/logo_KTB.png"
            class="km-dashboard-logo"
            alt="KiTho Business">

        <div class="km-dashboard-content">

            <div class="km-dashboard-header">

                <div>

                    <h1>Buongiorno, ${getCurrentUser().name}.</h1>

                    <span id="km-dashboard-date"></span>

                </div>

            </div>


            <div class="km-dashboard-kpi">

                <div class="km-kpi-card">

                    <span class="km-kpi-title">
                        Fatturato Mese
                    </span>

                    <h2>€ 428.350</h2>

                </div>

                <div class="km-kpi-card">

                    <span class="km-kpi-title">
                        Ordini Aperti
                    </span>

                    <h2>126</h2>

                </div>

                <div class="km-kpi-card">

                    <span class="km-kpi-title">
                        Produzioni Attive
                    </span>

                    <h2>18</h2>

                </div>

                <div class="km-kpi-card">

                    <span class="km-kpi-title">
                        Spedizioni Oggi
                    </span>

                    <h2>14</h2>

                </div>

            </div>


            <div class="km-dashboard-panels">

                <div class="km-dashboard-panel">

                    <h3>Attività Prioritarie</h3>

                    <ul>

                        <li>🔴 7 ordini in ritardo</li>

                        <li>🟡 12 articoli sotto scorta minima</li>

                        <li>🟢 14 spedizioni previste oggi</li>

                        <li>🔵 2 non conformità aperte</li>

                    </ul>

                </div>

                <div class="km-dashboard-panel">

                    <h3>Andamento Mensile</h3>

                    <div class="km-dashboard-chart">

                        <div class="km-chart-bars">

                            <div class="km-bar" style="height:42%;">
                                <span>Gen</span>
                            </div>

                            <div class="km-bar" style="height:58%;">
                                <span>Feb</span>
                            </div>

                            <div class="km-bar" style="height:51%;">
                                <span>Mar</span>
                            </div>

                            <div class="km-bar" style="height:67%;">
                                <span>Apr</span>
                            </div>

                            <div class="km-bar" style="height:73%;">
                                <span>Mag</span>
                            </div>

                            <div class="km-bar" style="height:64%;">
                                <span>Giu</span>
                            </div>

                            <div class="km-bar" style="height:81%;">
                                <span>Lug</span>
                            </div>

                            <div class="km-bar km-current" style="height:92%;">
                                <span>Ago</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <div class="km-dashboard-shortcuts">

                <button
                    class="km-dashboard-shortcut"
                    onclick="navigate('customers')">

                    👤

                    <span>Clienti</span>

                </button>

                <button
                    class="km-dashboard-shortcut"
                    onclick="navigate('stock-warehouse')">

                    📦

                    <span>Magazzino</span>

                </button>

                <button
                    class="km-dashboard-shortcut"
                    onclick="navigate('orders')">

                    📄

                    <span>Ordini</span>

                </button>

                <button
                    class="km-dashboard-shortcut"
                    onclick="navigate('production')">

                    🏭

                    <span>Produzione</span>

                </button>

            </div>

        </div>

    </div>

    `;

    document.getElementById("km-dashboard-date").innerText =
    new Date().toLocaleDateString(

        "it-IT",

        {

            weekday:"long",

            day:"numeric",

            month:"long",

            year:"numeric"

        }

    );

}