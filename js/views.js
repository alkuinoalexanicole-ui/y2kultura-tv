// Screens that appear inside the TV. Each function returns HTML for the screen.
import { CHANNELS } from './data/channels.js';

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const BARS = ['#c0c0c0', '#c0c000', '#00c0c0', '#00c000', '#c000c0', '#c00000', '#0000c0'];

function ticker(items, solemn = false) {
  const text = items.filter(Boolean).join('  •  ');
  return `<div class="ticker${solemn ? ' solemn' : ''}"><span>${esc(text)}</span></div>`;
}

/* ---------- CH 00: home ---------- */
export function home() {
  return `
  <div class="home">
    <div class="home-top">
      <span class="badge" style="background:var(--red)">● ON AIR</span>
      <span class="badge" style="background:var(--yellow);color:#0b2a5c">CH 00</span>
    </div>
    <div class="home-main">
      <h1 class="logo">Y2<span class="k">K</span>ULTURA</h1>
      <div class="network">TV NETWORK</div>
      <p class="tagline pf">Where the 2000s come alive!</p>
      <a class="btn enter" href="/guide" data-link>▶ ENTER THE NETWORK</a>
    </div>
    <div class="bars">${BARS.map((c) => `<i style="background:${c}"></i>`).join('')}</div>
    ${ticker(['NOW BROADCASTING: PHILIPPINE POP CULTURE, 2000 TO 2010', 'USE THE REMOTE OR PRESS P+ TO FLIP CHANNELS', 'GRAB YOUR MERIENDA AND STAY TUNED'])}
  </div>`;
}

/* ---------- Channel guide ---------- */
export function guide() {
  const rows = CHANNELS.map(
    (c) => `
    <li><a href="/ch/${c.num}" data-link>
      <span class="num">CH ${c.num}</span>
      <span class="slot">${esc(c.slot)}</span>
      <span class="name">${esc(c.title)}<small>${esc(c.aspect)}</small></span>
      <span class="status ${c.data ? 'live' : 'soon'}">${c.data ? 'NOW SHOWING' : 'ABANGAN!'}</span>
    </a></li>`
  ).join('');
  return `
  <div class="guide">
    <div class="guide-head">
      <span class="pf">Channel Guide</span>
      <span class="badge" style="background:var(--yellow);color:#0b2a5c">TONIGHT ON Y2KULTURA</span>
    </div>
    <ul class="listing">${rows}</ul>
    ${ticker(['PICK A CHANNEL OR TYPE ITS NUMBER ON THE REMOTE', 'P+ / P- TO CHANGE CHANNEL', 'ABANGAN! MORE CHANNELS COMING SOON'])}
  </div>`;
}

/* ---------- Please stand by (channels not yet on air) ---------- */
export function standby(c) {
  const low = ['#0000c0', '#131313', '#c000c0', '#131313', '#00c0c0', '#131313', '#c0c0c0'];
  return `
  <div class="standby" style="position:relative">
    <div class="smpte">${BARS.map((b) => `<i style="background:${b}"></i>`).join('')}</div>
    <div class="smpte-low">${low.map((b) => `<i style="background:${b}"></i>`).join('')}</div>
    <div class="standby-card">
      <div class="badge" style="background:var(--red)">CH ${esc(c.num)}</div>
      <div class="an">PLEASE STAND BY</div>
      <p><b>${esc(c.title)}</b> · ${esc(c.aspect)}</p>
      <p class="pf" style="color:var(--yellow);font-size:20px">Abangan!</p>
    </div>
    ${ticker([`CH ${c.num} ${c.title.toUpperCase()} IS COMING SOON`, 'PRESS GUIDE TO SEE WHAT IS ON NOW', 'P+ / P- TO CHANGE CHANNEL'])}
  </div>`;
}

/* ---------- Channel main page (line-up format) ---------- */
export function channel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  const cards = d.episodes
    .map(
      (e, i) => `
    <a class="card" href="/ch/${c.num}/${e.slug}" data-link>
      <div class="thumb" style="background:${e.thumb}">
        <span class="ep">EP.${e.ep}</span><span class="time">${esc(d.times[i] || '')}</span>
        <i class="ti ${e.icon}" aria-hidden="true"></i>
      </div>
      <div class="cb"><span class="ct">${esc(e.cardTitle)}</span><span class="cs">${esc(e.cardSub)}</span><span class="cm">${esc(e.cardMeta)}</span></div>
      <div class="go">▶ TUNE IN</div>
    </a>`
    )
    .join('');
  return `
  <div class="page" style="background:${d.bg}">
    <header class="ch-head">
      <span class="badge" style="background:var(--yellow);color:#0b2a5c">PG</span>
      <span class="badge" style="background:var(--cyan);color:#0b2a5c">CH ${c.num}</span>
      <h1 class="pf" style="margin:0">${esc(d.title)}</h1>
      <span class="aspect">${esc(d.aspect)}</span>
      <span class="cc">CC</span>
    </header>
    <div class="explain">
      <div><h3 style="color:var(--yellow)">WHAT IS IT?</h3><p>${esc(d.what)}</p></div>
      <div><h3 style="color:#ff6b75">HOW THE 2000s FELT</h3><p>${esc(d.felt)}</p></div>
    </div>
    <div class="bar"><span class="an">${esc(d.lineupLabel)}</span><small>${esc(d.lineupTag)}</small></div>
    <div class="lineup">${cards}</div>
    <div style="flex:1"></div>
    ${ticker(['TAP A CARD TO TUNE IN', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
  </div>`;
}

/* ---------- Episode pages ---------- */
function media(video, photos) {
  const v = video?.youtube
    ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(video.youtube)}" title="${esc(video.label)}" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    : `<div class="video"><canvas class="snow" data-snow></canvas><div class="msg"><i class="ti ti-player-play" aria-hidden="true"></i>VIDEO COMING SOON<br><span class="it">${esc(video?.label || '')}</span></div></div>`;
  const p = (photos || [])
    .map((ph) =>
      ph.src
        ? `<figure class="photo"><img src="${esc(ph.src)}" alt="${esc(ph.caption)}" loading="lazy"><figcaption>${esc(ph.caption)}</figcaption></figure>`
        : `<figure class="photo"><div class="ph">PHOTO COMING SOON</div><figcaption>${esc(ph.caption)}</figcaption></figure>`
    )
    .join('');
  return v + `<div class="photos">${p}</div>`;
}

function tags(page, show) {
  if (!show || !page.affect) return '';
  return `<div class="panel tags">
    <h4 style="color:var(--yellow)">AFFECT</h4><div>${page.affect.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
    <h4 style="color:var(--cyan);margin-top:4px">SENSES</h4><div>${page.senses.map((t) => `<span class="chip sense">${esc(t)}</span>`).join('')}</div>
  </div>`;
}

function factsTable(rows, accent) {
  if (!rows?.length) return '';
  return `<table class="facts">${rows.map(([k, v]) => `<tr><th style="color:${accent}">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</table>`;
}

export function episode(c, e, partIndex) {
  const d = c.data;
  const solemn = !!e.solemn;
  const accent = 'var(--yellow)';
  const bg = e.bg || d.bg;
  const base = `/ch/${c.num}/${e.slug}`;
  const stops = [{ href: base, name: 'OVERVIEW' }, ...e.parts.map((p) => ({ href: `${base}/${p.slug}`, name: p.cardTitle }))];
  const at = partIndex == null ? 0 : partIndex + 1;
  const tabs = stops.length > 1
    ? `<div class="tabs" style="--accent:${solemn ? 'var(--yellow)' : 'var(--magenta)'}">${stops
        .map((s, i) => `<a class="tab${i === at ? ' on' : ''}" href="${s.href}" data-link>${esc(s.name)}</a>`)
        .join('')}</div>`
    : '';
  const prev = stops[at - 1];
  const nxt = stops[at + 1];
  const pager = `<div class="pager">
      ${prev ? `<a href="${prev.href}" data-link>◀ ${esc(prev.name)}</a>` : `<a href="/ch/${c.num}" data-link>◀ CH ${c.num} LINE-UP</a>`}
      ${nxt ? `<a href="${nxt.href}" data-link>NEXT: ${esc(nxt.name)} ▶</a>` : `<a href="/ch/${c.num}" data-link>BACK TO LINE-UP ▶</a>`}
    </div>`;

  const now = `<div class="now" style="background:${solemn ? 'var(--yellow)' : 'var(--red)'};color:${solemn ? '#1f2a44' : '#fff'}">
      <span class="label" style="background:${solemn ? '#1f2a44' : '#fff'};color:${solemn ? '#fff' : 'var(--red)'}">NOW PLAYING</span>
      <span class="where">CH ${c.num} · EP. ${e.ep}${partIndex != null ? ` · ${esc(e.parts[partIndex].label)} OF ${e.parts.length}` : ''}</span>
      <a class="btn ghost" style="font-size:12px;padding:2px 10px;border-color:currentColor;color:inherit" href="/ch/${c.num}" data-link>◀ BACK TO CH ${c.num}</a>
    </div>`;

  let body;
  let tick;
  if (partIndex == null) {
    const o = e.overview;
    const cards = e.parts.length
      ? `<h3 class="an" style="color:${accent};font-weight:400;margin:8px 0 6px">MORE FROM THIS EPISODE</h3><div class="parts">${e.parts
          .map(
            (p) => `<a class="card" href="${base}/${p.slug}" data-link>
              <div class="cb"><span class="cm" style="margin:0 0 2px">${esc(p.label)}</span><span class="ct">${esc(p.cardTitle)}</span><span class="cs">${esc(p.cardLine)}</span></div>
              <div class="go">▶ TUNE IN</div></a>`
          )
          .join('')}</div>`
      : '';
    body = `
      <div class="ep-title"><h1 class="pf" style="margin:0">${esc(e.title)}</h1><div class="sub">${esc(o.sub)}</div></div>
      ${tabs}
      <div class="page-body">
        <div class="cols">
          <div>${media(o.video, o.photos)}</div>
          <div>
            <div>${o.chips.map((t, i) => `<span class="chip" style="background:${['var(--yellow)', 'var(--cyan)', solemn ? '#fff' : 'var(--magenta)'][i % 3]};color:#1a0933">${esc(t)}</span>`).join('')}</div>
            <p class="desc">${esc(o.desc)}</p>
            ${o.extra ? `<div class="panel"><p>${esc(o.extra)}</p></div>` : ''}
            ${o.facts ? `<div class="panel">${factsTable(o.facts, accent)}</div>` : ''}
            ${tags(o, d.showTags)}
            ${o.note ? `<div class="note"><b>GOOD TO KNOW:</b> ${esc(o.note)}</div>` : ''}
          </div>
        </div>
        ${cards}
        ${e.cta ? `<div class="cta"><span class="an">${esc(e.cta.title)}</span><p>${esc(e.cta.text)}</p><span class="btn" aria-disabled="true">OPENING SOON</span></div>` : ''}
      </div>`;
    tick = o.ticker;
  } else {
    const p = e.parts[partIndex];
    body = `
      <div class="ep-title"><h1 class="pf" style="margin:0">${esc(p.title)}</h1><div class="sub">${esc(p.sub)}</div></div>
      ${tabs}
      <div class="strip" style="background:${solemn ? 'var(--yellow)' : 'var(--red)'};color:${solemn ? '#1f2a44' : '#fff'}">${esc(p.strip)}</div>
      <div class="page-body">
        <div class="cols">
          <div>
            <div class="panel">${p.factsTitle ? `<h4 style="color:${accent}">${esc(p.factsTitle)}</h4>` : ''}${factsTable(p.facts, accent)}</div>
            ${media(p.video, p.photos)}
          </div>
          <div>
            ${p.panels.map(([h, t], i) => `<div class="panel"><h4 style="color:${i ? '#ff6b75' : accent}">${esc(h)}</h4><p>${esc(t)}</p></div>`).join('')}
            ${tags(p, d.showTags)}
          </div>
        </div>
      </div>`;
    tick = p.ticker;
  }

  return `<div class="page" style="background:${bg}">${now}${body}<div style="flex:1"></div>${pager}${ticker(
    tick?.length ? tick : ['P+ / P- TO CHANGE CHANNEL'],
    solemn
  )}</div>`;
}
