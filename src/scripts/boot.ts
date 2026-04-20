/*
 * All client behaviour for the portfolio in one file:
 *   - theme toggle + system-preference default + persistence
 *   - nav fade-in past 320px scroll (body.scrolled)
 *   - scroll reveal for .reveal elements
 *   - typewriter effect on [data-typewriter]
 * Loaded with `is:inline` in the head pre-paint to avoid FOUC for the theme.
 */

type Mode = 'dark' | 'light';

function initTheme() {
  const saved = localStorage.getItem('theme') as Mode | null;
  const initial: Mode =
    saved === 'light' || saved === 'dark'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  document.documentElement.dataset.mode = initial;

  const wire = (btn: Element) => {
    btn.addEventListener('click', () => {
      const next: Mode = document.documentElement.dataset.mode === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.mode = next;
      localStorage.setItem('theme', next);
      document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((b) => {
        b.textContent = next === 'dark' ? '\u263E' : '\u2600';
        b.title = `Switch to ${next === 'dark' ? 'light' : 'dark'}`;
      });
    });
  };
  document.querySelectorAll('[data-theme-toggle]').forEach(wire);
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((b) => {
    b.textContent = initial === 'dark' ? '\u263E' : '\u2600';
  });
}

function initAnchorScroll() {
  // Intercept same-page anchor clicks so we can scroll to the section *heading*
  // instead of the section's outer box. Without this the section's padding-top
  // pushes the heading a third of the way down the viewport on navigation.
  //
  // Two layout-shift hazards to defend against:
  //   1. Fonts loading asynchronously change text metrics and therefore every
  //      section's vertical position. Wait for document.fonts.ready before
  //      computing the scroll target.
  //   2. Even after fonts, late layout changes (images, typewriter) can shift
  //      positions mid-animation. After the smooth scroll finishes, re-check
  //      the target's position and correct if it drifted.
  const NAV_OFFSET = 72;

  const targetYFor = (head: HTMLElement) =>
    head.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

  const smoothScrollTo = (head: HTMLElement) => {
    const y1 = targetYFor(head);
    window.scrollTo({ top: y1, behavior: 'smooth' });
    // Re-verify on scrollend. If layout shifted while animating, correct once.
    const correct = () => {
      const y2 = targetYFor(head);
      if (Math.abs(y2 - window.scrollY) > 2) {
        window.scrollTo({ top: y2, behavior: 'instant' as ScrollBehavior });
      }
    };
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', correct, { once: true });
    } else {
      setTimeout(correct, 700);
    }
  };

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const a = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const id = href.slice(1);
    const section = document.getElementById(id);
    if (!section) return;
    e.preventDefault();
    const head = (section.querySelector('.section-head') as HTMLElement | null) ?? section;
    // Ensure text metrics are stable before we measure.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => smoothScrollTo(head));
    } else {
      smoothScrollTo(head);
    }
    history.pushState(null, '', href);
  });
}

function initNavScroll() {
  const THRESHOLD = 320;
  let last: boolean | null = null;
  let ticking = false;
  const update = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const next = y > THRESHOLD;
    if (next !== last) {
      last = next;
      document.body.classList.toggle('scrolled', next);
    }
    ticking = false;
  };
  // rAF-throttle: at most one class toggle per frame, regardless of how many
  // scroll events the browser fires during smooth-scroll.
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

function initReveal() {
  // IntersectionObserver only. A scroll listener that calls
  // getBoundingClientRect on every frame forces layout recalculation during
  // smooth-scroll and caused visible jank.
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.01, rootMargin: '0px 0px 100px 0px' },
  );
  for (const el of els) io.observe(el);
  // Safety net: if IO somehow misses (old browser, tab throttled), reveal
  // everything after 1.5s so nothing stays invisible forever.
  setTimeout(() => {
    for (const el of els) el.classList.add('in');
  }, 1500);
}

function initTypewriter() {
  const el = document.querySelector<HTMLElement>('[data-typewriter]');
  if (!el) return;
  const text = el.dataset.text || el.textContent || '';
  const speed = Number(el.dataset.speed || '26');
  const delay = Number(el.dataset.delay || '300');

  el.textContent = '';
  const span = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.innerHTML = '&nbsp;';
  el.append(span, cursor);

  let i = 0;
  const tick = () => {
    if (i >= text.length) {
      cursor.remove();
      return;
    }
    span.textContent = text.slice(0, ++i);
    setTimeout(tick, speed + Math.random() * 28);
  };
  setTimeout(tick, delay);
}

// Theme must run before first paint to avoid FOUC; the rest waits.
initTheme();

const ready = () => {
  initAnchorScroll();
  initNavScroll();
  initReveal();
  initTypewriter();
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
