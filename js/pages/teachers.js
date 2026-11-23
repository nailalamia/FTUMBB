// Teachers: search, rank filter, pagination, mailto links.
(function () {
  const FT = window.FT;
  const { t, esc, icon } = FT;
  const PAGE = 12;
  let q = '', rank = 'all', page = 1;

  // Page numbers to show: first, last, the current page and its neighbours, with "…" for the gaps.
  function pageList(pages, current) {
    const set = new Set([1, pages, current - 1, current, current + 1].filter((n) => n >= 1 && n <= pages));
    const out = []; let prev = 0;
    Array.from(set).sort((a, b) => a - b).forEach((n) => { if (n - prev > 1) out.push('…'); out.push(n); prev = n; });
    return out;
  }

  FT.pages.teachers = {
    render() {
      FT.ui.mountDept('teachers', (d) => `<div class="container section">
        <div class="toolbar"><label class="field-search">${icon('search', 20)}<span class="sr">${t('teach.search')}</span><input type="search" data-q value="${esc(q)}" placeholder="${t('teach.search')}"></label>
          ${(() => { const ranks = FT.data.RANKS.filter((r) => (FT.data.TEACHERS[d.id] || []).some((x) => x.rank === r)); return ranks.length ? `<div class="pills" role="group">${['all'].concat(ranks).map((r) => `<button type="button" data-rank="${r}" class="${rank === r ? 'is-on' : ''}" aria-pressed="${rank === r}">${r === 'all' ? t('teach.allRanks') : t('teach.ranks.' + r)}</button>`).join('')}</div>` : ''; })()}</div>
        <div id="teachers-results"></div></div>`, (d) => {
        const all = FT.data.TEACHERS[d.id] || [];
        const draw = () => {
          const s = q.trim().toLowerCase();
          const rows = all.filter((x) => (rank === 'all' || x.rank === rank) && (!s || x.name.toLowerCase().includes(s) || x.email.toLowerCase().includes(s)));
          const pages = Math.max(1, Math.ceil(rows.length / PAGE));
          if (page > pages) page = pages;
          const shown = rows.slice((page - 1) * PAGE, page * PAGE);
          FT.$('#teachers-results').innerHTML = `<p class="count" aria-live="polite">${t(rows.length === 1 ? 'teach.one' : 'teach.count', { n: rows.length })}</p>` +
            (shown.length === 0 ? `<p class="empty">${t('teach.none')}</p>` : `<ul class="grid grid--4 people">${shown.map((p) => `<li class="card person">
              <span class="person__avatar" aria-hidden="true">${p.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}</span>${p.rank ? `<span class="chip chip--orange">${t('teach.ranks.' + p.rank)}</span>` : ''}
              <h3>${FT.data.titleFor(p.rank)} ${esc(p.name)}</h3>${p.spec ? `<p>${esc(FT.L(FT.data.SPECIALITIES[p.spec]))}</p>` : ''}
              <a class="person__mail" href="mailto:${p.email}">${icon('mail', 16)}<span dir="ltr">${p.email}</span></a>
              <a class="btn btn--navy btn--sm btn--block" href="mailto:${p.email}">${t('teach.send')}</a></li>`).join('')}</ul>`) +
            (pages > 1 ? `<nav class="pager" aria-label="Pagination"><button type="button" class="pager__prev" data-goto="${page - 1}" ${page === 1 ? 'disabled' : ''} aria-label="Previous">${icon('arrow', 18)}</button>${pageList(pages, page).map((n) => n === '…' ? '<span class="pager__gap">…</span>' : `<button type="button" data-goto="${n}" class="${page === n ? 'is-on' : ''}" ${page === n ? 'aria-current="page"' : ''}>${n}</button>`).join('')}<button type="button" data-goto="${page + 1}" ${page === pages ? 'disabled' : ''} aria-label="Next">${icon('arrow', 18)}</button></nav>` : '');
          FT.$$("[data-goto]").forEach((b) => { b.onclick = () => { page = Number(b.dataset.goto); draw(); }; });
        };
        FT.$('[data-q]').oninput = (e) => { q = e.target.value; page = 1; draw(); };
        FT.$$('[data-rank]').forEach((b) => { b.onclick = () => { rank = b.dataset.rank; page = 1; FT.$$('[data-rank]').forEach((x) => { const on = x.dataset.rank === rank; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); }); draw(); }; });
        draw();
      });
    }
  };
})();
