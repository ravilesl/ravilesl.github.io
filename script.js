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

    // ----------------------------------------------------
    // 3. Creación de Galería en GitHub
    // ---------------------------------------------------- 
    // Asegúrate de que el repositorio y la ruta sean correctos
    const owner = 'ravilesl';
    const repo = 'ravilesl.github.io';
    const path = 'imgs'; // Ruta a la carpeta de imágenes en tu repositorio

    const galleryElement = document.querySelector('#portfolio .row');

    // Función para obtener la lista de imágenes desde la API de GitHub
    async function getImagesFromRepo() {
        try {
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
            const response = await fetch(url);
            const data = await response.json();

            // Filtramos solo archivos de imagen
            const images = data.filter(file => {
                return file.name.match(/\.(jpg|jpeg|png|gif)$/i);
            });

            // Generamos el HTML para cada imagen
            images.forEach(image => {
                const cardHTML = `
                    <div class="col-md-6 col-lg-4 d-flex">
                        <div class="card shadow-sm rounded-3 overflow-hidden flex-fill">
                            <img src="${image.path}" class="card-img-top" alt="${image.name}" style="height: 250px; object-fit: cover;">
                            <div class="card-body d-flex flex-column">
                                <h3 class="card-title fw-bold text-dark">${image.name}</h3>
                                <p class="card-text text-muted mb-auto">Descripción opcional.</p>
                            </div>
                        </div>
                    </div>
                `;
                galleryElement.innerHTML += cardHTML;
            });

        } catch (error) {
            console.error('Error al obtener las imágenes de GitHub:', error);
            galleryElement.innerHTML = '<p class="text-center text-muted">No se pudo cargar la galería de imágenes.</p>';
        }
    }

    getImagesFromRepo();
});


document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Configuración de GitHub y Galerías
    // ----------------------------------------------------
    // ----------------------------------------------------
    const owner = 'ravilesl'; // ¡usuario!
    const repo = 'ravilesl.github.io'; // ¡el nombre de tu repositorio!

    
    // Define las galerías que quieres mostrar.
    // Los 'name' deben coincidir con el atributo 'data-gallery-id' en tu HTML.
    // Los 'path' deben ser las rutas relativas a las carpetas de imágenes.
    const galleryConfigs = [
        { name: 'Causal Inference', path: 'imgs/' },
        //{ name: 'Cloud Computing', path: 'imgs/' },
        //{ name: 'Doctoral Thesis', path: 'imgs/' }
        // Añade más galerías aquí
    ];

    const allGalleries = {};
    let galleriesLoaded = false;
    let loadingMessageShown = false;

    // Detectar si el archivo se abre de forma local (protocolo 'file://')
    const isLocal = window.location.protocol === 'file:';

    // ----------------------------------------------------
    // 2. Lógica de carga de imágenes (diferente para local y servidor)
    // ----------------------------------------------------

    // Función para cargar imágenes de GitHub (modo servidor)
    async function loadGalleryFromGithub(galleryName, directoryPath) {
        try {
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${directoryPath}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error en la API de GitHub: ${response.statusText}`);
            }

            const data = await response.json();
    
            const images = data.filter(file => {
                return file.name.match(/\.(jpg|jpeg|png|gif)$/i);
            }).map(file => file.path);
    
            allGalleries[galleryName] = images;

        } catch (error) {
            console.error(`Error al obtener imágenes para la galería '${galleryName}':`, error);
        }
    }

    // Carga inicial de todas las galerías
    async function initializeGalleries() {
        if (isLocal) {
            // Modo Local: Usa las rutas definidas manualmente.
            console.log("Modo local detectado. Usando rutas manuales.");
            allGalleries['Causal Inference'] = galleryConfigs.find(g => g.name === 'Causal Inference').path
                ? ['./imgs/causal/ci1.jpg', './imgs/causal/ci2.jpg', './imgs/causal/ci3.jpg']
                : [];
            allGalleries['Cloud Computing'] = galleryConfigs.find(g => g.name === 'Cloud Computing').path
                ? ['./imgs/cloud/cloud1.jpg', './imgs/cloud/cloud2.jpg', './imgs/cloud/cloud3.jpg']
                : [];
            allGalleries['Doctoral Thesis'] = galleryConfigs.find(g => g.name === 'Doctoral Thesis').path
                ? ['./imgs/doctoral/dt1.jpg', './imgs/doctoral/dt2.jpg', './imgs/doctoral/dt3.jpg']
                : [];

            galleriesLoaded = true;
            console.log('Galerías locales cargadas.');

        } else {
            // Modo Servidor: Usa la API de GitHub para cargar las imágenes.
            console.log("Modo servidor detectado. Cargando galerías de GitHub...");
            if (owner === 'tu-usuario-de-github' || repo === 'el-nombre-de-tu-repositorio') {
                console.error('ERROR: Por favor, actualiza las constantes `owner` y `repo` en el archivo script.js con tu usuario y repositorio de GitHub.');
                return;
            }
            const fetchPromises = galleryConfigs.map(config => loadGalleryFromGithub(config.name, config.path));
            await Promise.all(fetchPromises);
            galleriesLoaded = true;
            console.log('Todas las galerías de GitHub han sido cargadas.');
        }
    }

    initializeGalleries();

    // ----------------------------------------------------
    // 3. Funcionalidad de la galería pop-up
    // ----------------------------------------------------
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentImages = [];
    let currentIndex = 0;

    function openModalForGallery(galleryId) {
        if (!galleriesLoaded) {
            if (!loadingMessageShown) {
                console.warn('Las galerías aún se están cargando. Por favor, espera un momento.');
                loadingMessageShown = true;
            }
            return;
        }

        if (allGalleries[galleryId] && allGalleries[galleryId].length > 0) {
            currentImages = allGalleries[galleryId];
            currentIndex = 0;
            showImage(currentIndex);
            modal.style.display = 'flex';
        } else {
            console.error('Galería no encontrada o vacía:', galleryId);
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        loadingMessageShown = false;
    }

    function showImage(index) {
        if (index < 0) {
            currentIndex = currentImages.length - 1;
        } else if (index >= currentImages.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        modalImage.src = currentImages[currentIndex];
    }

    // Event listeners para los botones de navegación y cierre
    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));

    // Event listener para abrir el modal desde los botones de las tarjetas
    document.addEventListener('click', (e) => {
        const button = e.target.closest('.open-gallery-btn');
        if (button) {
            e.preventDefault();
            const galleryId = button.getAttribute('data-gallery-id');
            openModalForGallery(galleryId);
        }
    });

    // Cierre del modal al presionar la tecla 'Esc'
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Cierre del modal al hacer clic fuera del contenido principal
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'gallery-modal') {
            closeModal();
        }
    });

});