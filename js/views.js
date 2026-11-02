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
  if (c.data.format === 'news') return newsChannel(c);
  if (c.data.format === 'ads') return adsChannel(c);
  if (c.data.format === 'talent') return talentChannel(c);
  if (c.data.format === 'teleserye') return seryeChannel(c);
  if (c.data.format === 'quiz') return quizChannel(c);
  return lineupChannel(c);
}

function lineupChannel(c) {
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
function ytFrame(video, cls, accent) {
  return `<div class="video ${cls}"${accent ? ` style="border-color:${accent}"` : ''}><iframe src="https://www.youtube-nocookie.com/embed/${esc(video.youtube)}?rel=0" title="${esc(video.label)}" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>
    <div class="vcap"><i class="ti ti-brand-youtube" aria-hidden="true"></i> ${esc(video.label)}${video.credit ? ` · <a href="https://www.youtube.com/watch?v=${esc(video.youtube)}" target="_blank" rel="noopener">${esc(video.credit)} on YouTube</a>` : ''}</div>`;
}

export function media(video, photos, accent) {
  const v = video?.youtube
    ? ytFrame(video, '', accent)
    : `<div class="video"${accent ? ` style="border-color:${accent}"` : ''}><canvas class="snow" data-snow></canvas><div class="msg"><i class="ti ti-player-play" aria-hidden="true"></i>VIDEO COMING SOON<br><span class="it">${esc(video?.label || '')}</span></div></div>`;
  return v + photoGrid(photos);
}

export function photoGrid(photos) {
  const p = (photos || [])
    .map((ph) =>
      ph.src
        ? `<figure class="photo"><img src="${esc(ph.src)}" alt="${esc(ph.caption)}" loading="lazy"${ph.pos === 'contain' ? ' style="object-fit:contain;background:#000"' : ph.pos ? ` style="object-position:${esc(ph.pos)}"` : ''}><figcaption>${esc(ph.caption)}${ph.credit ? `<a class="credit" href="${esc(ph.link || ph.src)}" target="_blank" rel="noopener">Photo: ${esc(ph.credit)}</a>` : ''}</figcaption></figure>`
        : `<figure class="photo"><div class="ph">PHOTO COMING SOON</div><figcaption>${esc(ph.caption)}</figcaption></figure>`
    )
    .join('');
  return `<div class="photos">${p}</div>`;
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
  if (c.data.format === 'news') return newsEpisode(c, e, partIndex);
  if (c.data.format === 'ads') return adEpisode(c, e, partIndex);
  if (c.data.format === 'talent') return talentEpisode(c, e, partIndex);
  if (c.data.format === 'teleserye') return seryeEpisode(c, e, partIndex);
  if (c.data.format === 'quiz') return quizEpisode(c, e, partIndex);
  return lineupEpisode(c, e, partIndex);
}

function lineupEpisode(c, e, partIndex) {
  const d = c.data;
  const solemn = !!e.solemn;
  const accent = 'var(--yellow)';
  const bg = e.bg || d.bg;
  const base = `/ch/${c.num}/${e.slug}`;
  const stops = [{ href: base, name: 'OVERVIEW' }, ...e.parts.map((p) => ({ href: `${base}/${p.slug}`, name: p.cardTitle || p.title }))];
  const at = partIndex == null ? 0 : partIndex + 1;
  const tabAccent = e.accent || (solemn ? 'var(--yellow)' : 'var(--magenta)');
  const tabs = stops.length > 1
    ? `<div class="tabs" style="--accent:${tabAccent}">${stops
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
      ? `<h3 class="an" style="color:${accent};font-weight:400;margin:8px 0 6px">${esc(e.partsHeading || 'MORE FROM THIS EPISODE')}</h3><div class="parts">${e.parts
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
          <div>${media(o.video, o.photos, e.accent)}</div>
          <div>
            <div>${o.chips.map((t, i) => `<span class="chip" style="background:${['var(--yellow)', 'var(--cyan)', solemn ? '#fff' : 'var(--magenta)'][i % 3]};color:#1a0933">${esc(t)}</span>`).join('')}</div>
            ${o.desc ? `<p class="desc">${esc(o.desc)}</p>` : ''}
            ${(o.panels || []).map(([h, t], i) => `<div class="panel"><h4 style="color:${i ? '#ff6b75' : accent}">${esc(h)}</h4><p>${esc(t)}</p></div>`).join('')}
            ${o.extra ? `<div class="panel"><p>${esc(o.extra)}</p></div>` : ''}
            ${o.facts ? `<div class="panel">${factsTable(o.facts, accent)}</div>` : ''}
            ${tags(o, d.showTags)}
            ${o.note ? `<div class="note"><b>GOOD TO KNOW:</b> ${esc(o.note)}</div>` : ''}
          </div>
        </div>
        ${cards}
        ${ctaBar(e.cta)}
      </div>`;
    tick = o.ticker;
  } else {
    const p = e.parts[partIndex];
    body = `
      <div class="ep-title"><h1 class="pf" style="margin:0">${esc(p.title)}</h1><div class="sub">${esc(p.sub)}</div></div>
      ${tabs}
      ${p.strip ? `<div class="strip" style="background:${solemn ? 'var(--yellow)' : 'var(--red)'};color:${solemn ? '#1f2a44' : '#fff'}">${esc(p.strip)}</div>` : ''}
      <div class="page-body">
        ${statTiles(p.stats, 'lineup')}
        <div class="cols">
          <div>
            ${p.facts ? `<div class="panel">${p.factsTitle ? `<h4 style="color:${accent}">${esc(p.factsTitle)}</h4>` : ''}${factsTable(p.facts, accent)}</div>` : ''}
            ${media(p.video, p.photos, e.accent)}
          </div>
          <div>
            ${p.panels.map(([h, t], i) => `<div class="panel"><h4 style="color:${i ? '#ff6b75' : accent}">${esc(h)}</h4><p>${esc(t)}</p></div>`).join('')}
            ${tags(p, d.showTags)}
          </div>
        </div>
        ${ctaBar(p.cta)}
      </div>`;
    tick = p.ticker;
  }

  return `<div class="page" style="background:${bg}">${now}${body}<div style="flex:1"></div>${pager}${ticker(
    tick?.length ? tick : ['P+ / P- TO CHANGE CHANNEL'],
    solemn
  )}</div>`;
}

/* ---------- Shared helpers for the newer formats ---------- */
function statTiles(stats, kind) {
  if (!stats?.length) return '';
  return `<div class="tiles tiles-${kind}">${stats
    .map(([big, small]) => `<div class="tile"><div class="an">${esc(big)}</div><div>${esc(small)}</div></div>`)
    .join('')}</div>`;
}

function ctaBar(cta, icon) {
  if (!cta) return '';
  return `<div class="cta">${icon ? `<i class="ti ${icon}" style="font-size:24px" aria-hidden="true"></i>` : ''}<span class="an">${esc(cta.title)}</span><p>${esc(cta.text)}</p><span class="btn" aria-disabled="true">OPENING SOON</span></div>`;
}

function stopsFor(c, e, partIndex, overviewName) {
  const base = `/ch/${c.num}/${e.slug}`;
  const stops = [{ href: base, name: overviewName }, ...e.parts.map((p) => ({ href: `${base}/${p.slug}`, name: p.cardTitle || p.title }))];
  const at = partIndex == null ? 0 : partIndex + 1;
  return { base, stops, at, prev: stops[at - 1], next: stops[at + 1] };
}

function tabRow({ stops, at }, cls = '') {
  return `<div class="tabs ${cls}">${stops
    .map((s, i) => `<a class="tab${i === at ? ' on' : ''}" href="${s.href}" data-link>${esc(s.name)}</a>`)
    .join('')}</div>`;
}

function pagerBar(c, { prev, next }, cls = '') {
  return `<div class="pager ${cls}">
    ${prev ? `<a href="${prev.href}" data-link>◀ ${esc(prev.name)}</a>` : `<a href="/ch/${c.num}" data-link>◀ CH ${c.num} MAIN PAGE</a>`}
    ${next ? `<a href="${next.href}" data-link>NEXT: ${esc(next.name)} ▶</a>` : `<a href="/ch/${c.num}" data-link>BACK TO CH ${c.num} ▶</a>`}
  </div>`;
}

function channelHead(c, d, style = '') {
  return `<header class="ch-head" style="${style}">
      <span class="badge" style="background:var(--yellow);color:#0b2a5c">PG</span>
      <span class="badge" style="background:var(--cyan);color:#0b2a5c">CH ${c.num}</span>
      <h1 class="pf" style="margin:0">${esc(d.title)}</h1>
      <span class="aspect">${esc(d.aspect)}</span>
      <span class="cc">CC</span>
    </header>
    <div class="explain">
      <div><h3 style="color:var(--yellow)">WHAT IS IT?</h3><p>${esc(d.what)}</p></div>
      <div><h3 style="color:#ff6b75">HOW THE 2000s FELT</h3><p>${esc(d.felt)}</p></div>
    </div>`;
}

/* ---------- CH 03 format: "Balitang Global" newscast ---------- */
function newsChannel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  const stories = d.episodes
    .map(
      (e) => `<a class="story" href="/ch/${c.num}/${e.slug}" data-link data-ep="${e.ep}">
        <div class="story-text"><span class="dl">${esc(e.dateline)}</span><span class="an">${esc(e.title)}</span><small>${esc(e.cardSub)}</small></div>
        <span class="story-go">▶ TUNE IN</span></a>`
    )
    .join('');
  return `
  <div class="page news" style="background:${d.bg}">
    ${channelHead(c, d)}
    <div class="bar"><span class="an">BALITANG GLOBAL</span><small>TOP STORIES</small></div>
    <div class="news-grid">
      <div class="map" data-worldmap="${c.num}">
        <span class="live">LIVE</span>
        <i class="ti ti-world map-fallback" aria-hidden="true"></i>
        <span class="map-label">TAP A PIN OR A STORY</span>
      </div>
      <div class="stories">${stories}</div>
    </div>
    <div style="flex:1"></div>
    ${ticker(['BREAKING: THE WORLD CAME TO OUR TV', 'TAP A STORY TO TUNE IN', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
  </div>`;
}

function newsCam(video, photos, tag) {
  const v = video?.youtube
    ? ytFrame(video, 'cam', null)
    : `<div class="video cam"><canvas class="snow" data-snow></canvas><span class="cam-tag">${esc(tag || 'FILE FOOTAGE')}</span><span class="cam-rec">REC ●</span><div class="msg"><i class="ti ti-video" aria-hidden="true"></i>FOOTAGE COMING SOON<br><span class="it">${esc(video?.label || '')}</span></div></div>`;
  return v + photoGrid(photos);
}

function newsEpisode(c, e, partIndex) {
  const nav = stopsFor(c, e, partIndex, 'THE STORY');
  const page = partIndex == null ? e.overview : e.parts[partIndex];
  const slug = partIndex == null ? `STORY ${e.ep}` : e.parts[partIndex].label;
  const panels = page.panels
    .map(([h, t], i) => `<div class="report${i ? ' angle' : ''}"><h4>${esc(h)}</h4><p>${esc(t)}</p></div>`)
    .join('');
  let extra = '';
  if (partIndex == null) {
    extra = `<h3 class="an section-head">FIELD REPORTS</h3><div class="parts">${e.parts
      .map(
        (p) => `<a class="field" href="${nav.base}/${p.slug}" data-link><span class="field-tag">${esc(p.label)}</span>
          <div class="cb"><span class="ct">${esc(p.cardTitle)}</span><span class="cs">${esc(p.cardLine)}</span></div>
          <span class="field-go">▶ WATCH REPORT</span></a>`
      )
      .join('')}</div>`;
  }
  const cta = partIndex == null ? e.cta : page.cta;
  return `
  <div class="page news" style="background:${c.data.bg}">
    <div class="now news-now"><span class="an">BALITANG GLOBAL</span><span class="label live-bug">LIVE</span>
      <span class="where">CH ${c.num} · STORY ${e.ep}${partIndex != null ? ` · ${esc(page.label)} OF ${e.parts.length}` : ''}</span>
      <a class="btn ghost back" href="/ch/${c.num}" data-link>◀ BACK TO CH ${c.num}</a></div>
    <div class="lower-third"><span class="an slug">${esc(slug)}</span><h1 class="an">${esc(page.title || e.title)}</h1></div>
    <div class="lower-sub">${esc(page.sub)}</div>
    ${tabRow(nav, 'news-tabs')}
    <div class="page-body">
      ${statTiles(page.stats, 'news')}
      <div class="cols">
        <div>${newsCam(page.video, page.photos, page.camTag)}</div>
        <div>${panels}</div>
      </div>
      ${extra}
      ${ctaBar(cta, 'ti-microphone')}
    </div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav)}
    ${ticker(page.ticker || [])}
  </div>`;
}

/* ---------- CH 04 format: commercial break ---------- */
function adsChannel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  const ads = d.episodes
    .map((e) => {
      const ready = !!e.overview;
      const inner = `<span class="ad-label">AD ${e.ep} · ADVERTISEMENT</span>
        <span class="ad-slogan">${esc(e.title)}</span>
        <span class="ad-sub">${esc(e.cardSub)}</span>
        <span class="ad-fine it">${esc(e.fine)}</span>
        <span class="ad-go">${ready ? '▶ WATCH AD' : 'COMING UP AFTER THE BREAK'}</span>`;
      return ready
        ? `<a class="ad" style="background:${e.color}" href="/ch/${c.num}/${e.slug}" data-link>${inner}</a>`
        : `<div class="ad soon" style="background:${e.color}">${inner}</div>`;
    })
    .join('');
  return `
  <div class="page ads" style="background:${d.bg}">
    ${channelHead(c, d, 'background:var(--magenta);color:#2a0f4a')}
    <div class="bar ad-bar"><span class="an">COMMERCIAL BREAK</span><small>WE'LL BE RIGHT BACK</small></div>
    <div class="ad-grid">${ads}</div>
    <div style="flex:1"></div>
    ${ticker(['TAP AN AD TO WATCH', 'THESE ARE NOT REAL PRODUCTS', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
  </div>`;
}

function adSpot(video, photos) {
  const v = video?.youtube
    ? ytFrame(video, 'spot', null)
    : `<div class="video spot"><canvas class="snow" data-snow></canvas><span class="cam-tag spot-tag">TV SPOT</span><span class="cam-rec">0:30</span><div class="msg"><i class="ti ti-player-play" aria-hidden="true"></i>SPOT COMING SOON<br><span class="it">${esc(video?.label || '')}</span></div></div>`;
  return v + photoGrid(photos);
}

function adEpisode(c, e, partIndex) {
  if (!e.overview) return standby({ num: c.num, title: e.title.replace(/"/g, ''), aspect: 'Coming up after the break' });
  const nav = stopsFor(c, e, partIndex, 'THE AD');
  const page = partIndex == null ? e.overview : e.parts[partIndex];
  const panels = page.panels
    .map(([h, t]) => `<div class="pitch${/REALITY/.test(h) ? ' rc' : ''}"><h4>${esc(h)}</h4><p>${esc(t)}</p></div>`)
    .join('');
  let extra = '';
  if (partIndex == null) {
    extra = `<h3 class="an section-head" style="color:var(--yellow)">NOW AIRING: ${e.parts.length} SPOTS</h3><div class="parts">${e.parts
      .map(
        (p) => `<a class="spot-card" href="${nav.base}/${p.slug}" data-link><span class="spot-tag2">${esc(p.label)}</span>
          <div class="cb"><span class="ct">${esc(p.cardTitle)}</span><span class="cs">${esc(p.cardLine)}</span></div>
          <span class="spot-go">▶ WATCH SPOT</span></a>`
      )
      .join('')}</div>`;
  }
  const cta = partIndex == null ? e.cta : page.cta;
  return `
  <div class="page ads" style="background:${c.data.bg}">
    <div class="now ad-now"><span class="an">COMMERCIAL BREAK</span><span class="label">CH ${c.num} · AD ${e.ep}${partIndex != null ? ` · ${esc(page.label)} OF ${e.parts.length}` : ''}</span>
      <span class="where"></span><a class="btn ghost back" href="/ch/${c.num}" data-link>◀ BACK TO CH ${c.num}</a></div>
    <div class="slate">
      <div class="kicker">${partIndex == null ? 'ADVERTISEMENT' : esc(page.label)}</div>
      <h1 class="an">${esc(partIndex == null ? e.title : page.title)}</h1>
      <div class="slate-sub">${esc(page.sub)}</div>
      <div class="it slate-fine">${esc(partIndex == null ? e.fine : page.fine)}</div>
    </div>
    ${tabRow(nav, 'ad-tabs')}
    <div class="page-body">
      ${statTiles(page.stats, 'ads')}
      <div class="cols">
        <div>${adSpot(page.video, page.photos)}</div>
        <div>${panels}</div>
      </div>
      ${extra}
      ${ctaBar(cta)}
    </div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav, 'ad-pager')}
    ${ticker(page.ticker || [])}
  </div>`;
}

/* ---------- CH 05 format: "Grand Finals" talent show ---------- */
const pad = (n) => String(n).padStart(2, '0');

function talentChannel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  const acts = d.episodes
    .map(
      (e) => `<a class="act" href="/ch/${c.num}/${e.slug}" data-link style="--act:${e.color}">
        <span class="act-num an">#${pad(e.ep)}</span>
        <span class="act-name an">${esc(e.title)}</span>
        <span class="act-sub">${esc(e.cardSub)}</span>
        <span class="act-vote">VOTE CODE: STAR ${pad(e.ep)}</span>
        <span class="act-go">▶ WATCH PERFORMANCE</span></a>`
    )
    .join('');
  return `
  <div class="page talent" style="background:${d.bg}">
    ${channelHead(c, d, 'background:#12062b')}
    <div class="stage-head">
      <div class="beams" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <span class="live-bug onair">● LIVE</span>
      <div class="marquee an">${esc(d.showTitle)}</div>
      <div class="stage-sub">${esc(d.showSub)}</div>
    </div>
    <div class="bar talent-bar"><span class="an">TONIGHT'S FINALISTS</span><small>${d.episodes.length} ACTS · 1 DECADE</small></div>
    <div class="acts">${acts}</div>
    <div style="flex:1"></div>
    ${ticker(['TAP A FINALIST TO WATCH THEIR PERFORMANCE', 'VOTE CODES ARE FOR DISPLAY ONLY', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
  </div>`;
}

function scorecards(stats) {
  if (!stats?.length) return '';
  return `<div class="scores">${stats
    .map(
      ([big, small], i) => `<div class="paddle"><span class="judge">JUDGE ${i + 1}</span><div class="an">${esc(big)}</div><div class="why">${esc(small)}</div><i class="stick" aria-hidden="true"></i></div>`
    )
    .join('')}</div>`;
}

function jumbotron(video, photos) {
  const v = video?.youtube
    ? ytFrame(video, 'jumbo', null)
    : `<div class="video jumbo"><canvas class="snow" data-snow></canvas><div class="msg"><i class="ti ti-microphone-2" aria-hidden="true"></i>PERFORMANCE COMING SOON<br><span class="it">${esc(video?.label || '')}</span></div></div>`;
  return v + photoGrid(photos);
}

function talentEpisode(c, e, partIndex) {
  const nav = stopsFor(c, e, partIndex, 'THE ACT');
  const page = partIndex == null ? e.overview : e.parts[partIndex];
  const panels = page.panels
    .map(([h, t], i) => `<div class="judges${i ? ' verdict' : ''}"><h4>${esc(h)}</h4><p>${esc(t)}</p></div>`)
    .join('');
  let extra = '';
  if (partIndex == null) {
    extra = `<h3 class="an section-head">THE ROUNDS</h3><div class="parts">${e.parts
      .map(
        (p) => `<a class="round" href="${nav.base}/${p.slug}" data-link><span class="round-tag">${esc(p.label)}</span>
          <div class="cb"><span class="ct">${esc(p.cardTitle)}</span><span class="cs">${esc(p.cardLine)}</span></div>
          <span class="round-go">▶ WATCH ROUND</span></a>`
      )
      .join('')}</div>`;
  }
  const cta = partIndex == null ? e.cta : page.cta;
  return `
  <div class="page talent" style="background:${c.data.bg};--act:${e.color}">
    <div class="now talent-now"><span class="an">${esc(c.data.showTitle)}</span><span class="label live-bug onair">● LIVE</span>
      <span class="where">CH ${c.num} · CONTESTANT #${pad(e.ep)}${partIndex != null ? ` · ${esc(page.label)} OF ${e.parts.length}` : ''}</span>
      <a class="btn ghost back" href="/ch/${c.num}" data-link>◀ BACK TO CH ${c.num}</a></div>
    <div class="spot-title">
      <div class="kicker">${partIndex == null ? `NOW PERFORMING · CONTESTANT #${pad(e.ep)}` : esc(page.label)}</div>
      <h1 class="an bulbs">${esc(partIndex == null ? e.title : page.title)}</h1>
      <div class="spot-sub">${esc(page.sub)}</div>
    </div>
    ${tabRow(nav, 'talent-tabs')}
    <div class="page-body">
      ${scorecards(page.stats)}
      <div class="cols">
        <div>${jumbotron(page.video, page.photos)}</div>
        <div>${panels}</div>
      </div>
      ${extra}
      ${cta ? `<div class="cta vote-bar"><span class="vote-tag">TEXT TO VOTE</span><span class="an">${esc(cta.title)}</span><p>${esc(cta.text)}</p><span class="btn" aria-disabled="true">LINES OPEN SOON</span></div>` : ''}
    </div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav, 'talent-pager')}
    ${ticker(page.ticker || [])}
  </div>`;
}

/* ---------- CH 06 format: primetime teleserye ---------- */
function seryeChannel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  const eps = d.episodes
    .map(
      (e) => `<a class="kab" href="/ch/${c.num}/${e.slug}" data-link style="--kab:${e.color}">
        <span class="kab-num">KABANATA ${e.ep}</span>
        <span class="kab-title pf">${esc(e.title)}</span>
        <span class="kab-en">${esc(e.en)}</span>
        <span class="kab-sub">${esc(e.cardSub)}</span>
        <span class="kab-where"><i class="ti ti-map-pin" aria-hidden="true"></i> ${esc(e.where)}</span>
        <span class="kab-go">▶ PANOORIN</span></a>`
    )
    .join('');
  return `
  <div class="page serye" style="background:${d.bg}">
    ${channelHead(c, d, 'background:#2a0610')}
    <div class="title-card">
      <div class="presents">${esc(d.presents)}</div>
      <div class="serye-logo pf">${esc(d.showTitle)}</div>
      <div class="serye-tag">${esc(d.tagline)}</div>
      <div class="serye-sched">${esc(d.sched)}</div>
    </div>
    <div class="bar serye-bar"><span class="an">MGA KABANATA</span><small>${d.episodes.length} CHAPTERS · ${esc(d.episodes.map((e) => e.where).join(' · ').toUpperCase())}</small></div>
    <div class="kabs">${eps}</div>
    <div style="flex:1"></div>
    ${ticker(['PUMILI NG KABANATA: TAP A CHAPTER TO WATCH', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
  </div>`;
}

function filmStrip(stats) {
  if (!stats?.length) return '';
  return `<div class="strip">${stats
    .map(([big, small]) => `<div class="frame"><div class="an">${esc(big)}</div><div>${esc(small)}</div></div>`)
    .join('')}</div>`;
}

function letterbox(video, photos) {
  if (!video) return photoGrid(photos);
  const v = video?.youtube
    ? ytFrame(video, 'letterbox', null)
    : `<div class="video letterbox"><canvas class="snow" data-snow></canvas><div class="msg"><i class="ti ti-movie" aria-hidden="true"></i>EKSENA COMING SOON<br><span class="it">${esc(video?.label || '')}</span></div></div>`;
  return v + photoGrid(photos);
}

function seryeEpisode(c, e, partIndex) {
  const d = c.data;
  const nav = stopsFor(c, e, partIndex, 'ANG KABANATA');
  const page = partIndex == null ? e.overview : e.parts[partIndex];
  const ei = d.episodes.indexOf(e);
  // Recap: the scene or chapter right before this one.
  let recap = null;
  if (partIndex == null && ei > 0) {
    const pe = d.episodes[ei - 1];
    recap = { label: `KABANATA ${pe.ep}: ${pe.title}`, text: pe.recap, href: `/ch/${c.num}/${pe.slug}` };
  } else if (partIndex != null) {
    const pp = partIndex === 0 ? e.overview : e.parts[partIndex - 1];
    recap = { label: partIndex === 0 ? `KABANATA ${e.ep}: ${e.title}` : `${e.parts[partIndex - 1].label}: ${e.parts[partIndex - 1].title}`, text: pp.recap || pp.sub, href: nav.prev.href };
  }
  // Abangan: the next scene, or the next chapter.
  let nextUp = null;
  if (nav.next) nextUp = { href: nav.next.href, title: e.parts[nav.at].title, label: e.parts[nav.at].label };
  else if (d.episodes[ei + 1]) {
    const ne = d.episodes[ei + 1];
    nextUp = { href: `/ch/${c.num}/${ne.slug}`, title: ne.title, label: `KABANATA ${ne.ep}` };
  }
  const panels = page.panels
    .map(([h, t], i) => `<div class="eksena${i ? ' totoo' : ''}"><h4>${esc(h)}</h4><p>${esc(t)}</p></div>`)
    .join('');
  let extra = '';
  if (partIndex == null) {
    extra = `<h3 class="an section-head">MGA EKSENA</h3><div class="parts">${e.parts
      .map(
        (p) => `<a class="scene" href="${nav.base}/${p.slug}" data-link><span class="scene-tag">${esc(p.label)}</span>
          <div class="cb"><span class="ct pf">${esc(p.title)}</span><span class="cs">${esc(p.cardLine)}</span></div>
          <span class="scene-go">▶ PANOORIN</span></a>`
      )
      .join('')}</div>`;
  }
  const cta = partIndex == null ? e.cta : page.cta;
  return `
  <div class="page serye" style="background:${d.bg};--kab:${e.color}">
    <div class="now serye-now"><span class="pf serye-mini">${esc(d.showTitle)}</span><span class="label">KABANATA ${e.ep}${partIndex != null ? ` · ${esc(page.label)}` : ''}</span>
      <span class="where"><i class="ti ti-map-pin" aria-hidden="true"></i> ${esc(page.place || e.where)}</span>
      <a class="btn ghost back" href="/ch/${c.num}" data-link>◀ BACK TO CH ${c.num}</a></div>
    ${recap ? `<a class="recap" href="${recap.href}" data-link><span class="recap-tag it">Sa nakaraang ${partIndex == null ? 'kabanata' : 'eksena'}...</span><span class="recap-text"><b>${esc(recap.label)}</b> ${esc(recap.text)}</span></a>` : ''}
    <div class="serye-title">
      <div class="kicker">${partIndex == null ? `KABANATA ${e.ep}` : esc(page.label)}</div>
      <h1 class="pf">${esc(partIndex == null ? e.title : page.title)}</h1>
      <div class="serye-en">${esc(partIndex == null ? e.en : page.en || '')}</div>
      <div class="serye-sub">${esc(page.sub)}</div>
    </div>
    ${tabRow(nav, 'serye-tabs')}
    <div class="page-body">
      ${filmStrip(page.stats)}
      <div class="cols">
        <div>${letterbox(page.video, page.photos)}</div>
        <div>${panels}</div>
      </div>
      ${extra}
      ${ctaBar(cta, 'ti-message-heart')}
      ${nextUp ? `<a class="abangan" href="${nextUp.href}" data-link><span class="pf">Abangan!</span><span class="abangan-next">${esc(nextUp.label)}: <b>${esc(nextUp.title)}</b> ▶</span></a>` : `<div class="abangan wakas"><span class="pf">Wakas</span><span class="abangan-next">The end of our teleserye. Salamat sa panonood!</span></div>`}
    </div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav, 'serye-pager')}
    ${ticker(page.ticker || [])}
  </div>`;
}

/* ---------- CH 07 format: primetime quiz show ---------- */
const peso = (n) => `₱${n.toLocaleString('en-US')}`;
const LETTERS = ['A', 'B', 'C', 'D'];

function prizeLadder(c, here) {
  const rungs = [];
  c.data.episodes.forEach((e) =>
    e.parts.forEach((p, i) => rungs.push({ e, p, i, href: `/ch/${c.num}/${e.slug}/${p.slug}` }))
  );
  return `<ol class="ladder" data-ladder="${c.num}">${rungs
    .reverse()
    .map(
      (r, k) => `<li class="${r.p === here ? 'here' : ''}${r.i === 2 ? ' safe' : ''}" style="--rnd:${r.e.color}" data-q="${r.e.slug}/${r.p.slug}">
        <a href="${r.href}" data-link><span class="rung-n">${rungs.length - k}</span><span class="rung-p">${peso(r.p.prize)}</span><span class="rung-ok" aria-hidden="true">✓</span></a></li>`
    )
    .join('')}</ol>`;
}

function quizChannel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  const rounds = d.episodes
    .map(
      (e) => `<a class="rnd" href="/ch/${c.num}/${e.slug}" data-link style="--rnd:${e.color}">
        <span class="rnd-num">ROUND ${e.ep}</span>
        <span class="rnd-title an">${esc(e.title)}</span>
        <span class="rnd-en">${esc(e.en)} · ${esc(e.category)}</span>
        <span class="rnd-sub">${esc(e.cardSub)}</span>
        <span class="rnd-prize">${peso(e.parts[0].prize)} – ${peso(e.parts[e.parts.length - 1].prize)}</span>
        <span class="rnd-go">▶ GAME NA!</span></a>`
    )
    .join('');
  return `
  <div class="page quiz" style="background:${d.bg}">
    ${channelHead(c, d, 'background:#070c2e')}
    <div class="studio">
      <div class="studio-main">
        <div class="lights" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="quiz-sub">${esc(d.showSub)}</div>
        <div class="quiz-logo an">${esc(d.showTitle)}</div>
        <p class="host"><i class="ti ti-microphone" aria-hidden="true"></i> ${esc(d.hostLine)}</p>
        <div class="quiz-sched">${esc(d.sched)}</div>
        <div class="score-line" data-score="${c.num}">YOUR WINNINGS: <b>₱0</b></div>
      </div>
      ${prizeLadder(c, null)}
    </div>
    <div class="bar quiz-bar"><span class="an">MGA ROUND</span><small>${d.episodes.length} ROUNDS · ${d.episodes.reduce((n, e) => n + e.parts.length, 0)} QUESTIONS · THEN vs. NOW</small></div>
    <div class="rnds">${rounds}</div>
    <div style="flex:1"></div>
    ${ticker(['PUMILI NG ROUND: TAP A ROUND TO PLAY', 'ANSWER RIGHT TO LIGHT UP THE PRIZE LADDER', 'PRIZES ARE FOR FUN ONLY', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
  </div>`;
}

function prizeBoard(stats) {
  if (!stats?.length) return '';
  return `<div class="board">${stats
    .map(([big, small]) => `<div class="cell"><div class="an">${esc(big)}</div><div>${esc(small)}</div></div>`)
    .join('')}</div>`;
}

function quizScreen(video, photos) {
  if (!video) return photoGrid(photos);
  const v = video.youtube
    ? ytFrame(video, 'quizcam', null)
    : `<div class="video quizcam"><canvas class="snow" data-snow></canvas><div class="msg"><i class="ti ti-device-tv-old" aria-hidden="true"></i>VIDEO COMING SOON<br><span class="it">${esc(video.label || '')}</span></div></div>`;
  return v + photoGrid(photos);
}

function thenNow(page) {
  return `<div class="tvn">
    <div class="tvn-then"><h4>NOON · THEN <small>2000s</small></h4><p>${esc(page.then)}</p></div>
    <div class="tvn-vs an" aria-hidden="true">VS</div>
    <div class="tvn-now"><h4>NGAYON · NOW</h4><p>${esc(page.now)}</p></div>
  </div>`;
}

function quizEpisode(c, e, partIndex) {
  const d = c.data;
  const nav = stopsFor(c, e, partIndex, 'ANG ROUND');
  const page = partIndex == null ? e.overview : e.parts[partIndex];
  const ei = d.episodes.indexOf(e);
  let nextUp = null;
  if (nav.next) nextUp = { href: nav.next.href, label: `NEXT QUESTION · ${peso(e.parts[nav.at].prize)}`, title: e.parts[nav.at].title };
  else if (d.episodes[ei + 1]) {
    const ne = d.episodes[ei + 1];
    nextUp = { href: `/ch/${c.num}/${ne.slug}`, label: `ROUND ${ne.ep}`, title: ne.title };
  }
  let question = '';
  let extra = '';
  if (partIndex == null) {
    extra = `<h3 class="an section-head">MGA TANONG</h3><div class="parts">${e.parts
      .map(
        (p, i) => `<a class="qcard" href="${nav.base}/${p.slug}" data-link data-q="${e.slug}/${p.slug}"><span class="qcard-tag">TANONG ${i + 1}</span>
          <div class="cb"><span class="ct an">${peso(p.prize)}</span><span class="cs"><b>${esc(p.title)}</b> · ${esc(p.cardLine)}</span></div>
          <span class="qcard-go">▶ SAGUTIN</span></a>`
      )
      .join('')}</div>`;
  } else {
    question = `<div class="qbox" data-quiz="${c.num}" data-key="${e.slug}/${page.slug}" data-answer="${page.answer}" data-prize="${page.prize}">
      <div class="q-prize an">${peso(page.prize)} QUESTION</div>
      <p class="q-text">${esc(page.q)}</p>
      <p class="q-en">${esc(page.qEn)}</p>
      <div class="opts">${page.options
        .map((o, i) => `<button type="button" class="opt" data-opt="${i}"><span class="opt-l">${LETTERS[i]}:</span> ${esc(o)}</button>`)
        .join('')}</div>
      <div class="lifelines">
        <button type="button" class="life" data-life="fifty">50:50</button>
        <button type="button" class="life" data-life="text"><i class="ti ti-device-mobile-message" aria-hidden="true"></i> TEXT A FRIEND</button>
      </div>
      <div class="sms" hidden><div class="sms-screen"><div class="sms-from">1 MESSAGE · FROM: BARKADA</div><p>${esc(page.hint)}</p></div></div>
      <div class="verdict" aria-live="polite" hidden>
        <div class="verdict-head an"></div>
        <p>${esc(page.explain)}</p>
      </div>
    </div>`;
  }
  const cta = partIndex == null ? e.cta : page.cta;
  return `
  <div class="page quiz" style="background:${d.bg};--rnd:${e.color}">
    <div class="now quiz-now"><span class="an quiz-mini">${esc(d.showTitle)}</span><span class="label">ROUND ${e.ep}${partIndex != null ? ` · TANONG ${partIndex + 1}` : ''}</span>
      <span class="where">${esc(e.category)}${partIndex != null ? ` · ${peso(page.prize)}` : ''}</span>
      <a class="btn ghost back" href="/ch/${c.num}" data-link>◀ BACK TO CH ${c.num}</a></div>
    <div class="quiz-title">
      <div class="kicker">${partIndex == null ? `ROUND ${e.ep} · ${esc(e.en)}` : `TANONG ${partIndex + 1} OF ${e.parts.length}`}</div>
      <h1 class="an">${esc(partIndex == null ? e.title : page.title)}</h1>
      <div class="quiz-tsub">${esc(partIndex == null ? page.sub : page.cardLine)}</div>
    </div>
    ${tabRow(nav, 'quiz-tabs')}
    <div class="page-body">
      ${question}
      ${prizeBoard(page.stats)}
      <div class="cols">
        <div>${quizScreen(page.video, page.photos)}</div>
        <div>${thenNow(page)}</div>
      </div>
      ${extra}
      ${ctaBar(cta, 'ti-message-2')}
      ${nextUp ? `<a class="nextq" href="${nextUp.href}" data-link><span class="an">${esc(nextUp.label)}</span><span class="nextq-t">${esc(nextUp.title)} ▶</span></a>` : `<div class="nextq final"><span class="an">Salamat sa paglalaro!</span><span class="nextq-t" data-final="${c.num}">That was the million-peso question. Thanks for playing Then o Now?</span></div>`}
    </div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav, 'quiz-pager')}
    ${ticker(page.ticker || [])}
  </div>`;
}

/* Quiz state lives in this browser only (a light per-viewer convenience). */
function quizLoad(num) {
  try {
    return JSON.parse(localStorage.getItem(`y2k-quiz-${num}`) || '{}');
  } catch {
    return {};
  }
}
function quizSave(num, state) {
  try {
    localStorage.setItem(`y2k-quiz-${num}`, JSON.stringify(state));
  } catch {
    /* storage unavailable: the quiz still works for this visit */
  }
}

function quizWinnings(num, state) {
  const c = CHANNELS.find((x) => x.num === num);
  let total = 0;
  c.data.episodes.forEach((e) => e.parts.forEach((p) => { if (state[`${e.slug}/${p.slug}`] === 'right') total += p.prize; }));
  return total;
}

function paintQuizState(view, num) {
  const state = quizLoad(num);
  view.querySelectorAll('[data-q]').forEach((el) => {
    const s = state[el.dataset.q];
    el.classList.toggle('won', s === 'right');
    el.classList.toggle('lost', s === 'wrong');
  });
  const score = view.querySelector(`[data-score="${num}"] b`);
  if (score) score.textContent = peso(quizWinnings(num, state));
}

function bindQuiz(view) {
  const box = view.querySelector('[data-quiz]');
  const num = box?.dataset.quiz || view.querySelector('[data-ladder]')?.dataset.ladder;
  if (!num) return;
  paintQuizState(view, num);
  if (!box) return;
  const answer = Number(box.dataset.answer);
  const key = box.dataset.key;
  const opts = [...box.querySelectorAll('.opt')];
  const verdict = box.querySelector('.verdict');
  const reveal = (picked, instant) => {
    opts.forEach((b, i) => {
      b.disabled = true;
      b.classList.remove('locked');
      if (i === answer) b.classList.add('right');
      else if (i === picked) b.classList.add('wrong');
    });
    box.querySelectorAll('.life').forEach((b) => (b.disabled = true));
    const ok = picked === answer;
    verdict.hidden = false;
    verdict.classList.toggle('ok', ok);
    verdict.querySelector('.verdict-head').textContent = ok
      ? `TAMA! You won ${peso(Number(box.dataset.prize))}!`
      : `SAYANG! The answer is ${LETTERS[answer]}.`;
    if (!instant) {
      const state = quizLoad(num);
      state[key] = ok ? 'right' : 'wrong';
      quizSave(num, state);
      paintQuizState(view, num);
    }
  };
  const prior = quizLoad(num)[key];
  if (prior) {
    // Already played on this browser: show the answer, keep a replay button.
    reveal(prior === 'right' ? answer : -1, true);
    const again = document.createElement('button');
    again.type = 'button';
    again.className = 'life again';
    again.textContent = '↻ PLAY AGAIN';
    again.addEventListener('click', () => {
      const state = quizLoad(num);
      delete state[key];
      quizSave(num, state);
      opts.forEach((b) => { b.disabled = false; b.classList.remove('right', 'wrong', 'gone'); });
      box.querySelectorAll('.life').forEach((b) => (b.disabled = false));
      verdict.hidden = true;
      again.remove();
      paintQuizState(view, num);
    });
    box.querySelector('.lifelines').append(again);
  }
  opts.forEach((b, i) =>
    b.addEventListener('click', () => {
      if (box.dataset.busy) return;
      box.dataset.busy = '1';
      opts.forEach((o) => (o.disabled = true));
      b.classList.add('locked');
      verdict.hidden = false;
      verdict.classList.remove('ok');
      verdict.querySelector('.verdict-head').textContent = 'FINAL ANSWER? LOCKED IN...';
      setTimeout(() => {
        delete box.dataset.busy;
        reveal(i, false);
      }, 1400);
    })
  );
  box.querySelector('[data-life="fifty"]').addEventListener('click', (ev) => {
    const wrong = opts.map((_, i) => i).filter((i) => i !== answer && !opts[i].disabled);
    wrong.sort(() => Math.random() - 0.5).slice(0, 2).forEach((i) => { opts[i].disabled = true; opts[i].classList.add('gone'); });
    ev.currentTarget.disabled = true;
  });
  box.querySelector('[data-life="text"]').addEventListener('click', (ev) => {
    box.querySelector('.sms').hidden = false;
    ev.currentTarget.disabled = true;
  });
}

/* ---------- After a screen appears: draw the CH 03 world map ---------- */
export async function afterRender(view) {
  bindQuiz(view);
  const box = view.querySelector('[data-worldmap]');
  if (!box) return;
  const c = CHANNELS.find((x) => x.num === box.dataset.worldmap);
  try {
    const [{ geoNaturalEarth1, geoPath, geoGraticule10 }, { feature }] = await Promise.all([
      import('https://cdn.jsdelivr.net/npm/d3-geo@3.1.1/+esm'),
      import('https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/+esm'),
    ]);
    const world = await (await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json')).json();
    if (!box.isConnected) return;
    const W = 600, H = 330;
    const proj = geoNaturalEarth1().rotate([-150, 0]).fitExtent([[6, 6], [W - 6, H - 6]], { type: 'Sphere' });
    const path = geoPath(proj);
    const land = feature(world, world.objects.countries).features;
    const d = c.data;
    const homeXY = proj(d.home.ll);
    const routes = d.pins.map((p) => `<path d="${path({ type: 'LineString', coordinates: [p.ll, d.home.ll] })}" class="route"/>`).join('');
    const pins = d.pins
      .map((p) => {
        const [x, y] = proj(p.ll);
        const ep = d.episodes.find((e) => e.ep === p.eps[0]);
        return `<a href="/ch/${c.num}/${ep.slug}" data-link aria-label="${esc(p.city)}: ${esc(ep.title)}">
          <circle cx="${x}" cy="${y}" r="12" class="pin"/><text x="${x}" y="${y + 4}" class="pin-num">${p.eps.join('·')}</text>
          <text x="${p.left ? x - 16 : x + 16}" y="${y + 4}" class="pin-city" text-anchor="${p.left ? 'end' : 'start'}">${esc(p.city)}</text></a>`;
      })
      .join('');
    box.innerHTML = `<span class="live">LIVE</span>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="World map with story pins">
        <path d="${path({ type: 'Sphere' })}" class="sea"/>
        <path d="${path(geoGraticule10())}" class="grat"/>
        ${land.map((f) => `<path d="${path(f)}" class="${f.id === '608' ? 'ph' : 'land'}"/>`).join('')}
        ${routes}
        <circle cx="${homeXY[0]}" cy="${homeXY[1]}" r="7" class="home"/>
        <text x="${homeXY[0] + 10}" y="${homeXY[1] + 18}" class="home-label">${esc(d.home.city)}</text>
        ${pins}
      </svg>
      <span class="map-label">TAP A PIN OR A STORY</span>`;
  } catch (err) {
    /* If the map can't load, the globe icon stays and the story list still works. */
  }
}
