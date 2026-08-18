"use strict";


/*
|---------------------------------------------------------------------------
| Dataset
|---------------------------------------------------------------------------
*/

let agentsData = [];


/*
|---------------------------------------------------------------------------
| Ordinamento agenti
|---------------------------------------------------------------------------
|
| L'ordine viene determinato dal codice agente:
|
| AG001
| AG002
| AG003
| AG004
|
| e NON dall'ID automatico generato da Firebase.
|---------------------------------------------------------------------------
*/

function sortAgents(){

    agentsData.sort(
        (a, b) => {

            return String(
                a.code ?? ""
            ).localeCompare(
                String(
                    b.code ?? ""
                ),
                undefined,
                {
                    numeric: true,
                    sensitivity: "base"
                }
            );

        }
    );

}


/*
|---------------------------------------------------------------------------
| Render tabella
|---------------------------------------------------------------------------
*/

function renderAgentsTable(){

    sortAgents();


    createTable({

        containerId:
            "km-agents-table",

        filters:
            true,

        columns: [

            {
                key: "code",
                title: "Codice"
            },

            {
                key: "name",
                title: "Agente",

                render:
                    function(agent){

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

        data:
            agentsData

    });

}


/*
|---------------------------------------------------------------------------
| Pagina principale
|---------------------------------------------------------------------------
*/

async function renderAgentsPage(){

    const workspace =
        document.getElementById(
            "km-workspace"
        );


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
                    class="km-button km-button-export km-button-excel">

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


    try{

        agentsData =
            await window.agentsAPI.getAgents();


        sortAgents();

        renderAgentsTable();


    }catch(error){

        console.error(
            "Errore caricamento agenti:",
            error
        );

    }

}


/*
|---------------------------------------------------------------------------
| Nuovo agente
|---------------------------------------------------------------------------
*/

async function showNewAgent(){

    console.log(
        "SHOW NEW AGENT"
    );


    try{

        /*
        |-------------------------------------------------------------------
        | Recuperiamo i dati aggiornati da Firebase solamente per
        | determinare il prossimo codice agente.
        |-------------------------------------------------------------------
        */

        const existingAgents =
            await window.agentsAPI.getAgents();


        let maxNumber = 0;


        existingAgents.forEach(
            agent => {

                const match =
                    String(
                        agent.code ?? ""
                    ).match(
                        /^AG(\d+)$/
                    );


                if(match){

                    const number =
                        parseInt(
                            match[1],
                            10
                        );


                    if(
                        number > maxNumber
                    ){

                        maxNumber =
                            number;

                    }

                }

            }
        );


        const newCode =
            "AG" +
            String(
                maxNumber + 1
            ).padStart(
                3,
                "0"
            );


        agentsData.push({

            code:
                newCode,

            name:
                "",

            active:
                true,

            editing:
                true,

            isNew:
                true

        });


        /*
        |-------------------------------------------------------------------
        | NON ricarichiamo renderAgentsPage().
        |
        | L'agente temporaneo rimane nell'array locale.
        |-------------------------------------------------------------------
        */

        renderAgentsTable();


        /*
        |-------------------------------------------------------------------
        | Focus automatico sul campo nome.
        |-------------------------------------------------------------------
        */

        const input =
            document.querySelector(
                `input[data-agent-code="${newCode}"]`
            );


        if(input){

            input.focus();

        }

    }catch(error){

        console.error(
            "Errore creazione nuovo agente:",
            error
        );

    }

}


/*
|---------------------------------------------------------------------------
| Azioni tabella
|---------------------------------------------------------------------------
*/

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


/*
|---------------------------------------------------------------------------
| Attiva / disattiva agente
|---------------------------------------------------------------------------
*/

async function toggleAgentStatus(code){

    const agent =
        agentsData.find(
            item =>
                item.code === code
        );


    if(!agent){

        return;

    }


    if(agent.isNew){

        return;

    }


    /*
    |-----------------------------------------------------------------------
    | Salviamo lo stato precedente FUORI dal try, così è disponibile
    | anche nel catch in caso di errore Firebase.
    |-----------------------------------------------------------------------
    */

    const previousStatus =
        agent.active;


    try{

        agent.active =
            agent.active === false;


        await window.agentsAPI.updateAgent(

            agent.id,

            {

                code:
                    agent.code,

                name:
                    agent.name,

                active:
                    agent.active

            }

        );


        renderAgentsTable();


    }catch(error){

        console.error(
            "Errore aggiornamento stato agente:",
            error
        );


        /*
        |-------------------------------------------------------------------
        | Ripristiniamo lo stato precedente.
        |-------------------------------------------------------------------
        */

        agent.active =
            previousStatus;


        renderAgentsTable();

    }

}


/*
|---------------------------------------------------------------------------
| Modifica agente
|---------------------------------------------------------------------------
*/

function editAgent(code){

    const agent =
        agentsData.find(
            item =>
                item.code === code
        );


    if(!agent){

        return;

    }


    agent.editing =
        true;


    /*
    |-----------------------------------------------------------------------
    | Ridisegniamo SOLO la tabella.
    |
    | NON richiamiamo renderAgentsPage(), quindi NON facciamo una nuova
    | lettura da Firebase e non perdiamo agent.editing.
    |-----------------------------------------------------------------------
    */

    renderAgentsTable();


    /*
    |-----------------------------------------------------------------------
    | Focus automatico sul campo.
    |-----------------------------------------------------------------------
    */

    const input =
        document.querySelector(
            `input[data-agent-code="${code}"]`
        );


    if(input){

        input.focus();

        input.select();

    }

}


/*
|---------------------------------------------------------------------------
| Salvataggio modifica
|---------------------------------------------------------------------------
*/

async function saveEditedAgent(code){

    const agent =
        agentsData.find(
            item =>
                item.code === code
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


    try{

        /*
        |-------------------------------------------------------------------
        | Nuovo agente
        |-------------------------------------------------------------------
        */

        if(agent.isNew){

            const createdAgent =
                await window.agentsAPI.createAgent({

                    code:
                        agent.code,

                    name:
                        newName,

                    active:
                        agent.active

                });


            agent.id =
                createdAgent.id;

            agent.name =
                newName;

            agent.editing =
                false;

            agent.isNew =
                false;

        }

        /*
        |-------------------------------------------------------------------
        | Agente esistente
        |-------------------------------------------------------------------
        */

        else{

            await window.agentsAPI.updateAgent(

                agent.id,

                {

                    code:
                        agent.code,

                    name:
                        newName,

                    active:
                        agent.active

                }

            );


            agent.name =
                newName;

            agent.editing =
                false;

        }


        renderAgentsTable();


    }catch(error){

        console.error(
            "Errore salvataggio agente:",
            error
        );


        alert(
            "Errore durante il salvataggio dell'agente."
        );

    }

}


/*
|---------------------------------------------------------------------------
| Annulla modifica
|---------------------------------------------------------------------------
*/

function cancelEditAgent(code){

    const agent =
        agentsData.find(
            item =>
                item.code === code
        );


    if(!agent){

        return;

    }


    /*
    |-----------------------------------------------------------------------
    | Se è un nuovo agente non ancora salvato, lo rimuoviamo dall'array.
    |-----------------------------------------------------------------------
    */

    if(agent.isNew){

        const index =
            agentsData.findIndex(
                item =>
                    item.code === code
            );


        if(index !== -1){

            agentsData.splice(
                index,
                1
            );

        }

    }

    /*
    |-----------------------------------------------------------------------
    | Se è un agente esistente, usciamo dalla modalità modifica.
    |-----------------------------------------------------------------------
    */

    else{

        agent.editing =
            false;

    }


    renderAgentsTable();

}


/*
|---------------------------------------------------------------------------
| Elimina agente
|---------------------------------------------------------------------------
*/

async function deleteAgent(code){

    const agent =
        agentsData.find(
            item =>
                item.code === code
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


    try{

        /*
        |-------------------------------------------------------------------
        | Se l'agente esiste su Firebase, lo eliminiamo.
        |-------------------------------------------------------------------
        */

        if(agent.id){

            await window.agentsAPI.deleteAgent(
                agent.id
            );

        }


        /*
        |-------------------------------------------------------------------
        | Rimuoviamo l'agente anche dall'array locale.
        |-------------------------------------------------------------------
        */

        const index =
            agentsData.findIndex(
                item =>
                    item.code === code
            );


        if(index !== -1){

            agentsData.splice(
                index,
                1
            );

        }


        renderAgentsTable();


    }catch(error){

        console.error(
            "Errore eliminazione agente:",
            error
        );


        alert(
            "Errore durante l'eliminazione dell'agente."
        );

    }

}


async function ensureAgentsLoaded(){

    if(agentsData.length > 0){

        return;

    }

    agentsData =
        await window.agentsAPI.getAgents();

}
