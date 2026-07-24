/* ═══════════════════════════════════════════════════════════════
   ASSASSIN AI — Official Website JavaScript
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  'use strict';

  // ── Constants ────────────────────────────────────────────
  const SELECTORS = {
    navbar: '.navbar',
    navLinks: '.nav-links',
    navToggle: '.nav-toggle',
    backToTop: '.back-to-top',
    loadingScreen: '.loading-screen',
    hero: '.hero',
    counters: '[data-count-to]',
    faqItems: '.faq-item',
    fadeElements: '.fade-in, .fade-in-left, .fade-in-right',
    statNumbers: '.stat-number',
  };

  const OFFSET = 80; // scroll offset for animations

  // ── Loading Screen ───────────────────────────────────────
  const loadingScreen = document.querySelector(SELECTORS.loadingScreen);
  if (loadingScreen) {
    window.addEventListener('load', () => {
      setTimeout(() => loadingScreen.classList.add('hidden'), 600);
    });
    // Fallback: hide after 3s even if load doesn't fire
    setTimeout(() => {
      if (!loadingScreen.classList.contains('hidden')) {
        loadingScreen.classList.add('hidden');
      }
    }, 3000);
  }

  // ── Navbar ───────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksEl = document.querySelector('.nav-links');
  let lastScroll = 0;

  function updateNavbar() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Active section highlight
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksEl.classList.toggle('open');
      document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksEl.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Smooth Scrolling ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - (OFFSET + 10);
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Back to Top ─────────────────────────────────────────
  const backToTop = document.querySelector(SELECTORS.backToTop);
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Scroll Reveal (Intersection Observer) ───────────────
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add small delay based on element index for stagger effect
        const parent = entry.target.closest('[data-stagger]');
        let delay = 0;
        if (parent) {
          const index = Array.from(parent.children).indexOf(entry.target);
          delay = Math.min(index * 80, 400);
        }
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(SELECTORS.fadeElements).forEach(el => {
    revealObserver.observe(el);
  });

  // Also observe staggered items
  document.querySelectorAll('.features-grid > *, .stats-grid > *, .why-us-list > *, ' +
    '.roadmap-grid > *, .testimonials-grid > *, .commands-grid > *, .status-grid > *').forEach(el => {
    el.classList.add('fade-in');
    revealObserver.observe(el);
  });

  // ── Animated Counters ────────────────────────────────────
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count-to'), 10);
        const suffix = el.getAttribute('data-count-suffix') || '+';
        const duration = 2000;
        const start = performance.now();

        function animateCounter(time) {
          const elapsed = time - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = current.toLocaleString() + suffix;
          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            el.textContent = target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(animateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(SELECTORS.counters).forEach(el => {
    counterObserver.observe(el);
  });

  // ── FAQ Accordion ────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all other FAQs
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
        }
      });

      // Toggle this one
      item.classList.toggle('open', !isOpen);
    });
  });

  // ── Category Filter for Commands ─────────────────────────
  const categoryBtns = document.querySelectorAll('.category-btn');
  const commandItems = document.querySelectorAll('.command-item');

  if (categoryBtns.length && commandItems.length) {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.category || 'all';
        commandItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'flex';
            item.classList.add('fade-in');
            item.classList.add('visible');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Command Search ───────────────────────────────────────
  const commandSearch = document.querySelector('.command-search');
  if (commandSearch && commandItems.length) {
    commandSearch.addEventListener('input', () => {
      const query = commandSearch.value.toLowerCase().trim();

      // Reset category buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('.category-btn[data-category="all"]');
      if (allBtn) allBtn.classList.add('active');

      commandItems.forEach(item => {
        const cmd = item.querySelector('.command-cmd')?.textContent?.toLowerCase() || '';
        const desc = item.querySelector('.command-desc')?.textContent?.toLowerCase() || '';
        const match = cmd.includes(query) || desc.includes(query);
        item.style.display = !query || match ? 'flex' : 'none';
      });
    });
  }

  // ── Parallax Hero Effect ────────────────────────────────
  const heroGlows = document.querySelectorAll('.hero-glow');
  if (heroGlows.length && window.innerWidth > 768) {
    document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      heroGlows.forEach((glow, i) => {
        const factor = i === 0 ? 1 : -0.8;
        glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }

  // ── Dynamic Year in Footer ──────────────────────────────
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear().toString();
  });

  // ── Clipboard / Copy Detection (for contact email) ──────
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', () => {
      const text = el.getAttribute('data-copy');
      navigator.clipboard?.writeText(text).then(() => {
        const original = el.innerHTML;
        el.innerHTML = '✓ Copied!';
        setTimeout(() => { el.innerHTML = original; }, 2000);
      }).catch(() => {});
    });
  });

  // ── Keyboard Shortcuts ───────────────────────────────────
  document.addEventListener('keydown', (e) => {
    // Escape closes mobile menu
    if (e.key === 'Escape' && navLinksEl.classList.contains('open')) {
      navToggle.click();
    }
  });

  // ── Reduced Motion Preference ────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
      el.classList.add('visible');
    });
  }

  // ── Initial active state for hero sections on page load ──
  // Trigger initial visibility check
  setTimeout(() => {
    // Mark hero elements as visible immediately
    document.querySelectorAll('.hero .fade-in, .hero .fade-in-left, .hero .fade-in-right').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);

  console.log('%c⚔️ Assassin AI', 'font-size:18px;font-weight:bold;color:#5865F2');
  console.log('%cWebsite loaded successfully.', 'font-size:13px;color:#B0B8D1');

}); // DOMContentLoaded end
