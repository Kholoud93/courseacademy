import { renderList } from "../common.js";
import { courseProgressCard, statCard, certificateCard, listItemCard } from "../render.js";
import { user, certificates, notifications, messages, transactions } from "../data/instructors.js";
import { courses } from "../data/courses.js";

const page = document.body.dataset.page;

document.addEventListener("DOMContentLoaded", () => {
  if (page === "dashboard") {
    document.getElementById("welcome-name").textContent = user.name;
    renderList(document.getElementById("stat-cards"), user.stats, statCard);
    const inProgress = courses.filter((c) => c.progressPercent > 0 && c.progressPercent < 100);
    renderList(document.getElementById("continue-learning"), inProgress, courseProgressCard);
  }

  if (page === "my-courses") {
    renderCourses("all");
    document.addEventListener("tabchange", (e) => {
      if (e.detail.tabsId === "my-courses") renderCourses(e.detail.tabId);
    });
  }

  if (page === "certificates" && document.getElementById("certificate-grid")) {
    renderList(document.getElementById("certificate-grid"), certificates, certificateCard);
  }

  if (page === "notifications") {
    renderList(document.getElementById("notification-list"), notifications, listItemCard);
  }

  if (page === "messages") {
    renderList(document.getElementById("message-list"), messages, listItemCard);
  }

  if (page === "wallet") {
    const tbody = document.querySelector("#transactions tbody");
    if (tbody) {
      tbody.innerHTML = transactions.map((t) =>
        `<tr><td>${t.date}</td><td>${t.description}</td><td>${t.amount}</td><td>${t.status}</td></tr>`
      ).join("");
    }
  }
});

function renderCourses(filter) {
  let items = courses.filter((c) => c.progressPercent > 0);
  if (filter === "progress") items = items.filter((c) => c.progressPercent < 100);
  if (filter === "completed") items = items.filter((c) => c.progressPercent === 100);
  renderList(document.getElementById("course-grid"), items, courseProgressCard);
}
