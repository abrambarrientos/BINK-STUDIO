/*=============== MOSTRAR MENU ===============*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
            toggle.classList.toggle('show-icon');
        });
    }
};

showMenu('nav-toggle', 'nav-menu');

/*=============== MOSTRAR/SUBMENU ===============*/
const subMenuItems = document.querySelectorAll('.menu_desplegable__item'); // Selecciona los elementos con submenús

subMenuItems.forEach((item) => {
    const subMenu = item.querySelector('.menu_desplegable__menu'); // Encuentra el submenú correspondiente
    const arrow = item.querySelector('.menu_desplegable__arrow'); // Encuentra el ícono de flecha

    item.addEventListener('click', () => {
        // Alterna la clase que despliega el submenú
        subMenu.classList.toggle('show-submenu');
        arrow.classList.toggle('rotate-arrow');
    });
});

const btnLeft = document.querySelector(".btn-left"),
btnRight = document.querySelector(".btn-right"),
slider = document.querySelector("#slider"),
sliderSection = document.querySelectorAll(".slider-section");

btnLeft.addEventListener("click", e => moveToLeft());
btnRight.addEventListener("click", e => moveToRight());

// Variables iniciales
let operacion = 0,
    counter = 0,
    imagesToShow = getImagesToShow(), // Obtener imágenes a mostrar según el tamaño de la pantalla
    totalImages = sliderSection.length,
    widthImg = 100 / totalImages;

// Función para obtener el número de imágenes a mostrar según el tamaño de la pantalla
function getImagesToShow() {
    if (window.innerWidth < 768) { 
        return 1; // Móvil
    } else {
        return 3; // Pantallas más grandes
    }
}

// Función para ajustar el contador y el ancho de las imágenes
function adjustCarousel() {
    imagesToShow = getImagesToShow(); // Actualiza el número de imágenes a mostrar
    totalImages = sliderSection.length; // Vuelve a establecer el total de imágenes
    widthImg = 100 / totalImages; // Actualiza el ancho de las imágenes
}

// Mueve a la derecha
function moveToRight() {
    // Solo incrementa si el contador está dentro de los límites
    if (counter < totalImages - imagesToShow) {
        counter++;
        operacion = counter * widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease .6s";
    }
}

// Mueve a la izquierda
function moveToLeft() {
    // Solo decrementa si el contador está mayor que 0
    if (counter > 0) { 
        counter--;
        operacion = counter * widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease .6s";
    }
}


function openPopup(title, text) {
    const popup = document.getElementById("popup");
    const popupContent = popup.querySelector(".popup-content");

    // Reinicia la animación eliminando y volviendo a agregar la clase
    popupContent.style.animation = "none"; // Desactiva temporalmente la animación
    void popupContent.offsetWidth; // Forzar un reflow para reiniciar la animación
    popupContent.style.animation = ""; // Reactiva la animación definida en el CSS

    // Configura el contenido del popup
    document.getElementById("popup-title").textContent = title;
    document.getElementById("popup-text").textContent = text;

    // Muestra el popup
    popup.classList.add("show");
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.remove("show");
}


var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true
    },
    keyboard: {
      enabled: true
    },
    spaceBetween: 60,
    loop: true,
    autoplay:{
        delay: 3000,
        disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  });


// Escucha los cambios en el tamaño de la ventana
window.addEventListener('resize', adjustCarousel);
// Llama a la función para establecer los valores iniciales
adjustCarousel();

window.addEventListener("load",initSlider);