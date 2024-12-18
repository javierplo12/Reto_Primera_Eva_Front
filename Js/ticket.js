document.addEventListener('DOMContentLoaded', () => {
    const correo = localStorage.getItem('correo');
    const nombre = localStorage.getItem('nombre');
    const telefono = localStorage.getItem('telefono');
    
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
        nombre,
        correo,
        telefono,
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
    document.getElementById('precio-total').textContent = `Precio Total: ${precioTotal}`;
    document.querySelector('.correo-confirmacion').textContent = `Recibirás un correo con las entradas en: ${correo}`;

    // Mostrar las butacas seleccionadas
    const listaButacas = document.getElementById('lista-butacas');
    butacas.forEach((butaca) => {
        const li = document.createElement('li');
        li.textContent = butaca;
        listaButacas.appendChild(li);
    });


    // Crear un objeto con los datos del pedido
    const nuevoPedido = {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        pelicula: pelicula,
        dia: dia,
        hora: horario,
        butacasSeleccionadas: butacas.join(', '),
        preciototal: parseFloat(precioTotal)
    };

    // Enviar el pedido a la API        
    fetch('https://localhost:7185/api/Pedido', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPedido)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la respuesta de la API');
            }
        })
        .then(data => {
            console.log('Pedido creado exitosamente en la API:', data);
        })
        .catch(error => {
            console.error('Error al crear el pedido:', error);
            alert('Hubo un error al guardar el pedido.');
        });

});
