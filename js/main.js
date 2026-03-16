// ════════════════════════════════════════════════════════════════
//  MAIN.JS  —  js/main.js
//  Caraga Region XIII — All interactive behaviour
// ════════════════════════════════════════════════════════════════


// ─── LOADER ─────────────────────────────────────────────────────
// This runs once the entire page (images, scripts, etc.) has
// fully loaded. We wait an extra 1100ms so the loader animation
// has time to play before we hide it. The 'hidden' class triggers
// a CSS fade-out, and then after 600ms (the fade duration) we
// fully remove it from view with display:none so it doesn't
// block any clicks underneath.
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.style.display = 'none', 600);
    }
  }, 1100);
});


// ─── NAVBAR SCROLL ──────────────────────────────────────────────
// Grab the navbar and back-to-top button elements once so we
// don't have to query the DOM on every single scroll event.
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('back-top');

// As the user scrolls, we check how far down the page they are.
// If they've scrolled more than 60px, we add 'scrolled' to the
// navbar (which triggers a CSS style change like a shadow/bg) and
// make the back-to-top button visible. Scroll back up and both
// get removed. { passive: true } is a performance hint that tells
// the browser this listener won't call preventDefault().
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar?.classList.add('scrolled');
    backTop?.classList.add('visible');
  } else {
    navbar?.classList.remove('scrolled');
    backTop?.classList.remove('visible');
  }
  // Also update which nav link is highlighted while scrolling
  updateActiveNav();
}, { passive: true });

// When the back-to-top button is clicked, smoothly scroll the
// page back up to the very top.
backTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ─── MOBILE MENU ────────────────────────────────────────────────
// toggleMenu() is called by the hamburger icon's onclick.
// It flips the 'open' class on both the hamburger (animates the
// three lines into an X) and the mobile menu drawer (slides it in).
function toggleMenu() {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!ham || !menu) return;
  ham.classList.toggle('open');
  menu.classList.toggle('open');
}

// closeMenu() fully closes the mobile menu — used when clicking
// a link inside the menu or clicking outside of it. Also resets
// any open provinces submenu back to closed state.
function closeMenu() {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!ham || !menu) return;
  ham.classList.remove('open');
  menu.classList.remove('open');
  // Also collapse the nested provinces submenu if it was open
  const submenu = document.getElementById('mobileSubmenu');
  const toggle  = document.getElementById('mobileProvincesToggle');
  submenu?.classList.remove('open');
  toggle?.classList.remove('submenu-open');
}

// Close the mobile menu if the user clicks anywhere outside of
// the hamburger button or the menu drawer itself.
document.addEventListener('click', (e) => {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!ham || !menu) return;
  if (menu.classList.contains('open') && !ham.contains(e.target) && !menu.contains(e.target)) {
    closeMenu();
  }
});

// Set up the "Provinces" accordion toggle inside the mobile menu.
// Clicking it expands/collapses the nested list of province links.
document.addEventListener('DOMContentLoaded', () => {
  const toggle  = document.getElementById('mobileProvincesToggle');
  const submenu = document.getElementById('mobileSubmenu');
  if (toggle && submenu) {
    toggle.addEventListener('click', () => {
      submenu.classList.toggle('open');
      toggle.classList.toggle('submenu-open');
    });
  }
});


// ─── ACTIVE NAV ─────────────────────────────────────────────────
// These are the IDs of every section on the homepage that has a
// corresponding nav link. We loop through them on scroll to figure
// out which section is currently in view.
const navSections = ['home', 'about', 'history', 'provinces', 'tourist-spots', 'events', 'delicacies', 'region-map', 'contact'];

// updateActiveNav() highlights the correct nav link based on how
// far the user has scrolled. It checks each section's offsetTop
// and whichever one the scroll position has passed most recently
// becomes "current". Then it finds the matching nav link by href
// and adds the 'active' class to it (removing it from all others).
function updateActiveNav() {
  let current = 'home';
  navSections.forEach(id => {
    const el = document.getElementById(id);
    // 110px offset accounts for the sticky navbar height so the
    // section is considered "active" slightly before it hits the top
    if (el && window.scrollY >= el.offsetTop - 110) current = id;
  });
  document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}


// ─── HERO SLIDESHOW ─────────────────────────────────────────────
// Variables to track the current slide index, the auto-play timer,
// and all the slide/dot elements on the page.
let currentSlide = 0;
let slideTimer   = null;
const slides     = document.querySelectorAll('.slide');
const dots       = document.querySelectorAll('.dot');
const SLIDE_INTERVAL = 6000; // how long each slide stays on screen (6 seconds)

// showSlide(n) switches to slide number n. It removes 'active'
// from the current slide and dot, calculates the correct index
// (wraps around using modulo so it loops endlessly), then adds
// 'active' to the new slide and dot.
function showSlide(n) {
  if (slides.length === 0) return;
  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  // The double modulo trick handles negative numbers correctly
  // so swiping backwards from slide 0 goes to the last slide.
  currentSlide = ((n % slides.length) + slides.length) % slides.length;
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

// changeSlide(dir) is called by the prev/next arrow buttons.
// dir is either +1 (next) or -1 (previous). After changing slides
// manually, we reset the auto-play timer so it doesn't jump too
// quickly to the next slide right after the user just clicked.
function changeSlide(dir) {
  showSlide(currentSlide + dir);
  resetSlideTimer();
}

// goToSlide(n) is called when a dot indicator is clicked directly,
// letting the user jump to any specific slide.
function goToSlide(n) {
  showSlide(n);
  resetSlideTimer();
}

// resetSlideTimer() clears any existing interval and starts a
// fresh one. This is called every time a slide changes (whether
// manually or automatically) to avoid double-timers stacking up.
function resetSlideTimer() {
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(currentSlide + 1), SLIDE_INTERVAL);
}

// Kick off the auto-play slideshow on page load —
// but only if there are actually slides on this page.
if (slides.length > 0) {
  resetSlideTimer();
}

// Touch/swipe support for the hero slideshow on mobile.
// We record the X position where the touch started, then on
// touchend we calculate how far the finger moved. If it moved
// more than 50px, we treat it as an intentional swipe left or right.
let touchStartX = 0;
const slideshow  = document.getElementById('heroSlideshow');
if (slideshow) {
  slideshow.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  slideshow.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    // Positive diff = swiped left = go to next slide
    // Negative diff = swiped right = go to previous slide
    if (Math.abs(diff) > 50) {
      changeSlide(diff > 0 ? 1 : -1);
    }
  }, { passive: true });
}


// ─── TOURIST SPOTS CAROUSEL ──────────────────────────────────────
// References to the scrollable carousel container and its dot nav.
const carousel    = document.getElementById('spotsCarousel');
const carouselDots = document.getElementById('carouselDots');
let carouselPage  = 0; // tracks which "page" of cards we're on

// initCarouselDots() builds the dot indicators below the carousel.
// The number of dots depends on how many cards fit per page at the
// current screen width (1, 2, or 3 cards). It clears and rebuilds
// the dots every time it's called (also runs on window resize).
function initCarouselDots() {
  if (!carousel || !carouselDots) return;
  const cards    = carousel.querySelectorAll('.spot-card');
  const perPage  = getCardsPerPage();
  const pages    = Math.ceil(cards.length / perPage);
  carouselDots.innerHTML = ''; // wipe existing dots before rebuilding
  for (let i = 0; i < pages; i++) {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.onclick   = () => goToCarouselPage(i);
    carouselDots.appendChild(d);
  }
}

// getCardsPerPage() returns how many cards are visible at once
// based on the current viewport width. Mobile = 1, tablet = 2,
// desktop = 3. Used to calculate scroll distances and page counts.
function getCardsPerPage() {
  const w = window.innerWidth;
  if (w < 600) return 1;
  if (w < 900) return 2;
  return 3;
}

// scrollCarousel(dir) handles the prev/next arrow buttons on the
// carousel. It calculates the correct pixel scroll position based
// on card width + gap, then smoothly scrolls to that position.
// carouselPage is clamped between 0 and the last page so it
// doesn't scroll past the beginning or end.
function scrollCarousel(dir) {
  if (!carousel) return;
  const card    = carousel.querySelector('.spot-card');
  if (!card)    return;
  const cardW   = card.offsetWidth + 22; // 22px = the CSS gap between cards
  const perPage = getCardsPerPage();
  const pages   = Math.ceil(carousel.querySelectorAll('.spot-card').length / perPage);
  carouselPage  = Math.max(0, Math.min(pages - 1, carouselPage + dir));
  carousel.scrollTo({ left: carouselPage * cardW * perPage, behavior: 'smooth' });
  updateCarouselDots();
}

// goToCarouselPage(page) jumps directly to a specific page when
// a dot indicator is clicked. Same scroll math as scrollCarousel().
function goToCarouselPage(page) {
  if (!carousel) return;
  const card  = carousel.querySelector('.spot-card');
  if (!card)  return;
  const cardW = card.offsetWidth + 22;
  const perPage = getCardsPerPage();
  carouselPage  = page;
  carousel.scrollTo({ left: page * cardW * perPage, behavior: 'smooth' });
  updateCarouselDots();
}

// updateCarouselDots() highlights the dot that matches the current
// page number and removes the highlight from all the others.
function updateCarouselDots() {
  document.querySelectorAll('.carousel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === carouselPage);
  });
}

// Keep the dots in sync when the user manually scrolls the carousel
// (e.g. by dragging on desktop or scrolling on mobile without using
// the arrow buttons). We calculate which page we're on based on how
// far the carousel has scrolled horizontally.
if (carousel) {
  carousel.addEventListener('scroll', () => {
    const card   = carousel.querySelector('.spot-card');
    if (!card)   return;
    const cardW  = card.offsetWidth + 22;
    const perPage = getCardsPerPage();
    carouselPage  = Math.round(carousel.scrollLeft / (cardW * perPage));
    updateCarouselDots();
  }, { passive: true });
}

// Touch/swipe support for the spots carousel (same pattern as the
// hero slideshow — record start position, measure the swipe distance
// on release, and scroll one page in the appropriate direction).
if (carousel) {
  let cTouchStart = 0;
  carousel.addEventListener('touchstart', (e) => {
    cTouchStart = e.changedTouches[0].screenX;
  }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const diff = cTouchStart - e.changedTouches[0].screenX;
    // Only register as a swipe if the finger moved more than 40px
    if (Math.abs(diff) > 40) scrollCarousel(diff > 0 ? 1 : -1);
  }, { passive: true });
}


// ─── MAP TABS ────────────────────────────────────────────────────
// A lookup table of Google Maps embed URLs for each map tab.
// The key matches what's passed into switchMap() from each button's
// onclick attribute in the HTML.
const mapUrls = {
  'region':        'https://maps.google.com/maps?q=Caraga+Region+Philippines&output=embed&z=8',
  'agusan-norte':  'https://maps.google.com/maps?q=Butuan+City+Agusan+del+Norte+Philippines&output=embed&z=11',
  'agusan-sur':    'https://maps.google.com/maps?q=Prosperidad+Agusan+del+Sur+Philippines&output=embed&z=10',
  'surigao-norte': 'https://maps.google.com/maps?q=Siargao+Island+Surigao+del+Norte+Philippines&output=embed&z=11',
  'surigao-sur':   'https://maps.google.com/maps?q=Tandag+City+Surigao+del+Sur+Philippines&output=embed&z=10',
  'dinagat':       'https://maps.google.com/maps?q=Dinagat+Islands+Philippines&output=embed&z=11'
};

// switchMap() swaps the iframe's src to the selected location and
// updates which tab button looks active. Falls back to the full
// region view if an unknown key is passed in somehow.
function switchMap(key, btn) {
  const frame = document.getElementById('mainMapFrame');
  if (!frame) return;
  frame.src = mapUrls[key] || mapUrls['region'];
  document.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
  btn?.classList.add('active');
}


// ─── PROVINCE FILTER ─────────────────────────────────────────────
// filterProvinces() is used on the provinces grid section to show
// only cards matching a given category (e.g. 'coastal', 'highland',
// or 'all'). It highlights the clicked filter button, then loops
// through every province card and hides or shows it. When a card
// is shown, we reset its animation so it plays the fadeInUp again
// for a nice re-appearance effect (the void offsetWidth line forces
// the browser to reflow and restart the CSS animation).
function filterProvinces(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.province-card').forEach(card => {
    const matches = category === 'all' || card.dataset.category === category;
    if (matches) {
      card.style.display = '';
      card.style.animation = 'none';
      void card.offsetWidth; // force browser reflow to restart the animation
      card.style.animation = 'fadeInUp 0.4s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// filterSpots() does the same thing but for the tourist spots page,
// where cards can be filtered by which province they belong to.
// The data-province attribute on each card is what we compare against.
function filterSpots(province, btn) {
  document.querySelectorAll('.spots-filter-btn').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  document.querySelectorAll('.all-spot-card').forEach(card => {
    const matches = province === 'all' || card.dataset.province === province;
    card.style.display = matches ? '' : 'none';
    if (matches) {
      card.style.animation = 'none';
      void card.offsetWidth; // same reflow trick to replay the animation
      card.style.animation = 'fadeInUp 0.4s ease';
    }
  });
}


// ─── SCROLL ANIMATIONS ──────────────────────────────────────────
// IntersectionObserver watches every element with the 'fade-up'
// class. When one scrolls into view (at least 8% visible, with a
// 36px bottom margin buffer), we add 'visible' to it — which CSS
// uses to trigger the fade + slide-up animation. Once animated,
// we stop watching that element (unobserve) since it only needs
// to animate once.
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // done watching this one
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
);
// Register every fade-up element on the page with the observer
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));


// ─── SMOOTH SCROLLING ───────────────────────────────────────────
// Make all anchor links (href="#something") scroll smoothly instead
// of jumping. We offset by the navbar height so the target section
// isn't hidden behind the sticky nav when we land on it.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return; // skip plain "#" links (like placeholder footer links)
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault(); // stop the browser's default instant-jump behavior
      const navH = document.getElementById('navbar')?.offsetHeight || 66;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ─── CONTACT FORM ───────────────────────────────────────────────
// Human-readable field names used in validation error messages
// so we can say "Full Name is required" instead of "name is required".
const fieldLabels = { name: 'Full Name', email: 'Email Address', subject: 'Subject', message: 'Message' };

// validateField(id) checks a single form field and shows or clears
// its error message. Returns true if valid, false if not.
// Special case: email fields get a basic regex format check on top
// of the "not empty" check.
function validateField(id) {
  const el    = document.getElementById(id);
  const group = document.getElementById('group-' + id); // the wrapper div for the field
  const error = document.getElementById('error-' + id); // the error message element
  if (!el || !group || !error) return true;
  const val = el.value.trim();
  if (!val) {
    group.classList.add('error'); // CSS uses this to show the red border
    error.textContent = fieldLabels[id] + ' is required.';
    return false;
  }
  // Basic email format check — must have characters, @, domain, and TLD
  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    group.classList.add('error');
    error.textContent = 'Please enter a valid email address.';
    return false;
  }
  // All good — clear any existing error state
  group.classList.remove('error');
  error.textContent = '';
  return true;
}

// submitForm() is called when the user clicks the Send button.
// It validates all four fields at once. If they all pass, it clears
// the form and shows the success message for 5 seconds.
function submitForm() {
  const ids = ['name', 'email', 'subject', 'message'];
  // .map() validates each field, .every() checks they're all true
  if (ids.map(id => validateField(id)).every(Boolean)) {
    // Clear all the input fields after a successful submission
    ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    // Show the success banner, then auto-hide it after 5 seconds
    const success = document.getElementById('formSuccess');
    if (success) {
      success.classList.add('visible');
      setTimeout(() => success.classList.remove('visible'), 5000);
    }
  }
}

// Live validation — as soon as a field that already has an error
// is edited, re-validate it immediately so the error clears the
// moment the user fixes their mistake (instead of waiting for submit).
Object.keys(fieldLabels).forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => {
      const group = document.getElementById('group-' + id);
      // Only re-validate if the field is currently in an error state
      if (group?.classList.contains('error')) validateField(id);
    });
  }
});


// ─── INIT ───────────────────────────────────────────────────────
// Run initCarouselDots() once the DOM is ready on page load, and
// again whenever the window is resized — because the number of
// dots changes depending on how many cards fit per row, which
// depends on the screen width.
document.addEventListener('DOMContentLoaded', () => {
  initCarouselDots();
});

window.addEventListener('resize', () => {
  initCarouselDots();
});