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
                id: "items",
                title: "Articoli"
            },
            
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
            },

            {
                id: "bom",
                title: "Distinta Base"
            }

        ]

    },

    {
        id: "orders",
        title: "Ordini",
        icon: "📦",
        
        children: [

            {
                id: "sales-order",
                title: "Ordini di Vendita"
            },

            {
                id: "purchasing-order",
                title: "Ordini di Acquisto"
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
        /*
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
        */
    },

    {
        id: "invoices",
        title: "Fatture",
        icon: "🧾",
        
        children: [

            {
                id: "sales-invoices",
                title: "Fatture di Vendita"
            },

            {
                id: "purchasing-invoices",
                title: "Fatture di Acquisto"
            }

        ]
    },

    {
        id: "warehouse",
        title: "Magazzino",
        icon: "📦",
        
        children: [

            {
                id: "stock-warehouse",
                title: "Giacenze"
            },

            {
                id: "pn-warehouse",
                title: "Prima Nota"
            }

        ]
    },

    {
        id: "statistics",
        title: "Statistiche",
        icon: "📊"
    },

    {
        id: "settings",
        title: "Impostazioni",
        icon: "⚙",

        children: [

            {
                id: "company",
                title: "Azienda"
            },

            {
                id: "access",
                title: "Accessi"
            },

            {
                id: "warehouses",
                title: "Magazzini"
            },

            {
                id: "documents",
                title: "Documenti"
            },

            {
                id: "appearance",
                title: "Aspetto"
            },

            {
                id: "system",
                title: "Sistema"
            }

        ]
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

function getModuleId(pageId) {

    for (const item of menu) {

        if (item.id === pageId) {

            return item.id;

        }

        if (item.children) {

            for (const child of item.children) {

                if (child.id === pageId) {

                    return item.id;

                }

            }

        }

    }

    return null;

}