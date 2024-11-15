function toggleMenu() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('show');

    // Si el menú está visible, añadimos un evento de clic para cerrar al hacer clic fuera
    if (dropdownMenu.classList.contains('show')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

function closeMenuOnClickOutside(event) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const logo = document.querySelector('.logo');

    // Verifica que el clic no haya sido dentro del menú, en el icono de menú o en el logo
    if (
        !dropdownMenu.contains(event.target) &&
        !menuIcon.contains(event.target) &&
        !logo.contains(event.target)
    ) {
        dropdownMenu.classList.remove('show');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}
