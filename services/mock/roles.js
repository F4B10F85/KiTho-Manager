const roles = {

    ADMIN: {

        description: "Admin",

        modules: [

            "dashboard",
            "records",
            "orders",
            "production",
            "ddt",
            "invoices",
            "warehouse",
            "statistics",
            "settings"

        ]

    },

    CEO: {

        description: "CEO",

        modules: [

            "dashboard",
            "records",
            "orders",
            "production",
            "ddt",
            "invoices",
            "warehouse",
            "statistics",
            "settings"

        ]

    },

    COMMERCIALE: {

        description: "Commerciale",

        modules: [

            "dashboard",
            "records",
            "orders",
            "ddt",
            "invoices",
                        
        ]

    },

    AMMINISTRAZIONE: {

        description: "Amministrazione",

        modules: [

            "dashboard",
            "records",
            "production",
            "invoices",
            "statistics",
            
        ]

    },

        MAGAZZINIERE: {

        description: "Magazziniere",

        modules: [

            "dashboard",
            "warehouse",
                        
        ]

    }

};

/**
 * Restituisce il ruolo corrente.
 */
function getRole(roleName){

    return roles[roleName];

}

/**
 * Verifica se un ruolo può accedere ad un modulo.
 */
function hasModuleAccess(roleName, moduleId){

    return getRole(roleName)
        .modules
        .includes(moduleId);

}