"use strict";

/*
|--------------------------------------------------------------------------
| Dataset provvisorio
|--------------------------------------------------------------------------
*/

const agents = [

    {
        code: "AG001",
        name: "Mario Rossi"
    },

    {
        code: "AG002",
        name: "Luca Bianchi"
    },

    {
        code: "AG003",
        name: "Piero Cornetta"
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
                    class="km-button km-button-export"
                    onclick="exportStockWarehouse()">

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
                title: "",
                type: "details",
                onClick:"showAgentDetails"
            },

            {
                key: "code",
                title: "Codice"
            },

            {
                key: "name",
                title: "Agente"
            },

            {
                title: "Azioni",
                type: "actions"
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


/*
|--------------------------------------------------------------------------
| Scheda agente
|--------------------------------------------------------------------------
*/

function showAgentDetails(agentCode){

    const agent = agents.find(
        agent => agent.code === agentCode
    );

    if(!agent){

        return;

    }

    alert(

        `Scheda agente: ${agent.name}`

    );

}