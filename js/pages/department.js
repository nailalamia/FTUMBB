// Department home: head's word, numbers, site map, specialities.
(function () {
  const FT = window.FT;
  const { t, icon } = FT;
  const MAP = [['home', 'overview', 'overview'], ['calendar', 'timetables', 'timetables'], ['user', 'teachers', 'teachers'], ['download', 'students', 'students'], ['send', 'complaint', 'complaint']];

  FT.pages.department = {
    render() {
      FT.ui.mountDept('overview', (d) => `<div class="container section">
        <div class="overview">
          <article class="card head"><span class="head__avatar">${icon('user', 44)}</span><div><h2>${t('dept.headWord')}</h2><p>${t('depts.' + d.key + '.head')}</p>
            <p class="head__name"><strong>${FT.esc(d.head)}</strong><small>${t('dept.headRole')}</small></p></div></article>
          <aside class="card numbers"><h2>${t('stats.deptTitle')}</h2>${FT.ui.statsGrid(d.stats)}</aside>
        </div>
        ${FT.ui.sectionTitle(t('dept.siteMap'), t('dept.siteMapSub'))}
        <div class="sitemap">${MAP.map(([ic, key, page]) => `<a href="${FT.url.dept(d.id, page)}" class="card sitemap__item"><span class="tile__icon">${icon(ic, 24)}</span>
          <h3>${t('dept.' + key)}</h3><ul>${t('dept.map.' + key).map((s) => `<li>${s}</li>`).join('')}</ul>${icon('arrow', 18)}</a>`).join('')}</div>
        ${FT.ui.sectionTitle(t('dept.specs'), t('dept.specsSub'))}
        <div class="specs">${['licence', 'master'].map((cycle) => `<section class="card"><h3>${t('dept.' + cycle)}</h3>
          <ul class="chips">${d.specs[cycle].map((s) => `<li class="chip chip--${cycle === 'licence' ? 'navy' : 'orange'}">${FT.esc(FT.L(FT.data.SPECIALITIES[s]))}</li>`).join('')}</ul></section>`).join('')}</div>
      </div>`);
    }
  };
})();
