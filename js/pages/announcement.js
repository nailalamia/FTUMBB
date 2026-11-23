// One announcement (announcement.html?id=1).
(function () {
  const FT = window.FT;
  const { t, esc, icon } = FT;
  FT.pages.announcement = {
    render() {
      const item = FT.data.ANNOUNCEMENTS.find((a) => String(a.id) === FT.param('id'));
      if (!item) { FT.main().innerHTML = FT.ui.notFound(); return; }
      FT.setTitle(FT.L(item.title));
      FT.main().innerHTML = `<section class="section"><div class="container narrow">
        ${FT.ui.crumbs([{ label: t('nav.home'), to: 'index.html' }, { label: t('ann.title'), to: 'announcements.html' }, { label: t('ann.cats.' + item.cat) }])}
        <article class="detail"><img src="${item.img}" alt=""><span class="chip chip--orange">${t('ann.cats.' + item.cat)}</span><h1>${esc(FT.L(item.title))}</h1>
        <time datetime="${item.date}">${icon('calendar', 16)} ${FT.formatDate(item.date)}</time><p>${esc(FT.L(item.text))}</p>
        <a href="announcements.html" class="btn btn--outline">${icon('arrow', 16, 'flip')} ${t('ann.title')}</a></article></div></section>`;
    }
  };
})();
