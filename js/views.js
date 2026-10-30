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
export function media(video, photos, accent) {
  const v = video?.youtube
    ? `<div class="video"${accent ? ` style="border-color:${accent}"` : ''}><iframe src="https://www.youtube-nocookie.com/embed/${esc(video.youtube)}" title="${esc(video.label)}" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    : `<div class="video"${accent ? ` style="border-color:${accent}"` : ''}><canvas class="snow" data-snow></canvas><div class="msg"><i class="ti ti-player-play" aria-hidden="true"></i>VIDEO COMING SOON<br><span class="it">${esc(video?.label || '')}</span></div></div>`;
  return v + photoGrid(photos);
}

export function photoGrid(photos) {
  const p = (photos || [])
    .map((ph) =>
      ph.src
        ? `<figure class="photo"><img src="${esc(ph.src)}" alt="${esc(ph.caption)}" loading="lazy"><figcaption>${esc(ph.caption)}</figcaption></figure>`
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
  return lineupEpisode(c, e, partIndex);
}

function lineupEpisode(c, e, partIndex) {
  const d = c.data;
  const solemn = !!e.solemn;
  const accent = 'var(--yellow)';
  const bg = e.bg || d.bg;
  const base = `/ch/${c.num}/${e.slug}`;
  const stops = [{ href: base, name: 'OVERVIEW' }, ...e.parts.map((p) => ({ href: `${base}/${p.slug}`, name: p.cardTitle }))];
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
  const stops = [{ href: base, name: overviewName }, ...e.parts.map((p) => ({ href: `${base}/${p.slug}`, name: p.cardTitle }))];
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
    ? `<div class="video cam"><iframe src="https://www.youtube-nocookie.com/embed/${esc(video.youtube)}" title="${esc(video.label)}" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
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
    ? `<div class="video spot"><iframe src="https://www.youtube-nocookie.com/embed/${esc(video.youtube)}" title="${esc(video.label)}" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
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

/* ---------- After a screen appears: draw the CH 03 world map ---------- */
export async function afterRender(view) {
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
