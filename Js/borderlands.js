document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7185/api"; 

    fetch(`${API_URL}/pelicula/2`)
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

    const fetchFunciones = async () => {
        try {
            const response = await fetch(`${API_URL}/Funcion`);
            if (!response.ok) {
                throw new Error("Error al obtener las funciones.");
            }
            const funciones = await response.json();

            const funcionesFiltradas = funciones.filter(funcion => [1, 2, 3].includes(funcion.id));

            const botones = document.querySelectorAll(".pelicula-botones .btn-opcion");
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
            console.error("Hubo un problema con el fetch de funciones:", error);
        }
    };

    fetchFunciones();
});
