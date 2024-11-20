document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7185/api"; 

    fetch(`${API_URL}/pelicula/3`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener la información de la película.");
            }
            return response.json();
        })
        .then(pelicula => {
            document.querySelector(".pelicula-imagen img").src = pelicula.imagen;
            document.querySelector(".pelicula-info h2").textContent = pelicula.nombre;
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
                }
            });
        } catch (error) {
            console.error(`Hubo un problema con el fetch de funciones para el día ${dia}:`, error);
        }
    };

    // Llamadas para los 3 días
    fetchFuncionesPorDia(1, ".pelicula-botones-dia-1", [4, 5, 6]); // Día 1
    fetchFuncionesPorDia(2, ".pelicula-botones-dia-2", [46, 47, 48]); // Día 2
    fetchFuncionesPorDia(3, ".pelicula-botones-dia-3", [76, 77, 78]); // Día 3
});
