let PRECIO_BUTACA = 0; // Inicializado en 0 y cargado desde la API

// Array de butacas: 0 significa que no hay butaca, 1 significa que hay una butaca disponible
const butacas = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Función para cargar el precio fijo de las butacas desde la API
async function cargarPrecioButaca() {
    try {
        const response = await fetch('https://localhost:7185/api/Entrada'); 
        if (response.ok) {
            const entradas = await response.json();
            if (entradas.length > 0 && entradas[0].Precio) {
                PRECIO_BUTACA = entradas[0].Precio;
                console.log('Precio cargado desde la API:', PRECIO_BUTACA);
            } else {
                PRECIO_BUTACA = 5; 
                console.warn('No se encontró el precio en la API. Usando el valor predeterminado (5€).');
            }
        }
    } catch (error) {
        console.error('Error al obtener el precio desde la API:', error);
    }
}

// Función para generar las butacas en la sala
function generarButacas() {
    const salaCine = document.getElementById('sala-cine');

    butacas.forEach((fila, filaIndex) => {
        const filaDiv = document.createElement('div');
        filaDiv.classList.add('fila');

        fila.forEach((butaca, butacaIndex) => {
            const butacaDiv = document.createElement('div');
            butacaDiv.classList.add('butaca');
            butacaDiv.setAttribute('role', 'button');
            butacaDiv.setAttribute('aria-label', `Fila ${filaIndex + 1}, Butaca ${butacaIndex + 1}`);
            butacaDiv.setAttribute('aria-disabled', butaca === 0);

            // Agregar estado de disponibilidad
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

// Función para manejar la selección de butaca
function seleccionarButaca(butacaElemento) {
    if (butacaElemento.dataset.bloqueado === "true") return;
    butacaElemento.dataset.bloqueado = "true";

    // Alternar selección
    if (!butacaElemento.classList.contains('seleccionada')) {
        butacaElemento.classList.add('seleccionada');
        butacaElemento.setAttribute('aria-pressed', 'true');
    } else {
        butacaElemento.classList.remove('seleccionada');
        butacaElemento.setAttribute('aria-pressed', 'false');
    }

    actualizarPrecioTotal();
    setTimeout(() => (butacaElemento.dataset.bloqueado = "false"), 300);
}

// Función para calcular y mostrar el precio total
function actualizarPrecioTotal() {
    const seleccionadas = document.querySelectorAll('.butaca.seleccionada').length;
    const totalPrecio = seleccionadas * PRECIO_BUTACA;

    let precioElement = document.getElementById('precio-total');
    if (!precioElement) {
        precioElement = document.createElement('p');
        precioElement.id = 'precio-total';
        document.querySelector('.sala-cine-container').appendChild(precioElement);
    }

    precioElement.textContent = `Precio Total: ${totalPrecio.toFixed(2)} €`;

    // Habilitar o deshabilitar el botón de compra
    const botonComprar = document.getElementById('boton-comprar');
    botonComprar.disabled = seleccionadas === 0;
}

// Cargar el precio y generar las butacas al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarPrecioButaca();
    generarButacas();
});
