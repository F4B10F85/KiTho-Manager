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

    const menuContainer = document.getElementById("km-menu");

    menuContainer.innerHTML = "";

    menu.forEach(item => {

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

    submenu.classList.toggle("open");

    arrow.classList.toggle("open");

}