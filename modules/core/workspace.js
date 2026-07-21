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

/**
 * Aggiorna il contenuto del Workspace.
 */
function setWorkspaceTitle(title) {

    setBreadcrumb(title);

    const workspace = document.querySelector(".km-workspace");

    if (!workspace) {

        return;

    }

    workspace.innerHTML = `
        <h1>${title}</h1>
    `;

}