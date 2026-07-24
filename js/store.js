const Store = (function () {
  const KEYS = {
    cart: "ca_cart",
    favorites: "ca_favorites",
  };

  function read(key) {
    try {
      const raw = localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function write(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
  }

  function itemKey(item) {
    return `${item.type || "course"}:${String(item.id)}`;
  }

  function normalize(item) {
    if (!item || item.id == null) return null;
    const type = item.type === "path" ? "path" : "course";
    const href =
      item.href ||
      (type === "path"
        ? `path-details.html?id=${item.id}`
        : `course-details.html?id=${item.id}`);
    return {
      id: item.id,
      type,
      title: item.title || "",
      instructor: item.instructor || item.instructorName || "",
      price: Number(item.price) || 0,
      oldPrice: Number(item.oldPrice) || 0,
      image: item.image || "assets/images/track-bim.png",
      href,
      category: item.category || "",
      rating: item.rating != null ? Number(item.rating) : null,
      currency: item.currency || "د.أ",
    };
  }

  function formatMoney(amount, currency) {
    const cur = currency || "د.أ";
    return `${Number(amount || 0).toLocaleString("en-US")} ${cur}`;
  }

  function formatProductPrice(amount, currency) {
    if (!amount || amount === 0) return "مجاني";
    return formatMoney(amount, currency);
  }

  function countLabel(n) {
    if (n === 0) return "0 عناصر";
    if (n === 1) return "عنصر واحد";
    if (n === 2) return "عنصران";
    if (n >= 3 && n <= 10) return `${n} عناصر`;
    return `${n} عنصراً`;
  }

  function getCart() {
    return read(KEYS.cart);
  }

  function getFavorites() {
    return read(KEYS.favorites);
  }

  function hasIn(list, item) {
    const key = itemKey(normalize(item) || item);
    return list.some((entry) => itemKey(entry) === key);
  }

  function addTo(key, item) {
    const normalized = normalize(item);
    if (!normalized) return false;
    const list = read(key);
    if (hasIn(list, normalized)) return false;
    list.push(normalized);
    write(key, list);
    syncUI();
    return true;
  }

  function removeFrom(key, item) {
    const normalized = normalize(item) || item;
    if (!normalized || normalized.id == null) return false;
    const target = itemKey(normalized);
    const next = read(key).filter((entry) => itemKey(entry) !== target);
    write(key, next);
    syncUI();
    return true;
  }

  function toggleIn(key, item) {
    const normalized = normalize(item);
    if (!normalized) return false;
    if (hasIn(read(key), normalized)) {
      removeFrom(key, normalized);
      return false;
    }
    addTo(key, normalized);
    return true;
  }

  function cartTotal(list) {
    return list.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  }

  function renderPanelItem(item, listKey) {
    const price = formatProductPrice(item.price, item.currency);
    return `
      <article class="nav-panel__item" data-store-key="${itemKey(item)}">
        <a href="${item.href}" class="nav-panel__thumb">
          <img src="${item.image}" alt="">
        </a>
        <div class="nav-panel__body">
          <h3 class="nav-panel__item-title"><a href="${item.href}">${item.title}</a></h3>
          <p class="nav-panel__meta">${item.instructor || ""}</p>
          <div class="nav-panel__row">
            <span class="nav-panel__price">${price}</span>
            <button type="button" class="nav-panel__remove" data-store-remove="${listKey}" data-id="${item.id}" data-type="${item.type}" aria-label="إزالة">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </div>
      </article>`;
  }

  function emptyPanelHtml(listKey) {
    if (listKey === "cart") {
      return `<p class="nav-panel__empty">سلتك فارغة حالياً</p>`;
    }
    return `<p class="nav-panel__empty">لا توجد عناصر في المفضلة</p>`;
  }

  function renderDrawer(listKey, items) {
    const drawer = document.querySelector(`[data-drawer="${listKey}"]`);
    if (!drawer) return;

    const countEl = drawer.querySelector(".nav-panel__count");
    if (countEl) countEl.textContent = countLabel(items.length);

    const listEl = drawer.querySelector(".nav-panel__list");
    if (listEl) {
      listEl.innerHTML =
        items.length === 0
          ? emptyPanelHtml(listKey)
          : items.map((item) => renderPanelItem(item, listKey)).join("");
    }

    if (listKey === "cart") {
      const totalEl = drawer.querySelector(".nav-panel__total strong");
      if (totalEl) {
        totalEl.textContent = formatMoney(cartTotal(items), items[0]?.currency);
      }
      const checkout = drawer.querySelector(".nav-panel__footer .btn");
      if (checkout) {
        checkout.setAttribute("href", items.length ? "cart.html" : "courses.html");
        checkout.textContent = items.length ? "إتمام الشراء" : "تصفح الدورات";
      }
    }
  }

  function updateBadges() {
    const cartCount = getCart().length;
    const favCount = getFavorites().length;

    document.querySelectorAll(".home-nav__cart-badge").forEach((el) => {
      el.textContent = String(cartCount);
      el.hidden = cartCount === 0;
    });

    document.querySelectorAll("[data-store-badge='cart']").forEach((el) => {
      el.textContent = String(cartCount);
      el.hidden = cartCount === 0;
    });

    document.querySelectorAll("[data-store-badge='favorites']").forEach((el) => {
      el.textContent = String(favCount);
      el.hidden = favCount === 0;
    });
  }

  function updateActionButtons() {
    document.querySelectorAll("[data-store-product]").forEach((root) => {
      const id = root.dataset.id;
      const type = root.dataset.type || "course";
      if (id == null) return;
      const ref = { id, type };
      const inCart = hasIn(getCart(), ref);
      const inFav = hasIn(getFavorites(), ref);

      const cartBtn = root.querySelector(".cd-buy-card__btn--cart, [data-store-add='cart']");
      if (cartBtn) {
        cartBtn.classList.toggle("is-added", inCart);
        cartBtn.innerHTML = inCart
          ? 'في السلة <i class="ri-shopping-cart-2-fill"></i>'
          : 'أضف للسلة <i class="ri-shopping-cart-2-line"></i>';
      }

      const wishBtn = root.querySelector(".cd-buy-card__btn--wish, [data-store-add='favorites']");
      if (wishBtn) {
        wishBtn.classList.toggle("is-added", inFav);
        wishBtn.innerHTML = inFav
          ? 'في المفضلة <i class="ri-heart-fill"></i>'
          : 'أضف للمفضلة <i class="ri-heart-line"></i>';
      }
    });
  }

  function syncUI() {
    renderDrawer("cart", getCart());
    renderDrawer("favorites", getFavorites());
    updateBadges();
    updateActionButtons();
    document.dispatchEvent(new CustomEvent("store:change", { detail: { cart: getCart(), favorites: getFavorites() } }));
  }

  function productFromRoot(root) {
    if (!root) return null;
    return normalize({
      id: root.dataset.id,
      type: root.dataset.type || "course",
      title: root.dataset.title,
      instructor: root.dataset.instructor,
      price: root.dataset.price,
      oldPrice: root.dataset.oldPrice,
      image: root.dataset.image,
      href: root.dataset.href,
      category: root.dataset.category,
      rating: root.dataset.rating,
      currency: root.dataset.currency,
    });
  }

  function bindProduct(root, product) {
    const normalized = normalize(product);
    if (!root || !normalized) return;
    root.dataset.storeProduct = "";
    root.dataset.id = String(normalized.id);
    root.dataset.type = normalized.type;
    root.dataset.title = normalized.title;
    root.dataset.instructor = normalized.instructor;
    root.dataset.price = String(normalized.price);
    root.dataset.oldPrice = String(normalized.oldPrice || 0);
    root.dataset.image = normalized.image;
    root.dataset.href = normalized.href;
    if (normalized.category) root.dataset.category = normalized.category;
    if (normalized.rating != null) root.dataset.rating = String(normalized.rating);
    if (normalized.currency) root.dataset.currency = normalized.currency;
    updateActionButtons();
  }

  function onClick(e) {
    const removeBtn = e.target.closest("[data-store-remove]");
    if (removeBtn) {
      e.preventDefault();
      const listKey = removeBtn.dataset.storeRemove;
      const key = listKey === "favorites" ? KEYS.favorites : KEYS.cart;
      removeFrom(key, {
        id: removeBtn.dataset.id,
        type: removeBtn.dataset.type || "course",
      });
      return;
    }

    const addBtn = e.target.closest("[data-store-add], .cd-buy-card__btn--cart, .cd-buy-card__btn--wish");
    if (!addBtn) return;

    const root = addBtn.closest("[data-store-product]");
    const product = productFromRoot(root);
    if (!product) return;

    e.preventDefault();

    const isWish =
      addBtn.matches(".cd-buy-card__btn--wish") ||
      addBtn.dataset.storeAdd === "favorites";

    if (isWish) {
      toggleIn(KEYS.favorites, product);
      return;
    }

    const added = addTo(KEYS.cart, product);
    if (added && typeof openDrawer === "function") {
      openDrawer("cart");
    }
  }

  function init() {
    document.addEventListener("click", onClick);
    syncUI();
  }

  return {
    init,
    syncUI,
    bindProduct,
    formatMoney,
    getCart,
    getFavorites,
    addToCart(item) {
      return addTo(KEYS.cart, item);
    },
    removeFromCart(item) {
      return removeFrom(KEYS.cart, item);
    },
    isInCart(item) {
      return hasIn(getCart(), item);
    },
    addToFavorites(item) {
      return addTo(KEYS.favorites, item);
    },
    removeFromFavorites(item) {
      return removeFrom(KEYS.favorites, item);
    },
    toggleFavorite(item) {
      return toggleIn(KEYS.favorites, item);
    },
    isInFavorites(item) {
      return hasIn(getFavorites(), item);
    },
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  Store.init();
});
