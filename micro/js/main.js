const showMenu = (toggleId, navId) =>{ // Declaramos una constante y le mandamos 2 argumentos
    const toggle = document.getElementById(toggleId), // OBTIENE REFERENCIAS A 2 ELEMENTOS DEL OBJETO MODELO
        nav = document.getElementById(navId)

    toggle.addEventListener('click', () =>{ // AÑADIMOS UN EVENTO CLICK PARA QUE HAGA X COSAS
        // Añade la clase "show-menu" al nav menu 
        nav.classList.toggle('show-menu')
        // AÑADE LA CLASE show-icon Y CAMBIA EL ICONO
        toggle.classList.toggle('show-icon')
    })
}

    showMenu('nav-toggle','nav-menu')

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentSlide = 0;
let slidesToShow = 3; // Por defecto: muestra 3 imágenes
let slideWidth;

function updateSlideWidth() {
    const carousel = document.querySelector('.carousel');
    const viewportWidth = window.innerWidth;

    // Ajusta el número de imágenes visibles según el ancho de la pantalla
    if (viewportWidth <= 768) {
        slidesToShow = 1; // Móviles: 1 imagen visible
    } else if (viewportWidth <= 1024) {
        slidesToShow = 2; // Tablets: 2 imágenes visibles
    } else {
        slidesToShow = 3; // Escritorio: 3 imágenes visibles
    }

    // Calcula el ancho de cada slide
    slideWidth = carousel.getBoundingClientRect().width / slidesToShow;

    slides.forEach(slide => {
        slide.style.flex = `0 0 ${100 / slidesToShow}%`;
    });

    // Asegúrate de que el carrusel no se desplace incorrectamente
    moveToSlide(currentSlide);
}

function moveToSlide(targetSlide) {
    const offset = targetSlide * slideWidth;
    track.style.transform = `translateX(-${offset}px)`;
}

nextButton.addEventListener('click', () => {
    const maxSlide = slides.length - slidesToShow; // Límite para no mostrar espacios vacíos
    if (currentSlide < maxSlide) {
        currentSlide++;
    } else {
        currentSlide = 0; // Reinicia al primer slide
    }
    moveToSlide(currentSlide);
});

prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = slides.length - slidesToShow; // Va al último conjunto
    }
    moveToSlide(currentSlide);
});

// Ajusta el tamaño del carrusel al cargar y al cambiar el tamaño de la ventana
window.addEventListener('resize', updateSlideWidth);
updateSlideWidth();