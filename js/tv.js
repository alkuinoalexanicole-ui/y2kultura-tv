// TV effects: static between channels, the on-screen channel number, and the static sound.
const canvas = document.getElementById('static');
const osd = document.getElementById('osd');
const ctx = canvas.getContext('2d');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Sound is on by default; a viewer who turns it off stays off on their next visit.
let soundOn = true;
try {
  if (localStorage.getItem('y2k-sound') === 'off') soundOn = false;
} catch (e) {
  /* storage unavailable: keep the default */
}

// Browsers only allow sound after the viewer has clicked or tapped the page once.
const canPlay = () => !navigator.userActivation || navigator.userActivation.hasBeenActive;
function ctxReady() {
  audio = audio || new (window.AudioContext || window.webkitAudioContext)();
  if (audio.state === 'suspended') audio.resume();
  return audio;
}
let audio = null;
let osdTimer = null;

function drawNoise() {
  const w = (canvas.width = 160);
  const h = (canvas.height = 120);
  const img = ctx.createImageData(w, h);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

function hiss(ms) {
  if (!soundOn || !canPlay()) return;
  try {
    ctxReady();
    const len = Math.floor(audio.sampleRate * (ms / 1000));
    const buf = audio.createBuffer(1, len, audio.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = audio.createBufferSource();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();
    filter.type = 'lowpass';
    filter.frequency.value = 3200;
    gain.gain.value = 0.06;
    gain.gain.setTargetAtTime(0, audio.currentTime + ms / 1000 - 0.08, 0.03);
    src.buffer = buf;
    src.connect(filter).connect(gain).connect(audio.destination);
    src.start();
  } catch (e) {
    /* Sound is optional; ignore browsers that block it. */
  }
}

// Shows static for a moment, runs `swap` in the middle, then clears.
export function changeChannel(swap) {
  const ms = reduced ? 120 : 380;
  hiss(ms);
  canvas.classList.add('on');
  let frame;
  const start = performance.now();
  const loop = (t) => {
    drawNoise();
    if (t - start < ms) frame = requestAnimationFrame(loop);
  };
  if (!reduced) frame = requestAnimationFrame(loop);
  else drawNoise();
  setTimeout(swap, ms / 2);
  setTimeout(() => {
    cancelAnimationFrame(frame);
    canvas.classList.remove('on');
  }, ms);
}

export function showOSD(num, name) {
  osd.innerHTML = num === 'GUIDE' ? 'GUIDE' : `CH ${num}${name ? `<small>${name}</small>` : ''}`;
  osd.classList.add('on');
  clearTimeout(osdTimer);
  osdTimer = setTimeout(() => osd.classList.remove('on'), 2000);
}

export function toggleSound() {
  soundOn = !soundOn;
  if (!soundOn) stopTone();
  try {
    localStorage.setItem('y2k-sound', soundOn ? 'on' : 'off');
  } catch (e) {
    /* storage unavailable: the choice lasts for this visit */
  }
  return soundOn;
}

export const isSoundOn = () => soundOn;

// Small effects for the TV itself: button clicks, plugging in, and the CRT powering on and off.
function noise(dur, { type = 'bandpass', freq = 2000, q = 1, vol = 0.08, at = 0 } = {}) {
  const len = Math.max(1, Math.floor(audio.sampleRate * dur));
  const buf = audio.createBuffer(1, len, audio.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = audio.createBufferSource();
  const f = audio.createBiquadFilter();
  const g = audio.createGain();
  f.type = type; f.frequency.value = freq; f.Q.value = q; g.gain.value = vol;
  src.buffer = buf;
  src.connect(f).connect(g).connect(audio.destination);
  src.start(audio.currentTime + at);
}
function tone2(freq, dur, { vol = 0.1, to = null, type = 'sine', at = 0 } = {}) {
  const o = audio.createOscillator();
  const g = audio.createGain();
  const t = audio.currentTime + at;
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(audio.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}
export function sfx(name) {
  if (!soundOn || !canPlay()) return;
  try {
    ctxReady();
    if (name === 'tick') noise(0.025, { type: 'highpass', freq: 3000, vol: 0.12 });
    if (name === 'plug') { noise(0.05, { freq: 1400, q: 2, vol: 0.35 }); tone2(110, 0.12, { vol: 0.25, to: 60 }); }
    if (name === 'on') {
      tone2(70, 0.35, { vol: 0.35, to: 40 });
      noise(0.5, { type: 'lowpass', freq: 600, vol: 0.12, at: 0.05 });
      tone2(8000, 1.2, { vol: 0.012, at: 0.1 });
    }
    if (name === 'ding') { tone2(880, 0.18, { vol: 0.12 }); tone2(1320, 0.3, { vol: 0.1, at: 0.12 }); }
    if (name === 'buzz') tone2(140, 0.45, { vol: 0.12, type: 'square' });
    if (name === 'off') { tone2(900, 0.35, { vol: 0.08, to: 70 }); noise(0.12, { type: 'lowpass', freq: 900, vol: 0.08 }); }
  } catch (e) {
    /* Sound is optional; ignore browsers that block it. */
  }
}

// The 1 kHz test tone that played over the color bars when a station signed off.
let tone = null;
export function startTone(seconds = 8, force = false) {
  if ((!soundOn && !force) || !canPlay()) return;
  stopTone();
  try {
    ctxReady();
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const t = audio.currentTime;
    osc.type = 'sine';
    osc.frequency.value = 1000;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 0.04);
    gain.gain.setValueAtTime(0.05, t + seconds - 0.08);
    gain.gain.linearRampToValueAtTime(0, t + seconds);
    osc.connect(gain).connect(audio.destination);
    osc.start(t);
    osc.stop(t + seconds + 0.05);
    tone = { osc, gain };
    osc.onended = () => { if (tone?.osc === osc) tone = null; };
  } catch (e) {
    /* Sound is optional; ignore browsers that block it. */
  }
}

export function stopTone() {
  if (!tone || !audio) return;
  const { osc, gain } = tone;
  tone = null;
  try {
    gain.gain.cancelScheduledValues(audio.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, audio.currentTime);
    gain.gain.linearRampToValueAtTime(0, audio.currentTime + 0.05);
    osc.stop(audio.currentTime + 0.06);
  } catch (e) {
    /* already stopped */
  }
}

export const toneOn = () => !!tone;
