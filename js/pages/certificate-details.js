document.addEventListener("DOMContentLoaded", () => {
  const printBtn = document.querySelector("[data-cert-print]");
  const shareBtn = document.querySelector("[data-cert-share]");

  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const shareData = {
        title: "شهادة coursacademy",
        text: "شهادة إتمام دورة من coursacademy",
        url: window.location.href,
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
          return;
        }
      } catch (_) {}

      try {
        await navigator.clipboard.writeText(window.location.href);
        shareBtn.innerHTML = '<i class="ri-share-forward-line"></i> تم النسخ';
        setTimeout(() => {
          shareBtn.innerHTML = '<i class="ri-share-forward-line"></i> مشاركة';
        }, 1500);
      } catch (_) {}
    });
  }
});
