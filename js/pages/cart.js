function formatPrice(n) {
  return `${n.toLocaleString("en-US")} د.أ`;
}

function updateSummary() {
  const items = document.querySelectorAll(".cart-item");
  const originalEl = document.querySelector("[data-cart-original]");
  const discountEl = document.querySelector("[data-cart-discount]");
  const totalEl = document.querySelector("[data-cart-total]");
  const list = document.querySelector("[data-cart-items]");

  let original = 0;
  let total = 0;

  items.forEach((item) => {
    original += Number(item.dataset.old) || 0;
    total += Number(item.dataset.price) || 0;
  });

  const discount = original - total;

  if (originalEl) originalEl.textContent = formatPrice(original);
  if (discountEl) discountEl.textContent = `-${formatPrice(discount)}`;
  if (totalEl) totalEl.textContent = formatPrice(total);

  if (list) {
    list.classList.toggle("is-empty", items.length === 0);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("[data-cart-items]");
  if (!list) return;

  if (!list.querySelector(".cart-empty")) {
    const empty = document.createElement("div");
    empty.className = "cart-empty";
    empty.textContent = "سلتك فارغة حالياً";
    list.appendChild(empty);
  }

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cart-remove]");
    if (!btn) return;
    const item = btn.closest(".cart-item");
    if (item) {
      item.remove();
      updateSummary();
    }
  });

  updateSummary();
});
