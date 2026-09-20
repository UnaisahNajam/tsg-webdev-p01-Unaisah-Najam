// ============================================
// Footer year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// Mobile menu toggle
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close mobile menu after clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// ============================================
// Dark / light mode toggle
// ============================================
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.innerHTML = theme === 'light'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(current);
});

// ============================================
// Scroll-to-top button
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 480);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// Contact form validation
// ============================================
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function setError(inputId, errorId, message) {
  document.getElementById(inputId).classList.toggle('invalid', !!message);
  document.getElementById(errorId).textContent = message;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successMsg.classList.remove('show');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true;

  if (name.length < 2) {
    setError('name', 'nameError', 'Please enter your full name.');
    valid = false;
  } else {
    setError('name', 'nameError', '');
  }

  if (!isValidEmail(email)) {
    setError('email', 'emailError', 'Please enter a valid email address.');
    valid = false;
  } else {
    setError('email', 'emailError', '');
  }

  if (message.length < 10) {
    setError('message', 'messageError', 'Message should be at least 10 characters.');
    valid = false;
  } else {
    setError('message', 'messageError', '');
  }

  if (valid) {
    // In production, replace this with a real submission
    // (e.g. fetch() to a form backend such as Formspree, EmailJS, or your own API).
    successMsg.classList.add('show');
    form.reset();
  }
});
