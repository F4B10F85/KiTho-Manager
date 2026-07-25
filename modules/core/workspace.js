"use strict";

/*
|--------------------------------------------------------------------------
| Workspace
|--------------------------------------------------------------------------
| Gestisce header e workspace centrale.
|--------------------------------------------------------------------------
*/

/**
 * Aggiorna il breadcrumb.
 */
function setBreadcrumb(...items) {

    const breadcrumb = document.getElementById("km-breadcrumb");

    if (!breadcrumb) {

        return;

    }

    breadcrumb.textContent = items.join(" > ");

}

function setNavigationContext(pageId){

    const page = getPageInfo(pageId);

    if(!page){

        return;

    }

    if(page.parent){

        setBreadcrumb(

            page.parent,

            page.title

        );

    }

    else{

        setBreadcrumb(

            page.title

        );

    }

}

/**
 * Aggiorna il contenuto del Workspace.
 */

function setWorkspacePage(pageId){

    setNavigationContext(pageId);

    const page = getPageInfo(pageId);

    const workspace = document.querySelector(".km-workspace");

    workspace.innerHTML = `

        <h1>${page.title}</h1>

    `;

}


/**
 * Aggiorna il contenuto del Workspace.
 
function setWorkspacePage(pageId) {

    const page = getPageInfo(pageId);

    console.log(pageId);
    console.log(page);

    if (page.parent) {

        setBreadcrumb(page.parent, page.title);

    } else {

        setBreadcrumb(page.title);

    }

    const workspace = document.querySelector(".km-workspace");

    workspace.innerHTML = `
        <h1>${page.title}</h1>
    `;

}
*/