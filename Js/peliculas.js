document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7185/api"; 

    // Selecciona todas las películas
    const peliculas = document.querySelectorAll(".pelicula");

    peliculas.forEach((peliculaElement) => {
        const peliculaId = peliculaElement.dataset.id;

        fetch(`${API_URL}/pelicula/${peliculaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener la información de la película con ID ${peliculaId}`);
                }
                return response.json();
            })
            .then(pelicula => {
                // Actualiza el contenedor con la información de la película
                const imgElement = peliculaElement.querySelector("img");
                const titleElement = peliculaElement.querySelector("h3");

                imgElement.src = pelicula.imagen;
                imgElement.alt = pelicula.nombre;
                titleElement.textContent = pelicula.nombre;

            })
            .catch(error => {
                console.error(error);
            });
    });
});
