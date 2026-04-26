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

cargarRecetario();
cargarInventario();
cargarSemana();

btnRecetas.addEventListener("click", function() {
    renderRecetario();
});

btnInventario.addEventListener("click", function() {
    renderInventario();
});

btnCalendario.addEventListener("click", function() {
    renderCalendario();
});

function guardarRecetario() {
    localStorage.setItem("recetario", JSON.stringify(recetario));
}

function cargarRecetario() {
    const datos = localStorage.getItem("recetario");
    if (datos) {
        recetario = JSON.parse(datos);
    }
}

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

function renderRecetario() {
    contenido.innerHTML = "<h2>Recetas</h2><p>Aquí puedes encontrar deliciosas recetas para preparar en casa.</p>";
    const recetasDiv = document.createElement("div");
    recetasDiv.innerHTML = `<ul></ul>`;
    contenido.appendChild(recetasDiv);
    const recetasList = recetasDiv.querySelector("ul");
    let ingredientesReceta = [];
    
    for (let i = 0; i < recetario.length; i++) {
        const receta = recetario[i];
        const recetaItem = document.createElement("li");
        const recetaBtn = document.createElement("button");
        recetaItem.textContent = receta.nombre;
        recetaBtn.textContent = "X";
        recetaItem.dataset.indice = i;
        recetaBtn.dataset.indice = i;
        recetaItem.addEventListener("click", function() {
            const indice = this.dataset.indice;
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
        recetaBtn.addEventListener("click", function() {
            const indice = this.dataset.indice;
            recetario.splice(indice, 1);
            guardarRecetario();
            renderRecetario();
        });
        recetasList.appendChild(recetaItem);
        recetaItem.appendChild(recetaBtn);
    }
    const recetarioForm = document.createElement("form");
    recetarioForm.innerHTML = `
        <label for="nombre">Nombre de la receta:</label>
        <input type="text" id="nombre" name="nombre" required>
        <label for="ingredientes" id="ingredientes-label">Ingredientes:</label>
        <input type="text" id="nombre-ingrediente" placeholder="Nombre del ingrediente">
        <input type="number" id="cantidad-ingrediente" placeholder="Cantidad">
        <input type="text" id="unidad-ingrediente" placeholder="Unidad (e.g., u, g, ml)">
        <button type="button" id="agregar-ingrediente">Guardar</button>
        <label for="instrucciones">Instrucciones:</label>
        <textarea id="instrucciones" name="instrucciones" required></textarea>
        <button type="submit">Guardar</button>
    `;
    contenido.appendChild(recetarioForm);
    const ingredientesListTemp = document.createElement("ul");
    document.getElementById("ingredientes-label").appendChild(ingredientesListTemp);
    const agregarIngredienteBtn = document.getElementById("agregar-ingrediente");
    agregarIngredienteBtn.addEventListener("click", function() {
        const nombre = document.getElementById("nombre-ingrediente").value;
        let cantidad = document.getElementById("cantidad-ingrediente").value;
        let unidad = document.getElementById("unidad-ingrediente").value;
        if (cantidad === '' && unidad === '') {
            cantidad = null;
            unidad = null;
        }
        const nuevoIngrediente = { nombre, cantidad, unidad };
        ingredientesReceta.push(nuevoIngrediente);
        document.getElementById("nombre-ingrediente").value = "";
        document.getElementById("cantidad-ingrediente").value = "";
        document.getElementById("unidad-ingrediente").value = "";
        ingredientesListTemp.innerHTML = ingredientesReceta.map(ingrediente => {
            if (ingrediente.cantidad === null) {
                return `<li>${ingrediente.nombre} a gusto</li>`;
            } else {
                return `<li>${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}</li>`;
            }
        }).join("");
    })
    recetarioForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const ingredientes = ingredientesReceta;
        const instrucciones = document.getElementById("instrucciones").value;
        const nuevaReceta = { nombre, ingredientes, instrucciones };
        recetario.push(nuevaReceta);
        guardarRecetario();
        renderRecetario();
        recetarioForm.reset();
        ingredientesReceta = [];
    })
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
        listItem.innerHTML = 
        item.cantidadDisponible === null ? `<span>${item.nombre}</span>` : `<span>${item.cantidadDisponible} ${item.unidad} de ${item.nombre}</span>`;
        itemBtn.textContent = "X";
        listItem.dataset.indice = i;
        itemBtn.dataset.indice = i;
        listItem.addEventListener("click", function() {
            const indice = this.dataset.indice;
            const ingredienteSeleccionado = inventario[indice];
            document.getElementById("nombre-ingrediente").value = ingredienteSeleccionado.nombre;
            document.getElementById("cantidad-ingrediente").value = ingredienteSeleccionado.cantidadDisponible;
            document.getElementById("unidad-ingrediente").value = ingredienteSeleccionado.unidad;
            indiceEdicion = this.dataset.indice;
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
        <input type="number" id="cantidad-ingrediente" placeholder="Cantidad disponible">
        <input type="text" id="unidad-ingrediente" placeholder="Unidad (e.g., u, g, ml)">
        <button type="submit">Guardar</button>
    `;
    contenido.appendChild(inventarioForm);
    inventarioForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre-ingrediente").value;
        let cantidadDisponible = document.getElementById("cantidad-ingrediente").value;
        let unidad = document.getElementById("unidad-ingrediente").value;
        if (cantidadDisponible === '' && unidad === '') {
            cantidadDisponible = null;
            unidad = null;
        }
        const ingrediente = {nombre, cantidadDisponible, unidad};
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
        listItem.textContent = 
        `${dia.nombre}: 
        Desayuno: ${dia.desayuno === null ? "Sin asignar" : dia.desayuno.nombre}, 
        Almuerzo: ${dia.almuerzo === null ? "Sin asignar" : dia.almuerzo.nombre}, 
        Merienda: ${dia.merienda === null ? "Sin asignar" : dia.merienda.nombre}, 
        Cena: ${dia.cena === null ? "Sin asignar" : dia.cena.nombre}`;
        listItem.dataset.indice = i;
        listItem.addEventListener("click", function() {
            const indice = this.dataset.indice;
            const diaSeleccionado = semana[indice];
            const modal = document.getElementById("agregar-comida");
            modal.innerHTML = `
                <h3>Agregar Comida</h3>
                <select id="tipo-comida">
                    <option value="desayuno">Desayuno</option>
                    <option value="almuerzo">Almuerzo</option>
                    <option value="merienda">Merienda</option>
                    <option value="cena">Cena</option>
                </select>
                <button id="agregar-btn">Agregar</button>
            `;
            const tipoComidaSelect = modal.querySelector("#tipo-comida");
            const agregarBtn = document.getElementById("agregar-btn");
            agregarBtn.addEventListener("click", function() {
                const comidaSeleccionada = tipoComidaSelect.value;
                modal.innerHTML = `
                    <h3>Elegir receta</h3>
                    <ul></ul>
                `;
                const recetasList = modal.querySelector("ul");
                recetasList.innerHTML = "";
                recetario.forEach(receta => {
                    const recetaItem = document.createElement("li");
                    recetaItem.textContent = receta.nombre;
                    recetaItem.addEventListener("click", function() {
                        const tipoComida = tipoComidaSelect.value;
                        semana[indice][tipoComida] = receta;
                        guardarSemana();
                        renderCalendario();
                        modal.close();
                    });
                    recetasList.appendChild(recetaItem);
                });
            });
            modal.showModal();
        });
        calendarioList.appendChild(listItem);
    };
};
