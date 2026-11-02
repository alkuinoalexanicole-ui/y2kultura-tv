// "Station Break": a short, optional mini game between channels, styled after
// a different 2000s Filipino TV game show for each channel.
// It shows only between CH 01 and CH 07, when a visitor is in a channel's last episode
// and moves on to the next channel. Every break ends with a nostalgia rating and an optional memory,
// sent to the museum's Google Sheet (see js/config.js and docs/station-break-sheet.gs).
import { SHEET_URL } from './config.js';
import { sfx } from './tv.js';

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);

// Each channel gets its own game. Questions only use facts shown on that channel.
export const BREAKS = {
  '01': {
    sheet: 'CH 01 Heartstrings',
    game: 'deal',
    show: 'Deal or No Deal',
    tag: 'Pumili ng maleta!',
    pool: [
      { q: 'Which band sang the 2005 heartbreak anthem "The Day You Said Goodnight"?', options: ['Hale', 'Cueshé', 'Rivermaya', 'Eraserheads'], answer: 0 },
      { q: 'Which love team starred in the 2007 film One More Chance?', options: ['Kim Chiu and Gerald Anderson', 'John Lloyd Cruz and Bea Alonzo', 'Marian Rivera and Dingdong Dantes', 'Sarah Geronimo and Gerald Anderson'], answer: 1 },
      { q: 'In what year did the nation mourn the passing of President Cory Aquino?', options: ['2006', '2008', '2009', '2010'], answer: 2 },
    ],
  },
  '02': {
    sheet: 'CH 02 Tech Talk 2000',
    game: 'henyo',
    show: 'Pinoy Henyo',
    tag: 'Hulaan ang salita!',
    word: 'FRIENDSTER',
    clues: ['Bagay ito sa internet. (It\'s something online.)', 'Gumawa ka ng profile dito. (You made a profile here.)', 'Dito nagsusulat ang barkada ng "testimonials."', 'Sikat ito bago pa naging uso ang Facebook.'],
    q: 'Pinoy Henyo: what is the secret word?',
    options: ['Multiply', 'Friendster', 'YouTube', 'Yahoo! Messenger'],
    answer: 1,
  },
  '03': {
    sheet: 'CH 03 Global Mix',
    game: 'wheel',
    show: 'Wheel of Fortune',
    tag: 'Paikutin ang gulong!',
    pool: [
      { label: 'DRAMA', q: 'Which Taiwanese drama started "Meteor fever" in Filipino homes?', options: ['Full House', 'Boys Over Flowers', 'Meteor Garden', 'Endless Love'], answer: 2 },
      { label: 'K-POP', q: 'Which Star Circle Quest star, the "Pambansang Krung-Krung," debuted with 2NE1 in 2009?', options: ['Sandara Park', 'Charice', 'Yeng Constantino', 'Sarah Geronimo'], answer: 0 },
      { label: 'NBA', q: 'Which NBA star called the Philippines "like a home away from home" on his 2009 visit?', options: ['LeBron James', 'Shaquille O\'Neal', 'Kobe Bryant', 'Michael Jordan'], answer: 2 },
    ],
  },
  '04': {
    sheet: 'CH 04 Style File',
    game: 'tamaomali',
    show: 'Tama o Mali?',
    tag: 'Tatlong mabilisang tanong!',
    q: 'Tama o Mali: three style statements',
    items: [
      { s: 'The SexBomb Girls became stars as dancers on a noontime show.', t: true },
      { s: 'The 2009 "Jun Pyo curl" came from Meteor Garden.', t: false },
      { s: 'Low-rise jeans sat below the navel.', t: true },
    ],
  },
  '05': {
    sheet: 'CH 05 Starstruck',
    game: 'order',
    show: 'Fastest Finger First',
    tag: 'Ayusin mula pinakauna!',
    q: 'Put these talent shows in the order they first crowned a winner',
    items: [
      { s: 'Star in a Million (Erik Santos wins)', y: 2003 },
      { s: 'Pinoy Big Brother (first Big Winner)', y: 2005 },
      { s: 'Pilipinas Got Talent (first season)', y: 2010 },
    ],
  },
  '06': {
    sheet: 'CH 06 Place To Be',
    game: 'price',
    show: 'The Price Is Right',
    tag: 'Magkano?',
    q: 'In 2003, how much did an internet café like Blue Orb charge for one hour on a PC?',
    options: ['₱10', '₱25', '₱50', '₱100'],
    answer: 1,
    item: 'ONE HOUR AT THE COMPUTER SHOP, 2003',
  },
  '07': {
    sheet: 'CH 07 Then vs Now',
    game: 'bayong',
    show: 'Pera o Bayong',
    tag: 'Pera o Bayong?',
    q: 'In the 2000s, the Philippines was called the "___ Capital of the World."',
    options: ['Karaoke', 'Mall', 'Texting', 'Teleserye'],
    answer: 2,
  },
};

const FEELS = ['Bago sa akin', 'Medyo', 'Naaalala ko', 'Miss ko na', 'Grabe, nostalgic!'];

// A Station Break plays only between CH 01 and CH 07: when the visitor is on a page of a
// channel's last episode (its overview or any of its parts) and moves on to the next channel.
// Once a visitor sends answers for a channel, that channel's break doesn't show again this visit.
const answered = new Set();

// Should leaving the page at `fromPath` for channel `toNum` show a station break?
export function wantsBreak(fromPath, toNum, channels) {
  const m = fromPath.match(/^\/ch\/(\d\d)\/([^/]+)/);
  if (!m || !toNum) return false;
  const fromNum = m[1];
  if (!BREAKS[fromNum] || answered.has(fromNum)) return false;
  if (Number(toNum) !== Number(fromNum) + 1) return false;
  const eps = channels.find((x) => x.num === fromNum)?.data?.episodes || [];
  return eps.length > 0 && eps[eps.length - 1].slug === m[2];
}

/* ---------- Game boards ---------- */
function mcq(q, options, cls = '') {
  return `<fieldset class="sb-q ${cls}"><legend>${esc(q)}</legend>
    <div class="sb-opts">${options.map((o, i) => `<button type="button" class="sb-opt" data-opt="${i}">${esc(o)}</button>`).join('')}</div></fieldset>`;
}

function board(b) {
  switch (b.game) {
    case 'deal':
      return `<div class="g-deal">
        <p class="g-hint">Six briefcases. Pick one to see what's inside.</p>
        <div class="cases">${[1, 2, 3, 4, 5, 6].map((n) => `<button type="button" class="case" data-case="${n}"><span class="case-n an">${n}</span></button>`).join('')}</div>
        <div class="banker" hidden><div class="banker-call"><i class="ti ti-phone-call" aria-hidden="true"></i> <b>Tumatawag ang Banker!</b> "I'll let you skip to the next channel. Deal or No Deal?"</div>
          <div class="banker-btns"><button type="button" class="btn deal-yes">DEAL</button><button type="button" class="btn deal-no">NO DEAL!</button></div></div>
        <div class="g-q"></div></div>`;
    case 'henyo':
      return `<div class="g-henyo">
        <div class="henyo-head"><span class="henyo-word an" aria-label="Secret word, ${b.word.length} letters">${b.word.split('').map(() => '<i></i>').join('')}</span><span class="henyo-timer an" data-timer>2:00</span></div>
        <ol class="henyo-clues"></ol>
        <button type="button" class="btn henyo-more">SUNOD NA CLUE ▶</button>
        <div class="g-q">${mcq(b.q, b.options)}</div></div>`;
    case 'wheel': {
      const segs = [0, 1, 2, 0, 1, 2];
      const colors = ['#e3202e', '#ffd21f', '#19b5f0', '#e83bd0', '#17a34a', '#ff8a00'];
      const grad = segs.map((_, i) => `${colors[i]} ${i * 60}deg ${(i + 1) * 60}deg`).join(', ');
      return `<div class="g-wheel">
        <div class="wheel-wrap"><div class="wheel-pin" aria-hidden="true">▼</div>
          <div class="wheel" style="background:conic-gradient(${grad})">${segs.map((s, i) => `<span class="wheel-l" style="transform:rotate(${i * 60 + 30}deg) translateY(-58px)">${esc(b.pool[s].label)}</span>`).join('')}</div></div>
        <button type="button" class="btn wheel-spin">PAIKUTIN! · SPIN</button>
        <div class="g-q"></div></div>`;
    }
    case 'tamaomali':
      return `<div class="g-tom">${b.items
        .map((it, i) => `<div class="tom" data-tom="${i}"><span class="tom-n an">${i + 1}</span><p>${esc(it.s)}</p>
          <div class="tom-btns"><button type="button" class="tom-b tama" data-v="1">TAMA</button><button type="button" class="tom-b mali" data-v="0">MALI</button></div></div>`)
        .join('')}<p class="tom-score an" aria-live="polite"></p></div>`;
    case 'order':
      return `<div class="g-order"><p class="g-hint">${esc(b.q)}. Tap them from earliest to latest.</p>
        <div class="ord-opts">${shuffle(b.items.map((it, i) => ({ ...it, i })))
          .map((it) => `<button type="button" class="ord" data-i="${it.i}"><span class="ord-n an"></span>${esc(it.s)}</button>`)
          .join('')}</div><p class="ord-msg" aria-live="polite"></p>
        <button type="button" class="btn ghost ord-reset" hidden>ULITIN · RESET</button></div>`;
    case 'price':
      return `<div class="g-price"><div class="price-item"><span class="price-tag an">${esc(b.item)}</span></div>
        <fieldset class="sb-q"><legend>${esc(b.q)}</legend>
        <div class="price-opts">${b.options.map((o, i) => `<button type="button" class="sb-opt price" data-opt="${i}"><span class="an">${esc(o)}</span></button>`).join('')}</div></fieldset></div>`;
    case 'bayong':
      return `<div class="g-bayong"><p class="g-hint">Take the money and go to the next channel, or open the bayong for a question.</p>
        <div class="pob"><button type="button" class="pob-b pera"><span class="an">PERA</span><small>Skip to the next channel</small></button>
        <button type="button" class="pob-b bayong"><span class="an">BAYONG</span><small>Open it and answer!</small></button></div>
        <div class="g-q"></div></div>`;
    case 'survey':
      return `<div class="g-survey"><p class="feud-q an">${esc(b.q)}</p>
        <div class="feud">${b.options.map((o, i) => `<button type="button" class="feud-a" data-opt="${i}"><span class="feud-n an">${i + 1}</span>${esc(o)}</button>`).join('')}</div>
        <p class="feud-msg an" aria-live="polite"></p></div>`;
    default:
      return '';
  }
}

export function breakHTML(num, title, nextLabel) {
  const b = BREAKS[num];
  return `<div class="sb sb-${b.game}" role="dialog" aria-modal="true" aria-labelledby="sb-title">
    <div class="sb-card">
      <div class="sb-top"><span class="sb-tag an">STATION BREAK</span><span class="sb-ch">After CH ${esc(num)} · ${esc(title)}</span><button type="button" class="sb-x" data-sb-skip aria-label="Skip the station break">SKIP ✕</button></div>
      <div class="sb-show"><span class="sb-show-name an">${esc(b.show)}</span><span class="sb-show-sub">Y2K edition</span></div>
      <h2 id="sb-title" class="sb-title an">${esc(b.tag)}</h2>
      <div class="sb-game">${board(b)}</div>
      <p class="sb-result" aria-live="polite"></p>
      <form class="sb-form" data-sb="${esc(num)}" novalidate>
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
      <div class="sb-thanks" hidden><div class="an">Salamat!</div><p>Thanks for playing. Balik tayo sa programa...</p></div>
    </div>
  </div>`;
}

function send(payload) {
  if (!SHEET_URL) return Promise.resolve(false);
  // text/plain keeps this a "simple" request that Google Apps Script accepts from any site.
  return fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', credentials: 'omit', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
    .then(() => true)
    .catch(() => false);
}

/* ---------- Game logic ---------- */
// Each game reports its outcome through `report({ question, answer, correct })`.
function bindGame(box, b, report, done) {
  const g = box.querySelector('.sb-game');
  const result = box.querySelector('.sb-result');
  const say = (text, ok) => {
    result.textContent = text;
    result.className = `sb-result ${ok === true ? 'ok' : ok === false ? 'no' : ''}`;
  };
  // A multiple-choice question inside `root`, used by several games.
  const wireMcq = (root, q) => {
    root.querySelectorAll('.sb-opt').forEach((btn) =>
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.opt);
        const ok = i === q.answer;
        root.querySelectorAll('.sb-opt').forEach((x, j) => {
          x.disabled = true;
          if (j === q.answer) x.classList.add('right');
          else if (x === btn) x.classList.add('wrong');
        });
        sfx(ok ? 'ding' : 'buzz');
        say(ok ? 'TAMA! You remembered.' : `Sayang! The answer is ${q.options[q.answer]}.`, ok);
        report({ question: q.q, answer: q.options[i], correct: ok });
      })
    );
  };

  if (b.game === 'deal') {
    let q = null;
    g.querySelectorAll('.case').forEach((c) =>
      c.addEventListener('click', () => {
        if (q) return;
        const n = Number(c.dataset.case);
        q = b.pool[(n - 1) % b.pool.length];
        sfx('tick');
        c.classList.add('open');
        g.querySelectorAll('.case').forEach((x) => (x.disabled = true));
        g.querySelector('.g-hint').textContent = `You picked case #${n}! Inside: a question.`;
        g.querySelector('.banker').hidden = false;
      })
    );
    g.querySelector('.deal-yes').addEventListener('click', done);
    g.querySelector('.deal-no').addEventListener('click', () => {
      g.querySelector('.banker').hidden = true;
      const box2 = g.querySelector('.g-q');
      box2.innerHTML = mcq(q.q, q.options);
      wireMcq(box2, q);
    });
  }

  if (b.game === 'henyo') {
    const list = g.querySelector('.henyo-clues');
    const more = g.querySelector('.henyo-more');
    const timer = g.querySelector('[data-timer]');
    let shownClues = 0;
    let left = 120;
    const next = () => {
      if (shownClues >= b.clues.length) return;
      list.insertAdjacentHTML('beforeend', `<li>${esc(b.clues[shownClues])}</li>`);
      shownClues += 1;
      sfx('tick');
      if (shownClues >= b.clues.length) more.disabled = true;
    };
    next();
    more.addEventListener('click', next);
    const t = setInterval(() => {
      if (!box.isConnected) return clearInterval(t);
      left -= 1;
      timer.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
      if (left <= 0) {
        clearInterval(t);
        timer.textContent = 'TIME!';
      }
    }, 1000);
    const q = { q: b.q, options: b.options, answer: b.answer };
    wireMcq(g.querySelector('.g-q'), q);
    g.querySelectorAll('.sb-opt').forEach((x) =>
      x.addEventListener('click', () => {
        clearInterval(t);
        more.disabled = true;
        g.querySelector('.henyo-word').innerHTML = b.word.split('').map((ch) => `<i>${ch}</i>`).join('');
      })
    );
  }

  if (b.game === 'wheel') {
    const wheel = g.querySelector('.wheel');
    const spin = g.querySelector('.wheel-spin');
    spin.addEventListener('click', () => {
      spin.disabled = true;
      const seg = Math.floor(Math.random() * 6);
      // The pin is at the top; land the middle of segment `seg` under it.
      const deg = 360 * 4 + (360 - (seg * 60 + 30));
      wheel.style.transform = `rotate(${deg}deg)`;
      sfx('tick');
      const q = b.pool[seg % 3];
      setTimeout(() => {
        spin.textContent = `${q.label}!`;
        const box2 = g.querySelector('.g-q');
        box2.innerHTML = mcq(q.q, q.options);
        wireMcq(box2, q);
      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 50 : 2600);
    });
  }

  if (b.game === 'tamaomali') {
    const picks = [];
    g.querySelectorAll('.tom').forEach((row) => {
      const i = Number(row.dataset.tom);
      row.querySelectorAll('.tom-b').forEach((btn) =>
        btn.addEventListener('click', () => {
          const v = btn.dataset.v === '1';
          const ok = v === b.items[i].t;
          picks[i] = ok;
          row.querySelectorAll('.tom-b').forEach((x) => (x.disabled = true));
          btn.classList.add(ok ? 'right' : 'wrong');
          row.classList.add(ok ? 'ok' : 'no');
          row.insertAdjacentHTML('beforeend', `<span class="tom-ans">${b.items[i].t ? 'TAMA' : 'MALI'}</span>`);
          sfx(ok ? 'ding' : 'buzz');
          const done3 = picks.filter((x) => x !== undefined).length;
          if (done3 === b.items.length) {
            const score = picks.filter(Boolean).length;
            g.querySelector('.tom-score').textContent = `${score} / ${b.items.length} TAMA!`;
            say(score === b.items.length ? 'Perfect! Style icon ka!' : 'Nice try! Check the answers above.', score === b.items.length);
            report({ question: b.q, answer: `${score} of ${b.items.length} correct`, correct: score === b.items.length });
          }
        })
      );
    });
  }

  if (b.game === 'order') {
    let seq = [];
    const btns = [...g.querySelectorAll('.ord')];
    const msg = g.querySelector('.ord-msg');
    const reset = g.querySelector('.ord-reset');
    btns.forEach((btn) =>
      btn.addEventListener('click', () => {
        if (btn.classList.contains('picked')) return;
        seq.push(Number(btn.dataset.i));
        btn.classList.add('picked');
        btn.querySelector('.ord-n').textContent = seq.length;
        sfx('tick');
        if (seq.length === b.items.length) {
          const ok = seq.every((v, k) => v === k);
          btns.forEach((x) => {
            x.disabled = true;
            const it = b.items[Number(x.dataset.i)];
            x.insertAdjacentHTML('beforeend', `<span class="ord-y">${it.y}</span>`);
          });
          sfx(ok ? 'ding' : 'buzz');
          msg.textContent = ok ? 'Pinakamabilis! You got the order right.' : 'Close! The right order is 2003, 2005, then 2010.';
          say(ok ? 'TAMA!' : 'Sayang!', ok);
          report({ question: b.q, answer: seq.map((v) => b.items[v].s).join(' → '), correct: ok });
        }
      })
    );
    reset.addEventListener('click', () => {
      seq = [];
      btns.forEach((x) => { x.classList.remove('picked'); x.querySelector('.ord-n').textContent = ''; });
    });
  }

  if (b.game === 'price') wireMcq(g, { q: b.q, options: b.options, answer: b.answer });

  if (b.game === 'bayong') {
    g.querySelector('.pera').addEventListener('click', () => {
      sfx('ding');
      g.querySelector('.g-hint').textContent = 'Kinuha mo ang pera! Off to the next channel...';
      g.querySelectorAll('.pob-b').forEach((x) => (x.disabled = true));
      setTimeout(done, 1200);
    });
    g.querySelector('.bayong').addEventListener('click', () => {
      sfx('tick');
      g.querySelectorAll('.pob-b').forEach((x) => (x.disabled = true));
      g.querySelector('.bayong').classList.add('open');
      const box2 = g.querySelector('.g-q');
      const q = { q: b.q, options: b.options, answer: b.answer };
      box2.innerHTML = mcq(q.q, q.options);
      wireMcq(box2, q);
    });
  }

  if (b.game === 'survey') {
    g.querySelectorAll('.feud-a').forEach((btn) =>
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.opt);
        g.querySelectorAll('.feud-a').forEach((x) => (x.disabled = true));
        btn.classList.add('picked');
        sfx('ding');
        g.querySelector('.feud-msg').textContent = 'SURVEY SAYS... salamat sa boto mo!';
        report({ question: b.q, answer: b.options[i], correct: null });
      })
    );
  }
}

// Wire up the break shown in `box`; `done()` continues to the next channel.
export function bindBreak(box, done) {
  const form = box.querySelector('.sb-form');
  const num = form.dataset.sb;
  const b = BREAKS[num];
  const result = box.querySelector('.sb-result');
  let outcome = null;
  box.querySelectorAll('[data-sb-skip]').forEach((x) => x.addEventListener('click', done));
  bindGame(box, b, (o) => (outcome = o), done);

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const f = new FormData(form);
    const memory = String(f.get('memory') || '').trim();
    const nostalgia = f.get('nostalgia');
    if (!outcome && !nostalgia && !memory) {
      result.textContent = 'Play the game, pick a feeling, or share a memory first, or just skip.';
      result.className = 'sb-result no';
      return;
    }
    const btn = form.querySelector('.sb-send');
    btn.disabled = true;
    btn.textContent = 'SENDING...';
    await send({
      channel: b.sheet,
      game: b.show,
      question: outcome?.question || '',
      answer: outcome?.answer || '',
      correct: outcome?.correct ?? '',
      nostalgia: nostalgia || '',
      memory,
      name: String(f.get('name') || '').trim(),
      city: String(f.get('city') || '').trim(),
      website: String(f.get('website') || ''),
    });
    answered.add(num);
    form.hidden = true;
    box.querySelector('.sb-game').hidden = true;
    result.hidden = true;
    box.querySelector('.sb-thanks').hidden = false;
    setTimeout(done, 1600);
  });
}
