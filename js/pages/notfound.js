// 404 page (also used by the other pages when an id is unknown).
(function () {
  const FT = window.FT;
  FT.pages.notfound = { render() { FT.main().innerHTML = FT.ui.notFound(); } };
})();
