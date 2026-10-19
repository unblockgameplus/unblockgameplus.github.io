import { SITE } from '../data/games.mjs';
import {
  layout,
  esc,
  abs,
  breadcrumbs,
  faqHtml,
  faqJsonLd,
  breadcrumbJsonLd,
} from './layout.mjs';

const FAQ = [
  {
    q: 'What does installing Unblocked Games G+ do?',
    a: 'It adds a shortcut to your home screen or desktop and opens the site in a standalone window without the browser address bar. It does not download the whole catalogue; the app shell and local fallback games are cached by the service worker.',
  },
  {
    q: 'Do I need to install anything on a school Chromebook?',
    a: 'No admin install is required. Chrome on a Chromebook can add the site to the shelf or install it as a PWA from the browser menu. If the install option is disabled by your school, use the normal browser tab and bookmark the page.',
  },
  {
    q: 'Do the installed games work offline?',
    a: 'The local fallback games work offline after they have been opened once, because their assets are cached. Third-party games load from their own hosts and still need an internet connection.',
  },
  {
    q: 'Why is there no install button on my browser?',
    a: 'Firefox and some older browsers do not support PWA installation. Use Chrome, Edge or Samsung Internet on Android, Safari on iPhone/iPad, or Chrome/Edge on Windows, Mac and Chromebook.',
  },
  {
    q: 'Can I uninstall it later?',
    a: 'Yes. On Android, long-press the icon and choose Uninstall or Remove. On desktop, open the app menu and choose Uninstall. On iPhone/iPad, long-press the home-screen icon and choose Remove Bookmark.',
  },
];

export function installPage() {
  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'Install app', url: '/install.html' },
  ];
  const content = `
  <div class="container install-page">
    ${breadcrumbs(crumbs)}
    <header class="page-head">
      <h1>Install Unblocked Games G+</h1>
      <p class="lead">Add the G+ catalogue to your home screen or desktop and open it like a normal app — no store, no account and no admin install.</p>
      <div class="meta-row">
        <span class="pill">Android</span>
        <span class="pill">iPhone / iPad</span>
        <span class="pill">Windows / Mac</span>
        <span class="pill">Chromebook</span>
      </div>
    </header>

    <section class="install-hero">
      <div>
        <h2>One tap from the home screen</h2>
        <p>The site is a Progressive Web App (PWA). After installing, it opens in its own window, remembers the catalogue locally, and loads the app shell even on a weak connection. The local fallback games are cached for offline play.</p>
        <div class="install-actions">
          <button class="btn btn-primary" type="button" data-install-app>Install app</button>
          <a class="btn" href="/games/">Browse games first</a>
        </div>
        <p class="install-note">If the button says “Continue in browser”, your browser does not expose an install prompt. Use the platform steps below.</p>
      </div>
      <img src="/assets/img/icon-512.png" alt="Unblocked Games G+ app icon" width="160" height="160">
    </section>

    <section class="install-block">
      <h2>Android — Chrome, Edge or Samsung Internet</h2>
      <ol class="howto-list">
        <li>Open <a href="${SITE.origin}/">${SITE.origin.replace(/^https?:\/\//, '')}</a> in Chrome, Edge or Samsung Internet.</li>
        <li>Tap the three-dot menu in the top-right corner.</li>
        <li>Choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
        <li>Confirm with <strong>Install</strong>. The G+ icon appears on your home screen.</li>
      </ol>
      <p class="install-tip">On some Chromebooks and Android tablets the install icon appears directly in the address bar. Tap it instead of opening the menu.</p>
    </section>

    <section class="install-block">
      <h2>iPhone and iPad — Safari</h2>
      <ol class="howto-list">
        <li>Open the site in <strong>Safari</strong> (not Chrome or Firefox).</li>
        <li>Tap the <strong>Share</strong> button — the square with an arrow pointing up.</li>
        <li>Scroll down and choose <strong>Add to Home Screen</strong>.</li>
        <li>Name it “Games G+” and tap <strong>Add</strong>.</li>
      </ol>
      <p class="install-tip">iOS does not show an automatic install prompt; the Share menu is the official route.</p>
    </section>

    <section class="install-block">
      <h2>Windows and Mac — Chrome or Edge</h2>
      <ol class="howto-list">
        <li>Open the site in Chrome or Edge.</li>
        <li>Look for the small <strong>install icon</strong> at the right side of the address bar, or open the browser menu.</li>
        <li>Choose <strong>Install Unblocked Games G+</strong>.</li>
        <li>Confirm <strong>Install</strong>. The app gets its own desktop shortcut and window.</li>
      </ol>
      <p class="install-tip">On macOS, the app appears in Launchpad and Applications. On Windows, it appears in the Start menu.</p>
    </section>

    <section class="install-block">
      <h2>Chromebook — ChromeOS</h2>
      <ol class="howto-list">
        <li>Open the site in Chrome on the Chromebook.</li>
        <li>Use the <strong>install icon</strong> in the address bar, or the three-dot menu → <strong>Install</strong>.</li>
        <li>Confirm the install. The app appears in the launcher and can be pinned to the shelf.</li>
      </ol>
      <p class="install-tip">If your school disables PWA installation, bookmark the site instead; the games still work in a normal tab.</p>
    </section>

    <section class="install-block">
      <h2>Firefox, Safari on Mac and older browsers</h2>
      <p>These browsers do not support full PWA installation. You can still use the site normally and add it to your bookmarks or favourites. For the standalone app experience, use Chrome or Edge on desktop, or Safari on iPhone/iPad.</p>
    </section>

    <section class="install-block">
      <h2>What works offline?</h2>
      <p>The app shell, the catalogue page and the local fallback games are cached after they are opened once. Third-party games load from their own hosts, so they still need an internet connection. If a third-party host is blocked, use the local fallback button on the game page.</p>
    </section>

    <section class="install-block">
      <h2>Install FAQ</h2>
      ${faqHtml(FAQ)}
    </section>
  </div>`;

  return layout({
    title: 'Install Unblocked Games G+ — Android, iPhone, PC & Chromebook',
    description:
      'Install Unblocked Games G+ as an app on Android, iPhone, Windows, Mac or Chromebook. Step-by-step PWA instructions, no store or admin install required.',
    canonical: '/install.html',
    bodyClass: 'install-page',
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Install Unblocked Games G+',
        description: 'Install the Unblocked Games G+ PWA on Android, iPhone, Windows, Mac or Chromebook.',
        step: [
          { '@type': 'HowToStep', name: 'Android', text: 'Open the site in Chrome, tap the three-dot menu and choose Install app or Add to Home screen.' },
          { '@type': 'HowToStep', name: 'iPhone or iPad', text: 'Open the site in Safari, tap Share, choose Add to Home Screen and confirm.' },
          { '@type': 'HowToStep', name: 'Windows or Mac', text: 'Open the site in Chrome or Edge, click the install icon in the address bar and confirm Install.' },
          { '@type': 'HowToStep', name: 'Chromebook', text: 'Open the site in Chrome, use the install icon in the address bar or the menu and confirm.' },
        ],
      },
      breadcrumbJsonLd(crumbs),
      faqJsonLd(FAQ),
    ],
    content,
  });
}
