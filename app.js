const contenido = document.getElementById("contenido");
const btnRecetas = document.getElementById("btn-recetas");
const btnInventario = document.getElementById("btn-inventario");
const btnCalendario = document.getElementById("btn-calendario");
const tartaDeChoclo = {
nombre : "Tarta de choclo y garbanzos",
ingredientes : [
{
  nombre: "pascualina",
  cantidad: 1,
  unidad: "u"
},
{
nombre: "choclo en granos enlatado",
cantidad: 1,
unidad: "u"
},
{
nombre: "choclo cremoso enlatado",
cantidad: 1,
unidad: "u",
},
{
nombre: "garbanzos enlatados",
cantidad: 2,
unidad: "u"
},
{
nombre: "cebolla",
cantidad: 2,
unidad: "u"
},
{
nombre: "morron",
cantidad: 1/2,
unidad: "u"
},
{
nombre: "huevo",
cantidad: 3,
unidad: "u"
},
{
nombre: "leche",
cantidad: 150,
unidad: "g"
},
{
nombre: "maicena",
cantidad: 1,
unidad: "cda"
},
{
nombre: "sal",
cantidad: null,
unidad: null
},
{
nombre: "pimienta",
cantidad: null,
unidad: null
},
{
nombre: "nuez moscada",
cantidad: null,
unidad: null
}
],
instrucciones : `Sofreir la cebolla y el morrón con una pizca de sal hasta que estén blandos. Agregar ambas latas de choclo, sumar los garbanzos (una lata procesarla con la cantidad necesaria de leche para que quede una pasta). Disolver la maicena en el resto de la leche fría y agregar, revolver hasta que espese, luego retirar del fuego. Cuando la mezcla esté tibia, agregar los huevos batidos con sal, pimienta y una pizca de nuez moscada. Armar la tarta y hornear a 180 ó 200 grados por 25/30 min.`
};
let recetario = [tartaDeChoclo];
let inventario = [
    {
nombre : "Pascualina",
cantidadDisponible : 2,
unidad : "u"
},
{
nombre : "Choclo en granos enlatado",
cantidadDisponible : 2,
unidad : "u"
},
{
nombre : "Choclo cremoso enlatado",
cantidadDisponible : 1,
unidad : "u"
},
{
nombre : "Garbanzos enlatados",
cantidadDisponible : 2,
unidad : "u"
},
];

let semana = [
    {
        nombre : "Lunes",
        desayuno : tartaDeChoclo,
        almuerzo : null,
        merienda : null,
        cena : null
    },
    {
        nombre : "Martes",
        desayuno : null,
        almuerzo : null,
        merienda : null,
        cena : null
    },
    {
        nombre : "Miercoles",
        desayuno : null,
        almuerzo : null,
        merienda : null,
        cena : null
    },
    {
        nombre : "Jueves",
        desayuno : null,
        almuerzo : null,
        merienda : null,
        cena : null
    },
    {
        nombre : "Viernes",
        desayuno : null,
        almuerzo : null,
        merienda : null,
        cena : null
    },
    {
        nombre : "Sabado",
        desayuno : null,
        almuerzo : null,
        merienda : null,
        cena : null
    },
    {
        nombre : "Domingo",
        desayuno : null,
        almuerzo : null,
        merienda : null,
        cena : null
    }
]

cargarInventario();
cargarSemana();

btnRecetas.addEventListener("click", function() {
    // Lógica para mostrar la sección de recetas
    contenido.innerHTML = "<h2>Recetas</h2><p>Aquí puedes encontrar deliciosas recetas para preparar en casa.</p>";
    const recetasDiv = document.createElement("div");
    recetasDiv.innerHTML = `<ul></ul>`;
    contenido.appendChild(recetasDiv);
    const recetasList = recetasDiv.querySelector("ul");
    for (let i = 0; i < recetario.length; i++) {
        const receta = recetario[i];
        const recetaItem = document.createElement("li");
        recetaItem.textContent = receta.nombre;
        recetaItem.dataset.indice = i; // Guardar el índice de la receta en un atributo data
        recetaItem.addEventListener("click", function() {
            const indice = this.dataset.indice; // Obtener el índice de la receta
            const recetaSeleccionada = recetario[indice];
            contenido.innerHTML = 
            `<h2>${recetaSeleccionada.nombre}</h2>
            <h3>Ingredientes:</h3>
            <ul>${recetaSeleccionada.ingredientes.map(
                ingrediente => {
                    ingredienteDisponible = inventario.find(item => item.nombre.toLowerCase() === ingrediente.nombre.toLowerCase());
                    if (ingrediente.cantidad === null) {
                        if (ingredienteDisponible) {
                            return `<li>${ingrediente.nombre} a gusto</li>`;
                        } else {
                            return `<li style="color: red;">${ingrediente.nombre} a gusto (no disponible)</li>`;
                        }
                    } else if (ingredienteDisponible) {
                        if (ingredienteDisponible.cantidadDisponible >= ingrediente.cantidad) {
                            return `<li>${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}</li>`;
                        } else {
                            return `<li style="color: orange;">${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre} (insuficiente)</li>`;
                        }
                    } else {
                        return `<li style="color: red;">${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre} (no disponible)</li>`;
                    }
                }
            ).join("")}</ul>
            <h3>Instrucciones:</h3>
            <p>${recetaSeleccionada.instrucciones}</p>`;
        });
        recetasList.appendChild(recetaItem);
}
});

btnInventario.addEventListener("click", function() {
    renderInventario();
});

btnCalendario.addEventListener("click", function() {
    renderCalendario();
});

function guardarInventario() {
    localStorage.setItem("inventario", JSON.stringify(inventario));
}

function cargarInventario() {
    const datos = localStorage.getItem("inventario");
    if (datos) {
        inventario = JSON.parse(datos);
    }
}

function guardarSemana() {
    localStorage.setItem("semana", JSON.stringify(semana));
}

function cargarSemana() {
    const datos = localStorage.getItem("semana");
    if (datos) {
        semana = JSON.parse(datos);
    }
}

function renderInventario() {
    contenido.innerHTML = "<h2>Inventario</h2><p>Aquí puedes gestionar el inventario de ingredientes.</p>";
    const inventarioDiv = document.createElement("div");
    inventarioDiv.innerHTML = `<ul></ul>`;
    contenido.appendChild(inventarioDiv);
    const inventarioList = inventarioDiv.querySelector("ul");
    let indiceEdicion = null;
    for (let i = 0; i < inventario.length; i++) {
        const item = inventario[i];
        const listItem = document.createElement("li");
        const itemBtn = document.createElement("button");
        listItem.textContent = `${item.cantidadDisponible} ${item.unidad} de ${item.nombre}`;
        itemBtn.textContent = "X";
        listItem.dataset.indice = i;
        itemBtn.dataset.indice = i; // Guardar el índice del ingrediente
        listItem.addEventListener("click", function() {
            const indice = this.dataset.indice;
            const ingredienteSeleccionado = inventario[indice];
            document.getElementById("nombre-ingrediente").value = ingredienteSeleccionado.nombre;
            document.getElementById("cantidad-ingrediente").value = ingredienteSeleccionado.cantidadDisponible;
            document.getElementById("unidad-ingrediente").value = ingredienteSeleccionado.unidad;
            indiceEdicion = this.dataset.indice;
            console.log("indiceEdicion asignado:", indiceEdicion, typeof indiceEdicion);
        })
        itemBtn.addEventListener("click", function() {
            const indice = this.dataset.indice;
            inventario.splice(indice, 1);
            guardarInventario();
            renderInventario();
            }
        )
        inventarioList.appendChild(listItem);
        listItem.appendChild(itemBtn);
    }
    const inventarioForm = document.createElement("form");
    inventarioForm.id = "inventario-form";
    inventarioForm.innerHTML = `
        <h3>Agregar/Actualizar Ingrediente</h3>
        <input type="text" id="nombre-ingrediente" placeholder="Nombre del ingrediente" required>
        <input type="number" id="cantidad-ingrediente" placeholder="Cantidad disponible" required>
        <input type="text" id="unidad-ingrediente" placeholder="Unidad (e.g., u, g, ml)" required>
        <button type="submit">Guardar</button>
    `;
    contenido.appendChild(inventarioForm);
    inventarioForm.addEventListener("submit", function(event) {
        const nombre = document.getElementById("nombre-ingrediente").value;
        const cantidadDisponible = document.getElementById("cantidad-ingrediente").value;
        const unidad = document.getElementById("unidad-ingrediente").value;
        const ingrediente = {nombre, cantidadDisponible, unidad};
        event.preventDefault();
        console.log("en submit, indiceEdicion:", indiceEdicion, typeof indiceEdicion);
        if (indiceEdicion !== null) {
            inventario[Number(indiceEdicion)].nombre = nombre;
            inventario[Number(indiceEdicion)].cantidadDisponible = cantidadDisponible;
            inventario[Number(indiceEdicion)].unidad = unidad;
        } else {
            inventario.push(ingrediente);
        }
        guardarInventario();
        renderInventario();
        indiceEdicion = null;
    });
}

function renderCalendario() {
    contenido.innerHTML = "<h2>Calendario</h2><p>Aquí puedes planificar tus comidas semanalmente.</p>";
    const calendarioDiv = document.createElement("div");
    calendarioDiv.innerHTML = `<ul></ul>`;
    contenido.appendChild(calendarioDiv);
    const calendarioList = calendarioDiv.querySelector("ul");
    for (let i = 0; i < semana.length; i++) {
        const dia = semana[i];
        const listItem = document.createElement("li");
        listItem.textContent = `${dia.nombre}: Desayuno: ${dia.desayuno === null ? "Sin asignar" : dia.desayuno.nombre}, Almuerzo: ${dia.almuerzo === null ? "Sin asignar" : dia.almuerzo.nombre}, Merienda: ${dia.merienda === null ? "Sin asignar" : dia.merienda.nombre}, Cena: ${dia.cena === null ? "Sin asignar" : dia.cena.nombre}`;
        calendarioList.appendChild(listItem);
    }
}