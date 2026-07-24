function formatFavPrice(n, currency) {
  if (!n || n === 0) return "مجاني";
  return `${Number(n).toLocaleString("en-US")} ${currency || "د.أ"}`;
}

function favCardHtml(item) {
  const oldHtml = item.oldPrice
    ? `<span class="fav-card__price-old">${formatFavPrice(item.oldPrice, item.currency)}</span>`
    : "";
  const ratingHtml =
    item.rating != null
      ? `<span class="fav-card__rating"><i class="ri-star-fill"></i> ${Number(item.rating).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>`
      : "";
  const badge = item.category
    ? `<span class="fav-card__badge">${item.category}</span>`
    : "";

  return `
    <article class="fav-card" data-store-key="${item.type}:${item.id}">
      <div class="fav-card__media">
        <a href="${item.href}" class="fav-card__media-link">
          <img src="${item.image}" alt="${item.title}">
        </a>
        ${badge}
        <button type="button" class="fav-card__heart" data-fav-remove data-id="${item.id}" data-type="${item.type}" aria-label="إزالة من المفضلة">
          <i class="ri-heart-fill"></i>
        </button>
        ${ratingHtml}
      </div>
      <div class="fav-card__body">
        <h3 class="fav-card__title">
          <a href="${item.href}">${item.title}</a>
        </h3>
        <p class="fav-card__instructor">${item.instructor || ""}</p>
        <div class="fav-card__footer">
          <div class="fav-card__price">
            <span class="fav-card__price-current">${formatFavPrice(item.price, item.currency)}</span>
            ${oldHtml}
          </div>
          <a href="${item.href}" class="fav-card__btn">عرض</a>
        </div>
      </div>
    </article>`;
}

function renderFavoritesPage() {
  const grid = document.querySelector("[data-favs-grid]");
  const subtitle = document.querySelector("[data-favs-subtitle]");
  if (!grid || typeof Store === "undefined") return;

  const items = Store.getFavorites();
  const count = items.length;

  if (subtitle) {
    if (count === 0) subtitle.textContent = "لا توجد عناصر في المفضلة";
    else if (count === 1) subtitle.textContent = "لديك عنصر واحد في المفضلة";
    else if (count === 2) subtitle.textContent = "لديك عنصران في المفضلة";
    else subtitle.textContent = `لديك ${count} عناصر في المفضلة`;
  }

  if (count === 0) {
    grid.innerHTML = `<div class="favs-empty">أضف دورات أو مسارات للمفضلة لتظهر هنا</div>`;
    grid.classList.add("is-empty");
  } else {
    grid.innerHTML = items.map(favCardHtml).join("");
    grid.classList.remove("is-empty");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-favs-grid]");
  if (!grid) return;

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-fav-remove]");
    if (!btn || typeof Store === "undefined") return;
    Store.removeFromFavorites({
      id: btn.dataset.id,
      type: btn.dataset.type || "course",
    });
  });

  document.addEventListener("store:change", renderFavoritesPage);
  renderFavoritesPage();
});
