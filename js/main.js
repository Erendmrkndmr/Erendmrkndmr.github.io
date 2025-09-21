// ====== Utils ======
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// ====== THEME TOGGLE (data-theme + kalıcı hafıza + sistem tercihi) ======
(function initTheme() {
  const toggle = $('#toggle-theme');
  if (!toggle) return;

  const KEY = 'emd-theme';
  const root = document.documentElement;

  const stored = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', initial);
  toggle.innerText = initial === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
    toggle.innerText = next === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
})();

// ====== SEARCH FILTER (başlık + etiket + kart metni) ======
(function initSearch() {
  const input = $('#searchInput');
  if (!input) return;

  const cards = $$('.blog-card');
  const norm = s => (s || '').toLowerCase();

  const filter = () => {
    const q = norm(input.value);
    cards.forEach(card => {
      const title = norm(card.getAttribute('data-title'));
      const tags  = norm(card.getAttribute('data-tags'));
      const text  = norm(card.innerText);
      const hit = !q || title.includes(q) || tags.includes(q) || text.includes(q);
      card.style.display = hit ? '' : 'none';
    });
  };

  let t;
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(filter, 80);
  });

  filter();
})();

// ====== IMAGE FALLBACK (no-image.png yoksa .jpg dene) ======
(function initImageFallback() {
  const DEFAULTS = ['images/no-image.png', 'images/no-image.jpg'];

  $$('.blog-card img').forEach(img => {
    if (!img.getAttribute('src') || /no-image\.(png|jpg)$/i.test(img.getAttribute('src'))) {
      tryFallback(img, 0);
    }
    img.addEventListener('error', () => {
      const current = img.getAttribute('data-fallback-idx') ? parseInt(img.getAttribute('data-fallback-idx'), 10) : -1;
      tryFallback(img, current + 1);
    });
  });

  function tryFallback(img, idx) {
    if (idx >= DEFAULTS.length) return;
    img.setAttribute('data-fallback-idx', idx);
    img.src = DEFAULTS[idx];
  }
})();
