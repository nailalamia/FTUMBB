// Student lists: level filter, table, CSV file generated in the browser (no server).
(function () {
  const FT = window.FT;
  const { t, esc, icon } = FT;
  let level = 'all';

  // Deterministic pseudo-random numbers: the same list always gives the same names.
  function rng(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  function buildStudents(seed, count, groups) {
    const r = rng(seed), rows = [], D = FT.data;
    for (let i = 0; i < count; i++) {
      const last = D.LAST_NAMES[Math.floor(r() * D.LAST_NAMES.length)];
      const first = D.FIRST_NAMES[Math.floor(r() * D.FIRST_NAMES.length)];
      rows.push([i + 1, '2026' + String(31000000 + Math.floor(r() * 900000)).padStart(8, '0'), last, first, (i % groups) + 1]);
    }
    return rows;
  }
  const quote = (v) => '"' + String(v).replace(/"/g, '""') + '"';
  // The BOM at the start makes Excel read accents and Arabic correctly.
  function downloadCsv(filename, header, rows) {
    const lines = [header.map(quote).join(',')].concat(rows.map((r) => r.map(quote).join(',')));
    const blob = new Blob(['\uFEFF' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  FT.pages.students = {
    render() {
      FT.ui.mountDept('students', (d) => {
        const rows = (FT.data.STUDENT_LISTS[d.id] || []).filter((r) => level === 'all' || r[0] === level);
        return `<div class="container section">
          <div class="info"><span class="tile__icon">${icon('file', 22)}</span><div><strong>${t('stud.infoTitle')}</strong><p>${t('stud.infoText')}</p></div></div>
          <div class="pills" role="group">${['all', 'L1', 'L2', 'L3', 'M1', 'M2'].map((l) => `<button type="button" data-level="${l}" class="${level === l ? 'is-on' : ''}" aria-pressed="${level === l}">${t('levels.' + l)}</button>`).join('')}</div>
          ${rows.length === 0 ? `<p class="empty">${t('stud.none')}</p>` : `<div class="card table-wrap"><table class="data">
            <thead><tr><th>${t('stud.level')}</th><th>${t('stud.speciality')}</th><th>${t('stud.groups')}</th><th>${t('stud.count')}</th><th>${t('stud.updated')}</th><th><span class="sr">${t('stud.file')}</span></th></tr></thead>
            <tbody>${rows.map((r, i) => `<tr><td data-label="${t('stud.level')}"><span class="chip chip--navy">${t('levels.' + r[0])}</span></td>
              <td data-label="${t('stud.speciality')}"><strong>${esc(FT.L(FT.data.SPECIALITIES[r[1]]))}</strong></td><td data-label="${t('stud.groups')}">${r[2]}</td>
              <td data-label="${t('stud.count')}"><strong class="num">${r[3]}</strong></td><td data-label="${t('stud.updated')}">${FT.formatDate(r[4])}</td>
              <td><button type="button" class="btn btn--primary btn--sm" data-dl="${i}">${icon('download', 16)} ${t('stud.download')}</button></td></tr>`).join('')}</tbody></table></div>`}</div>`;
      }, (d) => {
        FT.$$('[data-level]').forEach((b) => { b.onclick = () => { level = b.dataset.level; FT.pages.students.render(); }; });
        const rows = (FT.data.STUDENT_LISTS[d.id] || []).filter((r) => level === 'all' || r[0] === level);
        FT.$$('[data-dl]').forEach((b) => {
          b.onclick = () => {
            const [lv, spec, groups, count] = rows[Number(b.dataset.dl)];
            const data = buildStudents(lv.charCodeAt(0) * 100 + lv.charCodeAt(1) + count, count, groups);
            const c = (k) => t('stud.csv.' + k), file = `${d.id}-${lv}-${spec}.csv`;
            downloadCsv(file, [c('n'), c('number'), c('last'), c('first'), c('group')], data);
            FT.toast(t('stud.downloaded'), file);
          };
        });
      });
    }
  };
})();
