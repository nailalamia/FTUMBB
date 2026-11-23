// Complaint form: validation rules, attachment check, reference number, confirmation. Nothing is sent to a server.
(function () {
  const FT = window.FT;
  const { t, esc, icon } = FT;
  const CATS = ['timetable', 'grades', 'registration', 'documents', 'facilities', 'other'];
  const OK_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
  let sent = null;

  function validate(v) {
    const e = {};
    if (v.name.trim().length < 3) e.name = t('cmp.err.name');
    if (v.studentNo && !/^\d{8,14}$/.test(v.studentNo)) e.studentNo = t('cmp.err.studentNo');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = t('cmp.err.email');
    if (!v.dept) e.dept = t('cmp.err.dept');
    if (!v.category) e.category = t('cmp.err.category');
    if (v.subject.trim().length < 5) e.subject = t('cmp.err.subject');
    if (v.message.trim().length < 20) e.message = t('cmp.err.message');
    if (v.file && (OK_TYPES.indexOf(v.file.type) < 0 || v.file.size > 5 * 1024 * 1024)) e.file = t('cmp.err.file');
    return e;
  }

  FT.pages.complaint = {
    render() {
      FT.ui.mountDept('complaint', (d) => {
        const f = (name, label, control, cls) => `<div class="field ${cls || ''}" data-field="${name}"><label for="c-${name}">${label}</label>${control}</div>`;
        const input = (name, ph, extra) => `<input id="c-${name}" name="${name}" placeholder="${esc(ph)}" ${extra || ''}>`;
        return `<div class="container section complaint">
          <form class="card form" novalidate id="complaint-form">
            <h2>${t('cmp.title')}</h2><p class="muted">${t('cmp.sub')}</p>
            ${sent ? `<p class="banner banner--ok" role="status">${icon('check', 18)} ${t('cmp.okText')} <strong dir="ltr">${sent}</strong></p>` : ''}
            <div class="form__grid">
              ${f('name', t('cmp.name'), input('name', t('cmp.namePh'), 'autocomplete="name"'))}
              ${f('studentNo', t('cmp.studentNo'), input('studentNo', t('cmp.studentNoPh'), 'inputmode="numeric"'))}
              ${f('email', t('cmp.email'), input('email', t('cmp.emailPh'), 'type="email" autocomplete="email"'))}
              ${f('dept', t('cmp.dept'), `<select id="c-dept" name="dept">${FT.data.DEPARTMENTS.map((x) => `<option value="${x.id}" ${x.id === d.id ? 'selected' : ''}>${esc(FT.deptName(x))}</option>`).join('')}</select>`)}
              ${f('levelGroup', t('cmp.levelGroup'), input('levelGroup', t('cmp.levelGroupPh')))}
              ${f('category', t('cmp.category'), `<select id="c-category" name="category"><option value="">${t('cmp.choose')}</option>${CATS.map((c) => `<option value="${c}">${t('cmp.cats.' + c)}</option>`).join('')}</select>`)}
              ${f('subject', t('cmp.subject'), input('subject', t('cmp.subjectPh')), 'span2')}
              ${f('message', t('cmp.message'), `<textarea id="c-message" name="message" rows="6" maxlength="600" placeholder="${esc(t('cmp.messagePh'))}"></textarea><span class="counter" dir="ltr" data-counter>0 / 600</span>`, 'span2')}
              <div class="field span2" data-field="file"><label for="c-file">${t('cmp.attach')}</label>
                <label class="drop" for="c-file">${icon('upload', 24)}<span data-file-name>${t('cmp.attachText')}</span><button type="button" class="link" data-remove hidden>${t('cmp.remove')}</button></label>
                <input id="c-file" name="file" type="file" accept=".pdf,.jpg,.jpeg,.png" class="sr"></div>
            </div>
            <div class="form__foot"><button type="submit" class="btn btn--primary">${t('cmp.send')} ${icon('send', 18)}</button><span class="muted">${t('cmp.note')}</span></div>
          </form>
          <aside class="side">
            <section class="card steps"><h2>${t('cmp.nextTitle')}</h2><ol>${t('cmp.steps').map(([a, b], i) => `<li><span>${i + 1}</span><div><strong>${a}</strong><p>${b}</p></div></li>`).join('')}</ol></section>
            <section class="card tip"><h3>${icon('alert', 20)} ${t('cmp.tipTitle')}</h3><p>${t('cmp.tip')}</p></section>
          </aside></div>`;
      }, () => {
        const form = FT.$('#complaint-form');
        const ctl = FT.form.setup(form, validate, (v) => {
          const ref = 'FT-' + Date.now().toString(36).toUpperCase();
          // Prototype only: the complaint is kept in this browser (localStorage); nothing leaves the page.
          try {
            const old = JSON.parse(FT.store.read('ft-complaints') || '[]');
            old.push({ ref: ref, name: v.name, studentNo: v.studentNo, email: v.email, dept: v.dept, levelGroup: v.levelGroup, category: v.category, subject: v.subject, message: v.message, file: v.file ? v.file.name : null, date: new Date().toISOString() });
            FT.store.write('ft-complaints', JSON.stringify(old));
          } catch (e) { /* ignore */ }
          sent = ref;
          FT.pages.complaint.render();
          FT.toast(t('cmp.okTitle'), t('cmp.okText') + ' ' + ref);
        }, (errs) => {
          FT.toast(t('cmp.fix'), '', 'error');
          const first = form.querySelector('[name="' + Object.keys(errs)[0] + '"]');
          if (first) first.focus();
        });
        const msg = form.elements.message, counter = FT.$('[data-counter]');
        msg.addEventListener('input', () => { counter.textContent = msg.value.length + ' / 600'; });
        const fileInput = form.elements.file, fileName = FT.$('[data-file-name]'), remove = FT.$('[data-remove]');
        fileInput.addEventListener('change', () => {
          const file = fileInput.files[0];
          fileName.textContent = file ? file.name : t('cmp.attachText'); remove.hidden = !file;
        });
        remove.onclick = (e) => { e.preventDefault(); fileInput.value = ''; fileInput.dispatchEvent(new Event('change', { bubbles: true })); };
      });
    }
  };
})();
