import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GAMES } from '../data/games.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const SOURCE = join(ROOT, 'src/data/external-source.json');

const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const slugify = (value) =>
  normalize(value)
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '') || 'game';

const hash = (value) => {
  let h = 2166136261;
  for (const char of String(value)) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

const LOCAL_SLUGS = new Set(GAMES.map((game) => game.slug));
const LOCAL_NAMES = new Map(GAMES.map((game) => [normalize(game.name), game.slug]));
const EXACT_ALIASES = {
  'pac man': 'pac-man',
  'pacman': 'pac-man',
  'connect 4': 'connect-four',
  'tic tac toe': 'tic-tac-toe',
  'memory': 'memory-match',
  'snake duel': 'snake-duel',
};

const FALLBACK_RULES = [
  ['2048', '2048'], ['snake', 'snake'], ['tetris', 'tetris'], ['pacman', 'pac-man'], ['pac man', 'pac-man'],
  ['chess', 'chess'], ['checkers', 'checkers'], ['reversi', 'reversi'], ['othello', 'reversi'],
  ['connect four', 'connect-four'], ['connect 4', 'connect-four'], ['air hockey', 'air-hockey'],
  ['minesweeper', 'minesweeper'], ['sudoku', 'sudoku'], ['tic tac toe', 'tic-tac-toe'],
  ['memory', 'memory-match'], ['cookie clicker', 'cookie-clicker'], ['flappy', 'flappy-bird'],
  ['breakout', 'breakout'], ['space invaders', 'space-invaders'], ['pong', 'pong'],
  ['asteroids', 'asteroids'], ['frogger', 'frogger'], ['blackjack', 'blackjack'],
  ['monster truck', 'neon-slope'], ['slope', 'neon-slope'], ['snow rider', 'neon-slope'], ['doodle jump', 'sky-hopper'],
  ['stack', 'stack-master'], ['penalty', 'penalty-shootout'], ['snake duel', 'snake-duel'],
];

const CATEGORY_PRIORITY = [
  ['multiplayer', ['2 player', 'multiplayer']],
  ['racing', ['racing', 'car', 'moto']],
  ['shooting', ['shooting']],
  ['platform', ['platform', 'adventure', 'running']],
  ['sports', ['sports']],
  ['simulation', ['simulation', 'management', 'girls', 'animal']],
  ['action', ['action', 'stickman', 'survival']],
  ['puzzle', ['puzzle', 'board', 'strategy']],
  ['classic', ['classic']],
];

const categoryFor = (cats) => {
  const set = new Set((cats || []).map((c) => String(c).toLowerCase()));
  for (const [category, keys] of CATEGORY_PRIORITY) {
    if (keys.some((key) => set.has(key))) return category;
  }
  return 'arcade';
};

const fallbackFor = (title) => {
  const text = ` ${normalize(title)} `;
  for (const [needle, slug] of FALLBACK_RULES) {
    if (text.includes(` ${normalize(needle)} `)) return LOCAL_SLUGS.has(slug) ? slug : null;
  }
  return null;
};

export function buildExternalGames() {
  const source = JSON.parse(readFileSync(SOURCE, 'utf8'));
  const usedSlugs = new Set(LOCAL_SLUGS);
  const games = [];

  for (const item of source) {
    const title = String(item.title || '').trim();
    if (!title) continue;
    const normalizedTitle = normalize(title);
    const exact = LOCAL_NAMES.get(normalizedTitle) || EXACT_ALIASES[normalizedTitle];
    // The local version is the canonical page for exact duplicates.
    if (exact) continue;

    const cats = Array.isArray(item.cat) ? item.cat.map(String) : [];
    const category = categoryFor(cats);
    const id = String(item.id || '').trim();
    const thumb = `/assets/img/external/ext-${id}.jpg`;
    const hasImage = existsSync(join(ROOT, thumb.replace(/^\//, '')));
    const fallback = fallbackFor(title);
    let slug = slugify(title);
    if (usedSlugs.has(slug)) slug = `${slug}-${id || hash(title) % 9999}`;
    usedSlugs.add(slug);

    const popular = cats.some((c) => /popular/i.test(c));
    const isNew = cats.some((c) => /new/i.test(c));
    const twoPlayer = /2 player|multiplayer/i.test(cats.join(' '));
    const base = 4200 + (hash(id || title) % 32000);
    const plays = base + (popular ? 56000 : 0) + (isNew ? 9000 : 0) + (twoPlayer ? 16000 : 0);

    games.push({
      slug,
      name: title,
      h1: `${title} Unblocked`,
      title,
      tagline: 'Free browser game from the Unblocked Games G+ catalogue.',
      blurb: 'Third-party HTML5 game with a local fallback when available.',
      external: true,
      category,
      tags: [...cats.map((c) => c.toLowerCase()), category, 'external', ...(twoPlayer ? ['two-player', 'multiplayer'] : [])],
      players: twoPlayer ? '1–2 players' : '1 player',
      difficulty: 'Varies',
      genre: category,
      icon: '🎮',
      color: '#6366f1',
      gradient: ['#6366f1', '#0ea5e9'],
      plays,
      order: Number(id) || hash(title) % 10000,
      image: hasImage ? thumb : '',
      ogImage: hasImage ? thumb : '/assets/img/og-cover.png',
      iconImage: hasImage ? thumb : '/assets/img/icons/gamepad.png',
      hasImage,
      hasOgImage: hasImage,
      hasIcon: hasImage,
      gameUrl: String(item.gameUrl || '').trim(),
      sourcePageUrl: String(item.pageUrl || '').trim(),
      fallback,
      indexable: false,
      featured: false,
      controls: [
        { input: 'Click / tap', action: 'Start the game and interact' },
        { input: 'Arrow keys / WASD', action: 'Move or drive, depending on the game' },
        { input: 'Mouse / touch', action: 'Aim, drag or select' },
        { input: 'Fullscreen', action: 'Use the button above the game' },
      ],
    });
  }

  games.sort((a, b) => b.plays - a.plays);
  games.forEach((game, index) => {
    game.indexable = index < 200;
    game.featured = index < 12;
    game.rank = index + 1;
  });
  return games;
}

export { categoryFor as externalCategory, fallbackFor as externalFallback, normalize as normalizeGameTitle };
