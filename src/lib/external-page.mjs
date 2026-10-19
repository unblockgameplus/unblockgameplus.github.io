import { SITE, getGame, categoryName } from '../data/games.mjs';
import { EXTERNAL_COPY, CATEGORY_BLURB } from '../data/external-copy.mjs';
import {
  layout,
  esc,
  abs,
  breadcrumbs,
  gameGrid,
  faqHtml,
  controlsTable,
  faqJsonLd,
  breadcrumbJsonLd,
  formatCount,
} from './layout.mjs';

export function externalTitle(game) {
  const base = `${game.title} Unblocked`;
  if (base.length + 20 <= 65) return `${base} — Play Free Online`;
  if (base.length <= 65) return base;
  return `${game.title.slice(0, 50).trim()}… Unblocked`;
}

export function externalDescription(game) {
  const blurb = CATEGORY_BLURB[game.category] || CATEGORY_BLURB.arcade;
  const text = `Play ${game.title} unblocked for free. ${blurb} No download, works on Chromebooks and school Wi-Fi.`;
  return text.length <= 165 ? text : `${text.slice(0, 162)}...`;
}

const fillTitle = (text, game) => String(text).replace(/\{\{title\}\}/g, game.title);

export function externalPage(game, { allExternal = [] } = {}) {
  const copy = EXTERNAL_COPY[game.category] || EXTERNAL_COPY.arcade;
  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'All Games', url: '/games/' },
    { name: categoryName(game.category), url: `/categories/${game.category}/` },
    { name: game.title, url: `/games/${game.slug}/` },
  ];
  const fallback = game.fallback ? getGame(game.fallback) : null;
  const related = allExternal
    .filter((item) => item.slug !== game.slug && item.category === game.category)
    .slice(0, 8);
  const faq = copy.faq.map(([q, a]) => ({ q: fillTitle(q, game), a: fillTitle(a, game) }));
  const howTo = copy.howTo.map((step) => fillTitle(step, game));
  const tips = copy.tips.map((tip) => fillTitle(tip, game));
  const paragraphs = copy.paragraphs.map((p) => fillTitle(p, game));
  const safeUrl = esc(game.gameUrl);
  const description = externalDescription(game);

  const shell = `
    <section class="external-shell" id="externalShell">
      <div class="external-toolbar">
        <div class="external-titlebar">
          <span class="external-kicker">Third-party game</span>
          <strong>${esc(game.title)}</strong>
        </div>
        <div class="game-actions">
          <button class="game-btn btn-restart" type="button" data-external-reload>Reload</button>
          <button class="game-btn btn-fullscreen" type="button" data-external-fullscreen>Fullscreen</button>
          <a class="game-btn btn-share" href="${safeUrl}" target="_blank" rel="nofollow noopener">New tab</a>
        </div>
      </div>
      <div class="external-stage" id="externalStage">
        <iframe
          id="externalFrame"
          title="${esc(`${game.title} unblocked game`)}"
          data-src="${safeUrl}"
          allow="fullscreen; autoplay; encrypted-media; gamepad; clipboard-write"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="external-cover" id="externalCover">
          ${game.hasImage ? `<img src="${game.image}" alt="${esc(`${game.title} game thumbnail`)}" width="480" height="270" loading="eager">` : ''}
          <span class="external-badge">External HTML5 game</span>
          <h2>Play ${esc(game.title)}</h2>
          <p>${esc(CATEGORY_BLURB[game.category] || CATEGORY_BLURB.arcade)}</p>
          <button class="btn btn-primary" type="button" data-external-play>▶ Play game</button>
          <p class="external-note">The game loads from its own host after you press play. If it does not open, use the fallback below.</p>
        </div>
      </div>
      <div class="external-status">
        <span id="externalStatus">Click Play to load the game</span>
        <span class="hint-keys">If the frame stays blank, try Reload or the local fallback</span>
      </div>
      <div class="external-stuck" id="externalStuck" hidden>
        <div class="external-stuck-text">
          <strong>Game stuck on loading?</strong>
          <span>Some third-party hosts load slowly or get blocked by school networks.</span>
        </div>
        <div class="external-stuck-actions">
          <button class="game-btn btn-restart" type="button" data-external-reload>Reload</button>
          <a class="game-btn btn-share" href="${safeUrl}" target="_blank" rel="nofollow noopener">New tab</a>
          ${fallback ? `<a class="btn btn-primary" href="/games/${fallback.slug}/">Play ${esc(fallback.name)}</a>` : `<a class="btn" href="/categories/${game.category}/">More games</a>`}
          <button class="external-stuck-close" type="button" data-external-dismiss aria-label="Dismiss loading warning">×</button>
        </div>
      </div>
    </section>`;

  const fallbackBlock = fallback
    ? `<div class="external-fallback">
        <div>
          <strong>Game not loading?</strong>
          <p>Play the local ${esc(fallback.name)} version instead. It is built into this site and works even when third-party hosts are blocked.</p>
        </div>
        <a class="btn btn-primary" href="/games/${fallback.slug}/">Play local ${esc(fallback.name)} →</a>
      </div>`
    : `<div class="external-fallback">
        <div>
          <strong>Game not loading?</strong>
          <p>This title has no local fallback yet. Try another game in ${esc(categoryName(game.category))} or open the game in a new tab.</p>
        </div>
        <a class="btn" href="/categories/${game.category}/">More ${esc(categoryName(game.category))} →</a>
      </div>`;

  const content = `
  <div class="container game-page">
    ${breadcrumbs(crumbs)}
    <div class="game-layout">
      <div class="game-main">
        <header class="game-head">
          <h1><span class="head-icon">${game.hasImage ? `<img class="head-icon-img" src="${game.image}" alt="" width="54" height="54">` : '🎮'}</span> ${esc(game.h1)}</h1>
          <p class="lead">${esc(game.title)} is a free browser game from the Unblocked Games G+ catalogue. ${esc(CATEGORY_BLURB[game.category] || CATEGORY_BLURB.arcade)}</p>
          <div class="meta-row">
            <span class="pill"><a href="/categories/${game.category}/">${esc(categoryName(game.category))}</a></span>
            <span class="pill"><img class="pill-icon" src="/assets/img/icons/gamepad.png" alt="" width="13" height="13" loading="lazy"> ${formatCount(game.plays)}+ plays</span>
            <span class="pill">${esc(game.players)}</span>
            ${game.indexable ? '<span class="pill">Indexed game page</span>' : '<span class="pill">Catalogue page</span>'}
          </div>
        </header>
        ${shell}
        ${fallbackBlock}
      </div>
      <aside class="game-aside">
        <div class="aside-card">
          <h2>Game info</h2>
          <div class="aside-facts">
            <div class="aside-fact"><span>Category</span><strong><a href="/categories/${game.category}/">${esc(categoryName(game.category))}</a></strong></div>
            <div class="aside-fact"><span>Plays</span><strong>${formatCount(game.plays)}+</strong></div>
            <div class="aside-fact"><span>Players</span><strong>${esc(game.players)}</strong></div>
            <div class="aside-fact"><span>Host</span><strong>Third-party</strong></div>
            <div class="aside-fact"><span>Price</span><strong>Free</strong></div>
          </div>
        </div>
        ${fallback ? `<div class="aside-card"><h2>Local fallback</h2><a class="related-item" href="/games/${fallback.slug}/">${fallback.hasIcon ? `<img class="related-thumb" src="${fallback.iconImage}" alt="" width="40" height="40" loading="lazy">` : `<span class="related-thumb" style="--c1:${fallback.gradient[0]};--c2:${fallback.gradient[1]}">${fallback.icon}</span>`}<span class="related-text"><strong>${esc(fallback.name)}</strong><span>Built into this site</span></span></a></div>` : ''}
        <div class="aside-card">
          <h2>More ${esc(categoryName(game.category))}</h2>
          <div class="related-list">
            ${related.slice(0, 4).map((item) => `<a class="related-item" href="/games/${item.slug}/">${item.hasImage ? `<img class="related-thumb" src="${item.image}" alt="" width="40" height="40" loading="lazy">` : `<span class="related-thumb">${item.icon}</span>`}<span class="related-text"><strong>${esc(item.title)}</strong><span>${formatCount(item.plays)} plays</span></span></a>`).join('')}
          </div>
        </div>
      </aside>
    </div>

    <article class="game-article prose" aria-labelledby="guide-heading">
      <h2 id="guide-heading">${esc(game.h1)} — game guide</h2>
      ${paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      ${game.hasImage ? `<figure class="game-figure"><img src="${game.image}" alt="${esc(`${game.title} game thumbnail`)}" width="480" height="270" loading="lazy" decoding="async"><figcaption>${esc(game.title)} — ${esc(categoryName(game.category))} game</figcaption></figure>` : ''}

      <h2>How to play ${esc(game.title)}</h2>
      <ol class="howto-list">${howTo.map((step) => `<li>${esc(step)}</li>`).join('')}</ol>

      <h2>${esc(game.title)} controls</h2>
      ${controlsTable(game.controls)}
      <p>Click the game frame once before using the keyboard. If the frame does not respond, press Reload above the game or open it in a new tab.</p>

      <h2>Tips for ${esc(game.title)}</h2>
      <ul class="tip-list">${tips.map((tip) => `<li>${esc(tip)}</li>`).join('')}</ul>

      <h2>${esc(game.title)} FAQ</h2>
      ${faqHtml(faq)}

      <h2>About this game page</h2>
      <p>${esc(game.title)} is a third-party HTML5 game listed in the Unblocked Games G+ catalogue. This page is our own wrapper: it adds the guide, controls, related links and fallback without injecting any ad or tracking script. The game itself loads from its original host after you press Play. If that host is blocked, the local fallback is the fastest way to keep playing.</p>
      <p>We do not claim ownership of ${esc(game.title)} or its assets. Game names are used descriptively, and trademarks belong to their respective owners.</p>
    </article>

    <section class="more-games" aria-labelledby="more-heading">
      <h2 id="more-heading">More ${esc(categoryName(game.category))}</h2>
      ${gameGrid(related.slice(0, 8), { id: 'relatedGrid' })}
    </section>
  </div>`;

  const base = layout({
    title: externalTitle(game),
    description,
    canonical: `/games/${game.slug}/`,
    type: 'article',
    bodyClass: 'game-detail external-game',
    extra: '<link rel="stylesheet" href="/assets/css/games.css">',
    image: game.hasImage ? game.image : '/assets/img/og-cover.png',
    imageWidth: game.hasImage ? 480 : 1200,
    imageHeight: game.hasImage ? 270 : 630,
    noindex: !game.indexable,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: game.title,
        alternateName: `${game.title} Unblocked`,
        url: abs(`/games/${game.slug}/`),
        description,
        ...(game.hasImage ? { image: abs(game.image), thumbnailUrl: abs(game.image) } : {}),
        genre: categoryName(game.category),
        gamePlatform: ['Web browser', 'Chromebook', 'Mobile browser'],
        applicationCategory: 'GameApplication',
        operatingSystem: 'Any (HTML5 web browser)',
        playMode: String(game.players).includes('2') ? ['SinglePlayer', 'MultiPlayer'] : 'SinglePlayer',
        inLanguage: 'en',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
        publisher: { '@type': 'Organization', name: SITE.name, url: abs('/') },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to play ${game.title}`,
        step: howTo.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, text: step })),
      },
      breadcrumbJsonLd(crumbs),
      faqJsonLd(faq),
    ],
    content,
  });
  return base.replace('</main>', '</main>\n  <script src="/assets/js/external-page.js" defer></script>');
}
