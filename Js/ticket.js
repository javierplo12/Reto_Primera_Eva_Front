// Recuperar datos de localStorage
const pelicula = localStorage.getItem('pelicula');
const butacas = JSON.parse(localStorage.getItem('butacas'));

// Insertar los datos en el HTML
document.getElementById('nombre-pelicula').textContent = pelicula || 'Película no seleccionada';

const listaButacas = document.getElementById('lista-butacas');
if (butacas && butacas.length > 0) {
    butacas.forEach(butaca => {
        const li = document.createElement('li');
        li.textContent = butaca;
        listaButacas.appendChild(li);
    });
} else {
    listaButacas.textContent = 'No se seleccionaron butacas.';
}