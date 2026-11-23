// Home page: hero with faculty numbers, departments, services, latest announcements.
(function () {
  const FT = window.FT;
  const { t, icon } = FT;
  const SERVICES = [['calendar', 'timetables'], ['user', 'teachers'], ['download', 'students'], ['file', 'exams'], ['send', 'complaint'], ['mega', 'announcements']];

  FT.pages.home = {
    render() {
      FT.setTitle('');
      const latest = FT.data.ANNOUNCEMENTS.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
      FT.main().innerHTML = `
      <section class="hero hero--home"><div class="container hero__grid">
        <div class="hero__copy">
          <h1><span class="bar" aria-hidden="true"></span><span>${t('home.h1')}<br>${t('home.h2')} <em>${t('home.h3')}</em></span></h1>
          <p>${t('home.text')}</p>
          <div class="hero__actions"><a href="departments.html" class="btn btn--primary">${t('home.btnDepts')} ${icon('arrow', 18)}</a><a href="services.html" class="btn btn--ghost">${t('home.btnServices')}</a></div>
        </div>
        <aside class="glass" aria-labelledby="numbers-title"><h2 id="numbers-title">${t('stats.title')}</h2>${FT.ui.statsGrid(FT.data.FACULTY_STATS, true)}</aside>
      </div></section>

      <section class="section"><div class="container">${FT.ui.sectionTitle(t('home.deptsTitle'), t('home.deptsSub'))}
        <div class="grid grid--4">${FT.data.DEPARTMENTS.map((d) => FT.ui.deptCard(d)).join('')}</div></div></section>

      <section class="section section--alt"><div class="container">${FT.ui.sectionTitle(t('home.servicesTitle'), t('home.servicesSub'))}
        <div class="grid grid--3">${SERVICES.map(([ic, key]) => {
          const href = key === 'exams' || key === 'announcements' ? 'announcements.html' : FT.url.service(key);
          return `<a class="tile" href="${href}"><span class="tile__icon">${icon(ic, 24)}</span><span><strong>${t('svc.' + key)[0]}</strong><small>${t('svc.' + key)[1]}</small></span>${icon('arrow', 20)}</a>`;
        }).join('')}</div></div></section>

      <section class="section"><div class="container">
        ${FT.ui.sectionTitle(t('home.annTitle'), t('home.annSub'), `<a href="announcements.html" class="btn btn--outline">${t('common.viewAll')} ${icon('arrow', 16)}</a>`)}
        <div class="grid grid--3">${latest.map(FT.ui.annCard).join('')}</div></div></section>`;
    }
  };
})();
