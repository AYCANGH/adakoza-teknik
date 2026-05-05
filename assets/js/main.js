// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mainNav   = document.querySelector('.main-nav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const isOpen = mainNav.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.querySelectorAll('span')[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
    hamburger.querySelectorAll('span')[1].style.opacity   = isOpen ? '0' : '';
    hamburger.querySelectorAll('span')[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  });
}

// Active nav link
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Scroll reveal via IntersectionObserver
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();



// Footer copyright year
document.querySelectorAll('.js-year').forEach(el => { el.textContent = new Date().getFullYear(); });

// Category tabs active state (products page)
(function initCatTabs() {
  const tabs = document.querySelectorAll('.cat-tab');
  if (!tabs.length) return;
  const sections = document.querySelectorAll('.product-section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tabs.forEach(t => t.classList.toggle('active', t.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => io.observe(s));
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(tab.getAttribute('href'));
      if (target) {
        const offset = 68 + 49; // header + tabs height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
