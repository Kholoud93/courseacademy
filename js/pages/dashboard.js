import { transactions } from "../data/instructors.js";

const page = document.body.dataset.page;

function initNotificationsPanel() {
  const root = document.querySelector("[data-notif]");
  if (!root) return;

  const toggle = root.querySelector("[data-notif-toggle]");
  const panel = root.querySelector("[data-notif-panel]");
  if (!toggle || !panel) return;

  function openPanel() {
    root.classList.add("is-open");
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    root.classList.remove("is-open");
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  function togglePanel() {
    if (root.classList.contains("is-open")) closePanel();
    else openPanel();
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePanel();
  });

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) closePanel();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNotificationsPanel();

  if (page === "wallet") {
    const tbody = document.querySelector("#transactions tbody");
    if (tbody) {
      tbody.innerHTML = transactions
        .map(
          (t) =>
            `<tr><td>${t.date}</td><td>${t.description}</td><td>${t.amount}</td><td>${t.status}</td></tr>`
        )
        .join("");
    }
  }
});
