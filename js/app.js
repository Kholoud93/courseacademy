import { loadComponent, setActiveNav } from "./common.js";
import { initNavigation } from "./navigation.js";
import { initModals } from "./modal.js";
import { initForms } from "./forms.js";

/** Boot shared functionality on every page */
export async function initApp() {
  const layout = document.body.dataset.layout;

  if (layout === "main") {
    await loadComponent("#site-header", "components/navbar.html");
    await loadComponent("#site-footer", "components/footer.html");
  }

  if (layout === "dashboard" || layout === "learning") {
    await loadComponent("#dashboard-shell", "components/sidebar.html");
  }

  // layout "home" uses inline navbar/footer in index.html

  setActiveNav();
  initNavigation();
  initModals();
  initForms();
}

document.addEventListener("DOMContentLoaded", async () => {
  await initApp();
});
