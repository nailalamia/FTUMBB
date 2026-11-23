// Announcements list: category filter, featured item, grid.
(function () {
  const FT = window.FT;
  const { t, esc, icon } = FT;
  let cat = 'all';
  FT.pages.announcements = {
    render() {
      FT.setTitle(t('ann.title'));
      const list = FT.data.ANNOUNCEMENTS.slice().sort((a, b) => b.date.localeCompare(a.date)).filter((a) => cat === 'all' || a.cat === cat);
      const first = list[0], rest = list.slice(1);
      FT.main().innerHTML = FT.ui.pageHero(t('ann.title'), t('ann.sub'), [{ label: t('nav.home'), to: 'index.html' }, { label: t('ann.title') }]) +
        `<section class="section"><div class="container">
        <div class="pills" role="group">${['all'].concat(FT.data.ANN_CATS).map((c) => `<button type="button" data-cat="${c}" class="${cat === c ? 'is-on' : ''}" aria-pressed="${cat === c}">${c === 'all' ? t('ann.all') : t('ann.cats.' + c)}</button>`).join('')}</div>
        ${!first ? `<p class="empty">${t('ann.none')}</p>` : `<article class="featured"><img src="${first.img}" alt="">
          <div><span class="chip chip--orange">${t('ann.cats.' + first.cat)}</span><h2><a href="${FT.url.ann(first.id)}">${esc(FT.L(first.title))}</a></h2><p>${esc(FT.L(first.text))}</p>
          <time datetime="${first.date}">${icon('calendar', 16)} ${FT.formatDate(first.date)}</time><a href="${FT.url.ann(first.id)}" class="btn btn--primary">${t('common.readMore')} ${icon('arrow', 16)}</a></div></article>
          <div class="grid grid--3">${rest.map(FT.ui.annCard).join('')}</div>`}</div></section>`;
      FT.$$('[data-cat]').forEach((b) => { b.onclick = () => { cat = b.dataset.cat; FT.pages.announcements.render(); }; });
    }
  };
})();
