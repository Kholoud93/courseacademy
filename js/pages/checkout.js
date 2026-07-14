const BASE_TOTAL = 8498;
const COUPON_CODE = "COURSADEMY10";
const COUPON_PERCENT = 0.1;

function formatPrice(n) {
  return `${Math.round(n).toLocaleString("en-US")} د.أ`;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("[data-coupon-input]");
  const applyBtn = document.querySelector("[data-coupon-apply]");
  const msg = document.querySelector("[data-coupon-msg]");
  const row = document.querySelector("[data-coupon-row]");
  const discountEl = document.querySelector("[data-coupon-discount]");
  const totalEl = document.querySelector("[data-checkout-total]");
  if (!input || !applyBtn) return;

  let applied = false;

  input.addEventListener("input", () => {
    applyBtn.classList.toggle("is-ready", input.value.trim().length > 0);
  });

  applyBtn.addEventListener("click", () => {
    const code = input.value.trim().toUpperCase();
    msg.hidden = false;

    if (code === COUPON_CODE) {
      applied = true;
      const couponValue = BASE_TOTAL * COUPON_PERCENT;
      const newTotal = BASE_TOTAL - couponValue;
      row.hidden = false;
      discountEl.textContent = `-${formatPrice(couponValue)}`;
      totalEl.textContent = formatPrice(newTotal);
      msg.textContent = "تم تطبيق الكوبون بنجاح";
      msg.className = "checkout-coupon__msg is-success";
      return;
    }

    applied = false;
    row.hidden = true;
    totalEl.textContent = formatPrice(BASE_TOTAL);
    msg.textContent = "كود الخصم غير صالح";
    msg.className = "checkout-coupon__msg is-error";
  });
});
