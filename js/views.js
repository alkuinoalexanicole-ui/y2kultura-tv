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
    ${ticker(['PICK A CHANNEL OR TYPE ITS NUMBER ON THE REMOTE', 'P+ / P- TO CHANGE CHANNEL', 'ALL 9 CHANNELS NOW ON AIR']) }
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
  if (c.data.format === 'mmk') return mmkChannel(c);
  if (c.data.format === 'desktop') return deskChannel(c);
  if (c.data.format === 'mag') return magChannel(c);
  if (c.data.format === 'future') return futureChannel(c);
  if (c.data.format === 'news') return newsChannel(c);
  if (c.data.format === 'talent') return talentChannel(c);
  if (c.data.format === 'teleserye') return seryeChannel(c);
  if (c.data.format === 'quiz') return quizChannel(c);
  if (c.data.format === 'buzz') return buzzChannel(c);
  if (c.data.format === 'credits') return creditsChannel(c);
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
  if (c.data.format === 'mmk') return mmkEpisode(c, e, partIndex);
  if (c.data.format === 'desktop') return deskEpisode(c, e, partIndex);
  if (c.data.format === 'mag') return magEpisode(c, e, partIndex);
  if (c.data.format === 'future') return futureEpisode(c, e);
  if (c.data.format === 'news') return newsEpisode(c, e, partIndex);
  if (c.data.format === 'talent') return talentEpisode(c, e, partIndex);
  if (c.data.format === 'teleserye') return seryeEpisode(c, e, partIndex);
  if (c.data.format === 'quiz') return quizEpisode(c, e, partIndex);
  if (c.data.format === 'buzz') return buzzEpisode(c, e, partIndex);
  if (c.data.format === 'credits') return creditsEpisode(c, e);
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
      ${nxt ? `<a href="${nxt.href}" data-link>NEXT: ${esc(nxt.name)} ▶</a>` : endLink(c, e, `<a href="/ch/${c.num}" data-link>BACK TO LINE-UP ▶</a>`)}
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

function stopsFor(c, e, partIndex, overviewName) {
  const base = `/ch/${c.num}/${e.slug}`;
  const stops = [{ href: base, name: overviewName }, ...e.parts.map((p) => ({ href: `${base}/${p.slug}`, name: p.cardTitle || p.title }))];
  const at = partIndex == null ? 0 : partIndex + 1;
  return { base, stops, at, prev: stops[at - 1], next: stops[at + 1], e };
}

function tabRow({ stops, at }, cls = '') {
  return `<div class="tabs ${cls}">${stops
    .map((s, i) => `<a class="tab${i === at ? ' on' : ''}" href="${s.href}" data-link>${esc(s.name)}</a>`)
    .join('')}</div>`;
}

// On the last page of a channel's last episode, the pager leads on to the next channel.
function endLink(c, e, fallback) {
  const last = c.data.episodes[c.data.episodes.length - 1];
  const nc = CHANNELS[CHANNELS.indexOf(c) + 1];
  if (e === last && nc) return `<a href="/ch/${nc.num}" data-link>NEXT CHANNEL: CH ${nc.num} ${esc(nc.title.toUpperCase())} ▶</a>`;
  return fallback;
}

function pagerBar(c, { prev, next, e }, cls = '') {
  return `<div class="pager ${cls}">
    ${prev ? `<a href="${prev.href}" data-link>◀ ${esc(prev.name)}</a>` : `<a href="/ch/${c.num}" data-link>◀ CH ${c.num} MAIN PAGE</a>`}
    ${next ? `<a href="${next.href}" data-link>NEXT: ${esc(next.name)} ▶</a>` : endLink(c, e, `<a href="/ch/${c.num}" data-link>BACK TO CH ${c.num} ▶</a>`)}
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
    </div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav)}
    ${ticker(page.ticker || [])}
  </div>`;
}

/* ---------- CH 01 format: letter-reading drama ----------
   Each story is read like a letter on stationery, named after a keepsake,
   with a host's welcome on the channel page and a memory box for the tags. */
function mmkMemoryBox(page, show, note) {
  const tuck = note ? `<div class="mmk-tuck"><b>GOOD TO KNOW</b> ${esc(note)}</div>` : '';
  if (!show || !page.affect) return tuck;
  return `<div class="memory-box">
    <div class="mb-lid"><i class="ti ti-box" aria-hidden="true"></i> MEMORY BOX</div>
    <div class="mb-in">
      <h4>AFFECT</h4><div>${page.affect.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
      <h4 class="s">SENSES</h4><div>${page.senses.map((t) => `<span class="chip sense">${esc(t)}</span>`).join('')}</div>
      ${tuck}
    </div>
  </div>`;
}

function mmkReplay(video) {
  if (!video?.youtube) return media(video, [], null);
  return `<div class="mmk-replay"><span class="mmk-replay-tag">BALIKAN</span>${ytFrame(video, '', null)}</div>`;
}

function mmkChannel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  const env = d.episodes
    .map(
      (e, i) => `
    <a class="envelope${e.solemn ? ' solemn' : ''}" href="/ch/${c.num}/${e.slug}" data-link style="--stamp:${e.thumb}">
      <span class="env-stamp" aria-hidden="true"><i class="ti ${e.icon}"></i></span>
      <span class="env-post">LIHAM ${e.ep} · ${esc(d.times[i] || '')}</span>
      <span class="env-k pf">${esc(e.keepsake)}</span>
      <span class="env-t">${esc(e.title)}</span>
      <span class="env-s">${esc(e.cardSub)} · ${esc(e.cardMeta)}</span>
      <span class="env-go">▶ BUKSAN ANG LIHAM</span>
    </a>`
    )
    .join('');
  return `
  <div class="page mmk" style="background:${d.bg}">
    <header class="mmk-head">
      <span class="badge" style="background:var(--yellow);color:#0b2a5c">CH ${c.num}</span>
      <div class="mmk-logo"><span class="pf">${esc(d.title)}</span><small>${esc(d.aspect)}</small></div>
      <span class="mmk-onair">MGA LIHAM NG 2000s</span>
    </header>
    <div class="mmk-host">
      <div class="host-chair" aria-hidden="true"><i class="ti ti-armchair"></i></div>
      <div class="host-say">
        <div class="mmk-kicker">MAGANDANG GABI</div>
        <h3>WHAT IS IT?</h3><p>${esc(d.what)}</p>
        <h3>HOW THE 2000s FELT</h3><p>${esc(d.felt)}</p>
        <p class="host-cue">Ngayong gabi: ${d.episodes.length} na liham para sa inyo, bawat isa may itinagong alaala.</p>
      </div>
    </div>
    <div class="envelopes">${env}</div>
    <div style="flex:1"></div>
    ${ticker(['TAP A LETTER TO OPEN IT', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
  </div>`;
}

function mmkEpisode(c, e, partIndex) {
  const d = c.data;
  const nav = stopsFor(c, e, partIndex, 'ANG LIHAM');
  const solemn = !!e.solemn;
  const p = partIndex == null ? null : e.parts[partIndex];
  const page = p || e.overview;
  const pageNo = partIndex == null ? 1 : partIndex + 2;
  const total = e.parts.length + 1;
  const body = [];
  if (!p && page.desc) body.push(`<p>${esc(page.desc)}</p>`);
  (page.panels || []).forEach(([h, t]) => body.push(`<h4>${esc(h)}</h4><p>${esc(t)}</p>`));
  if (!p && page.extra) body.push(`<p>${esc(page.extra)}</p>`);
  const facts = page.facts?.length
    ? `<div class="index-card"><h4>${esc((p && p.factsTitle) || 'MGA DETALYE')}</h4>${factsTable(page.facts, solemn ? '#6b5200' : '#a3275f')}</div>`
    : '';
  const stamps = !p && page.chips ? `<div class="mmk-stamps">${page.chips.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : '';
  const more =
    !p && e.parts.length
      ? `<h3 class="mmk-more">ANG MGA SUSUNOD NA PAHINA</h3><div class="folded">${e.parts
          .map(
            (q, i) => `<a class="fold" href="${nav.base}/${q.slug}" data-link><span class="fold-n">PAHINA ${i + 2} · ${esc(q.label)}</span>
              <span class="ct">${esc(q.cardTitle)}</span><span class="cs">${esc(q.cardLine)}</span><span class="fold-go">▶ BASAHIN</span></a>`
          )
          .join('')}</div>`
      : '';
  return `
  <div class="page mmk${solemn ? ' mmk-solemn' : ''}" style="background:${e.bg || d.bg}">
    <div class="now mmk-now"><span class="label">LIHAM ${e.ep}</span><span class="where pf">${esc(e.keepsake)}</span>
      <span class="mmk-pg">PAHINA ${pageNo} NG ${total}</span><a class="btn ghost back" href="/ch/${c.num}" data-link>◀ BACK TO CH ${c.num}</a></div>
    ${total > 1 ? tabRow(nav, 'mmk-tabs') : ''}
    <div class="page-body">
      <div class="mmk-grid">
        <article class="letter">
          ${p && p.strip ? `<div class="mmk-ribbon">${esc(p.strip)}</div>` : ''}
          <div class="letter-top"><span>${esc(e.keepsakeEn)}</span><span>${pageNo}/${total}</span></div>
          <h1 class="pf">${esc(p ? p.title : e.title)}</h1>
          <div class="letter-sub">${esc(page.sub)}</div>
          <p class="dear">Mahal kong manonood,</p>
          ${body.join('')}
          ${stamps}
          <p class="sign">${solemn ? 'Nakikiramay,' : 'Nagmamahal,'}<br><span>${esc(d.title)}, CH ${c.num}</span></p>
        </article>
        <aside class="mmk-side">
          ${mmkReplay(page.video)}
          <div class="polaroids">${photoGrid(page.photos)}</div>
          ${facts}
          ${mmkMemoryBox(page, d.showTags, !p && page.note)}
        </aside>
      </div>
      ${more}
    </div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav, 'mmk-pager')}
    ${ticker(page.ticker?.length ? page.ticker : ['P+ / P- TO CHANGE CHANNEL'], solemn)}
  </div>`;
}

/* ---------- CH 02 format: "Y2K OS" computer desktop ----------
   The channel page is a desktop with icons; each story opens as a window,
   with a music player for the video and a phone for the quick facts. */
function xpBar(title, icon) {
  return `<div class="xp-title"><i class="ti ${icon}" aria-hidden="true"></i><span class="xp-tt">${esc(title)}</span><span class="xp-ctl" aria-hidden="true"><b>_</b><b>□</b><b class="x">×</b></span></div>`;
}

function xpTaskbar(c, items, clock) {
  const d = c.data;
  const menu = d.episodes
    .map(
      (e) => `<a href="/ch/${c.num}/${e.slug}" data-link><span class="xp-mi" style="background:${e.thumb}"><i class="ti ${e.icon}" aria-hidden="true"></i></span>
        <span><b>${esc(e.cardTitle)}</b><small>${esc(e.cardSub)}</small></span></a>`
    )
    .join('');
  return `<div class="xp-taskbar">
    <details class="xp-start"><summary><span class="xp-orb" aria-hidden="true"><i></i><i></i><i></i><i></i></span>start</summary>
      <div class="xp-startmenu">
        <div class="xp-sm-head"><span class="xp-av"><i class="ti ti-user" aria-hidden="true"></i></span>Y2K OS · ${esc(d.title)}</div>
        <div class="xp-sm-list">${menu}</div>
        <div class="xp-sm-foot"><a href="/ch/${c.num}" data-link><i class="ti ti-device-desktop" aria-hidden="true"></i> Desktop</a><a href="/guide" data-link><i class="ti ti-list" aria-hidden="true"></i> Channel Guide</a></div>
      </div>
    </details>
    <div class="xp-tasks">${items
      .map((s) => (s.href ? `<a class="xp-task${s.on ? ' on' : ''}" href="${s.href}" data-link>${esc(s.name)}</a>` : `<span class="xp-task on">${esc(s.name)}</span>`))
      .join('')}</div>
    <div class="xp-tray"><i class="ti ti-volume" aria-hidden="true"></i><i class="ti ti-antenna-bars-5" aria-hidden="true"></i><span>${esc(clock || '')}</span></div>
  </div>`;
}

function winamp(video) {
  if (!video?.youtube) return media(video, [], null);
  return `<section class="winamp">
    <div class="wa-title"><span>Y2KAMP</span><span class="xp-ctl" aria-hidden="true"><b>_</b><b class="x">×</b></span></div>
    <div class="wa-lcd" aria-hidden="true"><span class="wa-time">▶ 0:00</span><div class="wa-marquee"><span>${esc(video.label)} ***</span></div><span class="wa-kbps">128 kbps · 44 kHz · stereo</span></div>
    ${ytFrame(video, 'wa-vid', null)}
    <div class="wa-keys" aria-hidden="true"><i class="ti ti-player-skip-back"></i><i class="ti ti-player-play"></i><i class="ti ti-player-pause"></i><i class="ti ti-player-stop"></i><i class="ti ti-player-skip-forward"></i>
      <span class="wa-eq"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
  </section>`;
}

function nokiaWin(stats, chips) {
  const rows = stats?.length
    ? stats.map(([b, s]) => `<li><b>${esc(b)}</b><span>${esc(s)}</span></li>`).join('')
    : (chips || []).map((t) => `<li><b>${esc(t)}</b></li>`).join('');
  if (!rows) return '';
  return `<section class="xp-win xp-phone">${xpBar('Phone Suite · Inbox', 'ti-device-mobile')}
    <div class="nokia"><div class="nk-screen"><div class="nk-top"><span aria-hidden="true">▂▄▆</span><span>${stats?.length ? 'QUICK FACTS' : 'TAGS'}</span><span aria-hidden="true">▮▮▯</span></div><ul>${rows}</ul></div>
    <div class="nk-keys" aria-hidden="true"><i>1</i><i>2 abc</i><i>3 def</i><i>4 ghi</i><i>5 jkl</i><i>6 mno</i><i>7 pqrs</i><i>8 tuv</i><i>9 wxyz</i></div></div>
  </section>`;
}

function deskChannel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  const icons = d.episodes
    .map(
      (e) => `<a class="xp-icon" href="/ch/${c.num}/${e.slug}" data-link><span class="xp-ico" style="background:${e.thumb}"><i class="ti ${e.icon}" aria-hidden="true"></i></span>
        <span class="xp-lbl">${esc(e.cardTitle)}</span><span class="xp-meta">${esc(e.cardSub)}</span></a>`
    )
    .join('');
  return `
  <div class="page xp" style="--acc:#19B5F0">
    <div class="xp-desk home">
      <div class="xp-icons">${icons}</div>
      <section class="xp-win xp-note">
        ${xpBar(`Welcome to ${d.title}.txt - Notepad`, 'ti-file-text')}
        <div class="xp-menu-row" aria-hidden="true"><span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span></div>
        <div class="xp-paper">
          <h1>${esc(d.title)}<small>CH ${c.num} · ${esc(d.aspect)}</small></h1>
          <h3>WHAT IS IT?</h3><p>${esc(d.what)}</p>
          <h3>HOW THE 2000s FELT</h3><p>${esc(d.felt)}</p>
          <p class="xp-hint">Click an icon on the desktop, or open the start menu, to open a story.</p>
        </div>
      </section>
    </div>
    <div style="flex:1"></div>
    ${ticker(['CLICK AN ICON TO OPEN A STORY', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
    ${xpTaskbar(c, [{ name: `${d.title}.txt` }], d.times?.[0])}
  </div>`;
}

function deskEpisode(c, e, partIndex) {
  const d = c.data;
  const nav = stopsFor(c, e, partIndex, 'Overview');
  const p = partIndex == null ? null : e.parts[partIndex];
  const page = p || e.overview;
  const path = `C:\\${d.title}\\EP ${e.ep} ${e.title}${p ? `\\${p.cardTitle}` : ''}`;
  const panels = page.panels.map(([h, t]) => `<h3>${esc(h)}</h3><p>${esc(t)}</p>`).join('');
  const files =
    !p && e.parts.length
      ? `<h3 class="xp-sec">${esc(e.partsHeading || 'FILES IN THIS FOLDER')}</h3><div class="xp-files">${e.parts
          .map(
            (q) => `<a class="xp-file" href="${nav.base}/${q.slug}" data-link><i class="ti ti-folder" aria-hidden="true"></i>
              <span><small>${esc(q.label)}</small><b>${esc(q.cardTitle)}</b><span>${esc(q.cardLine)}</span></span></a>`
          )
          .join('')}</div>`
      : '';
  return `
  <div class="page xp" style="--acc:${e.accent || '#19B5F0'}">
    <div class="xp-desk">
      <section class="xp-win xp-main">
        ${xpBar(`${p ? p.cardTitle : e.title} - Y2K Explorer`, 'ti-folder-open')}
        <div class="xp-addr"><b>Address</b><span>${esc(path)}</span></div>
        <div class="xp-doc">
          <div class="xp-kicker">CH ${c.num} · EP ${e.ep}${p ? ` · ${esc(p.label)} OF ${e.parts.length}` : ''}</div>
          <h1>${esc(p ? p.title : e.title)}</h1>
          <div class="xp-sub">${esc(page.sub)}</div>
          ${panels}
          ${files}
        </div>
        ${ticker(page.ticker?.length ? page.ticker : ['P+ / P- TO CHANGE CHANNEL'])}
      </section>
      <div class="xp-side">
        ${winamp(page.video)}
        ${nokiaWin(page.stats, page.chips)}
        ${page.photos?.length ? `<section class="xp-win xp-pics">${xpBar('My Pictures', 'ti-photo')}<div class="xp-pbody">${photoGrid(page.photos)}</div></section>` : ''}
      </div>
    </div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav, 'xp-pager')}
    ${xpTaskbar(c, nav.stops.map((s, i) => ({ ...s, on: i === nav.at })), d.times?.[e.ep - 1])}
  </div>`;
}

/* ---------- CH 04 format: 2000s teen magazine ----------
   Each story gets its own cover; inside, the pages turn like a glossy mag,
   with a style quiz in the sidebar and the reality check as an editor's note. */
function magQuiz(stats) {
  if (!stats?.length) return '';
  return `<aside class="mag-quiz"><div class="mq-head"><span class="an">STYLE QUIZ</span><small>Hulaan mo! Tap a clue to see the answer.</small></div>
    <ol>${stats.map(([big, small]) => `<li><details><summary>${esc(small)}</summary><b class="an">${esc(big)}</b></details></li>`).join('')}</ol></aside>`;
}

function magTv(video) {
  return `<div class="mag-tv"><span class="mag-tv-k an">AS SEEN ON TV</span>${video?.youtube ? ytFrame(video, '', null) : media(video, [], null)}</div>`;
}

function magArticles(panels, title) {
  return panels
    .map(([h, t]) =>
      /REALITY/.test(h)
        ? `<div class="ed-note"><div class="en-k an">EDITOR'S NOTE</div><h4>${esc(h)}</h4><p>${esc(t)}</p><span class="en-sign pf">The Editors, ${esc(title)}</span></div>`
        : `<section class="mag-art"><h4>${esc(h)}</h4><p>${esc(t)}</p></section>`
    )
    .join('');
}

function magCover(c, e, { big = false, link = true } = {}) {
  const ph = e.overview.photos?.find((x) => x.src);
  const img = ph ? `<img src="${esc(ph.src)}" alt="${esc(ph.caption)}" loading="lazy"${ph.pos && ph.pos !== 'contain' ? ` style="object-position:${esc(ph.pos)}"` : ''}>` : '';
  const lines = e.parts
    .map((p) => (big ? `<a href="/ch/${c.num}/${e.slug}/${p.slug}" data-link>${esc(p.cardTitle)} <small>${esc(p.cardLine)}</small></a>` : `<span>${esc(p.cardTitle)}</span>`))
    .join('');
  const inner = `${img}<span class="cv-shade" aria-hidden="true"></span>
    <span class="cv-mast an">${esc(c.data.title)}</span>
    <span class="cv-issue">ISSUE ${e.ep} · THE 2000s</span>
    <span class="cv-lines">${lines}</span>
    <span class="cv-head an">${esc(e.title)}</span>
    <span class="cv-sub">${esc(e.cardSub)}</span>
    <span class="cv-fine it">${esc(e.fine)}</span>
    ${ph?.credit ? (link ? `<span class="cv-credit">Cover photo: ${esc(ph.credit)}</span>` : `<a class="cv-credit" href="${esc(ph.link || ph.src)}" target="_blank" rel="noopener">Cover: ${esc(ph.caption)} · Photo: ${esc(ph.credit)}</a>`) : ''}
    ${link ? '<span class="cv-go">▶ BASAHIN</span>' : ''}`;
  return link
    ? `<a class="cover" href="/ch/${c.num}/${e.slug}" data-link style="--c:${e.color}">${inner}</a>`
    : `<div class="cover big" style="--c:${e.color}">${inner}</div>`;
}

function magChannel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  return `
  <div class="page mag" style="background:${d.bg}">
    <header class="mag-mast"><span class="badge" style="background:var(--yellow);color:#0b2a5c">CH ${c.num}</span><span class="mm-logo an">${esc(d.title)}</span><span class="mm-meta">${esc(d.aspect)} · THE 2000s ISSUES</span></header>
    <div class="mag-ed">
      <div class="ed-k an">FROM THE EDITOR</div>
      <div class="ed-cols"><div><h3>WHAT IS IT?</h3><p>${esc(d.what)}</p></div><div><h3>HOW THE 2000s FELT</h3><p>${esc(d.felt)}</p></div></div>
    </div>
    <div class="mag-rack">${d.episodes.map((e) => magCover(c, e)).join('')}</div>
    <div style="flex:1"></div>
    ${ticker(['PICK AN ISSUE TO READ', 'THESE ARE NOT REAL PRODUCTS', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
  </div>`;
}

function magEpisode(c, e, partIndex) {
  const d = c.data;
  const nav = stopsFor(c, e, partIndex, 'COVER');
  const p = partIndex == null ? null : e.parts[partIndex];
  const page = p || e.overview;
  const pageNo = partIndex == null ? 1 : partIndex + 2;
  const isNote = p && p.slug === 'reality-check';
  const toc = `<nav class="mag-toc"><span class="an">IN THIS ISSUE</span>${nav.stops
    .map((s, i) => `<a class="${i === nav.at ? 'on' : ''}" href="${s.href}" data-link><b>${i + 1}</b>${esc(s.name)}</a>`)
    .join('')}</nav>`;
  let spread;
  if (!p) {
    spread = `<div class="mag-spread">
      ${magCover(c, e, { big: true, link: false })}
      <div class="mag-pg">
        <div class="mag-kicker">COVER STORY</div>
        <h1 class="an">${esc(e.title)}</h1>
        <div class="mag-dek">${esc(page.sub)}</div>
        ${magArticles(page.panels, d.title)}
        ${magTv(page.video)}
        ${photoGrid(page.photos.slice(1))}
      </div>
    </div>`;
  } else if (isNote) {
    spread = `<div class="mag-spread">
      <div class="mag-pg letterhead">
        <div class="en-k an">EDITOR'S NOTE</div>
        <h1 class="pf">${esc(p.title)}</h1>
        <div class="mag-dek">${esc(p.sub)}</div>
        ${p.panels.map(([h, t]) => `<section class="${/REALITY/.test(h) ? 'en-hl' : ''}"><h4>${esc(h)}</h4><p>${esc(t)}</p></section>`).join('')}
        <div class="en-sign pf">The Editors, ${esc(d.title)}</div>
        <div class="mag-fine it">${esc(p.fine)}</div>
      </div>
      <div class="mag-pg side">${magTv(p.video)}${photoGrid(p.photos)}${magQuiz(p.stats)}</div>
    </div>`;
  } else {
    spread = `<div class="mag-spread">
      <div class="mag-pg">
        <div class="mag-kicker">${esc(p.label)}</div>
        <h1 class="an">${esc(p.title)}</h1>
        <div class="mag-dek">${esc(p.sub)}</div>
        ${magArticles(p.panels, d.title)}
        <div class="mag-fine it">${esc(p.fine)}</div>
      </div>
      <div class="mag-pg side">${magTv(p.video)}${photoGrid(p.photos)}${magQuiz(p.stats)}</div>
    </div>`;
  }
  return `
  <div class="page mag" style="background:${d.bg};--c:${e.color}">
    <div class="now mag-now"><span class="an">${esc(d.title)}</span><span class="label">ISSUE ${e.ep}</span>
      <span class="where">PAGE ${pageNo} OF ${nav.stops.length}</span><a class="btn ghost back" href="/ch/${c.num}" data-link>◀ ALL ISSUES</a></div>
    ${toc}
    <div class="page-body">${spread}</div>
    <div class="mag-folio"><span>${esc(d.title.toUpperCase())} · ISSUE ${e.ep}</span><span>${pageNo}</span></div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav, 'mag-pager')}
    ${ticker(page.ticker || [])}
  </div>`;
}

/* ---------- CH 08 format: "Abante 2030" time machine ----------
   A time dial moves every story from the 2000s, to today (2026), to the 2030 forecast.
   The whole screen changes with the dial: phosphor green for the 2000s,
   dark phone UI for today, and glassy hologram for 2030. */
const ERA_KEYS = ['then', 'now', 'future'];
let futureEra = 'future';
let fxBooted = false;
const cap = (t) => (t ? t[0].toUpperCase() + t.slice(1) : t);

function eraDial(d) {
  const idx = ERA_KEYS.indexOf(futureEra);
  return `<div class="fx-dial" role="group" aria-label="Time dial">
    <span class="fx-dial-k"><i class="ti ti-clock-hour-4" aria-hidden="true"></i> TIME DIAL</span>
    <div class="fx-stops">${d.eras
      .map((x) => `<button type="button" class="fx-stop" data-era-btn="${x.key}" aria-pressed="${x.key === futureEra}">
        <i class="ti ${x.icon}" aria-hidden="true"></i><b>${esc(x.label)}</b><small>${esc(x.sub)}</small></button>`)
      .join('')}</div>
    <input class="fx-range" type="range" min="0" max="2" step="1" value="${idx}" data-era-range aria-label="Drag through the years: 2000s, today, 2030">
  </div>`;
}

function fxSwap(then, now, future) {
  const pick = { then, now, future }[futureEra];
  return `<span data-swap data-then="${esc(then)}" data-now="${esc(now)}" data-future="${esc(future)}">${esc(pick)}</span>`;
}

function futureChannel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  const tiles = d.episodes
    .map((e) => {
      const ev = e.rows[0];
      return `<a class="fx-tile" href="/ch/${c.num}/${e.slug}" data-link style="--c:${e.color}">
        <span class="fx-orb" aria-hidden="true"><i class="ti ${e.icon}"></i></span>
        <span class="fx-dom">SECTOR ${String(e.ep).padStart(2, '0')} · ${esc(e.en)}</span>
        <span class="fx-t">${esc(e.title)}</span>
        <span class="fx-line">${fxSwap(ev.then, ev.now, ev.future.head || ev.future.body)}</span>
        <span class="fx-go">▶ TIME JUMP</span>
      </a>`;
    })
    .join('');
  return `
  <div class="page future" data-era="${futureEra}" data-fx-boot>
    <header class="fx-head">
      <span class="badge" style="background:var(--yellow);color:#0b2a5c">CH ${c.num}</span>
      <div class="fx-brand"><span class="fx-logo">ABANTE <b>2030</b></span><small>${esc(d.aspect)}</small></div>
      <span class="fx-rec"><i aria-hidden="true"></i>TIME LINK ACTIVE</span>
    </header>
    <div class="fx-intro">
      <div><h3>WHAT IS IT?</h3><p>${esc(d.what)}</p></div>
      <div><h3>HOW TO WATCH</h3><p>${esc(d.felt)}</p></div>
    </div>
    ${eraDial(d)}
    <div class="fx-grid">${tiles}</div>
    <div style="flex:1"></div>
    ${ticker(['TURN THE TIME DIAL: 2000s, TODAY, 2030', 'FORECASTS ARE PROJECTIONS, NOT FACTS', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
  </div>`;
}

function futureEpisode(c, e) {
  const d = c.data;
  const eps = d.episodes;
  const i = eps.indexOf(e);
  const prev = eps[i - 1];
  const nx = eps[i + 1];
  const cell = (col, era, inner) => `<div class="fx-cell" data-col="${col}"><span class="fx-ct"><i class="ti ${era.icon}" aria-hidden="true"></i> ${esc(era.label)}${era.key === 'now' ? ' · 2026' : ''}</span>${inner}</div>`;
  const [eThen, eNow, eFut] = d.eras;
  const rows = e.rows
    .map(
      (r) => `<div class="fx-row">
        <div class="fx-rlabel"><i class="ti ${r.icon}" aria-hidden="true"></i><span>${esc(r.label)}</span></div>
        ${cell('then', eThen, `<p>${esc(r.then)}</p>`)}
        ${cell('now', eNow, `<p>${esc(r.now)}</p>`)}
        ${cell('future', eFut, `${r.future.head ? `<b class="fx-hl">${esc(r.future.head)}</b>` : ''}<p>${esc(r.future.body)}</p>`)}
      </div>`
    )
    .join('');
  const trend = `<div class="fx-row">
      <div class="fx-rlabel"><i class="ti ti-trending-up" aria-hidden="true"></i><span>Overall trend</span></div>
      ${cell('then', eThen, `<p>${esc(e.trend.then)}</p>`)}
      ${cell('now', eNow, `<p>${esc(e.trend.now)}</p>`)}
      ${cell('future', eFut, `<b class="fx-hl"><i class="ti ti-radar" aria-hidden="true"></i> Trend to watch</b><p>${esc(cap(e.watch))}</p>`)}
    </div>`;
  const sectors = eps
    .map((x) => `<a class="fx-sector${x === e ? ' on' : ''}" href="/ch/${c.num}/${x.slug}" data-link style="--c:${x.color}"><i class="ti ${x.icon}" aria-hidden="true"></i><span>${esc(x.en)}</span></a>`)
    .join('');
  const pager = `<div class="pager fx-pager">
    ${prev ? `<a href="/ch/${c.num}/${prev.slug}" data-link>◀ ${esc(prev.title)}</a>` : `<a href="/ch/${c.num}" data-link>◀ CH ${c.num} MAIN PAGE</a>`}
    ${nx ? `<a href="/ch/${c.num}/${nx.slug}" data-link>NEXT: ${esc(nx.title)} ▶</a>` : endLink(c, e, `<a href="/ch/${c.num}" data-link>BACK TO CH ${c.num} ▶</a>`)}
  </div>`;
  return `
  <div class="page future" data-era="${futureEra}" style="--c:${e.color}">
    <div class="now fx-now"><span class="label">SECTOR ${e.ep} OF ${eps.length}</span><span class="where">${esc(e.en)}</span><a class="btn ghost back" href="/ch/${c.num}" data-link>◀ ALL SECTORS</a></div>
    <nav class="fx-sectors" aria-label="Sectors">${sectors}</nav>
    <div class="page-body">
      <div class="fx-title">
        <span class="fx-orb big" aria-hidden="true"><i class="ti ${e.icon}"></i></span>
        <div><div class="fx-dom">${esc(e.en)} · ${esc(e.cardSub)}</div><h1>${esc(e.title)}</h1></div>
      </div>
      ${eraDial(d)}
      <div class="fx-board">
        <div class="fx-row fx-colhead" aria-hidden="true"><div></div>${d.eras.map((x) => `<div class="fx-ch" data-col="${x.key}"><i class="ti ${x.icon}"></i> ${esc(x.label)} <small>${esc(x.sub)}</small></div>`).join('')}</div>
        ${rows}
        ${trend}
      </div>
      <div class="fx-forecast">
        <section class="fx-card"><h4><i class="ti ti-history" aria-hidden="true"></i> MULA 2000s HANGGANG NGAYON</h4><p>${esc(e.pastToNow)}</p></section>
        <section class="fx-card f"><h4><i class="ti ti-rocket" aria-hidden="true"></i> PATUNGONG 2030</h4><p>${esc(e.toFuture)}</p></section>
      </div>
    </div>
    <div style="flex:1"></div>
    ${pager}
    ${ticker(['FORECASTS ARE PROJECTIONS, NOT FACTS', 'TURN THE TIME DIAL TO COMPARE THE YEARS', 'SOURCES: Y2Kultura curators, Phase 3 forecast workbook (2026)'])}
  </div>`;
}

function setEra(page, era) {
  if (!page.isConnected || !ERA_KEYS.includes(era)) return;
  futureEra = era;
  page.dataset.era = era;
  page.querySelectorAll('[data-era-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.eraBtn === era)));
  const r = page.querySelector('[data-era-range]');
  if (r) r.value = ERA_KEYS.indexOf(era);
  page.querySelectorAll('[data-swap]').forEach((el) => { el.textContent = el.dataset[era]; });
}

function bindFuture(view) {
  const page = view.querySelector('.page.future');
  if (!page) return;
  page.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-era-btn]');
    if (b) setEra(page, b.dataset.eraBtn);
  });
  page.querySelector('[data-era-range]')?.addEventListener('input', (ev) => setEra(page, ERA_KEYS[+ev.target.value]));
  if (page.hasAttribute('data-fx-boot') && !fxBooted && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // First visit: the dial travels from the 2000s to today to 2030 on its own.
    const end = futureEra;
    setEra(page, 'then');
    setTimeout(() => setEra(page, 'now'), 1000);
    setTimeout(() => setEra(page, end === 'then' ? 'future' : end), 2000);
  }
  fxBooted = true;
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
      ${nextUp ? `<a class="abangan" href="${nextUp.href}" data-link><span class="pf">Abangan!</span><span class="abangan-next">${esc(nextUp.label)}: <b>${esc(nextUp.title)}</b> ▶</span></a>` : `<div class="abangan wakas"><span class="pf">Wakas</span><span class="abangan-next">The end of our teleserye. Salamat sa panonood!</span></div>`}
    </div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav, 'serye-pager')}
    ${ticker(page.ticker || [])}
  </div>`;
}

/* ---------- CH 09 format: closing credits and sign-off ---------- */
function allPages(ch) {
  const out = [];
  ch.data.episodes.forEach((e) => {
    out.push({ e, page: e.overview, href: `/ch/${ch.num}/${e.slug}` });
    (e.parts || []).forEach((p) => out.push({ e, page: p, href: `/ch/${ch.num}/${e.slug}/${p.slug}` }));
  });
  return out;
}

// Sources are the ticker items from "SOURCES:" onward on each page.
function channelSources(ch) {
  const set = new Set();
  allPages(ch).forEach(({ page }) => {
    let on = false;
    (page?.ticker || []).forEach((t) => {
      if (/^SOURCES?:/i.test(t)) on = true;
      if (!on) return;
      let depth = 0, cur = '';
      const items = [];
      for (const ch2 of t.replace(/^SOURCES?:\s*/i, '')) {
        if (ch2 === '(') depth++;
        if (ch2 === ')') depth--;
        if (ch2 === ',' && depth === 0) { items.push(cur); cur = ''; } else cur += ch2;
      }
      items.push(cur);
      items.forEach((it) => {
        const m = it.trim().match(/^(.*?)\s*\((.*)\)$/);
        if (m && m[2].includes(';')) m[2].split(';').forEach((x) => set.add(`${m[1]} (${x.trim()})`));
        else if (it.trim()) set.add(it.trim());
      });
    });
  });
  return [...set].sort((a, b) => a.localeCompare(b));
}

function channelMedia(ch) {
  const photos = new Map();
  const videos = new Map();
  const add = (page, href) => {
    (page?.photos || []).forEach((p) => { if (p.src && !photos.has(p.src)) photos.set(p.src, { ...p, href }); });
    if (page?.video?.youtube && !videos.has(page.video.youtube)) videos.set(page.video.youtube, { ...page.video, href });
  };
  allPages(ch).forEach(({ page, href }) => add(page, href));
  return { photos: [...photos.values()], videos: [...videos.values()] };
}

function creditsChannel(c) {
  const d = c.data;
  const shows = CHANNELS.filter((x) => x.data && x !== c);
  let nPhotos = 0, nVideos = 0, nRefs = 0;
  CHANNELS.filter((x) => x.data).forEach((x) => {
    const m = channelMedia(x);
    nPhotos += m.photos.length;
    nVideos += m.videos.length;
    nRefs += channelSources(x).length;
  });
  const roll = `
    <div class="cr-block"><div class="cr-small">${esc(d.presents)}</div><div class="cr-big pf">Y2Kultura TV</div><div class="cr-small">${esc(d.tagline)}</div></div>
    <div class="cr-block"><div class="cr-role">${esc(d.curatorsLabel)}</div>${d.curators.map((n) => `<div class="cr-name">${esc(n)}</div>`).join('')}</div>
    <div class="cr-block"><div class="cr-role">NOW SHOWING</div>${shows.map((x) => `<div class="cr-line"><b>CH ${x.num} · ${esc(x.title)}</b><br><span>${esc(x.aspect)}</span></div>`).join('')}</div>
    <div class="cr-block"><div class="cr-role">REFERENCES</div><div class="cr-line">${nRefs} sources cited across the channels<br><span>Full list: Mga Sanggunian</span></div></div>
    <div class="cr-block"><div class="cr-role">PHOTOS AND VIDEOS</div><div class="cr-line">${nPhotos} photos from Wikimedia Commons<br>${nVideos} videos from YouTube<br><span>Full list: Mga Larawan at Video</span></div></div>
    <div class="cr-block"><div class="cr-role">BUILT WITH</div>${d.builtWith.map(([k, v]) => `<div class="cr-line"><b>${esc(k)}</b><br><span>${esc(v)}</span></div>`).join('')}</div>
    <div class="cr-block"><div class="cr-role">SPECIAL THANKS</div>${d.thanks.map((t) => `<div class="cr-line">${esc(t)}</div>`).join('')}</div>
    <div class="cr-block"><div class="cr-small">All shows, songs, brands, and footage belong to their respective owners.<br>An educational, non-commercial digital museum.</div></div>
    <div class="cr-block"><div class="cr-big pf">Salamat sa panonood!</div></div>`;
  const cards = d.episodes
    .map(
      (e) => `<a class="endcard" href="/ch/${c.num}/${e.slug}" data-link><span class="endcard-n">${pad(e.ep)}</span>
        <span class="endcard-t pf">${esc(e.title)}</span><span class="endcard-en">${esc(e.en)}</span><span class="endcard-s">${esc(e.cardSub)}</span></a>`
    )
    .join('');
  return `
  <div class="page credits" style="background:${d.bg}">
    ${channelHead(c, d, 'background:#0b0b0b')}
    <div class="finale">
      <div class="finale-video">
        <div class="cr-role">BEHIND THE SCENES · THE LAST BROADCAST</div>
        ${ytFrame(d.rollVideo, 'finalecam', null)}
      </div>
      <div class="roll-wrap">
        <div class="roll" data-roll tabindex="0" aria-label="Closing credits"><div class="roll-in">${roll}</div></div>
        <button type="button" class="roll-btn" data-roll-btn aria-pressed="false"><i class="ti ti-player-pause" aria-hidden="true"></i> PAUSE CREDITS</button>
      </div>
    </div>
    <div class="bar credits-bar"><span class="an">ANG BUONG CREDITS</span><small>THE FULL CREDITS, REFERENCES, AND SIGN-OFF</small></div>
    <div class="endcards">${cards}</div>
    <div style="flex:1"></div>
    ${ticker(['SALAMAT SA PANONOOD!', 'THE FULL REFERENCE LIST IS IN MGA SANGGUNIAN', 'P+ TO GO BACK TO THE START OF THE NETWORK'])}
  </div>`;
}

function creditsEpisode(c, e) {
  const d = c.data;
  const shows = CHANNELS.filter((x) => x.data && x !== c);
  let body = '';
  if (e.kind === 'team') {
    body = `<div class="cr-sheet">
      <div class="cr-role">${esc(d.curatorsLabel)}</div>
      <div class="cr-names">${d.curators.map((n) => `<span class="cr-name">${esc(n)}</span>`).join('')}</div>
      <div class="cr-role">THE CHANNELS</div>
      <table class="cr-table">${CHANNELS.filter((x) => x.data).map((x) => `<tr><th><a href="/ch/${x.num}" data-link>CH ${x.num}</a></th><td><b>${esc(x.title)}</b> · ${esc(x.aspect)}</td></tr>`).join('')}</table>
      <div class="cr-role">BUILT WITH</div>
      <table class="cr-table">${d.builtWith.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</table>
      <div class="cr-role">SPECIAL THANKS</div>
      <ul class="cr-list">${d.thanks.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
    </div>`;
  } else if (e.kind === 'refs') {
    body = shows
      .map((x) => {
        const refs = channelSources(x);
        if (!refs.length) return '';
        return `<section class="cr-sheet"><h3 class="cr-ch"><a href="/ch/${x.num}" data-link>CH ${x.num} · ${esc(x.title)}</a> <small>${esc(x.aspect)}</small></h3>
          <ul class="cr-refs">${refs.map((r) => `<li>${esc(r)}</li>`).join('')}</ul></section>`;
      })
      .join('') + `<p class="cr-note">Sources are listed as they are cited on each page. Figures are given as they were reported at the time.</p>`;
  } else if (e.kind === 'media') {
    body = shows
      .map((x) => {
        const { photos, videos } = channelMedia(x);
        if (!photos.length && !videos.length) return '';
        return `<section class="cr-sheet"><h3 class="cr-ch"><a href="/ch/${x.num}" data-link>CH ${x.num} · ${esc(x.title)}</a> <small>${photos.length} photos · ${videos.length} videos</small></h3>
          ${videos.length ? `<div class="cr-role">VIDEOS (YOUTUBE)</div><ul class="cr-media">${videos
            .map((v) => `<li><a href="https://www.youtube.com/watch?v=${esc(v.youtube)}" target="_blank" rel="noopener">${esc(v.label)}</a> <span>· uploaded by ${esc(v.credit || 'YouTube user')}</span></li>`)
            .join('')}</ul>` : ''}
          ${photos.length ? `<div class="cr-role">PHOTOS (WIKIMEDIA COMMONS)</div><ul class="cr-media">${photos
            .map((p) => `<li><a href="${esc(p.link || p.src)}" target="_blank" rel="noopener">${esc(p.caption)}</a> <span>· ${esc(p.credit || '')}</span></li>`)
            .join('')}</ul>` : ''}</section>`;
      })
      .join('');
  } else {
    const low = ['#0000c0', '#131313', '#c000c0', '#131313', '#00c0c0', '#131313', '#c0c0c0'];
    body = `<div class="signoff" data-tone>
      <div class="smpte">${BARS.map((b) => `<i style="background:${b}"></i>`).join('')}</div>
      <div class="smpte-low">${low.map((b) => `<i style="background:${b}"></i>`).join('')}</div>
      <div class="signoff-card">
        <div class="cr-small">Y2KULTURA TV NETWORK</div>
        <p>This concludes our broadcast day. Y2Kultura TV has brought you the sights, sounds, and feelings of Philippine pop culture from 2000 to 2010, across seven channels.</p>
        <p>Thank you for watching, and for remembering with us. Hanggang sa muli!</p>
        <div class="cr-big pf">Salamat sa panonood!</div>
        <div class="signoff-btns"><button type="button" class="btn tone-btn" data-tone-btn><i class="ti ti-wave-sine" aria-hidden="true"></i> PLAY THE SIGN-OFF TONE</button><a class="btn" href="/" data-link>▶ BACK TO CH 00</a><a class="btn" href="/guide" data-link>CHANNEL GUIDE</a></div>
      </div>
    </div>
    <div class="cols" style="margin-top:14px"><div>${ytFrame(e.overview.video, 'finalecam', null)}</div>
      <div class="cr-sheet"><div class="cr-role">REMEMBER THIS?</div><p class="cr-p">Every night in the 2000s, stations signed off with a prayer, the national anthem, and a notice like this one, before the screen went to color bars and static. Some viewers stayed up just to see it.</p></div></div>`;
  }
  const i = d.episodes.indexOf(e);
  const prev = d.episodes[i - 1];
  const next = d.episodes[i + 1];
  return `
  <div class="page credits" style="background:${d.bg}">
    <div class="now credits-now"><span class="label">CH ${c.num} · CREDITS ROLL</span><span class="where">${esc(e.en)}</span>
      <a class="btn ghost back" href="/ch/${c.num}" data-link>◀ BACK TO CH ${c.num}</a></div>
    <div class="cr-title">
      <div class="kicker">${pad(e.ep)} · ${esc(e.en)}</div>
      <h1 class="pf">${esc(e.title)}</h1>
      <div class="cr-tsub">${esc(e.overview.sub)}</div>
    </div>
    <div class="tabs credits-tabs">${d.episodes.map((x) => `<a class="tab${x === e ? ' on' : ''}" href="/ch/${c.num}/${x.slug}" data-link>${esc(x.title)}</a>`).join('')}</div>
    <div class="page-body">${body}</div>
    <div style="flex:1"></div>
    <div class="pager credits-pager">
      ${prev ? `<a href="/ch/${c.num}/${prev.slug}" data-link>◀ ${esc(prev.title)}</a>` : `<a href="/ch/${c.num}" data-link>◀ CH ${c.num} MAIN PAGE</a>`}
      ${next ? `<a href="/ch/${c.num}/${next.slug}" data-link>NEXT: ${esc(next.title)} ▶</a>` : `<a href="/" data-link>BACK TO CH 00 ▶</a>`}
    </div>
    ${ticker(e.overview.ticker || [])}
  </div>`;
}

function bindRoll(view) {
  const roll = view.querySelector('[data-roll]');
  const btn = view.querySelector('[data-roll-btn]');
  if (!roll || !btn) return;
  const set = (paused) => {
    roll.classList.toggle('paused', paused);
    btn.setAttribute('aria-pressed', String(paused));
    btn.innerHTML = paused ? '<i class="ti ti-player-play" aria-hidden="true"></i> PLAY CREDITS' : '<i class="ti ti-player-pause" aria-hidden="true"></i> PAUSE CREDITS';
  };
  btn.addEventListener('click', () => set(!roll.classList.contains('paused')));
  roll.addEventListener('focus', () => set(true));
}

/* ---------- CH 08 format: showbiz talk show ---------- */
function buzzChannel(c) {
  const d = c.data;
  const next = CHANNELS[CHANNELS.indexOf(c) + 1];
  const segs = d.episodes
    .map(
      (e) => `<a class="tabloid" href="/ch/${c.num}/${e.slug}" data-link style="--seg:${e.color}">
        <span class="stamp">EXCLUSIVE!</span>
        <span class="tab-head">${esc(e.headline)}</span>
        <span class="tab-title">${esc(e.title)} <small>${esc(e.en)}</small></span>
        <span class="tab-sub">${esc(e.cardSub)}</span>
        <span class="tab-go">▶ PANOORIN ANG TSIKA</span></a>`
    )
    .join('');
  return `
  <div class="page buzz" style="background:${d.bg}">
    ${channelHead(c, d, 'background:#1a0424')}
    <div class="buzz-set">
      <div class="sparkle" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <span class="ribbon">EXCLUSIVE</span>
      <div class="buzz-sub">${esc(d.showSub)}</div>
      <div class="buzz-logo"><span class="burst an" aria-hidden="true">BUZZ!</span><span class="pf">${esc(d.showTitle)}</span></div>
      <p class="buzz-host"><i class="ti ti-microphone-2" aria-hidden="true"></i> ${esc(d.hostLine)}</p>
      <div class="buzz-sched">${esc(d.sched)}</div>
    </div>
    <div class="bar buzz-bar"><span class="an">MGA EXCLUSIVE NGAYONG GABI</span><small>${d.episodes.length} SEGMENTS · ALL ABOUT Y2KULTURA TV</small></div>
    <div class="tabloids">${segs}</div>
    <div style="flex:1"></div>
    ${ticker(['BREAKING CHIKA: THE STORY BEHIND Y2KULTURA TV', 'TAP AN EXCLUSIVE TO WATCH', 'P+ / P- TO CHANGE CHANNEL', next ? `CH ${next.num} NEXT: ${next.title.toUpperCase()}` : ''])}
  </div>`;
}

function monitorWall(c) {
  return `<div class="wall">${CHANNELS.map(
    (x) => `<a class="monitor${x === c ? ' on' : ''}" href="/ch/${x.num}" data-link style="--mon:${x.data?.bg || '#222'}">
      <span class="mon-num an">CH ${x.num}</span><span class="mon-name">${esc(x.title)}</span><span class="mon-asp">${esc(x.aspect)}</span></a>`
  ).join('')}</div>`;
}

function interview(qa) {
  return (qa || [])
    .map(
      ([q, a]) => `<div class="qa"><div class="ask"><span class="qa-tag">TANONG</span><i class="ti ti-microphone-2" aria-hidden="true"></i> ${esc(q)}</div>
        <div class="reply"><span class="qa-tag">SAGOT</span> ${esc(a)}</div></div>`
    )
    .join('');
}

function rundown(list) {
  if (!list?.length) return '';
  return `<table class="rundown">${list.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</table>`;
}

function chikaTiles(stats) {
  if (!stats?.length) return '';
  return `<div class="chika">${stats
    .map(([big, small]) => `<div class="bubble"><div class="an">${esc(big)}</div><div>${esc(small)}</div></div>`)
    .join('')}</div>`;
}

function buzzScreen(video, photos) {
  if (!video) return photoGrid(photos);
  const v = video.youtube
    ? ytFrame(video, 'buzzcam', null)
    : `<div class="video buzzcam"><canvas class="snow" data-snow></canvas><div class="msg"><i class="ti ti-video" aria-hidden="true"></i>VIDEO COMING SOON<br><span class="it">${esc(video.label || '')}</span></div></div>`;
  return v + photoGrid(photos);
}

function buzzEpisode(c, e, partIndex) {
  const d = c.data;
  const nav = stopsFor(c, e, partIndex, 'ANG EXCLUSIVE');
  const page = partIndex == null ? e.overview : e.parts[partIndex];
  const ei = d.episodes.indexOf(e);
  let nextUp = null;
  if (nav.next) nextUp = { href: nav.next.href, label: 'SUSUNOD NA TSIKA', title: e.parts[nav.at].title };
  else if (d.episodes[ei + 1]) {
    const ne = d.episodes[ei + 1];
    nextUp = { href: `/ch/${c.num}/${ne.slug}`, label: `EXCLUSIVE #${ne.ep}`, title: ne.headline };
  }
  let extra = '';
  if (partIndex == null) {
    extra = `<h3 class="an section-head">MGA TSIKA</h3><div class="parts">${e.parts
      .map(
        (p) => `<a class="segcard" href="${nav.base}/${p.slug}" data-link><span class="segcard-tag">${esc(p.en)}</span>
          <div class="cb"><span class="ct pf">${esc(p.title)}</span><span class="cs">${esc(p.cardLine)}</span></div>
          <span class="segcard-go">▶ PANOORIN</span></a>`
      )
      .join('')}</div>`;
  }
  const media = page.video || page.photos?.length ? buzzScreen(page.video, page.photos) : '';
  return `
  <div class="page buzz" style="background:${d.bg};--seg:${e.color}">
    <div class="now buzz-now"><span class="pf buzz-mini">${esc(d.showTitle)}</span><span class="label">EXCLUSIVE #${e.ep}</span>
      <span class="where">${esc(e.title)}${partIndex != null ? ` · ${esc(page.title)}` : ''}</span>
      <a class="btn ghost back" href="/ch/${c.num}" data-link>◀ BACK TO CH ${c.num}</a></div>
    <div class="breaking"><span class="brk-tag an">BREAKING CHIKA</span><span class="brk-text">${esc(e.headline)}</span></div>
    <div class="buzz-title">
      <div class="kicker">${partIndex == null ? `EXCLUSIVE #${e.ep} · ${esc(e.en)}` : esc(page.en || '')}</div>
      <h1 class="pf">${esc(partIndex == null ? e.title : page.title)}</h1>
      <div class="buzz-tsub">${esc(page.sub)}</div>
    </div>
    ${tabRow(nav, 'buzz-tabs')}
    <div class="page-body">
      ${chikaTiles(page.stats)}
      ${page.wall ? `<h3 class="an section-head">ANG CONTROL ROOM · TAP A MONITOR</h3>${monitorWall(c)}` : ''}
      <div class="cols">
        ${media ? `<div>${media}</div>` : ''}
        <div>${interview(page.qa)}${rundown(page.list)}</div>
      </div>
      ${extra}
      ${nextUp ? `<a class="nextseg" href="${nextUp.href}" data-link><span class="an">${esc(nextUp.label)}</span><span class="nextseg-t">${esc(nextUp.title)} ▶</span></a>` : `<div class="nextseg final"><span class="pf">Hanggang sa susunod na tsika!</span><span class="nextseg-t">That's all the buzz for now. Stay tuned for CH ${String(+c.num + 1).padStart(2, '0')}, Credits Roll.</span></div>`}
    </div>
    <div style="flex:1"></div>
    ${pagerBar(c, nav, 'buzz-pager')}
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
        <button type="button" class="life" data-life="audience"><i class="ti ti-users" aria-hidden="true"></i> ASK THE AUDIENCE</button>
        <button type="button" class="life" data-life="text"><i class="ti ti-device-mobile-message" aria-hidden="true"></i> TEXT A FRIEND</button>
      </div>
      <div class="sms" hidden><div class="sms-screen"><div class="sms-from">1 MESSAGE · FROM: ${esc(page.hintFrom || 'BARKADA')}</div><p>${esc(page.hint)}</p></div></div>
      <div class="poll" hidden aria-live="polite"><div class="poll-head an">STUDIO AUDIENCE SAYS...</div><div class="poll-bars">${page.options
        .map((o, i) => `<div class="poll-col" data-poll="${i}"><span class="poll-pct">0%</span><span class="poll-bar"><i></i></span><span class="poll-l">${LETTERS[i]}</span></div>`)
        .join('')}</div><div class="poll-note">A pretend studio audience, just for fun.</div></div>
      <div class="verdict" aria-live="polite" hidden>
        <div class="verdict-head an"></div>
        <p>${esc(page.explain)}</p>
      </div>
    </div>`;
  }
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
      box.querySelector('.poll').hidden = true;
      box.querySelector('.sms').hidden = true;
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
  // Ask the Audience: a pretend studio poll that leans toward the right answer,
  // skipping any choices the 50:50 already removed.
  box.querySelector('[data-life="audience"]').addEventListener('click', (ev) => {
    const live = opts.map((_, i) => i).filter((i) => !opts[i].classList.contains('gone'));
    const pct = {};
    let left = 100;
    pct[answer] = live.length <= 2 ? 62 + Math.floor(Math.random() * 18) : 46 + Math.floor(Math.random() * 20);
    left -= pct[answer];
    const others = live.filter((i) => i !== answer).sort(() => Math.random() - 0.5);
    others.forEach((i, k) => {
      const share = k === others.length - 1 ? left : Math.floor(left * (0.35 + Math.random() * 0.3));
      pct[i] = share;
      left -= share;
    });
    const poll = box.querySelector('.poll');
    poll.hidden = false;
    poll.querySelectorAll('.poll-col').forEach((col) => {
      const v = pct[Number(col.dataset.poll)] || 0;
      col.querySelector('.poll-pct').textContent = `${v}%`;
      requestAnimationFrame(() => (col.querySelector('.poll-bar i').style.height = `${v}%`));
    });
    ev.currentTarget.disabled = true;
  });
}

/* ---------- After a screen appears: draw the CH 03 world map ---------- */
export async function afterRender(view) {
  bindQuiz(view);
  bindRoll(view);
  bindFuture(view);
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
