/* ============================================================
   GSECURELABS — Interactions & Motion
   ============================================================ */

(function () {
  'use strict';

  /* ---- Sticky nav scroll state ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 12) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile nav ---- */
  const mobileNav = document.getElementById('mobileNav');
  const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (navClose && mobileNav) {
    navClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  document.querySelectorAll('.mobile-nav-link[data-toggle]').forEach((el) => {
    el.addEventListener('click', () => {
      const sub = el.nextElementSibling;
      if (sub) sub.classList.toggle('open');
      const arrow = el.querySelector('svg');
      if (arrow) arrow.style.transform = sub && sub.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---- Counters ---- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const dur = 1600;
        const start = performance.now();
        const fmt = el.dataset.format || '';
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = target * eased;
          if (fmt === 'int') el.textContent = Math.floor(val);
          else if (fmt === 'plus') el.textContent = Math.floor(val) + '+';
          else el.textContent = val.toFixed(0);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => co.observe(c));
  }

  /* ---- Modal (Talk to us) ---- */
  const modal = document.getElementById('modalCall');
  document.querySelectorAll('[data-open-modal]').forEach((b) => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.matches('.modal-close, .modal-close *')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Tabs ---- */
  document.querySelectorAll('[data-tabs]').forEach((root) => {
    const tabs = root.querySelectorAll('.tab');
    const panes = root.parentElement.querySelectorAll('.tab-pane');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        panes.forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        const id = tab.dataset.tab;
        const target = root.parentElement.querySelector(`[data-pane="${id}"]`);
        if (target) target.classList.add('active');
      });
    });
  });

  /* ---- Smooth scroll for anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---- Hero text reveal ---- */
  document.querySelectorAll('.text-reveal').forEach((el, i) => {
    const span = el.querySelector('span');
    if (span) span.style.animationDelay = (0.05 + i * 0.08) + 's';
  });

  /* ---- Tilt for cards ---- */
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    const max = 6;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  /* ---- Marquee duplicator (for seamless loop) ---- */
  document.querySelectorAll('.marquee').forEach((m) => {
    const track = m.querySelector('.marquee-track');
    if (!track) return;
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    m.appendChild(clone);
  });

  /* ---- Form submit prevention (demo) ---- */
  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = '✓ Sent — we’ll be in touch';
        btn.style.background = 'linear-gradient(120deg, #10b981, #059669)';
        btn.style.color = '#fff';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
      }
    });
  });

  /* ---- Subtle parallax on hero visual ---- */
  const heroVis = document.querySelector('.hero-visual');
  if (heroVis) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      heroVis.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }

})();
