// Header (top bar, navigation, search, mobile drawer) and footer, drawn into #site-header and #site-footer.
(function () {
  const FT = window.FT;
  const { t, esc, icon } = FT;
  let drawerOpen = false;
  let openSub = null;
  let searchText = '';

  // Which menu entry is active for each page
  const ACTIVE = { home: 'home', departments: 'departments', department: 'departments', timetables: 'departments', teachers: 'departments', students: 'departments', complaint: 'departments',
    services: 'services', announcements: 'announcements', announcement: 'announcements', about: 'about', contact: 'contact' };

  function navItems() {
    return [
      { id: 'home', href: 'index.html', label: t('nav.home') },
      { id: 'departments', href: 'departments.html', label: t('nav.departments'), children: FT.data.DEPARTMENTS.map((d) => ({ href: FT.url.dept(d.id), label: FT.deptName(d) })) },
      { id: 'services', href: 'services.html', label: t('nav.services'), children: ['timetables', 'teachers', 'students', 'complaint'].map((k) => ({ href: FT.url.service(k), label: t('svc.' + k)[0] })) },
      { id: 'announcements', href: 'announcements.html', label: t('nav.announcements') },
      { id: 'about', href: 'about.html', label: t('nav.about') },
      { id: 'contact', href: 'contact.html', label: t('nav.contact') }
    ];
  }

  const searchForm = (cls) => `<form class="search ${cls}" role="search" data-search>
      <input type="search" value="${esc(searchText)}" placeholder="${t('nav.search')}" aria-label="${t('nav.search')}">
      <button type="submit" aria-label="${t('nav.search')}">${icon('search', 18)}</button></form>`;

  FT.renderHeader = function () {
    const { lang, theme } = FT.state;
    const items = navItems();
    const current = ACTIVE[document.body.dataset.page];
    document.getElementById('site-header').innerHTML = `<header class="site-header">
      <a class="skip" href="#main">${t('common.skip')}</a>
      <div class="utility"><div class="container utility__in">
        <div class="utility__info"><a href="mailto:contactft@univ-boumerdes.dz">${icon('mail', 14)} contactft@univ-boumerdes.dz</a><a href="tel:+21324241499" dir="ltr">${icon('phone', 14)} +213 24 24 14 99</a></div>
        <div class="utility__tools">
          <div class="lang" role="group" aria-label="${t('nav.language')}">${icon('globe', 15)}${FT.LANGS.map((l) =>
            `<button type="button" data-lang="${l.code}" class="${lang === l.code ? 'is-on' : ''}" aria-pressed="${lang === l.code}" lang="${l.code}">${l.short}</button>`).join('')}</div>
          <button type="button" class="theme" data-theme-toggle aria-label="${theme === 'dark' ? t('nav.light') : t('nav.dark')}">${icon(theme === 'dark' ? 'sun' : 'moon', 15)}</button>
        </div></div></div>
      <div class="mainbar"><div class="container mainbar__in">
        <a href="index.html" class="brand" aria-label="${t('common.faculty')}"><span class="brand__logos"><img src="images/logo-ft.webp" alt="" width="44" height="44"><img src="images/logo-umbb.webp" alt="" width="44" height="44"></span>
          <span class="brand__text"><small>${t('common.universityName')}</small><strong>${t('common.faculty')}</strong></span></a>
        <nav class="nav" aria-label="Main">${items.map((it) => `<div class="nav__item ${it.children ? 'has-sub' : ''}">
          <a href="${it.href}" class="${it.id === current ? 'is-active' : ''}">${it.label}${it.children ? icon('chev', 14) : ''}</a>
          ${it.children ? `<ul class="nav__sub">${it.children.map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join('')}</ul>` : ''}</div>`).join('')}</nav>
        ${searchForm('search--desktop')}
        <button type="button" class="burger" data-burger aria-expanded="${drawerOpen}" aria-controls="drawer" aria-label="${drawerOpen ? t('nav.close') : t('nav.menu')}">${icon(drawerOpen ? 'x' : 'menu', 26)}</button>
      </div></div>
      <div id="drawer" class="drawer ${drawerOpen ? 'is-open' : ''}" ${drawerOpen ? '' : 'hidden'}>
        ${searchForm('search--drawer')}
        <ul class="drawer__list">${items.map((it) => `<li><div class="drawer__row"><a href="${it.href}">${it.label}</a>
          ${it.children ? `<button type="button" data-sub="${it.id}" aria-expanded="${openSub === it.id}" aria-label="${it.label}">${icon('chev', 22, openSub === it.id ? 'rot' : '')}</button>` : ''}</div>
          ${it.children && openSub === it.id ? `<ul class="drawer__sub">${it.children.map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join('')}</ul>` : ''}</li>`).join('')}</ul>
        <div class="drawer__tools"><p>${t('nav.language')}</p>
          <div class="segmented">${FT.LANGS.map((l) => `<button type="button" data-lang="${l.code}" class="${lang === l.code ? 'is-on' : ''}" lang="${l.code}">${l.label}</button>`).join('')}</div>
          <p>${t('nav.appearance')}</p>
          <button type="button" class="toggle-row" data-theme-toggle>${icon(theme === 'dark' ? 'sun' : 'moon', 20)} ${theme === 'dark' ? t('nav.light') : t('nav.dark')}</button></div>
      </div></header>`;
    document.body.classList.toggle('no-scroll', drawerOpen);

    const root = document.getElementById('site-header');
    FT.$$('[data-lang]', root).forEach((b) => { b.onclick = () => FT.setLang(b.dataset.lang); });
    FT.$$('[data-theme-toggle]', root).forEach((b) => { b.onclick = () => FT.toggleTheme(); });
    FT.$('[data-burger]', root).onclick = () => { drawerOpen = !drawerOpen; FT.renderHeader(); };
    FT.$$('[data-sub]', root).forEach((b) => { b.onclick = () => { openSub = openSub === b.dataset.sub ? null : b.dataset.sub; FT.renderHeader(); }; });
    FT.$$('[data-search]', root).forEach((f) => {
      const input = f.querySelector('input');
      input.oninput = () => { searchText = input.value; };
      f.onsubmit = (e) => { e.preventDefault(); if (searchText.trim()) location.href = FT.url.search(searchText.trim()); };
    });
  };

  FT.renderFooter = function () {
    const dept = FT.data.DEPARTMENTS.map((d) => `<li><a href="${FT.url.dept(d.id)}">${esc(FT.deptName(d))}</a></li>`).join('');
    const svc = ['timetables', 'teachers', 'students', 'complaint'].map((k) => `<li><a href="${FT.url.service(k)}">${t('svc.' + k)[0]}</a></li>`).join('');
    document.getElementById('site-footer').innerHTML = `<footer class="site-footer"><div class="container footer__grid">
      <div class="footer__brand"><div class="footer__logos"><img src="images/logo-ft.webp" alt="" width="64" height="64"><img src="images/logo-umbb.webp" alt="" width="64" height="64"></div>
        <p class="footer__uni">${t('common.universityName')}</p><p class="footer__name">${t('common.faculty')}</p>
        <ul class="footer__contact"><li>${icon('pin', 16)} ${t('footer.address')}</li><li>${icon('phone', 16)} <span dir="ltr">+213 24 24 14 99</span></li><li>${icon('mail', 16)} contactft@univ-boumerdes.dz</li></ul></div>
      <nav aria-label="${t('footer.depts')}"><h2>${t('footer.depts')}</h2><ul>${dept}</ul></nav>
      <nav aria-label="${t('footer.services')}"><h2>${t('footer.services')}</h2><ul>${svc}</ul></nav>
      <nav aria-label="${t('footer.resources')}"><h2>${t('footer.resources')}</h2><ul>
        <li><a href="https://www.univ-boumerdes.dz" target="_blank" rel="noreferrer">${t('footer.r1')}</a></li><li><a href="https://elearning.univ-boumerdes.dz" target="_blank" rel="noreferrer">${t('footer.r2')}</a></li>
        <li><a href="https://dlibrary.univ-boumerdes.dz" target="_blank" rel="noreferrer">${t('footer.r3')}</a></li><li><a href="https://www.sndl.cerist.dz" target="_blank" rel="noreferrer">${t('footer.r4')}</a></li></ul></nav>
      </div><div class="container footer__bottom"><p>${t('footer.rights')}</p></div></footer>`;
  };
})();
