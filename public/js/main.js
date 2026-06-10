/**
 * KingsWillow Craft Co. — Shared JavaScript
 * Navigation, animations, API calls, utilities
 */

// ── Navigation active state ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/') ||
        (currentPath !== '/' && href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('active');
    }
  });

  // Mobile hamburger toggle
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
  }

  // Scroll-triggered nav shadow
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 40
        ? '0 4px 24px rgba(0,0,0,0.25)'
        : 'none';
    }, { passive: true });
  }

  // Intersection observer for animate-in elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });

  // Init newsletter form (footer)
  initNewsletterForm();
});

// ── Newsletter form ────────────────────────────────────────────────────────
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button');
    const email = input.value.trim();

    if (!email) return;

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>';

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#2ecc71';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }
    } catch {
      btn.textContent = 'Subscribe';
      btn.disabled = false;
    }
  });
}

// ── API helper ─────────────────────────────────────────────────────────────
async function apiGet(endpoint) {
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiPost(endpoint, body) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

// ── Counter animation ──────────────────────────────────────────────────────
function animateCounter(el, target, duration = 1800) {
  const start = 0;
  const step = (timestamp) => {
    if (!el._startTime) el._startTime = timestamp;
    const progress = Math.min((timestamp - el._startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}

// ── Bat SVG helper ─────────────────────────────────────────────────────────
function createBatSVG(color1 = '#C8860A', color2 = '#8B5E1A', id = 'woodGrad') {
  return `<svg class="bat-svg" viewBox="0 0 80 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${color1}"/>
        <stop offset="40%" stop-color="#E8A530"/>
        <stop offset="100%" stop-color="${color2}"/>
      </linearGradient>
    </defs>
    <!-- Handle -->
    <rect x="33" y="0" width="14" height="55" rx="3" class="bat-handle-wrap"/>
    <!-- Splice -->
    <polygon points="26,55 54,55 58,75 22,75" fill="#a0601a" opacity="0.7"/>
    <!-- Blade body -->
    <path d="M22 70 Q18 90 16 110 Q14 130 15 150 Q16 170 18 178 Q20 185 40 187 Q60 185 62 178 Q64 170 65 150 Q66 130 64 110 Q62 90 58 70 Z" class="bat-body"/>
    <!-- Grain lines -->
    <line x1="28" y1="75" x2="26" y2="185" class="bat-grain"/>
    <line x1="36" y1="74" x2="35" y2="186" class="bat-grain"/>
    <line x1="44" y1="74" x2="43" y2="186" class="bat-grain"/>
    <line x1="52" y1="75" x2="51" y2="185" class="bat-grain"/>
    <!-- Toe -->
    <ellipse cx="40" cy="186" rx="22" ry="5" class="bat-toe"/>
  </svg>`;
}
