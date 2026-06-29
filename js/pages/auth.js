/** Auth page redirects after form submit */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  const redirects = {
    login: "dashboard.html",
    register: "dashboard.html",
    "forgot-password": "otp.html",
    otp: "reset-password.html",
    "reset-password": "auth-success.html",
  };

  const form = document.querySelector("[data-auth-form]");
  if (form && redirects[page]) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = redirects[page];
    });
  }
});
