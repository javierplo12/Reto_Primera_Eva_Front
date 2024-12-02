document.addEventListener('DOMContentLoaded', () => {
    // Recuperar variable corrreo del localStorage
    const correo = localStorage.getItem('correo');
    if (correo) {
        const correoElemento = document.querySelector('.correo-confirmacion');
        correoElemento.textContent = `Recibirás un correo de confirmación en: ${correo}`;
    } else {
        console.log('No se encontró el correo del cliente.');
    }

    // Recuperar los otros datos desde localStorage
    const pelicula = localStorage.getItem('pelicula');
    const dia = localStorage.getItem('dia');
    const horario = localStorage.getItem('horario');
    const sala = localStorage.getItem('sala');
    const butacas = JSON.parse(localStorage.getItem('butacas'));
    const precioTotal = localStorage.getItem('precioTotal');

    // Si no se encuentran datos, mostramos un mensaje
    if (!pelicula || !dia || !horario || !sala || !butacas || !precioTotal) {
        alert('Algunos datos del pedido están incompletos.');
        return;
    }

    console.log('Datos recuperados desde localStorage:', {
        pelicula,
        dia,
        horario,
        sala,
        butacas,
        precioTotal
    });

    // Mostrar los valores en el DOM
    document.getElementById('nombre-pelicula').textContent = `Película: ${pelicula}`;
    document.getElementById('dia').textContent = `Día: ${dia}`;
    document.getElementById('hora').textContent = `Hora: ${horario}`;
    document.getElementById('nombre-sala').textContent = `Sala: ${sala}`;

    // Mostrar las butacas seleccionadas
    const listaButacas = document.getElementById('lista-butacas');
    butacas.forEach((butaca) => {
        const li = document.createElement('li');
        li.textContent = butaca;    
        listaButacas.appendChild(li);
    });

    // Mostrar el precio total
    document.getElementById('precio-total').textContent = `Precio Total: ${precioTotal}`;

    // Crear un objeto con los datos del pedido
    const nuevoPedido = {
        pelicula: pelicula,
        dia: dia,
        hora: horario,
        butacasSeleccionadas: butacas.join(', '),
        precio: parseFloat(precioTotal)
    };

    // Enviar el pedido a la API
    fetch('https://http://100.27.98.53:7185/api/Pedido', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPedido)
    })
    .then(response => response.json())  // Asegúrate de convertir la respuesta a JSON
    .then(data => {
        if (data) {
            console.log('Pedido creado exitosamente en la API:', data);
        }
    })
    .catch(error => {
        console.error('Error al crear el pedido:', error);
        alert('Hubo un error al guardar el pedido.');
    });
});
