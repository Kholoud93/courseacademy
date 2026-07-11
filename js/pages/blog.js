import { renderList, getQueryParam, formatDate } from "../common.js";
import { blogCard, blogFeaturedCard } from "../render.js";
import { blogPosts, blogCategories, blogGridPosts, getBlogBySlug, getFeaturedPost } from "../data/blogs.js";

const page = document.body.dataset.page;

let activeCategory = getQueryParam("category") || "all";
let searchQuery = getQueryParam("q") || "";

function renderCategoryFilters() {
  const container = document.getElementById("blog-filters");
  if (!container) return;

  container.innerHTML = blogCategories
    .map(
      (cat) => `
    <button
      type="button"
      class="blog-filters__pill${cat.id === activeCategory ? " is-active" : ""}"
      data-category="${cat.id}"
    >${cat.label}</button>`
    )
    .join("");
}

function updateBlogUrl() {
  const url = new URL(window.location.href);
  if (searchQuery.trim()) url.searchParams.set("q", searchQuery.trim());
  else url.searchParams.delete("q");
  if (activeCategory !== "all") url.searchParams.set("category", activeCategory);
  else url.searchParams.delete("category");
  window.history.replaceState({}, "", url);
}

function renderBlogPage() {
  const featuredEl = document.getElementById("blog-featured");
  const grid = document.getElementById("blog-grid");
  const countEl = document.getElementById("blog-count");
  const searchInput = document.querySelector(".blog-hero__search-input");
  const showFeatured = !searchQuery.trim() && activeCategory === "all";

  if (featuredEl) {
    const wrap = featuredEl.closest(".blog-featured-wrap");
    if (showFeatured) {
      featuredEl.innerHTML = blogFeaturedCard(getFeaturedPost());
      if (wrap) wrap.hidden = false;
    } else {
      featuredEl.innerHTML = "";
      if (wrap) wrap.hidden = true;
    }
  }

  renderList(grid, blogGridPosts, blogCard);

  if (countEl) {
    countEl.textContent = `عرض ${blogGridPosts.length.toLocaleString("ar-SA")} مقال`;
  }

  if (searchInput && searchInput.value !== searchQuery) {
    searchInput.value = searchQuery;
  }

  renderCategoryFilters();
  updateBlogUrl();
}

function getArticleContent(post) {
  if (post.content && !post.content.includes("محتوى المقال الكامل")) {
    return post.content;
  }
  return `<p>${post.excerpt}</p>`;
}

function renderBlogDetails() {
  const post = getBlogBySlug(getQueryParam("slug")) || blogPosts[0];

  document.title = `${post.title} — coursacademy`;

  const breadcrumb = document.getElementById("bd-breadcrumb-title");
  if (breadcrumb) breadcrumb.textContent = post.title;

  const categoryEl = document.getElementById("bd-category");
  if (categoryEl) categoryEl.textContent = post.category;

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

  const readTime = document.getElementById("bd-read-time");
  if (readTime) readTime.textContent = `${post.readTime.toLocaleString("ar-SA")} دقائق قراءة`;

  const views = document.getElementById("bd-views");
  if (views) views.textContent = `${post.views.toLocaleString("ar-SA")} مشاهدة`;

  const image = document.getElementById("article-image");
  if (image) {
    image.src = post.image;
    image.alt = post.title;
  }

  const tagsEl = document.getElementById("bd-tags");
  if (tagsEl) {
    tagsEl.innerHTML = (post.tags || [])
      .map((tag) => `<span class="blog-card__tag">${tag}</span>`)
      .join("");
  }

  document.getElementById("article-content").innerHTML = getArticleContent(post);

  renderList(document.getElementById("related-posts"), blogGridPosts.slice(0, 3), blogCard);
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
