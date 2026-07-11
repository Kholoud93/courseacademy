import { renderList, getQueryParam } from "../common.js";
import { homeFeaturedTrackCard } from "../render.js";
import { courses, courseCategories, courseLevels } from "../data/courses.js";

let activeCategory = "all";
let activeLevel = "all";
let sortBy = "newest";
let searchQuery = getQueryParam("q") || "";

function renderFilterPills(containerId, items, activeId, dataKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map((item) => `
    <button
      type="button"
      class="courses-filters__pill${item.id === activeId ? " is-active" : ""}"
      data-${dataKey}="${item.id}"
    >${item.label}</button>
  `).join("");
}

function getFilteredCourses() {
  let list = [...courses];

  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter((course) =>
      course.title.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q) ||
      course.category.toLowerCase().includes(q)
    );
  }

  if (activeCategory !== "all") {
    list = list.filter((course) => course.categorySlug === activeCategory);
  }

  if (activeLevel !== "all") {
    list = list.filter((course) => course.levelSlug === activeLevel);
  }

  if (sortBy === "popular") {
    list.sort((a, b) => b.studentCount - a.studentCount);
  } else if (sortBy === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else {
    list.sort((a, b) => b.id - a.id);
  }

  return list;
}

function renderPage() {
  const filtered = getFilteredCourses();
  const grid = document.getElementById("course-grid");
  const countEl = document.getElementById("course-count");
  const searchInput = document.querySelector(".courses-hero__search-input");
  const sortSelect = document.getElementById("course-sort");

  renderList(grid, filtered, homeFeaturedTrackCard);

  if (countEl) {
    countEl.textContent = `عرض ${filtered.length.toLocaleString("ar-SA")} دورة`;
  }

  if (searchInput && searchInput.value !== searchQuery) {
    searchInput.value = searchQuery;
  }

  if (sortSelect && sortSelect.value !== sortBy) {
    sortSelect.value = sortBy;
  }

  renderFilterPills("category-filters", courseCategories, activeCategory, "category");
  renderFilterPills("level-filters", courseLevels, activeLevel, "level");
}

document.addEventListener("DOMContentLoaded", () => {
  renderPage();

  document.addEventListener("click", (e) => {
    const categoryBtn = e.target.closest("[data-category]");
    if (categoryBtn) {
      activeCategory = categoryBtn.dataset.category;
      renderPage();
      return;
    }

    const levelBtn = e.target.closest("[data-level]");
    if (levelBtn) {
      activeLevel = levelBtn.dataset.level;
      renderPage();
    }
  });

  document.getElementById("course-sort")?.addEventListener("change", (e) => {
    sortBy = e.target.value;
    renderPage();
  });

  document.querySelector(".courses-hero__search")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.querySelector(".courses-hero__search-input");
    searchQuery = input?.value || "";
    renderPage();
  });
});
