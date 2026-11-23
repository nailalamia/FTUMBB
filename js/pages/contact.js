// Contact: information cards, map link and a validated message form (nothing is sent).
(function () {
  const FT = window.FT;
  const { t, esc, icon } = FT;
  function validate(v) {
    const e = {};
    if (v.name.trim().length < 3) e.name = t('cmp.err.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = t('cmp.err.email');
    if (v.subject.trim().length < 5) e.subject = t('cmp.err.subject');
    if (v.message.trim().length < 20) e.message = t('cmp.err.message');
    return e;
  }
  FT.pages.contact = {
    render() {
      FT.setTitle(t('contact.title'));
      const info = [['pin', 'address', t('contact.addressText')], ['phone', 'phone', '+213 24 24 14 99'], ['mail', 'email', 'contactft@univ-boumerdes.dz'], ['clock', 'hours', t('contact.hoursText')]];
      const f = (name, label, control, cls) => `<div class="field ${cls || ''}" data-field="${name}"><label for="k-${name}">${label}</label>${control}</div>`;
      FT.main().innerHTML = FT.ui.pageHero(t('contact.title'), t('contact.sub'), [{ label: t('nav.home'), to: 'index.html' }, { label: t('contact.title') }]) +
        `<section class="section"><div class="container contact"><div class="contact__info">
          ${info.map(([ic, k, v]) => `<div class="card ci"><span class="tile__icon">${icon(ic, 22)}</span><div><strong>${t('contact.' + k)}</strong><p ${k === 'phone' || k === 'email' ? 'dir="ltr"' : ''}>${v}</p></div></div>`).join('')}
          <a class="mapcard" href="https://www.google.com/maps/search/?api=1&query=Faculty+of+Technology+Boumerdes" target="_blank" rel="noreferrer"><span class="mapcard__pin">${icon('pin', 26)}</span>
            <strong>${t('common.universityName')}</strong><span>${t('contact.openMaps')} ${icon('arrow', 14)}</span></a></div>
          <form class="card form" novalidate id="contact-form"><h2>${t('contact.formTitle')}</h2><p class="muted">${t('contact.formSub')}</p>
            <div class="form__grid">
              ${f('name', t('contact.name'), `<input id="k-name" name="name" placeholder="${esc(t('contact.namePh'))}" autocomplete="name">`)}
              ${f('email', t('cmp.email'), `<input id="k-email" name="email" type="email" placeholder="${esc(t('cmp.emailPh'))}" autocomplete="email">`)}
              ${f('subject', t('contact.subject'), `<input id="k-subject" name="subject" placeholder="${esc(t('contact.subjectPh'))}">`, 'span2')}
              ${f('message', t('contact.message'), `<textarea id="k-message" name="message" rows="6" placeholder="${esc(t('contact.messagePh'))}"></textarea>`, 'span2')}</div>
            <div class="form__foot"><button type="submit" class="btn btn--primary">${t('contact.send')} ${icon('send', 18)}</button><span class="muted">${t('contact.note')}</span></div></form></div></section>`;
      const ctl = FT.form.setup(FT.$('#contact-form'), validate, () => { ctl.reset(); FT.toast(t('contact.okTitle'), t('contact.okText')); }, () => FT.toast(t('cmp.fix'), '', 'error'));
    }
  };
})();
