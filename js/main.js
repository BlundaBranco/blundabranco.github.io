/* Portafolio Branco Blunda — interacciones */
(function () {
  'use strict';

  // Menú mobile
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
      var icon = menuToggle.querySelector('i');
      if (icon) { icon.classList.toggle('fa-bars'); icon.classList.toggle('fa-times'); }
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        var icon = menuToggle.querySelector('i');
        if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
      });
    });
  }

  // Scroll suave para anclas de la misma página
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });

  // Sombra del navbar al scrollear
  var navbar = document.querySelector('nav');
  window.addEventListener('scroll', function () {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add('shadow-2xl');
    else navbar.classList.remove('shadow-2xl');
  });

  // Link activo según sección
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
  function updateActive() {
    var current = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 150) current = s.getAttribute('id');
    });
    navLinks.forEach(function (l) {
      l.classList.remove('active');
      var href = l.getAttribute('href') || '';
      if (current && href.indexOf('#' + current) !== -1) l.classList.add('active');
    });
  }
  window.addEventListener('scroll', updateActive);
  updateActive();

  // Botón volver arriba
  var scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) scrollTopBtn.classList.add('visible');
      else scrollTopBtn.classList.remove('visible');
    });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Otros trabajos
  var toggle = document.getElementById('toggle-otros');
  var list = document.getElementById('otros-list');
  if (toggle && list) {
    toggle.addEventListener('click', function () {
      var open = !list.hasAttribute('hidden');
      if (open) {
        list.setAttribute('hidden', '');
        toggle.innerHTML = '<i class="fas fa-plus mr-2"></i>Ver otros trabajos';
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        list.removeAttribute('hidden');
        toggle.innerHTML = '<i class="fas fa-minus mr-2"></i>Ocultar otros trabajos';
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Ampliar capturas (lightbox)
  var zoomables = document.querySelectorAll('img[data-zoom]');
  if (zoomables.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<button class="lightbox-close" aria-label="Cerrar">&times;</button><div class="lightbox-scroll"><img alt=""></div>';
    document.body.appendChild(box);
    var boxImg = box.querySelector('img');
    function open(src, alt) {
      boxImg.src = src; boxImg.alt = alt || '';
      box.classList.add('open');
      document.body.classList.add('lightbox-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      box.classList.remove('open');
      document.body.classList.remove('lightbox-open');
      document.body.style.overflow = '';
      setTimeout(function () { boxImg.removeAttribute('src'); }, 250);
    }
    zoomables.forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () { open(img.currentSrc || img.src, img.alt); });
    });
    box.addEventListener('click', function () { close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('open')) close(); });
  }

  // Año actual
  var y = document.getElementById('current-year');
  if (y) y.textContent = new Date().getFullYear();
})();
