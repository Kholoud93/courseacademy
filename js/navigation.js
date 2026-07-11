
export function initDrawers() {
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-drawer-open]");
    if (openBtn) {
      const id = openBtn.dataset.drawerOpen;
      document.querySelector(`[data-drawer="${id}"]`)?.classList.add("is-open");
      document.querySelector(`[data-drawer-overlay="${id}"]`)?.classList.add("is-open");
      document.body.classList.add("drawer-open");
      return;
    }

    const closeBtn = e.target.closest("[data-drawer-close]");
    if (closeBtn) {
      closeDrawer(closeBtn.dataset.drawerClose);
      return;
    }

    const overlay = e.target.closest("[data-drawer-overlay]");
    if (overlay) {
      closeDrawer(overlay.dataset.drawerOverlay);
    }
  });
}

function closeDrawer(id) {
  document.querySelector(`[data-drawer="${id}"]`)?.classList.remove("is-open");
  document.querySelector(`[data-drawer-overlay="${id}"]`)?.classList.remove("is-open");
  document.body.classList.remove("drawer-open");
}


export function initTabs() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".tabs__btn");
    if (!btn) return;

    const tabsId = btn.dataset.tabs;
    const tabId = btn.dataset.tab;
    document.querySelectorAll(`[data-tabs="${tabsId}"] .tabs__btn`).forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    document.dispatchEvent(new CustomEvent("tabchange", { detail: { tabsId, tabId } }));
  });
}


export function initAccordion() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-accordion-toggle]");
    if (btn) btn.closest("[data-accordion-item]")?.classList.toggle("is-open");
  });
}


export function initPagination(callback) {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".pagination__btn");
    if (!btn || btn.disabled || !btn.dataset.page) return;
    callback(Number(btn.dataset.page));
  });
}

export function initNavigation() {
  initDrawers();
  initTabs();
  initAccordion();
}
