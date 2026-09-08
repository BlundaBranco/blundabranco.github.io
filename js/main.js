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

  // Carrusel de capturas
  document.querySelectorAll('[data-carousel]').forEach(function (car) {
    var slides = car.querySelectorAll('.carousel-slide');
    var caps = car.querySelectorAll('.carousel-cap');
    var dotsBox = car.querySelector('.carousel-dots');
    var count = car.querySelector('.carousel-count b');
    var n = slides.length, i = 0;
    if (n < 2) { car.querySelectorAll('.carousel-btn').forEach(function (b) { b.hidden = true; }); if (dotsBox) dotsBox.hidden = true; return; }
    var dots = [];
    for (var k = 0; k < n; k++) {
      var d = document.createElement('button');
      d.type = 'button'; d.setAttribute('role', 'tab'); d.setAttribute('aria-label', 'Captura ' + (k + 1));
      (function (idx) { d.addEventListener('click', function () { go(idx); }); })(k);
      dotsBox.appendChild(d); dots.push(d);
    }
    function go(idx) {
      i = (idx + n) % n;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      caps.forEach(function (c, k) { c.classList.toggle('is-active', k === i); });
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === i); });
      if (count) count.textContent = i + 1;
      // precarga la siguiente
      var nx = slides[(i + 1) % n].querySelector('img'); if (nx) nx.loading = 'eager';
    }
    car.querySelector('.carousel-btn.prev').addEventListener('click', function () { go(i - 1); });
    car.querySelector('.carousel-btn.next').addEventListener('click', function () { go(i + 1); });
    document.addEventListener('keydown', function (e) {
      if (document.querySelector('.lightbox.open')) return;
      if (e.key === 'ArrowLeft') go(i - 1);
      if (e.key === 'ArrowRight') go(i + 1);
    });
    var x0 = null;
    var stage = car.querySelector('.carousel-stage');
    stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
    }, { passive: true });
    go(0);
  });

  // Ver los N puntos de lo construido
  document.querySelectorAll('[data-more]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var list = btn.previousElementSibling;
      var open = btn.classList.toggle('open');
      list.querySelectorAll('.more').forEach(function (li) { li.hidden = !open; });
      btn.innerHTML = (open ? 'Ver menos' : btn.getAttribute('data-label') || 'Ver todo') + ' <i class="fas fa-chevron-down"></i>';
    });
    btn.setAttribute('data-label', btn.textContent.trim());
  });

  // Copiar el correo al portapapeles
  document.querySelectorAll('.copy-mail').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var mail = btn.getAttribute('data-copy');
      var listo = function () {
        var antes = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado';
        btn.classList.add('copiado');
        setTimeout(function () { btn.innerHTML = antes; btn.classList.remove('copiado'); }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(listo, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = mail; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); listo(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  // Año actual
  var y = document.getElementById('current-year');
  if (y) y.textContent = new Date().getFullYear();
})();
