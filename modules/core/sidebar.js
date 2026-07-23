/**
 * Costruisce la sidebar.
 */
function buildSidebar() {

    buildMenu();

}

/**
 * Costruisce automaticamente il menu laterale.
 */
function buildMenu() {

    const user = getCurrentUser();

    const role = getRole(user.role);

    const menuContainer = document.getElementById("km-menu");

    menuContainer.innerHTML = "";

    menu.forEach(item => {

        if (!hasModuleAccess(user.role, item.id)) {

            return;

        }

        menuContainer.appendChild(
            createMenuItem(item)
        );

    });

}


/**
 * Crea un elemento del menu.
 */
function createMenuItem(item) {

    const group = document.createElement("div");

    group.className = "km-menu-group";

    const button = document.createElement("button");

    button.className = "km-menu-button";

    button.dataset.page = item.id;

    button.innerHTML = `

        <span class="km-menu-left">

            <span class="km-menu-icon">
                ${item.icon}
            </span>

            <span class="km-menu-title">
                ${item.title}
            </span>

        </span>

        ${
            item.children
                ? `<span class="km-menu-arrow">▶</span>`
                : ""
        }

    `;



    button.onclick = () => {

        if (!item.children) {

            navigate(item.id);

            return;

        }

        setActiveMenu(item.id);

        toggleSubmenu(group);

    };



    group.appendChild(button);



    if (item.children) {

        const submenu = document.createElement("div");

        submenu.className = "km-submenu";

        item.children.forEach(child => {

            const subButton = document.createElement("button");

            subButton.className = "km-submenu-button";

            subButton.dataset.page = child.id;

            subButton.textContent = child.title;

            subButton.onclick = () => navigate(child.id);

            submenu.appendChild(subButton);

        });

        group.appendChild(submenu);

    }

    return group;

}

/**
 * Apre o chiude un sottomenu.
 */
function toggleSubmenu(group) {

    const submenu = group.querySelector(".km-submenu");

    const arrow = group.querySelector(".km-menu-arrow");

    const isOpen = submenu.classList.contains("open");

    document.querySelectorAll(".km-submenu.open").forEach(menu => {

        menu.classList.remove("open");

    });

    document.querySelectorAll(".km-menu-arrow.open").forEach(item => {

        item.classList.remove("open");

    });

    if (!isOpen) {

        submenu.classList.add("open");

        arrow.classList.add("open");

    }

}

/**
 * Evidenzia il menu attivo.
 */
function setActiveMenu(pageId) {

    document
        .querySelectorAll(".km-menu-button, .km-submenu-button")
        .forEach(button => {

            button.classList.remove("active");

        });

    const parentMap = {

        customers: "records",
        suppliers: "records",
        agents: "records",
        carriers: "records",

        "new-order": "orders",
        "orders-list": "orders",

        "ddt-sales": "ddt",
        "ddt-gift": "ddt",
        "ddt-account-sale": "ddt"

    };

    const parentPage = parentMap[pageId];

    if (parentPage) {

        const parentButton = document.querySelector(

            `[data-page="${parentPage}"]`

        );

        if (parentButton) {

            parentButton.classList.add("active");

        }

    }

    const activeButton = document.querySelector(

        `[data-page="${pageId}"]`

    );

    if (activeButton) {

        activeButton.classList.add("active");

    }

}