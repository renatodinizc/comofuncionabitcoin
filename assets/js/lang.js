// Language toggle + preference persistence.
//
// On toggle click: save the chosen language to localStorage and navigate
// to the sibling page in that language.
//
// On homepage load: if the user has a saved preference that disagrees
// with the current page's language, redirect them to their preferred
// homepage. Deep links (article pages, map, about) are NOT redirected —
// a PT link shared in PT stays PT, regardless of saved preference.

(function () {
  const path = window.location.pathname;
  const isHome =
    path === "/" ||
    path === "/index.html" ||
    path === "/en/" ||
    path === "/en/index.html";
  const currentLang = document.documentElement.lang || "pt";

  // Auto-redirect from the homepage if a preference exists and disagrees.
  if (isHome) {
    let saved = null;
    try {
      saved = localStorage.getItem("lang");
    } catch (e) {}
    if (saved && saved !== currentLang) {
      if (saved === "en" && currentLang === "pt") {
        window.location.replace("/en/");
        return;
      }
      if (saved === "pt" && currentLang === "en") {
        window.location.replace("/");
        return;
      }
    }
  }

  // Toggle button: remember choice and navigate.
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
