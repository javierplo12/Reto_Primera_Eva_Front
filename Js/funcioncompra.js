document.addEventListener("DOMContentLoaded", () => {
    console.log("JS cargado correctamente");

    function mostrarModal(horario, sala) {
        console.log(`Mostrando modal: Horario - ${horario}, ${sala}`);
        document.getElementById("info-horario").innerText = `Horario: ${horario}`;
        document.getElementById("info-sala").innerText = sala;
        const modal = document.getElementById("modal-info");
        modal.classList.add("mostrar");
    }

    function cerrarModal() {
        console.log("Cerrando modal");
        const modal = document.getElementById("modal-info");
        modal.classList.remove("mostrar");
    }

    function comprarEntrada() {
        const horario = document.querySelector(".btn-comprar").getAttribute("data-horario");
        const sala = document.querySelector(".btn-comprar").getAttribute("data-sala");
        const url = `compra.html?horario=${encodeURIComponent(horario)}&sala=${encodeURIComponent(sala)}`;
        console.log(`Redirigiendo a: ${url}`);
        window.location.href = url;
    }

    document.querySelectorAll(".btn-opcion").forEach((boton) => {
        boton.addEventListener("click", () => {
            const horario = boton.getAttribute("data-horario");
            const sala = boton.getAttribute("data-sala");
            mostrarModal(horario, sala);
        });
    });

    document.querySelector(".btn-cerrar").addEventListener("click", cerrarModal);
});

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

    // Funcionalidades existentes
    function mostrarModal(horario, sala) {
        console.log(`Mostrando modal: Horario - ${horario}, Sala - ${sala}`);
        document.getElementById("info-horario").innerText = `Horario: ${horario}`;
        document.getElementById("info-sala").innerText = sala;
        const modal = document.getElementById("modal-info");
        modal.classList.add("mostrar");
    }

    function cerrarModal() {
        console.log("Cerrando modal");
        const modal = document.getElementById("modal-info");
        modal.classList.remove("mostrar");
    }

    function comprarEntrada() {
        const horario = document.querySelector(".btn-comprar").getAttribute("data-horario");
        const sala = document.querySelector(".btn-comprar").getAttribute("data-sala");
        const url = `compra.html?horario=${encodeURIComponent(horario)}&sala=${encodeURIComponent(sala)}`;
        console.log(`Redirigiendo a: ${url}`);
        window.location.href = url;
    }

    document.querySelectorAll(".btn-opcion").forEach((boton) => {
        boton.addEventListener("click", () => {
            const horario = boton.getAttribute("data-horario");
            const sala = boton.getAttribute("data-sala");
            mostrarModal(horario, sala);
        });
    });

    document.querySelector(".btn-cerrar").addEventListener("click", cerrarModal);
});
