let precioButaca = 0;

const butacasSeleccionadas = new Set(); 

async function cargarButacas() {
    try {
        const response = await fetch('https://localhost:7185/api/Funcion/53'); 
        if (response.ok) {
            const datos = await response.json();
            generarButacas(datos.butacas); 
            precioButaca = datos.precio || 5; 
            console.log('Butacas cargadas:', datos.butacas);
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

    setTimeout(() => (butacaElemento.dataset.bloqueado = 'false'), 300);
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

    document.getElementById('boton-comprar').disabled = butacasSeleccionadas.size === 0;
}

document.addEventListener('DOMContentLoaded', async () => {
    await cargarButacas();
    actualizarButacasSeleccionadas();
});
