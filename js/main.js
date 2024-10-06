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