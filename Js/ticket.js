document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los datos desde localStorage
    const pelicula = localStorage.getItem('pelicula');
    const dia = localStorage.getItem('dia');
    const horario = localStorage.getItem('horario');
    const sala = localStorage.getItem('sala');
    const butacas = JSON.parse(localStorage.getItem('butacas'));
    const precioTotal = localStorage.getItem('precioTotal');

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

    const nuevoPedido = {
        pelicula: pelicula || "Sin título", 
        dia: dia || "Sin día",
        hora: horario || "Sin hora",
        butacasSeleccionadas: butacas.join(', ') || "Sin butacas",
        precio: parseFloat(precioTotal) || 0
    };

    fetch('https://localhost:7185/api/Pedido', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPedido)
    })
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
    
