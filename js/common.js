function $(selector, parent = document) {
  return parent.querySelector(selector);
}

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function formatPrice(price) {
  if (!price || price === 0) return "مجاني";
  return `${Number(price).toLocaleString("ar-SA")} ر.س`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
}

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h} س ${m} د`;
  if (h) return `${h} ساعة`;
  return `${m} دقيقة`;
}

function loadComponent(selector, file) {
  const el = $(selector);
  if (!el) return;
  if (el.childElementCount > 0) return;
  console.warn("Component missing for file:// (inline it in HTML):", selector, file);
}

function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  const navPage = page === "blog-details" ? "blog" : page;
  document.querySelectorAll(`[data-nav="${navPage}"]`).forEach((link) => {
    link.classList.add("is-active");
  });
}

function renderHTML(container, html) {
  if (!container) return;
  container.innerHTML = html;
}

function renderList(container, items, templateFn) {
  if (!container) return;
  container.innerHTML = items.map(templateFn).join("");
}
