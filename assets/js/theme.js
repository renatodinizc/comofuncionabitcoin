// Light/dark mode toggle. Single theme, so no theme picker — just mode.
(function () {
  function getStored(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
  function setStored(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  function applyMode(mode) {
    document.documentElement.setAttribute("data-mode", mode);
    setStored("mode", mode);
    const btn = document.querySelector(".mode-toggle");
    if (btn) btn.textContent = mode === "dark" ? "☀" : "☾";
  }

  function currentMode() {
    return document.documentElement.getAttribute("data-mode") || "light";
  }

  // Boot: stored > system preference > light
  const stored = getStored("mode");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyMode(stored || (prefersDark ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".mode-toggle");
    if (!btn) return;
    btn.textContent = currentMode() === "dark" ? "☀" : "☾";
    btn.addEventListener("click", () => {
      applyMode(currentMode() === "dark" ? "light" : "dark");
    });
  });
})();
