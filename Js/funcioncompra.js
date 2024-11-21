document.addEventListener("DOMContentLoaded", () => {
    console.log("JS cargado correctamente");

    // Mostrar solo las sesiones del día seleccionado
    const selectDia = document.getElementById("select-dia");
    const botonesDias = document.querySelectorAll("[data-dia]");

    function mostrarSesiones(dia) {
        botonesDias.forEach((div) => {
            if (div.getAttribute("data-dia") === dia) {
                div.style.display = "block";
            } else {
                div.style.display = "none";
            }
        });
    }

    // Mostrar las sesiones del primer día por defecto
    mostrarSesiones("1/12");

    // Cambiar las sesiones cuando el usuario selecciona otro día
    selectDia.addEventListener("change", (e) => {
        const diaSeleccionado = e.target.value;
        mostrarSesiones(diaSeleccionado);
    });

    function mostrarModal(horario, sala) {
        console.log(`Mostrando modal: Horario - ${horario}, Sala - ${sala}`);
        document.getElementById("info-horario").innerText = `Horario: ${horario}`;
        document.getElementById("info-sala").innerText = sala;
        const modal = document.getElementById("modal-info");
        modal.classList.add("mostrar");
    }

    // Función para cerrar el modal
    function cerrarModal() {
        console.log("Cerrando modal");
        const modal = document.getElementById("modal-info");
        modal.classList.remove("mostrar");
    }

    // Función para comprar entrada
    function comprarEntrada() {
        // Obtén el contenido del horario, sala e id de función desde el modal
        const horario = document.getElementById("info-horario").innerText.replace("Horario: ", "").trim(); 
        const sala = document.getElementById("info-sala").innerText.trim(); 
        const id = document.getElementById("data-id");

    
        // Construye la URL con los parámetros de la función
        const url = `/butacas.html?horario=${encodeURIComponent(horario)}&sala=${encodeURIComponent(sala)}&id=${encodeURIComponent(id)}`;
    
        // Muestra la URL en la consola (útil para depuración)
        console.log(`Redirigiendo a: ${url}`);
    
        // Redirige a la página de butacas
        window.location.href = url;
    }
    
    

    document.querySelectorAll(".btn-opcion").forEach((boton) => {
        boton.addEventListener("click", () => {
            const horario = boton.getAttribute("data-horario");
            const sala = boton.getAttribute("data-sala");
            mostrarModal(horario, sala);
        });
    });

    // Asignar evento para cerrar el modal
    document.querySelector(".btn-cerrar").addEventListener("click", cerrarModal);

    // Asignar evento para comprar entrada
    document.querySelector(".btn-comprar-entrada").addEventListener("click", comprarEntrada);
});
