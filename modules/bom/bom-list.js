"use strict";

/*
|--------------------------------------------------------------------------
| Elenco articoli con distinta base attiva
|--------------------------------------------------------------------------
*/

const itemsBOM = [

    {

        code:"KT.CS.XXS.YEL.01.05.00",

        description:"Collare Standard XXS Giallo",

        family:"Collari",

        revision:"R01",

        components:12,

        lastEdit:"07/05/2026",

        active:true

    },

    {

        code:"KT.CS.S.BLK.02.01.00",

        description:"Collare Standard S Nero",

        family:"Collari",

        revision:"R02",

        components:9,

        lastEdit:"12/05/2026",

        active:true

    },

    {

        code:"KT.PT.M.RED.03.02.00",

        description:"Pettorina Comfort M Rossa",

        family:"Pettorine",

        revision:"R01",

        components:16,

        lastEdit:"18/05/2026",

        active:true

    },

    {

        code:"KT.GZ.L.BLU.04.01.00",

        description:"Guinzaglio Standard L Blu",

        family:"Guinzagli",

        revision:"R03",

        components:7,

        lastEdit:"26/05/2026",

        active:true

    },

    {

        code:"KT.SAC.GRN.18x21",

        description:"Sacchetto Verde 18x21",

        family:"Packaging",

        revision:"R01",

        components:3,

        lastEdit:"02/06/2026",

        active:true

    },

    {

        code:"KT.CM.XL.RED.04",

        description:"Cappottino XL Rosso",

        family:"Abbigliamento",

        revision:"R02",

        components:21,

        lastEdit:"15/06/2026",

        active:true

    },

    {

        code:"KT.ANE.SIL.30",

        description:"Anello Silicone Ø30",

        family:"Accessori",

        revision:"R01",

        components:4,

        lastEdit:"22/06/2026",

        active:false

    },

    {

        code:"KT.FIL.BLK",

        description:"Filo Nero Alta Resistenza",

        family:"Materie Prime",

        revision:"R04",

        components:2,

        lastEdit:"01/07/2026",

        active:true

    }

];

function showBOM() {

    const workspace = document.getElementById("km-workspace");

    workspace.innerHTML = `

         <div class="km-page km-customers-page">

            <div class="km-page-header">

                <h1>

                    Distinta Base

                </h1>

            </div>


            <div class="km-customer-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="showCreateBOMChoice()">

                    + Crea

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


            <div class="km-customer-table-wrapper">

                <div id="km-itemsBOM-table"></div>

            </div>

        </div>

    `;

    const bomTableData = itemsBOM.map(item => {

        const savedBOM = boms.find(
            bom => bom.article.code === item.code
        );

        if(savedBOM){

            return {

                ...item,

                components: savedBOM.componentsCount,

                lastEdit: savedBOM.lastEdit

            };

        }

        return item;

    });

    boms.forEach(bom => {

        const exists = bomTableData.some(
            item => item.code === bom.article.code
        );

        if(!exists){

            bomTableData.push({

                code: bom.article.code,

                description: bom.article.description,

                family: bom.article.family || "—",

                revision: "R01",

                components: bom.componentsCount,

                lastEdit: bom.lastEdit,

                active: true

            });

        }

    });


    createTable({

        containerId: "km-itemsBOM-table",

        columns: [

            {
                title: "",
                type: "details",
                onClick:"showItemsBOMDetails"
            },

            {
                key: "code",
                title: "Codice"
            },

            {
                key:"description",
                title:"Descrizione"
            },

            {
                key:"family",
                title:"Famiglia"
            },

            {
                key:"revision",
                title:"Revisione"
            },

            {
                key:"components",
                title:"N° Componenti"
            },

            {
                key:"lastEdit",
                title:"Ultima Modifica"
            }
        
        ],

        data: bomTableData,

        filters: true

    });

}