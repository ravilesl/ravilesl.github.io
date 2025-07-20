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

    // Opcional: Validación básica del formulario de contacto (lado del cliente)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío por defecto del formulario

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && message) {
                // Validación básica de email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Por favor, ingresa un correo electrónico válido.');
                    return;
                }

                // Aquí podrías enviar los datos a un servicio backend (ej. Formspree, Netlify Forms)
                // Para una demo, solo mostraremos una alerta
                alert('¡Mensaje enviado con éxito! Gracias por contactarme.');
                contactForm.reset(); // Limpia el formulario
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }
});
