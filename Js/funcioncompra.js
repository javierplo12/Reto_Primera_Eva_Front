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

    // Función para mostrar el modal
    function mostrarModal(horario, sala, id) {
        console.log(`Mostrando modal - Horario: ${horario}, Sala: ${sala}, ID: ${id}`);
        document.getElementById("info-horario").innerText = `Horario: ${horario}`;
        document.getElementById("info-sala").innerText = `${sala}`;
        const modal = document.getElementById("modal-info");
        modal.setAttribute("data-id", id); // Guardar el ID en el modal
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
        const pelicula = document.querySelector("h2").innerText.trim();
        const dia = document.getElementById("select-dia").value.trim();
        const horario = document.getElementById("info-horario").innerText.replace("Horario: ", "").trim();
        const sala = document.getElementById("info-sala").innerText.replace("Sala: ", "").trim();
        const modal = document.getElementById("modal-info");
        const id = modal.getAttribute("data-id");

        // Validar que todos los datos están presentes
        if (!pelicula || !dia || !horario || !sala || !id) {
            console.error("Faltan datos para realizar la compra");
            alert("Por favor, selecciona una opción válida.");
            return;
        }

        // Construir la URL con los datos
        const url = `/butacas.html?pelicula=${encodeURIComponent(pelicula)}&dia=${encodeURIComponent(dia)}&horario=${encodeURIComponent(horario)}&sala=${encodeURIComponent(sala)}&id=${encodeURIComponent(id)}`;

        console.log(`Redirigiendo a: ${url}`);
        window.location.href = url;
    }

    // Asignar eventos a los botones de horario
    document.querySelectorAll(".btn-opcion").forEach((boton) => {
        boton.addEventListener("click", () => {
            const horario = boton.getAttribute("data-horario");
            const sala = boton.getAttribute("data-sala");
            const id = boton.getAttribute("data-id"); 
            mostrarModal(horario, sala, id);
        });
    });

    // Asignar evento para cerrar el modal
    document.querySelector(".btn-cerrar").addEventListener("click", cerrarModal);

    // Asignar evento para comprar entrada
    document.querySelector(".btn-comprar-entrada").addEventListener("click", comprarEntrada);
});
