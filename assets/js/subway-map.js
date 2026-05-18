// Subway map interactivity: hover tooltips + click-to-stub-modal.
// Reads station metadata from data attributes on each .station group.

(function () {
  const map = document.querySelector(".subway-map");
  if (!map) return;

  const lang = document.documentElement.lang || "pt";
  const t = {
    pt: {
      comingSoon: "Em breve",
      comingSoonDesc: "Esta estação ainda não foi escrita. Volte em breve.",
      trackLabel: {
        trunk: "Tronco comum",
        nontechnical: "Linha não-técnica",
        technical: "Linha técnica",
        branch: "Aprofundamento técnico",
      },
    },
    en: {
      comingSoon: "Coming soon",
      comingSoonDesc: "This station has not been written yet. Check back soon.",
      trackLabel: {
        trunk: "Common trunk",
        nontechnical: "Non-technical line",
        technical: "Technical line",
        branch: "Technical deep-dive",
      },
    },
  }[lang === "en" ? "en" : "pt"];

  // ============ Tooltip ============
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.setAttribute("role", "tooltip");
  document.body.appendChild(tooltip);

  function showTooltip(station, evt) {
    const title = station.dataset.title || "—";
    const desc = station.dataset.desc || "";
    const track = station.dataset.track || "trunk";
    const trackLabel = t.trackLabel[track] || "";
    tooltip.innerHTML = `
      <div class="tt-track">${trackLabel}</div>
      <div class="tt-title">${title}</div>
      ${desc ? `<div class="tt-desc">${desc}</div>` : ""}
    `;
    positionTooltip(evt);
    tooltip.classList.add("visible");
  }

  function positionTooltip(evt) {
    const pad = 14;
    let x = evt.clientX + pad;
    let y = evt.clientY + pad;
    const ttw = tooltip.offsetWidth;
    const tth = tooltip.offsetHeight;
    if (x + ttw + pad > window.innerWidth) x = evt.clientX - ttw - pad;
    if (y + tth + pad > window.innerHeight) y = evt.clientY - tth - pad;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }

  function hideTooltip() {
    tooltip.classList.remove("visible");
  }

  // ============ Modal ============
  const modal = document.querySelector(".modal-backdrop");
  const modalEl = modal?.querySelector(".modal");
  const modalTitle = modal?.querySelector(".modal h2");
  const modalTrack = modal?.querySelector(".modal-track");
  const modalDesc = modal?.querySelector(".modal-desc");
  const modalStatus = modal?.querySelector(".modal-status");
  const modalClose = modal?.querySelector(".modal-close");

  function openModal(station) {
    if (!modal) return;
    const title = station.dataset.title || "—";
    const desc = station.dataset.desc || "";
    const track = station.dataset.track || "trunk";
    modalTitle.textContent = title;
    modalTrack.textContent = t.trackLabel[track] || "";
    modalDesc.textContent = desc;
    modalStatus.textContent = t.comingSoon;
    modal.classList.add("open");
    hideTooltip();
    document.addEventListener("keydown", onEsc);
  }

  function closeModal() {
    modal?.classList.remove("open");
    document.removeEventListener("keydown", onEsc);
  }

  function onEsc(e) {
    if (e.key === "Escape") closeModal();
  }

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // ============ Bind stations ============
  map.querySelectorAll(".station").forEach((station) => {
    station.addEventListener("mouseenter", (e) => showTooltip(station, e));
    station.addEventListener("mousemove", positionTooltip);
    station.addEventListener("mouseleave", hideTooltip);
    station.addEventListener("click", () => openModal(station));
    station.setAttribute("tabindex", "0");
    station.setAttribute("role", "button");
    station.setAttribute("aria-label", station.dataset.title || "station");
    station.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(station);
      }
    });
  });
})();
