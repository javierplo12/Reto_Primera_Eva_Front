let precioButaca;
const butacasSeleccionadas = new Set();

// Recuperar las variables de la URL
const params = new URLSearchParams(window.location.search);
const pelicula = params.get('pelicula');
const dia = params.get('dia');
const horario = params.get('horario');
const sala = params.get('sala');
const idFuncion = params.get('id');
console.log('ID de función:', idFuncion);

// Mostrar la información de la película al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    // Asignamos los valores de las variables a los elementos correspondientes en el HTML
    const peliculaElement = document.querySelector(".pelicula-seleccionada");
    const diaElement = document.querySelector(".dia-pelicula");
    const horaElement = document.querySelector(".hora-pelicula");
    const salaElement = document.querySelector(".sala-pelicula");

    if (peliculaElement && diaElement && horaElement && salaElement) {
        peliculaElement.textContent = `Película: ${pelicula}`;
        diaElement.textContent = `Día: ${dia}`;
        horaElement.textContent = `Hora: ${horario}`;
        salaElement.textContent = `${sala}`;
    }

    // Cargar las butacas
    await cargarButacas();

    // Agregar listeners a los inputs del formulario
    const formularioInputs = document.querySelectorAll('#nombre, #correo, #telefono');
    formularioInputs.forEach((input) => {
        input.addEventListener('input', verificarEstadoBoton); 
    });

    verificarEstadoBoton();
});

async function cargarButacas() {
    try {
        const response = await fetch(`http://100.27.98.53:7185/api/Funcion/${idFuncion}`);
        if (response.ok) {
            const datos = await response.json();
            generarButacas(datos.butacas);
            precioButaca = 5;
            console.log('Butacas cargadas:', datos.butacas);
        } else {
            console.error('Error al cargar las butacas:', response.status);
        }
    } catch (error) {
        console.error('Error al cargar las butacas:', error);
    }
}

function generarButacas(butacas) {
    const salaCine = document.getElementById('sala-cine');

    const filas = agruparPorFilas(butacas);

    filas.forEach((fila) => {
        const filaDiv = document.createElement('div');
        filaDiv.classList.add('fila');

        fila.forEach((butaca) => {
            const butacaDiv = document.createElement('div');
            butacaDiv.className = 'butaca';
            butacaDiv.dataset.id = butaca.nombre;
            butacaDiv.setAttribute('role', 'button');

            // Marcar las butacas ocupadas según el estado de la API
            if (butaca.estaOcupada) {
                butacaDiv.classList.add('no-disponible');
                butacaDiv.dataset.bloqueado = 'true';
                butacaDiv.style.pointerEvents = 'none'; // Deshabilitar clics
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
    if (butacaElemento.dataset.bloqueado === 'true') return;

    const id = butacaElemento.dataset.id;

    // Alternar la clase seleccionada
    if (!butacaElemento.classList.toggle('seleccionada')) {
        butacasSeleccionadas.delete(id);
    } else {
        butacasSeleccionadas.add(id);
    }

    actualizarListaButacasSeleccionadas();
    actualizarPrecioTotal();
}

function verificarEstadoBoton() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    localStorage.setItem('correo', correo); // Guardamos el valor correo en un localstorage para mostrarlo en ticket
    const telefono = document.getElementById('telefono').value.trim();
    const formularioCompleto = nombre !== '' && correo !== '' && telefono !== '';
    const hayButacasSeleccionadas = butacasSeleccionadas.size > 0;
    const botonComprar = document.getElementById('boton-comprar');
    botonComprar.disabled = !(formularioCompleto && hayButacasSeleccionadas);
}

function actualizarPrecioTotal() {
    const totalPrecio = butacasSeleccionadas.size * precioButaca;
    const precioElement = document.getElementById('precio-total');
    precioElement.textContent = `Precio Total: ${totalPrecio.toFixed(2)} €`;
}

async function actualizarEstadoButacas() {
    const allButacas = Array.from(document.querySelectorAll('.butaca'));
    const butacasEstado = allButacas.map((butaca) => {
        const estaOcupadaOriginal = butaca.classList.contains('no-disponible'); // Verificar si estaba originalmente ocupada
        return {
            nombre: butaca.dataset.id,
            estaOcupada: estaOcupadaOriginal || butaca.classList.contains('seleccionada'), // Mantener ocupado si ya lo estaba
        };
    });

    console.log('Datos enviados al servidor:', JSON.stringify(butacasEstado)); // Depuración

    // Llamada PUT para actualizar el estado de las butacas en el servidor
    await actualizarEstadoEnServidor(butacasEstado);
}

function actualizarListaButacasSeleccionadas() {
    const listaElement = document.getElementById('butacas-seleccionadas');
    listaElement.innerHTML = ''; // Limpiar la lista actual

    // Agregar cada butaca seleccionada a la lista
    butacasSeleccionadas.forEach((butaca) => {
        const li = document.createElement('li');
        li.textContent = butaca; 
        listaElement.appendChild(li);
    });

    // Si no hay butacas seleccionadas, mostrar este mensaje
    if (butacasSeleccionadas.size === 0) {
        listaElement.innerHTML = '<li>No has seleccionado ninguna butaca.</li>';
    }
}

async function actualizarEstadoEnServidor(butacasEstado) {
    try {
        const response = await fetch(`http://100.27.98.53:7185/api/Funcion/${idFuncion}/butacas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(butacasEstado),
        });

        if (response.ok) {
            console.log('Estado de las butacas actualizado en el servidor');
        } else {
            const errorText = await response.text();
            console.error('Error al actualizar las butacas en el servidor:', response.status, errorText);
        }
    } catch (error) {
        console.error('Error al enviar la solicitud PUT:', error);
    }
}

// Evento para el botón "Comprar"
const botonComprar = document.getElementById('boton-comprar');

botonComprar.addEventListener('click', async () => {
    // Guardar los datos en localStorage para mostrarlos en ticket.html
    localStorage.setItem('pelicula', pelicula);
    localStorage.setItem('horario', horario);
    localStorage.setItem('sala', sala);
    localStorage.setItem('dia', dia);

    // Asignamos los valores a butacas.html para mostrar la informacion de la pelicula ahi tambien
    const peliculaElement = document.querySelector(".pelicula-seleccionada");
    const diaElement = document.querySelector(".dia-pelicula");
    const horaElement = document.querySelector(".hora-pelicula");

    // Verificamos que los elementos existan y asignamos los valores
    if (peliculaElement && diaElement && horaElement) {
        peliculaElement.textContent = `Película: ${pelicula}`;
        diaElement.textContent = `Día: ${dia}`;
        horaElement.textContent = `Hora: ${horario} - Sala: ${sala}`;
    }

    const butacas = Array.from(
        document.getElementById('butacas-seleccionadas').children
    ).map((li) => li.textContent);
    localStorage.setItem('butacas', JSON.stringify(butacas));

    const precioTotal = document
        .getElementById('precio-total')
        .textContent.split(': ')[1];
    localStorage.setItem('precioTotal', precioTotal);

    // Actualizar las butacas seleccionadas en el servidor
    await actualizarEstadoButacas();

    // Redirigir a la página a ticket.html
    window.location.href = 'ticket.html';
});
