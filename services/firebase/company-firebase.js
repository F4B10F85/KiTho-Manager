"use strict";

import {
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    db
} from "./firebase-db.js";


const companyDocument =
    doc(
        db,
        "company",
        "main"
    );


async function getCompany(){

    const snapshot =
        await getDoc(
            companyDocument
        );


    if(!snapshot.exists()){

        return null;

    }


    return {

        id:
            snapshot.id,

        ...snapshot.data()

    };

}


async function createCompany(companyData){

    await setDoc(

        companyDocument,

        companyData

    );


    return {

        id:
            "main",

        ...companyData

    };

}


async function updateCompany(companyData){

    await updateDoc(

        companyDocument,

        companyData

    );


    return {

        id:
            "main",

        ...companyData

    };

}


window.companyAPI = {

    getCompany,

    createCompany,

    updateCompany

};