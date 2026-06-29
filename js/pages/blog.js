import { renderList, getQueryParam, formatDate } from "../common.js";
import { blogCard } from "../render.js";
import { blogPosts, getBlogBySlug } from "../data/blogs.js";

const page = document.body.dataset.page;

document.addEventListener("DOMContentLoaded", () => {
  if (page === "blog" && document.getElementById("blog-grid")) {
    renderList(document.getElementById("blog-grid"), blogPosts, blogCard);
  }

  if (page === "blog-details") {
    const post = getBlogBySlug(getQueryParam("slug")) || blogPosts[0];
    document.getElementById("article-title").textContent = post.title;
    document.getElementById("article-meta").textContent = `${formatDate(post.publishedAt)} · ${post.author}`;
    document.getElementById("article-image").src = post.image;
    document.getElementById("article-content").innerHTML = post.content;
    const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);
    renderList(document.getElementById("related-posts"), related, blogCard);
  }
});
