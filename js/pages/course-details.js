import { formatPrice } from "../common.js";
import { getCourseById, curriculum } from "../data/courses.js";
import { testimonials } from "../data/categories.js";
import { testimonialCard } from "../render.js";
import { renderList } from "../common.js";
import { getQueryParam } from "../common.js";

const course = getCourseById(getQueryParam("id")) || getCourseById(1);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("course-title").textContent = course.title;
  document.getElementById("course-desc").textContent = course.description;

  const tabPanel = document.getElementById("tab-panel");
  if (tabPanel) tabPanel.innerHTML = `<p>${course.description}</p>`;

  const priceEl = document.getElementById("course-price");
  if (priceEl) priceEl.textContent = course.isFree ? "مجاني" : formatPrice(course.price);

  const featuresEl = document.getElementById("course-features");
  if (featuresEl) featuresEl.innerHTML = course.features.map((f) => `<li>${f}</li>`).join("");

  const accordion = document.getElementById("curriculum-accordion");
  if (accordion) {
    accordion.innerHTML = curriculum.map((mod) => `
      <div class="accordion__item" data-accordion-item>
        <button type="button" class="accordion__header" data-accordion-toggle>
          <span>${mod.title}</span><span class="accordion__icon">▼</span>
        </button>
        <div class="accordion__body">
          ${mod.lessons.map((l) => `
            <a href="${l.type === "quiz" ? "quiz.html" : "learning.html"}?lessonId=${l.id}"
               class="accordion__lesson${l.isCompleted ? " is-completed" : ""}">
              <span>${l.title}</span><span>${l.duration} د</span>
            </a>`).join("")}
        </div>
      </div>`).join("");
  }

  document.addEventListener("tabchange", (e) => {
    if (e.detail.tabsId !== "course-detail") return;
    const panel = document.getElementById("tab-panel");
    if (e.detail.tabId === "overview") panel.innerHTML = `<p>${course.description}</p>`;
    if (e.detail.tabId === "curriculum") panel.innerHTML = accordion.outerHTML;
    if (e.detail.tabId === "reviews") renderList(panel, testimonials, testimonialCard);
  });
});
