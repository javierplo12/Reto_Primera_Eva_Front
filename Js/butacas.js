let precioButaca;
const butacasSeleccionadas = new Set();
const params = new URLSearchParams(window.location.search);

// Recuperar las variables de la URL
const pelicula = params.get('pelicula');
const idFuncion = params.get('id');
console.log('ID de función:', idFuncion);

// Recuperar las variables de la URL
document.addEventListener('DOMContentLoaded', () => {
    const peliculaElement = document.getElementById('nombre-pelicula');
    if (peliculaElement) {
        peliculaElement.textContent = `Película: ${pelicula}`;
    }
    // Verificar el estado del botón al cargar la página
    verificarEstadoBoton();
});

async function cargarButacas() {
    try {
        const response = await fetch(`https://localhost:7185/api/Funcion/${idFuncion}`);
        if (response.ok) {
            const datos = await response.json();
            generarButacas(datos.butacas);
            precioButaca = 5;
            console.log('Butacas cargadas:', datos.butacas);

            cargarEstadoButacas(); // Cargar el estado de las butacas desde localStorage
        } else {
            console.error('Error al cargar las butacas:', response.status);
        }
    } catch (error) {
        console.error('Error al cargar las butacas:', error);
    }
}

function generarButacas(butacas) {
    const salaCine = document.getElementById('sala-cine');
    salaCine.innerHTML = '';

    const filas = agruparPorFilas(butacas);

    filas.forEach((fila) => {
        const filaDiv = document.createElement('div');
        filaDiv.classList.add('fila');

        fila.forEach((butaca) => {
            const butacaDiv = document.createElement('div');
            butacaDiv.className = 'butaca';
            butacaDiv.dataset.id = butaca.nombre;
            butacaDiv.setAttribute('role', 'button');

            // Bloquear las butacas ocupadas
            if (butaca.estaOcupada) {
                butacaDiv.classList.add('ocupada');
                butacaDiv.dataset.bloqueado = 'true';
            }

            // Deshabilitar la interacción con las butacas ocupadas
            if (butacaDiv.dataset.bloqueado === 'true') {
                butacaDiv.style.pointerEvents = 'none'; // Deshabilitar clics en butacas bloqueadas
            }

            butacaDiv.addEventListener('click', () => seleccionarButaca(butacaDiv));

            filaDiv.appendChild(butacaDiv);
        });

        salaCine.appendChild(filaDiv);
    });
}

function agruparPorFilas(butacas) {
    const filas = {};

    butacas.forEach((butaca) => {
        const [fila] = butaca.nombre.split('-');
        if (!filas[fila]) filas[fila] = [];
        filas[fila].push(butaca);
    });

    return Object.values(filas);
}

function seleccionarButaca(butacaElemento) {
    if (butacaElemento.dataset.bloqueado === 'true') return;  // No hacer nada si está bloqueada

    const id = butacaElemento.dataset.id;

    if (!butacaElemento.classList.toggle('seleccionada')) {
        butacasSeleccionadas.delete(id);
    } else {
        butacasSeleccionadas.add(id);
    }

    actualizarButacasSeleccionadas();
    actualizarPrecioTotal();
    actualizarEstadoButacas();
    verificarEstadoBoton();  // Verifica el estado del botón después de seleccionar una butaca
}

function verificarEstadoBoton() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const formularioCompleto = nombre !== '' && correo !== '' && telefono !== '';
    const hayButacasSeleccionadas = butacasSeleccionadas.size > 0;
    const botonComprar = document.getElementById('boton-comprar');
    botonComprar.disabled = !(formularioCompleto && hayButacasSeleccionadas);
}

function actualizarEstadoButacas() {
    const butacasEstado = [];
    const allButacas = document.querySelectorAll('.butaca');

    allButacas.forEach((butaca) => {
        butacasEstado.push({
            id: butaca.dataset.id,
            ocupada: butaca.classList.contains('seleccionada') || butaca.classList.contains('ocupada')
        });
    });

    localStorage.setItem(`estadoButacas-${idFuncion}`, JSON.stringify(butacasEstado));

    // Llamada PUT para actualizar el estado de las butacas en el servidor
    actualizarEstadoEnServidor(butacasEstado);
}

async function actualizarEstadoEnServidor(butacasEstado) {
    try {
        const response = await fetch(`https://localhost:7185/api/Funcion/${idFuncion}/actualizarButacas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(butacasEstado)
        });

        if (response.ok) {
            console.log('Estado de las butacas actualizado en el servidor');
        } else {
            console.error('Error al actualizar las butacas en el servidor:', response.status);
        }
    } catch (error) {
        console.error('Error al enviar la solicitud PUT:', error);
    }
}

function cargarEstadoButacas() {
    const estadoButacas = JSON.parse(localStorage.getItem(`estadoButacas-${idFuncion}`)) || [];

    estadoButacas.forEach(({ id, ocupada }) => {
        const butaca = document.querySelector(`.butaca[data-id="${id}"]`);
        if (butaca) {
            if (ocupada) {
                butaca.classList.add('seleccionada');
                butaca.style.pointerEvents = 'none'; // Bloquear la butaca al cargarla como seleccionada
            }
        }
    });
}

function actualizarButacasSeleccionadas() {
    const lista = document.getElementById('butacas-seleccionadas');
    lista.innerHTML = '';

    for (const butaca of butacasSeleccionadas) {
        const li = document.createElement('li');
        li.textContent = butaca;
        lista.appendChild(li);
    }
}

function actualizarPrecioTotal() {
    const totalPrecio = butacasSeleccionadas.size * precioButaca;
    const precioElement = document.getElementById('precio-total');
    precioElement.textContent = `Precio Total: ${totalPrecio.toFixed(2)} €`;
}

document.addEventListener('DOMContentLoaded', async () => {
    await cargarButacas();
    actualizarButacasSeleccionadas();

    // Agregar listeners a los inputs del formulario
    const formularioInputs = document.querySelectorAll('#nombre, #correo, #telefono');
    formularioInputs.forEach(input => {
        input.addEventListener('input', verificarEstadoBoton);  // Verificar el estado del botón cada vez que el usuario interactúe
    });
});

// Evento para el botón "Comprar"
const botonComprar = document.getElementById('boton-comprar');

botonComprar.addEventListener('click', () => {
    const params = new URLSearchParams(window.location.search);
    const pelicula = params.get('pelicula');
    const dia = params.get('dia');
    const horario = params.get('horario');
    const sala = params.get('sala');

    // Guardar los datos en localStorage
    localStorage.setItem('pelicula', pelicula);
    localStorage.setItem('horario', horario);
    localStorage.setItem('sala', sala);
    localStorage.setItem('dia', dia);

    const butacas = Array.from(
        document.getElementById('butacas-seleccionadas').children
    ).map((li) => li.textContent);
    localStorage.setItem('butacas', JSON.stringify(butacas));

    const precioTotal = document
        .getElementById('precio-total')
        .textContent.split(': ')[1];
    localStorage.setItem('precioTotal', precioTotal);

    // Redirigir a la página de ticket.html
    window.location.href = 'ticket.html';
});
