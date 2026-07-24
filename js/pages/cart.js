function formatCartPrice(n, currency) {
  return `${Number(n || 0).toLocaleString("en-US")} ${currency || "د.أ"}`;
}

function cartItemHtml(item) {
  const oldHtml = item.oldPrice
    ? `<span class="cart-item__price-old">${formatCartPrice(item.oldPrice, item.currency)}</span>`
    : "";
  return `
    <article class="cart-item" data-store-key="${item.type}:${item.id}" data-price="${item.price}" data-old="${item.oldPrice || 0}">
      <a href="${item.href}" class="cart-item__thumb">
        <img src="${item.image}" alt="${item.title}">
      </a>
      <div class="cart-item__info">
        <h3 class="cart-item__title">
          <a href="${item.href}">${item.title}</a>
        </h3>
        <p class="cart-item__instructor">${item.instructor || ""}</p>
        <div class="cart-item__price">
          <span class="cart-item__price-current">${formatCartPrice(item.price, item.currency)}</span>
          ${oldHtml}
        </div>
      </div>
      <button type="button" class="cart-item__remove" data-cart-remove data-id="${item.id}" data-type="${item.type}" aria-label="حذف">
        <i class="ri-delete-bin-line"></i>
      </button>
    </article>`;
}

function updateSummary(items) {
  const originalEl = document.querySelector("[data-cart-original]");
  const discountEl = document.querySelector("[data-cart-discount]");
  const totalEl = document.querySelector("[data-cart-total]");
  const list = document.querySelector("[data-cart-items]");

  let original = 0;
  let total = 0;

  items.forEach((item) => {
    original += Number(item.oldPrice) || Number(item.price) || 0;
    total += Number(item.price) || 0;
  });

  const discount = Math.max(0, original - total);
  const currency = items[0]?.currency || "د.أ";

  if (originalEl) originalEl.textContent = formatCartPrice(original, currency);
  if (discountEl) discountEl.textContent = `-${formatCartPrice(discount, currency)}`;
  if (totalEl) totalEl.textContent = formatCartPrice(total, currency);

  if (list) {
    list.classList.toggle("is-empty", items.length === 0);
  }
}

function renderCartPage() {
  const list = document.querySelector("[data-cart-items]");
  if (!list || typeof Store === "undefined") return;

  const items = Store.getCart();

  if (items.length === 0) {
    list.innerHTML = `<div class="cart-empty">سلتك فارغة حالياً</div>`;
  } else {
    list.innerHTML = items.map(cartItemHtml).join("");
  }

  updateSummary(items);
}

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("[data-cart-items]");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cart-remove]");
    if (!btn || typeof Store === "undefined") return;
    Store.removeFromCart({
      id: btn.dataset.id,
      type: btn.dataset.type || "course",
    });
  });

  document.addEventListener("store:change", renderCartPage);
  renderCartPage();
});
