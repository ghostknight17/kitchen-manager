const contenido = document.getElementById("contenido");
const btnRecetas = document.getElementById("btn-recetas");
const btnInventario = document.getElementById("btn-inventario");
const btnCalendario = document.getElementById("btn-calendario");
btnRecetas.addEventListener("click", function() {
    // Lógica para mostrar la sección de recetas
    contenido.innerHTML = "<h2>Recetas</h2><p>Aquí puedes encontrar deliciosas recetas para preparar en casa.</p>";
});
btnInventario.addEventListener("click", function() {
    // Lógica para mostrar la sección de inventario
    contenido.innerHTML = "<h2>Inventario</h2><p>Aquí puedes gestionar el inventario de ingredientes.</p>";
});
btnCalendario.addEventListener("click", function() {
    // Lógica para mostrar la sección de calendario
    contenido.innerHTML = "<h2>Calendario</h2><p>Aquí puedes planificar tus comidas semanalmente.</p>";
});