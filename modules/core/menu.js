"use strict";

/*
|--------------------------------------------------------------------------
| Menu
|--------------------------------------------------------------------------
| Definisce la struttura della navigazione di KiTho Business.
|--------------------------------------------------------------------------
*/

const menu = [

    {
        id: "dashboard",
        title: "Dashboard",
        icon: "🏠"
    },

    {
        id: "records",
        title: "Anagrafiche",
        icon: "👥",

        children: [

            {
                id: "customers",
                title: "Clienti"
            },

            {
                id: "suppliers",
                title: "Fornitori"
            },

            {
                id: "agents",
                title: "Agenti"
            },

            {
                id: "carriers",
                title: "Trasportatori"
            }

        ]

    },

    {
        id: "orders",
        title: "Ordini",
        icon: "📦",

        children: [

            {
                id: "new-order",
                title: "Nuovo Ordine"
            },

            {
                id: "orders-list",
                title: "Elenco Ordini"
            }

        ]

    },

    {
        id: "production",
        title: "Produzione",
        icon: "🏭"
    },

    {
        id: "ddt",
        title: "DDT",
        icon: "🚚",

        children: [

            {
                id: "ddt-sales",
                title: "DDT vendita"
            },

            {
                id: "ddt-gift",
                title: "DDT omaggio"
            },

            {
                id: "ddt-account-sale",
                title: "DDT conto vendita"
            }

        ]

    },

    {
        id: "invoices",
        title: "Fatture",
        icon: "🧾"
    },

    {
        id: "warehouse",
        title: "Magazzino",
        icon: "📦"
    },

    {
        id: "statistics",
        title: "Statistiche",
        icon: "📊"
    },

    {
        id: "settings",
        title: "Impostazioni",
        icon: "⚙"
    }

];


/**
 * Restituisce le informazioni di una pagina.
 */
function getPageInfo(pageId) {

    for (const item of menu) {

        if (item.id === pageId) {

            return {
                title: item.title,
                parent: null
            };

        }

        if (item.children) {

            for (const child of item.children) {

                if (child.id === pageId) {

                    return {

                        title: child.title,

                        parent: item.title

                    };

                }

            }

        }

    }

    return {

        title: "Pagina non trovata",
        parent: null

    };

}