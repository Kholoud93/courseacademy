export const blogPosts = [
  {
    id: 1, slug: "learn-programming-2025", title: "كيف تبدأ تعلم البرمجة في 2025",
    image: "https://picsum.photos/seed/blog1/400/250",
    excerpt: "دليل شامل للمبتدئين لبدء رحلة البرمجة.",
    content: "<p>محتوى المقال الكامل...</p>",
    author: "أحمد محمد", publishedAt: "2025-03-15",
  },
  {
    id: 2, slug: "ui-design-tips", title: "10 نصائح لتصميم واجهات أفضل",
    image: "https://picsum.photos/seed/blog2/400/250",
    excerpt: "نصائح عملية من خبراء التصميم.",
    content: "<p>محتوى المقال الكامل...</p>",
    author: "سارة علي", publishedAt: "2025-03-10",
  },
  {
    id: 3, slug: "digital-marketing-guide", title: "دليل التسويق الرقمي للمبتدئين",
    image: "https://picsum.photos/seed/blog3/400/250",
    excerpt: "كل ما تحتاج معرفته عن التسويق الرقمي.",
    content: "<p>محتوى المقال الكامل...</p>",
    author: "خالد عبدالله", publishedAt: "2025-03-05",
  },
];

export function getBlogBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}
