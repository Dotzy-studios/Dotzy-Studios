console.log("© 2025 Dotzy Studio · Designed with innovation & precision");

  // Typewriter looping animation for hero h1
  function typeWriterLoop(element, text, speed = 150, pause = 1500) {
    let index = 0;
    let isDeleting = false;

    function type() {
      if (!isDeleting) {
        element.textContent = text.slice(0, index + 1);
        index++;
        if (index === text.length) {
          isDeleting = true;
          setTimeout(type, pause);
          return;
        }
      } else {
        element.textContent = text.slice(0, index - 1);
        index--;
        if (index === 0) {
          isDeleting = false;
        }
      }
      setTimeout(type, isDeleting ? speed / 2 : speed);
    }
    type();
  }
  const heroHeading = document.querySelector('#hero h1');
  if (heroHeading) {
    heroHeading.textContent = '';
    typeWriterLoop(heroHeading, 'Dotzy Studio', 150, 1500);
  }

  // Scroll progress bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollPos / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  // Mobile nav toggle with animation
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.animation = 'slideOut 0.3s forwards';
      setTimeout(() => {
        navLinks.style.display = 'none';
        navLinks.style.animation = '';
      }, 300);
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.animation = 'slideIn 0.3s forwards';
    }
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      if (window.innerWidth < 769) {
        navLinks.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => {
          navLinks.style.display = 'none';
          navLinks.style.animation = '';
        }, 300);
      }
    });
  });

  // Sticky nav shadow on scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });

  // Scrollspy nav active link highlight
  const sections = document.querySelectorAll('section');
  const navAnchors = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  });

  // Animate sections on scroll (fade + slide up)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Tilt effect on cards and projects
  function addTiltEffect(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      const inner = el.querySelector(selector.includes('card') ? '.card-inner' : '.project-inner');
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;
        const maxRotate = 12;
        inner.style.transform = `rotateX(${-dy * maxRotate}deg) rotateY(${dx * maxRotate}deg)`;
      });
      el.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
    });
  }
  addTiltEffect('.card');
  addTiltEffect('.project');

  // Testimonials bounce animation on scroll
  const testimonialObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('bounce');
        testimonialObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.testimonial').forEach(t => testimonialObserver.observe(t));

  // Form submit feedback animation
  const form = document.querySelector('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      btn.textContent = 'Message Sent! ✅';
      btn.style.backgroundColor = '#00c853';
    }, 1500);

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      btn.style.backgroundColor = 'var(--accent)';
      form.reset();
    }, 4000);
  });
  const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
