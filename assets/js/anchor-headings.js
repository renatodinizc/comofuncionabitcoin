// Anchor-linked headings.
//
// For every <h2>, <h3>, <h4> inside .article-body: assign a slug-based id
// (if absent) and prepend a small "#" link that copies the section URL to
// the clipboard when clicked. Hover-revealed so it doesn't visually clutter
// the prose. Slugs are diacritic-stripped so PT headings like "Solução"
// become "solucao".

(function () {
  const body = document.querySelector(".article-body");
  if (!body) return;

  const slugify = (s) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const used = new Map();
  const t =
    document.documentElement.lang === "en"
      ? { copy: "Copy link to this section", copied: "Link copied" }
      : { copy: "Copiar link para esta seção", copied: "Link copiado" };

  body.querySelectorAll("h2, h3, h4").forEach((h) => {
    let slug = h.id || slugify(h.textContent || "");
    if (!slug) return;
    if (used.has(slug)) {
      const n = used.get(slug) + 1;
      used.set(slug, n);
      slug = `${slug}-${n}`;
    } else {
      used.set(slug, 1);
    }
    h.id = slug;

    const a = document.createElement("a");
    a.href = "#" + slug;
    a.className = "heading-anchor";
    a.setAttribute("aria-label", t.copy);
    a.textContent = "#";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const url = location.origin + location.pathname + "#" + slug;
      history.replaceState(null, "", "#" + slug);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(url)
          .then(() => flash(a, t.copied))
          .catch(() => {});
      }
    });
    h.insertBefore(a, h.firstChild);
  });

  function flash(el, label) {
    const original = el.textContent;
    el.textContent = "✓";
    el.classList.add("copied");
    el.setAttribute("aria-label", label);
    setTimeout(() => {
      el.textContent = original;
      el.classList.remove("copied");
      el.setAttribute("aria-label", t.copy);
    }, 1400);
  }
})();
