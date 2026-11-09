// Two-column story pages: when one column runs much longer than the other, the closing boxes of
// the long column move to where they shorten the page most: the bottom of the short column, or a
// full-width row under both columns (good for a row of photos). Reading order is kept: only a
// column's closing boxes move, in their original order. On narrow screens, where the columns
// stack, everything stays in its original place.

const GRIDS = '.page-body > .cols, .page-body .mmk-grid, .page-body > .mag-spread, .xp-desk:not(.home)';
const home = new WeakMap(); // grid -> [[child, ...] for each column]

// A video and its caption travel together.
function units(col) {
  const out = [];
  for (const el of col.children) {
    if (el.classList.contains('vcap') && out.length) out[out.length - 1].push(el);
    else out.push([el]);
  }
  return out;
}

const bottomOf = (el) => {
  const r = el.getBoundingClientRect();
  return r.height ? r.bottom + (parseFloat(getComputedStyle(el).marginBottom) || 0) : -Infinity;
};

// How tall the grid's content is, counting boxes placed under it.
function total(grid) {
  const top = grid.getBoundingClientRect().top;
  let bottom = top;
  for (const col of grid.children) for (const el of col.children) bottom = Math.max(bottom, bottomOf(el));
  let n = grid.nextElementSibling;
  while (n && n.classList.contains('bal-wide')) {
    bottom = Math.max(bottom, bottomOf(n));
    n = n.nextElementSibling;
  }
  return bottom - top;
}

function ordinal(grid) {
  const order = new Map();
  home.get(grid).forEach((kids, i) => kids.forEach((k, j) => order.set(k, i * 1000 + j)));
  return order;
}

// Put moved boxes after a column's own boxes, in their original order, and mark them.
function tidy(grid) {
  const order = ordinal(grid);
  [...grid.children].forEach((col, own) => {
    const kids = [...col.children].sort((a, b) => {
      const fa = Math.floor(order.get(a) / 1000) !== own;
      const fb = Math.floor(order.get(b) / 1000) !== own;
      return fa - fb || order.get(a) - order.get(b);
    });
    let first = true;
    kids.forEach((k) => {
      const foreign = Math.floor(order.get(k) / 1000) !== own;
      k.classList.toggle('bal-moved', foreign && first);
      if (foreign) first = false;
      col.appendChild(k);
    });
  });
  const wide = [];
  let n = grid.nextElementSibling;
  while (n && n.classList.contains('bal-wide')) {
    wide.push(n);
    n = n.nextElementSibling;
  }
  wide.sort((a, b) => order.get(a) - order.get(b));
  let at = grid;
  wide.forEach((w) => {
    at.after(w);
    at = w;
  });
}

function restore(grid) {
  grid.parentNode.querySelectorAll('img[data-bal-fit]').forEach((im) => {
    im.removeAttribute('data-bal-fit');
    im.style.aspectRatio = '';
    im.style.flex = '';
    im.style.height = '';
  });
  home.get(grid).forEach((kids, i) =>
    kids.forEach((k) => {
      k.classList.remove('bal-moved', 'bal-wide');
      grid.children[i].appendChild(k);
    })
  );
}

const snapshot = (grid) => [...home.get(grid).flat()].map((el) => [el, el.parentNode, el.nextSibling, el.className]);
function undo(snap) {
  for (let i = snap.length - 1; i >= 0; i--) {
    const [el, parent, next, cls] = snap[i];
    parent.insertBefore(el, next && next.parentNode === parent ? next : null);
    el.className = cls;
  }
}

function moveTail(grid, tail, to) {
  if (to === 'below') {
    let at = grid;
    while (at.nextElementSibling?.classList.contains('bal-wide')) at = at.nextElementSibling;
    tail.forEach((el) => {
      el.classList.add('bal-wide');
      at.after(el);
      at = el;
    });
  } else {
    tail.forEach((el) => to.appendChild(el));
  }
  tidy(grid);
}

function balanceGrid(grid) {
  const cols = [...grid.children].filter((c) => !c.classList.contains('bal-wide'));
  if (cols.length !== 2) return;
  if (!home.has(grid)) home.set(grid, cols.map((c) => [...c.children]));
  restore(grid);
  // Stacked columns (phones): nothing to balance.
  if (Math.abs(cols[1].getBoundingClientRect().top - cols[0].getBoundingClientRect().top) > 8) return;
  for (let round = 0; round < 4; round++) {
    const base = total(grid);
    const tops = cols.map((c) => c.getBoundingClientRect().top);
    const h = cols.map((c, i) => Math.max(0, ...[...c.children].map(bottomOf)) - tops[i]);
    const t = h[0] > h[1] ? 0 : 1;
    if (h[t] - h[1 - t] < 90) break;
    const list = units(cols[t]);
    let best = null;
    for (let k = 1; k < list.length; k++) {
      const tail = list.slice(-k).flat();
      for (const to of [cols[1 - t], 'below']) {
        // Only photos and small boxes go full width; a long text column stays a column.
        if (to === 'below' && grid.matches('.xp-desk, .mag-spread')) continue;
        if (to === 'below' && tail.some((el) => !el.matches('.photos, .polaroids, .xp-pics, .memory-box, .index-card, .tags, .note'))) continue;
        const snap = snapshot(grid);
        moveTail(grid, tail, to);
        const size = total(grid);
        undo(snap);
        if (!best || size < best.size) best = { tail, to, size };
      }
    }
    if (!best || best.size > base - 30) break;
    moveTail(grid, best.tail, best.to);
  }
  fitPhotos(cols);
}

// If the column with the photos still runs longer, crop its photos a little shorter (never below
// 55% of their height) so both columns end together.
function fitPhotos(cols) {
  const tops = cols.map((c) => c.getBoundingClientRect().top);
  const h = cols.map((c, i) => Math.max(0, ...[...c.children].map(bottomOf)) - tops[i]);
  const t = h[0] > h[1] ? 0 : 1;
  const over = h[t] - h[1 - t];
  if (over < 40) return;
  const imgs = [...cols[t].querySelectorAll('.photo img')].filter((im) => im.getBoundingClientRect().height > 60);
  if (!imgs.length) return;
  const rows = new Map();
  imgs.forEach((im) => {
    const key = Math.round(im.getBoundingClientRect().top / 10);
    if (!rows.has(key)) rows.set(key, []);
    rows.get(key).push(im);
  });
  const cut = over / rows.size;
  for (const row of rows.values()) {
    const tallest = Math.max(...row.map((im) => im.getBoundingClientRect().height));
    const to = Math.max(tallest * 0.55, 140, tallest - cut);
    row.forEach((im) => {
      const now = im.getBoundingClientRect().height;
      if (to > now - 8) return;
      im.dataset.balFit = '';
      im.style.aspectRatio = 'auto';
      im.style.flex = 'none';
      im.style.height = `${Math.round(to)}px`;
    });
  }
}

let current = null;
let timer = null;
function run() {
  if (!current?.isConnected) return;
  current.querySelectorAll(GRIDS).forEach(balanceGrid);
}
const soon = () => {
  clearTimeout(timer);
  timer = setTimeout(run, 120);
};

export function balanceColumns(view) {
  current = view;
  run();
  // Photos and fonts change heights as they arrive.
  view.querySelectorAll('.page-body img, .xp-desk img').forEach((img) => {
    if (!img.complete) img.addEventListener('load', soon, { once: true });
  });
  document.fonts?.ready.then(soon);
  // Once page-turn and channel-change effects have finished.
  setTimeout(soon, 700);
}

window.addEventListener('resize', soon);
