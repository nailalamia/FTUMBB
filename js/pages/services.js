// Services: six service cards (the department picker opens inside the card) and the download area.
(function () {
  const FT = window.FT;
  const { t, esc, icon } = FT;
  const ITEMS = [['calendar', 'timetables', 'timetables'], ['file', 'exams', null], ['user', 'teachers', 'teachers'], ['download', 'students', 'students'], ['send', 'complaint', 'complaint'], ['mega', 'announcements', null]];
  let open = FT.param('service');

  FT.pages.services = {
    render() {
      FT.setTitle(t('svcPage.title'));
      FT.main().innerHTML = FT.ui.pageHero(t('svcPage.title'), t('svcPage.sub'), [{ label: t('nav.home'), to: 'index.html' }, { label: t('nav.services') }]) +
        `<section class="section"><div class="container"><div class="grid grid--3">${ITEMS.map(([ic, key, page]) => {
          const [title, text] = t('svc.' + key), isOpen = open === key;
          return `<article class="card service ${isOpen ? 'is-open' : ''}"><span class="tile__icon tile__icon--lg">${icon(ic, 30)}</span><h3>${title}</h3><p>${text}</p>
            ${page ? `<button type="button" class="more" data-open="${key}" aria-expanded="${isOpen}">${t('svcPage.pick')} ${icon('chev', 16)}</button>
              ${isOpen ? `<ul class="service__depts">${FT.data.DEPARTMENTS.map((d) => `<li><a href="${FT.url.dept(d.id, page)}">${esc(FT.deptName(d))}${icon('arrow', 16)}</a></li>`).join('')}</ul>` : ''}`
              : `<a class="more" href="announcements.html">${t('common.open')} ${icon('arrow', 16)}</a>`}</article>`;
        }).join('')}</div>
        <div class="space"></div>${FT.ui.sectionTitle(t('svcPage.docsTitle'), t('svcPage.docsSub'))}
        <ul class="docs">${t('svcPage.docs').map((d, i) => `<li class="card doc"><span class="tile__icon tile__icon--soft">${icon('file', 22)}</span><strong>${d}</strong>
          <button type="button" class="btn btn--navy btn--sm" data-doc="${i}">${icon('download', 16)} ${t('svcPage.get')}</button></li>`).join('')}</ul></div></section>`;
      FT.$$('[data-open]').forEach((b) => { b.onclick = () => { open = open === b.dataset.open ? null : b.dataset.open; FT.pages.services.render(); }; });
      // Prototype: put the real files in a documents/ folder and turn these buttons into download links.
      FT.$$('[data-doc]').forEach((b) => { b.onclick = () => FT.toast(t('svcPage.docs')[Number(b.dataset.doc)], 'Sample item: link the real PDF in js/pages/services.js', 'error'); });
    }
  };
})();
