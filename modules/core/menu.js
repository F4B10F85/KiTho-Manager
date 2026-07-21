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
        id: "new-order",
        title: "Nuovo Ordine",
        icon: "📝"
    },

    {
        id: "orders",
        title: "Ordini",
        icon: "📦"
    },

    {
        id: "production",
        title: "Produzione",
        icon: "🏭"
    },

    {
        id: "ddt",
        title: "DDT",
        icon: "🚚"
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