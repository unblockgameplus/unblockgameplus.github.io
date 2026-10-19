# Unblocked Games G+

Play 800+ free unblocked games online — 26 original local fallback games plus a 786+ third-party HTML5 catalogue. No downloads, no accounts, no ad scripts in our wrapper.

**Live site:** https://unblockgameplus.github.io/

## What is in this repository

A fully static, SEO-first game site generated from a single data file:

- **26 original local fallback games** in `assets/js/games/` (vanilla JavaScript, no game engine)
- **786+ third-party games** imported from a public catalogue, embedded in a lazy iframe wrapper with local fallback links
- **Local 2-player modes** in Pong, Tic-Tac-Toe, Connect Four, Air Hockey, Checkers, Reversi and Snake Duel
- **CC0 icons and playing cards** from Kenney, plus generated local card art and OG art
- **Popularity counters** and a Most Played sort, with animated numbers on the catalogue
- **One SEO landing page per game** with controls, how-to, strategy tips, FAQ, JSON-LD and internal links
- **6 category pages** plus an all-games catalogue
- **Home page** with search, category filters, featured games and recently played
- **About, privacy, terms, contact and 404 pages**
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, Open Graph/Twitter metadata
- Local high scores through `localStorage`; no accounts or back end

## Project layout

```
index.html                     generated home page
games/<slug>/index.html        generated game pages
categories/<slug>/index.html   generated category pages
about.html privacy.html ...    generated static pages
assets/
  css/site.css                 site chrome
  css/games.css                game shell + in-game boards
  js/site.js                   search, filters, recent games, nav
  js/game-shell.js             HUD, overlays, pause, sound, fullscreen
  js/game-page.js              loads the game module for the current slug
  js/games/<slug>.js           one module per local fallback game
  js/external-page.js          lazy iframe, fullscreen and fallback wrapper
  js/vendor/chess.js           chess.js (BSD-2-Clause)
  img/                         favicon, OG image, hero art
  img/games/                   800x450 card, 1200x630 OG and 256x256 icon per local game
  img/external/                480x270 thumbnails for 786 third-party games
  img/icons/                   Kenney CC0 UI icons
  img/cards/                   Kenney CC0 playing cards used by Memory Match
src/
  data/games.mjs               local games and categories
  data/external-source.json   786-game catalogue metadata
  data/external-copy.mjs       category copy for external pages
  lib/external.mjs             normalises the external catalogue
  lib/external-page.mjs        external game page generator
  lib/layout.mjs               HTML head, header, footer, cards, schema helpers
scripts/
  build.mjs                    static site generator
  optimize-images.py           resize masters to card/OG sizes
  fallback-art.py              PIL fallback art for missing scenes
  connect-four-art.py          PIL fallback Connect Four cover
  fetch-external-thumbs.mjs    downloads the 786 catalogue thumbnails
  magpie-image.mjs             optional image-generation helper (MCP client)
```

## Build

```bash
node scripts/build.mjs
```

The output is committed to the repository; GitHub Pages serves it directly. There are no npm dependencies.

To regenerate the card and social images from the masters in `generated-images/games/`:

```bash
python scripts/optimize-images.py
```

The masters are gitignored. Game art was generated with the Magpie image MCP, then optimised to 800×450 (cards / in-page figures) and 1200×630 (Open Graph).

To preview locally:

```bash
python -m http.server 8000
# open http://127.0.0.1:8000/
```

## Adding or editing a game

1. Add an entry to `src/data/games.mjs` (name, slug, category, SEO copy, controls, tips, FAQ, related games).
2. Add `assets/js/games/<slug>.js` exporting a default `createGame(api)` function.
3. Run `node scripts/build.mjs`.

The game module contract and the shell API are documented at the top of `assets/js/game-shell.js`.

## SEO model

- The 200 highest-play third-party pages are indexable and included in `sitemap.xml`.
- The remaining third-party pages are still accessible and linked from category/catalogue pages, but carry `noindex` until they get more unique content. This is the A+B mix requested for launch.
- No fake ratings or `aggregateRating` anywhere. Structured data is limited to `VideoGame`, `HowTo`, `FAQPage`, `BreadcrumbList`, `WebSite`, `Organization` and `ItemList`.

## SEO notes

- Every page is server-rendered static HTML; crawlers do not need JavaScript.
- Each game page has a unique title, meta description, canonical URL, Open Graph/Twitter tags, `VideoGame`, `HowTo`, `BreadcrumbList` and `FAQPage` structured data.
- The home page has `WebSite` + `SearchAction`, `Organization` and an `ItemList` of the full catalogue.
- Internal links connect games, categories and the catalogue; `sitemap.xml` lists every indexable URL.
- No fake ratings or review markup.

## Licences

Site code and game implementations are original work. The chess rules engine is [chess.js](https://github.com/jhlywa/chess.js) by Jeff Hlywa, used under the BSD-2-Clause licence. See `LICENSES.md`.

Game names are used descriptively. All trademarks belong to their respective owners. This project is not affiliated with Google, Google Sites, or any game publisher.
