import { SITE, CATEGORIES, categoryName } from '../data/games.mjs';

export const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export function formatCount(value) {
  const n = Number(value) || 0;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

export const abs = (path = '/') => `${SITE.origin}${path.startsWith('/') ? path : `/${path}`}`;

const json = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

export function analytics() {
  return `
  <!-- Google Analytics (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.analytics.ga4}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${SITE.analytics.ga4}', { anonymize_ip: true });
  </script>
  <!-- Microsoft Clarity -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${SITE.analytics.clarity}");
  </script>`;
}

export function head({
  title,
  description,
  canonical,
  type = 'website',
  jsonld = [],
  image = '/assets/img/og-cover.png',
  imageWidth = 1200,
  imageHeight = 630,
  noindex = false,
  extra = '',
}) {
  const canonicalUrl = abs(canonical);
  return `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">'}
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="theme-color" content="#0b1020">
  <meta name="color-scheme" content="dark">
  <meta name="author" content="${SITE.name}">
  <meta name="application-name" content="${SITE.name}">
  <meta name="apple-mobile-web-app-title" content="${SITE.shortName}">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="format-detection" content="telephone=no">

  <!-- Open Graph -->
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${abs(image)}">
  <meta property="og:image:width" content="${imageWidth}">
  <meta property="og:image:height" content="${imageHeight}">
  <meta property="og:image:alt" content="Unblocked Games G+ — free HTML5 arcade games">
  <meta property="og:locale" content="en_US">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${abs(image)}">
  <meta name="twitter:image:alt" content="Unblocked Games G+ — free HTML5 arcade games">

  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/img/icon-192.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="stylesheet" href="/assets/css/site.css">
  <link rel="preconnect" href="https://www.googletagmanager.com">
  ${extra}
  ${jsonld.map((item) => `<script type="application/ld+json">${json(item)}</script>`).join('\n  ')}
  ${analytics()}`;
}

export function brand() {
  return `<a class="brand" href="/" aria-label="${SITE.name} home">
    <span class="brand-mark" aria-hidden="true">G+</span>
    <span class="brand-text">Unblocked Games <strong>G+</strong><span class="brand-sub">GamePlus Edition</span></span>
  </a>`;
}

export function header() {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="siteHeader">
    <div class="header-inner">
      ${brand()}
      <nav class="main-nav" id="mainNav" aria-label="Main navigation">
        <a href="/games/">All Games</a>
        <a href="/categories/arcade/">Arcade</a>
        <a href="/categories/puzzle/">Puzzle</a>
        <a href="/categories/action/">Action</a>
        <a href="/categories/sports/">Sports</a>
        <a href="/categories/classic/">Classic</a>
        <a href="/categories/multiplayer/">2 Player</a>
        <a href="/categories/idle/">Idle</a>
      </nav>
      <form class="site-search" role="search" action="/games/" method="get">
        <label class="visually-hidden" for="siteSearch">Search games</label>
        <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <input id="siteSearch" name="q" type="search" placeholder="Search games…" autocomplete="off" spellcheck="false">
        <kbd class="search-kbd" aria-hidden="true">/</kbd>
      </form>
      <button class="nav-toggle" id="navToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mainNav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  <div class="mobile-nav" id="mobileNav" hidden>
    <a href="/games/">All Games</a>
    ${CATEGORIES.map((c) => `<a href="/categories/${c.slug}/">${c.name}</a>`).join('\n    ')}
    <a href="/about.html">About</a>
  </div>`;
}

export function footer() {
  const topGames = ['2048', 'snake', 'tetris', 'flappy-bird', 'pac-man', 'chess'];
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        ${brand()}
        <p>${SITE.description.split('. ')[0]}.</p>
        <p class="footer-small">Built as an open-source static site. No installs, no accounts, no tracking beyond anonymous analytics.</p>
      </div>
      <div class="footer-col">
        <h2>Popular Games</h2>
        ${topGames.map((slug) => `<a href="/games/${slug}/">${titleCase(slug)}</a>`).join('\n        ')}
      </div>
      <div class="footer-col">
        <h2>Categories</h2>
        ${CATEGORIES.map((c) => `<a href="/categories/${c.slug}/">${c.name}</a>`).join('\n        ')}
      </div>
      <div class="footer-col">
        <h2>Site</h2>
        <a href="/about.html">About</a>
        <a href="/privacy.html">Privacy</a>
        <a href="/terms.html">Terms</a>
        <a href="/install.html">Install app</a>
        <a href="/contact.html">Contact</a>
        <a href="/sitemap.xml">Sitemap</a>
        <a href="${SITE.github}" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} ${SITE.name}. Local fallback games are original; third-party games belong to their owners.</p>
      <p class="footer-small">Game names are used descriptively. All trademarks belong to their respective owners. This site is not affiliated with Google, Google Sites, or any game publisher.</p>
      <button class="back-top" id="backTop" type="button">Back to top ↑</button>
    </div>
  </footer>`;
}

export function titleCase(slug) {
  return slug
    .split('-')
    .map((part) => (part.length <= 2 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(' ');
}

export function layout({ title, description, canonical, bodyClass = '', bodyAttrs = '', jsonld = [], type = 'website', image, imageWidth, imageHeight, noindex, extra = '', content }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>${head({ title, description, canonical, jsonld, type, image, imageWidth, imageHeight, noindex, extra })}
</head>
<body class="${bodyClass}" ${bodyAttrs}>
  ${header()}
  <main id="main">
${content}
  </main>
  <div class="install-banner" id="installBanner" hidden>
    <img src="/assets/img/icon-192.png" alt="" width="42" height="42">
    <div class="install-banner-copy">
      <strong>Install Unblocked Games G+</strong>
      <span>Add it to your home screen or desktop for a standalone app window.</span>
    </div>
    <div class="install-banner-actions">
      <button class="btn btn-primary" type="button" data-install-app>Install</button>
      <a class="btn" href="/install.html">How to install</a>
    </div>
    <button class="install-banner-close" type="button" data-install-dismiss aria-label="Dismiss install banner">×</button>
  </div>
  <div class="domain-strip">
    <div class="container">
      <span>Official domain</span>
      <a href="${SITE.origin}/">${SITE.origin.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>
      <span class="domain-strip-note">Unblocked Games G+ (GamePlus Edition)</span>
    </div>
  </div>
  ${footer()}
  <script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}

export function breadcrumbs(items) {
  const list = items
    .map((item, index) => {
      const isLast = index === items.length - 1;
      const label = esc(item.name);
      return isLast
        ? `<li><span aria-current="page">${label}</span></li>`
        : `<li><a href="${item.url}">${label}</a></li>`;
    })
    .join('');
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${list}</ol></nav>`;
}

export function gameCard(game, { eager = false } = {}) {
  const cats = [categoryName(game.category), game.players].filter(Boolean).join(' · ');
  const badge = game.featured ? '<span class="card-badge">Popular</span>' : '';
  return `<a class="game-card" href="/games/${game.slug}/" data-game="${game.slug}" data-name="${esc(game.name.toLowerCase())}" data-order="${game.order}" data-category="${game.category}" data-tags="${esc([game.category, ...(game.tags || [])].join(' '))}" data-plays="${game.plays || 0}" style="--c1:${game.gradient[0]};--c2:${game.gradient[1]}">
    <span class="card-art">
      <span class="card-emoji" aria-hidden="true">${game.icon}</span>
      ${game.image && game.hasImage !== false ? `<img class="card-img" src="${game.image}" alt="${esc(`${game.name} — ${game.tagline}`)}" width="800" height="450" loading="${eager ? 'eager' : 'lazy'}" decoding="async" onerror="this.remove()">` : ''}
      ${badge}
      ${String(game.players || '').includes('2') ? '<span class="card-badge card-badge-2p">2P</span>' : ''}
      <span class="card-play" aria-hidden="true">▶ Play</span>
    </span>
    <span class="card-info">
      <span class="card-title">${esc(game.name)}</span>
      <span class="card-desc">${esc(game.blurb)}</span>
      <span class="card-meta-row">
        <span class="card-meta">${esc(cats)}</span>
        <span class="card-plays" data-play-count="${game.plays || 0}" title="Community popularity estimate"><img src="/assets/img/icons/gamepad.png" alt="" width="13" height="13" loading="lazy"><span class="plays-number">${formatCount(game.plays)}</span> plays</span>
      </span>
    </span>
  </a>`;
}

export function gameGrid(games, options = {}) {
  const { id = 'catalogGrid', ...cardOptions } = options;
  return `<div class="games-grid" id="${id}">${games.map((g) => gameCard(g, cardOptions)).join('\n')}</div>`;
}

export function categoryChips(active = 'all') {
  const items = [{ slug: 'all', name: 'All Games', icon: '🎮' }, ...CATEGORIES];
  return `<div class="chip-row" id="categoryChips" role="group" aria-label="Filter by category">
    ${items
      .map(
        (c) =>
          `<button class="chip${c.slug === active ? ' is-active' : ''}" type="button" data-filter="${c.slug}" aria-pressed="${c.slug === active}">${c.iconImage ? `<img class="chip-icon" src="${c.iconImage}" alt="" width="17" height="17" loading="lazy">` : c.icon ? `<span aria-hidden="true">${c.icon}</span> ` : ''}${esc(c.name)}</button>`
      )
      .join('\n    ')}
  </div>`;
}

export function faqHtml(faq, className = 'faq') {
  return `<div class="${className}">
    ${faq
      .map(
        (item) => `<details class="faq-item">
      <summary>${esc(item.q)}</summary>
      <div class="faq-answer"><p>${esc(item.a)}</p></div>
    </details>`
      )
      .join('\n    ')}
  </div>`;
}

export function controlsTable(controls) {
  return `<div class="controls-table" role="table" aria-label="Game controls">
    <div class="controls-row controls-head" role="row"><span role="columnheader">Input</span><span role="columnheader">Action</span></div>
    ${controls
      .map(
        (c) =>
          `<div class="controls-row" role="row"><span role="cell"><kbd>${esc(c.input)}</kbd></span><span role="cell">${esc(c.action)}</span></div>`
      )
      .join('\n    ')}
  </div>`;
}

export function proseSection(title, paragraphs, id) {
  const body = paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n      ');
  return `<section class="prose-section"${id ? ` id="${id}"` : ''}>
      <h2>${esc(title)}</h2>
      ${body}
    </section>`;
}

export const faqJsonLd = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

export const breadcrumbJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: abs(item.url),
  })),
});

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: abs('/'),
  logo: abs('/assets/img/favicon.svg'),
  sameAs: [SITE.github],
});
