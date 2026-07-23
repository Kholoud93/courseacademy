function initDrawers() {
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-drawer-open]");
    if (openBtn) {
      openDrawer(openBtn.dataset.drawerOpen);
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

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = document.querySelector("[data-drawer].is-open");
    if (open) closeDrawer(open.dataset.drawer);
  });
}

function openDrawer(id) {
  closeAllDrawers();
  document.querySelector(`[data-drawer="${id}"]`)?.classList.add("is-open");
  document.querySelector(`[data-drawer-overlay="${id}"]`)?.classList.add("is-open");
  document.body.classList.add("drawer-open");
  document.body.dataset.openDrawer = id;
}

function closeDrawer(id) {
  document.querySelector(`[data-drawer="${id}"]`)?.classList.remove("is-open");
  document.querySelector(`[data-drawer-overlay="${id}"]`)?.classList.remove("is-open");
  if (!document.querySelector("[data-drawer].is-open")) {
    document.body.classList.remove("drawer-open");
    delete document.body.dataset.openDrawer;
  }
}

function closeAllDrawers() {
  document.querySelectorAll("[data-drawer].is-open").forEach((el) => el.classList.remove("is-open"));
  document.querySelectorAll("[data-drawer-overlay].is-open").forEach((el) => el.classList.remove("is-open"));
  document.body.classList.remove("drawer-open");
  delete document.body.dataset.openDrawer;
}

function initTabs() {
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

function initAccordion() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-accordion-toggle]");
    if (btn) btn.closest("[data-accordion-item]")?.classList.toggle("is-open");
  });
}

function initPagination(callback) {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".pagination__btn");
    if (!btn || btn.disabled || !btn.dataset.page) return;
    callback(Number(btn.dataset.page));
  });
}

function initNavigation() {
  initDrawers();
  initTabs();
  initAccordion();
}
