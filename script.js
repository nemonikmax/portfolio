const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Project data
const projectsData = {
  fintech: {
    title: 'Fintech Dashboard',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop',
    description: 'Полнофункциональная панель аналитики для финансового приложения с интерактивными графиками, реальным временем обновления данных и адаптивным интерфейсом.',
    tech: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS', 'Node.js'],
    links: [
      { text: 'Live Demo', url: '#' },
      { text: 'GitHub', url: '#' }
    ]
  },
  saas: {
    title: 'SaaS Landing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop',
    description: 'Конверсионный лендинг для SaaS продукта с оптимизацией скорости загрузки, A/B тестированием и интеграцией с CRM системой.',
    tech: ['Next.js', 'Framer Motion', 'HubSpot API', 'Vercel'],
    links: [
      { text: 'Live Demo', url: '#' },
      { text: 'Case Study', url: '#' }
    ]
  },
  portfolio: {
    title: 'Creator Portfolio',
    image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=900&auto=format&fit=crop',
    description: 'Персональное портфолио с glassmorphism дизайном, микроанимациями и оптимизацией для мобильных устройств.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Figma'],
    links: [
      { text: 'Live Demo', url: '#' },
      { text: 'Source Code', url: '#' }
    ]
  }
};

// Modal functionality
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalLinks = document.getElementById('modalLinks');
const modalClose = document.querySelector('.modal-close');

// Open modal
document.querySelectorAll('.project-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const projectCard = btn.closest('.project-card');
    const projectId = projectCard.dataset.project;
    const project = projectsData[projectId];
    
    if (project) {
      modalTitle.textContent = project.title;
      modalImage.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
      modalDescription.innerHTML = `<p>${project.description}</p>`;
      
      modalTech.innerHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
      ).join('');
      
      modalLinks.innerHTML = '';
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // Account for sticky nav
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Enhanced hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Contact form functionality (GitHub Pages with Formspree)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    formStatus.classList.remove('show', 'success', 'error');
    
    // Send form using Formspree
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Success
        formStatus.textContent = 'Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.';
        formStatus.classList.add('success', 'show');
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Error
      formStatus.textContent = 'Произошла ошибка при отправке. Попробуйте еще раз или свяжитесь напрямую по email.';
      formStatus.classList.add('error', 'show');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      
      // Hide status after 5 seconds
      setTimeout(() => {
        formStatus.classList.remove('show');
      }, 5000);
    }
  });
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';
});

// Add keyboard navigation for modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Add scroll progress indicator
const scrollProgress = () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  
  // Create progress bar if it doesn't exist
  if (!document.querySelector('.scroll-progress')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(120deg, var(--accent), var(--accent-2));
      z-index: 1001;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
  }
  
  document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
};

window.addEventListener('scroll', scrollProgress);

// Particle system
class ParticleSystem {
  constructor() {
    this.container = document.getElementById('particlesContainer');
    this.particles = [];
    this.particleCount = window.innerWidth > 768 ? 50 : 20;
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random starting position
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      
      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';
      
      // Random animation delay
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = (10 + Math.random() * 10) + 's';
      
      this.container.appendChild(particle);
      this.particles.push(particle);
    }
  }

  animate() {
    // Particles are animated via CSS
  }

  destroy() {
    this.particles.forEach(particle => particle.remove());
    this.particles = [];
  }
}

// Mouse trail effect
class MouseTrail {
  constructor() {
    this.trail = document.createElement('div');
    this.trail.className = 'mouse-trail';
    document.body.appendChild(this.trail);
    
    this.mouseX = 0;
    this.mouseY = 0;
    this.currentX = 0;
    this.currentY = 0;
    
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.trail.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      this.trail.classList.remove('active');
    });

    this.animate();
  }

  animate() {
    // Smooth following effect
    this.currentX += (this.mouseX - this.currentX) * 0.1;
    this.currentY += (this.mouseY - this.currentY) * 0.1;
    
    this.trail.style.transform = `translate(${this.currentX - 10}px, ${this.currentY - 10}px)`;
    
    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.trail.remove();
  }
}

// Interactive background effects
class InteractiveBackground {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    
    this.init();
  }

  init() {
    // Initialize CSS variables
    this.updateBackground();
    
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.updateBackground();
    });

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.updateBackground();
    });
  }

  updateBackground() {
    // Calculate mouse position as percentage (0-100)
    const mouseXPercent = (this.mouseX / this.windowWidth) * 100;
    const mouseYPercent = (this.mouseY / this.windowHeight) * 100;

    // Update CSS variables for parallax effect
    // Layer 1: moves opposite to mouse (strong parallax)
    const layer1X = 20 + (50 - mouseXPercent) * 0.3;
    const layer1Y = 20 + (50 - mouseYPercent) * 0.3;

    // Layer 2: moves with mouse (medium parallax)
    const layer2X = 80 + (mouseXPercent - 50) * 0.2;
    const layer2Y = 80 + (mouseYPercent - 50) * 0.2;

    // Layer 3: subtle movement (light parallax)
    const layer3X = 50 + (mouseXPercent - 50) * 0.1;
    const layer3Y = 50 + (mouseYPercent - 50) * 0.1;

    // Apply CSS variables
    document.documentElement.style.setProperty('--mouse-x-1', `${layer1X}%`);
    document.documentElement.style.setProperty('--mouse-y-1', `${layer1Y}%`);
    document.documentElement.style.setProperty('--mouse-x-2', `${layer2X}%`);
    document.documentElement.style.setProperty('--mouse-y-2', `${layer2Y}%`);
    document.documentElement.style.setProperty('--mouse-x-3', `${layer3X}%`);
    document.documentElement.style.setProperty('--mouse-y-3', `${layer3Y}%`);
    
    // Also update background directly for better compatibility
    const gradient1 = `radial-gradient(circle at ${layer1X}% ${layer1Y}%, #101a35 0%, transparent 50%)`;
    const gradient2 = `radial-gradient(circle at ${layer2X}% ${layer2Y}%, #1a1f3a 0%, transparent 50%)`;
    const gradient3 = `radial-gradient(circle at ${layer3X}% ${layer3Y}%, #0f172a 0%, var(--bg) 70%)`;
    
    document.body.style.background = `
      ${gradient1},
      ${gradient2},
      ${gradient3}
    `;
    document.body.style.backgroundSize = '400px 400px, 350px 350px, 100% 100%';
    document.body.style.backgroundPosition = '0% 0%, 100% 100%, 50% 50%';
  }
}

// Interactive orb effects
class InteractiveOrbs {
  constructor() {
    this.orbs = document.querySelectorAll('.bg-orb');
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      this.orbs.forEach((orb, index) => {
        const rect = orb.getBoundingClientRect();
        const orbCenterX = rect.left + rect.width / 2;
        const orbCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(this.mouseX - orbCenterX, 2) + 
          Math.pow(this.mouseY - orbCenterY, 2)
        );
        
        // Enhanced interactive effect when mouse is near
        if (distance < 300) {
          const force = (300 - distance) / 300;
          const moveX = (orbCenterX - this.mouseX) * force * 0.15;
          const moveY = (orbCenterY - this.mouseY) * force * 0.15;
          
          orb.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.1})`;
        } else {
          orb.style.transform = '';
        }
      });
    });
  }
}

// Touch device detection
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference and touch devices
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = isTouchDevice();
  
  if (!prefersReducedMotion && !isTouch) {
    const particleSystem = new ParticleSystem();
    const mouseTrail = new MouseTrail();
    const interactiveBackground = new InteractiveBackground();
    const interactiveOrbs = new InteractiveOrbs();
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      particleSystem.destroy();
      mouseTrail.destroy();
    });
  } else if (isTouch) {
    // Add touch-optimized class for CSS
    document.body.classList.add('touch-device');
  }
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
  const orbs = document.querySelectorAll('.bg-orb');
  const particles = document.querySelectorAll('.particle');
  
  if (document.hidden) {
    // Pause animations
    orbs.forEach(orb => orb.style.animationPlayState = 'paused');
    particles.forEach(particle => particle.style.animationPlayState = 'paused');
  } else {
    // Resume animations
    orbs.forEach(orb => orb.style.animationPlayState = 'running');
    particles.forEach(particle => particle.style.animationPlayState = 'running');
  }
});
