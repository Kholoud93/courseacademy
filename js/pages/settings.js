document.addEventListener("DOMContentLoaded", () => {
  const avatarInput = document.querySelector("[data-avatar-input]");
  const avatarPreview = document.querySelector("[data-avatar-preview]");
  const form = document.querySelector("[data-profile-form]");

  if (avatarInput && avatarPreview) {
    avatarInput.addEventListener("change", () => {
      const file = avatarInput.files && avatarInput.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        avatarInput.value = "";
        return;
      }
      const url = URL.createObjectURL(file);
      avatarPreview.src = url;
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
});
