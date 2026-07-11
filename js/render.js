import { formatPrice, formatDate, formatDuration } from "./common.js";


const COURSE_DETAILS_PAGE = "course-details.html?id=202";

const PATH_DETAILS_PAGE = "path-details.html?id=101";


export function homeTrackCard(track) {
  const currency = track.currency || "د.أ";
  const formatTrackPrice = (amount) => `${Number(amount).toLocaleString("ar-SA")} ${currency}`;
  const oldPrice = track.oldPrice
    ? `<span class="home-track-card__old-price">${formatTrackPrice(track.oldPrice)}</span>`
    : "";

  return `
    <article class="home-track-card hover-lift">
      <a href="${PATH_DETAILS_PAGE}" class="home-track-card__image-wrap">
        <img class="home-track-card__image" src="${track.image}" alt="${track.title}">
        <span class="home-track-card__badge home-track-card__badge--duration">${track.duration}</span>
        <span class="home-track-card__badge home-track-card__badge--courses">${track.courseCount.toLocaleString("ar-SA")} دورات</span>
      </a>
      <div class="home-track-card__body">
        <h3 class="home-track-card__title"><a href="${PATH_DETAILS_PAGE}">${track.title}</a></h3>
        <p class="home-track-card__desc">${track.description}</p>
        <div class="home-track-card__stats">
          <span class="home-track-card__stat"><i class="ri-time-line"></i> ${track.hours.toLocaleString("ar-SA")} ساعة</span>
          <span class="home-track-card__stat"><i class="ri-team-line"></i> ${track.studentCount.toLocaleString("ar-SA")} طالب</span>
          <span class="home-track-card__stat"><i class="ri-star-line"></i> ${track.rating.toLocaleString("ar-SA")}</span>
        </div>
        <div class="home-track-card__footer">
          <span class="home-track-card__level">${track.level}</span>
          <div class="home-track-card__prices">
            <span class="home-track-card__price">${formatTrackPrice(track.price)}</span>
            ${oldPrice}
          </div>
        </div>
      </div>
    </article>`;
}

export function homeFeaturedTrackCard(course) {
  const discountBadge = course.discount
    ? `<span class="home-track-card__badge home-track-card__badge--discount">-${course.discount}%</span>`
    : "";
  const categoryBadge = course.category
    ? `<span class="home-track-card__badge home-track-card__badge--category">${course.category}</span>`
    : "";
  const oldPrice = course.oldPrice
    ? `<span class="home-track-card__old-price">${formatPrice(course.oldPrice)}</span>`
    : "";
  const levelBadge = course.level
    ? `<span class="home-track-card__level">${course.level}</span>`
    : "";

  return `
    <article class="home-track-card home-track-card--featured hover-lift">
      <a href="${COURSE_DETAILS_PAGE}" class="home-track-card__image-wrap">
        <img class="home-track-card__image" src="${course.image}" alt="${course.title}">
        ${discountBadge}
        ${categoryBadge}
        <span class="home-track-card__image-rating">(${course.reviewCount.toLocaleString("ar-SA")}) ${course.rating.toLocaleString("ar-SA")} <i class="ri-star-fill"></i></span>
      </a>
      <div class="home-track-card__body">
        <h3 class="home-track-card__title"><a href="${COURSE_DETAILS_PAGE}">${course.title}</a></h3>
        <p class="home-track-card__desc">${course.description}</p>
        <div class="home-track-card__instructor">
          <img src="${course.instructorAvatar}" alt="${course.instructorName}">
          ${course.instructorName}
        </div>
        <div class="home-track-card__stats">
          <span class="home-track-card__stat"><i class="ri-time-line"></i> ${course.hours.toLocaleString("ar-SA")} ساعة</span>
          <span class="home-track-card__stat"><i class="ri-book-open-line"></i> ${course.lessonCount.toLocaleString("ar-SA")} درس</span>
          <span class="home-track-card__stat"><i class="ri-group-line"></i> ${course.studentCount.toLocaleString("ar-SA")} طالب</span>
        </div>
        <div class="home-track-card__footer">
          ${levelBadge}
          <div class="home-track-card__prices">
            <span class="home-track-card__price">${formatPrice(course.price)}</span>
            ${oldPrice}
          </div>
        </div>
      </div>
    </article>`;
}

export function homeCourseCard(course) {
  const discountBadge = course.discount
    ? `<span class="home-course-card__badge home-course-card__badge--discount">-${course.discount}%</span>`
    : "";
  const categoryBadge = course.category
    ? `<span class="home-course-card__badge home-course-card__badge--category">${course.category}</span>`
    : "";

  return `
    <article class="home-course-card hover-lift">
      <a href="${COURSE_DETAILS_PAGE}" class="home-course-card__image-wrap">
        <img class="home-course-card__image" src="${course.image}" alt="${course.title}">
        ${discountBadge}
        ${categoryBadge}
        <span class="home-course-card__image-rating">(${course.reviewCount.toLocaleString("ar-SA")}) ${course.rating.toLocaleString("ar-SA")} <i class="ri-star-fill"></i></span>
      </a>
      <div class="home-course-card__body">
        <h3 class="home-course-card__title"><a href="${COURSE_DETAILS_PAGE}">${course.title}</a></h3>
        <p class="home-course-card__desc">${course.description}</p>
        <div class="home-course-card__instructor">
          <img src="${course.instructorAvatar}" alt="">
          ${course.instructorName}
        </div>
        <div class="home-course-card__footer">
          <div class="home-course-card__stats">
            ${course.hours ? `<span class="home-course-card__stat"><i class="ri-time-line"></i> ${course.hours.toLocaleString("ar-SA")} ساعة</span>` : ""}
            <span class="home-course-card__stat"><i class="ri-book-open-line"></i> ${course.lessonCount.toLocaleString("ar-SA")} درس</span>
            <span class="home-course-card__stat"><i class="ri-group-line"></i> ${course.studentCount.toLocaleString("ar-SA")} طالب</span>
          </div>
          <span class="home-course-card__price">${formatPrice(course.price)}</span>
        </div>
      </div>
    </article>`;
}

export function pathsWhyCard(item) {
  return `
    <article class="paths-why-card">
      <span class="paths-why-card__icon" aria-hidden="true"><i class="${item.icon}"></i></span>
      <h3 class="paths-why-card__title">${item.title}</h3>
      <p class="paths-why-card__desc">${item.description}</p>
    </article>`;
}

export function homeWhyCard(item) {
  return `
    <article class="home-track-card home-track-card--why hover-lift">
      <div class="home-track-card__image-wrap home-track-card__icon-wrap">
        <span class="home-track-card__icon-badge"><i class="${item.icon}"></i></span>
      </div>
      <div class="home-track-card__body">
        <h3 class="home-track-card__title">${item.title}</h3>
        <p class="home-track-card__desc">${item.description}</p>
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
  const stars = Array.from({ length: item.rating || 5 }, () =>
    `<i class="ri-star-fill"></i>`
  ).join("");

  return `
    <div class="home-testimonial-card">
      <div class="home-testimonial-card__content">
        <div class="home-testimonial-card__quote">
          <span class="home-testimonial-card__quote-icon" aria-hidden="true">
            <img src="assets/svgs/Vector.svg" alt="" width="28" height="20">
          </span>
          <p class="home-testimonial-card__text">${item.quote}</p>
        </div>
        <div class="home-testimonial-card__author">
          <div class="home-testimonial-card__avatar">
            <img src="${item.userAvatar}" alt="${item.userName}">
          </div>
          <strong>${item.userName}</strong>
          <span>${item.role}</span>
          <div class="home-testimonial-card__stars" aria-label="تقييم ${item.rating} من 5">${stars}</div>
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
      <a href="${COURSE_DETAILS_PAGE}" class="featured-card__image-wrap">
        <img class="featured-card__image" src="${course.image}" alt="${course.title}">
        ${discount}
        <span class="featured-card__rating-badge">★ ${course.rating}</span>
      </a>
      <div class="featured-card__body">
        <h3 class="featured-card__title"><a href="${COURSE_DETAILS_PAGE}">${course.title}</a></h3>
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
    <a href="${COURSE_DETAILS_PAGE}">
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
  const tags = (post.tags || [])
    .map((tag) => `<span class="blog-card__tag">${tag}</span>`)
    .join("");

  return `
    <a href="blog-details.html?slug=${post.slug}" class="blog-card hover-lift">
      <div class="home-track-card__image-wrap blog-card__media">
        <img class="home-track-card__image" src="${post.image}" alt="${post.title}">
        <span class="blog-card__category">${post.category}</span>
        <span class="blog-card__views"><i class="ri-eye-line"></i> ${post.views.toLocaleString("ar-SA")}</span>
      </div>
      <div class="blog-card__body">
        <h3 class="blog-card__title">${post.title}</h3>
        <p class="blog-card__excerpt">${post.excerpt}</p>
        ${tags ? `<div class="blog-card__tags">${tags}</div>` : ""}
      </div>
      <div class="blog-card__foot">
        <div class="blog-card__author">
          <img src="${post.authorAvatar}" alt="${post.author}">
          <div class="blog-card__author-text">
            <strong>${post.author}</strong>
            <time>${formatDate(post.publishedAt)}</time>
          </div>
        </div>
        <span class="blog-card__time"><i class="ri-time-line"></i> ${post.readTime.toLocaleString("ar-SA")} دقائق</span>
      </div>
    </a>`;
}

export function blogFeaturedCard(post) {
  return `
    <a href="blog-details.html?slug=${post.slug}" class="blog-featured hover-lift">
      <div class="blog-featured__body">
        <span class="blog-featured__category">${post.category}</span>
        <h3 class="blog-featured__title">${post.title}</h3>
        <p class="blog-featured__excerpt">${post.excerpt}</p>
        <div class="blog-featured__foot">
          <div class="blog-featured__author">
            <img src="${post.authorAvatar}" alt="${post.author}" class="blog-featured__avatar">
            <div class="blog-featured__author-text">
              <strong>${post.author}</strong>
              <time>${formatDate(post.publishedAt)}</time>
            </div>
          </div>
          <div class="blog-featured__meta">
            <span><i class="ri-eye-line"></i> ${post.views.toLocaleString("ar-SA")} مشاهدة</span>
            <span><i class="ri-time-line"></i> ${post.readTime.toLocaleString("ar-SA")} دقائق</span>
          </div>
        </div>
      </div>
      <div class="blog-featured__media">
        <img src="${post.image}" alt="${post.title}" class="blog-featured__image">
      </div>
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
