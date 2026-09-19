/* ============================================
   ELECTROFIRE ENGINEERING - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 600);
  });
  // Fallback: hide preloader after 3s max
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3000);

  // ---------- Sticky Header ----------
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ---------- Mobile Menu ----------
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  navOverlay.addEventListener('click', toggleMobileMenu);

  // Close mobile menu on nav link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // ---------- Hero Slider ----------
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let heroInterval;

  function goToSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));

    currentSlide = index;
    heroSlides[currentSlide].classList.add('active');
    heroDots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    const next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next);
  }

  function startHeroSlider() {
    heroInterval = setInterval(nextSlide, 5000);
  }

  function resetHeroSlider() {
    clearInterval(heroInterval);
    startHeroSlider();
  }

  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.dataset.slide);
      goToSlide(slideIndex);
      resetHeroSlider();
    });
  });

  startHeroSlider();

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- Active Nav Link on Scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = navMenu.querySelectorAll('a');

  function updateActiveNavLink() {
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // If at top of page, set Home as active
    if (window.pageYOffset < 200) {
      navLinks.forEach(link => link.classList.remove('active'));
      const homeLink = navMenu.querySelector('a[href="#"]');
      if (homeLink) homeLink.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // ---------- Scroll Animations ----------
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(element => {
    animationObserver.observe(element);
  });

  // ---------- Counter Animation ----------
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(eased * target);

      element.textContent = current.toLocaleString() + (target >= 100 ? '+' : '+');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => {
    counterObserver.observe(num);
  });

  // ---------- Progress Bar Animation ----------
  const progressFills = document.querySelectorAll('.progress-fill');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + '%';
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressFills.forEach(fill => {
    progressObserver.observe(fill);
  });

  // ---------- Testimonial Slider ----------
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;
  let testimonialAutoPlay;

  function updateTestimonialSlider() {
    if (!testimonialTrack) return;
    const offset = -currentTestimonial * 100;
    testimonialTrack.style.transform = `translateX(${offset}%)`;
  }

  function nextTestimonial() {
    if (!testimonialCards.length) return;
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonialSlider();
  }

  function prevTestimonial() {
    if (!testimonialCards.length) return;
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonialSlider();
  }

  function startTestimonialAutoPlay() {
    if (testimonialTrack && testimonialCards.length > 0) {
      testimonialAutoPlay = setInterval(nextTestimonial, 6000);
    }
  }

  function resetTestimonialAutoPlay() {
    clearInterval(testimonialAutoPlay);
    startTestimonialAutoPlay();
  }

  if (testimonialNext) {
    testimonialNext.addEventListener('click', () => {
      nextTestimonial();
      resetTestimonialAutoPlay();
    });
  }

  if (testimonialPrev) {
    testimonialPrev.addEventListener('click', () => {
      prevTestimonial();
      resetTestimonialAutoPlay();
    });
  }

  startTestimonialAutoPlay();

  // ---------- Contact Form Handling ----------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('contact-name')?.value || '',
        email: document.getElementById('contact-email')?.value || '',
        phone: document.getElementById('contact-phone')?.value || '',
        service: document.getElementById('contact-service')?.value || '',
        message: document.getElementById('contact-message')?.value || ''
      };

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (!submitBtn) return;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        Sending...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Message Sent!
        `;
        submitBtn.style.background = '#27ae60';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 2500);
      }, 1500);
    });
  }

  // ---------- Newsletter Form ----------
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button');

      if (btn) {
        btn.innerHTML = '✓';
        btn.style.background = '#27ae60';
      }
      if (input) {
        input.value = '';
        input.placeholder = 'Subscribed!';
      }

      setTimeout(() => {
        if (btn) {
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
          btn.style.background = '';
        }
        if (input) {
          input.placeholder = 'Enter your email';
        }
      }, 2500);
    });
  }

  // ---------- Back to Top Button ----------
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ---------- Parallax Effect on Hero ----------
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(calc(-50% + ${scrolled * 0.3}px))`;
      heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
    }
  });

  // ---------- Add spinning animation style ----------
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spinAnimation {
      to { transform: rotate(360deg); }
    }
    .spinning {
      animation: spinAnimation 1s linear infinite;
    }
  `;
  document.head.appendChild(style);

  // ---------- Service Page Images Lightbox / Pop-up ----------
  const serviceImages = document.querySelectorAll(
    '.service-details-section img, .fe-section img, .turnkey-image-card img, .fe-image-card img, .thumb img, .main-service-image img, .collage-grid img'
  );

  if (serviceImages.length > 0) {
    // Create modal elements
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image preview');

    lightbox.innerHTML = `
      <div class="image-lightbox-content">
        <button class="image-lightbox-close" aria-label="Close image preview">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img class="image-lightbox-img" src="" alt="Expanded service preview">
        <div class="image-lightbox-caption"></div>
      </div>
    `;

    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.image-lightbox-img');
    const lightboxCaption = lightbox.querySelector('.image-lightbox-caption');
    const closeBtn = lightbox.querySelector('.image-lightbox-close');

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || 'Service preview';
      lightboxCaption.textContent = alt && alt !== 'Service preview' ? alt : '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.src = '';
        lightboxCaption.textContent = '';
      }, 300);
    }

    serviceImages.forEach(img => {
      // Don't bind if inside logo or header
      if (img.closest('.logo') || img.closest('.header') || img.closest('.footer')) return;
      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(img.currentSrc || img.src, img.alt);
      });
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('image-lightbox-content')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

});

