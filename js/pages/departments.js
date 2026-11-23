// Departments list: four identical cards with quick links, then a help strip.
(function () {
  const FT = window.FT;
  const { t, icon } = FT;
  FT.pages.departments = {
    render() {
      FT.setTitle(t('depts.title'));
      FT.main().innerHTML = FT.ui.pageHero(t('depts.title'), t('depts.sub'), [{ label: t('nav.home'), to: 'index.html' }, { label: t('nav.departments') }]) +
        `<section class="section"><div class="container"><div class="grid grid--4">${FT.data.DEPARTMENTS.map((d) => FT.ui.deptCard(d, true)).join('')}</div>
        <div class="help"><span class="help__icon">${icon('mail', 26)}</span><div><h2>${t('depts.help')}</h2><p>${t('depts.helpSub')}</p></div>
        <a href="contact.html" class="btn btn--primary">${t('depts.contactUs')} ${icon('arrow', 16)}</a></div></div></section>`;
    }
  };
})();
