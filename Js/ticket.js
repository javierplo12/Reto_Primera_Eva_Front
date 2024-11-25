document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los datos desde localStorage
    const pelicula = localStorage.getItem('pelicula');
    const horario = localStorage.getItem('horario');
    const sala = localStorage.getItem('sala');
    const butacas = JSON.parse(localStorage.getItem('butacas'));
    const precioTotal = localStorage.getItem('precioTotal');

    console.log('Datos recuperados desde localStorage:', {
        pelicula,
        horario,
        sala,
        butacas,
        precioTotal
    });

    // Mostrar los valores en el DOM
    document.getElementById('nombre-pelicula').textContent = `Película: ${pelicula}`;
    document.getElementById('hora').textContent = `Hora: ${horario}`;
    document.getElementById('nombre-sala').textContent = `${sala}`;

    // Mostrar las butacas seleccionadas
    const listaButacas = document.getElementById('lista-butacas');
    butacas.forEach((butaca) => {
        const li = document.createElement('li');
        li.textContent = butaca;
        listaButacas.appendChild(li);
    });

    // Mostrar el precio total
        document.getElementById('precio-total').textContent = `Precio Total: ${precioTotal}`;
});