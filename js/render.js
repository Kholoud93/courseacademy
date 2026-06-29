import { formatPrice, formatDate, formatDuration } from "./common.js";

/** Unified homepage course card — used for tracks & featured sections */
export function homeCourseCard(course) {
  const badges = [
    course.isNew ? `<span class="badge badge--bestseller home-course-card__badge">جديد</span>` : "",
    course.isBestseller ? `<span class="badge badge--new home-course-card__badge">الأكثر مبيعاً</span>` : "",
  ].join("");

  return `
    <article class="home-course-card hover-lift">
      <a href="course-details.html?id=${course.id}" class="home-course-card__image-wrap">
        <img class="home-course-card__image" src="${course.image}" alt="${course.title}">
        ${badges ? `<div class="home-course-card__badges">${badges}</div>` : ""}
      </a>
      <div class="home-course-card__body">
        <div class="home-course-card__rating"><span class="home-course-card__stars">★★★★★</span> <span>${course.rating}</span></div>
        <h3 class="home-course-card__title"><a href="course-details.html?id=${course.id}">${course.title}</a></h3>
        <p class="home-course-card__desc">${course.description}</p>
        <div class="home-course-card__meta">
          <span class="home-course-card__instructor">
            <img src="${course.instructorAvatar}" alt="">
            ${course.instructorName}
          </span>
          <span class="home-course-card__stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
            ${course.lessonCount} درس
          </span>
          <span class="home-course-card__stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            ${course.studentCount} طالب
          </span>
        </div>
        <div class="home-course-card__footer">
          <a href="course-details.html?id=${course.id}" class="home-course-card__cta">عرض التفاصيل</a>
          <span class="home-course-card__price">${formatPrice(course.price)}</span>
        </div>
      </div>
    </article>`;
}

export function homeFeatureCard(item) {
  return `
    <article class="home-feature-card">
      <div class="home-feature-card__icon">${item.icon}</div>
      <h3 class="home-feature-card__title">${item.title}</h3>
      <p class="home-feature-card__desc">${item.description}</p>
    </article>`;
}

export function homeTestimonialSlide(item) {
  const stars = "★".repeat(item.rating || 5);
  return `
    <div class="home-testimonial-card">
      <div class="home-testimonial-card__quote-icon">"</div>
      <p class="home-testimonial-card__text">${item.quote}</p>
      <div class="home-testimonial-card__author">
        <img src="${item.userAvatar}" alt="${item.userName}">
        <div>
          <strong>${item.userName}</strong>
          <span>${item.role}</span>
          <div class="home-testimonial-card__stars">${stars}</div>
        </div>
      </div>
    </div>`;
}

export function pathCard(path) {
  const badge = path.isNew ? `<span class="badge badge--bestseller path-card__badge">جديد</span>` : "";
  return `
    <article class="path-card hover-lift">
      <a href="courses.html?path=${path.slug}" class="path-card__image-wrap">
        <img class="path-card__image" src="${path.image}" alt="${path.title}">
        ${badge}
      </a>
      <div class="path-card__body">
        <h3 class="path-card__title"><a href="courses.html?path=${path.slug}">${path.title}</a></h3>
        <p class="path-card__desc">${path.description}</p>
        <div class="path-card__rating"><span class="path-card__stars">★ ${path.rating}</span> <span class="path-card__reviews">(${path.reviews})</span></div>
        <div class="path-card__footer">
          <a href="courses.html?path=${path.slug}" class="path-card__link">تفاصيل المسار</a>
          <span class="path-card__price">${formatPrice(path.price)}</span>
        </div>
      </div>
    </article>`;
}

export function featuredCourseCard(course) {
  const discount = course.discount ? `<span class="featured-card__discount">-${course.discount}%</span>` : "";
  const oldPrice = course.oldPrice ? `<span class="featured-card__old-price">${formatPrice(course.oldPrice)}</span>` : "";
  return `
    <article class="featured-card hover-lift">
      <a href="course-details.html?id=${course.id}" class="featured-card__image-wrap">
        <img class="featured-card__image" src="${course.image}" alt="${course.title}">
        ${discount}
        <span class="featured-card__rating-badge">★ ${course.rating}</span>
      </a>
      <div class="featured-card__body">
        <h3 class="featured-card__title"><a href="course-details.html?id=${course.id}">${course.title}</a></h3>
        <div class="featured-card__instructor">
          <img src="${course.instructorAvatar}" alt="">
          <span>${course.instructorName}</span>
        </div>
        <div class="featured-card__footer">
          <div class="featured-card__prices">
            ${oldPrice}
            <span class="featured-card__price">${formatPrice(course.price)}</span>
          </div>
          <button type="button" class="featured-card__cart" aria-label="أضف للسلة">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          </button>
        </div>
      </div>
    </article>`;
}

export function courseCard(course) {
  const price = course.isFree ? "مجاني" : formatPrice(course.price);
  return `
    <a href="course-details.html?id=${course.id}">
      <article class="card card--course hover-lift">
        <div class="card__image-wrap">
          <img class="card__image" src="${course.image}" alt="${course.title}">
          <div class="card__badge"><span class="badge badge--category">${course.categoryName}</span></div>
        </div>
        <div class="card__body">
          <h3 class="card__title">${course.title}</h3>
          <div class="card__instructor">
            <img class="card__instructor-avatar" src="${course.instructorAvatar}" alt="">
            <span class="card__meta">${course.instructorName}</span>
          </div>
          <div class="card__rating"><span>${course.rating}</span> ★</div>
          <div class="card__stats">
            <span>${course.lessonCount} درس</span>
            <span>${formatDuration(course.duration)}</span>
            <span>${course.studentCount} طالب</span>
          </div>
          <div class="card__footer">
            <span class="card__price">${price}</span>
            <span class="btn btn--primary btn--sm card__enroll">التسجيل</span>
          </div>
        </div>
      </article>
    </a>`;
}

export function courseProgressCard(course) {
  return `
    <a href="learning.html?courseId=${course.id}">
      <article class="card card--course-progress hover-lift">
        <div class="card__image-wrap">
          <img class="card__image" src="${course.image}" alt="${course.title}">
        </div>
        <div class="card__body">
          <h3 class="card__title">${course.title}</h3>
          <p class="card__meta">${course.instructorName}</p>
          ${progressBar(course.progressPercent)}
        </div>
      </article>
    </a>`;
}

export function categoryCard(cat) {
  return `
    <a href="courses.html?category=${cat.slug}" class="card card--category hover-lift">
      <div class="card__icon">${cat.icon}</div>
      <h3 class="card__title">${cat.name}</h3>
      <p class="card__count">${cat.courseCount} دورة</p>
    </a>`;
}

export function blogCard(post) {
  return `
    <a href="blog-details.html?slug=${post.slug}">
      <article class="card card--blog hover-lift">
        <img class="card__image" src="${post.image}" alt="${post.title}">
        <div class="card__body">
          <time class="card__date">${formatDate(post.publishedAt)}</time>
          <h3 class="card__title">${post.title}</h3>
          <p class="card__excerpt">${post.excerpt}</p>
        </div>
      </article>
    </a>`;
}

export function instructorCard(person) {
  return `
    <article class="card card--instructor hover-lift">
      <img class="card__avatar" src="${person.avatar}" alt="${person.name}">
      <h3 class="card__title">${person.name}</h3>
      <p class="card__role">${person.specialty}</p>
    </article>`;
}

export function testimonialSlide(item) {
  return `
    <div class="home-testimonials__slide">
      <p class="home-testimonials__quote">"${item.quote}"</p>
      <div class="home-testimonials__author">
        <img src="${item.userAvatar}" alt="${item.userName}">
        <div>
          <strong>${item.userName}</strong>
          <span>${item.role}</span>
        </div>
      </div>
    </div>`;
}

export function testimonialCard(item) {
  return `
    <article class="card card--testimonial hover-lift">
      <p class="card__quote">"${item.quote}"</p>
      <div class="card__author">
        <img class="card__author-avatar" src="${item.userAvatar}" alt="${item.userName}">
        <div>
          <h4 class="card__title">${item.userName}</h4>
          <p class="card__meta">${item.role}</p>
        </div>
      </div>
    </article>`;
}

export function progressBar(percent, label) {
  return `
    <div class="progress">
      ${label ? `<div class="progress__label"><span>${label}</span><span>${percent}%</span></div>` : ""}
      <div class="progress__bar"><div class="progress__fill" style="--progress-percent: ${percent}%"></div></div>
    </div>`;
}

export function statCard(stat) {
  return `
    <article class="card card--stat">
      <div class="card__icon-box" style="--stat-color: ${stat.color}">${stat.icon}</div>
      <div>
        <div class="card__value">${stat.value}</div>
        <div class="card__label">${stat.label}</div>
      </div>
    </article>`;
}

export function certificateCard(cert) {
  return `
    <a href="certificate-details.html?id=${cert.id}">
      <article class="card card--certificate hover-lift">
        <div class="card__thumb">🏆</div>
        <h3 class="card__title">${cert.courseTitle}</h3>
        <p class="card__meta">${formatDate(cert.issuedAt)}</p>
      </article>
    </a>`;
}

export function listItemCard(item) {
  const unread = item.isRead === false ? " is-unread" : "";
  return `
    <article class="card card--list-item${unread}">
      ${item.avatar ? `<img class="card__avatar" src="${item.avatar}" alt="">` : ""}
      <div>
        <h4 class="card__title">${item.title || item.name}</h4>
        <p class="card__meta">${item.message || item.preview}</p>
        ${item.time ? `<time class="card__time">${item.time}</time>` : ""}
      </div>
    </article>`;
}
