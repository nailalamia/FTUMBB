// Timetables: filters, weekly table (desktop), day view (mobile), PDF button.
(function () {
  const FT = window.FT;
  const { t, esc, icon } = FT;
  const TYPES = ['lecture', 'td', 'tp'];
  let level = null, spec = '', group = '', day = 0;

  FT.pages.timetables = {
    render() {
      FT.ui.mountDept('timetables', (d) => {
        const list = FT.data.TIMETABLES[d.id] || [];
        const levels = Array.from(new Set(list.map((x) => x.level)));
        if (!level || levels.indexOf(level) < 0) level = levels[1] || levels[0];
        const forLevel = list.filter((x) => x.level === level);
        const pool = forLevel.filter((x) => (!spec || x.spec === spec) && (!group || String(x.group) === group));
        const entry = pool[0] || forLevel[0];
        if (!entry) return `<div class="container section"><p class="empty">${t('tt.none')}</p></div>`;
        const specs = Array.from(new Set(forLevel.map((x) => x.spec)));
        const groups = Array.from(new Set(forLevel.map((x) => x.group)));
        const cell = (dd, s) => entry.sessions.find((x) => x.day === dd && x.slot === s);
        const heading = `${t('levels.' + entry.level)}, ${FT.L(FT.data.SPECIALITIES[entry.spec])}, ${t('tt.group')} ${entry.group}, ${t('tt.semester')} ${entry.semester}`;
        const session = (s) => `<div class="session session--${s.type}"><strong>${esc(FT.L(FT.data.SUBJECTS[s.subject]))}</strong><span>${t('tt.' + s.type)}, ${esc(s.room)}</span><span>${esc(s.teacher)}</span></div>`;
        const days = t('tt.days');
        const SLOTS = FT.data.SLOTS;
        const pdf = entry.pdf
          ? `<a class="btn btn--primary" href="${entry.pdf}" download>${icon('download', 18)} ${t('tt.pdf')}</a>`
          : `<button type="button" class="btn btn--primary" data-print>${icon('download', 18)} ${t('tt.pdf')}</button>`;
        return `<div class="container section tt">
          <div class="card filters">
            <label>${t('tt.level')}<select data-f="level">${levels.map((l) => `<option value="${l}" ${l === level ? 'selected' : ''}>${t('levels.' + l)}</option>`).join('')}</select></label>
            <label>${t('tt.speciality')}<select data-f="spec">${specs.map((s) => `<option value="${s}" ${s === entry.spec ? 'selected' : ''}>${esc(FT.L(FT.data.SPECIALITIES[s]))}</option>`).join('')}</select></label>
            <label>${t('tt.group')}<select data-f="group">${groups.map((g) => `<option value="${g}" ${g === entry.group ? 'selected' : ''}>${t('tt.group')} ${g}</option>`).join('')}</select></label>
            ${pdf}</div>
          <div class="tt__head"><h2>${esc(heading)}</h2><ul class="legend">${TYPES.map((k) => `<li><i class="dot dot--${k}"></i>${t('tt.' + k)}</li>`).join('')}</ul></div>
          <div class="tt__table" role="region" aria-label="${esc(heading)}" tabindex="0"><table>
            <thead><tr><th scope="col">${t('tt.time')}</th>${days.map((x) => `<th scope="col">${x}</th>`).join('')}</tr></thead>
            <tbody>${SLOTS.map((slot, si) => `<tr><th scope="row" dir="ltr">${slot}</th>${days.map((x, di) => { const s = cell(di, si); return `<td>${s ? session(s) : ''}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div>
          <div class="tt__days"><div class="daytabs" role="tablist">${t('tt.daysShort').map((x, i) => `<button role="tab" type="button" data-day="${i}" aria-selected="${day === i}" class="${day === i ? 'is-on' : ''}">${x}</button>`).join('')}</div>
            ${SLOTS.map((slot, si) => { const s = cell(day, si); return s ? `<div class="daysession"><div class="daysession__time" dir="ltr">${slot.split(' - ').map((x) => `<span>${x}</span>`).join('')}</div>${session(s)}</div>` : ''; }).join('')}
            ${SLOTS.some((_, si) => cell(day, si)) ? '' : `<p class="empty">${t('tt.noSessions')}</p>`}</div>
          <p class="note">${t('tt.empty')}</p></div>`;
      }, () => {
        FT.$$('[data-f]').forEach((sel) => {
          sel.onchange = () => {
            if (sel.dataset.f === 'level') { level = sel.value; spec = ''; group = ''; }
            if (sel.dataset.f === 'spec') spec = sel.value;
            if (sel.dataset.f === 'group') group = sel.value;
            FT.pages.timetables.render();
          };
        });
        FT.$$('[data-day]').forEach((b) => { b.onclick = () => { day = Number(b.dataset.day); FT.pages.timetables.render(); }; });
        const print = FT.$('[data-print]');
        if (print) print.onclick = () => window.print();
      });
    }
  };
})();
