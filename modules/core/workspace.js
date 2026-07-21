"use strict";

/*
|--------------------------------------------------------------------------
| Workspace
|--------------------------------------------------------------------------
| Gestisce l'area centrale del gestionale.
|--------------------------------------------------------------------------
*/

function setWorkspaceTitle(title) {

    const workspace = document.querySelector(".km-workspace");

    workspace.innerHTML = `
        <h1>${title}</h1>
    `;

}