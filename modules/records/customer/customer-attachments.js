"use strict";

let customerAttachments = [];

/*
|--------------------------------------------------------------------------
| TAB Allegati Cliente
|--------------------------------------------------------------------------
*/

function renderCustomerAttachments(customer = {}){

    return `

        <div class="km-company-section">

            <div class="km-document-toolbar">

                <button
                    class="km-button km-button-primary"
                    onclick="openAttachmentModal()">

                    + Carica allegato

                </button>

            </div>

            <div id="customer-attachments-table"></div>

        </div>

    `;

}


function initCustomerAttachments(customer){

    createTable({

        containerId:"customer-attachments-table",

        filters:true,

        data:getCustomerAttachments(customer.code),

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


function getCustomerAttachments(customerCode){

    const mockAttachments = [

        {
            id:1,
            customerCode:"C00001",
            fileName:"Contratto_2026.pdf",
            category:"Contratto",
            uploaded:"31/07/2026",
            size:"2.3 MB"
        },

        {
            id:2,
            customerCode:"C00001",
            fileName:"Carta_Identita.pdf",
            category:"Documento",
            uploaded:"12/06/2026",
            size:"540 KB"
        },

        {
            id:3,
            customerCode:"C00001",
            fileName:"Visura_Camerale.pdf",
            category:"Visura",
            uploaded:"03/05/2026",
            size:"1.8 MB"
        },

        {
            id:4,
            customerCode:"C00001",
            fileName:"Preventivo_Firmato.pdf",
            category:"Preventivo",
            uploaded:"18/04/2026",
            size:"860 KB"
        }

    ];


    return [

        ...mockAttachments.filter(

            attachment =>
                attachment.customerCode === customerCode

        ),

        ...customerAttachments.filter(

            attachment =>
                attachment.customerCode === customerCode

        )

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