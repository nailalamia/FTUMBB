// Global search over departments, teachers, announcements and services (search.html?q=...).
(function () {
  const FT = window.FT;
  const { t, esc } = FT;
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  FT.pages.search = {
    render() {
      FT.setTitle(t('search.title'));
      const q = (FT.param('q') || '').trim(), n = norm(q), has = (s) => norm(s).indexOf(n) > -1, D = FT.data;
      const depts = n ? D.DEPARTMENTS.filter((d) => has(t('depts.' + d.key + '.name')) || has(t('depts.' + d.key + '.tag'))) : [];
      const teachers = [];
      if (n) D.DEPARTMENTS.forEach((d) => (D.TEACHERS[d.id] || []).forEach((p) => { if (has(p.name) || has(p.email)) teachers.push({ p: p, d: d }); }));
      const anns = n ? D.ANNOUNCEMENTS.filter((a) => has(FT.L(a.title)) || has(FT.L(a.text))) : [];
      const svcs = n ? ['timetables', 'exams', 'teachers', 'students', 'complaint', 'announcements'].filter((k) => has(t('svc.' + k)[0]) || has(t('svc.' + k)[1])) : [];
      const group = (title, items) => items.length ? `<section class="card results"><h2>${title}</h2><ul>${items.join('')}</ul></section>` : '';
      FT.main().innerHTML = FT.ui.pageHero(t('search.title'), q ? `${t('search.sub')} "${esc(q)}"` : t('search.type'), [{ label: t('nav.home'), to: 'index.html' }, { label: t('search.title') }]) +
        `<section class="section"><div class="container narrow">${q && !(depts.length + teachers.length + anns.length + svcs.length) ? `<p class="empty">${t('search.none')}</p>` : ''}
        ${group(t('search.depts'), depts.map((d) => `<li><a href="${FT.url.dept(d.id)}">${esc(FT.deptName(d))}</a></li>`))}
        ${group(t('search.teachers'), teachers.map((x) => `<li><a href="${FT.url.dept(x.d.id, 'teachers')}">${D.titleFor(x.p.rank)} ${esc(x.p.name)}</a><small>${esc(FT.deptName(x.d))}</small></li>`))}
        ${group(t('search.anns'), anns.map((a) => `<li><a href="${FT.url.ann(a.id)}">${esc(FT.L(a.title))}</a></li>`))}
        ${group(t('search.svcs'), svcs.map((k) => `<li><a href="${FT.url.service(k)}">${t('svc.' + k)[0]}</a></li>`))}</div></section>`;
    }
  };
})();
