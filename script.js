document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Smooth scrolling para los enlaces del menú
    // ----------------------------------------------------
    const navbarLinks = document.querySelectorAll('.navbar-nav a, .hero-section .btn');
    const navbar = document.querySelector('.navbar');

    navbarLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            // Cierra el menú hamburguesa si está abierto (para móviles)
            const navbarCollapse = document.querySelector('#navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }

            // Desplazamiento suave
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ----------------------------------------------------
    // 2. Validación del formulario de contacto
    // ----------------------------------------------------
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                e.preventDefault();
                alert('Por favor, completa todos los campos.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Si la validación es exitosa, el formulario se enviará.
            // No se necesita más código aquí para que Getform funcione.
        });
    }
});