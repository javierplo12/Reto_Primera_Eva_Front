document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7185/api";

    // Obtener el parámetro idPelicula de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = urlParams.get('idPelicula');

    console.log("ID de la película:", peliculaId);

    if (!peliculaId) {
        console.error("No se ha proporcionado un idPelicula en la URL");
        return;
    }

    // Fetch información de la película
    fetch(`${API_URL}/pelicula/${peliculaId}`)
        .then(response => {
            console.log("Respuesta fetch película:", response);
            if (!response.ok) throw new Error("Error al obtener la información de la película.");
            return response.json();
        })
        .then(pelicula => {
            console.log("Datos de la película:", pelicula);

            // Cargar datos en el DOM
            document.querySelector(".pelicula-imagen img").src = pelicula.imagen;
            document.querySelector(".pelicula-info h2").innerHTML = pelicula.nombre;
            document.querySelector(".pelicula-info .director").innerHTML = pelicula.director;
            document.querySelector(".pelicula-info .descripcion").innerHTML = pelicula.sinopsis;
            document.querySelector(".pelicula-info .duracion").innerHTML = `${pelicula.duracion} minutos`;
            document.querySelector(".pelicula-info .fecha-estreno").innerHTML = new Date(pelicula.fechaEstreno).toLocaleDateString();
            document.querySelector(".pelicula-info .genero").innerHTML = pelicula.genero;
        })
        .catch(error => console.error("Error al cargar los detalles de la película:", error));

    // Fetch funciones
    const fetchFuncionesPorDia = async (dia, containerSelector, idPelicula) => {
        console.log(`Fetching funciones para el día ${dia}...`);
        try {
            const response = await fetch(`${API_URL}/Funcion/pelicula/${idPelicula}/funciones?dia=${dia}`);
            console.log(`Respuesta funciones día ${dia}:`, response);
            if (!response.ok) throw new Error("Error al obtener las funciones.");
            const funciones = await response.json();
            console.log(`Funciones para el día ${dia}:`, funciones);

            // Asignar las funciones a los botones
            const botones = document.querySelectorAll(containerSelector + " .btn-opcion");
            funciones.forEach((funcion, index) => {
                if (botones[index]) {
                    botones[index].textContent = `${funcion.dia} - ${funcion.horaFormatted}`;
                    botones[index].setAttribute("data-id", funcion.id);
                    botones[index].setAttribute("data-horario", funcion.horaFormatted);
                    botones[index].setAttribute("data-dia", funcion.dia);
                    botones[index].setAttribute("data-sala", funcion.sala);
                }
            });
        } catch (error) {
            console.error(`Error al obtener funciones para el día ${dia}:`, error);
        }
    };

    fetchFuncionesPorDia("1/12", ".pelicula-botones-dia-1", peliculaId);
    fetchFuncionesPorDia("2/12", ".pelicula-botones-dia-2", peliculaId);
    fetchFuncionesPorDia("3/12", ".pelicula-botones-dia-3", peliculaId);
});
