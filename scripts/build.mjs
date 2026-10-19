#!/usr/bin/env node
/**
 * Static site generator.
 * Run `node scripts/build.mjs` after editing src/data/games.mjs.
 * The output is plain HTML committed to the repo, so GitHub Pages serves
 * fully rendered content to crawlers with no runtime build step.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE,
  GAMES,
  CATEGORIES,
  GAME_COUNT,
  featuredGames,
  gamesByCategory,
  relatedGames,
  categoryName,
} from '../src/data/games.mjs';
import {
  layout,
  head,
  esc,
  abs,
  breadcrumbs,
  gameCard,
  gameGrid,
  categoryChips,
  faqHtml,
  controlsTable,
  faqJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
  titleCase,
  formatCount,
} from '../src/lib/layout.mjs';
import { buildExternalGames } from '../src/lib/external.mjs';
import { EXTERNAL_COPY, CATEGORY_BLURB } from '../src/data/external-copy.mjs';
import { externalPage } from '../src/lib/external-page.mjs';
import { installPage } from '../src/lib/install-page.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOMAIN = SITE.origin.replace(/^https?:\/\//, '').replace(/\/$/, '');
const hasAsset = (path) => existsSync(join(ROOT, String(path || '').replace(/^\//, '')));

for (const game of GAMES) {
  game.hasImage = hasAsset(game.image);
  game.hasOgImage = hasAsset(game.ogImage);
  game.hasIcon = hasAsset(game.iconImage);
}

const EXTERNAL_GAMES = buildExternalGames();
const ALL_GAMES = [...EXTERNAL_GAMES, ...GAMES];
const CATALOG_COUNT = ALL_GAMES.length;
const TOTAL_PLAYS = ALL_GAMES.reduce((sum, game) => sum + (game.plays || 0), 0);
const TWO_PLAYER_COUNT = ALL_GAMES.filter((game) => String(game.players || '').includes('2')).length;
const ALL_GAMES_BY_PLAYS = [...ALL_GAMES].sort((a, b) => (b.plays || 0) - (a.plays || 0));
const LOCAL_BY_PLAYS = [...GAMES].sort((a, b) => (b.plays || 0) - (a.plays || 0));
const TOP_GAMES = EXTERNAL_GAMES.slice(0, 12);
const HOME_CATALOG = [...EXTERNAL_GAMES.filter((game) => game.indexable), ...LOCAL_BY_PLAYS].sort((a, b) => (b.plays || 0) - (a.plays || 0));
const externalInCategory = (category) => EXTERNAL_GAMES.filter((game) => game.category === category || (game.tags || []).includes(category));
const CATEGORY_STATS = Object.fromEntries(
  CATEGORIES.map((cat) => {
    const games = [...gamesByCategory(cat.slug), ...externalInCategory(cat.slug)];
    return [cat.slug, { count: games.length, plays: games.reduce((sum, game) => sum + (game.plays || 0), 0) }];
  })
);

async function write(rel, contents) {
  const path = join(ROOT, rel);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, contents, 'utf8');
  console.log(`  wrote ${rel}`);
}

const homeFaq = [
  {
    q: 'What is Unblocked Games G+ (GamePlus Edition)?',
    a: 'Unblocked Games G+ is the name students search for; GamePlus Edition is the same site under the shorter GamePlus brand. Both names lead to this catalogue of 786+ browser games, local fallback games and game guides.',
  },
  {
    q: 'Why do some games load from another website?',
    a: 'The larger third-party catalogue is embedded in a sandboxed frame. We do not add the original site’s ad or tracking scripts; the game itself loads from its own host when you press Play. If that host is blocked, use the local fallback game linked on the page.',
  },
  {
    q: 'Are these games really unblocked?',
    a: 'Unblocked Games G+ is a static website with no downloads, no installs and no accounts. It is designed to load over ordinary HTTPS, which is why it works on most school Chromebooks and office networks when other game portals are filtered.',
  },
  {
    q: 'Do I need to download or install anything?',
    a: 'No. Every game runs directly in the browser with HTML5 canvas, JavaScript and CSS. There are no plugins, extensions, emulators or ROM files to install.',
  },
  {
    q: 'Will the games work on a school Chromebook?',
    a: 'Yes. The site is built for low-power Chromebooks: no external fonts, no large image files and no WebGL requirement. Each game loads only the code it needs.',
  },
  {
    q: 'Is my progress saved?',
    a: 'High scores, boards and clicker progress are saved in your browser using localStorage. Nothing is uploaded to a server and no account is required.',
  },
  {
    q: 'Are the games safe to play at school?',
    a: 'The local fallback games are original self-contained HTML5 code. The larger catalogue embeds third-party games in an isolated iframe, but this site does not add the original wrapper’s ad or tracking scripts. The only scripts we add are page analytics.',
  },
  {
    q: 'How often are new games added?',
    a: 'New games are added as they are built and tested. The full catalogue is always available on the All Games page, and the sitemap is updated with every release.',
  },
  {
    q: 'Can I play on a phone or tablet?',
    a: 'Yes. Every game has a responsive layout and touch controls. Games that need direction input show an on-screen D-pad or swipe gestures.',
  },
  {
    q: 'How are the play counts calculated?',
    a: 'The number next to each game is a community popularity estimate based on page activity across the site. It is a quick signal of what people are playing, not a live concurrent-player counter.',
  },
  {
    q: 'Can I play two-player games on one device?',
    a: 'Yes. Pong, Tic-Tac-Toe, Connect Four and Air Hockey all have local two-player modes for one keyboard or touchscreen. No second account or lobby is needed.',
  },
  {
    q: 'Is Unblocked Games G+ free?',
    a: 'Yes, completely free. There is no paywall, no subscription and no login. The project is open source and the game code is original.',
  },
];

const homeLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    alternateName: ['Unblocked Games G Plus', 'Unblocked Games G+', 'Unblocked Games Plus', 'GamePlus Edition', 'UGG+'],
    url: abs('/'),
    description: SITE.description,
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${abs('/games/')}?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  },
  organizationJsonLd(),
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Unblocked games catalogue',
    numberOfItems: 20,
    itemListElement: ALL_GAMES_BY_PLAYS.slice(0, 20).map((game, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: game.name,
      url: abs(`/games/${game.slug}/`),
    })),
  },
  faqJsonLd(homeFaq),
];

const homeContent = `
  <div class="container">
    <section class="hero">
      <span class="hero-eyebrow"><span class="pulse" aria-hidden="true"></span> ${formatCount(CATALOG_COUNT)}+ games · no downloads · 100% free</span>
      <h1>Unblocked Games <span class="grad">G+</span> <span class="brand-edition">GamePlus Edition</span></h1>
      <p class="hero-lead">The fast, clean way to play at school or work. Browse ${formatCount(CATALOG_COUNT)}+ browser games — 2048, Snake, Tetris, Connect Four, racing, shooting, platformers and local 2-player games — with no installs, no accounts and no ad scripts on this site.</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#all-games">▶ Browse all games</a>
        <a class="btn btn-ghost" href="/games/2048/">Play 2048</a>
        <a class="btn btn-ghost" href="/games/neon-slope/">Play Neon Slope</a>
      </div>
      <ul class="hero-stats">
        <li><strong>${formatCount(TOTAL_PLAYS)}+</strong><span>plays logged</span></li>
        <li><strong>${formatCount(CATALOG_COUNT)}+</strong><span>playable games</span></li>
        <li><strong>${TWO_PLAYER_COUNT}</strong><span>2-player / multiplayer</span></li>
        <li><strong>${GAMES.length}</strong><span>local fallback games</span></li>
      </ul>
    </section>

    <section class="section" id="featuredSection" aria-labelledby="featured-heading">
      <div class="section-head">
        <div>
          <h2 id="featured-heading">Most-played unblocked games</h2>
          <p>Top third-party games by community plays, with local fallbacks when a host is blocked.</p>
        </div>
        <a class="section-link" href="/games/">View all ${formatCount(CATALOG_COUNT)} games →</a>
      </div>
      ${gameGrid(TOP_GAMES, { id: 'featuredGrid' })}
    </section>

    <section class="recent-section" id="recentSection" hidden aria-labelledby="recent-heading">
      <div class="recent-head">
        <h2 id="recent-heading">Continue playing</h2>
        <button class="clear-recent" id="clearRecent" type="button">Clear history</button>
      </div>
      <div class="games-grid compact" id="recentGrid"></div>
    </section>

    <section class="section" id="all-games" aria-labelledby="all-games-heading">
      <div class="section-head">
        <div>
          <h2 id="all-games-heading">Popular games right now</h2>
          <p>Filter by category or search the top ${HOME_CATALOG.length} games. The full ${formatCount(CATALOG_COUNT)}-game catalogue is on the All Games page.</p>
        </div>
      </div>
      ${categoryChips('all')}
      <div class="list-toolbar">
        <span class="result-count" id="resultCount">${HOME_CATALOG.length} popular games</span>
        <label class="sort-wrap">Sort
          <select id="sortSelect">
            <option value="plays" selected>Most played</option>
            <option value="featured">Featured</option>
            <option value="az">A – Z</option>
            <option value="za">Z – A</option>
          </select>
        </label>
      </div>
      ${gameGrid(HOME_CATALOG)}
      <div class="empty-state" id="emptyState" hidden><strong>No games matched that search.</strong>Try a shorter keyword, or clear the filters.</div>
    </section>

    <section class="section" id="fallbackSection" aria-labelledby="fallback-heading">
      <div class="section-head">
        <div>
          <h2 id="fallback-heading">Local fallback games</h2>
          <p>Built into this site. If a third-party game host is blocked, these still load.</p>
        </div>
        <a class="section-link" href="/games/">Browse the full catalogue →</a>
      </div>
      ${gameGrid(LOCAL_BY_PLAYS, { id: 'fallbackGrid' })}
    </section>

    <section class="section" id="categoriesSection" aria-labelledby="categories-heading">
      <div class="section-head">
        <div>
          <h2 id="categories-heading">Browse by category</h2>
          <p>Every game is sorted into a category so you can find the right kind of break.</p>
        </div>
      </div>
      <div class="category-grid">
        ${CATEGORIES.map(
          (cat) => {
            const stats = CATEGORY_STATS[cat.slug];
            return `<a class="category-tile" href="/categories/${cat.slug}/">
            <span class="cat-icon"><img class="cat-icon-img" src="${cat.iconImage}" alt="" width="26" height="26" loading="lazy"></span>
            <strong>${esc(cat.name)}</strong>
            <span>${esc(cat.blurb)}</span>
            <span class="cat-stats">${stats.count} games · ${formatCount(stats.plays)} plays</span>
          </a>`;
          }
        ).join('\n        ')}
      </div>
    </section>

    <section class="seo-block" aria-labelledby="about-heading">
      <h2 id="about-heading">What is Unblocked Games G+?</h2>
      <div class="prose">
        <p><strong>Unblocked Games G+</strong> is a free browser game collection built for the moments when you have five minutes and a Chromebook. The site combines two things: a large catalogue of third-party HTML5 games loaded in an isolated iframe, and a set of original local fallback games that are served from this domain. The wrapper is static and fast, and the local games keep working even when an external host is filtered.</p>
        <p>The catalogue focuses on the games people actually search for: <a href="/games/2048/">2048</a>, <a href="/games/snake/">Snake</a>, <a href="/games/tetris/">Tetris</a>, <a href="/games/flappy-bird/">Flappy Bird</a>, <a href="/games/pac-man/">Pac-Man</a>, <a href="/games/chess/">Chess</a>, <a href="/games/minesweeper/">Minesweeper</a>, <a href="/games/neon-slope/">Neon Slope</a> and a full <a href="/games/cookie-clicker/">Cookie Clicker</a>. Each game has its own page with controls, strategy tips and a saved high score.</p>
      </div>
      <div class="seo-columns" style="margin-top:1.2rem">
        <div class="seo-card">
          <h3>No installs, no plugins</h3>
          <p>Every game is plain HTML5 canvas and JavaScript. There is no Flash, no emulator, no ROM download and no browser extension to install.</p>
        </div>
        <div class="seo-card">
          <h3>Built for school Wi-Fi</h3>
          <p>The site is a static GitHub Pages deployment. There are no game servers to time out and no third-party embeds that school filters can block.</p>
        </div>
        <div class="seo-card">
          <h3>Local high scores</h3>
          <p>Scores and saved games live in your browser's localStorage. You get persistence without an account or a cloud sync prompt.</p>
        </div>
        <div class="seo-card">
          <h3>Touch and keyboard</h3>
          <p>Arrow keys, WASD, mouse, swipe and on-screen D-pads are supported. The layout adapts to phones, tablets and Chromebooks.</p>
        </div>
        <div class="seo-card">
          <h3>No pop-ups or redirects</h3>
          <p>Clicking a game opens a page on this site. There are no fake download buttons, no new-tab redirects and no interstitial countdowns.</p>
        </div>
        <div class="seo-card">
          <h3>Original game code</h3>
          <p>The local fallback games are original implementations. The external catalogue is hosted by third parties and credited on each game page. The chess rules engine uses the open-source chess.js library under its BSD-2-Clause licence.</p>
        </div>
      </div>
    </section>

    <section class="seo-block" aria-labelledby="school-heading">
      <h2 id="school-heading">How to play unblocked games on a school Chromebook</h2>
      <div class="prose">
        <p>School networks usually block game portals at the domain level, not the browser level. That is why a lightweight static site has a better chance of loading than a portal that pulls games from a dozen external hosts. Here is the short version of getting a game running without fighting the network:</p>
        <ul>
          <li><strong>Open the game page directly.</strong> Every title has a stable URL under <code>/games/</code>, so you can bookmark it instead of searching again.</li>
          <li><strong>Let the page finish loading once.</strong> Assets are small and same-origin, so the first load is the slowest. After that the browser cache does the work.</li>
          <li><strong>Use fullscreen.</strong> The fullscreen button (or the F key) hides browser chrome and gives the canvas more room, which also reduces accidental scrolling.</li>
          <li><strong>Keep sound off in class.</strong> Press M or use the sound button. The game remembers your preference on that device.</li>
          <li><strong>Your score is local.</strong> Clearing browser data will clear saved scores. Nothing is tied to a school account.</li>
        </ul>
        <p>If a game does not respond to the keyboard, click the game area once. Browsers only send key events to the focused element, and clicking the stage makes it the active target.</p>
      </div>
    </section>

    <section class="seo-block" aria-labelledby="faq-heading">
      <h2 id="faq-heading">Unblocked Games G+ FAQ</h2>
      ${faqHtml(homeFaq)}
    </section>
  </div>`;

const homePage = layout({
  title: `Unblocked Games G+ (GamePlus Edition) | ${formatCount(CATALOG_COUNT)}+ Free Games`,
  description: SITE.description,
  canonical: '/',
  jsonld: homeLd,
  bodyClass: 'home',
  content: homeContent,
});

const gamesIndexContent = `
  <div class="container">
    ${breadcrumbs([{ name: 'Home', url: '/' }, { name: 'All Games', url: '/games/' }])}
    <header class="page-head">
      <h1>All ${formatCount(CATALOG_COUNT)}+ Unblocked Games</h1>
      <p class="lead">The complete Unblocked Games G+ (GamePlus Edition) catalogue: ${formatCount(CATALOG_COUNT)} browser games across arcade, puzzle, action, racing, shooting, platform, simulation and 2-player categories. Use the search box or filters to narrow the list.</p>
      <div class="meta-row">
        <span class="pill">${formatCount(CATALOG_COUNT)} games</span>
        <span class="pill">Chromebook ready</span>
        <span class="pill">No installs</span>
        <span class="pill">Free forever</span>
      </div>
    </header>

    <section class="section" aria-labelledby="catalogue-heading">
      <h2 id="catalogue-heading" class="visually-hidden">Game catalogue</h2>
      ${categoryChips('all')}
      <div class="list-toolbar">
        <span class="result-count" id="resultCount">${formatCount(CATALOG_COUNT)} games</span>
        <label class="sort-wrap">Sort
          <select id="sortSelect">
            <option value="plays" selected>Most played</option>
            <option value="featured">Featured</option>
            <option value="az">A – Z</option>
            <option value="za">Z – A</option>
          </select>
        </label>
      </div>
      ${gameGrid(ALL_GAMES_BY_PLAYS)}
      <div class="empty-state" id="emptyState" hidden><strong>No games matched that search.</strong>Try a shorter keyword, or clear the filters.</div>
    </section>

    <section class="seo-block">
      <h2>Every game, one page</h2>
      <div class="prose">
        <p>Each game in this list opens on its own page with a playable build, a controls table, a short strategy guide and an FAQ. The pages are deliberately small: a game page loads one shared stylesheet, one shell script and one game module, with no framework and no external font.</p>
        <p>If you are not sure where to start, the <a href="/categories/arcade/">arcade games</a> are the fastest to pick up, the <a href="/categories/puzzle/">puzzle games</a> are the best for a quiet break, and <a href="/games/neon-slope/">Neon Slope</a> is the one to open when you want a genuine reflex challenge.</p>
      </div>
    </section>
  </div>`;

const gamesIndexPage = layout({
  title: `All Unblocked Games — ${formatCount(CATALOG_COUNT)}+ Free Games | G+`,
  description: `Browse ${formatCount(CATALOG_COUNT)}+ free unblocked games on Unblocked Games G+ (GamePlus Edition). Filter arcade, puzzle, action, racing, shooting, platform, simulation and 2-player games.`,
  canonical: '/games/',
  bodyClass: 'games-index',
  jsonld: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'All Unblocked Games',
      url: abs('/games/'),
      description: `The complete catalogue of ${GAME_COUNT} free HTML5 games on Unblocked Games G+.`,
      isPartOf: { '@type': 'WebSite', name: SITE.name, url: abs('/') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'All games',
      numberOfItems: 100,
      itemListElement: ALL_GAMES_BY_PLAYS.slice(0, 100).map((game, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: game.name,
        url: abs(`/games/${game.slug}/`),
      })),
    },
    breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'All Games', url: '/games/' }]),
  ],
  content: gamesIndexContent,
});

function gameLd(game) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    alternateName: game.h1,
    url: abs(`/games/${game.slug}/`),
    description: game.metaDescription,
    ...(game.hasImage ? { image: abs(game.image), thumbnailUrl: abs(game.image) } : {}),
    genre: game.genre,
    gamePlatform: ['Web browser', 'Chromebook', 'Mobile browser'],
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any (HTML5 web browser)',
    playMode: game.players.includes('2') ? ['SinglePlayer', 'MultiPlayer'] : 'SinglePlayer',
    inLanguage: 'en',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    publisher: { '@type': 'Organization', name: SITE.name, url: abs('/') },
  };
}

function gameHowTo(game) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to play ${game.name}`,
    description: `Step-by-step controls and rules for ${game.name} on Unblocked Games G+.`,
    totalTime: 'PT1M',
    step: game.howTo.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
  };
}

function gamePage(game) {
  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'All Games', url: '/games/' },
    { name: game.name, url: `/games/${game.slug}/` },
  ];
  const related = relatedGames(game, 4);
  const shell = `
    <section class="game-shell" id="gameShell" aria-label="${esc(game.name)} game">
      <div class="game-toolbar">
        <div class="hud" aria-live="polite">
          <div class="hud-item"><span class="hud-label" id="scoreLabel">${game.slug === 'chess' || game.slug === 'tic-tac-toe' ? 'Wins' : game.slug === 'minesweeper' || game.slug === 'sudoku' ? 'Time' : game.slug === 'memory-match' ? 'Moves' : game.slug === 'cookie-clicker' ? 'Cookies' : 'Score'}</span><span class="hud-value" id="scoreValue">0</span></div>
          <div class="hud-item"><span class="hud-label" id="bestLabel">Best</span><span class="hud-value" id="bestValue">—</span></div>
        </div>
        <div class="game-actions">
          <button class="game-btn btn-restart" id="btnRestart" type="button">Restart</button>
          <button class="game-btn btn-pause" id="btnPause" type="button" aria-pressed="false" disabled>Pause</button>
          <button class="game-btn btn-sound" id="btnSound" type="button" aria-pressed="true">Sound on</button>
          <button class="game-btn btn-fullscreen" id="btnFullscreen" type="button">Fullscreen</button>
          <button class="game-btn btn-share" id="shareGame" type="button">Share</button>
        </div>
      </div>
      <div class="game-stage" id="gameStage" tabindex="0" aria-label="Play ${esc(game.name)}">
        <div class="game-area" id="gameArea"><canvas id="gameCanvas"></canvas></div>
        <div class="touch-controls" id="touchControls"></div>
        <div class="game-overlay is-visible" id="gameOverlay" data-tone="start">
          <div class="overlay-card">
            <span class="overlay-kicker">Free HTML5 game</span>
            <h2 id="overlayTitle">${esc(game.name)}</h2>
            <p id="overlayText">Click play, then use the controls below. Your best score is saved on this device.</p>
            <button class="btn btn-primary" id="overlayBtn" type="button">Play now</button>
            <p class="overlay-hint" id="overlayHint">P pause · R restart · F fullscreen · M sound</p>
          </div>
        </div>
      </div>
      <div class="game-status">
        <span id="statusText">Ready to play</span>
        <span class="hint-keys"><kbd>P</kbd> pause <kbd>R</kbd> restart <kbd>F</kbd> fullscreen</span>
      </div>
    </section>
    <noscript><p class="panel" style="margin-top:1rem">This game needs JavaScript to run. Please enable JavaScript in your browser and reload the page.</p></noscript>`;

  const aside = `
    <aside class="game-aside">
      <div class="aside-card">
        <h2>Game info</h2>
        <div class="aside-facts">
          <div class="aside-fact"><span>Category</span><strong><a href="/categories/${game.category}/">${esc(categoryName(game.category))}</a></strong></div>
          <div class="aside-fact"><span>Plays</span><strong>${formatCount(game.plays)}+</strong></div>
          <div class="aside-fact"><span>Players</span><strong>${esc(game.players)}</strong></div>
          <div class="aside-fact"><span>Difficulty</span><strong>${esc(game.difficulty)}</strong></div>
          <div class="aside-fact"><span>Platform</span><strong>HTML5 / browser</strong></div>
          <div class="aside-fact"><span>Price</span><strong>Free</strong></div>
        </div>
      </div>
      <div class="aside-card">
        <h2>Related games</h2>
        <div class="related-list">
          ${related
            .map(
              (item) => `<a class="related-item" href="/games/${item.slug}/">
                ${item.hasIcon ? `<img class="related-thumb" src="${item.iconImage}" alt="" width="40" height="40" loading="lazy">` : `<span class="related-thumb" style="--c1:${item.gradient[0]};--c2:${item.gradient[1]}" aria-hidden="true">${item.icon}</span>`}
                <span class="related-text"><strong>${esc(item.name)}</strong><span>${esc(categoryName(item.category))} · ${formatCount(item.plays)} plays</span></span>
              </a>`
            )
            .join('\n          ')}
        </div>
      </div>
      <div class="aside-card">
        <h2>Keep exploring</h2>
        <a class="btn" href="/games/">Browse all ${GAME_COUNT} games</a>
      </div>
    </aside>`;

  const content = `
  <div class="container game-page">
    ${breadcrumbs(crumbs)}
    <div class="game-layout">
      <div class="game-main">
        <header class="game-head">
          <h1><span class="head-icon">${game.hasIcon ? `<img class="head-icon-img" src="${game.iconImage}" alt="" width="54" height="54">` : game.icon}</span> ${esc(game.h1)}</h1>
          <p class="lead">${esc(game.tagline)} ${esc(game.blurb)}</p>
          <div class="meta-row">
            <span class="pill">${esc(categoryName(game.category))}</span>
            <span class="pill" title="Community popularity estimate"><img class="pill-icon" src="/assets/img/icons/gamepad.png" alt="" width="13" height="13" loading="lazy"> ${formatCount(game.plays)}+ plays</span>
            <span class="pill">${esc(game.players)}</span>
            <span class="pill">${esc(game.difficulty)}</span>
            <span class="pill">No download</span>
          </div>
        </header>
        ${shell}
      </div>
      ${aside}
    </div>

    <article class="game-article prose" aria-labelledby="guide-heading">
      <h2 id="guide-heading">${esc(game.h1)} — game guide</h2>
      ${game.intro.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('\n      ')}

      ${game.hasImage ? `<figure class="game-figure">
        <img src="${game.image}" alt="${esc(`${game.name} game preview — ${game.tagline}`)}" width="800" height="450" loading="lazy" decoding="async">
        <figcaption>${esc(game.name)} — ${esc(game.tagline)}</figcaption>
      </figure>` : ''}

      <h2>How to play ${esc(game.name)}</h2>
      <ol class="howto-list">
        ${game.howTo.map((step) => `<li>${esc(step)}</li>`).join('\n        ')}
      </ol>

      <h2>${esc(game.name)} controls</h2>
      ${controlsTable(game.controls)}
      <p>Keyboard shortcuts work when the game area has focus — click the game once if the keys do not respond. The <kbd>P</kbd> key pauses, <kbd>R</kbd> restarts and <kbd>F</kbd> toggles fullscreen in every game.</p>

      <h2>Tips and strategy</h2>
      <ul class="tip-list">
        ${game.tips.map((tip) => `<li>${esc(tip)}</li>`).join('\n        ')}
      </ul>

      <h2>${esc(game.name)} FAQ</h2>
      ${faqHtml(game.faq)}

      <h2>Play ${esc(game.name)} unblocked</h2>
      <p>${esc(game.name)} runs entirely in your browser on this page. There is no download, no account and no third-party game frame, so it loads quickly on a Chromebook and keeps your high score in local storage between visits. If you enjoy it, the related games in the sidebar are the closest matches in the catalogue.</p>
    </article>

    <section class="more-games" aria-labelledby="more-heading">
      <h2 id="more-heading">More unblocked games like ${esc(game.name)}</h2>
      ${gameGrid(related, { id: 'relatedGrid' })}
    </section>
  </div>`;

  return layout({
    title: game.title,
    description: game.metaDescription,
    canonical: `/games/${game.slug}/`,
    type: 'article',
    bodyClass: 'game-detail',
    bodyAttrs: `data-game="${game.slug}" data-game-name="${esc(game.name)}" data-game-tagline="${esc(game.tagline)}" data-game-controls="${esc(game.controls.slice(0, 3).map((c) => c.input).join(' · '))}"`,
    image: game.hasOgImage ? game.ogImage : '/assets/img/og-cover.png',
    jsonld: [gameLd(game), gameHowTo(game), breadcrumbJsonLd(crumbs), faqJsonLd(game.faq)],
    extra: '<link rel="stylesheet" href="/assets/css/games.css">',
    content,
  }).replace(
    '</main>',
    `</main>
  <script type="module" src="/assets/js/game-page.js"></script>`
  );
}

const CATEGORY_FAQ = {
  puzzle: [
    {
      q: 'What counts as a puzzle game?',
      a: 'Games where the challenge is logic, planning or memory rather than reflexes: 2048, Tetris, Sudoku, Minesweeper, Memory Match and Chess.',
    },
    {
      q: 'Which puzzle game is best for a short break?',
      a: '2048 and Memory Match can be played in a few minutes. Sudoku and Minesweeper are better when you have a longer stretch of time.',
    },
    {
      q: 'Do puzzle games save progress?',
      a: 'Yes. 2048 saves the current board, Minesweeper saves best times per difficulty, Sudoku saves the current puzzle and Memory Match saves best move counts.',
    },
  ],
  arcade: [
    {
      q: 'What is an arcade game?',
      a: 'A game built around short, repeatable runs and a score counter: Snake, Pac-Man, Breakout, Flappy Bird, Sky Hopper and Stack Master all fit that description.',
    },
    {
      q: 'Why do arcade games restart so quickly?',
      a: 'The restart loop is the point. Every game here restarts with a single button press or the R key, so a failed run costs seconds rather than a loading screen.',
    },
    {
      q: 'Are the arcade games playable on touch screens?',
      a: 'Yes. Swipe gestures and on-screen directional pads are provided where a game needs them.',
    },
  ],
  action: [
    {
      q: 'Which action games are available?',
      a: 'Space Invaders, a wave-based shooter with destructible shields, and Neon Slope, a fast pseudo-3D endless runner with jumpable barriers.',
    },
    {
      q: 'Are these action games hard?',
      a: 'They start gently and ramp up. Space Invaders speeds up as the formation thins; Neon Slope increases speed continuously with distance.',
    },
    {
      q: 'Do the action games need WebGL?',
      a: 'No. Both use the 2D canvas API, which means they run on older Chromebooks and integrated graphics without a WebGL context.',
    },
  ],
  sports: [
    {
      q: 'Which sports games can I play?',
      a: 'Pong and Air Hockey support single-player against the computer or two players on one keyboard. Penalty Shootout is a five-round football shootout with a diving keeper.',
    },
    {
      q: 'Can two people play on the same device?',
      a: 'Pong has a two-player mode: W/S controls the left paddle and the arrow keys control the right. Penalty Shootout is single-player against the computer.',
    },
    {
      q: 'Are the sports games realistic simulations?',
      a: 'No. They are compact arcade versions of the sport, designed for a two-minute break rather than a full season mode.',
    },
  ],
  classic: [
    {
      q: 'What makes a game a classic?',
      a: 'A rule set simple enough to explain in one sentence and deep enough to keep playing: Snake, Tetris, Pac-Man, Pong, Space Invaders, Chess, Connect Four and Tic-Tac-Toe.',
    },
    {
      q: 'Are these the original versions?',
      a: 'They are original HTML5 recreations, not emulated ROMs. The rules and feel are faithful; the code and artwork are new.',
    },
    {
      q: 'Do the classic games work offline?',
      a: 'The pages are static and cached by the browser. Once loaded, the game code itself needs no network connection.',
    },
  ],
  idle: [
    {
      q: 'What is an idle game?',
      a: 'A game that keeps producing resources while you are not actively clicking. Cookie Clicker is the genre-defining example: buy producers, close the tab, come back to more cookies.',
    },
    {
      q: 'Does Cookie Clicker progress while the tab is closed?',
      a: 'Yes, at a reduced offline rate. The game records the save time and credits up to four hours of offline production when you return.',
    },
    {
      q: 'Is Cookie Clicker free?',
      a: 'Yes. There are no microtransactions, no premium currency and no account. Your bakery is saved in local storage on your device.',
    },
  ],
  racing: [
    {
      q: 'What kind of racing games are in this category?',
      a: 'Car races, moto trials, drift challenges and 3D driving games. Most are arcade-style and designed for short runs rather than long simulations.',
    },
    {
      q: 'Do racing games work with a keyboard?',
      a: 'Most use the arrow keys or WASD. Click the game frame first so it receives keyboard focus, then accelerate, brake and steer.',
    },
    {
      q: 'What if an external racing game does not load?',
      a: 'Third-party game hosts can be filtered on school networks. Use the local Neon Slope fallback or another game in the category.',
    },
  ],
  shooting: [
    {
      q: 'What shooting games are available?',
      a: 'Space shooters, sniper challenges, wave defense and arcade gun games from the third-party catalogue.',
    },
    {
      q: 'Are the shooting games violent?',
      a: 'They are browser arcade games with abstract or stylised targets. If you need a non-violent alternative, try the puzzle or platform categories.',
    },
    {
      q: 'Why does the game need a click before it responds?',
      a: 'Browsers only send keyboard input to a focused frame. Click the game once to focus it, then use the controls shown in-game.',
    },
  ],
  platform: [
    {
      q: 'What is a platform game?',
      a: 'A game built around jumping between platforms, avoiding hazards and finding a route to the end of a level. Precision and timing matter more than speed.',
    },
    {
      q: 'Are these games hard?',
      a: 'Difficulty varies. Start with a short level, learn the first few jumps, and use the restart button freely.',
    },
    {
      q: 'What is the local platform fallback?',
      a: 'Sky Hopper is our own endless vertical platformer and runs entirely on this site if an external host is blocked.',
    },
  ],
  simulation: [
    {
      q: 'What simulation games can I play?',
      a: 'Life simulators, tycoons, shop management, idle builders and strategy-adjacent simulation games from the third-party catalogue.',
    },
    {
      q: 'Do simulation games save progress?',
      a: 'That depends on the game. Some save locally, some use a server, and some reset when the tab closes. Our local Cookie Clicker fallback saves progress in your browser.',
    },
    {
      q: 'Are these games suitable for a short break?',
      a: 'Yes. Most can be played for a few minutes, and idle games continue on their own while you do something else.',
    },
  ],
  multiplayer: [
    {
      q: 'Which games can two people play on one device?',
      a: 'Pong, Tic-Tac-Toe, Connect Four and Air Hockey all have a local two-player mode. You share one keyboard or touchscreen, with no lobby or second account.',
    },
    {
      q: 'Can we play two-player games on a phone?',
      a: 'Yes. Air Hockey supports dragging on each half of the table, and Connect Four and Tic-Tac-Toe work with taps. Pong is best with a keyboard but works with touch on larger screens.',
    },
    {
      q: 'Do the two-player games work against a computer too?',
      a: 'Yes. Connect Four, Pong and Air Hockey include computer opponents, so you can play solo and then switch to two-player mode when a friend joins.',
    },
  ],
};

function categoryPage(cat) {
  const games = [...gamesByCategory(cat.slug), ...externalInCategory(cat.slug)].sort((a, b) => (b.plays || 0) - (a.plays || 0));
  const totalPlays = games.reduce((sum, game) => sum + (game.plays || 0), 0);
  const faq = CATEGORY_FAQ[cat.slug] || [];
  const crumbs = [
    { name: 'Home', url: '/' },
    { name: cat.name, url: `/categories/${cat.slug}/` },
  ];
  const content = `
  <div class="container">
    ${breadcrumbs(crumbs)}
    <header class="page-head">
      <h1><span class="head-icon"><img class="head-icon-img" src="${cat.iconImage}" alt="" width="52" height="52" loading="lazy"></span> ${esc(cat.h1)}</h1>
      <p class="lead">${esc(cat.blurb)} ${games.length} hand-built HTML5 games, free to play in the browser with no downloads or accounts.</p>
      <div class="meta-row">
        <span class="pill">${games.length} games</span>
        <span class="pill"><img class="pill-icon" src="/assets/img/icons/gamepad.png" alt="" width="13" height="13" loading="lazy"> ${formatCount(totalPlays)}+ plays</span>
        <span class="pill">Chromebook ready</span>
        <span class="pill">Touch controls</span>
      </div>
    </header>

    <section class="section" aria-labelledby="category-games-heading">
      <div class="section-head">
        <div><h2 id="category-games-heading">${esc(cat.name)}</h2><p>Sorted by popularity.</p></div>
        <a class="section-link" href="/games/">All categories →</a>
      </div>
      ${gameGrid(games, { id: 'categoryGrid' })}
    </section>

    <section class="seo-block">
      <h2>About unblocked ${esc(cat.name.toLowerCase())}</h2>
      <div class="prose">
        ${cat.intro.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
        <p>Every game in this category has its own page with a controls table, a short guide and a stored high score. You can move between titles without leaving the site, and the <a href="/games/">full catalogue</a> is one click away.</p>
      </div>
    </section>

    <section class="seo-block">
      <h2>Other categories</h2>
      <div class="category-grid">
        ${CATEGORIES.filter((c) => c.slug !== cat.slug)
          .map(
            (other) => `<a class="category-tile" href="/categories/${other.slug}/">
              <span class="cat-icon" aria-hidden="true">${other.icon}</span>
              <strong>${esc(other.name)}</strong>
              <span>${esc(other.blurb)}</span>
            </a>`
          )
          .join('\n        ')}
      </div>
    </section>

    ${faq.length ? `<section class="seo-block"><h2>${esc(cat.name)} FAQ</h2>${faqHtml(faq)}</section>` : ''}
  </div>`;

  return layout({
    title: cat.title,
    description: cat.description,
    canonical: `/categories/${cat.slug}/`,
    bodyClass: `category category-${cat.slug}`,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: cat.h1,
        url: abs(`/categories/${cat.slug}/`),
        description: cat.description,
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: abs('/') },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: games.length,
          itemListElement: games.map((game, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: game.name,
            url: abs(`/games/${game.slug}/`),
          })),
        },
      },
      breadcrumbJsonLd(crumbs),
      ...(faq.length ? [faqJsonLd(faq)] : []),
    ],
    content,
  });
}

const aboutContent = `
  <div class="container">
    ${breadcrumbs([{ name: 'Home', url: '/' }, { name: 'About', url: '/about.html' }])}
    <header class="page-head"><h1>About Unblocked Games G+ (GamePlus Edition)</h1><p class="lead">A fast browser game catalogue with local fallback games, built for school Chromebooks and short breaks.</p></header>
    <article class="prose panel">
      <h2>Why this site exists</h2>
      <p>Most "unblocked games" sites are directories that embed games from other domains. That works until one of those domains is filtered, the embed goes down, or a redirect chain turns a two-minute break into a browser history lesson. Unblocked Games G+ takes a hybrid approach: a large third-party catalogue is loaded only when you press Play, and a set of original local fallback games is served from this domain so there is always something that works.</p>
      <h2>How the games are made</h2>
      <p>The local fallback games are original HTML5 implementations. They use the 2D canvas API, DOM elements, CSS and vanilla JavaScript, with no game engine and no external runtime. The chess move generator and legality rules use the open-source <a href="https://github.com/jhlywa/chess.js" rel="noopener">chess.js</a> library under its BSD-2-Clause licence. The external catalogue is owned by its respective hosts and is credited on each game page.</p>
      <h2>What is stored on your device</h2>
      <p>High scores, saved boards, cookie-clicker progress and the sound preference are stored in your browser's localStorage. No account is created, and none of that data is sent to a server. The site uses Google Analytics and Microsoft Clarity for aggregate page analytics; those scripts are loaded from their own domains and are described in the <a href="/privacy.html">privacy page</a>.</p>
      <h2>Adding or requesting games</h2>
      <p>The project is open source at <a href="${SITE.github}" rel="noopener">github.com/unblockgameplus/unblockgameplus.github.io</a>. Bug reports, game requests and pull requests are welcome there. If you are a developer, each game lives in <code>assets/js/games/</code> and the page content is generated from <code>src/data/games.mjs</code>.</p>
      <h2>Contact</h2>
      <p>Use the <a href="/contact.html">contact page</a> or open an issue on GitHub. For a specific game, include the game name and the device/browser you were using so the report can be reproduced.</p>
    </article>
  </div>`;

const privacyContent = `
  <div class="container">
    ${breadcrumbs([{ name: 'Home', url: '/' }, { name: 'Privacy', url: '/privacy.html' }])}
    <header class="page-head"><h1>Privacy Policy</h1><p class="lead">What this site stores, what it does not, and how to clear it.</p></header>
    <article class="prose panel">
      <p>Last updated: ${SITE.buildDate}.</p>
      <h2>Information we do not collect</h2>
      <p>Unblocked Games G+ does not require an account, an email address or a payment method. We do not ask for your name, school, age or location. There is no login system and no user-generated content.</p>
      <h2>Local storage</h2>
      <p>The games use your browser's localStorage to remember things like high scores and the current 2048 board. This data stays on your device and is never transmitted to us. You can clear it at any time through your browser's site-data settings, or by using the reset button inside a game.</p>
      <h2>Analytics</h2>
      <p>We use Google Analytics 4 (measurement ID ${SITE.analytics.ga4}) and Microsoft Clarity (project ID ${SITE.analytics.clarity}) to understand aggregate traffic and improve the site. These services may set cookies and collect standard technical information such as page URL, referrer, approximate region, device type and browser. IP addresses are anonymised in the analytics configuration. Their handling of data is governed by Google's and Microsoft's respective privacy policies.</p>
      <h2>Advertising and third-party game embeds</h2>
      <p>Some game pages load a third-party HTML5 game in an iframe after you press Play. The game host may receive standard request data (IP address, browser, referrer) and may set its own cookies or show its own advertising. We do not control the third-party host and do not inject its original wrapper’s ad or tracking scripts. Check the host’s own privacy policy if you need details.</p>
      <p>Our local fallback games are served from this domain and do not contact a third-party game host.</p>
      <h2>Children</h2>
      <p>The site is intended for a general audience and does not knowingly collect personal information from children. Because there are no accounts or forms that submit personal data, no such information is stored on our side.</p>
      <h2>Your choices</h2>
      <p>You can block analytics with a content blocker or your browser's tracking-protection setting without affecting gameplay. Clearing site data removes saved scores and progress; it does not affect your ability to play.</p>
      <h2>Contact</h2>
      <p>Questions about this policy can be sent through the <a href="/contact.html">contact page</a> or opened as an issue on <a href="${SITE.github}" rel="noopener">GitHub</a>.</p>
    </article>
  </div>`;

const termsContent = `
  <div class="container">
    ${breadcrumbs([{ name: 'Home', url: '/' }, { name: 'Terms', url: '/terms.html' }])}
    <header class="page-head"><h1>Terms of Use</h1><p class="lead">The short version: play for fun, do not abuse the site, and do not expect a warranty.</p></header>
    <article class="prose panel">
      <p>Last updated: ${SITE.buildDate}.</p>
      <h2>Acceptance</h2>
      <p>By using Unblocked Games G+, you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Licence to play</h2>
      <p>You may play the games for personal, non-commercial entertainment. You may not attempt to disrupt the site, scrape it at a rate that degrades service for others, or misrepresent the games as your own work.</p>
      <h2>No warranty</h2>
      <p>The site and games are provided "as is" without warranties of any kind. We do not guarantee uninterrupted availability, error-free operation or compatibility with every school network or device.</p>
      <h2>Intellectual property</h2>
      <p>The local fallback game code and site design are original work. Third-party games remain the property of their respective owners and are embedded from their own hosts. Game titles are used descriptively; trademarks and character names belong to their respective owners. The chess rules engine is used under the BSD-2-Clause licence and is credited in the repository's licence file. This site is not affiliated with Google, Google Sites, or any game publisher.</p>
      <h2>Appropriate use</h2>
      <p>You are responsible for following your school or employer's acceptable-use policy. The site is designed to be lightweight and safe, but whether games are permitted during class or work time is a decision for your organisation.</p>
      <h2>Changes</h2>
      <p>These terms may be updated as the site changes. The "last updated" date at the top of this page reflects the current version.</p>
    </article>
  </div>`;

const contactContent = `
  <div class="container">
    ${breadcrumbs([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact.html' }])}
    <header class="page-head"><h1>Contact</h1><p class="lead">Bug reports, game requests and general feedback.</p></header>
    <div class="seo-columns">
      <div class="seo-card">
        <h3>GitHub issues (preferred)</h3>
        <p>The fastest route for bugs and feature requests. Include the game name, browser and a short description of what happened.</p>
        <p><a href="${SITE.github}/issues" rel="noopener">Open an issue →</a></p>
      </div>
      <div class="seo-card">
        <h3>Email</h3>
        <p>For private enquiries that do not fit an issue tracker. Replace the bracketed parts with the game name.</p>
        <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      </div>
      <div class="seo-card">
        <h3>What to include</h3>
        <p>Game name, URL, browser version, device type and the steps that reproduce the problem. A screenshot helps more than a paragraph.</p>
      </div>
      <div class="seo-card">
        <h3>Security</h3>
        <p>If you believe you have found a security issue, please report it privately through GitHub rather than posting exploit details in a public issue.</p>
      </div>
    </div>
  </div>`;

const notFoundContent = `
  <div class="container">
    <header class="page-head" style="text-align:center;padding-top:3rem">
      <h1>404 — that page is not here</h1>
      <p class="lead">The link may be old, or the game may have moved. Try the full catalogue or one of the popular games below.</p>
      <p><a class="btn btn-primary" href="/games/">Browse all games</a></p>
    </header>
    <section class="section">
      ${gameGrid(featuredGames().slice(0, 4), { id: 'notFoundGrid' })}
    </section>
  </div>`;

const staticPages = [
  {
    rel: 'about.html',
    content: layout({
      title: 'About Unblocked Games G+ (GamePlus Edition)',
      description: 'Learn how Unblocked Games G+ (GamePlus Edition) combines local fallback HTML5 games with a 786+ third-party catalogue, and how it handles privacy and licences.',
      canonical: '/about.html',
      content: aboutContent,
    }),
  },
  {
    rel: 'privacy.html',
    content: layout({
      title: 'Privacy Policy — Unblocked Games G+ (GamePlus Edition)',
      description: 'Privacy policy for Unblocked Games G+: what localStorage stores, which analytics are used, and how third-party game iframes handle data.',
      canonical: '/privacy.html',
      content: privacyContent,
    }),
  },
  {
    rel: 'terms.html',
    content: layout({
      title: 'Terms of Use — Unblocked Games G+',
      description: 'Terms of use for Unblocked Games G+: licence to play, no-warranty notice, intellectual property and acceptable use.',
      canonical: '/terms.html',
      content: termsContent,
    }),
  },
  {
    rel: 'contact.html',
    content: layout({
      title: 'Contact — Unblocked Games G+',
      description: 'Contact Unblocked Games G+ for bug reports, game requests and feedback via GitHub issues or email.',
      canonical: '/contact.html',
      content: contactContent,
    }),
  },
  {
    rel: '404.html',
    content: layout({
      title: 'Page Not Found — Unblocked Games G+',
      description: 'The page you requested could not be found. Browse the full catalogue of free unblocked HTML5 games instead.',
      canonical: '/404.html',
      noindex: true,
      content: notFoundContent,
    }),
  },
];

function sitemap() {
  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'daily', image: '/assets/img/hero-arcade.jpg', title: 'Unblocked Games G+ hero artwork' },
    { loc: '/games/', priority: '0.9', changefreq: 'weekly' },
    ...CATEGORIES.map((cat) => ({ loc: `/categories/${cat.slug}/`, priority: '0.8', changefreq: 'weekly' })),
    ...GAMES.map((game) => ({
      loc: `/games/${game.slug}/`,
      priority: '0.9',
      changefreq: 'weekly',
      image: game.hasImage ? game.image : null,
      title: game.hasImage ? `${game.name} game thumbnail` : null,
    })),
    ...EXTERNAL_GAMES.filter((game) => game.indexable).map((game) => ({
      loc: `/games/${game.slug}/`,
      priority: '0.8',
      changefreq: 'weekly',
      image: game.hasImage ? game.image : null,
      title: game.hasImage ? `${game.title} game thumbnail` : null,
    })),
    { loc: '/about.html', priority: '0.4', changefreq: 'monthly' },
    { loc: '/privacy.html', priority: '0.3', changefreq: 'yearly' },
    { loc: '/terms.html', priority: '0.3', changefreq: 'yearly' },
    { loc: '/contact.html', priority: '0.4', changefreq: 'yearly' },
    { loc: '/install.html', priority: '0.6', changefreq: 'monthly' },
  ];
  const xmlEscape = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (url) => `  <url>
    <loc>${abs(url.loc)}</loc>
    <lastmod>${SITE.buildDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.image ? `
    <image:image>
      <image:loc>${xmlEscape(abs(url.image))}</image:loc>
      <image:title>${xmlEscape(url.title)}</image:title>
    </image:image>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>
`;
}

const robots = `# Unblocked Games G+
User-agent: *
Allow: /
Disallow: /404.html

Sitemap: ${abs('/sitemap.xml')}
`;

const manifest = {
  id: '/',
  name: SITE.name,
  lang: 'en',
  dir: 'ltr',
  prefer_related_applications: false,
  display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
  short_name: SITE.shortName,
  description: SITE.description,
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#070b14',
  theme_color: '#0b1020',
  orientation: 'any',
  categories: ['games', 'entertainment'],
  shortcuts: [
    { name: 'All Games', short_name: 'All Games', url: '/games/', icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192' }] },
    { name: '2 Player Games', short_name: '2 Player', url: '/categories/multiplayer/', icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192' }] },
    { name: 'Install Guide', short_name: 'Install', url: '/install.html', icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192' }] },
  ],
  screenshots: [
    { src: '/assets/img/og-cover.png', sizes: '1200x630', type: 'image/png', form_factor: 'wide', label: 'Unblocked Games G+ catalogue' },
    { src: '/assets/img/hero-arcade.jpg', sizes: '1376x768', type: 'image/jpeg', form_factor: 'wide', label: 'Unblocked Games G+ arcade artwork' },
  ],
  icons: [
    { src: '/assets/img/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
    { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
  ],
};

async function main() {
  console.log('Building Unblocked Games G+…');
  await write('index.html', homePage);
  await write('games/index.html', gamesIndexPage);
  for (const game of GAMES) {
    await write(`games/${game.slug}/index.html`, gamePage(game));
  }
  for (const game of EXTERNAL_GAMES) {
    await write(`games/${game.slug}/index.html`, externalPage(game, { allExternal: EXTERNAL_GAMES }));
  }
  for (const cat of CATEGORIES) {
    await write(`categories/${cat.slug}/index.html`, categoryPage(cat));
  }
  for (const page of staticPages) {
    await write(page.rel, page.content);
  }
  await write('install.html', installPage());
  await write('sitemap.xml', sitemap());
  await write('robots.txt', robots);
  await write('manifest.webmanifest', JSON.stringify(manifest, null, 2));
  await write(
    'LICENSES.md',
    `# Licences\n\n## Site and games\n\nAll site code and the game implementations in this repository are original work by the project authors, provided free of charge for personal, non-commercial use.\n\n## chess.js\n\nThe chess move generator and rules engine in \`assets/js/vendor/chess.js\` is [chess.js](https://github.com/jhlywa/chess.js) by Jeff Hlywa, used under the BSD-2-Clause licence:\n\n\`\`\`\nCopyright (c) 2025, Jeff Hlywa (jhlywa@gmail.com)\nAll rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are met:\n\n1. Redistributions of source code must retain the above copyright notice,\n   this list of conditions and the following disclaimer.\n2. Redistributions in binary form must reproduce the above copyright notice,\n   this list of conditions and the following disclaimer in the documentation\n   and/or other materials provided with the distribution.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"\nAND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\nIMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE\nARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE\nLIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR\nCONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF\nSUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS\nINTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN\nCONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)\nARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE\nPOSSIBILITY OF SUCH DAMAGE.\n\`\`\`\n`
  );
  console.log(`Done: ${GAME_COUNT} game pages, ${CATEGORIES.length} category pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
