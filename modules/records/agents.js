"use strict";

/*
|--------------------------------------------------------------------------
| Dataset provvisorio
|--------------------------------------------------------------------------
*/

const agents = [

    {
        code: "AG001",
        name: "Mario Rossi",
        active: true
    },

    {
        code: "AG002",
        name: "Luca Bianchi",
        active: true
    },

    {
        code: "AG003",
        name: "Piero Cornetta",
        active: true
    }

];


/*
|--------------------------------------------------------------------------
| Pagina principale
|--------------------------------------------------------------------------
*/

function renderAgentsPage(){

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

        <div class="km-page km-agents-page">

            <div class="km-page-header">

                <h1>Agenti</h1>

            </div>

            <div class="km-list-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showNewAgent()">

                    + Nuovo

                </button>

                <button
                    class="km-button km-button-export km-button-excel"
                    >

                        Esporta
                    <img
                        src="assets/images/excel.png"
                        class="km-button-icon"
                        alt="Excel">
                    
                </button>

            </div>

            <div id="km-agents-table"></div>

        </div>

    `;

    createTable({

        containerId: "km-agents-table",

        filters: true,

        columns: [

            {
                key: "code",
                title: "Codice"
            },

            {
                key: "name",
                title: "Agente",

                render: function(agent){

                    if(agent.editing){

                        return `

                            <input
                                type="text"
                                class="km-input"
                                data-agent-code="${agent.code}"
                                value="${agent.name ?? ""}"
                                onkeydown="
                                    if(event.key === 'Enter'){
                                        saveEditedAgent('${agent.code}');
                                    }
                                "
                            >

                            <button
                                type="button"
                                class="km-action-button"
                                title="Salva modifica"
                                onclick="saveEditedAgent('${agent.code}')">

                                💾

                            </button>

                            <button
                                type="button"
                                class="km-action-button"
                                title="Annulla modifica"
                                onclick="cancelEditAgent('${agent.code}')">

                                ❌

                            </button>

                        `;

                    }

                    return agent.name ?? "";

                }

            },

            {
                key: "active",
                title: "Stato",
                type: "status"
            },

            {
                title: "Azioni",
                type: "actions",
                renderer: "renderAgentActions"
            }

        ],

        data: agents

    });

}


/*
|--------------------------------------------------------------------------
| Nuovo agente
|--------------------------------------------------------------------------
*/

function showNewAgent(){

    alert("Scheda nuovo agente in costruzione.");

}

function renderAgentActions(agent){

    const lockIcon =
        agent.active === false
            ? "🔓"
            : "🔒";

    const lockTitle =
        agent.active === false
            ? "Riattiva agente"
            : "Disattiva agente";

    return `

        <button
            type="button"
            class="km-action-button"
            title="Modifica agente"
            onclick="editAgent('${agent.code}')">

            ✏️

        </button>

        <button
            type="button"
            class="km-action-button"
            title="${lockTitle}"
            onclick="toggleAgentStatus('${agent.code}')">

            ${lockIcon}

        </button>

        <button
            type="button"
            class="km-action-button"
            title="Elimina agente"
            onclick="deleteAgent('${agent.code}')">

            🗑️

        </button>

    `;

}

function toggleAgentStatus(code){

    const agent =
        agents.find(
            item => item.code === code
        );

    if(!agent){

        return;

    }

    agent.active =
        agent.active === false;

    renderAgentsPage();

}

function editAgent(code){

    const agent =
        agents.find(
            item => item.code === code
        );

    if(!agent){

        return;

    }

    agent.editing = true;

    renderAgentsPage();

}
function saveEditedAgent(code){

    const agent =
        agents.find(
            item => item.code === code
        );

    if(!agent){

        return;

    }

    const input =
        document.querySelector(
            `input[data-agent-code="${code}"]`
        );

    if(!input){

        return;

    }

    const newName =
        input.value.trim();

    if(newName === ""){

        alert(
            "Inserisci il nome dell'agente."
        );

        return;

    }

    agent.name =
        newName;

    agent.editing =
        false;

    renderAgentsPage();

}

function cancelEditAgent(code){

    const agent =
        agents.find(
            item => item.code === code
        );

    if(!agent){

        return;

    }

    agent.editing =
        false;

    renderAgentsPage();

}

function deleteAgent(code){

    const agent =
        agents.find(
            item => item.code === code
        );

    if(!agent){

        return;

    }

    const confirmed =
        confirm(
            `Vuoi eliminare definitivamente l'agente "${agent.name}"?`
        );

    if(!confirmed){

        return;

    }

    const index =
        agents.findIndex(
            item => item.code === code
        );

    if(index === -1){

        return;

    }

    agents.splice(
        index,
        1
    );

    renderAgentsPage();

}