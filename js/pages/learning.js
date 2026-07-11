import { getQueryParam, formatDate } from "../common.js";
import { getCertificateById, certificates } from "../data/instructors.js";
import { getCourseById, curriculum } from "../data/courses.js";
import { quiz } from "../data/instructors.js";

const page = document.body.dataset.page;

document.addEventListener("DOMContentLoaded", () => {
  if (page === "learning") {
    const course = getCourseById(getQueryParam("courseId")) || getCourseById(1);
    document.getElementById("video-title").textContent = course.title;

    const accordion = document.getElementById("curriculum");
    if (accordion) {
      accordion.innerHTML = curriculum.map((mod) => `
        <div class="accordion__item is-open" data-accordion-item>
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
  }

  if (page === "quiz") {
    const q = quiz.questions[0];
    document.getElementById("quiz-question").textContent = q.text;
    document.getElementById("quiz-options").innerHTML = q.options.map((opt, i) => `
      <label class="quiz__option">
        <input type="radio" name="answer" class="radio" value="${i}">
        <span>${opt}</span>
      </label>`).join("");
  }

  if (page === "certificate-details") {
    const cert = getCertificateById(getQueryParam("id")) || certificates[0];
    document.getElementById("cert-course").textContent = cert.courseTitle;
    document.getElementById("cert-number").textContent = cert.certificateNumber;
    document.getElementById("cert-date").textContent = formatDate(cert.issuedAt);
  }
});
