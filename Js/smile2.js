document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7185/api"; 

    fetch(`${API_URL}/pelicula/8`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener la información de la película.");
            }
            return response.json();
        })
        .then(pelicula => {
            document.querySelector(".pelicula-imagen img").src = pelicula.imagen;
            document.querySelector(".pelicula-info h2").innerHTML = pelicula.nombre;
            document.querySelector(".pelicula-info .director").innerHTML = pelicula.director;
            document.querySelector(".pelicula-info .descripcion").innerHTML = pelicula.sinopsis;
            document.querySelector(".pelicula-info .duracion").innerHTML = `${pelicula.duracion} minutos`;
            document.querySelector(".pelicula-info .fecha-estreno").innerHTML = new Date(pelicula.fechaEstreno).toLocaleDateString();
            document.querySelector(".pelicula-info .genero").innerHTML = pelicula.genero;
        })
        });
;

document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7185/api";

    const fetchFuncionesPorDia = async (dia, containerSelector, idsFunciones) => {
        try {
            const response = await fetch(`${API_URL}/Funcion`);
            if (!response.ok) {
                throw new Error("Error al obtener las funciones.");
            }
            const funciones = await response.json();

            // Filtrar funciones por IDs específicos
            const funcionesFiltradas = funciones.filter(funcion => idsFunciones.includes(funcion.id));

            // Asignar las funciones a los botones
            const botones = document.querySelectorAll(containerSelector + " .btn-opcion");
            funcionesFiltradas.forEach((funcion, index) => {
                if (botones[index]) {
                    botones[index].textContent = `${funcion.dia} - ${funcion.horaFormatted} - ${funcion.sala}`;
                    botones[index].setAttribute("data-id", funcion.id);
                    botones[index].setAttribute("data-horario", funcion.horaFormatted);
                    botones[index].setAttribute("data-dia", funcion.dia);
                    botones[index].setAttribute("data-sala", funcion.sala);

                    // Agregar evento para abrir el modal con la información correcta
                    botones[index].addEventListener("click", () => {
                        const modal = document.getElementById("modal-info");
                        modal.setAttribute("data-id", funcion.id); // Configurar el ID de función en el modal
                        document.getElementById("info-horario").innerText = `Horario: ${funcion.horaFormatted}`;
                        document.getElementById("info-sala").innerText = `${funcion.sala}`;
                    });
                }
            });
        } catch (error) {
            console.error(`Hubo un problema con el fetch de funciones para el día ${dia}:`, error);
        }
    };

    // Llamadas para los 3 días
    fetchFuncionesPorDia(1, ".pelicula-botones-dia-1", [19, 20, 21]); // Día 1
    fetchFuncionesPorDia(2, ".pelicula-botones-dia-2", [31, 32, 33]); // Día 2
    fetchFuncionesPorDia(3, ".pelicula-botones-dia-3", [67, 68, 69]); // Día 3
});
