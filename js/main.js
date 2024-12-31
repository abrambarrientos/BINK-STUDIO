document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('myHeader'); // Referencia al header
    var page = document.body; // Usamos body como contenedor principal
    var openMenuButton = document.getElementById('openmenu'); // Botón para abrir menú

    // Agrega o quita la clase 'sticky' al hacer scroll
    window.addEventListener('scroll', function () {
        page.classList.remove('menuopen'); // Asegura que la clase 'menuopen' se remueva
        if (window.scrollY >= 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Listener para abrir el menú al hacer clic en el botón
    if (openMenuButton) {
        openMenuButton.addEventListener('click', function () {
            header.classList.remove('sticky'); // Quita la clase sticky al abrir menú
            page.classList.toggle('menuopen'); // Alterna la clase 'menuopen'
        });
    }

    // Enlaces internos para desplazamiento suave
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            // Evita la acción predeterminada
            event.preventDefault();

            // Obtiene el elemento de destino
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);

            // Desplazamiento suave al destino
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
