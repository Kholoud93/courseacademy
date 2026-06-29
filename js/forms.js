/** Form helpers: OTP auto-focus, password toggle, prevent default submits */
export function initForms() {
  // OTP — move to next input
  document.addEventListener("input", (e) => {
    if (!e.target.classList.contains("input--otp")) return;
    if (e.target.value.length === 1) {
      const next = e.target.parentElement.querySelector(`[data-otp-index="${Number(e.target.dataset.otpIndex) + 1}"]`);
      next?.focus();
    }
  });

  // Password visibility toggle
  document.addEventListener("click", (e) => {
    const toggle = e.target.closest("[data-password-toggle]");
    if (!toggle) return;
    const input = toggle.parentElement.querySelector("input");
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
  });

  // Generic form submit prevention (pages handle redirect)
  document.querySelectorAll("form[data-prevent]").forEach((form) => {
    form.addEventListener("submit", (e) => e.preventDefault());
  });
}
