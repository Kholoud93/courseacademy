
export function initSlider(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const track = container.querySelector("[data-slider-track]");
  const prev = container.querySelector("[data-slider-prev]");
  const next = container.querySelector("[data-slider-next]");
  if (!track) return;

  let index = 0;
  const slides = track.children;
  const total = slides.length;
  if (total <= 1) return;

  function goTo(i) {
    index = Math.max(0, Math.min(i, total - 1));
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prev?.addEventListener("click", () => goTo(index - 1));
  next?.addEventListener("click", () => goTo(index + 1));
}
