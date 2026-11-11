/**
 * Stern macht's — Premium Landscaping & Garden Construction (Graz)
 * Main Interactive Script (English Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header & Active Navigation Highlighting ---
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    // Header shadow on scroll
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link
    const scrollPos = window.scrollY + 120;
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
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Navigation Drawer ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileNav = () => {
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileNav);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // --- 3. Service Card Click-to-Inquire Pre-selection ---
  const serviceLinks = document.querySelectorAll('[data-service-inquiry]');
  const serviceSelect = document.getElementById('service-type');

  serviceLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetService = link.getAttribute('data-service-inquiry');
      if (serviceSelect && targetService) {
        serviceSelect.value = targetService;
        serviceSelect.classList.add('is-highlighted');
        setTimeout(() => {
          serviceSelect.classList.remove('is-highlighted');
        }, 1500);
      }
    });
  });

  // --- 4. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other FAQ items for clean accordion UX
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // --- 5. Project Lightbox Modal ---
  const projectCards = document.querySelectorAll('.project-card');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightboxModal && lightboxImg) {
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.project-img');
        const title = card.querySelector('.project-title')?.textContent || 'Project View';
        const category = card.querySelector('.project-category')?.textContent || '';

        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || title;
          if (lightboxCaption) {
            lightboxCaption.textContent = category ? `${category} — ${title}` : title;
          }
          lightboxModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // --- 6. Contact Form Validation & Submission Feedback ---
  const contactForm = document.getElementById('contact-form');
  const formStatusAlert = document.getElementById('form-status-alert');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Email regex validation
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Validation helper
    const validateField = (input, isValid) => {
      if (!isValid) {
        input.classList.add('is-invalid');
        return false;
      } else {
        input.classList.remove('is-invalid');
        return true;
      }
    };

    // Live validation on blur
    nameInput.addEventListener('blur', () => {
      validateField(nameInput, nameInput.value.trim().length >= 2);
    });

    emailInput.addEventListener('blur', () => {
      validateField(emailInput, isValidEmail(emailInput.value.trim()));
    });

    messageInput.addEventListener('blur', () => {
      validateField(messageInput, messageInput.value.trim().length >= 10);
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
      const isEmailValid = validateField(emailInput, isValidEmail(emailInput.value.trim()));
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10);

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        if (formStatusAlert) {
          formStatusAlert.className = 'form-status-alert is-error';
          formStatusAlert.innerHTML = '<strong>Please check your details:</strong> Please fill in all required fields correctly.';
          formStatusAlert.style.display = 'block';
        }
        return;
      }

      // Submit feedback simulation with realistic client confirmation
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Processing...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (formStatusAlert) {
          formStatusAlert.className = 'form-status-alert is-success';
          formStatusAlert.innerHTML = `
            <strong>Thank you, ${nameInput.value.trim()}!</strong><br>
            Your inquiry regarding <em>${serviceSelect?.value || 'Garden Project'}</em> has been prepared. We will contact you personally as soon as possible.<br>
            <small style="display:inline-block; margin-top:6px; color:#2e7d32;">(For urgent requests, reach us directly by phone at <a href="tel:+436649605052" style="text-decoration:underline; font-weight:600; color:inherit;">+43 664 9605052</a>.)</small>
          `;
          formStatusAlert.style.display = 'block';
        }

        contactForm.reset();
      }, 700);
    });
  }

  // --- 7. Legal Modals (Legal Notice & Privacy Policy) ---
  const legalTriggers = document.querySelectorAll('[data-modal-target]');
  const legalModals = document.querySelectorAll('.modal-overlay');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  legalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = (modal) => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  legalModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Global escape key listener for all modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && lightboxModal.classList.contains('open')) {
        lightboxModal.classList.remove('open');
        document.body.style.overflow = '';
      }
      legalModals.forEach(modal => {
        if (modal.classList.contains('open')) {
          closeModal(modal);
        }
      });
      if (mobileNav && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    }
  });
});
