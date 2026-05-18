// Language toggle. Each page has a sibling in the other language;
// the toggle is just a link with a data-mirror attribute, but we
// also remember the user's choice for next visit.

(function () {
  const toggle = document.querySelector(".lang-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const target = toggle.dataset.mirror;
    if (!target) return;
    const targetLang = toggle.dataset.lang;
    try {
      localStorage.setItem("lang", targetLang);
    } catch (e) {}
    window.location.href = target;
  });
})();
