document.addEventListener('DOMContentLoaded', () => {
    const botonComprar = document.getElementById('boton-comprar');
    
    botonComprar.addEventListener('click', () => {
        alert('¡Las entradas han sido compradas con éxito!');
        window.location.href = 'ticket.html'; // Cambia 'home.html' al enlace correcto de tu página de inicio
    });
});