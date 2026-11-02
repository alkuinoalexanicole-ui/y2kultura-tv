// TV effects: static between channels, the on-screen channel number, and the static sound.
const canvas = document.getElementById('static');
const osd = document.getElementById('osd');
const ctx = canvas.getContext('2d');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let soundOn = false;
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
  if (!soundOn) return;
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
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
  return soundOn;
}

export const isSoundOn = () => soundOn;

// The 1 kHz test tone that played over the color bars when a station signed off.
let tone = null;
export function startTone(seconds = 8, force = false) {
  if (!soundOn && !force) return;
  stopTone();
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
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
