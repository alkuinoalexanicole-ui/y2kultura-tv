// Router and remote control. Every page swaps inside the TV screen, with static in between.
import { DIAL, findChannel } from './data/channels.js';
import * as views from './views.js';
import { changeChannel, showOSD, toggleSound } from './tv.js';

const view = document.getElementById('view');
const display = document.getElementById('remote-display');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Routing ---------- */
function resolve(path) {
  const parts = path.replace(/\/+$/, '').split('/').filter(Boolean);
  if (parts.length === 0) return { num: '00', name: 'Y2KULTURA', html: views.home(), title: 'Y2Kultura TV Network' };
  if (parts[0] === 'guide') return { num: '--', name: 'GUIDE', html: views.guide(), title: 'Channel Guide · Y2Kultura' };
  if (parts[0] === 'ch') {
    const c = findChannel(parts[1]);
    if (c && !c.data) return { num: c.num, name: c.title.toUpperCase(), html: views.standby(c), title: `CH ${c.num} ${c.title} · Y2Kultura` };
    if (c && c.data) {
      if (!parts[2]) return { num: c.num, name: c.title.toUpperCase(), html: views.channel(c), title: `CH ${c.num} ${c.title} · Y2Kultura` };
      const e = c.data.episodes.find((x) => x.slug === parts[2]);
      if (e) {
        const pi = parts[3] ? e.parts.findIndex((p) => p.slug === parts[3]) : null;
        if (pi !== -1) {
          const t = pi == null ? e.title : e.parts[pi].title;
          return { num: c.num, name: c.title.toUpperCase(), html: views.episode(c, e, pi), title: `${t} · CH ${c.num} · Y2Kultura` };
        }
      }
    }
  }
  return { num: '00', name: 'NO SIGNAL', html: views.home(), title: 'Y2Kultura TV Network', notFound: true };
}

let currentNum = null;

function render(path, { animate = true } = {}) {
  const r = resolve(path);
  const swap = () => {
    view.innerHTML = r.html;
    view.scrollTop = 0;
    document.title = r.title;
    display.textContent = r.num === '--' ? 'GUIDE' : `CH ${r.num}`;
    startSnow();
  };
  const channelChanged = r.num !== currentNum;
  if (animate) changeChannel(swap);
  else swap();
  if (channelChanged || animate) showOSD(r.num === '--' ? 'GUIDE' : r.num, r.name);
  currentNum = r.num;
  if (animate) setTimeout(() => view.focus({ preventScroll: true }), 300);
}

export function go(path) {
  if (path === location.pathname) return;
  history.pushState({}, '', path);
  render(path);
}

window.addEventListener('popstate', () => render(location.pathname));

document.addEventListener('click', (ev) => {
  const a = ev.target.closest('a[data-link]');
  if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
  ev.preventDefault();
  go(a.getAttribute('href'));
});

/* ---------- Remote ---------- */
function dialIndex() {
  const p = location.pathname.replace(/\/+$/, '') || '/';
  const m = p.match(/^\/ch\/(\d\d)/);
  const key = m ? `/ch/${m[1]}` : p;
  const i = DIAL.indexOf(key);
  return i === -1 ? 0 : i;
}
function step(dir) {
  const i = (dialIndex() + dir + DIAL.length) % DIAL.length;
  go(DIAL[i]);
}
function up() {
  const p = location.pathname.replace(/\/+$/, '');
  const parts = p.split('/').filter(Boolean);
  if (parts.length <= 1) return go(parts[0] === 'guide' ? '/' : '/guide');
  if (parts[0] === 'ch' && parts.length === 2) return go('/guide');
  go('/' + parts.slice(0, -1).join('/'));
}

let typed = '';
let typedTimer = null;
function typeDigit(n) {
  typed = (typed + n).slice(-2);
  display.textContent = `CH ${typed.padEnd(2, '-')}`;
  clearTimeout(typedTimer);
  const commit = () => {
    const num = typed.padStart(2, '0');
    typed = '';
    if (num === '00') return go('/');
    if (findChannel(num)) go(`/ch/${num}`);
    else render(location.pathname, { animate: false });
  };
  if (typed.length === 2) commit();
  else typedTimer = setTimeout(commit, 900);
}

const actions = {
  home: () => go('/'),
  guide: () => go('/guide'),
  back: up,
  up: () => step(1),
  down: () => step(-1),
  sound: () => {
    const on = toggleSound();
    const b = document.getElementById('sound-btn');
    b.innerHTML = `<i class="ti ${on ? 'ti-volume' : 'ti-volume-off'}"></i>`;
    b.setAttribute('aria-label', on ? 'Sound on' : 'Sound off');
  },
};

document.querySelector('.remote').addEventListener('click', (ev) => {
  const b = ev.target.closest('button');
  if (!b) return;
  if (b.dataset.num) typeDigit(b.dataset.num);
  else actions[b.dataset.act]?.();
});

document.addEventListener('keydown', (ev) => {
  if (ev.target.closest('input, textarea, select')) return;
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  if (ev.key === 'PageUp' || ev.key === '+' || ev.key === '=') { ev.preventDefault(); step(1); }
  else if (ev.key === 'PageDown' || ev.key === '-') { ev.preventDefault(); step(-1); }
  else if (/^[0-9]$/.test(ev.key)) typeDigit(ev.key);
  else if (ev.key === 'g' || ev.key === 'G') go('/guide');
  else if (ev.key === 'Escape' || ev.key === 'Backspace') { ev.preventDefault(); up(); }
});

/* ---------- Snow inside "video coming soon" boxes ---------- */
let snowTimer = null;
function startSnow() {
  clearInterval(snowTimer);
  const boxes = [...view.querySelectorAll('canvas[data-snow]')];
  if (!boxes.length) return;
  const paint = () =>
    boxes.forEach((cv) => {
      cv.width = 96;
      cv.height = 54;
      const g = cv.getContext('2d');
      const img = g.createImageData(96, 54);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      g.putImageData(img, 0, 0);
    });
  paint();
  if (!reduced) snowTimer = setInterval(paint, 90);
}

/* ---------- Start ---------- */
if (!reduced) view.classList.add('flicker');
render(location.pathname, { animate: true });
