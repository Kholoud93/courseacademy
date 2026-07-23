const instructors = [
  { id: 1, name: "أحمد محمد", avatar: "https://picsum.photos/seed/inst1/200/200", specialty: "مطور Full Stack" },
  { id: 2, name: "سارة علي", avatar: "https://picsum.photos/seed/inst2/200/200", specialty: "مصممة UI/UX" },
  { id: 3, name: "خالد عبدالله", avatar: "https://picsum.photos/seed/inst3/200/200", specialty: "خبير تسويق رقمي" },
  { id: 4, name: "نورة حسن", avatar: "https://picsum.photos/seed/inst4/200/200", specialty: "مدربة أعمال" },
];

const user = {
  name: "محمد العتيبي",
  email: "mohammed@example.com",
  phone: "0501234567",
  avatar: "https://picsum.photos/seed/user1/128/128",
  stats: [
    { icon: "📚", value: 2, label: "دورات جارية", color: "#0056D2" },
    { icon: "✅", value: 1, label: "دورات مكتملة", color: "#22C55E" },
    { icon: "🏆", value: 1, label: "شهادات", color: "#FFB800" },
    { icon: "⭐", value: 450, label: "نقاط", color: "#8B5CF6" },
  ],
};

const notifications = [
  { title: "دورة جديدة", message: "تم إضافة دورة React المتقدم", time: "منذ 5 دقائق", isRead: false },
  { title: "شهادة جاهزة", message: "شهادتك جاهزة للتحميل", time: "منذ ساعة", isRead: false },
  { title: "تذكير", message: "لديك درس غير مكتمل", time: "أمس", isRead: true },
];

const messages = [
  { name: "أحمد محمد", avatar: "https://picsum.photos/seed/inst1/64/64", preview: "مرحباً، هل لديك سؤال؟", time: "10:30", isRead: false },
  { name: "سارة علي", avatar: "https://picsum.photos/seed/inst2/64/64", preview: "تم مراجعة مشروعك", time: "أمس", isRead: true },
];

const certificates = [
  { id: 1, courseTitle: "التسويق الرقمي", issuedAt: "2025-02-20", certificateNumber: "CERT-2025-001" },
  { id: 2, courseTitle: "أساسيات JavaScript", issuedAt: "2025-01-15", certificateNumber: "CERT-2025-002" },
];

function getCertificateById(id) {
  return certificates.find((c) => c.id === Number(id));
}

const transactions = [
  { date: "2025-03-01", description: "أساسيات JavaScript", amount: "199 ر.س", status: "مكتمل" },
  { date: "2025-02-15", description: "تصميم UI", amount: "249 ر.س", status: "مكتمل" },
];

const quiz = {
  questions: [
    {
      text: "ما هي طريقة declaring a variable in ES6?",
      options: ["var x = 5", "let x = 5", "variable x = 5", "declare x = 5"],
    },
  ],
};
