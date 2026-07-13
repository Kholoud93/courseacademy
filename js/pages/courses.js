import { getQueryParam } from "../common.js";

let activeCategory = "all";
let activeLevel = "all";
let sortBy = "newest";
let searchQuery = getQueryParam("q") || "";

function getCards() {
  return [...document.querySelectorAll("#course-grid .home-track-card")];
}

function applyFilters() {
  const cards = getCards();
  const q = searchQuery.trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const categoryOk = activeCategory === "all" || card.dataset.category === activeCategory;
    const levelOk = activeLevel === "all" || card.dataset.level === activeLevel;
    const text = `${card.textContent || ""}`.toLowerCase();
    const searchOk = !q || text.includes(q);
    const show = categoryOk && levelOk && searchOk;
    card.hidden = !show;
    if (show) visible += 1;
  });

  const visibleCards = cards.filter((card) => !card.hidden);
  visibleCards.sort((a, b) => {
    if (sortBy === "popular") return Number(b.dataset.students) - Number(a.dataset.students);
    if (sortBy === "rating") return Number(b.dataset.rating) - Number(a.dataset.rating);
    if (sortBy === "price-asc") return Number(a.dataset.price) - Number(b.dataset.price);
    if (sortBy === "price-desc") return Number(b.dataset.price) - Number(a.dataset.price);
    return Number(b.dataset.id) - Number(a.dataset.id);
  });

  const grid = document.getElementById("course-grid");
  visibleCards.forEach((card) => grid.appendChild(card));

  const countEl = document.getElementById("course-count");
  if (countEl) countEl.textContent = `عرض ${visible.toLocaleString("ar-SA")} دورة`;
}

function setActivePill(group, value) {
  const selector = group === "category" ? "#category-filters [data-category]" : "#level-filters [data-level]";
  document.querySelectorAll(selector).forEach((btn) => {
    const key = group === "category" ? btn.dataset.category : btn.dataset.level;
    btn.classList.toggle("is-active", key === value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".courses-hero__search-input");
  if (searchInput && searchQuery) searchInput.value = searchQuery;

  setActivePill("category", activeCategory);
  setActivePill("level", activeLevel);
  applyFilters();

  document.addEventListener("click", (e) => {
    const categoryBtn = e.target.closest("#category-filters [data-category]");
    if (categoryBtn) {
      activeCategory = categoryBtn.dataset.category;
      setActivePill("category", activeCategory);
      applyFilters();
      return;
    }

    const levelBtn = e.target.closest("#level-filters [data-level]");
    if (levelBtn) {
      activeLevel = levelBtn.dataset.level;
      setActivePill("level", activeLevel);
      applyFilters();
    }
  });

  document.getElementById("course-sort")?.addEventListener("change", (e) => {
    sortBy = e.target.value;
    applyFilters();
  });

  document.querySelector(".courses-hero__search")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.querySelector(".courses-hero__search-input");
    searchQuery = input?.value || "";
    applyFilters();
  });
});
