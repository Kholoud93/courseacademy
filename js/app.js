import { loadComponent, setActiveNav } from "./common.js";
import { initNavigation } from "./navigation.js";
import { initModals } from "./modal.js";
import { initForms } from "./forms.js";


export async function initApp() {
  const layout = document.body.dataset.layout;

  if (document.getElementById("site-header")) {
    await loadComponent("#site-header", "components/navbar.html");
  }

  if (document.getElementById("site-footer")) {
    await loadComponent("#site-footer", "components/footer.html");
  }

  if (layout === "dashboard" || layout === "learning") {
    await loadComponent("#dashboard-shell", "components/sidebar.html");
  }

  setActiveNav();
  initNavigation();
  initModals();
  initForms();
}

document.addEventListener("DOMContentLoaded", async () => {
  await initApp();
});
