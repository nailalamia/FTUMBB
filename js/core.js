// Core helpers: state (language, theme), translation, escaping, icons, formatting, toast.
(function () {
  const FT = window.FT;
  // Preferences are saved in localStorage. Some browsers give every local file its own storage, so the same
  // values are also kept in window.name, which survives page changes inside the same tab.
  const fromName = () => { try { return window.name.indexOf('ft:') === 0 ? JSON.parse(window.name.slice(3)) : {}; } catch (e) { return {}; } };
  const read = (k) => {
    try { const v = localStorage.getItem(k); if (v !== null) return v; } catch (e) { /* storage blocked */ }
    const o = fromName(); return o[k] === undefined ? null : o[k];
  };
  const write = (k, v) => {
    try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ }
    const o = fromName(); o[k] = v; try { window.name = 'ft:' + JSON.stringify(o); } catch (e) { /* ignore */ }
  };

  // ---- state: saved choice first, then the browser / system preference
  const savedLang = read('ft-lang');
  const browserLang = (navigator.language || 'en').slice(0, 2);
  const savedTheme = read('ft-theme');
  FT.state = {
    lang: ['en', 'fr', 'ar'].includes(savedLang) ? savedLang : (['fr', 'ar'].includes(browserLang) ? browserLang : 'en'),
    theme: savedTheme === 'dark' || savedTheme === 'light' ? savedTheme
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  };
  FT.LANGS = [{ code: 'en', label: 'English', short: 'EN' }, { code: 'fr', label: 'Français', short: 'FR' }, { code: 'ar', label: 'العربية', short: 'AR' }];

  // ---- translation: t('stats.title'), t('teach.count', { n: 5 }). Falls back to English, then to the key.
  const dig = (obj, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  FT.t = function (key, vars) {
    let val = dig(FT.i18n[FT.state.lang], key);
    if (val === undefined) val = dig(FT.i18n.en, key);
    if (val === undefined) return key;
    if (typeof val === 'string' && vars) return val.replace(/\{(\w+)\}/g, (_, k) => (vars[k] == null ? '' : vars[k]));
    return val;
  };
  // Content stored as { en, fr, ar } in the data files
  FT.L = (obj) => (obj ? obj[FT.state.lang] || obj.en || '' : '');
  FT.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  FT.param = (name) => new URLSearchParams(location.search).get(name);

  // ---- icons (same set as the design kit)
  const P = {
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
    cap: '<path d="M22 10L12 5 2 10l10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/>',
    mega: '<path d="M3 11l18-5v12L3 14z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>'
  };
  FT.icon = (name, size = 20, cls = '') =>
    `<svg class="icon icon-${name} ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name]}</svg>`;

  // ---- formatting
  const LOCALES = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-DZ-u-nu-latn' };
  FT.formatDate = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString(LOCALES[FT.state.lang], { day: '2-digit', month: 'short', year: 'numeric' });
  FT.formatNumber = (n) => n.toLocaleString(FT.state.lang === 'fr' ? 'fr-FR' : FT.state.lang === 'ar' ? 'ar-DZ-u-nu-latn' : 'en-US');

  // ---- small helpers for the pages
  FT.$ = (sel, root) => (root || document).querySelector(sel);
  FT.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  FT.main = () => document.getElementById('main');
  FT.setTitle = (title) => { document.title = title ? `${title} | ${FT.t('common.faculty')}` : FT.t('common.faculty'); };
  FT.getDept = (id) => FT.data.DEPARTMENTS.find((d) => d.id === id);
  FT.currentDept = () => FT.getDept(FT.param('id'));
  FT.deptName = (d) => FT.t('depts.' + d.key + '.name');
  FT.store = { read, write };

  // ---- page links: department sub-pages are separate HTML files that take ?id=
  FT.url = {
    dept: (id, page) => ({ overview: 'department.html', timetables: 'timetables.html', teachers: 'teachers.html', students: 'students.html', complaint: 'complaint.html' }[page || 'overview']) + '?id=' + id,
    ann: (id) => 'announcement.html?id=' + id,
    service: (k) => 'services.html?service=' + k,
    search: (q) => 'search.html?q=' + encodeURIComponent(q)
  };

  // ---- toast (bottom of the screen, closes after 5 s)
  let toastTimer;
  FT.toast = function (title, text, type) {
    const root = document.getElementById('toast-root');
    if (!root) return;
    root.innerHTML = `<div class="toast toast--${type || 'success'}" role="status" aria-live="polite">
      <span class="toast__icon">${FT.icon(type === 'error' ? 'alert' : 'check', 20)}</span>
      <div><strong>${FT.esc(title)}</strong>${text ? `<p>${FT.esc(text)}</p>` : ''}</div>
      <button type="button" aria-label="Close">${FT.icon('x', 18)}</button></div>`;
    root.querySelector('button').onclick = () => { root.innerHTML = ''; };
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { root.innerHTML = ''; }, 5000);
  };

  // ---- language and theme: update the <html> element, then draw everything again
  FT.applyDocument = function () {
    const root = document.documentElement;
    root.lang = FT.state.lang;
    root.dir = FT.state.lang === 'ar' ? 'rtl' : 'ltr';
    root.dataset.theme = FT.state.theme;
  };
  FT.setLang = function (l) { FT.state.lang = l; write('ft-lang', l); FT.applyDocument(); FT.renderAll(); };
  FT.toggleTheme = function () { FT.state.theme = FT.state.theme === 'dark' ? 'light' : 'dark'; write('ft-theme', FT.state.theme); FT.applyDocument(); FT.renderAll(); };

  FT.renderAll = function () {
    FT.renderHeader();
    const page = FT.pages[document.body.dataset.page];
    if (page) page.render();
    FT.renderFooter();
  };
  document.addEventListener('DOMContentLoaded', function () { FT.applyDocument(); FT.renderAll(); });
})();
