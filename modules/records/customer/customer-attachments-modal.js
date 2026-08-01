"use strict";

/*
|--------------------------------------------------------------------------
| Modal Nuovo Allegato
|--------------------------------------------------------------------------
*/

function openAttachmentModal(){

    createModal({

        title:"Nuovo allegato",

        content:`

            <div class="km-upload-form">

                <div class="km-company-label-attachments">

                    File

                </div>

                <div
                    class="km-upload-selector"
                    onclick="document.getElementById('attachment-file').click()">

                    <span id="attachment-file-name">

                        Seleziona un file...

                    </span>

                    <span>

                        📎

                    </span>

                </div>

                <input
                    id="attachment-file"
                    type="file"
                    style="display:none"
                    onchange="attachmentFileSelected(this)">

                <div class="km-company-label-attachments">

                    Categoria

                </div>

                <div class="km-company-field">

                    <select
                        id="attachment-category"
                        onchange="checkAttachmentForm()">

                        <option value="">

                            Seleziona...

                        </option>

                        <option>Contratto</option>

                        <option>Documento</option>

                        <option>Certificazione</option>

                        <option>Visura</option>

                        <option>Preventivo</option>

                        <option>Altro</option>

                    </select>

                </div>

            </div>

        `,

        buttons:[

            {

                text:"Annulla",

                primary:false,

                action:closeModal

            },

            {

                id:"attachment-upload-button",

                text:"Carica",

                primary:true,

                disabled:true,

                action:uploadAttachment

            }

        ]

    });

}



function attachmentFileSelected(input){

    const file=input.files[0];

    if(!file){

        return;

    }

    document.getElementById("attachment-file-name").value=file.name;

    checkAttachmentForm();

}



function checkAttachmentForm(){

    const file=document.getElementById("attachment-file").files.length>0;

    const category=document.getElementById("attachment-category").value!== "";

    const button=document.getElementById("attachment-upload-button");

    button.disabled=!(file && category);

}



function uploadAttachment(){

    console.log("UPLOAD MOCK");

    closeModal();

}