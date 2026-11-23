// Reusable HTML fragments (each function returns a string). Same markup and class names as the design.
(function () {
  const FT = window.FT;
  const { t, esc, icon } = FT;
  const ui = (FT.ui = {});

  ui.sectionTitle = (title, sub, action) =>
    `<div class="section-title"><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${action || ''}</div>`;

  ui.crumbs = (items) => `<nav class="crumbs" aria-label="Breadcrumb">${items.map((c, i) =>
    `<span>${c.to ? `<a href="${c.to}">${c.label}</a>` : `<span aria-current="page">${c.label}</span>`}${i < items.length - 1 ? '<i aria-hidden="true">/</i>' : ''}</span>`).join('')}</nav>`;

  ui.pageHero = (title, sub, crumbs, compact) =>
    `<section class="hero hero--page ${compact ? 'hero--compact' : ''}"><div class="container">${crumbs ? ui.crumbs(crumbs) : ''}
      <div class="hero__title"><span class="bar" aria-hidden="true"></span><div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div></div></div></section>`;

  const STAT_ICONS = { specialities: 'cap', students: 'users', foreign: 'globe', ats: 'building', teachers: 'user', doctorants: 'cap' };
  ui.statsGrid = (stats, glass) => `<dl class="stats ${glass ? 'stats--glass' : ''}">${Object.keys(stats).map((k) =>
    `<div class="stats__item">${icon(STAT_ICONS[k], glass ? 28 : 22)}<dt>${t('stats.' + k)}</dt><dd>${FT.formatNumber(stats[k])}</dd></div>`).join('')}</dl>`;

  ui.deptCard = (d, full) => {
    const name = esc(FT.deptName(d));
    const links = [['calendar', 'timetables'], ['user', 'teachers'], ['users', 'students'], ['send', 'complaint']];
    return `<article class="dcard ${full ? 'dcard--full' : ''}">
      <a href="${FT.url.dept(d.id)}" class="dcard__media" aria-label="${name}"><img src="${d.banner}" alt="" loading="lazy"><span class="dcard__icon"><img src="${d.icon}" alt="" width="64" height="64"></span></a>
      <div class="dcard__body"><h3><a href="${FT.url.dept(d.id)}">${name}</a></h3><p>${t('depts.' + d.key + '.tag')}</p>
      ${full ? `<dl class="dcard__stats">
        <div><dt>${t('stats.students')}</dt><dd>${FT.formatNumber(d.stats.students)}</dd></div>
        <div><dt>${t('stats.teachers')}</dt><dd>${d.stats.teachers}</dd></div>
        <div><dt>${t('stats.specialities')}</dt><dd>${d.stats.specialities}</dd></div></dl>
        <ul class="dcard__links">${links.map(([ic, p]) => `<li><a href="${FT.url.dept(d.id, p)}">${icon(ic, 16)}${t('dept.' + p)}</a></li>`).join('')}</ul>` : ''}
      <a href="${FT.url.dept(d.id)}" class="${full ? 'btn btn--navy btn--block' : 'more'}">${t('home.explore')} ${icon('arrow', 16)}</a></div></article>`;
  };

  ui.annCard = (a) => `<article class="acard">
    <a href="${FT.url.ann(a.id)}" class="acard__media" tabindex="-1" aria-hidden="true"><img src="${a.img}" alt="" loading="lazy"><span class="chip chip--white">${t('ann.cats.' + a.cat)}</span></a>
    <div class="acard__body"><time datetime="${a.date}">${icon('calendar', 15)} ${FT.formatDate(a.date)}</time>
    <h3><a href="${FT.url.ann(a.id)}">${esc(FT.L(a.title))}</a></h3><p>${esc(FT.L(a.text))}</p>
    <a href="${FT.url.ann(a.id)}" class="more">${t('common.readMore')} ${icon('arrow', 16)}</a></div></article>`;

  // Form field: label + control + optional error. `control` is the HTML of the input/select/textarea.
  ui.field = (id, label, control, error, extraClass, hint) =>
    `<div class="field ${error ? 'has-error' : ''} ${extraClass || ''}"><label for="${id}">${label}</label>${control}${hint || ''}${error ? `<p class="field__err" id="${id}-err">${icon('alert', 14)}${esc(error)}</p>` : ''}</div>`;

  ui.notFound = () => {
    FT.setTitle(t('nf.title'));
    return `<section class="section notfound"><div class="container"><p class="notfound__code" aria-hidden="true">404</p>
      <span class="notfound__icon">${icon('search', 40)}</span><h1>${t('nf.title')}</h1><p>${t('nf.text')}</p>
      <div class="hero__actions"><a href="index.html" class="btn btn--primary">${t('common.backHome')} ${icon('arrow', 16)}</a><a href="contact.html" class="btn btn--outline">${t('depts.contactUs')}</a></div></div></section>`;
  };

  // Department pages share a header, a tab bar and the same "not found" behaviour.
  const TABS = [['overview', 'overview'], ['timetables', 'timetables'], ['teachers', 'teachers'], ['students', 'students'], ['complaint', 'complaint']];
  ui.deptShell = function (page, bodyHtml) {
    const d = FT.currentDept();
    if (!d) return null;
    const name = FT.deptName(d);
    const isOverview = page === 'overview';
    const pageLabel = t('dept.' + page);
    FT.setTitle(`${pageLabel}, ${name}`);
    const crumbs = [{ label: t('nav.home'), to: 'index.html' }, { label: t('nav.departments'), to: 'departments.html' }, isOverview ? { label: name } : { label: name, to: FT.url.dept(d.id) }].concat(isOverview ? [] : [{ label: pageLabel }]);
    return `<section class="hero hero--dept ${isOverview ? '' : 'hero--compact'}"><div class="container hero__dept"><div>${ui.crumbs(crumbs)}
        <div class="hero__dept-title"><span class="hero__badge"><img src="${d.icon}" alt="" width="80" height="80"></span>
        <div><h1>${esc(isOverview ? name : pageLabel)}</h1><p>${isOverview ? t('depts.' + d.key + '.tag') : esc(name)}</p></div></div></div>
        ${isOverview ? `<div class="hero__photo"><img src="${d.banner}" alt=""></div>` : ''}</div></section>
      <div class="subnav"><div class="container subnav__in"><nav aria-label="${esc(name)}">${TABS.map(([p, k]) =>
        `<a href="${FT.url.dept(d.id, p)}" class="${p === page ? 'is-active' : ''}">${t('dept.' + k)}</a>`).join('')}</nav>
        ${page !== 'complaint' ? `<a href="${FT.url.dept(d.id, 'complaint')}" class="btn btn--primary btn--sm">${t('dept.fileComplaint')}</a>` : ''}</div></div>
      ${bodyHtml(d)}`;
  };
  // Mounts a department page, or the 404 content when ?id= is missing or unknown.
  ui.mountDept = function (page, bodyHtml, bind) {
    const html = ui.deptShell(page, bodyHtml);
    FT.main().innerHTML = html || ui.notFound();
    if (html && bind) bind(FT.currentDept());
  };
})();

// Form helper: validates on blur and while typing, shows the error under each field, validates again on submit.
// Each field wrapper must carry data-field="<input name>".
(function () {
  const FT = window.FT;
  FT.form = {
    setup(form, validate, onValid, onInvalid) {
      const touched = {};
      const values = () => {
        const v = {};
        Array.from(form.elements).forEach((el) => { if (el.name) v[el.name] = el.type === 'file' ? (el.files[0] || null) : el.value; });
        return v;
      };
      const paint = (errs) => {
        FT.$$('[data-field]', form).forEach((box) => {
          const name = box.dataset.field;
          const msg = touched[name] ? errs[name] : null;
          box.classList.toggle('has-error', !!msg);
          const ctrl = box.querySelector('[name]');
          if (ctrl) { if (msg) ctrl.setAttribute('aria-invalid', 'true'); else ctrl.removeAttribute('aria-invalid'); }
          let p = box.querySelector('.field__err');
          if (msg) {
            if (!p) { p = document.createElement('p'); p.className = 'field__err'; box.appendChild(p); }
            p.innerHTML = FT.icon('alert', 14) + FT.esc(msg);
          } else if (p) p.remove();
        });
      };
      form.addEventListener('blur', (e) => { if (e.target.name) { touched[e.target.name] = true; paint(validate(values())); } }, true);
      form.addEventListener('input', (e) => { if (e.target.name && touched[e.target.name]) paint(validate(values())); });
      form.addEventListener('change', (e) => { if (e.target.name) { touched[e.target.name] = true; paint(validate(values())); } });
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = values(), errs = validate(v);
        Object.keys(v).forEach((k) => { touched[k] = true; });
        paint(errs);
        if (Object.keys(errs).length) onInvalid(errs); else onValid(v);
      });
      return { reset() { form.reset(); Object.keys(touched).forEach((k) => delete touched[k]); paint({}); } };
    }
  };
})();
