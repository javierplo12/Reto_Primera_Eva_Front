function toggleMenu() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('show');

    // Si el menú está visible, añadimos un evento de clic para cerrar al hacer clic fuera
    if (dropdownMenu.classList.contains('show')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

function closeMenuOnClickOutside(event) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const logo = document.querySelector('.logo');

    // Verifica que el clic no haya sido dentro del menú, en el icono de menú o en el logo
    if (
        !dropdownMenu.contains(event.target) &&
        !menuIcon.contains(event.target) &&
        !logo.contains(event.target)
    ) {
        dropdownMenu.classList.remove('show');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Selecciona el contenedor principal
        const imagenesHome = document.querySelector(".imagenes_home");

        // Crea un nuevo contenedor para las imágenes en fila
        const filaImagenes = document.createElement("div");
        filaImagenes.className = "fila-imagenes";
        imagenesHome.insertBefore(filaImagenes, imagenesHome.firstChild);

        // Película izquierda
        const peliculaIzquierda = await (await fetch("http://localhost:7185/api/pelicula/1")).json();
        const enlaceIzquierda = document.createElement("a");
        enlaceIzquierda.href = `/Peliculas/venom.html`; // Redirige a la página de la película
        const imagenIzquierda = document.createElement("div");
        imagenIzquierda.className = "imagen-pelicula izquierda";
        imagenIzquierda.innerHTML = `<img src="${peliculaIzquierda.imagen}" alt="Película Izquierda">`;
        enlaceIzquierda.appendChild(imagenIzquierda);
        filaImagenes.appendChild(enlaceIzquierda);

        // Imagen central (queda igual)
        const imagenCentral = document.querySelector(".imagen-centro");
        filaImagenes.appendChild(imagenCentral);

        // Película derecha
        const peliculaDerecha = await (await fetch("http://localhost:7185/api/pelicula/3")).json();
        const enlaceDerecha = document.createElement("a");
        enlaceDerecha.href = `/Peliculas/gladiator2.html`; // Redirige a la página de la película
        const imagenDerecha = document.createElement("div");
        imagenDerecha.className = "imagen-pelicula derecha";
        imagenDerecha.innerHTML = `<img src="${peliculaDerecha.imagen}" alt="Película Derecha">`;
        enlaceDerecha.appendChild(imagenDerecha);
        filaImagenes.appendChild(enlaceDerecha);
    } catch (error) {
        console.error("Error al obtener la información de las películas:", error);
    }
});



