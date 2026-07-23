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

const courseCategories = [
  { id: "all", label: "الكل" },
  { id: "bim", label: "BIM" },
  { id: "interior", label: "التصميم الداخلي" },
  { id: "construction", label: "إدارة البناء" },
  { id: "structural", label: "الهندسة الإنشائية" },
  { id: "software", label: "برامج هندسية" },
];

const courseLevels = [
  { id: "all", label: "الكل" },
  { id: "beginner", label: "مبتدئ" },
  { id: "intermediate", label: "متوسط" },
  { id: "advanced", label: "متقدم" },
];

const defaultLearnItems = [
  "فهم واجهة البرنامج وأدوات الرسم الأساسية",
  "إنشاء نماذج معمارية ثلاثية الأبعاد دقيقة",
  "إنتاج مخططات معمارية احترافية جاهزة للتنفيذ",
  "تطبيق معايير BIM في المشاريع الحقيقية",
  "إدارة العائلات والمكتبات والقوالب",
  "تصدير الملفات والتنسيق مع فرق العمل",
];

const defaultRequirements = [
  "معرفة أساسية بالرسم الهندسي أو التصميم المعماري",
  "جهاز كمبيوتر يدعم تشغيل Revit",
  "لا يلزم خبرة سابقة في البرنامج",
];

const curriculumByCourse = {
  202: [
    {
      id: 1,
      title: "مقدمة في Revit",
      meta: "5 دروس • 2 ساعة",
      lessons: [
        { id: 1, title: "تعريف شامل بالبرنامج وأهميته", isFree: true },
        { id: 2, title: "واجهة المستخدم والتنقل" },
        { id: 3, title: "إعداد المشروع والإعدادات الأولية" },
        { id: 4, title: "الأدوات الأساسية والاختصارات" },
        { id: 5, title: "التنقل في المشروع ثلاثي الأبعاد" },
      ],
    },
    {
      id: 2,
      title: "النمذجة المعمارية الأساسية",
      meta: "12 دروس • 10 ساعات",
      lessons: [],
    },
    {
      id: 3,
      title: "التوثيق والإخراج المعماري",
      meta: "10 دروس • 8 ساعات",
      lessons: [],
    },
    {
      id: 4,
      title: "المشاريع المتقدمة والعملية",
      meta: "18 دروس • 20 ساعة",
      lessons: [],
    },
  ],
};

const detailById = {
  201: {
    heroDescription:
      "دورة شاملة لتعلم AutoCAD من الصفر حتى الاحتراف في الرسم الهندسي ثنائي وثلاثي الأبعاد مع تطبيقات عملية للمهندسين.",
    learnItems: defaultLearnItems,
    requirements: defaultRequirements,
    language: "العربية",
    accessType: "مدى الحياة",
    lastUpdated: "2025-01-10",
    instructorRole: "مهندسة معمارية | مدربة معتمدة",
    instructorBio:
      "خبرة أكثر من 10 سنوات في التدريب على البرامج الهندسية، عملت مع مكاتب استشارية في الرياض وجدة.",
  },
  202: {
    displayTitle: "إتقان Revit Architecture",
    heroDescription:
      "دورة شاملة في Revit Architecture تغطي كل ما تحتاجه لتصبح مهندس BIM محترف من الأساسيات حتى المشاريع المتقدمة في السوق السعودي",
    price: 3999,
    oldPrice: 5999,
    rating: 4.8,
    reviewCount: 342,
    studentCount: 2456,
    lessonCount: 45,
    hours: 40,
    curriculumSummary: "45 درس • 40 ساعة",
    level: "متقدم",
    category: "BIM",
    discount: 33,
    instructorName: "م. أحمد الشمري",
    instructorAvatar: "assets/images/team-ahmed-shamri.png",
    heroInstructorAvatar: "assets/images/team-ahmed-shamri.png",
    instructorTitle: "BIM Expert",
    instructorTabBio:
      "خبير BIM معتمد مع أكثر من 15 سنة خبرة في مجال النمذجة المعمارية والمشاريع الضخمة",
    instructorBadge: "محترف",
    instructorStats: [
      { icon: "ri-star-line", color: "gold", value: "4.8", label: "تقييم المدرب" },
      { icon: "ri-group-line", color: "blue", value: "2,456", label: "طالب" },
      { icon: "ri-award-line", color: "purple", value: "342", label: "تقييم" },
    ],
    instructorSocial: [
      { icon: "ri-twitter-x-line", label: "Twitter", href: "#", type: "twitter" },
      { icon: "ri-linkedin-fill", label: "LinkedIn", href: "#", type: "linkedin" },
    ],
    reviewDistribution: [
      { stars: 5, percent: 72 },
      { stars: 4, percent: 20 },
      { stars: 3, percent: 6 },
      { stars: 2, percent: 1 },
      { stars: 1, percent: 1 },
    ],
    courseReviews: [
      {
        id: 1,
        userName: "محمد علي",
        userAvatar: "assets/images/consult-avatar-1.png",
        rating: 5,
        timeAgo: "منذ أسبوعين",
        text: "دورة استثنائية! المحتوى منظم بشكل رائع والمدرب محترف جداً. استفدت منها كثيراً في عملي.",
      },
      {
        id: 2,
        userName: "سارة محمود",
        userAvatar: "assets/images/consult-avatar-2.png",
        rating: 5,
        timeAgo: "منذ شهر",
        text: "أفضل استثمار قمت به في تطوير مهاراتي. الشرح واضح والأمثلة عملية تماماً.",
      },
      {
        id: 3,
        userName: "عمر حسن",
        userAvatar: "assets/images/consult-avatar-3.png",
        rating: 4,
        timeAgo: "منذ شهرين",
        text: "دورة ممتازة ومحتوى قيم جداً. أنصح بها كل من يريد الاحتراف في هذا المجال.",
      },
    ],
    heroInstructorBio: "خبير BIM معتمد مع أكثر من 15 عاماً من الخبرة في المشاريع السكنية والتجارية",
    learnItems: [
      "إتقان واجهة Revit والأدوات الأساسية باحتراف",
      "نمذجة المباني والعناصر المعمارية وفق المعايير السعودية",
      "إنشاء المخططات التنفيذية والمقاطع والواجهات",
      "العمل مع العائلات والمكونات المخصصة",
      "إدارة المشاريع الكبيرة والعمل ضمن فرق",
      "التعاون مع الفرق في مشاريع BIM معقدة",
    ],
    requirements: [
      "معرفة أساسية بالهندسة المعمارية",
      "جهاز كمبيوتر بمواصفات مناسبة لتشغيل Revit",
      "تثبيت Revit 2024 أو أحدث",
    ],
    language: "العربية",
    accessType: "مدى الحياة",
    lastUpdated: "2025-03-15",
    instructorRole: "مهندس معماري | أخصائي BIM",
    instructorBio:
      "دكتور في الهندسة المعمارية مع أكثر من 15 عاماً من الخبرة في تصميم المشاريع السكنية والتجارية باستخدام Revit وBIM. قام بتدريب أكثر من 3000 مهندس ومعماري.",
    metaCards: [
      { icon: "ri-bar-chart-2-line", color: "blue", label: "المستوى", value: "متقدم" },
      { icon: "ri-global-line", color: "green", label: "اللغة", value: "العربية" },
      { icon: "ri-book-open-line", color: "purple", label: "عدد الدروس", value: "45 درس" },
      { icon: "ri-time-line", color: "orange", label: "المدة الإجمالية", value: "40 ساعة" },
      { icon: "ri-calendar-line", color: "red", label: "آخر تحديث", value: "مارس 2026" },
      { icon: "ri-medal-line", color: "gold", label: "الوصول", value: "مدى الحياة" },
    ],
    sidebarFeatures: [
      { icon: "ri-time-line", label: "مدة الدورة", value: "٤٠ ساعة" },
      { icon: "ri-book-open-line", label: "عدد الدروس", value: "45 درس" },
      { icon: "ri-bar-chart-2-line", label: "المستوى", value: "متقدم" },
      { icon: "ri-global-line", label: "اللغة", value: "العربية" },
      { icon: "ri-medal-line", label: "شهادة إتمام", value: "نعم، معتمدة" },
      { icon: "ri-infinity-line", label: "الوصول", value: "مدى الحياة" },
    ],
  },
  203: {
    heroDescription:
      "تعلم إدارة المشاريع الهندسية الكبرى باستخدام Primavera P6 من الجدولة الزمنية حتى تتبع التكاليف والموارد.",
    learnItems: defaultLearnItems,
    requirements: [
      "خبرة أساسية في إدارة المشاريع أو الهندسة",
      "جهاز كمبيوتر يدعم تشغيل Primavera",
    ],
    language: "العربية",
    accessType: "مدى الحياة",
    lastUpdated: "2024-11-20",
    instructorRole: "مدير مشاريع | PMP معتمد",
    instructorBio:
      "خبرة 12 عاماً في إدارة مشاريع البناء والبنية التحتية في المملكة والخليج.",
  },
  204: {
    heroDescription:
      "تحليل وتصميم المنشآت الخرسانية والفولاذية باحترافية باستخدام SAP2000 مع أمثلة تطبيقية واقعية.",
    learnItems: defaultLearnItems,
    requirements: [
      "خلفية في الهندسة الإنشائية أو الميكانيكا",
      "معرفة أساسية بالتحليل الإنشائي",
    ],
    language: "العربية",
    accessType: "مدى الحياة",
    lastUpdated: "2025-02-05",
    instructorRole: "مهندس إنشائي | PhD",
    instructorBio:
      "استشاري هندسة إنشائية متخصص في تحليل وتصميم المنشآت عالية الارتفاع.",
  },
};

function buildMeta(course, detail) {
  return [
    { icon: "ri-bar-chart-2-line", color: "blue", label: "المستوى", value: course.level },
    { icon: "ri-global-line", color: "green", label: "اللغة", value: detail.language },
    { icon: "ri-book-open-line", color: "purple", label: "عدد الدروس", value: `${course.lessonCount.toLocaleString("ar-SA")} درس` },
    { icon: "ri-time-line", color: "orange", label: "المدة الإجمالية", value: `${course.hours.toLocaleString("ar-SA")} ساعة` },
    { icon: "ri-calendar-line", color: "red", label: "آخر تحديث", value: detail.lastUpdated },
    { icon: "ri-medal-line", color: "gold", label: "الوصول", value: detail.accessType },
  ];
}

function buildSidebarFeatures(course, detail) {
  return [
    { icon: "ri-time-line", label: "مدة الدورة", value: `${course.hours.toLocaleString("ar-SA")} ساعة` },
    { icon: "ri-book-open-line", label: "عدد الدروس", value: `${course.lessonCount.toLocaleString("ar-SA")} درس` },
    { icon: "ri-bar-chart-2-line", label: "المستوى", value: course.level },
    { icon: "ri-global-line", label: "اللغة", value: detail.language },
    { icon: "ri-medal-line", label: "شهادة إتمام", value: "نعم، معتمدة" },
    { icon: "ri-infinity-line", label: "الوصول", value: detail.accessType },
  ];
}

const courses = featuredCourses.map((course) => {
  const detail = detailById[course.id] || {};
  const merged = {
    ...course,
    ...detail,
    title: detail.displayTitle || course.title,
    description: detail.heroDescription || course.description,
    categorySlug: categorySlugMap[detail.category || course.category] || "software",
    levelSlug: levelSlugMap[detail.level || course.level] || "beginner",
    categoryName: detail.category || course.category,
    isFree: false,
    progressPercent: 0,
    duration: (detail.hours || course.hours) * 60,
    learnItems: detail.learnItems || defaultLearnItems,
    requirements: detail.requirements || defaultRequirements,
    meta: detail.metaCards || buildMeta({ ...course, ...detail }, detail),
    sidebarFeatures: detail.sidebarFeatures || buildSidebarFeatures({ ...course, ...detail }, detail),
    features: [
      `${(detail.lessonCount || course.lessonCount).toLocaleString("ar-SA")} درس فيديو`,
      `${(detail.hours || course.hours).toLocaleString("ar-SA")} ساعة محتوى`,
      "شهادة إتمام",
      "وصول مدى الحياة",
    ],
  };
  return merged;
});

function getCourseById(id) {
  return courses.find((course) => course.id === Number(id));
}

function getCurriculumForCourse(id) {
  return curriculumByCourse[Number(id)] || curriculumByCourse[202];
}


const curriculum = curriculumByCourse[202];
