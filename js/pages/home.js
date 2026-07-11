import { renderList } from "../common.js";
import { homeFeaturedTrackCard, homeTestimonialSlide, homeTrackCard, homeWhyCard } from "../render.js";
import { engineeringTracks, featuredCourses, homeFeatures, homeTestimonials } from "../data/home.js";

document.addEventListener("DOMContentLoaded", () => {
  renderList(document.getElementById("tracks-grid"), engineeringTracks, homeTrackCard);
  renderList(document.getElementById("featured-courses"), featuredCourses, homeFeaturedTrackCard);
  renderList(document.getElementById("features-grid"), homeFeatures, homeWhyCard);
  const repeatedTestimonials = [homeTestimonials[0], homeTestimonials[0], homeTestimonials[0]];
  renderList(document.getElementById("testimonials-track"), repeatedTestimonials, homeTestimonialSlide);
  initTestimonialSlider();
});

function initTestimonialSlider() {
  const track = document.getElementById("testimonials-track");
  const dots = document.getElementById("testimonials-dots");
  const prev = document.querySelector("[data-testimonial-prev]");
  const next = document.querySelector("[data-testimonial-next]");
  if (!track) return;

  const total = track.children.length;
  if (total <= 1) return;

  let index = 0;

  if (dots) {
    dots.innerHTML = Array.from({ length: total }, (_, i) =>
      `<button type="button" class="home-testimonials__dot${i === 0 ? " is-active" : ""}" data-dot="${i}" aria-label="شريحة ${i + 1}"></button>`
    ).join("");
  }

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots?.querySelectorAll(".home-testimonials__dot").forEach((d, j) => {
      d.classList.toggle("is-active", j === index);
    });
  }

  dots?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-dot]");
    if (btn) goTo(Number(btn.dataset.dot));
  });

  prev?.addEventListener("click", () => goTo(index - 1));
  next?.addEventListener("click", () => goTo(index + 1));
}
