/*=============== MOSTRAR MENU ===============*/
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

function seleccionarServicio(servicio) {
    document.getElementById('servicioSeleccionado').innerText = `Servicio: ${servicio}`;
    console.log('Servicio seleccionado:', servicio);
}


/*========================== Módulos de cita ===============================
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date(); // Obtén la fecha actual
    const minDate = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    let servicio = ''; // Para almacenar el servicio seleccionado
    let fecha = ''; // Para almacenar la fecha seleccionada
    let hora = ''; // Para almacenar la hora seleccionada
    let currentStep = 0; // Paso actual

    // Obtén referencias de los elementos necesarios
    const modal = document.getElementById('modalCita');
    const openModalBtn = document.querySelector('.boton[href="#"]');
    const closeModalBtn = document.querySelector('.close');
    const steps = document.querySelectorAll('.paso');
    const resumen = document.getElementById('resumenCita');

    // Inicializar Flatpickr para mostrar el calendario
    flatpickr('#datepicker', {
        inline: true, // Mostrar siempre visible
        minDate: minDate, // Solo permitir fechas futuras
        onChange: (selectedDates) => {
            fecha = selectedDates[0].toISOString().split('T')[0]; // Guardar la fecha seleccionada
            updateResumen(); // Actualizar el resumen
        }
    });

    // Función para actualizar el resumen
    const updateResumen = () => {
        document.getElementById('servicioSeleccionado').innerText = `Servicio: ${servicio || '--'}`;
        document.getElementById('fechaSeleccionada').innerText = `Fecha: ${fecha || '--'}`;
        document.getElementById('horaSeleccionada').innerText = `Hora: ${hora || '--'}`;
    };

    // Función para mostrar solo el paso actual
    const showStep = () => {
        steps.forEach((step, i) => {
            step.classList.toggle('hidden', i !== currentStep);
        });
    };

    // Abrir modal y mostrar el primer paso
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        currentStep = 0; // Reinicia el flujo al primer paso
        showStep();
    });

    // Cerrar modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Paso 1: Selección de servicio
    document.querySelectorAll('.servicios button').forEach(btn => {
        btn.addEventListener('click', () => {
            servicio = btn.getAttribute('data-servicio'); // Guarda el servicio seleccionado
            updateResumen(); // Actualiza el resumen
            currentStep++; // Avanza al siguiente paso
            showStep(); // Muestra el nuevo paso
        });
    });

    // Paso 2: Validar y avanzar
    document.getElementById('siguientePaso2').addEventListener('click', () => {
        hora = document.getElementById('hora').value; // Toma el valor de la hora

        if (!fecha || !hora) {
            alert('Selecciona una fecha y una hora.'); // Validación de entrada
            return;
        }

        updateResumen(); // Actualiza el resumen
        currentStep++; // Avanza al siguiente paso
        showStep(); // Muestra el nuevo paso
    });

    // Botón de regreso al paso anterior (Paso 2)
    document.getElementById('anteriorPaso2').addEventListener('click', () => {
        currentStep--; // Retrocede un paso
        showStep(); // Muestra el nuevo paso
    });

    // Paso 3: Validar y confirmar
    document.getElementById('anteriorPaso3').addEventListener('click', () => {
        currentStep--; // Retrocede al paso anterior
        showStep(); // Muestra el nuevo paso
    });

    document.getElementById('formularioCita').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
    
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
    
        // Obtener información de la cita desde el resumen
        const servicio = document.getElementById('servicioSeleccionado').innerText.split(': ')[1];
        const fecha = document.getElementById('fechaSeleccionada').innerText.split(': ')[1];
        const hora = document.getElementById('horaSeleccionada').innerText.split(': ')[1];
    
        // Validar campos obligatorios
        if (!nombre || !telefono || !correo || !servicio || !fecha || !hora) {
            alert('Por favor, completa todos los campos.');
            console.error('Faltan datos:', { servicio, fecha, hora, nombre, telefono, correo });
            return;
        }
    
        // Crear objeto de datos para enviar
        const data = { servicio, fecha, hora, nombre, telefono, correo };
    
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwPe21Ju5lEBn-pkWLMYjFwbJdEOziO2zTdqe_wiKnCHQkNBuoC6GZHAfFRw46-CJpf/exec', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                const result = await response.json(); // Procesar respuesta del servidor
                console.log('Respuesta del servidor:', result);
                alert('Cita agendada con éxito.');
            } else {
                console.error('Error en la respuesta del servidor:', response.statusText);
                alert('Hubo un problema al guardar los datos.');
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            alert('No se pudo enviar la información. Intenta más tarde.');
        }
    });
    

    // Inicializa mostrando solo el paso actual
    showStep();
});*/

// Escucha los cambios en el tamaño de la ventana
window.addEventListener('resize', adjustCarousel);
// Llama a la función para establecer los valores iniciales
adjustCarousel();

window.addEventListener("load",initSlider);