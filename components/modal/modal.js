"use strict";

/*
|--------------------------------------------------------------------------
| Modal Component
|--------------------------------------------------------------------------
| Gestisce tutte le finestre modali di KiTho Business.
|--------------------------------------------------------------------------
*/

"use strict";

/*
|--------------------------------------------------------------------------
| Modal Component
|--------------------------------------------------------------------------
*/

function createModal(config) {

    closeModal();

    const overlay = document.createElement("div");

    overlay.id = "km-modal-overlay";

    overlay.className = "km-modal-overlay";

    const size = config.size || "medium";

    overlay.innerHTML = `

        <div class="km-modal km-modal-${size}">

            <div class="km-modal-header">

                <span class="km-modal-title">

                    ${config.title}

                </span>

                <button
                    class="km-modal-close">

                    ✕

                </button>

            </div>

            <div class="km-modal-body">

                ${config.content}

            </div>

            <div class="km-modal-footer">

            </div>

        </div>

    `;

    document.body.appendChild(overlay);

    overlay
        .querySelector(".km-modal-close")
        .addEventListener("click", closeModal);

    const footer =
        overlay.querySelector(".km-modal-footer");

    if (config.buttons) {

        config.buttons.forEach(btn => {

            const button =
                document.createElement("button");

            button.textContent = btn.text;

            button.className =
                btn.primary
                    ? "km-button km-button-primary"
                    : "km-button km-button-secondary";

            button.addEventListener("click", btn.action);

            footer.appendChild(button);

        });

    }

}

function closeModal() {

    const modal =
        document.getElementById("km-modal-overlay");

    if (modal) {

        modal.remove();

    }

}