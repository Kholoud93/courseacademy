import { featuredCourses } from "./home.js";

const categorySlugMap = {
  "برامج هندسية": "software",
  "إدارة البناء": "construction",
  "هندسة إنشائية": "structural",
  BIM: "bim",
  "التصميم الداخلي": "interior",
};

const levelSlugMap = {
  مبتدئ: "beginner",
  متوسط: "intermediate",
  متقدم: "advanced",
};

export const courseCategories = [
  { id: "all", label: "الكل" },
  { id: "bim", label: "BIM" },
  { id: "interior", label: "التصميم الداخلي" },
  { id: "construction", label: "إدارة البناء" },
  { id: "structural", label: "الهندسة الإنشائية" },
  { id: "software", label: "برامج هندسية" },
];

export const courseLevels = [
  { id: "all", label: "الكل" },
  { id: "beginner", label: "مبتدئ" },
  { id: "intermediate", label: "متوسط" },
  { id: "advanced", label: "متقدم" },
];

export const courses = featuredCourses.map((course) => ({
  ...course,
  categorySlug: categorySlugMap[course.category] || "software",
  levelSlug: levelSlugMap[course.level] || "beginner",
  categoryName: course.category,
  isFree: false,
  progressPercent: 0,
  duration: course.hours * 60,
  features: [
    `${course.lessonCount.toLocaleString("ar-SA")} درس فيديو`,
    `${course.hours.toLocaleString("ar-SA")} ساعة محتوى`,
    "شهادة إتمام",
    "وصول مدى الحياة",
  ],
}));

export function getCourseById(id) {
  return courses.find((course) => course.id === Number(id));
}

export const curriculum = [
  {
    id: 1,
    title: "مقدمة في الدورة",
    lessons: [
      { id: 1, title: "مرحباً بك", duration: 5, isCompleted: true },
      { id: 2, title: "إعداد بيئة العمل", duration: 12, isCompleted: true },
    ],
  },
  {
    id: 2,
    title: "الأساسيات",
    lessons: [
      { id: 3, title: "المتغيرات والأنواع", duration: 18, isCompleted: false },
      { id: 4, title: "الدوال", duration: 22, isCompleted: false },
      { id: 5, title: "اختبار قصير", duration: 10, isCompleted: false, type: "quiz" },
    ],
  },
];
