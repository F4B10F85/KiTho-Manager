"use strict";

/* ==========================================================
   CONFIGURAZIONE LAYOUT
========================================================== */

const ROWS_PER_PAGE = 20;

/* ==========================================================
   MOCK ORDINE
========================================================== */

const currentOrder = {

    header:{

        number:"001/2026",

        type:"Vendita",

        date:"11/02/2026",

        page:1

    },

    customer:{

        name:"Pietro Serrano",

        address:"Via Cascina Rosa 8",

        city:"26016 Spino d'Adda (CR)"

    },

    shipping:{

        name:"IDEM",

        address:"",

        city:""

    },

    rows:[

        {

            code:"KT.COL.M.BRO.001",

            description:"Collare in pelle Marrone, con foglie rosa e cristalli azzurri, anello al centro - tg. XL",

            unit:"PZ",

            qty:2,

            price:"24,90",

            discount:"0%",

            total:"49,80",

            vat:"N2.2"

        },

        {

            code:"KT.GUA.NER.002",

            description:"Guinzaglio in pelle nera, 180 cm",

            unit:"PZ",

            qty:1,

            price:"18,50",

            discount:"10%",

            total:"16,65",

            vat:"N2.2"

        },

        {

            code:"KT.PETT.003",

            description:"Pettorina in pelle rossa con foglie arancioni, cristalli aquamarine e borche a piramide, doppio passante anteriore con anello sul retro - tg. XL",

            unit:"PZ",

            qty:3,

            price:"31,00",

            discount:"5%",

            total:"88,35",

            vat:"N2.2"

        },

        {

            code:"KT.TARG.004",

            description:"Medaglietta Personalizzata",

            unit:"PZ",

            qty:5,

            price:"6,90",

            discount:"0%",

            total:"34,50",

            vat:"N2.2"

        }

    ],

    totals:{

        taxable:189.30,

        vat:41.65,

        total:230.95

    }

};

/* ==========================================================
   RENDER HEADER
========================================================== */

function renderHeader(order){

    document.getElementById("order-number").textContent =
        order.header.number;

    document.getElementById("order-type").textContent =
        order.header.type;

    document.getElementById("order-date").textContent =
        order.header.date;

    document.getElementById("order-page").textContent =
        order.header.page;

}

/* ==========================================================
   RENDER RIGHE ORDINE
========================================================== */

function renderOrderBody(items){

    const container = document.getElementById("order-rows");

    container.innerHTML = "";

    items.forEach(item=>{

        const row = document.createElement("div");

        row.className = "ktb-order-row";

        row.innerHTML = `

            <div class="c1">${item.code}</div>

            <div class="c2">${item.description}</div>

            <div class="c3">${item.unit}</div>

            <div class="c4">${item.qty}</div>

            <div class="c5">${item.price ? item.price + " €" : ""}</div>

            <div class="c6">${item.discount}</div>

            <div class="c7">${item.total ? item.total + " €" : ""}</div>

            <div class="c8">${item.vat}</div>

        `;

        container.appendChild(row);

    });

}

/* ==========================================================
   RENDER DOCUMENTO
========================================================== */

function renderDocument(order){

    renderHeader(order);

    renderOrderBody(order.rows);

}

/* ==========================================================
   AVVIO
========================================================== */

renderDocument(currentOrder);