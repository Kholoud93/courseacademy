const page = document.body.dataset.page;

let activeCategory = getQueryParam("category") || "all";
let searchQuery = getQueryParam("q") || "";

function updateBlogUrl() {
  const url = new URL(window.location.href);
  if (searchQuery.trim()) url.searchParams.set("q", searchQuery.trim());
  else url.searchParams.delete("q");
  if (activeCategory !== "all") url.searchParams.set("category", activeCategory);
  else url.searchParams.delete("category");
  window.history.replaceState({}, "", url);
}

function getGridPosts() {
  let posts = blogPosts.filter((post) => !post.featured);

  if (activeCategory !== "all") {
    posts = posts.filter((post) => post.categorySlug === activeCategory);
  }

  const query = searchQuery.trim().toLowerCase();
  if (query) {
    posts = posts.filter((post) => {
      const haystack = `${post.title} ${post.excerpt} ${post.category} ${(post.tags || []).join(" ")}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  return posts;
}

function renderBlogGridCard(post) {
  const tags = (post.tags || [])
    .map((tag) => `<span class="blog-card__tag">${tag}</span>`)
    .join("");

  return `
    <a href="blog-details.html?slug=${post.slug}" class="blog-card hover-lift" data-category="${post.categorySlug}">
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

function renderBlogPage() {
  const featuredEl = document.getElementById("blog-featured");
  const wrap = featuredEl?.closest(".blog-featured-wrap");
  const searchInput = document.querySelector(".blog-hero__search-input");
  const grid = document.getElementById("blog-grid");
  const countEl = document.getElementById("blog-count");
  const posts = getGridPosts();

  if (wrap) wrap.hidden = Boolean(searchQuery.trim());

  if (searchInput && searchInput.value !== searchQuery) {
    searchInput.value = searchQuery;
  }

  document.querySelectorAll("#blog-filters [data-category]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.category === activeCategory);
  });

  if (grid) {
    grid.innerHTML = posts.length
      ? posts.map(renderBlogGridCard).join("")
      : `<p class="blog-page__empty">لا توجد مقالات في هذا التصنيف</p>`;
  }

  if (countEl) {
    const count = posts.length.toLocaleString("ar-SA");
    countEl.textContent =
      posts.length === 0
        ? "لا توجد مقالات"
        : posts.length === 1
          ? "عرض مقال واحد"
          : `عرض ${count} مقالات`;
  }

  updateBlogUrl();
}

function renderTag(tag, variant = "main") {
  const cls = variant === "sidebar" ? "blog-detail-tag blog-detail-tag--sidebar" : "blog-detail-tag";
  return `<span class="${cls}">${tag}</span>`;
}

function getArticleContent(post) {
  if (post.content && !post.content.includes("محتوى المقال الكامل")) {
    return post.content;
  }

  return `<section class="blog-detail-section">
  <div class="blog-detail-section__head">
    <span class="blog-detail-section__num">1</span>
    <h2 class="blog-detail-section__title">مقدمة</h2>
  </div>
  <p>يعتبر ${post.title} من أهم المواضيع التي تشغل بال المهندسين والمختصين في المجال الهندسي. في هذا المقال، سنستعرض معاً أبرز النقاط والتفاصيل المهمة التي يجب معرفتها في سوق العمل المصري والعربي.</p>
</section>
<section class="blog-detail-section">
  <div class="blog-detail-section__head">
    <span class="blog-detail-section__num">2</span>
    <h2 class="blog-detail-section__title">النقاط الرئيسية</h2>
  </div>
  <ul class="cd-learn blog-detail-points">
    <li><i class="ri-checkbox-circle-line"></i><span>فهم الأساسيات والمبادئ الهامة في هذا المجال</span></li>
    <li><i class="ri-checkbox-circle-line"></i><span>تطبيق أحدث الممارسات والتقنيات العالمية على المشاريع المحلية</span></li>
    <li><i class="ri-checkbox-circle-line"></i><span>تجنب الأخطاء الشائعة التي يقع فيها المبتدئون</span></li>
    <li><i class="ri-checkbox-circle-line"></i><span>الاستفادة من خبرات المحترفين وتطبيقها في السوق المصري</span></li>
  </ul>
</section>
<section class="blog-detail-section">
  <div class="blog-detail-section__head">
    <span class="blog-detail-section__num">3</span>
    <h2 class="blog-detail-section__title">التطبيق العملي</h2>
  </div>
  <p>من المهم جداً أن نربط المعرفة النظرية بالتطبيق العملي. في مشاريعنا المصرية، نرى دائماً أهمية تطبيق هذه المفاهيم بشكل صحيح لضمان نجاح المشروع وتحقيق الأهداف المرجوة.</p>
  <div class="blog-detail-tip">
    <span class="blog-detail-tip__icon"><i class="ri-lightbulb-fill"></i></span>
    <div>
      <strong class="blog-detail-tip__title">نصيحة مهمة</strong>
      <p>لا تتردد في الاستثمار في التعليم المستمر وتطوير مهاراتك. السوق المصري يشهد نمواً متسارعاً، ويحتاج إلى مهندسين محترفين يواكبون أحدث التطورات.</p>
    </div>
  </div>
</section>
<section class="blog-detail-section">
  <div class="blog-detail-section__head">
    <span class="blog-detail-section__num">4</span>
    <h2 class="blog-detail-section__title">الخلاصة</h2>
  </div>
  <p>في النهاية، ${post.title} يعتبر موضوعاً حيوياً للغاية في مجال الهندسة المعمارية والبناء. ننصح بالاطلاع المستمر على آخر التطورات والمشاركة في الدورات التدريبية المتخصصة لضمان التميز المهني في سوق العمل.</p>
</section>`;
}

const DEFAULT_HERO = "assets/images/blog-details-hero.png";

function renderBlogDetails() {
  const post = getBlogBySlug(getQueryParam("slug")) || blogPosts[0];

  document.title = `${post.title} — coursacademy`;

  const breadcrumb = document.getElementById("bd-breadcrumb-title");
  if (breadcrumb) breadcrumb.textContent = post.title;

  const heroCategory = document.getElementById("bd-hero-category");
  if (heroCategory) heroCategory.textContent = post.category;

  document.getElementById("article-title").textContent = post.title;

  const avatar = document.getElementById("bd-author-avatar");
  if (avatar) {
    avatar.src = post.authorAvatar;
    avatar.alt = post.author;
  }

  const authorName = document.getElementById("bd-author-name");
  if (authorName) authorName.textContent = post.author;

  const publishedAt = document.getElementById("bd-published-at");
  if (publishedAt) publishedAt.textContent = formatDate(post.publishedAt);

  const heroReadTime = document.getElementById("bd-hero-read-time");
  if (heroReadTime) heroReadTime.textContent = `${post.readTime.toLocaleString("ar-SA", { useGrouping: false })} دقائق`;

  const heroViews = document.getElementById("bd-hero-views");
  if (heroViews) heroViews.textContent = `${post.views} مشاهدة`;

  const sidebarDate = document.getElementById("bd-sidebar-date");
  if (sidebarDate) sidebarDate.textContent = formatDate(post.publishedAt);

  const sidebarRead = document.getElementById("bd-sidebar-read");
  if (sidebarRead) sidebarRead.textContent = `${post.readTime.toLocaleString("ar-SA", { useGrouping: false })} دقائق`;

  const sidebarViews = document.getElementById("bd-sidebar-views");
  if (sidebarViews) sidebarViews.textContent = post.views.toLocaleString("ar-SA", { useGrouping: false });

  const sidebarCategory = document.getElementById("bd-sidebar-category");
  if (sidebarCategory) sidebarCategory.textContent = post.category;

  const introEl = document.getElementById("bd-intro");
  if (introEl) introEl.textContent = post.intro || post.excerpt;

  const tags = (post.tags || []).map((tag) => renderTag(tag, "main")).join("");
  const tagsEl = document.getElementById("bd-tags");
  if (tagsEl) tagsEl.innerHTML = tags;

  const sidebarTags = document.getElementById("bd-sidebar-tags");
  if (sidebarTags) sidebarTags.innerHTML = (post.tags || []).map((tag) => renderTag(tag, "sidebar")).join("");

  document.getElementById("article-content").innerHTML = getArticleContent(post);

  const authorCardAvatar = document.getElementById("bd-author-card-avatar");
  if (authorCardAvatar) {
    authorCardAvatar.src = post.authorAvatar;
    authorCardAvatar.alt = post.author;
  }

  const authorCardName = document.getElementById("bd-author-card-name");
  if (authorCardName) authorCardName.textContent = post.author;

  const authorRole = document.getElementById("bd-author-role");
  if (authorRole) authorRole.textContent = post.authorTitle || `كاتب متخصص في ${post.category}`;

  const authorBio = document.getElementById("bd-author-bio");
  if (authorBio) {
    authorBio.textContent =
      post.authorBio ||
      `كاتب متخصص في ${post.category}، يساهم بمقالات عملية للمهندسين والمهتمين بقطاع البناء.`;
  }

  const authorBadge = document.getElementById("bd-author-badge");
  if (authorBadge) authorBadge.textContent = post.authorBadge || "خبير";

  if (post.heroImage || DEFAULT_HERO) {
    const hero = document.querySelector(".blog-detail-hero");
    if (hero) {
      hero.style.backgroundColor = "#0a0a0a";
      hero.style.backgroundImage = `linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url("${post.heroImage || DEFAULT_HERO}")`;
      hero.style.backgroundSize = "100% 100%, cover";
      hero.style.backgroundPosition = "center, center";
      hero.style.backgroundRepeat = "no-repeat";
    }
  }

  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(post.title);
  document
    .querySelector(".blog-detail-share__pill--twitter")
    ?.setAttribute("href", `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`);
  document
    .querySelector(".blog-detail-share__pill--linkedin")
    ?.setAttribute("href", `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`);
  document
    .querySelector(".blog-detail-share__pill--whatsapp")
    ?.setAttribute(
      "href",
      `https://wa.me/?text=${encodeURIComponent(`${post.title} ${window.location.href}`)}`
    );

  const copyBtn = document.querySelector(".blog-detail-share__pill--copy");
  copyBtn?.addEventListener("click", async () => {
    const label = copyBtn.innerHTML;
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyBtn.innerHTML = '<i class="ri-check-line"></i> تم النسخ';
    } catch {
      copyBtn.innerHTML = '<i class="ri-link"></i> نسخ الرابط';
    }
    window.setTimeout(() => {
      copyBtn.innerHTML = label;
    }, 2000);
  });

  document.querySelector(".blog-detail-newsletter__form")?.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (page === "blog") {
    renderBlogPage();

    document.getElementById("blog-filters")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-category]");
      if (!btn) return;
      activeCategory = btn.dataset.category;
      renderBlogPage();
    });

    document.querySelector(".blog-hero__search")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = e.target.querySelector(".blog-hero__search-input");
      searchQuery = input?.value || "";
      renderBlogPage();
    });

    return;
  }

  if (page === "blog-details") {
    renderBlogDetails();
  }
});
