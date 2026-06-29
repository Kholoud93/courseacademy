import { renderList, getQueryParam } from "../common.js";
import { courseCard } from "../render.js";
import { courses } from "../data/courses.js";
import { initPagination } from "../navigation.js";

const PAGE_SIZE = 4;
let currentPage = 1;

function renderGrid() {
  const category = getQueryParam("category");
  const map = { programming: "برمجة", design: "تصميم", marketing: "تسويق", business: "أعمال" };
  let filtered = category ? courses.filter((c) => c.categoryName === map[category]) : courses;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const items = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  renderList(document.getElementById("course-grid"), items, courseCard);

  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  let html = `<nav class="pagination">`;
  html += `<button class="pagination__btn" data-page="${currentPage - 1}" ${currentPage <= 1 ? "disabled" : ""}>‹</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="pagination__btn${i === currentPage ? " is-active" : ""}" data-page="${i}">${i}</button>`;
  }
  html += `<button class="pagination__btn" data-page="${currentPage + 1}" ${currentPage >= totalPages ? "disabled" : ""}>›</button>`;
  html += `</nav>`;
  pagination.innerHTML = html;

  const countEl = document.getElementById("course-count");
  if (countEl) countEl.textContent = `${filtered.length} دورة`;
}

document.addEventListener("DOMContentLoaded", renderGrid);
initPagination((page) => { currentPage = page; renderGrid(); });
