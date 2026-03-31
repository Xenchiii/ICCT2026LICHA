(function () {
  const saved = localStorage.getItem('caraga-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.documentElement.style.colorScheme = saved === 'dark' ? 'dark' : 'light';
})();

function injectThemeToggle() {
  const navInner = document.querySelector('.nav-inner');
  if (!navInner) return;

  if (document.getElementById('themeToggle')) {
    wireThemeToggle();
    return;
  }

  let controls = navInner.querySelector('.nav-controls');
  if (!controls) {
    controls = document.createElement('div');
    controls.className = 'nav-controls';

    const ham = navInner.querySelector('.hamburger');
    navInner.appendChild(controls);
    if (ham) controls.appendChild(ham);
  }

  const btn = document.createElement('button');
  btn.id        = 'themeToggle';
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  btn.setAttribute('title', 'Toggle dark/light mode');
  btn.innerHTML = `
    <div class="theme-track">
      <div class="theme-thumb"></div>
      <svg class="theme-icon icon-sun" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="2"/>
        <line x1="12" y1="2"    x2="12"   y2="4.5"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="12" y1="19.5" x2="12"   y2="22"   stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="2"  y1="12"   x2="4.5"  y2="12"   stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="19.5" y1="12" x2="22"   y2="12"   stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="4.93"  y1="4.93"  x2="6.7"   y2="6.7"   stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="17.3"  y1="17.3"  x2="19.07" y2="19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="4.93"  y1="19.07" x2="6.7"   y2="17.3"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="17.3"  y1="6.7"   x2="19.07" y2="4.93"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <svg class="theme-icon icon-moon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    </div>`;

  controls.insertBefore(btn, controls.firstChild);
  wireThemeToggle();
}

function wireThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  syncThumb(btn);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.style.colorScheme = next === 'dark' ? 'dark' : 'light';
    localStorage.setItem('caraga-theme', next);
    animateThumb(btn, next);
  });

  window.addEventListener('resize', () => syncThumb(btn));
}

function syncThumb(btn) {
  const thumb   = btn && btn.querySelector('.theme-thumb');
  const current = document.documentElement.getAttribute('data-theme');
  if (!thumb) return;
  const offset = getThumbOffset();
  thumb.style.transition = 'none';
  thumb.style.transform  = current === 'dark' ? `translateX(${offset}px)` : 'translateX(0)';
  requestAnimationFrame(() => {
    thumb.style.transition = '';
  });
}

function animateThumb(btn, next) {
  const thumb  = btn && btn.querySelector('.theme-thumb');
  if (!thumb) return;
  const offset = getThumbOffset();
  thumb.style.transform = next === 'dark'
    ? `translateX(${offset}px) scale(0.85)`
    : 'translateX(0) scale(0.85)';
  setTimeout(() => {
    thumb.style.transform = next === 'dark'
      ? `translateX(${offset}px) scale(1)`
      : 'translateX(0) scale(1)';
  }, 180);
}

function getThumbOffset() {
  return window.innerWidth <= 480 ? 26 : 28;
}

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.style.display = 'none', 600);
    }
  }, 1100);
});

const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  if (scroll > 60) {
    navbar?.classList.add('scrolled');
    backTop?.classList.add('visible');
  } else {
    navbar?.classList.remove('scrolled');
    backTop?.classList.remove('visible');
  }

  // Optimize sticky filter bar rounding
  const filterBars = document.querySelectorAll('[class$="-filter-bar"]');
  const navHeight = navbar ? navbar.offsetHeight : 80;

  filterBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    // It's stuck if its top position is roughly at the navbar height
    if (rect.top <= navHeight + 1) {
      bar.classList.add('is-stuck');
    } else {
      bar.classList.remove('is-stuck');
    }
  });

  updateActiveNav();
}, { passive: true });

backTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function toggleMenu() {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!ham || !menu) return;
  ham.classList.toggle('open');
  menu.classList.toggle('open');
}

function closeMenu() {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!ham || !menu) return;
  ham.classList.remove('open');
  menu.classList.remove('open');
  const submenu = document.getElementById('mobileSubmenu');
  const toggle  = document.getElementById('mobileProvincesToggle');
  submenu?.classList.remove('open');
  toggle?.classList.remove('submenu-open');
}

document.addEventListener('click', (e) => {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const btn  = document.getElementById('themeToggle');
  if (!ham || !menu) return;
  if (
    menu.classList.contains('open') &&
    !ham.contains(e.target) &&
    !menu.contains(e.target) &&
    !btn?.contains(e.target)
  ) {
    closeMenu();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const toggle  = document.getElementById('mobileProvincesToggle');
  const submenu = document.getElementById('mobileSubmenu');
  if (toggle && submenu) {
    toggle.addEventListener('click', () => {
      submenu.classList.toggle('open');
      toggle.classList.toggle('submenu-open');
    });
  }

  initLegalNotice();
  injectThemeToggle();
  initCarouselDots();
});

/**
 * initLegalNotice
 * Injects a modern, glassmorphic legal consent notice at the bottom-right.
 * Uses localStorage to remember the user's acceptance.
 */
function initLegalNotice() {
  if (localStorage.getItem('caraga-legal-accepted')) return;

  // Determine path prefix based on where we are
  const path = window.location.pathname;
  let prefix = '';
  if (path.includes('/pages/') || path.includes('/provinces/')) {
    prefix = path.includes('/provinces/') ? '../pages/' : '';
  } else {
    prefix = 'pages/';
  }

  const notice = document.createElement('div');
  notice.id = 'legal-notice';
  notice.innerHTML = `
    <div class="legal-content">
      <h3>Privacy & Terms</h3>
      <p>We value your privacy. By using this site, you agree to our 
         <a href="${prefix}terms.html">Terms</a> and 
         <a href="${prefix}privacy.html">Privacy Policy</a>.</p>
    </div>
    <button class="legal-btn-accept" id="acceptLegal">I Accept</button>
  `;

  document.body.appendChild(notice);

  document.getElementById('acceptLegal')?.addEventListener('click', () => {
    notice.classList.add('notice-hide');
    localStorage.setItem('caraga-legal-accepted', 'true');
    setTimeout(() => notice.remove(), 500);
  });
}

const navSections = [
  'home', 'about', 'history', 'provinces',
  'tourist-spots', 'events', 'delicacies', 'region-map', 'contact'
];

function updateActiveNav() {
  let current = 'home';
  navSections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 110) current = id;
  });
  document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

let currentSlide = 0;
let slideTimer   = null;
const slides     = document.querySelectorAll('.slide');
const dots       = document.querySelectorAll('.dot');
const SLIDE_INTERVAL = 6000;

function showSlide(n) {
  if (slides.length === 0) return;
  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  currentSlide = ((n % slides.length) + slides.length) % slides.length;
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

function changeSlide(dir) {
  showSlide(currentSlide + dir);
  resetSlideTimer();
}

function goToSlide(n) {
  showSlide(n);
  resetSlideTimer();
}

function resetSlideTimer() {
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(currentSlide + 1), SLIDE_INTERVAL);
}

if (slides.length > 0) {
  resetSlideTimer();
}

let touchStartX = 0;
const slideshow  = document.getElementById('heroSlideshow');
if (slideshow) {
  slideshow.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  slideshow.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
  }, { passive: true });
}

const carousel     = document.getElementById('spotsCarousel');
const carouselDots = document.getElementById('carouselDots');
let carouselPage   = 0;

function initCarouselDots() {
  if (!carousel || !carouselDots) return;
  const cards   = carousel.querySelectorAll('.spot-card');
  const perPage = getCardsPerPage();
  const pages   = Math.ceil(cards.length / perPage);
  carouselDots.innerHTML = '';
  for (let i = 0; i < pages; i++) {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Page ${i + 1}`);
    d.onclick   = () => goToCarouselPage(i);
    carouselDots.appendChild(d);
  }
}

function getCardsPerPage() {
  const w = window.innerWidth;
  if (w < 600) return 1;
  if (w < 900) return 2;
  return 3;
}

function scrollCarousel(dir) {
  if (!carousel) return;
  const card    = carousel.querySelector('.spot-card');
  if (!card)    return;
  const cardW   = card.offsetWidth + 22;
  const perPage = getCardsPerPage();
  const pages   = Math.ceil(carousel.querySelectorAll('.spot-card').length / perPage);
  carouselPage  = Math.max(0, Math.min(pages - 1, carouselPage + dir));
  carousel.scrollTo({ left: carouselPage * cardW * perPage, behavior: 'smooth' });
  updateCarouselDots();
}

function goToCarouselPage(page) {
  if (!carousel) return;
  const card    = carousel.querySelector('.spot-card');
  if (!card)    return;
  const cardW   = card.offsetWidth + 22;
  const perPage = getCardsPerPage();
  carouselPage  = page;
  carousel.scrollTo({ left: page * cardW * perPage, behavior: 'smooth' });
  updateCarouselDots();
}

function updateCarouselDots() {
  document.querySelectorAll('.carousel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === carouselPage);
  });
}

if (carousel) {
  carousel.addEventListener('scroll', () => {
    const card    = carousel.querySelector('.spot-card');
    if (!card)    return;
    const cardW   = card.offsetWidth + 22;
    const perPage = getCardsPerPage();
    carouselPage  = Math.round(carousel.scrollLeft / (cardW * perPage));
    updateCarouselDots();
  }, { passive: true });

  let cTouchStart = 0;
  carousel.addEventListener('touchstart', (e) => {
    cTouchStart = e.changedTouches[0].screenX;
  }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const diff = cTouchStart - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) scrollCarousel(diff > 0 ? 1 : -1);
  }, { passive: true });
}

const mapUrls = {
  'region':        'https://maps.google.com/maps?q=Caraga+Region+Philippines&output=embed&z=8',
  'agusan-norte':  'https://maps.google.com/maps?q=Butuan+City+Agusan+del+Norte+Philippines&output=embed&z=11',
  'agusan-sur':    'https://maps.google.com/maps?q=Prosperidad+Agusan+del+Sur+Philippines&output=embed&z=10',
  'surigao-norte': 'https://maps.google.com/maps?q=Siargao+Island+Surigao+del+Norte+Philippines&output=embed&z=11',
  'surigao-sur':   'https://maps.google.com/maps?q=Tandag+City+Surigao+del+Sur+Philippines&output=embed&z=10',
  'dinagat':       'https://maps.google.com/maps?q=Dinagat+Islands+Philippines&output=embed&z=11'
};

function switchMap(key, btn) {
  const frame = document.getElementById('mainMapFrame');
  if (!frame) return;
  frame.src = mapUrls[key] || mapUrls['region'];
  document.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
  btn?.classList.add('active');
}

function filterProvinces(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  let visibleIndex = 0;
  document.querySelectorAll('.province-card').forEach(card => {
    const matches = category === 'all' || card.dataset.category === category;
    if (matches) {
      card.classList.remove('province-hidden');
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      const delay = visibleIndex * 70;
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, delay);
      visibleIndex++;
    } else {
      card.classList.add('province-hidden');
      card.style.opacity = '';
      card.style.transform = '';
    }
  });
}

function filterSpots(province, btn) {
  document.querySelectorAll('.spots-filter-btn').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  document.querySelectorAll('.all-spot-card').forEach((card, i) => {
    const matches = province === 'all' || card.dataset.province === province;
    card.style.display = matches ? '' : 'none';
    if (matches) {
      card.style.animation = 'none';
      void card.offsetWidth;
      card.style.animation = `fadeInUp 0.4s ease ${i * 0.05}s both`;
    }
  });
}

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
);
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 80;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

const fieldLabels = {
  name: 'Full Name', email: 'Email Address',
  subject: 'Subject', message: 'Message'
};

function validateField(id) {
  const el    = document.getElementById(id);
  const group = document.getElementById('group-' + id);
  const error = document.getElementById('error-' + id);
  if (!el || !group || !error) return true;
  const val = el.value.trim();
  if (!val) {
    group.classList.add('error');
    error.textContent = fieldLabels[id] + ' is required.';
    return false;
  }
  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    group.classList.add('error');
    error.textContent = 'Please enter a valid email address.';
    return false;
  }
  group.classList.remove('error');
  error.textContent = '';
  return true;
}

function submitForm() {
  const ids = ['name', 'email', 'subject', 'message'];
  if (ids.map(id => validateField(id)).every(Boolean)) {
    ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    const success = document.getElementById('formSuccess');
    if (success) {
      success.classList.add('visible');
      setTimeout(() => success.classList.remove('visible'), 5000);
    }
  }
}

Object.keys(fieldLabels).forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => {
      const group = document.getElementById('group-' + id);
      if (group?.classList.contains('error')) validateField(id);
    });
  }
});

window.addEventListener('resize', () => {
  initCarouselDots();
});