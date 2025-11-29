// =====================================================
// NAVIGATION - Mobile Menu Toggle
// =====================================================
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Cambiar icono del menú
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Cerrar menú móvil al hacer click en un enlace
const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// =====================================================
// SMOOTH SCROLL - Navegación suave entre secciones
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // No hacer scroll si es solo "#"
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Offset para el navbar fijo
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================================
// NAVBAR - Cambiar estilo al hacer scroll
// =====================================================
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Añadir/quitar sombra al navbar con transición suave
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        navbar.style.transition = 'box-shadow 0.3s ease';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// =====================================================
// ACTIVE LINK - Resaltar link activo según sección visible
// =====================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

function updateActiveLink() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-green-400');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('text-green-400');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// =====================================================
// SCROLL TO TOP BUTTON
// =====================================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================================================
// INTERSECTION OBSERVER - Animaciones al hacer scroll
// =====================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar tarjetas de servicios
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observar tarjetas de proyectos
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Observar tarjetas de tecnologías
document.querySelectorAll('.tech-card').forEach(card => {
    observer.observe(card);
});

// =====================================================
// TYPING EFFECT - Efecto de escritura en el título (opcional)
// =====================================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Descomenta para activar el efecto de escritura en el título principal
/*
window.addEventListener('load', () => {
    const titleElement = document.querySelector('.gradient-text');
    if (titleElement) {
        const titleText = titleElement.textContent;
        typeWriter(titleElement, titleText, 80);
    }
});
*/

// =====================================================
// CURSOR EFFECT - Efecto de seguimiento del cursor (opcional)
// =====================================================
// Descomenta para activar el efecto de cursor personalizado
/*
const cursorDot = document.createElement('div');
cursorDot.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #10b981, #3b82f6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
`;
document.body.appendChild(cursorDot);

const cursorCircle = document.createElement('div');
cursorCircle.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(16, 185, 129, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
`;
document.body.appendChild(cursorCircle);

document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX - 5 + 'px';
    cursorDot.style.top = e.clientY - 5 + 'px';
    
    setTimeout(() => {
        cursorCircle.style.left = e.clientX - 20 + 'px';
        cursorCircle.style.top = e.clientY - 20 + 'px';
    }, 50);
});

document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(2)';
        cursorCircle.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorCircle.style.transform = 'scale(1)';
    });
});
*/

// =====================================================
// PARALLAX EFFECT - Efecto parallax en hero section
// =====================================================
const heroSection = document.getElementById('inicio');
const profileImage = document.querySelector('.profile-image');

// Detectar preferencia de movimiento reducido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.2;
        
        if (heroSection && profileImage) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            
            if (scrolled < heroBottom) {
                profileImage.style.transform = `translateY(${rate}px)`;
            }
        }
    });
}

// =====================================================
// TECH STACK MARQUEE - Animación continua (opcional)
// =====================================================
// Si decides usar una marquesina en lugar del grid estático
// Descomenta esto y ajusta tu HTML
/*
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(clone);
}
*/

// =====================================================
// PROJECT FILTER - Filtro de proyectos por tecnología (opcional)
// =====================================================
// Si quieres añadir filtros a los proyectos
/*
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Actualizar botón activo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filtrar proyectos
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.classList.add('fade-in-up');
            } else {
                card.style.display = 'none';
            }
        });
    });
});
*/

// =====================================================
// STATS COUNTER - Contador animado de estadísticas (opcional)
// =====================================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Usa esto si añades una sección de estadísticas
/*
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            statsObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-counter').forEach(counter => {
    statsObserver.observe(counter);
});
*/

// =====================================================
// FORM VALIDATION - Validación de formulario de contacto
// =====================================================
// Si añades un formulario funcional, descomenta esto
/*
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validación básica
        if (!data.name || !data.email || !data.message) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor ingresa un email válido');
            return;
        }
        
        // Aquí iría tu lógica de envío (FormSpree, EmailJS, etc.)
        console.log('Datos del formulario:', data);
        
        // Mostrar mensaje de éxito
        alert('¡Mensaje enviado! Te contactaré pronto.');
        contactForm.reset();
    });
}
*/

// =====================================================
// CONSOLE MESSAGE - Mensaje en la consola
// =====================================================
console.log(
    '%c👨‍💻 Desarrollado por Branco Blunda',
    'color: #10b981; font-size: 16px; font-weight: bold; padding: 10px;'
);
console.log(
    '%c🚀 Te gusta lo que ves? Hablame!',
    'color: #3b82f6; font-size: 14px; padding: 5px;'
);
console.log(
    '%c📧 brancoadrianblunda@gmail.com',
    'color: #9ca3af; font-size: 12px; padding: 5px;'
);

// =====================================================
// PREVENT CONTEXT MENU (opcional)
// =====================================================
// Descomenta si quieres proteger las imágenes del click derecho
/*
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
*/

// =====================================================
// DARK MODE TOGGLE (opcional)
// =====================================================
// Si quieres añadir un botón de Light/Dark mode
/*
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    html.classList.toggle('light-mode');
    
    const isLight = html.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Cambiar icono
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    html.classList.add('light-mode');
}
*/

// =====================================================
// PERFORMANCE OPTIMIZATION - Lazy loading de imágenes
// =====================================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =====================================================
// INITIALIZATION - Ejecutar al cargar la página
// =====================================================
window.addEventListener('load', () => {
    // Remover pantalla de carga si existe
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Actualizar link activo inicial
    updateActiveLink();
    
    // Actualizar año en el footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    console.log('✅ Portafolio cargado correctamente');
});

// =====================================================
// ERROR HANDLING - Manejo de errores
// =====================================================
window.addEventListener('error', (e) => {
    console.error('Error detectado:', e.error);
});

// =====================================================
// EXPORT - Para testing (opcional)
// =====================================================
// Si usas módulos o testing
/*
export {
    typeWriter,
    animateCounter,
    updateActiveLink
};
*/