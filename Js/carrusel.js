const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__control--next');
const prevButton = document.querySelector('.carousel__control--prev');

let currentIndex = 0;

// Mueve al slide especificado
const moveToSlide = (index) => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    currentIndex = index;
};

// Configura el autoplay para cambiar de imagen cada 2 segundos
const autoPlay = () => {
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    }, 2000); // Cambia cada 2 segundos
};

// Controles manuales
nextButton.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
});

prevButton.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(prevIndex);
});

// Inicia el carrusel automáticamente
autoPlay();
