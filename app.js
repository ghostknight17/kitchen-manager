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
    // Lógica para mostrar la sección de inventario
    contenido.innerHTML = "<h2>Inventario</h2><p>Aquí puedes gestionar el inventario de ingredientes.</p>";
    const inventarioDiv = document.createElement("div");
    inventarioDiv.innerHTML = `<ul></ul>`;
    contenido.appendChild(inventarioDiv);
    const inventarioList = inventarioDiv.querySelector("ul");
    for (let i = 0; i < inventario.length; i++) {
        const item = inventario[i];
        const listItem = document.createElement("li");
        listItem.textContent = `${item.cantidadDisponible} ${item.unidad} de ${item.nombre}`;
        inventarioList.appendChild(listItem);
    }

});

btnCalendario.addEventListener("click", function() {
    // Lógica para mostrar la sección de calendario
    contenido.innerHTML = "<h2>Calendario</h2><p>Aquí puedes planificar tus comidas semanalmente.</p>";
});
