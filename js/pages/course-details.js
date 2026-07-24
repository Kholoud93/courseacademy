const DESIGN_COURSE_ID = 202;
const course = getCourseById(DESIGN_COURSE_ID);

const panels = {
  overview: document.getElementById("tab-panel"),
  curriculum: document.getElementById("curriculum-panel"),
  instructor: document.getElementById("instructor-panel"),
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

function renderHero() {
  document.title = `${course.title} — coursacademy`;
  setText("cd-breadcrumb-title", course.title);
  setText("cd-hero-title", course.title);
  setText("cd-hero-desc", course.description);

  const badges = [];
  if (course.discount) {
    badges.push(`<span class="cd-hero__badge cd-hero__badge--discount">خصم ${course.discount}%</span>`);
  }
  if (course.categoryName) {
    badges.push(`<span class="cd-hero__badge cd-hero__badge--category">${course.categoryName}</span>`);
  }
  setHtml("cd-hero-badges", badges.join(""));

  setHtml(
    "cd-hero-stats",
    `
    <span class="cd-hero__stat cd-hero__stat--rating">
      ${course.rating.toLocaleString("ar-SA")} (${course.reviewCount.toLocaleString("ar-SA")} تقييم)
      <i class="ri-star-fill"></i>
    </span>
    <span class="cd-hero__stat">
      ${course.studentCount.toLocaleString("ar-SA")} طالب
      <i class="ri-group-line"></i>
    </span>
    <span class="cd-hero__stat">
      ${course.hours.toLocaleString("ar-SA")} ساعة
      <i class="ri-time-line"></i>
    </span>
    <span class="cd-hero__stat">
      ${course.lessonCount.toLocaleString("ar-SA")} درس
      <i class="ri-file-list-3-line"></i>
    </span>
    <span class="cd-hero__stat">
      ${course.level}
      <i class="ri-bar-chart-2-line"></i>
    </span>`
  );

  const avatar = document.getElementById("cd-instructor-avatar");
  if (avatar) {
    avatar.src = course.heroInstructorAvatar || course.instructorAvatar;
    avatar.alt = course.instructorName;
  }
  setText("cd-instructor-label", "المدرس");
  setText("cd-instructor-name", course.instructorName);
  setHtml(
    "cd-instructor-role",
    `<span class="cd-hero__instructor-bio">${course.heroInstructorBio || "خبير BIM معتمد مع أكثر من 15 عاماً من الخبرة في المشاريع السكنية والتجارية"
    }</span>`
  );

  const metaParts = [];
  if (course.lastUpdated) {
    metaParts.push(
      `<span>آخر تحديث: ${formatMonthYear(course.lastUpdated)} <i class="ri-calendar-line"></i></span>`
    );
  }
  if (course.language) {
    metaParts.push(`<span>اللغة: ${course.language} <i class="ri-global-line"></i></span>`);
  }
  setHtml("cd-instructor-updated", `<div class="cd-hero__instructor-meta">${metaParts.join("")}</div>`);

  const heroImage = document.getElementById("cd-hero-image");
  if (heroImage) {
    heroImage.src = course.image;
    heroImage.alt = course.title;
  }
}

function renderOverview() {
  setHtml(
    "cd-learn-list",
    course.learnItems.map((item) => `<li><span>${item}</span><i class="ri-check-line"></i></li>`).join("")
  );
  setHtml(
    "cd-requirements-list",
    course.requirements.map((item) => `<li>${item}</li>`).join("")
  );
  setHtml(
    "cd-meta-grid",
    course.meta
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
  const accordion = document.getElementById("curriculum-accordion");
  if (!accordion) return;

  setText(
    "cd-curriculum-summary",
    course.curriculumSummary || `${course.lessonCount} درس • ${course.hours} ساعة`
  );

  const modules = getCurriculumForCourse(DESIGN_COURSE_ID);
  accordion.innerHTML = modules
    .map((mod, index) => {
      const hasLessons = mod.lessons?.length > 0;
      const isOpen = index === 0 && hasLessons;

      return `
    <div class="cd-curriculum__module${isOpen ? " is-open" : ""}${hasLessons ? "" : " cd-curriculum__module--no-lessons"}">
      <button type="button" class="cd-curriculum__head" aria-expanded="${isOpen}" ${hasLessons ? "" : "disabled"}>
        <span class="cd-curriculum__num">${mod.id ?? index + 1}</span>
        <span class="cd-curriculum__head-text">
          <strong class="cd-curriculum__head-title">${mod.title}</strong>
          <span class="cd-curriculum__head-meta">${mod.meta || ""}</span>
        </span>
        <span class="cd-curriculum__chevron" aria-hidden="true">
          <i class="ri-arrow-down-s-line"></i>
        </span>
      </button>
      ${
        hasLessons
          ? `<div class="cd-curriculum__body">
        ${mod.lessons
          .map(
            (lesson) => `
          <a href="${lesson.type === "quiz" ? "quiz.html" : "learning.html"}?lessonId=${lesson.id}"
             class="cd-curriculum__lesson${lesson.isCompleted ? " is-completed" : ""}">
            <span class="cd-curriculum__lesson-play" aria-hidden="true">
              <i class="ri-play-fill"></i>
            </span>
            <span class="cd-curriculum__lesson-title">${lesson.title}</span>
            ${lesson.isFree ? '<span class="cd-curriculum__lesson-badge">مجاني</span>' : ""}
          </a>`
          )
          .join("")}
      </div>`
          : ""
      }
    </div>`;
    })
    .join("");

  accordion.addEventListener("click", (e) => {
    const head = e.target.closest(".cd-curriculum__head");
    if (!head || head.disabled) return;
    const module = head.closest(".cd-curriculum__module");
    if (!module?.querySelector(".cd-curriculum__body")) return;
    const isOpen = module.classList.toggle("is-open");
    head.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function renderInstructor() {
  const el = document.getElementById("cd-instructor-card");
  if (!el) return;

  const stats = course.instructorStats || [];
  const social = course.instructorSocial || [];

  el.className = "cd-instructor";
  el.innerHTML = `
    <div class="cd-instructor-profile">
      <div class="cd-instructor-profile__media">
        <div class="cd-instructor-profile__photo-crop">
          <div class="cd-instructor-profile__photo-mask">
            <img src="${course.instructorAvatar}" alt="${course.instructorName}" class="cd-instructor-profile__photo">
          </div>
          <span class="cd-instructor-profile__badge">
            ${course.instructorBadge || "محترف"}
            <i class="ri-check-line"></i>
          </span>
        </div>
      </div>
      <div class="cd-instructor-profile__info">
        <h3 class="cd-instructor-profile__name">${course.instructorName}</h3>
        <p class="cd-instructor-profile__title">${course.instructorTitle || course.instructorRole || ""}</p>
        <p class="cd-instructor-profile__bio">${course.instructorTabBio || course.instructorBio || ""}</p>
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
    </div>`;
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

  const distribution = course.reviewDistribution || [];
  const reviews = course.courseReviews || [];

  el.innerHTML = `
    <div class="cd-reviews-summary">
      <div class="cd-reviews-summary__score">
        <strong class="cd-reviews-summary__value">${Number(course.rating).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong>
        <div class="cd-reviews-summary__stars" aria-hidden="true">${renderReviewStars(Math.round(course.rating), "cd-reviews-summary__star")}</div>
        <span class="cd-reviews-summary__label">تقييم الدورة</span>
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

function formatSidebarPrice(price) {
  if (!price || price === 0) return "مجاني";
  return `${Number(price).toLocaleString("en-US")} د.أ`;
}

function renderSidebar() {
  const sidebarImage = document.getElementById("cd-sidebar-image");
  if (sidebarImage) {
    sidebarImage.src = course.image;
    sidebarImage.alt = course.title;
  }

  if (course.discount) {
    setText("cd-sidebar-discount", `خصم ${course.discount}%`);
  }

  setText("cd-price-current", course.isFree ? "مجاني" : formatSidebarPrice(course.price));
  setText("cd-price-old", course.oldPrice ? formatSidebarPrice(course.oldPrice) : "");

  const oldPriceEl = document.getElementById("cd-price-old");
  if (oldPriceEl) oldPriceEl.style.display = course.oldPrice ? "" : "none";

  setHtml(
    "cd-sidebar-features",
    course.sidebarFeatures
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
  document.querySelectorAll('.cd-tabs__btn[data-tabs="course-detail"]').forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.tab === tabId);
  });
  Object.entries(panels).forEach(([id, panel]) => {
    if (panel) panel.hidden = id !== tabId;
  });
}

function initTabs() {
  document.querySelectorAll('.cd-tabs__btn[data-tabs="course-detail"]').forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });
}

function bindStoreActions() {
  if (typeof Store === "undefined" || !Store.bindProduct) return;
  const card = document.querySelector(".cd-buy-card");
  if (!card) return;
  Store.bindProduct(card, {
    id: course.id,
    type: "course",
    title: course.title,
    instructor: course.instructorName,
    price: course.price,
    oldPrice: course.oldPrice,
    image: course.image,
    href: `course-details.html?id=${course.id}`,
    category: course.categoryName || course.category || "",
    rating: course.rating,
    currency: "د.أ",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!course) return;

  renderHero();
  renderOverview();
  renderCurriculum();
  renderInstructor();
  renderReviews();
  renderSidebar();
  bindStoreActions();
  initTabs();
  showTab("overview");
});
