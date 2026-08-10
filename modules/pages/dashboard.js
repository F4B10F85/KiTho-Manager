"use strict";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

let calendarDate = new Date();

function renderCalendar(){

    const monthElement =
        document.getElementById("km-calendar-month");

    const daysElement =
        document.getElementById("km-calendar-days");

    if(!monthElement || !daysElement){

        return;

    }

    const year =
        calendarDate.getFullYear();

    const month =
        calendarDate.getMonth();

    const monthName =
        calendarDate.toLocaleDateString(
            "it-IT",
            {
                month:"long",
                year:"numeric"
            }
        );

    monthElement.textContent =
        monthName;

    daysElement.innerHTML = "";

    const firstDay =
        new Date(
            year,
            month,
            1
        );

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();

    let startingDay =
        firstDay.getDay();

    startingDay =
        startingDay === 0
            ? 6
            : startingDay - 1;

    for(
        let i = 0;
        i < startingDay;
        i++
    ){

        const emptyDay =
            document.createElement("div");

        emptyDay.className =
            "km-calendar-day km-calendar-empty";

        daysElement.appendChild(
            emptyDay
        );

    }

    const today =
        new Date();

    for(
        let day = 1;
        day <= daysInMonth;
        day++
    ){

        const dayElement =
            document.createElement("div");

        dayElement.className =
            "km-calendar-day";

        dayElement.textContent =
            day;

        if(
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ){

            dayElement.classList.add(
                "km-calendar-today"
            );

        }

        daysElement.appendChild(
            dayElement
        );

    }

}

function changeCalendarMonth(direction){

    calendarDate.setMonth(
        calendarDate.getMonth() + direction
    );

    renderCalendar();

}




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

                    <h2>€ 17.350</h2>

                </div>

                <div class="km-kpi-card">

                    <span class="km-kpi-title">
                        Ordini Aperti
                    </span>

                    <h2>12</h2>

                </div>

                <div class="km-kpi-card">

                    <span class="km-kpi-title">
                        Produzioni Attive
                    </span>

                    <h2>8</h2>

                </div>

                <div class="km-kpi-card">

                    <span class="km-kpi-title">
                        Spedizioni Oggi
                    </span>

                    <h2>4</h2>

                </div>

            </div>


            <div class="km-dashboard-panels">

                <div class="km-dashboard-panel">

                    <h3>Attività Prioritarie</h3>

                    <ul>

                        <li>🔴 2 ordini in ritardo</li>

                        <li>🟡 12 articoli sotto scorta minima</li>

                        <li>🟢 14 spedizioni previste oggi</li>

                        <li>🔵 2 non conformità aperte</li>

                    </ul>

                </div>

                <div class="km-dashboard-panel">

                    <h3>Andamento Mensile</h3>

                    <div class="km-dashboard-chart">

                        <div class="km-chart-bars">

                            <div class="km-bar" style="height:51%;">
                                <span>Gen</span>
                            </div>

                            <div class="km-bar" style="height:88%;">
                                <span>Feb</span>
                            </div>

                            <div class="km-bar" style="height:37%;">
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

                            <div class="km-bar">
                                <span>Sett</span>
                            </div>

                            <div class="km-bar">
                                <span>Ott</span>
                            </div>

                            <div class="km-bar">
                                <span>Nov</span>
                            </div>

                            <div class="km-bar">
                                <span>Dic</span>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="km-dashboard-panel km-calendar-panel">

                    <div class="km-calendar-header">

                        <h3 id="km-calendar-month"></h3>

                        <div class="km-calendar-nav">

                            <button
                                type="button"
                                onclick="changeCalendarMonth(-1)">
                                ‹
                            </button>

                            <button
                                type="button"
                                onclick="changeCalendarMonth(1)">
                                ›
                            </button>

                        </div>

                    </div>

                    <div class="km-calendar-weekdays">

                        <span>Lun</span>
                        <span>Mar</span>
                        <span>Mer</span>
                        <span>Gio</span>
                        <span>Ven</span>
                        <span>Sab</span>
                        <span>Dom</span>

                    </div>

                    <div
                        id="km-calendar-days"
                        class="km-calendar-days">
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

    renderCalendar();

}