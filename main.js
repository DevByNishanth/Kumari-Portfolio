import './style.css'

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const typingTextElement = document.getElementById('typingText');
const ctaButton = document.querySelector('.cta-button');
const contactForm = document.getElementById('contactForm');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

ctaButton.addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

const texts = ['Java Full Stack Developer', 'Backend Developer', 'Frontend Developer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentText = texts[textIndex];

  if (!isDeleting && charIndex < currentText.length) {
    typingTextElement.textContent += currentText.charAt(charIndex);
    charIndex++;
    typingSpeed = 100;
  } else if (isDeleting && charIndex > 0) {
    typingTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      textIndex = (textIndex + 1) % texts.length;
    }
    typingSpeed = isDeleting ? 50 : 1000;
  }

  setTimeout(typeText, typingSpeed);
}

setTimeout(typeText, 500);

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat-item').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon!`);

  contactForm.reset();
});
