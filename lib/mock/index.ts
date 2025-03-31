// 博客文章数据
export const posts = [
  {
    id: 1,
    title: "现代Web开发入门",
    content: "这里是文章的完整内容...",
    excerpt: "学习如何使用最新技术构建可扩展的Web应用程序",
    slug: "getting-started-with-modern-web-development",
    date: "2025-03-25",
    author: {
      id: 1,
      name: "张美丽",
      email: "zhang@example.com",
    },
    tags: ["Web开发", "Next.js", "React"],
    status: "published",
  },
  {
    id: 2,
    title: "AI在内容创作中的未来",
    content: "这里是文章的完整内容...",
    excerpt: "探索人工智能如何改变内容创作的未来发展趋势",
    slug: "the-future-of-ai-in-content-creation",
    date: "2025-03-22",
    author: {
      id: 2,
      name: "李明",
      email: "li@example.com",
    },
    tags: ["人工智能", "内容创作", "技术趋势"],
    status: "published",
  },
  {
    id: 3,
    title: "2025年响应式设计技术",
    content: "这里是文章的完整内容...",
    excerpt: "了解最新的响应式设计技术和最佳实践",
    slug: "responsive-design-techniques-for-2025",
    date: "2025-03-20",
    author: {
      id: 1,
      name: "张美丽",
      email: "zhang@example.com",
    },
    tags: ["响应式设计", "CSS", "用户体验"],
    status: "published",
  },
  {
    id: 4,
    title: "优化您的网站性能",
    content: "这里是文章的完整内容...",
    excerpt: "学习如何提高网站速度和性能的关键技术",
    slug: "optimizing-your-website-performance",
    date: "2025-03-18",
    author: {
      id: 2,
      name: "李明",
      email: "li@example.com",
    },
    tags: ["性能优化", "Web开发", "用户体验"],
    status: "draft",
  },
  {
    id: 5,
    title: "无服务器架构的兴起",
    content: "这里是文章的完整内容...",
    excerpt: "探索无服务器架构如何改变应用程序开发和部署",
    slug: "the-rise-of-serverless-architecture",
    date: "2025-03-15",
    author: {
      id: 1,
      name: "张美丽",
      email: "zhang@example.com",
    },
    tags: ["无服务器", "云计算", "架构"],
    status: "scheduled",
  },
]

// 用户数据
export const users = [
  {
    id: 1,
    name: "张美丽",
    email: "zhang@example.com",
    role: "admin",
    status: "active",
    joinedDate: "2025-01-12",
  },
  {
    id: 2,
    name: "李明",
    email: "li@example.com",
    role: "author",
    status: "active",
    joinedDate: "2025-02-03",
  },
  {
    id: 3,
    name: "王静",
    email: "wang@example.com",
    role: "author",
    status: "active",
    joinedDate: "2025-02-14",
  },
  {
    id: 4,
    name: "赵伟",
    email: "zhao@example.com",
    role: "subscriber",
    status: "inactive",
    joinedDate: "2025-03-01",
  },
  {
    id: 5,
    name: "陈刚",
    email: "chen@example.com",
    role: "subscriber",
    status: "active",
    joinedDate: "2025-03-15",
  },
]

// 统计数据
export const stats = {
  totalPosts: 126,
  totalViews: 82419,
  totalUsers: 972,
  totalComments: 1843,
  totalSubscribers: 3856,
  averageReadTime: "3:42",
  postsByMonth: [
    { month: "一月", count: 12 },
    { month: "二月", count: 15 },
    { month: "三月", count: 18 },
    { month: "四月", count: 16 },
    { month: "五月", count: 21 },
    { month: "六月", count: 19 },
    { month: "七月", count: 25 },
  ],
  viewsByDay: [
    { date: "2025-03-01", views: 1245 },
    { date: "2025-03-02", views: 1312 },
    { date: "2025-03-03", views: 1478 },
    { date: "2025-03-04", views: 1356 },
    { date: "2025-03-05", views: 1567 },
    { date: "2025-03-06", views: 1689 },
    { date: "2025-03-07", views: 1897 },
    { date: "2025-03-08", views: 1754 },
    { date: "2025-03-09", views: 1621 },
    { date: "2025-03-10", views: 1487 },
    { date: "2025-03-11", views: 1532 },
    { date: "2025-03-12", views: 1678 },
    { date: "2025-03-13", views: 1842 },
    { date: "2025-03-14", views: 1945 },
  ],
  deviceBreakdown: [
    { device: "桌面设备", percentage: 58 },
    { device: "移动设备", percentage: 36 },
    { device: "平板设备", percentage: 6 },
  ],
  popularPosts: [
    { id: 1, title: "现代Web开发入门", views: 4856, comments: 32, shares: 126 },
    { id: 2, title: "AI在内容创作中的未来", views: 3721, comments: 46, shares: 98 },
    { id: 3, title: "2025年响应式设计技术", views: 3542, comments: 29, shares: 87 },
    { id: 4, title: "优化您的网站性能", views: 3105, comments: 18, shares: 64 },
    { id: 5, title: "无服务器架构的兴起", views: 2876, comments: 24, shares: 73 },
  ],
  userActivityByDay: [
    { day: "周一", comments: 24, signups: 8 },
    { day: "周二", comments: 18, signups: 12 },
    { day: "周三", comments: 32, signups: 15 },
    { day: "周四", comments: 27, signups: 9 },
    { day: "周五", comments: 35, signups: 18 },
    { day: "周六", comments: 42, signups: 20 },
    { day: "周日", comments: 38, signups: 16 },
  ],
}

// 仪表盘数据
export const dashboardData = {
  cards: [
    {
      title: "总浏览量",
      description: "所有时间页面浏览",
      value: "82,419",
      change: "+14.5% 相比上月",
      changeType: "positive",
    },
    {
      title: "文章总数",
      description: "已发布文章",
      value: "126",
      change: "+8 本月新增",
      changeType: "positive",
    },
    {
      title: "用户总数",
      description: "注册账户",
      value: "972",
      change: "+23 本月新增",
      changeType: "positive",
    },
    {
      title: "计划发布",
      description: "即将发布的文章",
      value: "8",
      change: "下一篇: 明天上午9点",
      changeType: "neutral",
    },
  ],
  recentPosts: [
    {
      id: 1,
      title: "现代Web开发入门",
      author: "张美丽",
      date: "2025年3月25日",
      views: 241,
    },
    {
      id: 2,
      title: "AI在内容创作中的未来",
      author: "李明",
      date: "2025年3月22日",
      views: 189,
    },
    {
      id: 3,
      title: "2025年响应式设计技术",
      author: "张美丽",
      date: "2025年3月20日",
      views: 156,
    },
    {
      id: 4,
      title: "优化您的网站性能",
      author: "李明",
      date: "2025年3月18日",
      views: 132,
    },
    {
      id: 5,
      title: "无服务器架构的兴起",
      author: "张美丽",
      date: "2025年3月15日",
      views: 105,
    },
  ],
  trafficData: [
    { name: "一月", visits: 4000 },
    { name: "二月", visits: 3000 },
    { name: "三月", visits: 5000 },
    { name: "四月", visits: 4000 },
    { name: "五月", visits: 7000 },
    { name: "六月", visits: 6000 },
    { name: "七月", visits: 8000 },
  ],
}

// 统计图表数据
export const chartData = {
  trafficOverTime: [
    { name: "第1周", views: 4000, visitors: 2400 },
    { name: "第2周", views: 3000, visitors: 1398 },
    { name: "第3周", views: 5000, visitors: 3200 },
    { name: "第4周", views: 4500, visitors: 2800 },
    { name: "第5周", views: 6000, visitors: 3700 },
    { name: "第6周", views: 7000, visitors: 4200 },
  ],
  userActivity: [
    { name: "周一", comments: 24, signups: 8 },
    { name: "周二", comments: 18, signups: 12 },
    { name: "周三", comments: 32, signups: 15 },
    { name: "周四", comments: 27, signups: 9 },
    { name: "周五", comments: 35, signups: 18 },
    { name: "周六", comments: 42, signups: 20 },
    { name: "周日", comments: 38, signups: 16 },
  ],
}

// 分类数据
export const categories = [
  { id: 1, name: "技术", slug: "technology", postCount: 24, description: "技术相关文章" },
  { id: 2, name: "设计", slug: "design", postCount: 18, description: "设计相关文章" },
  { id: 3, name: "营销", slug: "marketing", postCount: 12, description: "营销相关文章" },
  { id: 4, name: "创业", slug: "startup", postCount: 8, description: "创业相关文章" },
  { id: 5, name: "生活", slug: "lifestyle", postCount: 15, description: "生活相关文章" },
]

// 标签数据
export const tags = [
  { id: 1, name: "Next.js", slug: "nextjs", postCount: 15 },
  { id: 2, name: "React", slug: "react", postCount: 22 },
  { id: 3, name: "JavaScript", slug: "javascript", postCount: 30 },
  { id: 4, name: "CSS", slug: "css", postCount: 18 },
  { id: 5, name: "TypeScript", slug: "typescript", postCount: 12 },
  { id: 6, name: "UI/UX", slug: "ui-ux", postCount: 8 },
  { id: 7, name: "性能优化", slug: "performance", postCount: 5 },
  { id: 8, name: "响应式设计", slug: "responsive-design", postCount: 10 },
]

// 角色数据
export const roles = [
  { id: 1, name: "管理员", slug: "admin", userCount: 2, description: "拥有所有权限" },
  { id: 2, name: "编辑", slug: "editor", userCount: 5, description: "可以管理所有内容" },
  { id: 3, name: "作者", slug: "author", userCount: 12, description: "可以发布和管理自己的内容" },
  { id: 4, name: "贡献者", slug: "contributor", userCount: 8, description: "可以创建内容但不能发布" },
  { id: 5, name: "订阅者", slug: "subscriber", userCount: 945, description: "只能阅读内容和发表评论" },
]

