// Soft background music for the CH 01 Mixtape letter: each band page has a cassette deck
// that plays a 30-second official preview of the band's song from Apple Music, quietly, on loop.
// The song files are never stored on this site; Apple streams the preview and the deck links back
// to the song on Apple Music.
import { isSoundOn } from './tv.js';

const SOFT = 0.16; // background level: low enough to read over
const FADE_MS = 900;

const cache = new Map(); // "artist|title" -> { previewUrl, trackViewUrl } or null
let player = null; // { key, el, gain, ctx, level }
let deck = null; // the deck element on screen
let pausedByUser = false;
let hiddenPause = false;
let jsonpN = 0;

const norm = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const cb = `y2kTunes${++jsonpN}`;
    const s = document.createElement('script');
    const done = () => {
      clearTimeout(t);
      delete window[cb];
      s.remove();
    };
    const t = setTimeout(() => (done(), reject(new Error('timeout'))), 8000);
    window[cb] = (data) => (done(), resolve(data));
    s.onerror = () => (done(), reject(new Error('blocked')));
    s.src = `${url}&callback=${cb}`;
    document.head.appendChild(s);
  });
}

async function search(term, country) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=25&country=${country}`;
  try {
    const r = await fetch(url);
    if (r.ok) return await r.json();
  } catch (e) {
    /* no CORS or offline: try the script-tag form of the same request */
  }
  return jsonp(url);
}

// Pick the studio recording: right artist and title, skipping live, karaoke and cover versions,
// earliest release first.
function pick(results, artist, title) {
  const a = norm(artist);
  const t = norm(title);
  const ok = (results || []).filter((r) => r.previewUrl && norm(r.artistName).includes(a) && norm(r.trackName).startsWith(t));
  const odd = /\b(live|karaoke|instrumental|acoustic|remix|cover|version)\b/;
  const clean = ok.filter((r) => !odd.test(norm(r.trackName)) && !odd.test(norm(r.collectionName)));
  const list = (clean.length ? clean : ok).sort((x, y) => String(x.releaseDate).localeCompare(String(y.releaseDate)));
  return list[0] || null;
}

async function lookup(artist, title) {
  const key = `${artist}|${title}`;
  if (cache.has(key)) return cache.get(key);
  let hit = null;
  for (const country of ['ph', 'us']) {
    try {
      const data = await search(`${artist} ${title}`, country);
      hit = pick(data.results, artist, title);
      if (hit) break;
    } catch (e) {
      /* try the next store */
    }
  }
  const val = hit ? { previewUrl: hit.previewUrl, trackViewUrl: hit.trackViewUrl } : null;
  cache.set(key, val);
  return val;
}

/* ---------- The audio itself ----------
   A gain node keeps the music soft on every device (iPhones ignore an audio element's volume).
   If the preview can't be routed through it, the element's own volume is used instead. */
function makePlayer(key, src, withGain) {
  const el = new Audio();
  el.preload = 'auto';
  if (withGain) el.crossOrigin = 'anonymous';
  el.src = src;
  const p = { key, el, gain: null, ctx: null, level: 0 };
  if (withGain) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      p.ctx = new AC();
      p.gain = p.ctx.createGain();
      p.gain.gain.value = 0;
      p.ctx.createMediaElementSource(el).connect(p.gain).connect(p.ctx.destination);
    } catch (e) {
      p.ctx = null;
      p.gain = null;
    }
  }
  if (!p.gain) el.volume = 0;
  // Fade out near the end of the 30 seconds, then start again softly.
  el.addEventListener('timeupdate', () => {
    if (player === p && el.duration && el.duration - el.currentTime < 1.6 && p.level > 0.01 && !p.ending) {
      p.ending = true;
      level(p, 0, 1400);
    }
  });
  el.addEventListener('ended', () => {
    if (player !== p) return;
    p.ending = false;
    el.currentTime = 0;
    el.play().then(() => level(p, SOFT, FADE_MS)).catch(() => {});
  });
  return p;
}

function level(p, target, ms) {
  p.level = target;
  if (p.gain) {
    const now = p.ctx.currentTime;
    p.gain.gain.cancelScheduledValues(now);
    p.gain.gain.setValueAtTime(p.gain.gain.value, now);
    p.gain.gain.linearRampToValueAtTime(target, now + ms / 1000);
    return;
  }
  const from = p.el.volume;
  const t0 = performance.now();
  clearInterval(p.fade);
  p.fade = setInterval(() => {
    const k = Math.min(1, (performance.now() - t0) / ms);
    p.el.volume = Math.max(0, Math.min(1, from + (target - from) * k));
    if (k >= 1) clearInterval(p.fade);
  }, 30);
}

function retire(p) {
  if (!p) return;
  level(p, 0, 600);
  setTimeout(() => {
    p.el.pause();
    p.el.removeAttribute('src');
    p.el.load();
    p.ctx?.close().catch(() => {});
  }, 650);
}

async function start(p) {
  try {
    if (p.ctx?.state === 'suspended') await p.ctx.resume();
    await p.el.play();
    level(p, SOFT, FADE_MS);
    paint('playing');
  } catch (e) {
    paint('paused');
  }
}

function pause(p) {
  if (!p) return;
  level(p, 0, 400);
  setTimeout(() => {
    if (p.level === 0) p.el.pause();
  }, 420);
  paint('paused');
}

/* ---------- The deck on screen ---------- */
function paint(state) {
  if (!deck) return;
  deck.dataset.state = state;
  const btn = deck.querySelector('[data-deck-toggle]');
  const status = deck.querySelector('.deck-status');
  const playing = state === 'playing';
  btn.innerHTML = `<i class="ti ${playing ? 'ti-player-pause' : 'ti-player-play'}" aria-hidden="true"></i>`;
  btn.setAttribute('aria-label', playing ? 'Pause the song' : 'Play the song');
  btn.disabled = state === 'loading' || state === 'nosignal';
  status.textContent =
    {
      loading: 'Tuning in…',
      playing: 'Now playing softly · 30-sec preview',
      paused: isSoundOn() ? 'Paused · tap ▶ to play' : 'Sound is off · tap ▶ to play',
      nosignal: 'Walang signal · preview unavailable',
    }[state] || '';
}

function startSong(p) {
  const fail = () => {
    if (player !== p) return;
    // The preview couldn't go through the gain node: play it with the element's own volume.
    if (p.gain) {
      const q = makePlayer(p.key, p.el.src, false);
      retire(p);
      player = q;
      q.el.addEventListener('error', () => player === q && paint('nosignal'), { once: true });
      if (!pausedByUser && isSoundOn()) start(q);
      else paint('paused');
      return;
    }
    paint('nosignal');
  };
  p.el.addEventListener('error', fail, { once: true });
  if (!pausedByUser && isSoundOn() && !document.hidden) start(p);
  else paint('paused');
}

export async function syncMusic(view) {
  deck = view.querySelector('[data-song]');
  if (!deck) {
    retire(player);
    player = null;
    return;
  }
  const { artist, title } = deck.dataset;
  const key = `${artist}|${title}`;
  deck.querySelector('[data-deck-toggle]').addEventListener('click', () => {
    if (!player || player.key !== key) return;
    if (deck.dataset.state === 'playing') {
      pausedByUser = true;
      pause(player);
    } else {
      pausedByUser = false;
      start(player);
    }
  });
  if (player && player.key === key) {
    paint(player.level > 0 && !player.el.paused ? 'playing' : 'paused');
    return;
  }
  // A new band: its song starts fresh, even if the last one was paused.
  pausedByUser = false;
  retire(player);
  player = null;
  paint('loading');
  const thisDeck = deck;
  const hit = await lookup(artist, title);
  if (deck !== thisDeck || !deck.isConnected) return;
  if (!hit) return paint('nosignal');
  const link = deck.querySelector('.deck-am');
  if (link && hit.trackViewUrl) link.href = hit.trackViewUrl;
  player = makePlayer(key, hit.previewUrl, true);
  startSong(player);
}

// The remote's sound button turns the music off and on too.
export function musicSound(on) {
  if (!player) return;
  if (!on) pause(player);
  else if (!pausedByUser) start(player);
}

// Switching the TV off stops the music.
export function stopMusic() {
  retire(player);
  player = null;
  deck = null;
}

// Tapping into a music video on the same page pauses the song so the two don't play over each other.
window.addEventListener('blur', () => {
  setTimeout(() => {
    const f = document.activeElement;
    if (f?.tagName === 'IFRAME' && player && deck?.dataset.state === 'playing') {
      pausedByUser = true;
      pause(player);
    }
  }, 0);
});

// Leaving the browser tab pauses the song; coming back picks it up again.
document.addEventListener('visibilitychange', () => {
  if (!player) return;
  if (document.hidden) {
    hiddenPause = deck?.dataset.state === 'playing';
    if (hiddenPause) pause(player);
  } else if (hiddenPause) {
    hiddenPause = false;
    start(player);
  }
});
