const ALT_MESSAGES = {
  vodafone: "سيتم إرسال تعليمات الدفع عبر فودافون كاش بعد تأكيد الطلب.",
  fawry: "بعد التأكيد ستحصل على كود فوري للدفع من أقرب فرع أو ماكينة.",
  instapay: "سيتم توجيهك لإتمام التحويل عبر إنستاباي بعد التأكيد.",
  bank: "ستظهر لك بيانات الحساب البنكي لإتمام التحويل بعد التأكيد.",
};

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function maskDisplayNumber(formatted) {
  const digits = formatted.replace(/\s/g, "");
  if (!digits) return "•••• •••• •••• ••••";
  const padded = digits.padEnd(16, "•");
  return padded.replace(/(.{4})/g, "$1 ").trim();
}

document.addEventListener("DOMContentLoaded", () => {
  const methods = document.querySelectorAll("[data-pay-method]");
  const cards = document.querySelectorAll(".payment-method");
  const cardPanel = document.querySelector("[data-card-panel]");
  const altPanel = document.querySelector("[data-alt-panel]");
  const altText = document.querySelector("[data-alt-text]");
  const nameInput = document.querySelector("[data-card-name]");
  const numberInput = document.querySelector("[data-card-number]");
  const expiryInput = document.querySelector("[data-card-expiry]");
  const cvvInput = document.querySelector("[data-card-cvv]");
  const displayName = document.querySelector("[data-card-display-name]");
  const displayNumber = document.querySelector("[data-card-display-number]");
  const displayExpiry = document.querySelector("[data-card-display-expiry]");
  const confirmBtn = document.querySelector("[data-pay-confirm]");

  function syncMethodUI() {
    const selected = document.querySelector("[data-pay-method]:checked");
    const value = selected ? selected.value : "card";

    cards.forEach((card) => {
      const input = card.querySelector("[data-pay-method]");
      card.classList.toggle("is-selected", input && input.checked);
    });

    const isCard = value === "card";
    if (cardPanel) cardPanel.hidden = !isCard;
    if (altPanel) {
      altPanel.hidden = isCard;
      if (!isCard && altText) {
        altText.textContent = ALT_MESSAGES[value] || "";
      }
    }
  }

  methods.forEach((input) => {
    input.addEventListener("change", syncMethodUI);
  });

  if (nameInput && displayName) {
    nameInput.addEventListener("input", () => {
      const value = nameInput.value.trim();
      displayName.textContent = value || "اسم حامل البطاقة";
    });
  }

  if (numberInput && displayNumber) {
    numberInput.addEventListener("input", () => {
      const formatted = formatCardNumber(numberInput.value);
      numberInput.value = formatted;
      displayNumber.textContent = maskDisplayNumber(formatted);
    });
  }

  if (expiryInput && displayExpiry) {
    expiryInput.addEventListener("input", () => {
      const formatted = formatExpiry(expiryInput.value);
      expiryInput.value = formatted;
      displayExpiry.textContent = formatted || "MM/YY";
    });
  }

  if (cvvInput) {
    cvvInput.addEventListener("input", () => {
      cvvInput.value = cvvInput.value.replace(/\D/g, "").slice(0, 4);
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      const selected = document.querySelector("[data-pay-method]:checked");
      if (!selected) return;

      if (selected.value === "card") {
        const name = nameInput?.value.trim() || "";
        const number = (numberInput?.value || "").replace(/\s/g, "");
        const expiry = expiryInput?.value.trim() || "";
        const cvv = cvvInput?.value.trim() || "";

        if (!name || number.length < 16 || expiry.length < 5 || cvv.length < 3) {
          nameInput?.focus();
          return;
        }
      }

      window.location.href = "order-success.html";
    });
  }

  syncMethodUI();
});
