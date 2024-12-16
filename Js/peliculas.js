document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7185/api"; 

    // Selecciona todas las películas
    const peliculas = document.querySelectorAll(".pelicula");

    peliculas.forEach((peliculaElement) => {
        const peliculaId = peliculaElement.dataset.id;

        fetch(`${API_URL}/pelicula/${peliculaId}`)
            .then(response => {
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

function redirigirConID(elemento) {
    // Encuentra el contenedor padre (.pelicula) y obtiene el data-id
    const peliculaId = elemento.closest('.pelicula').dataset.id;

    // Construye la URL con el parámetro ?id=valor
    window.location.href = `/Peliculas/DetallePelicula.html?idPelicula=${peliculaId}`;
}




