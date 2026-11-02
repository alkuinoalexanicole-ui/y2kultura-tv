// Router and remote control. Every page swaps inside the TV screen, with static in between.
import { DIAL, findChannel } from './data/channels.js';
import * as views from './views.js';
import { afterRender } from './views.js';
import { noteVisit, wantsBreak, breakHTML, bindBreak } from './breaks.js';
import { changeChannel, showOSD, toggleSound, startTone, stopTone, toneOn, isSoundOn, sfx } from './tv.js';

const BASE = window.Y2K_BASE || '';
const here = () => location.pathname.slice(BASE.length) || '/';
const strip = (href) => (BASE && href.startsWith(BASE + '/') ? href.slice(BASE.length) : href);
// Prefix in-site links with the base path so "open in new tab" works on GitHub Pages.
function fixLinks(root) {
  if (!BASE) return;
  root.querySelectorAll('a[data-link]').forEach((a) => {
    const h = a.getAttribute('href');
    if (h && h.startsWith('/') && !h.startsWith(BASE + '/')) a.setAttribute('href', BASE + h);
  });
}

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
    if (state === 'on') display.textContent = r.num === '--' ? 'GUIDE' : `CH ${r.num}`;
    startSnow();
    fixLinks(view);
    afterRender(view).then(() => fixLinks(view));
    // Color bars on the sign-off page come with the long test-tone beep.
    if (state === 'on' && view.querySelector('[data-tone]')) setTimeout(() => { if (view.querySelector('[data-tone]')) startTone(8); }, 250);
    else stopTone();
  };
  const channelChanged = r.num !== currentNum;
  if (animate) changeChannel(swap);
  else swap();
  if (state === 'on') noteVisit(r.num);
  if (state === 'on' && (channelChanged || animate)) showOSD(r.num === '--' ? 'GUIDE' : r.num, r.name);
  currentNum = r.num;
  if (animate) setTimeout(() => view.focus({ preventScroll: true }), 300);
}

const chOf = (p) => (p.match(/^\/ch\/(\d\d)/) || [])[1] || null;
const breakbox = document.getElementById('breakbox');
const closeBreak = () => {
  breakbox.hidden = true;
  breakbox.innerHTML = '';
};

export function go(path) {
  if (!breakbox.hidden) closeBreak(); // any remote press while a break is open skips it
  if (path === here()) return;
  const from = chOf(here());
  const to = chOf(path);
  if (state === 'on' && wantsBreak(from, to)) return showBreak(from, path, to);
  history.pushState({}, '', BASE + path);
  render(path);
}

// Station Break: an optional mini quiz between channels.
function showBreak(from, path, to) {
  const c = findChannel(from);
  const label = to ? `CH ${to}` : path === '/guide' ? 'GUIDE' : 'CH 00';
  breakbox.innerHTML = breakHTML(from, c.title, label);
  breakbox.hidden = false;
  sfx('tick');
  bindBreak(breakbox, () => {
    if (breakbox.hidden) return;
    closeBreak();
    go(path);
  });
  setTimeout(() => breakbox.querySelector('.sb-x')?.focus({ preventScroll: true }), 50);
}

window.addEventListener('popstate', () => render(here()));

document.addEventListener('click', (ev) => {
  const a = ev.target.closest('a[data-link]');
  if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
  ev.preventDefault();
  go(strip(a.getAttribute('href')));
});

// The "play tone" button on the sign-off page works even when the remote's sound is off.
document.addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-tone-btn]');
  if (!b) return;
  if (toneOn()) stopTone();
  else startTone(8, true);
});

function paintSoundBtn() {
  const on = isSoundOn();
  const b = document.getElementById('sound-btn');
  b.innerHTML = `<i class="ti ${on ? 'ti-volume' : 'ti-volume-off'}"></i>`;
  b.setAttribute('aria-label', on ? 'Sound on. Tap to turn off' : 'Sound off. Tap to turn on');
  b.setAttribute('aria-pressed', String(on));
}
paintSoundBtn();

/* ---------- Power: plug in the TV, then switch it on with the remote ---------- */
const crt = document.getElementById('crt');
const note = document.getElementById('intro-note');
const plug = document.getElementById('plug');
const mains = document.getElementById('mains');
const cordPath = document.getElementById('cord-path');
const powerBtn = document.querySelector('[data-act="power"]');
// Every page load or refresh starts with the TV unplugged.
let state = 'unplugged'; // unplugged → standby → on (and back to standby when switched off)

const NOTES = {
  unplugged: '<b>① Isaksak muna ang TV!</b><span>Drag the plug into the extension cord below the screen, or just tap the plug.</span>',
  standby: '<b>② Pindutin ang POWER</b><span>Press the red power button on the remote to turn on the TV.</span>',
};

function paintState() {
  document.body.classList.remove('unplugged', 'standby', 'on');
  document.body.classList.add(state);
  note.innerHTML = NOTES[state] || '';
  if (state === 'unplugged') display.textContent = '- - -';
  if (state === 'standby') display.textContent = 'STANDBY';
  powerBtn.setAttribute('aria-label', state === 'on' ? 'Power: turn the TV off' : 'Power: turn the TV on');
  plug.disabled = state !== 'unplugged';
  plug.setAttribute('aria-label', state === 'unplugged' ? 'Plug in the TV (drag the plug into the extension cord, or press Enter)' : 'The TV is plugged in');
}

// Plug position along the base, from where the cord leaves the TV to the extension cord's socket.
let plugX = 0;
function plugBounds() {
  const w = mains.clientWidth;
  const sock = mains.querySelector('.socket');
  const start = Math.min(w * 0.18, 60);
  const end = sock.offsetLeft - plug.offsetWidth + 6;
  return { start, end: Math.max(start, end) };
}
function placePlug(x) {
  plugX = x;
  plug.style.left = `${x}px`;
  const h = mains.clientHeight;
  const y = h / 2;
  cordPath.setAttribute('d', `M0,${y - 4} C${x * 0.35},${h - 2} ${x * 0.7},${h - 2} ${x + 2},${y}`);
}
function resetPlug() {
  const { start, end } = plugBounds();
  placePlug(state === 'unplugged' ? start : end);
}

function plugIn() {
  if (state !== 'unplugged') return;
  const { end } = plugBounds();
  plug.classList.add('sliding');
  placePlug(end);
  setTimeout(() => plug.classList.remove('sliding'), 260);
  sfx('plug');
  state = 'standby';
  paintState();
}

let drag = null;
plug.addEventListener('pointerdown', (ev) => {
  if (state !== 'unplugged') return;
  drag = { x0: ev.clientX, p0: plugX, moved: false };
  plug.setPointerCapture(ev.pointerId);
});
plug.addEventListener('pointermove', (ev) => {
  if (!drag) return;
  const { start, end } = plugBounds();
  const dx = ev.clientX - drag.x0;
  if (Math.abs(dx) > 4) drag.moved = true;
  placePlug(Math.min(end, Math.max(start, drag.p0 + dx)));
});
plug.addEventListener('pointerup', () => {
  if (!drag) return;
  const { start, end } = plugBounds();
  const moved = drag.moved;
  drag = null;
  if (!moved || plugX > end - 30) return plugIn();
  plug.classList.add('sliding');
  placePlug(start);
  setTimeout(() => plug.classList.remove('sliding'), 260);
});
plug.addEventListener('click', (ev) => {
  // Keyboard (Enter/Space) arrives as a click with no pointer drag.
  if (ev.detail === 0) plugIn();
});
window.addEventListener('resize', resetPlug);

function nudge() {
  sfx('tick');
  const el = state === 'unplugged' ? plug : powerBtn;
  display.textContent = state === 'unplugged' ? 'NO POWER' : 'PRESS ⏻';
  el.classList.remove('nudge');
  void el.offsetWidth;
  el.classList.add('nudge');
  note.classList.remove('nudge');
  void note.offsetWidth;
  note.classList.add('nudge');
}

function powerOn() {
  state = 'warming';
  display.textContent = 'POWER ON';
  sfx('on');
  crt.classList.remove('turning-off');
  crt.classList.add('turning-on');
  document.body.classList.remove('standby');
  document.body.classList.add('warming');
  setTimeout(() => {
    crt.classList.remove('turning-on');
    document.body.classList.remove('warming');
    state = 'on';
    paintState();
    render(here(), { animate: true });
  }, reduced ? 50 : 650);
}

function powerOff() {
  state = 'cooling';
  stopTone();
  sfx('off');
  crt.classList.add('turning-off');
  document.body.classList.remove('on');
  setTimeout(() => {
    crt.classList.remove('turning-off');
    state = 'standby';
    paintState();
  }, reduced ? 50 : 600);
}

function togglePower() {
  if (state === 'unplugged') return nudge();
  if (state === 'standby') return powerOn();
  if (state === 'on') return powerOff();
}

document.getElementById('skip-intro').addEventListener('click', () => {
  if (state === 'unplugged') plugIn();
  if (state === 'standby') powerOn();
});

/* ---------- Remote ---------- */
function dialIndex() {
  const p = here().replace(/\/+$/, '') || '/';
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
  const p = here().replace(/\/+$/, '');
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
    else render(here(), { animate: false });
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
    if (on && view.querySelector('[data-tone]')) startTone(8);
    paintSoundBtn();
  },
};

document.querySelector('.remote').addEventListener('click', (ev) => {
  const b = ev.target.closest('button');
  if (!b) return;
  if (b.dataset.act === 'power') return togglePower();
  // With the TV off, every other button clicks but does nothing, like a real remote.
  if (state !== 'on') return nudge();
  sfx('tick');
  if (b.dataset.num) typeDigit(b.dataset.num);
  else actions[b.dataset.act]?.();
});

document.addEventListener('keydown', (ev) => {
  if (ev.target.closest('input, textarea, select')) return;
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  if (state !== 'on') return;
  if (ev.key === 'PageUp' || ev.key === '+' || ev.key === '=') { ev.preventDefault(); step(1); }
  else if (ev.key === 'PageDown' || ev.key === '-') { ev.preventDefault(); step(-1); }
  else if (/^[0-9]$/.test(ev.key)) typeDigit(ev.key);
  else if (ev.key === 'g' || ev.key === 'G') go('/guide');
  else if (ev.key === 'Escape' && !breakbox.hidden) { const p = breakbox.querySelector('[data-sb-skip]'); p?.click(); }
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
paintState();
resetPlug();
// The page loads behind the dark screen; it appears once the viewer turns the TV on.
render(here(), { animate: false });
