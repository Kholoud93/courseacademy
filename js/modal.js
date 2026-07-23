function initModals() {
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-modal-open]");
    if (openBtn) {
      document.querySelector(`[data-modal="${openBtn.dataset.modalOpen}"]`)?.classList.add("is-open");
      return;
    }

    const closeBtn = e.target.closest("[data-modal-close]");
    if (closeBtn) {
      closeBtn.closest(".modal-overlay")?.classList.remove("is-open");
      return;
    }

    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("is-open");
    }
  });
}
