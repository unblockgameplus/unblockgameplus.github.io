// Category-level copy for the large third-party catalogue. Each page still
// gets a unique title, image, category and related links; these templates keep
// hundreds of pages useful without shipping empty thin pages.

export const EXTERNAL_COPY = {
  puzzle: {
    paragraphs: [
      '{{title}} is a browser puzzle game in the Unblocked Games G+ catalogue. It is built around a simple rule set that becomes more interesting the longer you play, and it runs in a single HTML5 frame without a download or account.',
      'Puzzle games are a good fit for a short break because they do not demand constant reflexes. You can think for a few seconds, make a move, and come back to the same board later. If the external host is blocked on your network, use the local fallback game linked on this page.',
    ],
    howTo: [
      'Click or tap Play to load the game, then use the on-screen instructions.',
      'Most puzzle games use the mouse, arrow keys or WASD; check the game frame for its exact controls.',
      'Take your time and look for the move that improves your position rather than the first move available.',
      'Use fullscreen if the game board is small, and reload the frame if the game gets stuck.',
    ],
    tips: [
      'Start with the simplest move and work toward the bigger chain or combo.',
      'Keep the board tidy; a clean layout leaves more options later.',
      'If you are stuck, restart and try a different opening route.',
      'Play in fullscreen to see the whole board on a Chromebook screen.',
    ],
    faq: [
      ['Can I play {{title}} unblocked at school?', 'This page is a static HTML5 wrapper and the game is loaded in an iframe. If your school blocks the external game host, use the local fallback game linked on this page or try another game in the same category.'],
      ['Do I need an account?', 'No. There is no sign-up, no login and no download. The game runs directly in the browser.'],
      ['Does {{title}} work on a phone?', 'Yes, if the game supports touch controls. The frame scales to the screen; for mouse-heavy games a Chromebook or desktop is more comfortable.'],
      ['What should I do if the game does not load?', 'Wait a few seconds, press Reload or Open in new tab, then use the local fallback if the external host is unavailable.'],
    ],
  },
  arcade: {
    paragraphs: [
      '{{title}} is an arcade-style browser game in our catalogue: quick to start, easy to understand, and designed around a one-more-run loop. It runs in an HTML5 iframe and needs no installation.',
      'Arcade games are best played in short bursts. The controls are usually a few keys or a single pointer, and the challenge comes from timing and pattern reading rather than a long tutorial.',
    ],
    howTo: [
      'Press Play to load the game, then click the game frame once to give it keyboard focus.',
      'Use the arrow keys, WASD, mouse or touch controls shown by the game.',
      'Restart quickly after a failed run and treat each attempt as a short practice round.',
      'Use fullscreen for a bigger play area and fewer accidental page scrolls.',
    ],
    tips: [
      'Learn the first obstacle pattern before chasing a high score.',
      'Small, early inputs are easier to correct than one large last-second move.',
      'Take a short break after a few runs; arcade games punish tired hands.',
      'Try the local fallback game if you want a guaranteed offline-friendly version.',
    ],
    faq: [
      ['Can I play {{title}} unblocked at school?', 'The wrapper is static and works on Chromebooks, but the external game host may be filtered on some networks. If it is, use the fallback game on this page.'],
      ['Does {{title}} save my score?', 'That depends on the external game. Some use browser storage, some use their own servers, and some do not save scores at all. Our local fallback games always save the high score on your device.'],
      ['Does it work on a phone?', 'Many arcade games include touch controls. Open the game and check the on-screen prompts; if it is keyboard-only, use a Chromebook or desktop.'],
      ['Why is the game in an iframe?', 'The iframe isolates the third-party game from the rest of the site, so a slow or broken game does not slow down the catalogue page.'],
    ],
  },
  action: {
    paragraphs: [
      '{{title}} is an action game in the Unblocked Games G+ catalogue. Expect fast decisions, moving targets and a restart button that gets used often. The game is served in an HTML5 iframe with no installer.',
      'Action games are more fun when you learn the rhythm of the level rather than reacting to every pixel. Watch the pattern once, then commit to the next move. If the external host is unavailable, the local action fallback is only one click away.',
    ],
    howTo: [
      'Press Play, then click the game once so keyboard input reaches it.',
      'Use the controls shown in the frame: usually WASD, arrow keys, mouse or touch.',
      'Stay moving and keep an escape route open.',
      'Reload the frame if the game freezes, or use Open in new tab.',
    ],
    tips: [
      'Learn one enemy or obstacle pattern at a time.',
      'Do not corner yourself chasing a bonus.',
      'Use fullscreen so the edge of the playfield is visible.',
      'If the external game is blocked, switch to the local fallback rather than fighting the network.',
    ],
    faq: [
      ['Can I play {{title}} unblocked at school?', 'The page itself is static, but the game is hosted externally. Some school filters block game hosts; if that happens, use the local fallback linked on this page.'],
      ['Is {{title}} free?', 'Yes. There is no purchase, account or paywall on this page.'],
      ['Does it work with a keyboard?', 'Most action games do. Click the frame first so it receives focus, then use the controls shown by the game.'],
      ['What if the game is too small?', 'Use the Fullscreen button above the frame, or open the game in a new tab.'],
    ],
  },
  sports: {
    paragraphs: [
      '{{title}} is a sports game in our browser catalogue. The rules are usually a compact version of the real thing: score, defend, and try to read your opponent before they move. It runs in an HTML5 iframe with no download.',
      'Sports games work well as a shared-screen break. Some support two players on one keyboard; others are solo score attacks. Check the game frame for its exact controls and player count.',
    ],
    howTo: [
      'Press Play to load the game and click the frame once to focus it.',
      'Read the control hint inside the game before the first round.',
      'On a shared keyboard, give each player a separate side of the keyboard.',
      'Use fullscreen for a bigger court or pitch.',
    ],
    tips: [
      'Aim for the open space rather than the opponent.',
      'Recover to a neutral position after every shot.',
      'Short, controlled inputs beat panic mashing.',
      'If the external game does not load, try the local sports fallback.',
    ],
    faq: [
      ['Can two people play {{title}} on one device?', 'That depends on the game. If the frame shows local multiplayer controls, both players can share the keyboard or touchscreen.'],
      ['Can I play {{title}} unblocked at school?', 'The wrapper is static, but the external host may be filtered. Use the fallback game if the frame stays blank.'],
      ['Does the game save progress?', 'Only if the external game implements it. Our local fallback games save scores in your browser.'],
      ['Does it work on mobile?', 'Many sports games support touch. Check the in-game prompt; if not, use a Chromebook or desktop.'],
    ],
  },
  classic: {
    paragraphs: [
      '{{title}} is one of the classic-style games in the Unblocked Games G+ catalogue. These are the games people already know: simple rules, short rounds, and a score worth chasing. The game is loaded in an HTML5 frame.',
      'Because the rules are familiar, the fun comes from execution rather than explanation. Start a round, learn the timing, and use the restart button freely. If the external host is blocked, our local classic fallback is available below.',
    ],
    howTo: [
      'Press Play to load the game, then click the frame to focus it.',
      'Use the keyboard or pointer controls shown by the game.',
      'Play a short round to learn the timing before chasing a score.',
      'Use fullscreen and reload the frame if needed.',
    ],
    tips: [
      'Learn the basic pattern first; speed comes later.',
      'Keep your inputs deliberate rather than constant.',
      'Use the local fallback for a version that always loads.',
      'Compare your score with the local version to see which control scheme you prefer.',
    ],
    faq: [
      ['Is {{title}} the original game?', 'No. This page embeds a third-party browser version. The name is used descriptively; trademarks belong to their owners.'],
      ['Can I play {{title}} unblocked at school?', 'The wrapper is static, but the game host may be filtered. Use the fallback if the frame does not load.'],
      ['Does it save my high score?', 'That depends on the external game. Our local fallback saves high scores in localStorage.'],
      ['Does it work on a Chromebook?', 'Yes, as long as the external game host is reachable. The page itself is lightweight and static.'],
    ],
  },
  idle: {
    paragraphs: [
      '{{title}} is an idle or clicker-style game in our catalogue. The loop is simple: click, buy an upgrade, and watch the numbers grow. It runs in the browser and does not require an account.',
      'Idle games are designed to be left running while you do something else. Check back after a few minutes, buy the next producer, and repeat. If the external host is unavailable, our local Cookie Clicker fallback is always available.',
    ],
    howTo: [
      'Press Play and click the main object to earn the first resource.',
      'Spend the resource on the first producer or upgrade.',
      'Leave the tab open to keep earning automatically.',
      'Reload the page if the game stops updating.',
    ],
    tips: [
      'Buy the cheapest upgrade that meaningfully increases your output.',
      'Do not spend everything at once; keep a reserve for the next tier.',
      'Check back after a few minutes instead of clicking constantly.',
      'Use the local fallback if the external game host is blocked.',
    ],
    faq: [
      ['Does {{title}} keep running while the tab is closed?', 'That depends on the external game. Some save progress locally, some use a server, and some stop when the tab closes.'],
      ['Can I play {{title}} unblocked at school?', 'The wrapper is static, but the game host may be filtered. If it does not load, use the local fallback.'],
      ['Is it free?', 'Yes. There is no purchase or account on this page.'],
      ['Will it drain my battery?', 'Idle games can keep a tab busy. Close the tab when you are done or use the local fallback, which pauses when the tab is hidden.'],
    ],
  },
  multiplayer: {
    paragraphs: [
      '{{title}} is a two-player or multiplayer game in the Unblocked Games G+ catalogue. You can usually share one keyboard or one touchscreen, so there is no lobby and no second account to create.',
      'Local multiplayer is the fastest way to turn a break into a competition. Check the in-game controls for which player uses which keys, then play a short round to learn the pace. If the external host is blocked, try the local two-player fallback games.',
    ],
    howTo: [
      'Press Play, then click the game frame once to focus it.',
      'Check which player uses WASD and which uses the arrow keys.',
      'Agree on a score target or round limit before you start.',
      'Use fullscreen so both players can see the whole playfield.',
    ],
    tips: [
      'Give each player a separate side of the keyboard.',
      'Play a practice round before starting a serious match.',
      'Use fullscreen to avoid accidental page scrolling.',
      'Try the local fallback if the external game does not load.',
    ],
    faq: [
      ['Can two people play {{title}} on one keyboard?', 'Many two-player games support WASD for player one and the arrow keys for player two. Check the controls shown in the frame.'],
      ['Does {{title}} work on a phone?', 'Some two-player games support touch on each half of the screen; others need a keyboard. Check the in-game prompt.'],
      ['Can I play {{title}} unblocked at school?', 'The wrapper is static, but the external game host may be filtered. Use the fallback if the frame stays blank.'],
      ['Is there a single-player mode?', 'That depends on the game. If not, try one of our local games against the computer.'],
    ],
  },
  racing: {
    paragraphs: [
      '{{title}} is a racing game in the Unblocked Games G+ catalogue. Expect a quick arcade handling model rather than a full simulation: brake late, hit the apex, and get back on the throttle without losing the rear.',
      'Browser racing games are short by design. Learn the first corner, then the second, and restart when a run goes wrong. If the external game host is blocked, our local Neon Slope fallback is a good substitute.',
    ],
    howTo: [
      'Press Play, then click the frame so keyboard input reaches the game.',
      'Accelerate with the up arrow or W, brake with the down arrow or S, steer with left and right.',
      'Brake before the corner, not in the middle of it.',
      'Use fullscreen for a wider view of the road.',
    ],
    tips: [
      'Smooth inputs are faster than constant corrections.',
      'Brake in a straight line, then turn.',
      'Learn one track or route before chasing a time.',
      'If the external game is blocked, try the local Neon Slope fallback.',
    ],
    faq: [
      ['Can I play {{title}} unblocked at school?', 'The wrapper is static, but the game host may be filtered. Use the local fallback if the frame does not load.'],
      ['Does it work with a keyboard?', 'Most browser racers use arrow keys or WASD. Click the frame first so it receives focus.'],
      ['Is there a two-player mode?', 'Some racing games support local multiplayer; check the in-game prompt.'],
      ['Does it save my best time?', 'That depends on the external game. Our local fallback saves a best distance or score in your browser.'],
    ],
  },
  shooting: {
    paragraphs: [
      '{{title}} is a shooting game in our browser catalogue. The focus is aiming, positioning and target priority. These games are usually wave-based or score-based, so a short run is enough to learn the pace.',
      'Shooting games reward patience. Line up the shot before you commit, keep moving between shots, and do not chase a target into a worse position. If the external host is blocked, our local Space Invaders and Asteroids fallbacks are available.',
    ],
    howTo: [
      'Press Play and click the frame once to focus it.',
      'Aim with the mouse or arrow keys, depending on the game.',
      'Fire with the left mouse button, Space, or the control shown in-game.',
      'Use fullscreen for a larger view of the target area.',
    ],
    tips: [
      'Aim before you fire rather than spraying.',
      'Keep moving between shots.',
      'Prioritise the target closest to your position.',
      'Use the local fallback if the external game host is blocked.',
    ],
    faq: [
      ['Can I play {{title}} unblocked at school?', 'The page is static, but the external game host may be filtered. Use the fallback if the frame does not load.'],
      ['Is it a first-person or arcade shooter?', 'That varies by game. Check the thumbnail and the in-game view before you play.'],
      ['Does it work on mobile?', 'Some shooting games support touch; others need a mouse or keyboard. Check the in-game controls.'],
      ['Are there two-player shooting games?', 'Some titles support local two-player. Use the 2 Player category to find them.'],
    ],
  },
  platform: {
    paragraphs: [
      '{{title}} is a platform game in the Unblocked Games G+ catalogue. The core loop is jump, land, repeat, with the difficulty coming from timing and route finding rather than complex controls.',
      'Platformers are best learned one screen at a time. Watch the next obstacle before you move, commit to the jump, and use the restart button without guilt. If the external game is blocked, our Sky Hopper fallback is a local substitute.',
    ],
    howTo: [
      'Press Play, then click the frame to focus it.',
      'Move with the arrow keys or WASD and jump with Space or the up arrow.',
      'Watch the next platform before you jump.',
      'Use fullscreen to see more of the level.',
    ],
    tips: [
      'Do not hold a direction longer than you need to.',
      'Jump late rather than early when the platform is moving.',
      'Learn a short section before trying to speed through it.',
      'Use the local Sky Hopper fallback if the external game does not load.',
    ],
    faq: [
      ['Can I play {{title}} unblocked at school?', 'The wrapper is static, but the external game host may be filtered. Use the fallback if the frame stays blank.'],
      ['Does it work on a phone?', 'Some platformers include touch buttons; others need a keyboard. Check the in-game prompt.'],
      ['Does it save progress?', 'That depends on the external game. Our local fallback saves a best height or score.'],
      ['Are there two-player platform games?', 'Some titles support local co-op or versus. Use the 2 Player category to find them.'],
    ],
  },
  simulation: {
    paragraphs: [
      '{{title}} is a simulation or management game in our catalogue. These games are about systems: you make a small decision, the numbers react, and the next decision becomes clearer. They run in the browser without an installer.',
      'Simulation games can be played in short check-ins or longer sessions. Watch the income and costs, buy the upgrade that improves the bottleneck, and avoid spending everything on the first shiny option. If the external host is unavailable, our local Cookie Clicker fallback is a safe substitute.',
    ],
    howTo: [
      'Press Play and follow the in-game tutorial or first prompt.',
      'Identify the resource you need and the cheapest way to increase it.',
      'Buy one upgrade at a time and watch the effect on your income.',
      'Reload the frame if the game stops responding.',
    ],
    tips: [
      'Fix the bottleneck, not the number that looks biggest.',
      'Keep a reserve for the next tier of upgrades.',
      'Check back after a few minutes instead of clicking constantly.',
      'Use the local fallback if the external host is blocked.',
    ],
    faq: [
      ['Can I play {{title}} unblocked at school?', 'The page is static, but the external host may be filtered. Use the local fallback if the game frame does not load.'],
      ['Does it save progress?', 'That depends on the external game. Some save locally; others use an account or server. Our local fallback always saves in your browser.'],
      ['Is it free?', 'Yes. There is no purchase required on this page.'],
      ['Does it work on a Chromebook?', 'Yes, as long as the external game host is reachable. The page itself is lightweight.'],
    ],
  },
};

export const CATEGORY_BLURB = {
  puzzle: 'A logic and brain game with short rounds and a clean learning curve.',
  arcade: 'A fast arcade game built around short runs and a score counter.',
  action: 'A reflex-driven action game with a quick restart loop.',
  sports: 'A compact sports game for a short competitive break.',
  classic: 'A classic-style game with familiar rules and a score to beat.',
  idle: 'A low-pressure idle game where the numbers keep growing.',
  multiplayer: 'A local multiplayer game for sharing one keyboard or screen.',
  racing: 'A browser racing game with arcade handling and quick runs.',
  shooting: 'An aim-and-position shooting game with short score attacks.',
  platform: 'A jump-and-run platformer built around timing and route finding.',
  simulation: 'A build-and-manage simulation game with compounding choices.',
};
