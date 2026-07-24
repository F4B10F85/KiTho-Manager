"use strict";

/*
|--------------------------------------------------------------------------
| Tabs Component
|--------------------------------------------------------------------------
| Componente riutilizzabile per la gestione delle TAB.
|--------------------------------------------------------------------------
*/


function createTabs(config) {

    const container = document.getElementById(config.containerId);

    container.innerHTML = "";

    const tabs = document.createElement("div");

    tabs.className = "km-tabs";

    config.tabs.forEach(tab => {

        const button = document.createElement("button");

        button.className = "km-tab";

        button.textContent = tab.title;

        if (tab.id === config.activeTab) {

            button.classList.add("active");

        }

        button.addEventListener("click", () => {

            tabs
                .querySelectorAll(".km-tab")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            config.onChange(tab.id);

        });

        tabs.appendChild(button);

    });

    container.appendChild(tabs);

    config.onChange(config.activeTab);

}