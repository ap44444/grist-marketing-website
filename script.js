// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
    menuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// Smooth Scroll with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate sections on scroll
const animatedSections = document.querySelectorAll('.about, .unique, .features, .process, .cta-section, .contact');
animatedSections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(40px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  fadeInObserver.observe(section);
});

// Animate cards individually
const cards = document.querySelectorAll('.value-card, .stat-card');
cards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

cards.forEach(card => cardObserver.observe(card));

// Animate features
const features = document.querySelectorAll('.feature');
features.forEach((feature, index) => {
  feature.style.opacity = '0';
  feature.style.transform = 'translateX(-30px)';
  feature.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
    }
  });
}, observerOptions);

features.forEach(feature => featureObserver.observe(feature));

// Animate steps
const steps = document.querySelectorAll('.step');
steps.forEach((step, index) => {
  step.style.opacity = '0';
  step.style.transform = 'translateX(-40px)';
  step.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
});

const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
    }
  });
}, observerOptions);

steps.forEach(step => stepObserver.observe(step));

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  } else {
    nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
  }
  
  lastScroll = currentScroll;
});

// Form Handling with EmailJS
// Initialize EmailJS with your Public Key
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key from EmailJS

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const btn = contactForm.querySelector('button');
  const originalText = btn.textContent;
  
  // Disable button and show loading
  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.7';
  
  // Send email using EmailJS
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
    .then(() => {
      // Success
      btn.textContent = 'Message Sent!';
      btn.style.background = 'linear-gradient(120deg, #52B788, #2D6A4F)';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.background = 'linear-gradient(120deg, var(--green), var(--dark-green))';
        contactForm.reset();
      }, 2000);
    }, (error) => {
      // Error
      console.error('EmailJS Error:', error);
      btn.textContent = 'Failed to send. Try again.';
      btn.style.background = 'linear-gradient(120deg, #E76F51, #D45842)';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.background = 'linear-gradient(120deg, var(--green), var(--dark-green))';
      }, 3000);
    });
});

// Active Nav Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksAll.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--green)';
    }
  });
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.4}px)`;
  }
});

// Button Hover Effects
document.querySelectorAll('.btn-main, .btn-ghost').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Form Input Focus Effects
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', function() {
    this.style.transform = 'scale(1)';
  });
});

// Initialize animations on load
window.addEventListener('load', () => {
  // Fade in hero content
  const heroLeft = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  
  if (heroLeft) {
    heroLeft.style.opacity = '0';
    heroLeft.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroLeft.style.transition = 'opacity 1s ease, transform 1s ease';
      heroLeft.style.opacity = '1';
      heroLeft.style.transform = 'translateY(0)';
    }, 100);
  }
  
  if (heroRight) {
    heroRight.style.opacity = '0';
    heroRight.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroRight.style.transition = 'opacity 1s ease, transform 1s ease';
      heroRight.style.opacity = '1';
      heroRight.style.transform = 'translateY(0)';
    }, 300);
  }
});

// Add smooth transitions to all interactive elements
document.querySelectorAll('a, button').forEach(elem => {
  elem.style.transition = 'all 0.3s ease';
});