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
                        modal.setAttribute("data-id", funcion.id);
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
    fetchFuncionesPorDia(1, ".pelicula-botones-dia-1", [1, 2, 3]); // Día 1
    fetchFuncionesPorDia(2, ".pelicula-botones-dia-2", [52, 53, 54]); // Día 2
    fetchFuncionesPorDia(3, ".pelicula-botones-dia-3", [64, 65, 66]); // Día 3
});

document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7185/api";

    fetch(`${API_URL}/OpinionesPelis`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener la información de las opiniones de películas.");
            }
            return response.json();
        })
        .then(opinionesPelis => {
            const opinionesContainer = document.querySelector(".opiniones");

            // Limpiamos el contenedor para evitar duplicados
            opinionesContainer.innerHTML = "<h2>Opiniones</h2>";

            // Recorremos cada opinión y generamos el HTML correspondiente
            opinionesPelis.forEach(opinion => {
                // Creamos un nuevo bloque para cada opinión
                const opinionBlock = document.createElement("div");
                opinionBlock.classList.add("opinion");

                // Usamos el formato del HTML existente
                opinionBlock.innerHTML = `
                    <p class="nombre-o"><strong>Nombre:</strong> ${opinion.nombre}</p>
                    <p class="fecha-o"><strong>Fecha:</strong> ${opinion.fechaFormated}</p>
                    <p class="opinion-o"><strong>Opinión:</strong> ${opinion.opinion}</p>
                    <p class="puntuacion-o"><strong>Puntuación:</strong> ${opinion.puntuacion}</p>
                `;

                // Añadimos el bloque al contenedor
                opinionesContainer.appendChild(opinionBlock);
            });
        })
        .catch(error => {
            console.error("Error:", error);
            document.querySelector(".opiniones").innerHTML = `<p>Ocurrió un error al cargar las opiniones.</p>`;
        });
});


document.addEventListener("DOMContentLoaded", () => {
    const nombre = document.getElementById('nombre');
    const fechaFormated = document.getElementById('fecha');
    const opinion = document.getElementById('opinion');
    const puntuacion = document.getElementById('puntuacion');
    const botonOpinion = document.getElementById('btn-enviar');

    async function GuardarOpinion() {
        // Crear el objeto con los valores de los inputs
        const nuevaOpinion = {
            nombre: nombre.value.trim(),
            fechaFormated: fechaFormated.value.trim(),
            opinion: opinion.value.trim(),
            puntuacion: puntuacion.value.trim()
        };

        // Validación básica
        if (!nuevaOpinion.nombre || !nuevaOpinion.fechaFormated || !nuevaOpinion.opinion || !nuevaOpinion.puntuacion) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch('https://localhost:7185/api/OpinionesPelis', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaOpinion) // Corregido "jsON" -> "JSON"
            });

            if (!response.ok) {
                throw new Error(`Error al guardar la opinión: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Opinión guardada exitosamente:', data);

            // Limpiar formulario después de guardar
            nombre.value = '';
            fechaFormated.value = '';
            opinion.value = '';
            puntuacion.value = '';

            alert("Opinión guardada exitosamente.");
        } catch (error) {
            console.error("Error al guardar la opinión:", error);
            alert("Hubo un error al guardar la opinión. Por favor, intenta nuevamente.");
        }
    }

    // Agregar evento al botón
    botonOpinion.addEventListener('click', async () => {
        await GuardarOpinion();
    });
});
