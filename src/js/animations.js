function initAnimations() {
  // 0. Initialize Smooth Scrolling (Lenis + Anchor Navigation)
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Hook anchor links to Lenis smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement, { offset: -80 });
          }
        }
      });
    });
  } else {
    // Fallback anchor smooth scrolling if Lenis CDN is unavailable
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // 1. Header Scroll Effect
  const header = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation Toggle & Accordion Logic
  const hamburger = document.getElementById('hamburger-menu');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', openDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // Accordion Toggles Inside Mobile Drawer
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentGroup = trigger.closest('.drawer-nav-group');
      if (parentGroup) {
        parentGroup.classList.toggle('active');
      }
    });
  });

  // Close drawer when links inside drawer are clicked
  const drawerLinks = document.querySelectorAll('#mobile-drawer a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // 3. Scroll Reveal Animations - Make all reveal elements immediately visible on load
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-soft, .reveal-icon, .reveal-quote');
  revealElements.forEach(el => el.classList.add('in-view'));
  // 4. Gallery Lightbox & Marquee
  async function initGallery() {
    const marqueeContainer = document.getElementById('gallery-marquee');
    if (!marqueeContainer) return;

    try {
      const response = await fetch('assets/images/gallery/');
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = Array.from(doc.querySelectorAll('a'));
      
      const imageNames = links
        .map(a => a.getAttribute('href'))
        .filter(href => href.match(/\.(webp|jpg|jpeg|png)$/i));

      if (imageNames.length === 0) return;

      let imagesHtml = '';
      imageNames.forEach((imgName, index) => {
        const imgSrc = `assets/images/gallery/${decodeURIComponent(imgName)}`;
        imagesHtml += `
          <div class="gallery-item" data-index="${index}">
            <img src="${imgSrc}" alt="Gallery Image ${index + 1}" loading="lazy">
            <div class="gallery-overlay"></div>
          </div>
        `;
      });

      // Add two sets for perfect infinite scrolling
      marqueeContainer.innerHTML = imagesHtml + imagesHtml;
      
      const imageSources = imageNames.map(img => `assets/images/gallery/${decodeURIComponent(img)}`);
      setupLightbox(imageSources);

    } catch (error) {
      console.error('Failed to load gallery images:', error);
    }
  }

  function setupLightbox(images) {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (!lightbox) return;

    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      lightboxImg.classList.remove('loaded');
      setTimeout(() => {
        lightboxImg.src = images[currentIndex];
        lightboxImg.onload = () => lightboxImg.classList.add('loaded');
      }, 200);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; lightboxImg.classList.remove('loaded'); }, 400);
    }

    function nextImage(e) {
      if (e) e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox(currentIndex);
    }

    function prevImage(e) {
      if (e) e.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(currentIndex);
    }

    const marqueeContainer = document.getElementById('gallery-marquee');
    marqueeContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) {
        const index = parseInt(item.getAttribute('data-index'));
        if (!isNaN(index)) {
          openLightbox(index);
        }
      }
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    });
  }

  initGallery();

  // 5. Private Viewing Modal
  const pvModal = document.getElementById('private-viewing-modal');
  const pvTriggers = document.querySelectorAll('.private-viewing-trigger');
  
  if (pvModal) {
    const pvClose = pvModal.querySelector('.modal-close');
    const pvBackdrop = pvModal.querySelector('.modal-backdrop');
    
    // Accessibility: Focus trap
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = pvModal.querySelectorAll(focusableElements)[0];
    const focusableContent = pvModal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    function openPvModal(e) {
      if (e) e.preventDefault();
      pvModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (firstFocusableElement) {
          setTimeout(() => firstFocusableElement.focus(), 100);
      }
    }

    function closePvModal() {
      pvModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    pvTriggers.forEach(trigger => {
      trigger.addEventListener('click', openPvModal);
    });

    if (pvClose) pvClose.addEventListener('click', closePvModal);
    if (pvBackdrop) pvBackdrop.addEventListener('click', closePvModal);

    document.addEventListener('keydown', (e) => {
      if (!pvModal.classList.contains('active')) return;
      if (e.key === 'Escape') closePvModal();

      // Focus trap logic
      let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
      if (!isTabPressed) return;

      if (e.shiftKey) { 
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
  }

  // 6. Hero Scroll Parallax & Fog Animation
  const heroSection = document.getElementById('hero');
  const heroBg = document.querySelector('.hero-bg');
  const fog1 = document.querySelector('.fog-layer.fog-1');
  const fog2 = document.querySelector('.fog-layer.fog-2');
  
  if (heroSection && heroBg && fog1 && fog2) {
    // Disable CSS animations so JS can take over transform for GPU hardware acceleration
    fog1.style.animation = 'none';
    fog2.style.animation = 'none';

    let lastTime = performance.now();
    let drift1 = 0;
    let drift2 = -50; // starts at -50% because reverse

    function updateParallax(currentTime) {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      
      // Update drift regardless of scroll so fog keeps moving
      // 30s (30000ms) for 50%. 50 / 30000 = 0.001666% per ms
      drift1 -= (50 / 30000) * deltaTime;
      if (drift1 <= -50) drift1 += 50;

      // 45s (45000ms) for 50%. 50 / 45000 = 0.001111% per ms, moving right (reverse)
      drift2 += (50 / 45000) * deltaTime;
      if (drift2 >= 0) drift2 -= 50;

      if (scrollY <= heroHeight * 1.5) {
        const progress = scrollY / heroHeight;
        
        // Background image moves the slowest (Parallax)
        heroBg.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;

        // Fog layers move upward at different speeds (multi-layer parallax)
        const y1 = scrollY * -0.25; 
        const y2 = scrollY * -0.15; 

        // Apply transforms using translate3d for GPU acceleration
        fog1.style.transform = `translate3d(${drift1}%, ${y1}px, 0)`;
        fog2.style.transform = `translate3d(${drift2}%, ${y2}px, 0)`;

        // Bottom mist gently fades out as the About section enters viewport
        const opacity = Math.max(0, 1 - (progress * 1.5));
        fog1.style.opacity = opacity.toFixed(3);
        fog2.style.opacity = opacity.toFixed(3);
      }
      
      requestAnimationFrame(updateParallax);
    }
    
    requestAnimationFrame(updateParallax);
  }

  // FAQ Accordion Logic
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-question');
    const answerWrapper = card.querySelector('.faq-answer-wrapper');
    
    btn.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      
      // Close all other accordions (optional, but good for luxury feel)
      faqCards.forEach(c => {
        c.classList.remove('active');
        const wrapper = c.querySelector('.faq-answer-wrapper');
        if (wrapper) wrapper.style.maxHeight = null;
      });
      
      if (!isActive) {
        card.classList.add('active');
        answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";
      }
    });
  });

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
