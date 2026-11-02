// "Station Break": a short, optional mini quiz that appears between channels.
// It shows when a visitor leaves a channel they actually watched (2+ pages or 30+ seconds),
// once per channel per visit. Visitors can skip it, or answer and share a memory.
import { SHEET_URL } from './config.js';

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// One refresher question per channel, answered from what that channel shows.
export const BREAKS = {
  '01': {
    sheet: 'CH 01 Heartstrings',
    q: 'Which band sang the 2005 heartbreak anthem "The Day You Said Goodnight"?',
    options: ['Hale', 'Cueshé', 'Rivermaya', 'Eraserheads'],
    answer: 0,
  },
  '02': {
    sheet: 'CH 02 Tech Talk 2000',
    q: 'What was the very first video uploaded to YouTube, in 2005?',
    options: ['Charlie Bit My Finger', 'Me at the Zoo', 'Evolution of Dance', 'Chocolate Rain'],
    answer: 1,
  },
  '03': {
    sheet: 'CH 03 Global Mix',
    q: 'Which Taiwanese drama started "Meteor fever" in Filipino homes?',
    options: ['Full House', 'Boys Over Flowers', 'Meteor Garden', 'Endless Love'],
    answer: 2,
  },
  '04': {
    sheet: 'CH 04 Style File',
    q: 'The 2009 "Jun Pyo curl" came from which Korean drama?',
    options: ['Coffee Prince', 'Boys Over Flowers', 'Full House', 'Meteor Garden'],
    answer: 1,
  },
  '05': {
    sheet: 'CH 05 Starstruck',
    q: 'Who was named the first Pinoy Big Brother Big Winner in December 2005?',
    options: ['Kim Chiu', 'Yeng Constantino', 'Nene Tamayo', 'Jovit Baldivino'],
    answer: 2,
  },
  '06': {
    sheet: 'CH 06 Place To Be',
    q: 'In what year did SM Mall of Asia open on Manila Bay?',
    options: ['2003', '2006', '2008', '2010'],
    answer: 1,
  },
  '07': {
    sheet: 'CH 07 Then vs Now',
    q: 'In the 2000s, the Philippines was called the "___ Capital of the World."',
    options: ['Karaoke', 'Mall', 'Texting', 'Teleserye'],
    answer: 2,
  },
  '08': {
    sheet: 'CH 08 Behind the Broadcast',
    q: 'Which channel brought back the most memories for you?',
    options: ['CH 01 Heartstrings', 'CH 02 Tech Talk 2000', 'CH 03 Global Mix', 'CH 04 Style File', 'CH 05 Starstruck!', 'CH 06 Place To Be', 'CH 07 Then vs. Now'],
    answer: null, // an opinion, not a quiz
  },
};

const FEELS = ['Bago sa akin', 'Medyo', 'Naaalala ko', 'Miss ko na', 'Grabe, nostalgic!'];

// Remember which channels already had their break, for this visit.
const shown = new Set();
const seen = {}; // channel → { pages, since }

export function noteVisit(num) {
  if (!BREAKS[num]) return;
  const s = (seen[num] = seen[num] || { pages: 0, since: Date.now() });
  s.pages += 1;
}

// Should leaving `fromNum` for `toNum` show a station break?
export function wantsBreak(fromNum, toNum) {
  if (!fromNum || fromNum === toNum || !BREAKS[fromNum] || shown.has(fromNum)) return false;
  const s = seen[fromNum];
  if (!s) return false;
  return s.pages >= 2 || Date.now() - s.since >= 30000;
}

export function breakHTML(num, title, nextLabel) {
  const b = BREAKS[num];
  shown.add(num);
  return `<div class="sb" role="dialog" aria-modal="true" aria-labelledby="sb-title">
    <div class="sb-card">
      <div class="sb-top"><span class="sb-tag an">STATION BREAK</span><span class="sb-ch">After CH ${esc(num)} · ${esc(title)}</span><button type="button" class="sb-x" data-sb-skip aria-label="Skip the station break">SKIP ✕</button></div>
      <h2 id="sb-title" class="sb-title an">Mabilisang tanong!</h2>
      <p class="sb-sub">A quick, optional refresher. Answer if you like, or skip to the next channel anytime.</p>
      <form class="sb-form" data-sb="${esc(num)}" novalidate>
        <fieldset class="sb-q"><legend>${esc(b.q)}</legend>
          <div class="sb-opts">${b.options
            .map((o, i) => `<label class="sb-opt"><input type="radio" name="answer" value="${i}"><span>${esc(o)}</span></label>`)
            .join('')}</div>
          <p class="sb-result" aria-live="polite"></p>
        </fieldset>
        <fieldset class="sb-q"><legend>Gaano ka ka-nostalgic sa channel na ito? <small>How nostalgic did it make you feel?</small></legend>
          <div class="sb-feels">${FEELS.map((f, i) => `<label class="sb-feel"><input type="radio" name="nostalgia" value="${i + 1}"><span><b>${i + 1}</b>${esc(f)}</span></label>`).join('')}</div>
        </fieldset>
        <label class="sb-field"><span>Share a 2000s memory <small>(optional)</small></span>
          <textarea name="memory" maxlength="400" rows="2" placeholder="Hal. Every Sunday, our whole street watched..."></textarea></label>
        <div class="sb-row">
          <label class="sb-field"><span>First name <small>(optional)</small></span><input name="name" maxlength="30" autocomplete="given-name"></label>
          <label class="sb-field"><span>City <small>(optional)</small></span><input name="city" maxlength="40" autocomplete="address-level2"></label>
          <label class="sb-hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <p class="sb-privacy">Please share only your first name and city, no phone numbers or addresses. Answers are saved for the museum.</p>
        <div class="sb-actions">
          <button type="submit" class="btn sb-send">IPADALA · SEND</button>
          <button type="button" class="btn ghost sb-skip" data-sb-skip>SKIP ▶ ${esc(nextLabel)}</button>
        </div>
      </form>
      <div class="sb-thanks" hidden><div class="an">Salamat!</div><p>Thanks for sharing. Balik tayo sa programa...</p></div>
    </div>
  </div>`;
}

function send(payload) {
  if (!SHEET_URL) return Promise.resolve(false);
  // text/plain keeps this a "simple" request that Google Apps Script accepts from any site.
  return fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
    .then(() => true)
    .catch(() => false);
}

// Wire up the break shown in `box`; `done()` continues to the next channel.
export function bindBreak(box, done) {
  const form = box.querySelector('.sb-form');
  const num = form.dataset.sb;
  const b = BREAKS[num];
  const result = form.querySelector('.sb-result');
  box.querySelectorAll('[data-sb-skip]').forEach((x) => x.addEventListener('click', done));
  form.querySelectorAll('input[name="answer"]').forEach((r) =>
    r.addEventListener('change', () => {
      if (b.answer == null) return;
      const ok = Number(r.value) === b.answer;
      result.textContent = ok ? 'TAMA! You remembered.' : `Sayang! The answer is ${b.options[b.answer]}.`;
      result.className = `sb-result ${ok ? 'ok' : 'no'}`;
      form.querySelectorAll('input[name="answer"]').forEach((x) => (x.disabled = true));
      form.querySelectorAll('.sb-opt').forEach((l, i) => {
        if (i === b.answer) l.classList.add('right');
        else if (l.contains(r)) l.classList.add('wrong');
      });
    })
  );
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const f = new FormData(form);
    const picked = form.querySelector('input[name="answer"]:checked');
    const ans = picked ? Number(picked.value) : null;
    const memory = String(f.get('memory') || '').trim();
    const nostalgia = f.get('nostalgia');
    if (ans == null && !nostalgia && !memory) {
      result.textContent = 'Pick an answer, a feeling, or share a memory first, or just skip.';
      result.className = 'sb-result no';
      return;
    }
    const btn = form.querySelector('.sb-send');
    btn.disabled = true;
    btn.textContent = 'SENDING...';
    await send({
      channel: b.sheet,
      question: b.q,
      answer: ans == null ? '' : b.options[ans],
      correct: b.answer == null || ans == null ? '' : ans === b.answer,
      nostalgia: nostalgia || '',
      memory,
      name: String(f.get('name') || '').trim(),
      city: String(f.get('city') || '').trim(),
      website: String(f.get('website') || ''),
    });
    form.hidden = true;
    box.querySelector('.sb-thanks').hidden = false;
    setTimeout(done, 1600);
  });
}
