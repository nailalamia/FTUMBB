// About the Faculty: mission, vision, dean's welcome, numbers, organisation chart, scientific board.
(function () {
  const FT = window.FT;
  const { t, icon } = FT;
  FT.pages.about = {
    render() {
      FT.setTitle(t('about.title'));
      FT.main().innerHTML = FT.ui.pageHero(t('about.title'), t('about.sub'), [{ label: t('nav.home'), to: 'index.html' }, { label: t('about.title') }]) +
        `<section class="section"><div class="container"><div class="grid grid--2">${[['cap', 'mission'], ['globe', 'vision']].map(([ic, k]) =>
          `<article class="card mv"><span class="tile__icon">${icon(ic, 26)}</span><div><h2>${t('about.' + k)}</h2><p>${t('about.' + k + 'Text')}</p></div></article>`).join('')}</div>
        <article class="card dean"><span class="head__avatar head__avatar--lg">${icon('user', 72)}</span><div><h2>${t('about.dean')}</h2><p>${t('about.deanText')}</p>
          <p class="head__name"><strong>${t('about.deanName')}</strong><small>${t('about.deanRole')}</small></p></div></article></div></section>
        <section class="band"><ul class="container band__in">${Object.keys(FT.data.FACULTY_STATS).map((k) => `<li><strong>${FT.formatNumber(FT.data.FACULTY_STATS[k])}</strong><span>${t('stats.' + k)}</span></li>`).join('')}</ul></section>
        <section class="section"><div class="container">${FT.ui.sectionTitle(t('about.org'), t('about.orgSub'))}
          <div class="org"><div class="org__top">${t('about.dean1')}</div>
            <div class="org__row">${['vd1', 'vd2', 'vd3'].map((k) => `<div class="org__box">${t('about.' + k)}</div>`).join('')}</div>
            <div class="org__row org__row--4">${FT.data.DEPARTMENTS.map((d) => `<a href="${FT.url.dept(d.id)}" class="org__dept">${FT.deptName(d)}</a>`).join('')}</div></div>
          <div class="space"></div>${FT.ui.sectionTitle(t('about.csf'), t('about.csfSub'))}
          <div class="grid grid--3">${[['file', 'csf1'], ['users', 'csf2'], ['book', 'csf3']].map(([ic, k]) => `<div class="tile tile--static"><span class="tile__icon">${icon(ic, 24)}</span><span><strong>${t('about.' + k)} | CSF</strong></span></div>`).join('')}</div></div></section>`;
    }
  };
})();
