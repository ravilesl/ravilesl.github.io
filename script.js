document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para los enlaces del menú
    document.querySelectorAll('.navbar-nav a, .hero-section .btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Cierra el menú hamburguesa si está abierto (para móviles)
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('#navbarNav');
            if (navbarToggler && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }

            // Desplazamiento suave
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.navbar').offsetHeight; // Altura de la navbar
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px para un poco de espacio extra

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validación y envío del formulario de contacto
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Si algún campo está vacío, mostramos una alerta y detenemos el envío
            if (!name || !email || !message) {
                e.preventDefault(); // Detenemos el envío
                alert('Por favor, completa todos los campos.');
                return;
            }

            // Validación básica de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault(); // Detenemos el envío
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Si la validación es exitosa, el formulario se enviará
            // a la URL especificada en el atributo 'action' del HTML.
            // No necesitamos hacer nada más aquí.
        });
    }
});
