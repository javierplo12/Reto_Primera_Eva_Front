// Array de butacas: 0 significa que no hay butaca, 1 significa que hay una butaca disponible
const butacas = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Fila 1
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Fila 2
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Fila 3
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Fila 4
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Fila 5
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Fila 6
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Fila 7
];

// Función para generar las butacas en la sala
function generarButacas() {
    const salaCine = document.getElementById('sala-cine');
    salaCine.innerHTML = ''; // Limpiar cualquier contenido previo

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
    // Prevenir múltiples clics rápidos
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

    // Desbloquear clics tras una breve pausa
    setTimeout(() => (butacaElemento.dataset.bloqueado = "false"), 300);
}

// Llamar a la función para generar las butacas al cargar la página
document.addEventListener('DOMContentLoaded', generarButacas);
