"use strict";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    db
} from "../../services/firebase/firebase-db.js";


const agentsCollection =
    collection(
        db,
        "agents"
    );


async function getAgents(){

    const snapshot =
        await getDocs(
            agentsCollection
        );

    return snapshot.docs.map(
        document => ({

            id:
                document.id,

            ...document.data()

        })
    );

}


async function createAgent(agent){

    const documentReference =
        await addDoc(
            agentsCollection,
            {

                code:
                    agent.code,

                name:
                    agent.name,

                active:
                    agent.active === true

            }
        );

    return {

        id:
            documentReference.id,

        code:
            agent.code,

        name:
            agent.name,

        active:
            agent.active === true

    };

}


async function updateAgent(
    id,
    data
){

    await updateDoc(

        doc(
            db,
            "agents",
            id
        ),

        {

            code:
                data.code,

            name:
                data.name,

            active:
                data.active === true

        }

    );

}


async function deleteAgentFromDatabase(id){

    await deleteDoc(

        doc(
            db,
            "agents",
            id
        )

    );

}


window.agentsAPI = {

    getAgents,

    createAgent,

    updateAgent,

    deleteAgent:
        deleteAgentFromDatabase

};