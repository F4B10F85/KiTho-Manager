"use strict";

/*
|--------------------------------------------------------------------------
| TAB Allegati Corriere
|--------------------------------------------------------------------------
*/

function renderCarrierAttachments(carrier = {}){

    return `

        <div class="km-company-section">

            <div class="km-document-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="openAttachmentModal()">

                    + Carica allegato

                </button>

            </div>

            <div id="carrier-attachments-table"></div>

        </div>

    `;

}


function initCarrierAttachments(carrier){

    createTable({

        containerId:"carrier-attachments-table",

        filters:true,

        data:getCarrierAttachments(carrier.code),

        columns:[

            {
                key:"fileName",
                title:"Nome file"
            },

            {
                key:"category",
                title:"Categoria",
                type:"badge",
                badgeType:"attachmentCategory"
            },

            {
                key:"uploaded",
                title:"Data"
            },

            {
                key:"size",
                title:"Dimensione"
            },

            {
                type:"actions",

                render:(row)=>`

                    <div class="km-table-actions">

                        <button
                            class="km-action-button"
                            title="Visualizza"
                            onclick="previewAttachment('${row.id}')">

                            👁

                        </button>

                        <button
                            class="km-action-button"
                            title="Scarica"
                            onclick="downloadAttachment('${row.id}')">

                            ⬇️

                        </button>

                        <button
                            class="km-action-button km-delete-button"
                            title="Elimina"
                            onclick="deleteAttachment('${row.id}')">

                            🗑

                        </button>

                    </div>

                `

            }

        ]

    });

}



/*
|--------------------------------------------------------------------------
| DATI MOCK
|--------------------------------------------------------------------------
*/

function getCarrierAttachments(carrierCode){

    return [

        {

            id:1,

            fileName:"Contratto_2026.pdf",

            category:"Contratto",

            uploaded:"31/07/2026",

            size:"2.3 MB"

        },

        {

            id:2,

            fileName:"Preventivo_Firmato.pdf",

            category:"Preventivo",

            uploaded:"18/04/2026",

            size:"860 KB"

        }

    ];

}


function previewAttachment(id){

    console.log("preview",id);

}


function downloadAttachment(id){

    console.log("download",id);

}


function deleteAttachment(id){

    console.log("delete",id);

}