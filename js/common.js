

export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

export function formatPrice(price) {
  if (!price || price === 0) return "مجاني";
  return `${Number(price).toLocaleString("ar-SA")} ر.س`;
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
}

export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h} س ${m} د`;
  if (h) return `${h} ساعة`;
  return `${m} دقيقة`;
}


export async function loadComponent(selector, file) {
  const el = $(selector);
  if (!el) return;
  if (el.childElementCount > 0) return;
  try {
    const url = new URL(file, window.location.href);
    const res = await fetch(url.href);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.warn(`Could not load ${file}`, err);
  }
}


export function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  const navPage = page === "blog-details" ? "blog" : page;
  document.querySelectorAll(`[data-nav="${navPage}"]`).forEach((link) => {
    link.classList.add("is-active");
  });
}


export function renderHTML(container, html) {
  if (!container) return;
  container.innerHTML = html;
}


export function renderList(container, items, templateFn) {
  if (!container) return;
  container.innerHTML = items.map(templateFn).join("");
}
