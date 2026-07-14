function updateUnreadLabel() {
  const label = document.querySelector("[data-unread-label]");
  if (!label) return;

  const count = document.querySelectorAll(".notif-card.is-unread").length;
  if (count === 0) {
    label.textContent = "لا توجد إشعارات غير مقروءة";
    return;
  }

  label.textContent = count === 1
    ? "لديك إشعار واحد غير مقروء"
    : `لديك ${count} إشعار غير مقروء`;
}

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("[data-notifs-list]");
  const markAllBtn = document.querySelector("[data-mark-all]");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const markBtn = e.target.closest("[data-mark-read]");
    if (markBtn) {
      const card = markBtn.closest(".notif-card");
      if (card) {
        card.classList.remove("is-unread");
        updateUnreadLabel();
      }
      return;
    }

    const deleteBtn = e.target.closest("[data-delete]");
    if (deleteBtn) {
      const card = deleteBtn.closest(".notif-card");
      if (card) {
        card.remove();
        updateUnreadLabel();
      }
    }
  });

  if (markAllBtn) {
    markAllBtn.addEventListener("click", () => {
      list.querySelectorAll(".notif-card.is-unread").forEach((card) => {
        card.classList.remove("is-unread");
      });
      updateUnreadLabel();
    });
  }

  updateUnreadLabel();
});
