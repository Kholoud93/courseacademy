// Shared helpers used across the project

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

/** Load HTML partial into a placeholder element */
export async function loadComponent(selector, file) {
  const el = $(selector);
  if (!el) return;
  try {
    const res = await fetch(file);
    el.innerHTML = await res.text();
  } catch (err) {
    console.warn(`Could not load ${file}`, err);
  }
}

/** Highlight active nav link based on body[data-page] */
export function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => {
    link.classList.add("is-active");
  });
}

/** Render HTML string into a container */
export function renderHTML(container, html) {
  if (!container) return;
  container.innerHTML = html;
}

/** Render array of HTML strings */
export function renderList(container, items, templateFn) {
  if (!container) return;
  container.innerHTML = items.map(templateFn).join("");
}
