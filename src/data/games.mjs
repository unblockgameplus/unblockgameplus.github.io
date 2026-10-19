import { EXTRA_GAMES } from './games-extra.mjs';

// Single source of truth for every game page, category page and sitemap entry.
// The build script turns this data into fully server-rendered static HTML so
// crawlers see the content without executing JavaScript.

export const SITE = {
  name: 'Unblocked Games G+',
  brandLine: 'Unblocked Games G+ (GamePlus Edition)',
  shortName: 'Games G+',
  origin: 'https://unblockgameplus.github.io',
  basePath: '/',
  tagline: 'Free HTML5 games that work at school, on a Chromebook, or anywhere.',
  description:
    'Play 800+ free unblocked games on Unblocked Games G+ (GamePlus Edition): 2048, Snake, Tetris, Connect Four, racing and 2-player games. No downloads.',
  github: 'https://github.com/unblockgameplus/unblockgameplus.github.io',
  email: 'unblockgameplus@users.noreply.github.com',
  analytics: { ga4: 'G-8JCKVMCC4Z', clarity: 'z062bfytj7' },
  buildDate: '2026-10-19',
};

export const CATEGORIES = [
  {
    slug: 'puzzle',
    name: 'Puzzle Games',
    h1: 'Unblocked Puzzle Games',
    title: 'Unblocked Puzzle Games — 2048, Tetris, Sudoku & More',
    description:
      'Play free unblocked puzzle games online: 2048, Tetris, Sudoku, Minesweeper, Memory Match and more. No downloads, works on school Chromebooks.',
    icon: '🧩',
    color: '#8b5cf6',
    blurb: 'Train your brain with merge puzzles, block stackers, logic grids and memory challenges.',
    intro: [
      'Puzzle games are the quiet champions of the school-break genre. They load in a second, ask for nothing but your attention, and reward the kind of careful thinking that a five-minute break can actually accommodate. Our unblocked puzzle collection is built around that idea: short sessions, deep play, and no download in sight.',
      'Every puzzle here runs entirely in the browser on HTML5 canvas, so there is no plugin to install and no launcher to fight with. Progress and best scores are saved locally in your browser through localStorage, which means your high score survives a page refresh without ever creating an account.',
    ],
  },
  {
    slug: 'arcade',
    name: 'Arcade Games',
    h1: 'Unblocked Arcade Games',
    title: 'Unblocked Arcade Games — Snake, Pac-Man, Breakout & More',
    description:
      'Play classic unblocked arcade games free online: Snake, Pac-Man, Breakout, Flappy Bird, Sky Hopper and Stack Master. Instant HTML5 play, no install.',
    icon: '🕹️',
    color: '#10b981',
    blurb: 'Fast, reflexes-first classics with one-more-run energy and instant restarts.',
    intro: [
      'Arcade games are designed around a single perfect loop: learn the rule in three seconds, lose in thirty, and immediately want to try again. This collection keeps that loop intact while removing the things that make old arcade pages painful — pop-ups, plugin prompts, and thirty-second loading screens.',
      'Each game starts from a tap or a key press and restarts instantly. Scores are stored on your own device, so you can chase a personal best across a whole class period without leaving a trail of accounts behind.',
    ],
  },
  {
    slug: 'action',
    name: 'Action Games',
    h1: 'Unblocked Action Games',
    title: 'Unblocked Action Games — Space Invaders & Neon Slope',
    description:
      'Play free unblocked action games online: Space Invaders and Neon Slope. Fast HTML5 arcade action that runs on Chromebooks with no downloads.',
    icon: '⚡',
    color: '#ec4899',
    blurb: 'Reflex-testing shooters and endless neon runners for when you need speed.',
    intro: [
      'Action games ask for reaction speed rather than patience. The two titles in this category cover both ends of that spectrum: Space Invaders is a deliberate, position-based shooter, while Neon Slope is a pure velocity rush that gets faster every second you survive.',
      'Both use a fixed internal resolution and scale cleanly to phones, tablets and Chromebooks. Keyboard and touch controls are supported, and the game pauses automatically when you switch tabs, so you never lose a run because a teacher walked past.',
    ],
  },
  {
    slug: 'sports',
    name: 'Sports Games',
    h1: 'Unblocked Sports Games',
    title: 'Unblocked Sports Games — Pong & Penalty Shootout',
    description:
      'Play free unblocked sports games online: classic Pong and a five-round Penalty Shootout. Instant HTML5 fun for school Chromebooks and phones.',
    icon: '🏆',
    color: '#ef4444',
    blurb: 'Quick competitive rounds of table tennis and penalty kicks, solo or with a friend.',
    intro: [
      'Not every sports game needs a controller, a roster update, or a forty-hour career mode. Sometimes you want one rally, one save, one perfectly placed shot. Pong, Air Hockey and Penalty Shootout are built for exactly that kind of break.',
      'Both games support a second player on the same keyboard where it makes sense, and both work with touch. Matches are short by design, so you can finish a round even when the bell is about to ring.',
    ],
  },
  {
    slug: 'classic',
    name: 'Classic Games',
    h1: 'Unblocked Classic Games',
    title: 'Unblocked Classic Games — Snake, Tetris, Chess & Pong',
    description:
      'Play the best unblocked classic games online: Snake, Tetris, Pac-Man, Pong, Space Invaders, Chess and Tic-Tac-Toe. Free HTML5, no downloads.',
    icon: '👾',
    color: '#6366f1',
    blurb: 'The games everyone already knows how to play, rebuilt to run anywhere.',
    intro: [
      'Classic games earned their status for a reason: the rules fit on a napkin, but the skill ceiling does not. This collection rebuilds the icons of the arcade and early home-computer era as clean, modern HTML5 ports that work on a Chromebook with nothing installed.',
      'No emulator, no ROM download, no shady mirror site. Just the game, a keyboard or touchscreen, and a local high-score table that remembers your best run.',
    ],
  },
  {
    slug: 'idle',
    name: 'Idle & Clicker Games',
    h1: 'Unblocked Idle & Clicker Games',
    title: 'Unblocked Clicker Games — Cookie Clicker Online Free',
    description:
      'Play free unblocked clicker games online, including Cookie Clicker. Build an idle cookie empire, buy upgrades and watch the numbers grow. No download.',
    icon: '🍪',
    color: '#f59e0b',
    blurb: 'Low-pressure clicking and idle progression that keeps ticking while you think.',
    intro: [
      'Idle games are the perfect companion to a busy screen. Click a few times, buy your first upgrade, and the numbers start climbing on their own. Cookie Clicker distills that loop into a single page: bake cookies, buy producers, unlock milestones, and come back to a bigger empire.',
      'Your bakery is saved to localStorage every few seconds, so it survives refreshes and tab switches. There is no account and no cloud requirement, which also makes it work on restricted school networks.',
    ],
  },
  {
    slug: 'multiplayer',
    name: '2 Player Games',
    h1: '2 Player Unblocked Games',
    title: '2 Player Unblocked Games — Play With a Friend Online',
    description:
      'Play free 2 player unblocked games online: Pong, Tic-Tac-Toe, Connect Four and Air Hockey. Same-keyboard and same-screen multiplayer with no downloads.',
    icon: '👥',
    color: '#f472b6',
    blurb: 'Share one keyboard or one touchscreen: fast duels built for two.',
    intro: [
      'Two-player games are the fastest way to turn a break into a competition. Every game in this category can be played by two people on the same device: one keyboard, one trackpad, or two halves of a touchscreen. No lobby, no account, no waiting for a match.',
      'The collection covers different speeds of play: Pong and Air Hockey are reflex duels, Tic-Tac-Toe is a quick logic round, and Connect Four is a deeper strategy game that rewards planning several moves ahead. Each game also includes a computer opponent if you are playing solo.',
    ],
  },
  {
    slug: 'racing',
    name: 'Racing Games',
    h1: 'Unblocked Racing Games',
    title: 'Unblocked Racing Games — Car, Moto & Drift Games',
    description:
      'Play free unblocked racing games online: car races, moto trials, drift challenges and 3D driving games. No downloads, works on school Chromebooks.',
    icon: '🏎️',
    color: '#f97316',
    blurb: 'Cars, motos, drift and open-road speed runs.',
    intro: [
      'Racing games are about the same thing every time: carry speed through a corner without losing control. The difference between a good lap and a bad one is usually one brake too late or one throttle too early.',
      'This category brings together browser racing games across cars, motos, drift and 3D driving. Most are quick arcade runs rather than simulations, so they load fast and work with a keyboard or touch screen.',
      'If a third-party race does not load on your network, try the local fallback game or one of the classic arcade racers in our own collection.',
    ],
  },
  {
    slug: 'shooting',
    name: 'Shooting Games',
    h1: 'Unblocked Shooting Games',
    title: 'Unblocked Shooting Games — FPS, Sniper & Space Shooters',
    description:
      'Play free unblocked shooting games online: space shooters, sniper challenges, tower defense and arcade gun games. No downloads, Chromebook friendly.',
    icon: '🎯',
    color: '#ef4444',
    blurb: 'Aim, fire and survive across space, sniper and arcade shooters.',
    intro: [
      'Shooting games reward accuracy and positioning more than raw clicking speed. A good player lines up the shot before the target appears; a great player is already moving to the next angle.',
      'The browser shooters in this category range from space arcade games to sniper challenges and wave-based defense. They are designed for short sessions and work with a mouse or touch controls.',
      'For a guaranteed local game, try our Space Invaders or Asteroids fallback pages if an external shooter is blocked.',
    ],
  },
  {
    slug: 'platform',
    name: 'Platform Games',
    h1: 'Unblocked Platform Games',
    title: 'Unblocked Platform Games — Jump, Run & Adventure',
    description:
      'Play free unblocked platform games online: precision jumpers, endless runners, adventure platformers and parkour challenges. No download needed.',
    icon: '🕹️',
    color: '#22c55e',
    blurb: 'Jump, run, wall-climb and chain impossible landings.',
    intro: [
      'Platform games are built on one question: can you make the next jump? The best ones keep the answer just out of reach, adding one more moving platform, one more spike, or one more second of hang time.',
      'This category covers precision jumpers, endless runners, parkour maps and adventure platformers. Keyboard and touch controls are both supported by the games that offer them.',
      'If an external platformer is blocked, our Sky Hopper and Neon Slope fallback games are always available locally.',
    ],
  },
  {
    slug: 'simulation',
    name: 'Simulation Games',
    h1: 'Unblocked Simulation Games',
    title: 'Unblocked Simulation Games — Life, Tycoon & Management',
    description:
      'Play free unblocked simulation games online: life simulators, tycoons, management games and idle builders. No downloads, works at school.',
    icon: '⚙️',
    color: '#8b5cf6',
    blurb: 'Build, manage and watch the numbers grow.',
    intro: [
      'Simulation games are about systems. You make a small decision, the system reacts, and ten minutes later the whole board looks different. That feedback loop is why tycoons and management games are so hard to put down.',
      'This category includes life simulators, idle builders, shop management and strategy-adjacent simulation games. Sessions can be a few minutes or a whole class break, depending on how deep you go.',
      'Our Cookie Clicker and Stack Master fallback games are local, fast and always available if an external simulation does not load.',
    ],
  },
];

const CATEGORY_ICONS = {
  puzzle: '/assets/img/icons/target.png',
  arcade: '/assets/img/icons/gamepad.png',
  action: '/assets/img/icons/joystick.png',
  sports: '/assets/img/icons/trophy.png',
  classic: '/assets/img/icons/star.png',
  idle: '/assets/img/icons/save.png',
  multiplayer: '/assets/img/icons/multiplayer.png',
  racing: '/assets/img/icons/fastForward.png',
  shooting: '/assets/img/icons/target.png',
  platform: '/assets/img/icons/joystick.png',
  simulation: '/assets/img/icons/gear.png',
};
CATEGORIES.forEach((cat) => {
  cat.iconImage = CATEGORY_ICONS[cat.slug] || '/assets/img/icons/gamepad.png';
});

const catName = (slug) => (CATEGORIES.find((c) => c.slug === slug) || {}).name || slug;

export const GAMES = [
  {
    slug: '2048',
    name: '2048',
    h1: '2048 Unblocked',
    title: '2048 Unblocked — Play 2048 Classic Free Online',
    metaDescription:
      'Play 2048 unblocked for free. Slide tiles, merge matching numbers and reach 2048 in this smooth HTML5 puzzle. Works on school Chromebooks, no download.',
    tagline: 'Slide, merge and build a tile worth 2048.',
    blurb: 'The original merge puzzle, with smooth animations, undo and touch controls.',
    category: 'puzzle',
    tags: ['puzzle', 'classic', 'brain', 'numbers', 'merge'],
    icon: '🔢',
    color: '#f59e0b',
    gradient: ['#f59e0b', '#ef4444'],
    players: '1 player',
    difficulty: 'Easy to learn',
    genre: 'Puzzle',
    featured: true,
    order: 1,
    controls: [
      { input: 'Arrow keys / WASD', action: 'Slide all tiles' },
      { input: 'Swipe', action: 'Slide tiles on touch screens' },
      { input: 'Z or U', action: 'Undo the last move' },
      { input: 'R', action: 'Start a new game' },
    ],
    intro: [
      '2048 is the rare puzzle that explains itself. You have a 4×4 grid, two starting tiles, and one rule: when two tiles with the same number touch, they merge into their sum. Keep merging and a 2 becomes a 4, a 4 becomes an 8, and eventually a single golden 2048 tile is sitting in the corner.',
      'That simplicity hides a real strategy game. Every swipe moves every tile at once, so a move that looks harmless on the left edge can destroy the structure you spent five minutes building on the right. Strong players pick a corner early, keep their biggest tile anchored there, and build a descending staircase of values beside it.',
      'This version adds the quality-of-life features the original online release lacked: an undo button for the move you immediately regret, a persistent best score, smooth slide and merge animations, and full support for swipe gestures on phones and Chromebook touchscreens.',
    ],
    howTo: [
      'Use the arrow keys or WASD to slide every tile on the board in one direction.',
      'When two tiles with the same number collide, they merge into one tile with double the value.',
      'A new 2 or 4 appears after every successful move, so plan where it can land.',
      'Keep your highest tile in a corner and fill the row beside it in descending order.',
      'Reach the 2048 tile to win — then keep going for 4096 and beyond.',
    ],
    tips: [
      'Pick one corner in the first few moves and never move your biggest tile out of it.',
      'Avoid swiping in the direction that pulls tiles away from your anchor corner.',
      'Build a full row from high to low before you start merging the next row.',
      'Use undo as a learning tool: replay a bad move and look for the alternative you missed.',
    ],
    faq: [
      {
        q: 'What is the highest tile you can reach in 2048?',
        a: 'There is no hard cap. 2048 is the named win condition, but experienced players regularly push past 4096 and 8192. The board only runs out of space when you break your corner structure.',
      },
      {
        q: 'Can I play 2048 unblocked at school?',
        a: 'Yes. This page is a static HTML5 game with no downloads, no plugins and no account requirement, which makes it compatible with most Chromebooks and school network filters.',
      },
      {
        q: 'Does 2048 save my score?',
        a: 'Your best score and the current board are saved in your browser with localStorage. Closing the tab and returning later restores your game on the same device and browser.',
      },
      {
        q: 'Does 2048 work on a phone or tablet?',
        a: 'Yes. Swipe in any direction to slide the tiles. The board scales to fit the screen and stays playable in portrait orientation.',
      },
    ],
    related: ['tetris', 'minesweeper', 'sudoku', 'snake'],
  },
  {
    slug: 'snake',
    name: 'Snake',
    h1: 'Snake Unblocked',
    title: 'Snake Unblocked — Play Classic Snake Free Online',
    metaDescription:
      'Play classic Snake unblocked for free. Eat food, grow longer and avoid biting your own tail. Smooth HTML5 arcade game with touch controls and high scores.',
    tagline: 'Eat, grow, and never catch your own tail.',
    blurb: 'The Nokia-era classic, rebuilt with smooth movement and swipe controls.',
    category: 'arcade',
    tags: ['arcade', 'classic', 'retro', 'reflex', 'nokia'],
    icon: '🐍',
    color: '#10b981',
    gradient: ['#10b981', '#0ea5e9'],
    players: '1 player',
    difficulty: 'Easy to learn',
    genre: 'Arcade',
    featured: true,
    order: 2,
    controls: [
      { input: 'Arrow keys / WASD', action: 'Turn the snake' },
      { input: 'Swipe', action: 'Turn on touch screens' },
      { input: 'Space', action: 'Pause or resume' },
      { input: 'R', action: 'Restart' },
    ],
    intro: [
      'Snake is the original "just one more run" game. You guide a growing line around a grid, eat the food, and try not to run into the wall or your own tail. It takes a second to understand and a surprisingly long time to master, especially once your snake is long enough to fill half the board.',
      'The version on this page keeps the classic rules but removes the rough edges. Movement is smooth and responsive, the pace ramps up gradually as you eat, and the whole game fits in a single canvas that scales to your screen. Swipe controls make it just as playable on a phone as on a Chromebook keyboard.',
      'The high score is stored locally, so the number in the corner is a real target rather than a decoration. If you want to get past 50 points, the key is planning one turn ahead: never follow your own tail into a dead end, and use the edges of the board as a safety net instead of avoiding them.',
    ],
    howTo: [
      'Press any arrow key or swipe to start moving.',
      'Eat the red food to grow one segment and earn points.',
      'Each food makes the snake slightly faster.',
      'Do not hit the walls or your own body.',
      'Pause with Space at any time and restart with R.',
    ],
    tips: [
      'Plan your turns one step ahead rather than reacting to the food.',
      'When the snake gets long, loop around the outside of the board instead of cutting through the middle.',
      'Do not rush the last segment before a piece of food — overshooting is the most common death.',
      'Keep a mental map of the empty space left; the board fills faster than it looks.',
    ],
    faq: [
      {
        q: 'Is this the same Snake from old Nokia phones?',
        a: 'The rules are the same: eat food, grow longer, avoid the walls and your own tail. This version adds smoother movement, swipe controls and a saved high score.',
      },
      {
        q: 'Can I play Snake unblocked on a Chromebook?',
        a: 'Yes. The game is pure HTML5 and needs no plugins, downloads or accounts, so it runs in Chrome on a school Chromebook.',
      },
      {
        q: 'How does the speed increase work?',
        a: 'Every piece of food shortens the delay between moves. The change is gradual, so the difficulty creeps up instead of jumping suddenly.',
      },
      {
        q: 'Does Snake work offline?',
        a: 'Once the page has loaded, the game itself needs no network connection. The page assets are cached by your browser like any other static site.',
      },
    ],
    related: ['2048', 'flappy-bird', 'pac-man', 'tetris'],
  },
  {
    slug: 'flappy-bird',
    name: 'Flappy Bird',
    h1: 'Flappy Bird Unblocked',
    title: 'Flappy Bird Unblocked — Play the Classic Flying Game Free',
    metaDescription:
      'Play Flappy Bird unblocked for free. Tap or press Space to fly through the pipes, beat your best score and unlock medals. Instant HTML5, no download.',
    tagline: 'Tap to flap. Thread the pipes. Try not to rage quit.',
    blurb: 'One-button pipe dodging with medals, parallax skies and instant restarts.',
    category: 'arcade',
    tags: ['arcade', 'reflex', 'one-button', 'retro', 'mobile'],
    icon: '🐤',
    color: '#38bdf8',
    gradient: ['#38bdf8', '#6366f1'],
    players: '1 player',
    difficulty: 'Hard',
    genre: 'Arcade',
    featured: false,
    order: 3,
    controls: [
      { input: 'Space / Arrow Up', action: 'Flap upward' },
      { input: 'Click or tap', action: 'Flap upward' },
      { input: 'P', action: 'Pause' },
      { input: 'R', action: 'Restart instantly' },
    ],
    intro: [
      'Flappy Bird became a phenomenon for one reason: it is brutally, hilariously simple. A single tap lifts the bird. Gravity pulls it back down. Between you and the next point is a pair of pipes with a gap that always looks slightly smaller than it is.',
      'The game on this page recreates that loop with a clean parallax skyline, smooth physics and the medal system from the original: bronze at 10, silver at 20, gold at 30 and platinum at 40. A saved best score gives you something to chase after the first ten attempts inevitably end in a pipe.',
      'It is also a genuinely good test of rhythm. Rather than mashing, try to find a steady tap cadence that keeps the bird level with the middle of each gap. That single habit is the difference between a score of 4 and a score of 40.',
    ],
    howTo: [
      'Press Space, click, or tap the screen to make the bird flap.',
      'Pass through the gap between each pair of pipes to score a point.',
      'Do not touch the pipes, the ground or the top of the screen.',
      'Keep a steady tapping rhythm instead of mashing the button.',
      'Collect medals at 10, 20, 30 and 40 points.',
    ],
    tips: [
      'Aim for the vertical center of the gap, not the top edge.',
      'Two quick taps followed by a pause is often more stable than continuous tapping.',
      'Look at the next pipe, not the bird — your hand will follow your eyes.',
      'Restart immediately after a crash; the first pipe is always the same height.',
    ],
    faq: [
      {
        q: 'Is this the original Flappy Bird?',
        a: 'This is a faithful HTML5 recreation built from scratch, not the original binary. It uses the same one-button rules, pipe layout and medal thresholds.',
      },
      {
        q: 'Can I play Flappy Bird unblocked at school?',
        a: 'Yes. The game is a static HTML5 page with no download or install, and it is designed to load quickly on school networks and Chromebooks.',
      },
      {
        q: 'What score do I need for a medal?',
        a: 'Bronze starts at 10 points, silver at 20, gold at 30 and platinum at 40. Your best medal is shown on the game-over screen.',
      },
      {
        q: 'Does Flappy Bird work with a touchscreen?',
        a: 'Yes. Tap anywhere on the game area to flap. The canvas is sized for both portrait phones and landscape Chromebooks.',
      },
    ],
    related: ['snake', 'neon-slope', 'sky-hopper', 'pac-man'],
  },
  {
    slug: 'tetris',
    name: 'Tetris',
    h1: 'Tetris Unblocked',
    title: 'Tetris Unblocked — Play Classic Block Stacking Free',
    metaDescription:
      'Play Tetris unblocked free online. Rotate falling blocks, clear lines, use hold and chase a high score in this polished HTML5 block puzzle. No download.',
    tagline: 'Rotate, drop, clear lines, repeat forever.',
    blurb: 'Full modern Tetris rules with hold, next queue, ghost piece and levels.',
    category: 'puzzle',
    tags: ['puzzle', 'classic', 'blocks', 'reflex', 'strategy'],
    icon: '🧱',
    color: '#8b5cf6',
    gradient: ['#8b5cf6', '#ec4899'],
    players: '1 player',
    difficulty: 'Medium',
    genre: 'Puzzle',
    featured: true,
    order: 4,
    controls: [
      { input: '← →', action: 'Move the piece' },
      { input: '↓', action: 'Soft drop' },
      { input: 'Space', action: 'Hard drop' },
      { input: '↑ / X', action: 'Rotate clockwise' },
      { input: 'Z', action: 'Rotate counter-clockwise' },
      { input: 'C / Shift', action: 'Hold piece' },
    ],
    intro: [
      'Tetris needs no introduction, but it does deserve a good port. The version on this page follows modern guideline rules: a seven-bag randomizer so you never wait too long for a straight piece, a hold slot for saving a piece for later, a three-piece next queue, a ghost piece showing where your block will land, and proper wall kicks when you rotate against the edge.',
      'The result is a game that feels fair at high speed. Clearing one line is easy, clearing four at once — a Tetris — is where the scoring explodes. The level counter rises as you clear lines, and each level nudges the fall speed up until the board becomes a blur of decisions.',
      'Keyboard is the primary control scheme, but touch buttons are included for phones and tablets. Your best score is saved locally, and the game pauses automatically if you switch tabs.',
    ],
    howTo: [
      'Use the left and right arrows to move the falling piece.',
      'Press the up arrow or X to rotate it clockwise, and Z to rotate counter-clockwise.',
      'Press Down for a soft drop, or Space for an instant hard drop.',
      'Fill an entire horizontal row to clear it and earn points.',
      'Clear four rows at once for a Tetris bonus and a big score boost.',
    ],
    tips: [
      'Keep the board flat: a single deep well is easier to clear than several shallow holes.',
      'Save the long straight piece with the hold slot when your well is almost ready.',
      'Use the ghost piece to line up hard drops instead of guessing.',
      'Do not rotate pieces at the last second near the stack — wall kicks can surprise you.',
    ],
    faq: [
      {
        q: 'Does this Tetris follow official guideline rules?',
        a: 'It uses the core guideline ideas: a seven-bag randomizer, hold, ghost piece, three-piece preview and basic wall kicks. It is a clean fan recreation rather than an official licensed release.',
      },
      {
        q: 'Can I play Tetris unblocked on a school Chromebook?',
        a: 'Yes. The game runs entirely in the browser with HTML5 canvas and JavaScript, with no plugins, downloads or installs.',
      },
      {
        q: 'How does scoring work in Tetris?',
        a: 'Single, double, triple and quadruple line clears award increasing points, multiplied by the current level. Soft and hard drops also add a small amount.',
      },
      {
        q: 'Is there a two-player mode?',
        a: 'This version is single-player with a saved high score. It focuses on a polished solo experience with hold and preview support.',
      },
    ],
    related: ['2048', 'minesweeper', 'stack-master', 'pac-man'],
  },
  {
    slug: 'pac-man',
    name: 'Pac-Man',
    h1: 'Pac-Man Unblocked',
    title: 'Pac-Man Unblocked — Play the Classic Maze Game Free',
    metaDescription:
      'Play Pac-Man unblocked for free. Eat pellets, dodge four ghosts, grab power pellets and clear the maze in this classic HTML5 arcade game. No download.',
    tagline: 'Clear the maze, dodge the ghosts, eat the power pellet.',
    blurb: 'A full maze chase with four ghosts, power pellets, lives and levels.',
    category: 'arcade',
    tags: ['arcade', 'classic', 'maze', 'retro', 'chase'],
    icon: '👻',
    color: '#facc15',
    gradient: ['#facc15', '#f97316'],
    players: '1 player',
    difficulty: 'Medium',
    genre: 'Arcade',
    featured: true,
    order: 5,
    controls: [
      { input: 'Arrow keys / WASD', action: 'Move through the maze' },
      { input: 'Swipe', action: 'Change direction on touch' },
      { input: 'Space', action: 'Pause' },
      { input: 'R', action: 'Restart' },
    ],
    intro: [
      'Pac-Man is the original chase game: a yellow circle, a maze full of dots, and four ghosts with different personalities closing in from every direction. The goal is simple — eat every pellet — but the fun comes from the tension between cleaning up the last few dots and staying one corner ahead of Blinky.',
      'This HTML5 version recreates the full loop. Four ghosts alternate between scatter and chase phases, power pellets turn them blue and edible for a few seconds, and eating a ghost sends it back to the pen. Clear the maze to advance to a faster level with the same rules.',
      'The ghosts use simple but distinct targeting logic, so the maze rewards the classic strategy: bait the ghosts into a cluster, loop around a corner, and save the power pellets for the moment when all four are close.',
    ],
    howTo: [
      'Use the arrow keys or WASD to move through the maze.',
      'Eat every small pellet to clear the level.',
      'Grab a large power pellet to turn the ghosts blue and eat them for bonus points.',
      'Avoid the ghosts when they are not blue — a single touch costs a life.',
      'Clear all pellets to advance to the next, faster level.',
    ],
    tips: [
      'Save power pellets for when at least two ghosts are nearby.',
      'Use the side tunnels to escape when a ghost is directly behind you.',
      'Do not clear a whole area at once — leave a few pellets as a safe route home.',
      'Watch the ghost eyes: eaten ghosts return to the pen and come back quickly.',
    ],
    faq: [
      {
        q: 'Is this the original Pac-Man arcade game?',
        a: 'No. It is an original HTML5 recreation inspired by the classic maze chase, with four ghosts, pellets, power pellets and multiple levels.',
      },
      {
        q: 'Can I play Pac-Man unblocked at school?',
        a: 'Yes. The game is a static HTML5 page with no downloads or plugins, and it is built to run smoothly on Chromebooks and restricted networks.',
      },
      {
        q: 'How many ghosts are in the maze?',
        a: 'Four, each with its own target logic. They switch between scatter and chase modes as the level timer advances.',
      },
      {
        q: 'Does Pac-Man work on mobile?',
        a: 'Yes. Use swipe gestures to change direction, or the on-screen direction pad shown on touch devices.',
      },
    ],
    related: ['snake', 'space-invaders', 'breakout', 'tetris'],
  },
  {
    slug: 'breakout',
    name: 'Breakout',
    h1: 'Breakout Unblocked',
    title: 'Breakout Unblocked — Play Brick Breaker Free Online',
    metaDescription:
      'Play Breakout unblocked free. Bounce the ball, smash every brick and catch power-ups in this classic HTML5 brick breaker. Works on Chromebooks and phones.',
    tagline: 'Keep the ball alive and smash every brick.',
    blurb: 'Brick-breaking with power-ups, particles and escalating levels.',
    category: 'arcade',
    tags: ['arcade', 'classic', 'bricks', 'reflex', 'paddle'],
    icon: '🧱',
    color: '#f97316',
    gradient: ['#f97316', '#ef4444'],
    players: '1 player',
    difficulty: 'Medium',
    genre: 'Arcade',
    featured: false,
    order: 6,
    controls: [
      { input: 'Mouse / touch', action: 'Move the paddle' },
      { input: '← →', action: 'Move the paddle with the keyboard' },
      { input: 'Space', action: 'Launch the ball / pause' },
      { input: 'R', action: 'Restart' },
    ],
    intro: [
      'Breakout is the original "one more brick" game. A ball bounces around the screen, you slide a paddle underneath it, and every brick you hit disappears. Clear the wall and a fresh, tougher one appears.',
      'This version adds a little modern sparkle without changing the formula: particle bursts when bricks break, three power-ups that can turn a losing run around, and a level system that introduces tougher multi-hit bricks as you progress. The ball speeds up slightly with each level, so the challenge keeps climbing.',
      'It is playable with a mouse, a finger, or the arrow keys. If you are on a trackpad, the mouse control is the most precise; if you are on a phone, dragging the paddle directly feels the most natural.',
    ],
    howTo: [
      'Move the paddle left and right to keep the ball in play.',
      'Press Space to launch the ball at the start of a round.',
      'Hit every brick to clear the level and move on.',
      'Catch falling power-ups to gain extra balls, a wider paddle or a slower ball.',
      'Do not let the ball fall past the paddle — you lose a life.',
    ],
    tips: [
      'Hit the ball with the edge of the paddle to change its angle sharply.',
      'Aim for the sides of the wall first; the ball can get trapped up top and clear rows quickly.',
      'Save the wide-paddle power-up for levels with narrow gaps.',
      'Do not chase the ball — move the paddle to where the ball will land.',
    ],
    faq: [
      {
        q: 'What power-ups are in this Breakout game?',
        a: 'There are three: a multi-ball drop that adds extra balls, a wide-paddle drop, and a slow-ball drop that reduces the ball speed for a short time.',
      },
      {
        q: 'Can I play Breakout unblocked on a Chromebook?',
        a: 'Yes. The game is pure HTML5 canvas and JavaScript with no downloads or plugins, and it runs well on low-power school devices.',
      },
      {
        q: 'How do I control the paddle on a phone?',
        a: 'Drag your finger left and right anywhere in the game area. The paddle follows your touch directly, with no lag.',
      },
      {
        q: 'Does Breakout save my score?',
        a: 'Yes. Your best score is stored in localStorage on your device and shown in the game toolbar.',
      },
    ],
    related: ['pong', 'space-invaders', 'tetris', 'stack-master'],
  },
  {
    slug: 'space-invaders',
    name: 'Space Invaders',
    h1: 'Space Invaders Unblocked',
    title: 'Space Invaders Unblocked — Play the Classic Shooter Free',
    metaDescription:
      'Play Space Invaders unblocked for free. Shoot descending alien waves, use shields and survive as long as you can in this classic HTML5 arcade shooter.',
    tagline: 'Hold the line against wave after wave of invaders.',
    blurb: 'A wave-based alien shooter with destructible shields and a UFO bonus.',
    category: 'action',
    tags: ['action', 'classic', 'shooter', 'retro', 'arcade'],
    icon: '👾',
    color: '#22d3ee',
    gradient: ['#22d3ee', '#6366f1'],
    players: '1 player',
    difficulty: 'Medium',
    genre: 'Shooter',
    featured: false,
    order: 7,
    controls: [
      { input: '← → / A D', action: 'Move your ship' },
      { input: 'Space', action: 'Fire' },
      { input: 'P', action: 'Pause' },
      { input: 'R', action: 'Restart' },
    ],
    intro: [
      'Space Invaders is the game that turned arcades into a cultural force. A grid of aliens marches left and right, dropping lower every time it reaches the edge, while you slide a cannon along the bottom and try to pick them off before they reach you.',
      'This version keeps the original rhythm — the march speeds up as the formation thins out — and adds destructible shields, a bonus UFO that crosses the top of the screen, and multiple waves with increasing aggression. Each wave is a little faster and a little denser than the last.',
      'The strategy is about priorities. The bottom row is the most dangerous, the top row is worth the most points, and the shields are a resource you should spend deliberately rather than let erode. Clear a lane early and the rest of the wave becomes much easier to manage.',
    ],
    howTo: [
      'Move your ship with the left and right arrow keys (or A and D).',
      'Press Space to fire a laser upward.',
      'Destroy every alien in the formation to clear the wave.',
      'Use the destructible shields for cover, but remember they wear down.',
      'Do not let the aliens reach the bottom of the screen.',
    ],
    tips: [
      'Clear the bottom row first — those aliens have the shortest path to you.',
      'Move in small steps so you can react to incoming bombs.',
      'Leave one alien alive at the edge to slow the formation down while you reposition.',
      'Shoot the UFO when it crosses the top for a large point bonus.',
    ],
    faq: [
      {
        q: 'Is this the original Space Invaders?',
        a: 'It is an original HTML5 tribute with the same core loop: a descending alien formation, a movable cannon, destructible shields and wave-based difficulty.',
      },
      {
        q: 'Can I play Space Invaders unblocked at school?',
        a: 'Yes. The game needs no downloads or plugins and is designed to run on Chromebooks and restricted school networks.',
      },
      {
        q: 'How many waves are there?',
        a: 'The waves are endless. Each one increases the speed and density of the formation until you run out of lives.',
      },
      {
        q: 'Does the game work on mobile?',
        a: 'Yes. Touch controls appear on phones and tablets: drag to move and tap the fire button.',
      },
    ],
    related: ['neon-slope', 'breakout', 'pac-man', 'pong'],
  },
  {
    slug: 'pong',
    name: 'Pong',
    h1: 'Pong Unblocked',
    title: 'Pong Unblocked — Play Classic Table Tennis Free Online',
    metaDescription:
      'Play Pong unblocked for free. Beat the computer or a friend in the original table tennis game. Adjustable AI, first to seven, keyboard and touch controls.',
    tagline: 'The original video game, still impossible to put down.',
    blurb: 'Classic paddle duels against a smart AI or a friend on the same keyboard.',
    category: 'sports',
    tags: ['sports', 'classic', 'multiplayer', 'two-player', 'retro', 'paddle'],
    icon: '🏓',
    color: '#e2e8f0',
    gradient: ['#e2e8f0', '#64748b'],
    players: '1–2 players',
    difficulty: 'Easy',
    genre: 'Sports',
    featured: false,
    order: 8,
    controls: [
      { input: 'W / S', action: 'Move the left paddle' },
      { input: '↑ / ↓', action: 'Move the right paddle' },
      { input: 'Mouse', action: 'Move the left paddle' },
      { input: 'Space', action: 'Pause' },
    ],
    intro: [
      'Pong is where video games began: two paddles, one ball, and a scoreboard. The rules fit in a sentence, but the rallies can last for minutes once both players find the rhythm.',
      'This version offers three ways to play. In single-player mode the computer tracks the ball with a small amount of error, giving you a fair but beatable opponent. In two-player mode the left paddle uses W and S while the right uses the arrow keys, so two people can share a keyboard. On touch devices, each half of the screen controls its own paddle.',
      'The first player to seven points wins. The ball speeds up slightly after every hit, which keeps rallies from dragging on forever and rewards the player who takes control of the angle early.',
    ],
    howTo: [
      'Choose single-player or two-player mode before the match.',
      'Move your paddle up and down to intercept the ball.',
      'Hit the ball with the edge of the paddle to change its angle.',
      'Score a point by getting the ball past your opponent.',
      'The first player to seven points wins the match.',
    ],
    tips: [
      'Aim for the edges of the paddle to send the ball away at a sharp angle.',
      'Do not overcommit to one side; recover to the center after every hit.',
      'In two-player mode, aim for the corner furthest from your opponent.',
      'The ball accelerates on every hit, so end the rally before it gets too fast.',
    ],
    faq: [
      {
        q: 'Can two people play Pong on the same keyboard?',
        a: 'Yes. Select two-player mode and use W/S for the left paddle and the up/down arrows for the right paddle.',
      },
      {
        q: 'Can I play Pong unblocked at school?',
        a: 'Yes. It is a static HTML5 game with no downloads or plugins, built for Chromebooks and restricted networks.',
      },
      {
        q: 'How good is the computer opponent?',
        a: 'The AI tracks the ball with a small reaction delay and a limited maximum speed, so it is challenging but never perfect.',
      },
      {
        q: 'Does Pong work on a phone?',
        a: 'Yes. In single-player mode, drag anywhere on the left half of the screen. In two-player mode, each player controls their own half.',
      },
    ],
    related: ['penalty-shootout', 'breakout', 'snake', 'tetris'],
  },
  {
    slug: 'minesweeper',
    name: 'Minesweeper',
    h1: 'Minesweeper Unblocked',
    title: 'Minesweeper Unblocked — Play Free Logic Puzzle Online',
    metaDescription:
      'Play Minesweeper unblocked free. Clear the board without detonating a mine, use flags and numbers, and beat your best time on three difficulties.',
    tagline: 'Use logic, not luck, to clear the minefield.',
    blurb: 'Three difficulty levels, first-click safety and a timer for speed runs.',
    category: 'puzzle',
    tags: ['puzzle', 'classic', 'logic', 'numbers', 'brain'],
    icon: '💣',
    color: '#94a3b8',
    gradient: ['#94a3b8', '#475569'],
    players: '1 player',
    difficulty: 'Hard',
    genre: 'Puzzle',
    featured: false,
    order: 9,
    controls: [
      { input: 'Left click / tap', action: 'Reveal a cell' },
      { input: 'Right click / long press', action: 'Place or remove a flag' },
      { input: 'Double click', action: 'Chord a numbered cell' },
      { input: 'R', action: 'Restart the current board' },
    ],
    intro: [
      'Minesweeper is the purest logic game ever bundled with an operating system. Every number tells you how many mines touch that cell. From that single rule, a whole deduction tree grows: if a 1 touches only one hidden cell, that cell is a mine; if a 2 already touches two flags, every other neighbor is safe.',
      'This version starts you on a safe cell — the first click never explodes — and offers three board sizes: beginner, intermediate and expert. A timer runs from your first reveal, and your best time for each difficulty is saved on your device. Right-click (or long-press on touch) places a flag, and double-clicking a satisfied number automatically reveals its remaining neighbors.',
      'If you have never played before, start on beginner and resist the urge to guess. Almost every board can be solved with logic alone, and the habit of asking "what does this number already tell me?" is the entire game.',
    ],
    howTo: [
      'Click any cell to start — the first click is always safe.',
      'Read the numbers: each one counts the mines in the eight surrounding cells.',
      'Right-click or long-press a hidden cell to flag it as a mine.',
      'Reveal every safe cell to win the board.',
      'Use the difficulty buttons to switch between beginner, intermediate and expert.',
    ],
    tips: [
      'Flag mines as you identify them so you do not have to remember them.',
      'If a number already touches the right amount of flags, chord it to open the remaining neighbors.',
      'Start from the edges and corners; they have fewer neighbors and are easier to solve.',
      'Never guess until you have checked every number on the board twice.',
    ],
    faq: [
      {
        q: 'Is the first click always safe in Minesweeper?',
        a: 'Yes. The board is generated after your first click, and the clicked cell (plus its neighbors in most cases) is guaranteed not to contain a mine.',
      },
      {
        q: 'Can I play Minesweeper unblocked at school?',
        a: 'Yes. The game is pure HTML5 and JavaScript with no downloads or plugins, and it works on Chromebooks and restricted networks.',
      },
      {
        q: 'What do the numbers mean?',
        a: 'A number tells you how many mines are in the eight cells surrounding it. A 1 touches exactly one mine, a 2 touches two, and so on.',
      },
      {
        q: 'Does Minesweeper save my best time?',
        a: 'Yes. Best times are stored separately for beginner, intermediate and expert difficulty in your browser localStorage.',
      },
    ],
    related: ['sudoku', '2048', 'memory-match', 'chess'],
  },
  {
    slug: 'sudoku',
    name: 'Sudoku',
    h1: 'Sudoku Unblocked',
    title: 'Sudoku Unblocked — Play Free Sudoku Puzzles Online',
    metaDescription:
      'Play Sudoku unblocked free. Generate a fresh puzzle at easy, medium or hard difficulty, use notes and hints, and beat your best time. No download.',
    tagline: 'Fill every row, column and box with the digits 1 to 9.',
    blurb: 'Fresh generated puzzles, notes mode, hints and three difficulty levels.',
    category: 'puzzle',
    tags: ['puzzle', 'logic', 'numbers', 'brain', 'classic'],
    icon: '🔢',
    color: '#6366f1',
    gradient: ['#6366f1', '#8b5cf6'],
    players: '1 player',
    difficulty: 'Medium to hard',
    genre: 'Puzzle',
    featured: false,
    order: 10,
    controls: [
      { input: 'Click / tap', action: 'Select a cell' },
      { input: '1–9', action: 'Enter a digit' },
      { input: 'Backspace / 0', action: 'Clear the cell' },
      { input: 'N', action: 'Toggle notes mode' },
      { input: 'H', action: 'Reveal one hint' },
    ],
    intro: [
      'Sudoku is a deceptively simple logic puzzle: fill a 9×9 grid so that every row, every column and every 3×3 box contains the digits 1 through 9 exactly once. No arithmetic, no vocabulary, no luck — just deduction.',
      'This version generates a brand-new puzzle each time you start, with a proper uniqueness check so there is always exactly one solution. Three difficulty levels control how many digits are removed. Notes mode lets you pencil in candidates, the hint button reveals a single correct digit when you are truly stuck, and mistakes are counted so you can see how clean your solve was.',
      'The timer starts on your first input and your best time for each difficulty is saved locally. If you are new to Sudoku, start with easy and focus on "hidden singles": a digit that can only go in one cell within a row, column or box.',
    ],
    howTo: [
      'Select an empty cell by clicking or tapping it.',
      'Type a digit from 1 to 9, or use the on-screen number pad.',
      'Every row, column and 3×3 box must contain each digit exactly once.',
      'Use notes mode to pencil in possible candidates before committing.',
      'Use the hint button if you get stuck, and clear mistakes with Backspace.',
    ],
    tips: [
      'Scan each 3×3 box for a digit that can only fit in one cell.',
      'Use notes to track candidates instead of guessing.',
      'When a digit is placed, re-check its entire row, column and box.',
      'Hard puzzles often need pairs and pointing logic — look for two cells that share the same two candidates.',
    ],
    faq: [
      {
        q: 'Are the Sudoku puzzles randomly generated?',
        a: 'Yes. Every new game generates a fresh completed grid and removes digits while checking that the puzzle still has a unique solution.',
      },
      {
        q: 'Can I play Sudoku unblocked at school?',
        a: 'Yes. The puzzle runs entirely in the browser with no downloads, plugins or accounts, and it works on Chromebooks and restricted networks.',
      },
      {
        q: 'What does notes mode do?',
        a: 'Notes mode lets you write small candidate digits in a cell without committing to an answer. Toggle it with the N key or the Notes button.',
      },
      {
        q: 'Does Sudoku save my progress?',
        a: 'The current puzzle and your best times for each difficulty are stored in localStorage, so a refresh or tab switch does not lose your board.',
      },
    ],
    related: ['2048', 'minesweeper', 'chess', 'memory-match'],
  },
  {
    slug: 'chess',
    name: 'Chess',
    h1: 'Chess Unblocked',
    title: 'Chess Unblocked — Play Chess vs Computer Free Online',
    metaDescription:
      'Play Chess unblocked free. Full legal-move chess against a adjustable computer opponent, with undo, flip board and move history. No download required.',
    tagline: 'Full chess rules, a real opponent, zero downloads.',
    blurb: 'Complete legal chess with castling, en passant, promotion and an AI opponent.',
    category: 'puzzle',
    tags: ['puzzle', 'classic', 'strategy', 'board', 'chess'],
    icon: '♟️',
    color: '#d6b48a',
    gradient: ['#d6b48a', '#8b5a2b'],
    players: '1 player (vs AI)',
    difficulty: 'Medium to hard',
    genre: 'Strategy',
    featured: true,
    order: 11,
    controls: [
      { input: 'Click / tap', action: 'Select a piece, then a destination' },
      { input: 'U', action: 'Undo your last move' },
      { input: 'F', action: 'Flip the board' },
      { input: 'N', action: 'Start a new game' },
    ],
    intro: [
      'Chess is the deepest game in this collection. Every position is a small negotiation: you want to control the center, develop your pieces, keep your king safe and create threats faster than your opponent can answer them.',
      'This version implements the full rule set — castling, en passant, pawn promotion, check, checkmate, stalemate and the fifty-move draw — so the game behaves like real chess rather than a simplified approximation. You play White against a computer opponent with selectable strength. Legal moves are highlighted when you select a piece, and the move history uses standard algebraic notation.',
      'If you are learning, the undo button is your best friend. Play a move, see how the computer responds, take it back and try the alternative. That feedback loop is far more instructive than reading opening theory without a board.',
    ],
    howTo: [
      'Click one of your pieces to see its legal moves highlighted.',
      'Click a highlighted square to make the move.',
      'The computer replies automatically with White or Black depending on your color.',
      'Use the undo button to take back your last move and try a different plan.',
      'Checkmate the computer king to win; the game ends automatically.',
    ],
    tips: [
      'Control the center with pawns and knights early in the game.',
      'Do not move the same piece twice in the opening unless there is a concrete reason.',
      'Castle early to keep your king safe and connect your rooks.',
      'Before every move, check whether your opponent is threatening a piece or a check.',
    ],
    faq: [
      {
        q: 'Does this chess game follow all the official rules?',
        a: 'Yes. It supports castling, en passant, pawn promotion, checks, checkmate, stalemate and the fifty-move draw rule.',
      },
      {
        q: 'Can I play Chess unblocked at school?',
        a: 'Yes. The board and AI run entirely in the browser with no downloads, plugins or accounts, so it works on Chromebooks and school networks.',
      },
      {
        q: 'How strong is the computer opponent?',
        a: 'You can choose the difficulty. The easier level looks only a couple of moves ahead; the harder level searches deeper and punishes loose pieces.',
      },
      {
        q: 'Can I undo a move?',
        a: 'Yes. The undo button (or the U key) takes back your last move and the computer reply, so you can explore alternatives.',
      },
    ],
    related: ['tic-tac-toe', 'sudoku', 'minesweeper', '2048'],
  },
  {
    slug: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    h1: 'Tic-Tac-Toe Unblocked',
    title: 'Tic-Tac-Toe Unblocked — Play vs Computer or a Friend',
    metaDescription:
      'Play Tic-Tac-Toe unblocked for free. Challenge an unbeatable minimax computer or a friend on the same device. Instant HTML5, no download, works at school.',
    tagline: 'Three in a row, against a computer that never blinks.',
    blurb: 'The pocket classic with an unbeatable minimax AI and two-player mode.',
    category: 'puzzle',
    tags: ['puzzle', 'classic', 'multiplayer', 'strategy', 'board', 'two-player'],
    icon: '⭕',
    color: '#f472b6',
    gradient: ['#f472b6', '#8b5cf6'],
    players: '1–2 players',
    difficulty: 'Easy to learn, hard to beat',
    genre: 'Strategy',
    featured: false,
    order: 12,
    controls: [
      { input: 'Click / tap', action: 'Place your mark' },
      { input: '1–9', action: 'Place a mark with the keyboard' },
      { input: 'R', action: 'Start a new round' },
      { input: 'M', action: 'Switch game mode' },
    ],
    intro: [
      'Tic-Tac-Toe is the first strategy game most people ever learn: three marks in a row wins. It is also a perfect introduction to game AI, because the entire game tree is small enough to solve completely.',
      'The computer opponent here uses minimax with alpha-beta pruning, which means it plays perfectly. It will never fall for a trap and it will never miss a forced win. The best you can do against it is a draw — and learning how to force that draw is a genuinely useful lesson in threat detection.',
      'If you want a more relaxed game, switch to two-player mode and share the device. The board is large enough for touch, and keyboard shortcuts let you play with the number row.',
    ],
    howTo: [
      'Choose one-player or two-player mode.',
      'Click any empty square to place your mark.',
      'Players alternate between X and O.',
      'Line up three of your marks horizontally, vertically or diagonally to win.',
      'If all nine squares fill without a line, the round is a draw.',
    ],
    tips: [
      'Take the center square if you move first — it participates in four winning lines.',
      'If the center is taken, take a corner rather than an edge.',
      'Block an immediate threat before building your own line.',
      'Create a fork: two threats at once, so the opponent can only block one.',
    ],
    faq: [
      {
        q: 'Can you beat the computer in this Tic-Tac-Toe?',
        a: 'Not if it plays first, and not if you make a mistake when it plays second. The AI uses minimax, so the best possible result against it is a draw.',
      },
      {
        q: 'Can I play Tic-Tac-Toe unblocked at school?',
        a: 'Yes. The game is a static HTML5 page with no downloads or plugins and runs on Chromebooks and restricted networks.',
      },
      {
        q: 'Is there a two-player mode?',
        a: 'Yes. Switch to two-player mode to share the keyboard or touchscreen with a friend.',
      },
      {
        q: 'Does the game keep score?',
        a: 'Yes. Wins, losses and draws are tracked for the current session and shown below the board.',
      },
    ],
    related: ['chess', '2048', 'memory-match', 'sudoku'],
  },
  {
    slug: 'memory-match',
    name: 'Memory Match',
    h1: 'Memory Match Unblocked',
    title: 'Memory Match Unblocked — Free Memory Card Game Online',
    metaDescription:
      'Play Memory Match unblocked free. Flip cards, find matching pairs and clear the board in this colorful HTML5 memory game. Three board sizes, no download.',
    tagline: 'Flip two cards. Remember everything. Clear the board.',
    blurb: 'A bright, fast card-matching game with three board sizes and move counting.',
    category: 'puzzle',
    tags: ['puzzle', 'memory', 'brain', 'cards', 'casual'],
    icon: '🃏',
    color: '#14b8a6',
    gradient: ['#14b8a6', '#0ea5e9'],
    players: '1 player',
    difficulty: 'Easy',
    genre: 'Puzzle',
    featured: false,
    order: 13,
    controls: [
      { input: 'Click / tap', action: 'Flip a card' },
      { input: 'R', action: 'Restart the board' },
      { input: '1 / 2 / 3', action: 'Switch board size' },
    ],
    intro: [
      'Memory Match is the simplest possible test of working memory: turn over two cards, and if they match, keep them. The catch is that every miss gives you information you have to hold in your head while the board keeps expanding.',
      'This version offers three board sizes — 4×3, 4×4 and 5×4 — so you can start easy and work up to a board with twenty cards. Emoji artwork keeps the page lightweight and scales perfectly on every screen, while the move counter and timer give you a concrete way to measure improvement.',
      'There is no penalty for a wrong guess beyond the lost move, which makes the game a relaxed break rather than a stress test. The best scores for each board size are saved locally.',
    ],
    howTo: [
      'Click or tap a card to flip it face up.',
      'Flip a second card to look for a matching pair.',
      'If the two cards match, they stay face up.',
      'If they do not match, they flip back after a short delay.',
      'Clear every pair to finish the board.',
    ],
    tips: [
      'Say the position of each card out loud or in your head as you flip it.',
      'Start by flipping cards in a fixed pattern so you build a mental map.',
      'When you find a match, immediately recall the positions of the cards you saw before.',
      'Use the timer as motivation, but prioritize accuracy over speed.',
    ],
    faq: [
      {
        q: 'How many board sizes are available?',
        a: 'There are three: a 4×3 starter board with 12 cards, a 4×4 board with 16 cards, and a 5×4 board with 20 cards.',
      },
      {
        q: 'Can I play Memory Match unblocked at school?',
        a: 'Yes. The game is static HTML5 with no downloads or accounts, and it works on Chromebooks and restricted networks.',
      },
      {
        q: 'Does the game save my best score?',
        a: 'Yes. Your best move count and time for each board size are stored locally in your browser.',
      },
      {
        q: 'Is Memory Match good for kids?',
        a: 'Yes. The rules are simple enough for young children, and the difficulty scales with the board size.',
      },
    ],
    related: ['2048', 'sudoku', 'minesweeper', 'tic-tac-toe'],
  },
  {
    slug: 'sky-hopper',
    name: 'Sky Hopper',
    h1: 'Sky Hopper Unblocked',
    title: 'Sky Hopper Unblocked — Doodle Jump Style Game Free',
    metaDescription:
      'Play Sky Hopper unblocked free. Bounce up an endless tower of platforms, grab springs and dodge monsters in this Doodle Jump style HTML5 game. No download.',
    tagline: 'Bounce upward forever. Do not look down.',
    blurb: 'An endless vertical jumper with springs, moving platforms and monsters.',
    category: 'arcade',
    tags: ['arcade', 'jumping', 'endless', 'doodle', 'casual'],
    icon: '🦘',
    color: '#84cc16',
    gradient: ['#84cc16', '#10b981'],
    players: '1 player',
    difficulty: 'Medium',
    genre: 'Arcade',
    featured: false,
    order: 14,
    controls: [
      { input: '← → / A D', action: 'Move left and right' },
      { input: 'Tilt (mobile)', action: 'Steer with device tilt where supported' },
      { input: 'P', action: 'Pause' },
      { input: 'R', action: 'Restart' },
    ],
    intro: [
      'Sky Hopper is a Doodle Jump style endless climber. Your character bounces automatically, and you steer left and right to land on the next platform. Miss one and you fall off the bottom of the screen — but the platforms keep coming, so the only way is up.',
      'The game adds a few twists to the formula: springs launch you much higher, some platforms move sideways, and monsters patrol the higher levels. A wrap-around screen means you can disappear off the right edge and reappear on the left, which is often the fastest escape route.',
      'It is a game about small corrections. Do not hold a direction for too long; tap left or right to line up with the next platform, then let the bounce do the work. Your height is the score, and your best is saved locally.',
    ],
    howTo: [
      'Your character bounces automatically on every platform.',
      'Use the left and right arrow keys (or A and D) to steer.',
      'Land on a platform to bounce higher.',
      'Grab springs for a big boost and avoid the monsters.',
      'Keep climbing — falling off the bottom ends the run.',
    ],
    tips: [
      'Make small steering corrections rather than holding a direction.',
      'Aim for the center of a platform so the next bounce is predictable.',
      'Use the screen wrap when a platform is too far to reach normally.',
      'Do not chase a spring if it pulls you toward a monster.',
    ],
    faq: [
      {
        q: 'Is Sky Hopper the same as Doodle Jump?',
        a: 'It is an original HTML5 game inspired by the endless vertical jumper formula, with its own art, platform types and scoring.',
      },
      {
        q: 'Can I play Sky Hopper unblocked at school?',
        a: 'Yes. It is a static HTML5 game with no downloads or plugins, designed for Chromebooks and school networks.',
      },
      {
        q: 'How is the score calculated?',
        a: 'Your score is the maximum height you reach, measured in meters. Your best height is saved on your device.',
      },
      {
        q: 'Does it work on a phone?',
        a: 'Yes. Use the on-screen left and right buttons, or swipe to steer. The game scales to fit the screen.',
      },
    ],
    related: ['flappy-bird', 'neon-slope', 'snake', 'stack-master'],
  },
  {
    slug: 'neon-slope',
    name: 'Neon Slope',
    h1: 'Neon Slope Unblocked',
    title: 'Neon Slope Unblocked — Play the Endless Neon Runner Free',
    metaDescription:
      'Play Neon Slope unblocked free. Steer a glowing ball down an endless neon track, dodge barriers and chase a high score in this fast HTML5 runner.',
    tagline: 'One glowing ball. One endless neon track. No brakes.',
    blurb: 'A fast pseudo-3D endless runner with neon visuals and escalating speed.',
    category: 'action',
    tags: ['action', 'runner', 'endless', 'slope', 'reflex', 'neon'],
    icon: '🟢',
    color: '#22d3ee',
    gradient: ['#22d3ee', '#a855f7'],
    players: '1 player',
    difficulty: 'Hard',
    genre: 'Action',
    featured: true,
    order: 15,
    controls: [
      { input: '← → / A D', action: 'Steer left and right' },
      { input: 'Space / ↑', action: 'Jump over low barriers' },
      { input: 'Swipe', action: 'Steer and jump on touch screens' },
      { input: 'P', action: 'Pause' },
    ],
    intro: [
      'Neon Slope is a love letter to the "Slope" genre: a glowing ball hurtling down an endless track, barriers rushing toward the camera, and a speed counter that never stops climbing. One wrong lane change ends the run, which is exactly why the restart button is always one key away.',
      'The game uses a pseudo-3D perspective projection to create the illusion of depth without any WebGL dependency. The track curves through a neon grid, obstacles are rendered as solid blocks, and the whole scene gets faster and denser the longer you survive.',
      'Steering is forgiving at low speeds and twitchy at high speeds, so the real skill is looking far ahead rather than at the ball. Jump timing matters on low barriers; on high barriers, the only option is a clean lane change.',
    ],
    howTo: [
      'The ball accelerates automatically down the track.',
      'Press the left and right arrows to steer between lanes.',
      'Press Space or the up arrow to jump over low barriers.',
      'Change lanes to avoid tall barriers that cannot be jumped.',
      'Survive as long as possible — the score is your distance.',
    ],
    tips: [
      'Look at the far end of the track, not at the ball.',
      'Change lanes early; late corrections are much harder at high speed.',
      'Jump only for low barriers — jumping into a tall one is fatal.',
      'Stay near the center lane so you have an escape route on both sides.',
    ],
    faq: [
      {
        q: 'Is Neon Slope the same as Slope?',
        a: 'It is an original game inspired by the endless slope runner genre, with its own pseudo-3D renderer, obstacle patterns and neon art style.',
      },
      {
        q: 'Can I play Neon Slope unblocked at school?',
        a: 'Yes. It is a self-contained HTML5 canvas game with no downloads, plugins or WebGL requirement, so it runs on Chromebooks and restricted networks.',
      },
      {
        q: 'How does the difficulty increase?',
        a: 'The forward speed rises continuously, the spacing between obstacles tightens, and new barrier patterns appear as your distance grows.',
      },
      {
        q: 'Does Neon Slope work on mobile?',
        a: 'Yes. Swipe left and right to steer, and swipe up to jump. The canvas scales to fit the screen.',
      },
    ],
    related: ['flappy-bird', 'space-invaders', 'sky-hopper', 'breakout'],
  },
  {
    slug: 'penalty-shootout',
    name: 'Penalty Shootout',
    h1: 'Penalty Shootout Unblocked',
    title: 'Penalty Shootout Unblocked — Free Football Penalty Game',
    metaDescription:
      'Play Penalty Shootout unblocked free. Aim, power up and beat the goalkeeper in a five-round football penalty game. Instant HTML5, works at school.',
    tagline: 'Five kicks. One keeper. Make them count.',
    blurb: 'A five-round penalty duel with aiming, power and a diving goalkeeper.',
    category: 'sports',
    tags: ['sports', 'football', 'soccer', 'penalty', 'reflex'],
    icon: '⚽',
    color: '#ef4444',
    gradient: ['#ef4444', '#f59e0b'],
    players: '1 player',
    difficulty: 'Medium',
    genre: 'Sports',
    featured: false,
    order: 16,
    controls: [
      { input: 'Mouse / touch', action: 'Aim your shot' },
      { input: 'Hold and release', action: 'Set power' },
      { input: '← →', action: 'Move the aim with the keyboard' },
      { input: 'Space', action: 'Shoot' },
    ],
    intro: [
      'Penalty Shootout compresses football into its most tense moment: the ball on the spot, the keeper on the line, and a whole shootout resting on where you place the next kick. You get five attempts to score more than the computer.',
      'Aim with the mouse or your finger, then use the power meter to decide between a careful placement and a rocket into the corner. The keeper dives based on a mix of reading your aim and a little randomness, so no two shootouts feel the same. Sudden death kicks in if the scores are level after five rounds.',
      'It is quick, replayable, and surprisingly tense for a two-minute game. The best shootout score is saved locally.',
    ],
    howTo: [
      'Move the crosshair to choose where to aim.',
      'Hold the mouse button or your finger to charge the power meter.',
      'Release to strike the ball.',
      'Score more goals than the computer after five rounds to win.',
      'If the score is tied, the shootout goes to sudden death.',
    ],
    tips: [
      'Aim for the top corners — they are the hardest places for a keeper to reach.',
      'Do not max out the power bar every time; placement beats raw power.',
      'Watch the keeper before you shoot to see which way they are leaning.',
      'Stay calm in sudden death; the same rules apply.',
    ],
    faq: [
      {
        q: 'How many rounds are in a Penalty Shootout?',
        a: 'The main shootout is five rounds per side. If the score is tied after five, it continues into sudden death until one side misses.',
      },
      {
        q: 'Can I play Penalty Shootout unblocked at school?',
        a: 'Yes. It is a static HTML5 game with no downloads or plugins and runs on Chromebooks and restricted networks.',
      },
      {
        q: 'Does the goalkeeper learn my patterns?',
        a: 'The keeper mixes a read of your aim with randomness, so repeating the same corner is risky but not automatically punished every time.',
      },
      {
        q: 'Does it work on a phone?',
        a: 'Yes. Aim and shoot entirely with touch: drag to aim and hold to charge power.',
      },
    ],
    related: ['pong', 'neon-slope', 'sky-hopper', 'flappy-bird'],
  },
  {
    slug: 'cookie-clicker',
    name: 'Cookie Clicker',
    h1: 'Cookie Clicker Unblocked',
    title: 'Cookie Clicker Unblocked — Free Idle Clicker Game Online',
    metaDescription:
      'Play Cookie Clicker unblocked free. Click the cookie, buy producers and upgrades, and build an idle cookie empire that saves automatically. No download.',
    tagline: 'Click a cookie. Buy a grandma. Repeat until the numbers break.',
    blurb: 'A full idle clicker with producers, upgrades, milestones and auto-save.',
    category: 'idle',
    tags: ['idle', 'clicker', 'cookie', 'casual', 'numbers'],
    icon: '🍪',
    color: '#f59e0b',
    gradient: ['#f59e0b', '#d97706'],
    players: '1 player',
    difficulty: 'Easy',
    genre: 'Idle',
    featured: true,
    order: 17,
    controls: [
      { input: 'Click / tap', action: 'Bake a cookie' },
      { input: 'Number keys', action: 'Buy the matching producer' },
      { input: 'S', action: 'Save the game now' },
      { input: 'R', action: 'Reset with confirmation' },
    ],
    intro: [
      'Cookie Clicker is the archetypal idle game. You start with a single cookie and a click. Before long you have a cursor that clicks for you, a grandma that bakes in the background, and a farm that produces cookies while you are thinking about something else entirely.',
      'This version includes a proper progression tree: eight producers, a set of upgrades that multiply output, milestone bonuses and a rolling cookies-per-second counter. Everything is saved to localStorage every few seconds, so your empire survives a refresh, a tab close or a trip to the next class.',
      'The appeal is the curve. Early on, every click matters. Later, the game plays itself and your job becomes deciding which producer gives the best return for the cookies you have. If you have never played an idle game before, buy the cheapest producer that still looks meaningful and let the compounding do the work.',
    ],
    howTo: [
      'Click the big cookie to bake your first cookies.',
      'Spend cookies on producers such as cursors and grandmas.',
      'Each producer generates cookies automatically every second.',
      'Buy upgrades to multiply the output of your best producers.',
      'Leave the tab open and your bakery keeps growing.',
    ],
    tips: [
      'Buy the cheapest producer that meaningfully increases your cookies per second.',
      'Upgrades that double a producer are usually worth more than a new producer early on.',
      'Check back after a few minutes — idle income compounds quickly.',
      'Use the save button before closing the tab if you have made a big purchase.',
    ],
    faq: [
      {
        q: 'Does Cookie Clicker keep earning while the tab is closed?',
        a: 'The game saves your progress, and on your next visit it credits a limited amount of offline production based on your cookies per second.',
      },
      {
        q: 'Can I play Cookie Clicker unblocked at school?',
        a: 'Yes. It is a static HTML5 game with no downloads, plugins or accounts, and it runs on Chromebooks and restricted networks.',
      },
      {
        q: 'How many producers are there?',
        a: 'There are eight producer tiers, from cursors and grandmas up to factories and portals, plus upgrades that multiply their output.',
      },
      {
        q: 'Is my progress saved?',
        a: 'Yes. The game auto-saves to your browser localStorage every few seconds, and you can force a save with the S key.',
      },
    ],
    related: ['2048', 'memory-match', 'stack-master', 'snake'],
  },
  {
    slug: 'stack-master',
    name: 'Stack Master',
    h1: 'Stack Master Unblocked',
    title: 'Stack Master Unblocked — Free Stacking Tower Game Online',
    metaDescription:
      'Play Stack Master unblocked free. Time your drops, build a perfect tower and chase a high score in this minimalist HTML5 stacking game. No download.',
    tagline: 'Drop the block. Keep the tower perfectly aligned.',
    blurb: 'A one-button stacking game with perfect-drop combos and rising tension.',
    category: 'arcade',
    tags: ['arcade', 'stack', 'timing', 'minimal', 'one-button'],
    icon: '🧊',
    color: '#3b82f6',
    gradient: ['#3b82f6', '#06b6d4'],
    players: '1 player',
    difficulty: 'Easy to learn',
    genre: 'Arcade',
    featured: false,
    order: 18,
    controls: [
      { input: 'Space / click / tap', action: 'Drop the moving block' },
      { input: 'P', action: 'Pause' },
      { input: 'R', action: 'Restart the tower' },
    ],
    intro: [
      'Stack Master is a one-button game with a deceptively high skill ceiling. A block slides back and forth above the tower. Tap to drop it. Whatever hangs over the edge is sliced off, so the tower gets narrower with every imperfect drop — until there is nothing left to land on.',
      'Perfect drops are the heart of the game. Land a block exactly on the one below and you get a combo, a small visual flourish and a score bonus. Chain several perfect drops and the tower stays wide, giving you more room to recover when your timing slips.',
      'The game is played with a single key, click or tap, which makes it ideal for a quick break on any device. Your best height is saved locally.',
    ],
    howTo: [
      'A block slides left and right above the tower.',
      'Press Space, click or tap to drop it.',
      'Land as much of the block as possible on the tower below.',
      'Perfect drops keep the full block and build a combo.',
      'Keep stacking until the tower becomes too narrow and you miss.',
    ],
    tips: [
      'Watch the edge of the block, not the center.',
      'Aim for perfect drops early, while the block is still wide.',
      'Use the shadow of the block to judge alignment.',
      'Do not rush — the block speed is constant, so patience is free.',
    ],
    faq: [
      {
        q: 'How do I get a perfect drop in Stack Master?',
        a: 'Drop the block so its edges align exactly with the block below. A perfect drop keeps the full width, adds a combo bonus and is signaled by a flash.',
      },
      {
        q: 'Can I play Stack Master unblocked at school?',
        a: 'Yes. It is a static HTML5 game with no downloads or plugins and works on Chromebooks and restricted networks.',
      },
      {
        q: 'Does Stack Master save my high score?',
        a: 'Yes. Your best tower height is stored locally in your browser.',
      },
      {
        q: 'Does it work on mobile?',
        a: 'Yes. Tap anywhere on the game area to drop the block. The game is designed for portrait and landscape screens.',
      },
    ],
    related: ['tetris', '2048', 'flappy-bird', 'breakout'],
  },
  {
    slug: 'connect-four',
    name: 'Connect Four',
    h1: 'Connect Four Unblocked',
    title: 'Connect Four Unblocked — Play 2 Player or vs Computer',
    metaDescription:
      'Play Connect Four unblocked free. Drop discs, connect four in a row and beat a friend or the computer. Full 7×6 board, instant HTML5, no download.',
    tagline: 'Drop, connect four, and block your opponent.',
    blurb: 'The classic disc-dropping strategy game for one or two players.',
    category: 'multiplayer',
    tags: ['multiplayer', 'two-player', 'strategy', 'board', 'classic', 'connect-four', 'brain'],
    icon: '🔴',
    color: '#ef4444',
    gradient: ['#ef4444', '#facc15'],
    players: '1–2 players',
    difficulty: 'Easy to learn',
    genre: 'Strategy',
    featured: true,
    order: 19,
    controls: [
      { input: 'Click / tap a column', action: 'Drop your disc' },
      { input: '1–7', action: 'Drop in that column' },
      { input: 'Mode buttons', action: 'Switch 1-player / 2-player' },
      { input: 'R', action: 'Start a new round' },
    ],
    intro: [
      'Connect Four is the rare two-player game that works equally well as a 30-second break and a 30-minute grudge match. Seven columns, six rows, one rule: drop a disc and try to line up four of your color before your opponent does.',
      'This version includes a real minimax computer opponent at three difficulty levels and a local two-player mode for sharing a keyboard or touchscreen. Discs fall with an animation, the winning line is highlighted, and the scoreboard tracks the session.',
      'The strategy is deeper than it looks. The center column gives you the most ways to build a line, and the best moves create two threats at once — a fork that the opponent can only block on one side. Learning to spot those forks is the difference between a casual round and a winning streak.',
    ],
    howTo: [
      'Choose one-player or two-player mode at the top of the board.',
      'Click a column, tap it, or press a number from 1 to 7.',
      'Your disc falls to the lowest empty slot in that column.',
      'Connect four discs horizontally, vertically or diagonally to win.',
      'Block the opponent’s three-in-a-row before building your own.',
    ],
    tips: [
      'Start in the center column — it participates in the most winning lines.',
      'Look for moves that create two threats at once; one can always be blocked.',
      'Do not play directly under a column where the opponent already has three.',
      'Scan diagonals as carefully as rows and columns; most wins are diagonal.',
    ],
    faq: [
      {
        q: 'Can two people play Connect Four on the same device?',
        a: 'Yes. Select two-player mode and share the keyboard or touchscreen. Player 1 drops red discs and Player 2 drops yellow discs.',
      },
      {
        q: 'How strong is the computer opponent?',
        a: 'The computer uses minimax with alpha-beta pruning. Easy looks a couple of moves ahead, medium searches deeper, and hard punishes loose moves quickly.',
      },
      {
        q: 'Can I play Connect Four unblocked at school?',
        a: 'Yes. It is a static HTML5 game with no downloads, plugins or accounts, and it runs on Chromebooks and restricted networks.',
      },
      {
        q: 'Does Connect Four save my score?',
        a: 'Session wins are tracked while the page is open, and your best win total is saved locally in your browser.',
      },
    ],
    related: ['tic-tac-toe', 'chess', 'pong', 'air-hockey'],
  },
  {
    slug: 'air-hockey',
    name: 'Air Hockey',
    h1: 'Air Hockey Unblocked',
    title: 'Air Hockey Unblocked — Play 2 Player Air Hockey Online',
    metaDescription:
      'Play Air Hockey unblocked free. Fast two-player table hockey with neon paddles, real puck physics and a smart CPU. Same keyboard or touch, no download.',
    tagline: 'Fast paddles, bouncing puck, first to seven.',
    blurb: 'Neon table hockey for two players or against a quick CPU.',
    category: 'multiplayer',
    tags: ['multiplayer', 'two-player', 'sports', 'arcade', 'air-hockey', 'physics'],
    icon: '🏒',
    color: '#22d3ee',
    gradient: ['#22d3ee', '#a855f7'],
    players: '1–2 players',
    difficulty: 'Medium',
    genre: 'Sports',
    featured: true,
    order: 20,
    controls: [
      { input: 'W / S', action: 'Move the left paddle' },
      { input: '↑ / ↓', action: 'Move the right paddle' },
      { input: 'Mouse / touch', action: 'Drag either half of the table' },
      { input: 'Space', action: 'Pause or resume' },
    ],
    intro: [
      'Air Hockey takes the idea of Pong and gives it weight. The puck has momentum, the paddles can smash it, and a well-timed angle can turn defence into a goal in half a second. It is one of the best two-player games for a shared keyboard because both players are doing something at every moment.',
      'This version uses a proper puck physics loop: elastic collisions, paddle momentum, friction and goal detection. Play against a computer that tracks the puck and defends its goal, or switch to two-player mode for a same-keyboard duel. On touch devices, each player drags their own half of the table.',
      'The first player to seven goals wins. The puck speeds up after each paddle hit, so long rallies become genuinely tense. If you are learning the game, focus on hitting the puck with the edge of the paddle and recovering to the center of the goal after every shot.',
    ],
    howTo: [
      'Choose one-player or two-player mode above the table.',
      'Move your paddle up and down to intercept the puck.',
      'Hit the puck with the edge of the paddle to change its angle.',
      'Score by sending the puck into the opponent’s goal slot.',
      'The first player to seven goals wins the match.',
    ],
    tips: [
      'Recover to the center of your goal after every shot.',
      'Hit the puck on the side away from your goal to send it toward the corner.',
      'Do not chase the puck into the corner — let it come back to you.',
      'In two-player mode, aim for the corner furthest from the opponent’s paddle.',
    ],
    faq: [
      {
        q: 'Can two people play Air Hockey on one keyboard?',
        a: 'Yes. Player 1 uses W and S to move the left paddle, while Player 2 uses the up and down arrows to move the right paddle.',
      },
      {
        q: 'Can I play Air Hockey unblocked at school?',
        a: 'Yes. The game is HTML5 canvas and JavaScript with no downloads or plugins, and it runs on Chromebooks and school networks.',
      },
      {
        q: 'How good is the computer opponent?',
        a: 'The CPU tracks the puck with a speed limit and returns to a defensive position when the puck is on the other side of the table. It is beatable with angle shots.',
      },
      {
        q: 'Does Air Hockey work on a phone?',
        a: 'Yes. Drag anywhere on your half of the table to move your paddle. The table scales to fit the screen.',
      },
    ],
    related: ['pong', 'connect-four', 'penalty-shootout', 'neon-slope'],
  },
  ...EXTRA_GAMES,
];

// Image assets are generated per game; the build falls back to the emoji
// artwork if a file is missing.
const PLAY_COUNTS = {
  '2048': 186400,
  snake: 142800,
  tetris: 128600,
  'connect-four': 112400,
  'pac-man': 96400,
  chess: 88700,
  'neon-slope': 84200,
  'flappy-bird': 76900,
  'cookie-clicker': 71500,
  'air-hockey': 67400,
  breakout: 63800,
  'space-invaders': 59200,
  minesweeper: 54800,
  sudoku: 51300,
  'sky-hopper': 47600,
  'stack-master': 43900,
  'memory-match': 38700,
  'penalty-shootout': 35200,
  'tic-tac-toe': 32400,
  pong: 29800,
  blackjack: 93600,
  checkers: 82400,
  'snake-duel': 71300,
  asteroids: 68900,
  frogger: 54200,
  reversi: 48600,
};

GAMES.forEach((game) => {
  game.image = `/assets/img/games/${game.slug}-card.jpg`;
  game.ogImage = `/assets/img/games/${game.slug}-og.jpg`;
  game.iconImage = `/assets/img/games/${game.slug}-icon.jpg`;
  game.plays = PLAY_COUNTS[game.slug] || 0;
});

export const GAME_COUNT = GAMES.length;

export const getGame = (slug) => GAMES.find((g) => g.slug === slug);

export const gamesByCategory = (category) =>
  GAMES.filter((g) => g.category === category || (g.tags || []).includes(category));

export const featuredGames = () =>
  GAMES.filter((g) => g.featured).sort((a, b) => a.order - b.order);

export const categoryName = catName;

export const relatedGames = (game, limit = 4) =>
  (game.related || [])
    .map(getGame)
    .filter(Boolean)
    .slice(0, limit);
