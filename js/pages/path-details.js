import { getTrackById } from "../data/tracks.js";

const DESIGN_TRACK_ID = 101;
const track = getTrackById(DESIGN_TRACK_ID);

const panels = {
  overview: document.getElementById("tab-panel"),
  curriculum: document.getElementById("curriculum-panel"),
  instructors: document.getElementById("instructors-panel"),
  reviews: document.getElementById("reviews-panel"),
};

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function formatMonthYear(dateStr) {
  return new Date(dateStr).toLocaleDateString("ar-SA", { year: "numeric", month: "long" });
}

function formatSidebarPrice(price) {
  if (!price || price === 0) return "مجاني";
  return `${Number(price).toLocaleString("en-US")} ${track.currency || "د.أ"}`;
}

function renderHero() {
  document.title = `${track.title} — coursacademy`;
  setText("pd-breadcrumb-title", track.title);
  setText("pd-hero-title", track.title);
  setText("pd-hero-desc", track.description);

  const badges = [];
  if (track.discount) {
    badges.push(`<span class="cd-hero__badge cd-hero__badge--discount">خصم ${track.discount}%</span>`);
  }
  if (track.trackBadge) {
    badges.push(`<span class="cd-hero__badge cd-hero__badge--category">${track.trackBadge}</span>`);
  }
  setHtml("pd-hero-badges", badges.join(""));

  setHtml(
    "pd-hero-stats",
    `
    <span class="cd-hero__stat cd-hero__stat--rating">
      ${track.rating.toLocaleString("ar-SA")} (${track.reviewCount.toLocaleString("ar-SA")} تقييم)
      <i class="ri-star-fill"></i>
    </span>
    <span class="cd-hero__stat">
      ${track.studentCount.toLocaleString("ar-SA")} طالب
      <i class="ri-group-line"></i>
    </span>
    <span class="cd-hero__stat">
      ${track.hours.toLocaleString("ar-SA")} ساعة
      <i class="ri-time-line"></i>
    </span>
    <span class="cd-hero__stat">
      ${track.courseCount.toLocaleString("ar-SA")} دورات
      <i class="ri-book-open-line"></i>
    </span>
    <span class="cd-hero__stat">
      ${track.level}
      <i class="ri-bar-chart-2-line"></i>
    </span>`
  );

  const metaParts = [];
  if (track.pathContentNote) {
    metaParts.push(`<span>${track.pathContentNote}</span>`);
  }
  if (track.lastUpdated) {
    metaParts.push(`<span>آخر تحديث: ${formatMonthYear(track.lastUpdated)} <i class="ri-calendar-line"></i></span>`);
  }
  if (track.language) {
    metaParts.push(`<span>اللغة: ${track.language} <i class="ri-global-line"></i></span>`);
  }
  setHtml("pd-hero-meta", metaParts.join(""));

  const heroImage = document.getElementById("pd-hero-image");
  if (heroImage) {
    heroImage.src = track.image;
    heroImage.alt = track.title;
  }
}

function renderOverview() {
  setHtml(
    "pd-learn-list",
    track.learnItems.map((item) => `<li><span>${item}</span><i class="ri-check-line"></i></li>`).join("")
  );
  setHtml(
    "pd-includes-list",
    track.includesItems.map((item) => `<li><span>${item}</span><i class="ri-check-line"></i></li>`).join("")
  );
  setText("pd-requirements-text", track.requirementsText || "");
  setHtml(
    "pd-meta-grid",
    track.meta
      .map(
        (item) => `
      <div class="cd-meta-card">
        <span class="cd-meta-card__icon cd-meta-card__icon--${item.color || "blue"}">
          <i class="${item.icon}"></i>
        </span>
        <div class="cd-meta-card__text">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </div>
      </div>`
      )
      .join("")
  );
}

function renderCurriculum() {
  const accordion = document.getElementById("pd-phases-accordion");
  const coursesList = document.getElementById("pd-included-courses-list");
  if (!accordion) return;

  setText("pd-curriculum-summary", track.curriculumSummary);
  setText("pd-included-courses-title", `الدورات المتضمنة (${track.courseCount} دورات)`);

  accordion.innerHTML = track.phases
    .map((phase, index) => {
      const hasItems = phase.items?.length > 0;
      const isOpen = index === 0;

      const bodyContent = hasItems
        ? phase.items
            .map(
              (item) => `
          <div class="pd-phase-item">
            <span class="pd-phase-item__icon"><i class="${item.icon}"></i></span>
            <span class="pd-phase-item__title">${item.title}</span>
          </div>`
            )
            .join("")
        : "";

      return `
    <div class="cd-curriculum__module${isOpen ? " is-open" : ""}">
      <button type="button" class="cd-curriculum__head" aria-expanded="${isOpen}">
        <span class="cd-curriculum__num">${phase.id ?? index + 1}</span>
        <span class="cd-curriculum__head-text">
          <strong class="cd-curriculum__head-title">${phase.title}</strong>
          <span class="cd-curriculum__head-meta">${phase.meta || ""}</span>
        </span>
        <span class="cd-curriculum__chevron" aria-hidden="true">
          <i class="ri-arrow-down-s-line"></i>
        </span>
      </button>
      <div class="cd-curriculum__body">${bodyContent}</div>
    </div>`;
    })
    .join("");

  accordion.addEventListener("click", (e) => {
    const head = e.target.closest(".cd-curriculum__head");
    if (!head) return;
    const module = head.closest(".cd-curriculum__module");
    if (!module) return;

    const isOpen = module.classList.toggle("is-open");
    head.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  if (!coursesList) return;

  coursesList.innerHTML = track.includedCourses
    .map(
      (course) => `
    <article class="pd-course-card">
      <span class="pd-course-card__num">${course.id}</span>
      <div class="pd-course-card__body">
        <h3 class="pd-course-card__title">${course.title}</h3>
        <p class="pd-course-card__desc">${course.description}</p>
        <div class="pd-course-card__meta">
          <span><i class="ri-time-line"></i> ${course.hours.toLocaleString("ar-SA")} ساعة</span>
          <span><i class="ri-book-open-line"></i> ${course.lessonCount.toLocaleString("ar-SA")} درس</span>
          <span><i class="ri-bar-chart-2-line"></i> ${course.level}</span>
          <span class="pd-course-card__rating">${course.rating.toLocaleString("ar-SA")} <i class="ri-star-fill"></i></span>
        </div>
      </div>
    </article>`
    )
    .join("");
}

function renderInstructorCard(instructor) {
  const stats = instructor.stats || [];
  const social = instructor.social || [];

  return `
    <article class="pd-instructor-card">
      <div class="cd-instructor">
      <div class="cd-instructor-profile">
        <div class="cd-instructor-profile__media">
          <div class="cd-instructor-profile__photo-crop">
            <div class="cd-instructor-profile__photo-mask">
              <img src="${instructor.avatar}" alt="${instructor.name}" class="cd-instructor-profile__photo">
            </div>
            <span class="cd-instructor-profile__badge">
              ${instructor.badge || "محترف"}
              <i class="ri-check-line"></i>
            </span>
          </div>
        </div>
        <div class="cd-instructor-profile__info">
          <h3 class="cd-instructor-profile__name">${instructor.name}</h3>
          <p class="cd-instructor-profile__title">${instructor.title || ""}</p>
          <p class="cd-instructor-profile__bio">${instructor.bio || ""}</p>
          <div class="cd-instructor-profile__social">
            ${social
              .map(
                (item) => `
              <a href="${item.href}" class="cd-instructor-profile__social-btn cd-instructor-profile__social-btn--${item.type}">
                ${item.label}
                <i class="${item.icon}"></i>
              </a>`
              )
              .join("")}
          </div>
        </div>
      </div>
      <div class="cd-instructor-stats">
        ${stats
          .map(
            (stat) => `
          <div class="cd-instructor-stat cd-instructor-stat--${stat.color}">
            <span class="cd-instructor-stat__icon"><i class="${stat.icon}"></i></span>
            <strong class="cd-instructor-stat__value">${stat.value}</strong>
            <span class="cd-instructor-stat__label">${stat.label}</span>
          </div>`
          )
          .join("")}
      </div>
    </div>
    </article>`;
}

function renderInstructors() {
  const el = document.getElementById("pd-instructors-list");
  if (!el) return;
  el.innerHTML = track.instructors.map(renderInstructorCard).join("");
}

function renderReviewStars(rating, className = "") {
  return Array.from({ length: 5 }, (_, i) => {
    const filled = i < rating;
    return `<i class="${filled ? "ri-star-fill" : "ri-star-line"}${className ? ` ${className}` : ""}"></i>`;
  }).join("");
}

function renderReviews() {
  const el = document.getElementById("reviews-list");
  if (!el) return;

  const distribution = track.reviewDistribution || [];
  const reviews = track.reviews || [];

  el.innerHTML = `
    <div class="cd-reviews-summary">
      <div class="cd-reviews-summary__score">
        <strong class="cd-reviews-summary__value">${Number(track.rating).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong>
        <div class="cd-reviews-summary__stars" aria-hidden="true">${renderReviewStars(Math.round(track.rating), "cd-reviews-summary__star")}</div>
        <span class="cd-reviews-summary__label">تقييم المسار</span>
      </div>
      <div class="cd-reviews-summary__bars">
        ${distribution
          .map(
            (row) => `
          <div class="cd-reviews-bar">
            <span class="cd-reviews-bar__stars" aria-hidden="true">${renderReviewStars(row.stars, "cd-reviews-bar__star")}</span>
            <div class="cd-reviews-bar__track">
              <span class="cd-reviews-bar__fill" style="width:${row.percent}%"></span>
            </div>
            <span class="cd-reviews-bar__percent">${row.percent}%</span>
          </div>`
          )
          .join("")}
      </div>
    </div>
    <div class="cd-reviews-list">
      ${reviews
        .map(
          (review) => `
        <article class="cd-review">
          <div class="cd-review__head">
            <div class="cd-review__user">
              <img src="${review.userAvatar}" alt="${review.userName}" class="cd-review__avatar">
              <div class="cd-review__meta">
                <strong class="cd-review__name">${review.userName}</strong>
                <span class="cd-review__time">${review.timeAgo}</span>
              </div>
            </div>
            <div class="cd-review__stars" aria-label="تقييم ${review.rating} من 5">${renderReviewStars(review.rating, "cd-review__star")}</div>
          </div>
          <p class="cd-review__text">${review.text}</p>
        </article>`
        )
        .join("")}
    </div>`;
}

function renderSidebar() {
  const sidebarImage = document.getElementById("pd-sidebar-image");
  if (sidebarImage) {
    sidebarImage.src = track.image;
    sidebarImage.alt = track.title;
  }

  if (track.discount) {
    setText("pd-sidebar-discount", `خصم ${track.discount}%`);
  }

  setText("pd-price-current", formatSidebarPrice(track.price));
  setText("pd-price-old", track.oldPrice ? formatSidebarPrice(track.oldPrice) : "");

  const oldPriceEl = document.getElementById("pd-price-old");
  if (oldPriceEl) oldPriceEl.style.display = track.oldPrice ? "" : "none";

  setHtml(
    "pd-sidebar-features",
    track.sidebarFeatures
      .map(
        (item) => `
      <li>
        <span class="cd-buy-card__feature-label">
          ${item.label}
          <i class="${item.icon}"></i>
        </span>
        <strong class="cd-buy-card__feature-value">${item.value}</strong>
      </li>`
      )
      .join("")
  );
}

function showTab(tabId) {
  document.querySelectorAll('.cd-tabs__btn[data-tabs="path-detail"]').forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.tab === tabId);
  });
  Object.entries(panels).forEach(([id, panel]) => {
    if (panel) panel.hidden = id !== tabId;
  });
}

function initTabs() {
  document.querySelectorAll('.cd-tabs__btn[data-tabs="path-detail"]').forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!track) return;

  renderHero();
  renderOverview();
  renderCurriculum();
  renderInstructors();
  renderReviews();
  renderSidebar();
  initTabs();
  showTab("overview");
});
