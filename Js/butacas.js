let precioButaca = 0;
const butacasSeleccionadas = new Set();

// Recuperar las variables de la URL
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    // Recuperar las variables de la URL
    const pelicula = params.get('pelicula');
    const horario = params.get('horario');
    const sala = params.get('sala');

    // Mostrar en consola para verificar
    console.log('Pelicula:', pelicula);
    console.log('Horario:', horario);
    console.log('Sala:', sala);

    // Aquí podrías usar las variables para mostrarlas en el DOM si es necesario
    const peliculaElement = document.getElementById('nombre-pelicula');
    if (peliculaElement) {
        peliculaElement.textContent = `Película: ${pelicula}`;
    }
});

async function cargarButacas() {
    try {
        const response = await fetch('https://localhost:7185/api/Funcion/53');
        if (response.ok) {
            const datos = await response.json();
            generarButacas(datos.butacas);
            precioButaca = datos.precio || 5;
            console.log('Butacas cargadas:', datos.butacas);

            // Cargar el estado de las butacas desde localStorage
            cargarEstadoButacas();
        } else {
            console.error('Error al cargar las butacas');
        }
    } catch (error) {
        console.error('Error al cargar las butacas:', error);
    }
}

function generarButacas(butacas) {
    const salaCine = document.getElementById('sala-cine');
    salaCine.innerHTML = '';

    const filas = agruparPorFilas(butacas);

    filas.forEach((fila, filaIndex) => {
        const filaDiv = document.createElement('div');
        filaDiv.classList.add('fila');

        fila.forEach((butaca) => {
            const butacaDiv = document.createElement('div');
            butacaDiv.className = 'butaca';
            butacaDiv.dataset.id = butaca;
            butacaDiv.setAttribute('role', 'button');

            butacaDiv.addEventListener('click', () => seleccionarButaca(butacaDiv));

            filaDiv.appendChild(butacaDiv);
        });

        salaCine.appendChild(filaDiv);
    });
}

function agruparPorFilas(butacas) {
    const filas = {};

    butacas.forEach((butaca) => {
        const [fila] = butaca.split('-');
        if (!filas[fila]) filas[fila] = [];
        filas[fila].push(butaca);
    });

    return Object.values(filas);
}

function seleccionarButaca(butacaElemento) {
    if (butacaElemento.dataset.bloqueado === 'true') return;
    butacaElemento.dataset.bloqueado = 'true';

    const id = butacaElemento.dataset.id;

    if (!butacaElemento.classList.toggle('seleccionada')) {
        butacasSeleccionadas.delete(id);
    } else {
        butacasSeleccionadas.add(id);
    }

    actualizarButacasSeleccionadas();
    actualizarPrecioTotal();

    // Guardar el estado actualizado en localStorage
    actualizarEstadoButacas();

    setTimeout(() => (butacaElemento.dataset.bloqueado = 'false'), 300);
}

// Función para almacenar el estado de las butacas (ocupadas o no)
function actualizarEstadoButacas() {
    const butacasEstado = [];
    const allButacas = document.querySelectorAll('.butaca');

    allButacas.forEach((butaca) => {
        // Verificamos si la butaca está ocupada
        butacasEstado.push({
            id: butaca.dataset.id,
            ocupada: butaca.classList.contains('seleccionada') || butaca.dataset.bloqueado === 'true'
        });
    });

    // Guardamos el estado de las butacas en localStorage
    localStorage.setItem('estadoButacas', JSON.stringify(butacasEstado));
}

// Cargar el estado de las butacas desde localStorage
function cargarEstadoButacas() {
    const estadoButacas = JSON.parse(localStorage.getItem('estadoButacas')) || [];

    // Recorremos todas las butacas y las marcamos según el estado guardado
    estadoButacas.forEach(({ id, ocupada }) => {
        const butaca = document.querySelector(`.butaca[data-id="${id}"]`);
        if (butaca) {
            if (ocupada) {
                butaca.classList.add('seleccionada');
                butaca.dataset.bloqueado = 'true';  // Para evitar que se seleccione de nuevo
            }
        }
    });
}

function actualizarButacasSeleccionadas() {
    const lista = document.getElementById('butacas-seleccionadas');
    lista.innerHTML = '';

    if (butacasSeleccionadas.size > 0) {
        for (const butaca of butacasSeleccionadas) {
            const li = document.createElement('li');
            li.textContent = butaca;
            lista.appendChild(li);
        }
    }
}

function actualizarPrecioTotal() {
    const totalPrecio = butacasSeleccionadas.size * precioButaca;
    const precioElement = document.getElementById('precio-total');
    precioElement.textContent = `Precio Total: ${totalPrecio.toFixed(2)} €`;

    // Guardar el precio en localStorage
    localStorage.setItem('precioTotal', totalPrecio.toFixed(2));

    document.getElementById('boton-comprar').disabled = butacasSeleccionadas.size === 0;
}

document.addEventListener('DOMContentLoaded', async () => {
    await cargarButacas();
    actualizarButacasSeleccionadas();
});

document.addEventListener('DOMContentLoaded', () => {
    const botonComprar = document.getElementById('boton-comprar');

    botonComprar.addEventListener('click', () => {
        // Recuperar los parámetros actuales de la URL
        const params = new URLSearchParams(window.location.search);
        const pelicula = params.get('pelicula');
        const horario = params.get('horario');
        const sala = params.get('sala');

        // Guardar los datos de la URL en localStorage
        localStorage.setItem('pelicula', pelicula);
        localStorage.setItem('horario', horario);
        localStorage.setItem('sala', sala);

        // Guardar las butacas seleccionadas
        const butacas = Array.from(
            document.getElementById('butacas-seleccionadas').children
        ).map((li) => li.textContent);
        localStorage.setItem('butacas', JSON.stringify(butacas));

        // Guardar el precio total
        const precioTotal = document
            .getElementById('precio-total')
            .textContent.split(': ')[1];
        localStorage.setItem('precioTotal', precioTotal);

        // Redirigir a la nueva página
        window.location.href = `/ticket.html`;
    });
});

// Función para reiniciar el estado de las butacas (vaciar todas)
function reiniciarButacas() {
    // Limpiar las butacas seleccionadas
    butacasSeleccionadas.clear();

    // Limpiar localStorage
    localStorage.removeItem('estadoButacas');
    localStorage.removeItem('butacas');
    localStorage.removeItem('precioTotal');

    // Eliminar la clase 'seleccionada' de todas las butacas
    const allButacas = document.querySelectorAll('.butaca');
    allButacas.forEach((butaca) => {
        butaca.classList.remove('seleccionada');
        butaca.dataset.bloqueado = 'false'; // Asegurar que las butacas estén desbloqueadas
    });

    // Limpiar la lista de butacas seleccionadas
    actualizarButacasSeleccionadas();
    actualizarPrecioTotal();
}

// Llamar a esta función cuando quieras reiniciar el estado, por ejemplo con un botón:
const botonReiniciar = document.getElementById('boton-reiniciar');
if (botonReiniciar) {
    botonReiniciar.addEventListener('click', reiniciarButacas);
}
