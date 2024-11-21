let precioButaca = 0;

const butacas = [
    [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const butacasSeleccionadas = new Set(); // Cambiado a Set para evitar duplicados y mejorar eficiencia

async function cargarPrecioButaca() {
    try {
        const response = await fetch('https://localhost:7185/api/Entrada');
        if (response.ok) {
            const entradas = await response.json();
            precioButaca = entradas[0]?.Precio || 5;
            console.log('Precio cargado:', precioButaca);
        } else {
            throw new Error('No se pudo obtener el precio.');
        }
    } catch (error) {
        precioButaca = 5;
        console.error('Error al cargar el precio:', error);
    }
}

function generarButacas() {
    const salaCine = document.getElementById('sala-cine');
    salaCine.innerHTML = ''; // Limpiar contenido previo

    butacas.forEach((fila, filaIndex) => {
        const filaDiv = document.createElement('div');
        filaDiv.classList.add('fila');

        fila.forEach((butaca, butacaIndex) => {
            const butacaDiv = document.createElement('div');
            butacaDiv.className = 'butaca';
            butacaDiv.dataset.id = `${filaIndex + 1}-${butacaIndex + 1}`;
            butacaDiv.setAttribute('role', 'button');
            butacaDiv.setAttribute('aria-disabled', butaca === 0);

            if (butaca === 1) {
                butacaDiv.addEventListener('click', () => seleccionarButaca(butacaDiv));
            } else {
                butacaDiv.classList.add('no-disponible');
            }

            filaDiv.appendChild(butacaDiv);
        });

        salaCine.appendChild(filaDiv);
    });
}

function seleccionarButaca(butacaElemento) {
    if (butacaElemento.dataset.bloqueado === "true") return;
    butacaElemento.dataset.bloqueado = "true";

    const id = butacaElemento.dataset.id;

    if (!butacaElemento.classList.toggle('seleccionada')) {
        butacasSeleccionadas.delete(id);
    } else {
        butacasSeleccionadas.add(id);
    }

    actualizarButacasSeleccionadas();
    actualizarPrecioTotal();

    setTimeout(() => (butacaElemento.dataset.bloqueado = "false"), 300);
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
    await cargarPrecioButaca();
    generarButacas();
    actualizarButacasSeleccionadas();
});
