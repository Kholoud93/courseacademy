export const courses = [
  {
    id: 1, slug: "javascript-basics", title: "أساسيات JavaScript",
    image: "assets/images/course-1.jpg",
    categoryName: "برمجة", instructorName: "أحمد محمد",
    instructorAvatar: "assets/images/instructor-1.jpg",
    rating: 4.8, lessonCount: 42, duration: 720, price: 199, oldPrice: 299, discount: 25, isFree: false,
    studentCount: 1250, progressPercent: 65,
    description: "تعلم أساسيات JavaScript من الصفر حتى الاحتراف.",
    features: ["42 درس فيديو", "12 ساعة محتوى", "شهادة إتمام", "وصول مدى الحياة"],
  },
  {
    id: 2, slug: "ui-design", title: "تصميم واجهات المستخدم",
    image: "assets/images/course-2.jpg",
    categoryName: "تصميم", instructorName: "سارة علي",
    instructorAvatar: "assets/images/instructor-2.jpg",
    rating: 4.9, lessonCount: 36, duration: 540, price: 249, oldPrice: 349, discount: 25, isFree: false,
    studentCount: 890, progressPercent: 30,
    description: "أتقن تصميم UI/UX باستخدام Figma.",
    features: ["36 درس فيديو", "9 ساعات محتوى", "مشاريع عملية", "شهادة إتمام"],
  },
  {
    id: 3, slug: "digital-marketing", title: "التسويق الرقمي",
    image: "assets/images/course-3.jpg",
    categoryName: "تسويق", instructorName: "خالد عبدالله",
    instructorAvatar: "assets/images/instructor-3.jpg",
    rating: 4.6, lessonCount: 28, duration: 420, price: 149, oldPrice: 199, discount: 25, isFree: false,
    studentCount: 2100, progressPercent: 100,
    description: "استراتيجيات التسويق الرقمي الحديثة.",
    features: ["28 درس فيديو", "7 ساعات محتوى", "شهادة إتمام"],
  },
  {
    id: 4, slug: "react-advanced", title: "React المتقدم",
    image: "assets/images/course-4.jpg",
    categoryName: "برمجة", instructorName: "أحمد محمد",
    instructorAvatar: "assets/images/instructor-1.jpg",
    rating: 4.7, lessonCount: 48, duration: 960, price: 299, oldPrice: 399, discount: 25, isFree: false,
    studentCount: 670, progressPercent: 0,
    description: "Hooks, Context, Performance و Patterns.",
    features: ["48 درس فيديو", "16 ساعة محتوى", "شهادة إتمام"],
  },
];

export const curriculum = [
  {
    id: 1, title: "مقدمة في الدورة",
    lessons: [
      { id: 1, title: "مرحباً بك", duration: 5, isCompleted: true },
      { id: 2, title: "إعداد بيئة العمل", duration: 12, isCompleted: true },
    ],
  },
  {
    id: 2, title: "الأساسيات",
    lessons: [
      { id: 3, title: "المتغيرات والأنواع", duration: 18, isCompleted: false },
      { id: 4, title: "الدوال", duration: 22, isCompleted: false },
      { id: 5, title: "اختبار قصير", duration: 10, isCompleted: false, type: "quiz" },
    ],
  },
];

export function getCourseById(id) {
  return courses.find((c) => c.id === Number(id));
}
