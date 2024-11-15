document.addEventListener('DOMContentLoaded', () => {
    // Obtener los elementos necesarios
    const track = document.querySelector('.carousel__track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel__control--next');
    const prevButton = document.querySelector('.carousel__control--prev');
  
    let currentIndex = 0;

    // Función para mover el carrusel
    const moveToSlide = (index) => {
        const slideWidth = slides[0].getBoundingClientRect().width; // Obtener el ancho de una imagen
        console.log(`Moving to slide ${index}`);
        track.style.transform = `translateX(-${index * slideWidth}px)`; // Desplazar el track
        currentIndex = index; // Actualizar el índice
    };

    // Función para pasar a la siguiente imagen
    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % slides.length; // Avanzar al siguiente slide
        moveToSlide(nextIndex);
    };

    // Función para retroceder a la imagen anterior
    const prevSlide = () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length; // Retroceder al slide anterior
        moveToSlide(prevIndex);
    };

    // Agregar eventos a los botones "Siguiente" y "Anterior"
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
});
