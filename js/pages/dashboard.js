import { transactions } from "../data/instructors.js";

const page = document.body.dataset.page;

document.addEventListener("DOMContentLoaded", () => {
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
