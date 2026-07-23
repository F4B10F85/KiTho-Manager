const roles = {

    ADMIN: {

        description: "IT Manager",

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

    DIRETTORECOMMERCIALE: {

        description: "Direttore Commerciale",

        modules: [

            "dashboard",
            "records",
            "orders",
            "ddt",
            "invoices"

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