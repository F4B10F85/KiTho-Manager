"use strict";

/*
|--------------------------------------------------------------------------
| Workspace
|--------------------------------------------------------------------------
| Gestisce il Workspace centrale.
|--------------------------------------------------------------------------
*/

function setWorkspaceTitle(title) {

    // Aggiorna il titolo dell'header
    const pageTitle = document.getElementById("km-page-title");

    if (pageTitle) {

        pageTitle.textContent = title;

    }

    // Aggiorna il contenuto del Workspace
    const workspace = document.querySelector(".km-workspace");

    if (workspace) {

        workspace.innerHTML = `
            <h1>${title}</h1>
        `;

    }

}