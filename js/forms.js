
export function initForms() {
  document.addEventListener("input", (e) => {
    if (!e.target.classList.contains("input--otp") && !e.target.classList.contains("auth-otp__input")) return;
    if (e.target.value.length === 1) {
      const next = e.target.parentElement.querySelector(`[data-otp-index="${Number(e.target.dataset.otpIndex) + 1}"]`);
      next?.focus();
    }
  });

  document.addEventListener("click", (e) => {
    const toggle = e.target.closest("[data-password-toggle]");
    if (!toggle) return;
    const input = toggle.parentElement.querySelector("input");
    if (!input) return;
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    const icon = toggle.querySelector("i");
    if (icon) {
      icon.className = isPassword ? "ri-eye-off-line" : "ri-eye-line";
    }
  });

  document.querySelectorAll("form[data-prevent]").forEach((form) => {
    form.addEventListener("submit", (e) => e.preventDefault());
  });
}
