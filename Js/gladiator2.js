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
            document.querySelector(".pelicula-info h2").textContent = pelicula.nombre;
            document.querySelector(".pelicula-info .director").innerHTML = `<strong>Director:</strong> ${pelicula.director}`;
            document.querySelector(".pelicula-info .descripcion").innerHTML = `<strong>Director:</strong> ${pelicula.sinopsis}`;
            document.querySelector(".pelicula-info .duracion").innerHTML = `<strong>Duración:</strong> ${pelicula.duracion} minutos`;
            document.querySelector(".pelicula-info .fecha-estreno").innerHTML = `<strong>Fecha de estreno:</strong> ${new Date(pelicula.fechaEstreno).toLocaleDateString()}`;
            document.querySelector(".pelicula-info .genero").innerHTML = `<strong>Género:</strong> ${pelicula.genero}`;
        })
        });
;
