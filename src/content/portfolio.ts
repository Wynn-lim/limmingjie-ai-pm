import type {
  Chapter,
  CaseStudy,
  CompanyProject,
  DouyinWork,
  Metric,
  PlanPhase,
} from "../types/portfolio";

/** 静态资源路径（适配 GitHub Pages 的 base） */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const identity = {
  name: "李明杰",
  title: "李明杰｜AI产品经理 · AI应用落地 · AIGC工作流",
  headline: "把业务问题，做成真正能用的AI工作流。",
  subtitle: "从企业AI内容生产体系，到Agent、RAG与业务自动化方案。",
  valueProp:
    "我不只使用AI生成内容，更擅长理解实际业务哪里重复、哪里低效，再判断适合通过Prompt、Skill、Agent、RAG、API还是RPA解决，最终做成可以验证、复用和持续优化的工作流。",
  positionStatement:
    "我不是特别偏表达型的产品经理。我更擅长进入实际业务，把问题拆清楚，然后快速动手做出一个可验证的东西。相比只写方案，我更愿意通过原型、工作流和实际结果证明判断。",
  hint: "标准介绍约 15 分钟。",
  resume: "resume/lim-mingjie-ai-pm-resume.pdf",
};

/** 能力闭环 */
export const capabilityFlow = [
  "业务问题",
  "流程拆解",
  "AI方案",
  "MVP验证",
  "数据复盘",
  "标准化应用",
];

/** 首屏证据卡：首屏不出现「4个账号」，避免与简历「3个核心账号」口径冲突 */
export const proofCards: Metric[] = [
  {
    value: "企业AI内容矩阵",
    label: "多账号内容体系",
    scope: "任职期间由本人负责策划、制作与运营的内容账号",
    status: "real",
  },
  {
    value: "300+",
    label: "内容产出",
    scope: "任职期间累计发布的视频与图文数量（含企业与招商账号）",
    status: "real",
  },
  {
    value: "20+",
    label: "AI工具测评",
    scope: "实际使用与对比测试过的生成、剪辑、数字人、Agent 类工具",
    status: "real",
  },
  {
    value: "约200%",
    label: "产出效率提升",
    scope: "由单条内容平均周期约3天缩短至约0.5天推算，团队内部统计，非财务审计数据",
    status: "real",
  },
];

export const chapters: Chapter[] = [
  {
    id: "ch-identity",
    index: 1,
    title: "我是谁与岗位匹配",
    nav: "我是谁与岗位匹配",
    minutes: 2.5,
    conclusion:
      "我不是单纯的AI工具使用者，而是能把业务问题转化成AI工作流、并且自己动手做出验证的候选人。",
  },
  {
    id: "ch-content",
    index: 2,
    title: "企业AI内容生产体系",
    nav: "企业AI内容生产体系",
    minutes: 3.5,
    conclusion: "从割裂的个人手工制作，变成有流程、有模板、有质检的内容生产能力。",
  },
  {
    id: "ch-3c",
    index: 3,
    title: "音响视频与3C内容工作流",
    nav: "音响视频与3C内容工作流",
    minutes: 3,
    conclusion: "先证明能快速完成具体交付，再证明能把一次制作变成可规模化的生产线。",
  },
  {
    id: "ch-product",
    index: 4,
    title: "AI编导Agent与RAG产品能力",
    nav: "AI编导Agent与RAG产品能力",
    minutes: 2.5,
    conclusion:
      "能把编导经验拆成标准输入输出与质检节点，也能设计带来源和复核边界的RAG知识库。",
  },
  {
    id: "ch-company",
    index: 5,
    title: "加入公司后的四个项目",
    nav: "加入公司后的四个项目",
    minutes: 2.5,
    conclusion: "围绕耳机音响类3C业务，先做能跑通、能被业务真正用起来的四个项目。",
  },
  {
    id: "ch-plan",
    index: 6,
    title: "30/60/90天计划与总结",
    nav: "30/60/90天计划与总结",
    minutes: 1.5,
    conclusion: "先熟悉业务、选准试点，再跑通闭环，最后沉淀成可复制的系统。",
  },
];

/** 岗位匹配表 */
export const jobMatch: { need: string; experience: string }[] = [
  {
    need: "深入部门理解业务流程",
    experience:
      "长期对接内容、市场与销售需求，梳理内容与咨询流程；入职后通过部门访谈建立AI需求池",
  },
  {
    need: "电商数据采集与分析",
    experience:
      "建立内容数据表、检查表与复盘机制；可迁移到店铺、广告与ERP数据周报",
  },
  {
    need: "RPA/API系统集成",
    experience:
      "具备Agent、工作流与API方案设计理解；按系统条件选择API、RPA或半自动方案",
  },
  {
    need: "AI工具选型与支持",
    experience: "测评20多款AI工具，形成工具组合、质量标准与SOP",
  },
  {
    need: "培训、文档与知识库",
    experience: "沉淀100+场景化Prompt模板，设计过带来源与复核边界的RAG知识库",
  },
  {
    need: "跟踪AI与电商应用",
    experience: "持续测试模型、视频工具与Agent工作流，能形成评测与业务建议",
  },
];

export const jobMatchBoundary =
  "真实性边界：我目前没有长期负责过完整的跨境电商数据系统。但我具备可迁移的方法、产品设计能力，以及把MVP做出来的执行能力。";

/** AI落地五步法 */
export const methodFive = [
  { step: "01", title: "进入业务，梳理当前流程", note: "先把现在怎么做的搞清楚，不急着上工具。" },
  { step: "02", title: "找出高频、重复、耗时、易错的环节", note: "只在真正消耗人的地方动手。" },
  { step: "03", title: "选择Prompt / Skill / Agent / RAG / API / RPA", note: "能用简单方案解决的，不上复杂系统。" },
  { step: "04", title: "先完成最小可用闭环", note: "先跑通一次完整流程，再做扩展。" },
  { step: "05", title: "用效率、质量、成本、使用率验证", note: "没被真正用起来的方案不算落地。" },
];

/* ------------------------------------------------------------------ */
/* 企业 AI 内容生产体系                                                */
/* ------------------------------------------------------------------ */

export const contentSystem = {
  kicker: "真实工作 · 企业AI内容生产体系",
  background:
    "公司需要持续生产政策解读、产品科普、合规警示与直播宣传内容，覆盖企业品牌、研发费合规与全国招商三条业务线。",
  problems: [
    "选题、脚本、素材与剪辑彼此割裂，衔接靠沟通",
    "单条内容周期长，返工多，质量依赖个人经验",
    "专业内容门槛高，不同人对政策口径理解不一致",
    "发布之后的数据没有稳定反馈到下一轮选题",
  ],
  responsibility: [
    "AI工具测评与工具组合选型",
    "内容生产流程设计与SOP沉淀",
    "100+ 场景化 Prompt 模板建设",
    "选题、脚本、分镜、制作与成片交付",
    "账号运营、质检与数据复盘",
  ],
  workflow: [
    "需求输入",
    "选题",
    "政策核验",
    "脚本",
    "分镜",
    "制作",
    "审核",
    "发布",
    "复盘",
  ],
  results: [
    {
      value: "100+",
      label: "场景化Prompt模板",
      scope: "任职期间沉淀并复用的模板数量，覆盖选题、脚本、分镜与质检场景",
      status: "real",
    },
    {
      value: "300+",
      label: "累计内容产出",
      scope: "任职期间累计发布的视频与图文数量（含企业与招商账号）",
      status: "real",
    },
    {
      value: "约3天 → 约0.5天",
      label: "单条内容制作周期",
      scope:
        "统计范围为「选题确认到成片交付」的可制作环节，不含审批等待；团队内部统计",
      status: "real",
    },
    {
      value: "1~2条 → 3~4条",
      label: "单人日产出",
      scope: "同上流程范围内的单人日产对比，团队内部统计",
      status: "real",
    },
    {
      value: "约200%",
      label: "产出效率提升",
      scope: "由单条周期缩短推算，团队内部统计，非财务审计数据",
      status: "real",
    },
    {
      value: "阶段性统计约降低70%",
      label: "返修率",
      scope: "阶段性统计，无完整统计表，不作为审计数据",
      status: "real",
    },
  ] as Metric[],
  metricMethod: [
    "3天到0.5天：统计范围是「选题确认 → 成片交付」的可制作环节，不含审批等待时间。",
    "单人日产：同一流程范围内的日产出对比，1~2条提升到3~4条。",
    "效率提升约200%：由单条周期变化推算，属于团队内部统计口径，不写成经过财务审计的精确数据。",
    "返修率：阶段性统计约降低70%。没有完整统计表支撑，所以只作为阶段性观测结论。",
    "累计300+：任职期间累计发布的视频与图文，包含企业账号与招商账号。",
    "所有数字均为任职期间内部统计，截图与台账可现场调取核对。",
  ],
  review: [
    "先做工具测评再定流程，避免先买工具再找场景",
    "把「核验」放到脚本之前，专业内容的口径风险主要在这里",
    "模板化不是替代人，而是把人从重复劳动挪到判断上",
    "质检清单比质检口号有效，检查表本身就是质量结果",
  ],
  next: [
    "把内容数据接入统一看板，让选题判断依赖数据而不是感觉",
    "把人工精修里反复出现的判断，继续抽象成可以复用的规则",
  ],
};

/* ------------------------------------------------------------------ */
/* 账号矩阵                                                            */
/* ------------------------------------------------------------------ */

export const accounts = [
  {
    id: "chace",
    name: "查策网",
    position: "企业品牌、产品介绍、政策与科创服务内容",
    responsibility: "内容负责人 · 策划与制作 · 账号运营",
    image: "assets/accounts/chace.jpg",
    evidence: "抖音主页截图 · 截图时数据",
    metrics: [
      {
        value: "4,497",
        label: "账号粉丝（存量）",
        scope: "抖音主页截图时的账号粉丝存量，不等同任职期间净增粉丝",
        status: "screenshot",
      },
    ] as Metric[],
  },
  {
    id: "narwhal",
    name: "独角鲸研发费合规指南",
    position: "IPO研发费用合规、研发费管理系统与政策解读",
    responsibility: "内容负责人 · 编导与账号运营",
    image: "assets/accounts/narwhal.png",
    evidence: "抖音主页截图 · 截图时数据",
    metrics: [
      {
        value: "数字人 + AI",
        label: "口播与视觉制作方式",
        scope: "制作方式的说明，非传播数据",
        status: "real",
      },
    ] as Metric[],
  },
  {
    id: "shenzhouxing",
    name: "独角鲸·神州行（全国招商版）",
    position: "研发费管理系统全国服务与招商内容",
    responsibility: "独立负责选题策划、脚本、AI素材生成与剪辑成片",
    image: "assets/accounts/shenzhouxing.png",
    evidence: "抖音主页截图 · 截图时数据",
    metrics: [
      {
        value: "36",
        label: "作品数",
        scope: "主页截图时的作品数量",
        status: "screenshot",
      },
    ] as Metric[],
    note: "该账号以作品数与全流程职责为主，粉丝数与获赞数不作为传播成绩。",
  },
  {
    id: "audit",
    name: "独角鲸-研发费用审计",
    position: "研发费用审计、税务稽查风险与合规解读内容",
    responsibility: "内容负责人 · 选题与制作 · 账号运营",
    image: "assets/accounts/audit.jpg",
    dashboard: "assets/accounts/audit-dashboard-20260914.png",
    evidence: "视频号助手后台截图 · 2026-09-14",
    metrics: [
      {
        value: "4,455",
        label: "关注者",
        scope: "视频号助手后台，2026-09-14 截图时数据",
        status: "screenshot",
      },
      {
        value: "190",
        label: "累计视频",
        scope: "视频号助手后台，2026-09-14 截图时数据",
        status: "screenshot",
      },
      {
        value: "22.6万",
        label: "昨日新增播放",
        scope: "后台「昨日数据」，统计范围为单日新增播放，与单条视频播放不可相加",
        status: "screenshot",
      },
      {
        value: "26.2万",
        label: "单条最高播放",
        scope: "后台最近视频列表，2026-08-24 发布视频，2026-09-14 截图时数据",
        status: "screenshot",
      },
    ] as Metric[],
    note: "只展示后台截图，不提供外部链接。",
  },
];

export const accountTimingNote =
  "口径说明：简历中的「3个账号」为当时统计口径。「独角鲸·神州行（全国招商版）」不属于简历统计期内的既有成果，因此单独列出，不计入账号总数。";

/* ------------------------------------------------------------------ */
/* 抖音代表作品（三条均为单条作品分享链接，不是账号主页）               */
/* ------------------------------------------------------------------ */

export const douyinWorks: DouyinWork[] = [
  {
    id: "work-chace",
    account: "查策网",
    ctaLabel: "查看代表作品",
    workTitle: "查策AI科创平台正式上线",
    summary:
      "用产品上线的信息作为入口，把企业品牌、产品能力与政策服务串成一条内容。",
    url: "https://v.douyin.com/6r87UrzkyTM/",
    qr: "assets/qr/work-chace.svg",
    cover: "assets/accounts/chace.jpg",
    position: "企业品牌与产品内容",
    responsibility: "策划 · 脚本 · 制作 · 发布",
  },
  {
    id: "work-narwhal",
    account: "独角鲸研发费合规指南",
    ctaLabel: "查看代表作品",
    workTitle: "IPO研发费用合规全攻略",
    summary:
      "把 IPO 研发费用合规的规则拆成业务人能理解的问题，用口播加视觉的方式讲清楚。",
    url: "https://v.douyin.com/W8sCBsXM0c0/",
    qr: "assets/qr/work-narwhal.svg",
    cover: "assets/accounts/narwhal.png",
    position: "IPO研发费用合规与政策解读",
    responsibility: "选题 · 脚本 · 制作 · 发布",
  },
  {
    id: "work-shenzhouxing",
    account: "独角鲸·神州行（全国招商版）",
    ctaLabel: "查看代表作品",
    workTitle: "高企、IPO、税务稽查三张网接到同一个数据库",
    summary:
      "把高企认定、IPO 审核与税务稽查三条线接到同一个数据来源上，讲清楚研发费数据的价值。",
    url: "https://v.douyin.com/tvaTDnOoD5E/",
    qr: "assets/qr/work-shenzhouxing.svg",
    cover: "assets/accounts/shenzhouxing.png",
    position: "研发费管理系统全国服务与招商",
    responsibility: "独立完成选题策划 · 脚本 · AI素材生成 · 剪辑成片",
  },
];

export const douyinNotice = "如网页无法播放，可使用抖音扫码观看。";
export const douyinCoverNote = "封面为账号内容截图（截图时数据）。";

/* ------------------------------------------------------------------ */
/* 音响视频（本次面试提交）                                            */
/* ------------------------------------------------------------------ */

export const speakerVideos = [
  {
    id: "speaker-01",
    src: "assets/video/speaker-01.mp4",
    poster: "assets/video/speaker-01-poster.jpg",
    title: "音响产品视频 · 版本一",
    spec: "720×1280 竖屏 · 15.07 秒",
    caption: "垂直场景切入：把「体积小」这个参数直接翻译成用户能看懂的画面。",
  },
  {
    id: "speaker-02",
    src: "assets/video/speaker-02.mp4",
    poster: "assets/video/speaker-02-poster.jpg",
    title: "音响产品视频 · 版本二",
    spec: "720×1280 竖屏 · 10.01 秒",
    caption: "产品特写切入：用产品本体的质感与识别度承担前 3 秒的信息量。",
  },
];

export const speakerTask = {
  input: "拿到音响产品资料与参数，按短视频要求完成一条产品内容。",
  responsibility: "参数理解 · 卖点取舍 · 内容结构 · 成片交付",
  tools: "生成式AI工具 + 剪辑工具，人工完成判断与终审",
  steps: [
    "先读产品资料，把参数和卖点分开",
    "判断哪个参数最容易被一眼看懂，作为前 3 秒的钩子",
    "按「钩子 → 产品 → 场景 → 行动」组织结构",
    "生成素材、剪辑、检查字幕与产品事实",
    "输出可直接发布的竖屏成片",
  ],
  delivery: "两条竖屏成片，均可在本页直接播放。",
  boundary:
    "这条视频是一个比较简单的应用场景。它能证明我可以快速理解产品并完成内容交付，但不代表我已经建成了完整的内容系统。",
  transition:
    "这条视频本身是一个比较简单的应用场景。它能证明我可以快速理解产品并完成内容交付，但我认为真正有业务价值的部分，是能不能进一步把一次制作变成长期、规模化的生产能力。",
};

/* ------------------------------------------------------------------ */
/* 3C 内容生产工作流（全站最高权重）                                   */
/* ------------------------------------------------------------------ */

export const c3Workflow = [
  { step: "01", name: "产品资料输入", note: "产品手册、参数表、平台页面、客服问答" },
  { step: "02", name: "参数结构化与校验", note: "统一字段，标出缺失与冲突项" },
  { step: "03", name: "卖点和场景匹配", note: "参数 → 用户价值 → 使用场景" },
  { step: "04", name: "竞品与爆款结构分析", note: "看结构，不抄内容" },
  { step: "05", name: "多版本脚本", note: "同一SKU产出不同钩子与不同平台版本" },
  { step: "06", name: "分镜与素材方案", note: "镜头、运镜、字幕、音效、BGM" },
  { step: "07", name: "AI生成与剪辑", note: "批量生成素材并完成成片" },
  { step: "08", name: "人工质检", note: "产品事实终审与品牌把关" },
  { step: "09", name: "多平台输出", note: "按平台规格适配画面与文案" },
  { step: "10", name: "数据反馈", note: "回到下一轮内容生产" },
];

export const paramMap = [
  { param: "主动降噪", value: "减少环境干扰", scene: "地铁、飞机、办公室" },
  { param: "IP防水", value: "户外使用更安心", scene: "露营、泳池、雨天" },
  { param: "低延迟模式", value: "提高声画同步", scene: "游戏、追剧" },
  { param: "长续航", value: "减少充电频率", scene: "出差、旅行、通勤" },
  { param: "双设备连接", value: "工作设备切换方便", scene: "手机与电脑办公" },
  { param: "重低音", value: "增强氛围感", scene: "聚会、健身、户外" },
];

export const mvpSkills = [
  {
    id: "skill-1",
    name: "产品资料整理",
    input: "产品手册 / 参数表 / 平台页面 / 客服问答",
    output: "结构化产品知识卡（参数、卖点、FAQ、禁用表达）",
    why: "先有一份可信的资料底座，后面所有内容才有依据。",
  },
  {
    id: "skill-2",
    name: "多版本脚本生成",
    input: "产品知识卡 + 平台 + 目标人群",
    output: "不同钩子、不同结构的多版本脚本",
    why: "同一SKU需要多条内容，靠人工重写成本太高。",
  },
  {
    id: "skill-3",
    name: "产品事实质检",
    input: "成片字幕 / 脚本 + 产品知识卡",
    output: "参数、型号、品牌、绝对化表达与平台风险清单",
    why: "参数写错是3C内容里最贵的错误，必须机器先查一遍。",
  },
];

export const laterAgents = [
  "用户洞察Agent",
  "竞品分析Agent",
  "分镜Agent",
  "本地化Agent",
  "数据复盘Agent",
];

export const laterAgentsNote =
  "MVP 阶段只做上面三个 Skill。业务量增加、场景变复杂之后，再拆成独立 Agent，避免一开始就过度设计。";

export const qualityBoundary = {
  ai: [
    "参数与型号一致性",
    "品牌名称与写法",
    "字幕与口播是否一致",
    "绝对化、夸大或违规表达",
    "平台规范与敏感词",
  ],
  human: [
    "产品事实终审",
    "创意与表达方式选择",
    "品牌调性把关",
    "版权与素材合规",
    "是否发布、何时发布",
  ],
};

export const dataLoop = [
  { metric: "3秒留存", judge: "是否要换钩子" },
  { metric: "完播率", judge: "是否要压缩结构" },
  { metric: "点击率", judge: "是否要换卖点" },
  { metric: "加购率", judge: "是否要换场景" },
  { metric: "转化率", judge: "是否要调购买链路" },
  { metric: "单条成本", judge: "是否值得继续规模化" },
];

/* ------------------------------------------------------------------ */
/* 案例：AI 编导 Agent / RAG 合规专家 / Product OS                      */
/* ------------------------------------------------------------------ */

export const aiDirector: CaseStudy = {
  id: "ai-director",
  title: "AI 编导工作台",
  kicker: "MULTI-AGENT · 内容工作流",
  statusLabel: "产品Demo｜部分方法已用于实际内容生产",
  statusNote:
    "Prompt 与内容方法部分已经用于实际工作，但整个页面 Demo 不是公司正式上线的系统。本次展示以界面截图为准。",
  cover: "assets/cases/ai-director/01-input.jpg",
  role: "独立产品设计 · 编导工作流设计 · 提示词与质检节点",
  summary:
    "把编导的经验拆成标准输入、标准输出、Agent 协作与人工质检节点，让选题、脚本、分镜和质检不再是三件分开的事。",
  abilities: ["场景拆解", "流程设计", "提示词设计", "质检节点设计"],
  fullImage: "assets/cases/ai-director/full.png",
  beats: [
    {
      id: "d1",
      title: "需求输入",
      image: "assets/cases/ai-director/01-input.jpg",
      what: "工作台首页，一个对话式入口加一个结构化表单（内容方向、目标平台、账号现状、参考风格）。",
      problem: "编导接到的需求经常只有一句话，信息不全，做出来的东西和预期差很远。",
      did: "把口头需求拆成必填字段，让输入先标准化。",
      why: "输入不标准，后面所有环节都会返工。先把需求固定下来，生产才稳定。",
      say: "这一屏是需求输入。以前需求就是一句话，现在我先把它变成结构化字段，输入标准了，后面才不会反复返工。",
    },
    {
      id: "d2",
      title: "Agent 工作过程",
      image: "assets/cases/ai-director/02-agent-run.jpg",
      what: "运行过程面板：总耗时、Token 消耗、真实数据与不可用数据的条数，以及每个 Agent 节点的调用明细。",
      problem: "AI 生成的中间过程不透明，很难判断哪一步出了问题。",
      did: "把每个节点的输入、输出、模型、耗时、以及数据来源是否真实全部记录下来。",
      why: "编导要能追责到环节。过程可见，才能定位问题，也才能判断该改提示词还是改流程。",
      say: "这是 Agent 的运行过程。我特意把每一步的输入输出、用了什么模型、数据来源是真实还是不可用都标出来。这样出问题能定位到具体环节。",
    },
    {
      id: "d3",
      title: "脚本结果",
      image: "assets/cases/ai-director/03-script.jpg",
      what: "爆款脚本面板：主题、标题候选、结构、完整台词、以及预测完播率与互动率。",
      problem: "脚本质量不稳定，全靠个人状态。",
      did: "把脚本固定成「钩子 → 三个细节 → 分段 → 完整台词」的可检查结构。",
      why: "结构固定以后，质量就可以被检查，而不是被感觉。",
      say: "这是脚本结果。我把脚本结构固定下来：前 3 秒钩子、三个细节、分段、完整台词。结构固定，质量才可检查。",
    },
    {
      id: "d4",
      title: "分镜表",
      image: "assets/cases/ai-director/04-storyboard.jpg",
      what: "分镜表：镜头号、时长、景别、运镜、画面、台词、音效、BGM、剪辑，外加节奏原则和拍摄提示。",
      problem: "脚本到拍摄之间靠口述，容易走形。",
      did: "把分镜做成可以直接交给制作的表格，并标出风险与替代方案。",
      why: "下游能直接照着做，才说明这一环真的闭环了。",
      say: "这一屏是分镜表。运镜、景别、音效、BGM 全部落到表格上，下游可以直接照做。下面还有风险与替代方案。",
    },
    {
      id: "d5",
      title: "质检与评测",
      image: "assets/cases/ai-director/05-review.jpg",
      what: "规则评测报告、各 Agent 的评分与待改进项、以及人工质检打分表。",
      problem: "没有质检标准时，返工只能靠事后发现。",
      did: "设计了两层：机器按规则打分，人按维度打分，两边都有记录。",
      why: "AI 负责一致性，人负责判断，边界要写清楚。",
      say: "这是质检。机器先按规则打分并给出待改进项，再由人工按维度打分。哪些交给机器、哪些必须人来定，我在这里明确分开。",
    },
    {
      id: "d6",
      title: "校准闭环与历史案例",
      image: "assets/cases/ai-director/06-history.jpg",
      what: "离线校准记录、批量验证入口、模型配置，以及历史案例列表（含规则评分）。",
      problem: "改完提示词到底变好了还是变差了，说不清楚。",
      did: "用真实发布结果回填预测偏差，记录每一次版本调整的原因。",
      why: "只有预测偏差被持续记录，这套系统才会越用越准。",
      say: "最后是校准闭环和历史案例。我用真实发布结果回填预测偏差，记录每一次调整的原因。这样这套东西会越用越准，而不是每次都从零开始。",
    },
  ],
  deepDive: [
    {
      title: "原流程问题",
      body: [
        "选题、脚本与分镜彼此脱节，衔接靠反复沟通。",
        "修改意见分散在聊天记录里，无法沉淀。",
        "没有质检标准，返工只能在成片之后发现。",
      ],
    },
    {
      title: "Agent / Skill 职责",
      body: [
        "趋势雷达：读取赛道热度、头部账号与生命周期，输出结构化判断与置信度。",
        "爆款脚本：按平台与人群产出多版本脚本，附分段结构与完整台词。",
        "分镜生成：把脚本转成可执行的镜头表。",
        "规则评测 + 人工质检 + 离线校准：把人的判断留在关键环节。",
      ],
    },
    {
      title: "我负责的部分",
      body: [
        "真实编导场景拆解与流程设计",
        "每个节点的提示词与结构化输出定义",
        "质检维度、评分方式与人工确认点设计",
        "原型实现的需求表达与验收标准",
      ],
    },
  ],
};

export const ragExpert: CaseStudy = {
  id: "rag-expert",
  title: "研发费合规专家",
  kicker: "RAG · 领域知识库产品设计",
  statusLabel: "产品方案｜RAG页面Demo",
  statusNote:
    "这是产品方案与页面 Demo。规划的知识库规模、准确率与效率提升都属于设计目标，不作为已经上线的结果。本次展示以界面截图为准。",
  cover: "assets/cases/rag/qa-home.jpg",
  role: "独立产品设计 · 业务场景定义 · 知识分层与检索方案 · PRD 与原型",
  summary:
    "围绕研发费用加计扣除的合规咨询，设计一套带来源、带边界、可复核的领域知识问答方案。",
  abilities: ["业务场景定义", "知识库分层设计", "检索与评估方案", "PRD与原型"],
  fullImage: "assets/cases/rag/full.png",
  beats: [
    {
      id: "r1",
      title: "问答首页",
      image: "assets/cases/rag/qa-home.jpg",
      what: "产品首页：左侧功能导航（智能问答、费用归集判断、政策查询、知识库浏览），中间是问答入口与推荐问题，左下角显示知识库加载状态。",
      problem: "政策资料多、查询耗时，不同人对同一政策口径理解不一致。",
      did: "把四个核心场景做成一屏可达的入口，并让知识库状态可见。",
      why: "专业工具首先要让人知道「它能回答哪一类问题」，入口即范围说明。",
      say: "这是问答首页。左边是四个核心场景，中间是问答入口和推荐问题。左下角把知识库加载状态显示出来，让人知道回答是基于已入库的政策文档。",
    },
    {
      id: "r2",
      title: "问题输入",
      image: "assets/cases/rag/05-question.jpg",
      what: "推荐问题与输入框：四个典型问题直接给出，也支持自由输入。",
      problem: "用户不知道该怎么问，导致检索效果差。",
      did: "用推荐问题示范提问方式，把专业问题写成口语化的问句。",
      why: "提问质量决定检索质量。先教会提问，再谈准确率。",
      say: "这一屏是问题输入。我把四个典型问题直接摆出来，因为很多人不知道该怎么问。提问方式规范了，检索效果才会稳定。",
    },
    {
      id: "r3",
      title: "交互原型：四大功能模块",
      image: "assets/cases/rag/03-prototype.jpg",
      what: "智能问答、费用归集判断、政策对比解读、合规报告生成四个模块的原型。",
      problem: "单纯问答无法覆盖归集判断和报告这类结构化任务。",
      did: "把咨询场景拆成四个交付形态，分别定义输入、输出与人工确认点。",
      why: "不是所有需求都该用问答解决。归集判断需要字段化输入，报告需要结构化输出。",
      say: "这一屏是四个功能模块的原型。我把咨询拆成问答、归集判断、政策对比和报告生成。不是什么都用聊天解决，归集判断要字段化输入，报告要结构化输出。",
    },
    {
      id: "r4",
      title: "五层系统架构",
      image: "assets/cases/rag/02-architecture.jpg",
      what: "文档摄入层 → 知识库层 → 检索层 → 生成层 → 应用层的分层架构。",
      problem: "通用模型直接回答，容易忽略适用条件，也给不出依据。",
      did: "按层拆开职责：知识库负责结构化，检索负责召回与重排，生成层负责引用格式化与幻觉校验。",
      why: "分层以后，每一层都可以单独评估和替换，出问题能定位到层。",
      say: "这是五层架构。从文档摄入、知识库、检索、生成到应用，每层职责分开。这样哪一层出问题能定位，也能单独替换升级。",
    },
    {
      id: "r5",
      title: "RAG 系统设计",
      image: "assets/cases/rag/04-rag-design.jpg",
      what: "文档处理流程、核心技术选型表（嵌入模型、向量库、关键词索引、重排序模型、生成模型、分块策略）与检索策略。",
      problem: "专业政策需要精确匹配和语义理解同时成立。",
      did: "采用混合检索加重排序，并把每一项技术选型的理由写进 PRD。",
      why: "技术选型必须能说出为什么，否则评审时无法判断风险和替代方案。",
      say: "这一屏是 RAG 的系统设计。我用混合检索加 Cross-encoder 重排，每一项技术选型都在 PRD 里写了理由。因为选型说不清理由，就没法评估风险。",
    },
    {
      id: "r6",
      title: "PRD 关键内容",
      image: "assets/cases/rag/01-prd-bg.jpg",
      what: "PRD 封面与项目背景：政策背景、企业四个核心痛点，以及现有方案的不足。",
      problem: "需求如果从功能开始写，最后一定会变成功能堆砌。",
      did: "从政策背景和业务痛点倒推需求，先定义问题再定义功能。",
      why: "背景写得越清楚，后面砍需求的时候越有依据。",
      say: "最后是 PRD 的关键内容。我从政策背景和四个业务痛点倒推需求，先定义问题再定义功能。背景写清楚了，后面砍需求才有依据。",
    },
  ],
  deepDive: [
    {
      title: "业务问题",
      body: [
        "政策文件数量多、更新频繁，人工查询耗时。",
        "费用归集边界模糊，最容易被质疑，也最容易出现口径不一致。",
        "辅助账不规范，直接影响后续申报与稽查。",
        "通用模型回答缺少政策依据，无法用于专业场景。",
      ],
    },
    {
      title: "我负责的部分",
      body: [
        "业务场景与用户角色定义",
        "四个功能模块的产品功能与交互",
        "知识分层、检索流程与评估指标设计",
        "PRD 撰写与可交互原型",
      ],
    },
    {
      title: "设计目标（不是已上线结果）",
      body: [
        "规划的知识库规模与检索准确率属于设计目标。",
        "界面中的数值为示例数据，不代表已连接对应的知识库。",
        "方案中的效率提升属于预计目标，未作为已验证的运营成果。",
      ],
    },
  ],
};

export const productOs: CaseStudy = {
  id: "product-os",
  title: "AI Product Leader OS",
  kicker: "APPENDIX · 更多产品探索",
  statusLabel: "产品方案｜多智能体协作系统设计",
  statusNote:
    "这是产品界面与系统设计展示。界面中的数值为示例数据，不代表实测效率。",
  cover: "assets/cases/product-os/overview.jpg",
  role: "独立产品设计 · 多智能体系统架构",
  summary:
    "围绕产品经理的判断与交付，设计多角色 Agent 协作的产品操作系统，探索多视角协作与工作流编排。",
  abilities: ["多角色协作设计", "工作流编排", "知识库与决策中心"],
  fullImage: "assets/cases/product-os/overview.jpg",
  beats: [
    {
      id: "p1",
      title: "系统总览",
      image: "assets/cases/product-os/overview.jpg",
      what: "产品总览界面：AI 团队、工作流、知识库与决策中心。",
      problem: "从想法到决策要串联需求、用户、市场、技术和增长视角，信息和任务容易散掉。",
      did: "设计 PM Strategist、UX Researcher、Market Analyst、Tech Architect、Growth Hacker 五种角色。",
      why: "把「多视角」变成具体角色，协作才有明确的责任边界。",
      say: "这是附加区的项目。它把产品工作拆成五个专业角色，再用 Product Council 把多视角分析接起来。这一页不占主线时间，只在被追问其他 Agent 产品时打开。",
    },
  ],
  deepDive: [
    {
      title: "说明",
      body: [
        "界面中的百分比、小时数等数值为界面示例数据。",
        "该界面为设计展示，不对应可运行的服务。",
        "此页仅用于证明多角色协作、任务流与知识系统的设计能力。",
      ],
    },
  ],
};

export const caseStudies = [aiDirector, ragExpert];
export const appendixCase = productOs;

/* ------------------------------------------------------------------ */
/* 加入公司后的四个项目                                                */
/* ------------------------------------------------------------------ */

export const companyProjects: CompanyProject[] = [
  {
    id: "proj-a",
    title: "3C产品内容自动化生产线",
    problem:
      "同一款耳机或音响要在多个平台产出多个版本的内容，资料分散、参数容易写错、制作周期长。",
    solution:
      "统一产品资料，用三个核心 Skill 生成多场景、多平台、多语言的脚本与视频，并保留人工终审。",
    steps: [
      "选 3~5 个核心 SKU 试点",
      "统一产品资料与参数口径",
      "跑通一条完整内容工作流",
      "按平台规格批量输出",
      "记录工时与返修数据并迭代",
    ],
    needs: "产品资料、平台内容规范、成片数据回传权限",
    humanGate: "产品事实终审、创意选择、品牌调性与发布决策由人负责",
    metrics: ["制作时间", "返修率", "素材数量", "点击率", "转化率"],
  },
  {
    id: "proj-b",
    title: "店铺数据自动周报与经营看板",
    problem:
      "店铺、广告与库存数据分散在不同后台，靠人工导表汇总，口径不一致且滞后。",
    solution:
      "确认数据源，优先走 API；没有 API 时评估 RPA 或定时导出；统一口径后输出周报与异常建议。",
    steps: [
      "盘点店铺、广告、ERP 数据源",
      "评估 API / RPA / 定时导出三种方案",
      "统一 SKU、订单、渠道、日期口径",
      "生成销售、广告、退款、库存周报",
      "输出异常提示与建议并复核",
    ],
    needs: "各后台的数据导出权限或接口权限，以及统一的口径定义",
    humanGate: "异常结论与业务建议需运营确认后再采用",
    metrics: ["汇总耗时", "口径一致率", "异常发现时效", "周报使用率"],
  },
  {
    id: "proj-c",
    title: "评论、售后与用户反馈分析Agent",
    problem:
      "评论、客服记录和退款原因分散，产品问题与表达问题混在一起，很难分头改进。",
    solution:
      "汇总多来源反馈，按型号和问题分类，区分产品问题、表达问题、物流问题与用户误解，分别反馈对应部门。",
    steps: [
      "汇总评论、客服与退款原因",
      "按型号与问题类型分类",
      "区分四类问题并给出证据",
      "按部门输出改进清单",
      "跟踪改进后的反馈变化",
    ],
    needs: "评论与客服数据导出，型号与问题类型的分类标准",
    humanGate: "分类结果与改进建议由产品、内容、运营、客服分别确认",
    metrics: ["处理条数", "分类准确率", "问题闭环率", "同类问题复现率"],
  },
  {
    id: "proj-d",
    title: "产品知识库与GEO内容资产",
    problem:
      "产品参数、卖点、FAQ 分散在各处，对外表述不统一，也不容易被搜索与理解。",
    solution:
      "为每个 SKU 建立带来源和更新时间的知识卡，统一参数、卖点、FAQ 与禁用表达，并围绕真实用户问题生产结构化内容。",
    steps: [
      "建立 SKU 维度知识卡模板",
      "补齐来源与更新时间字段",
      "整理真实用户问题清单",
      "生产可信、结构化的对外内容",
      "建立持续监测机制",
    ],
    needs: "产品资料、客服问答记录、内容发布渠道",
    humanGate: "知识卡内容与对外表述需产品与品牌确认",
    metrics: ["知识卡覆盖率", "信息一致率", "内容引用情况", "监测频次"],
  },
];

export const geoBoundary =
  "GEO 目标：提高品牌信息被搜索、理解和引用的概率，并建立持续监测机制。不承诺必然被大模型推荐。";

/* ------------------------------------------------------------------ */
/* 30/60/90 天计划与结尾                                               */
/* ------------------------------------------------------------------ */

export const planPhases: PlanPhase[] = [
  {
    id: "p30",
    window: "0 – 30 天",
    title: "先熟悉业务，选准试点",
    items: [
      "熟悉 SKU、店铺平台、ERP 与部门流程",
      "盘点现有 AI 工具与使用情况",
      "建立 AI 需求池，按频率与痛点排序",
      "选择试点 SKU，确认数据与审核条件",
    ],
  },
  {
    id: "p60",
    window: "31 – 60 天",
    title: "跑通一个闭环",
    items: [
      "跑通一个 SKU 的内容工作流",
      "完成一个渠道的自动周报 MVP",
      "记录效率、准确率与业务反馈",
      "根据使用情况调整方案，形成可复用模板",
    ],
  },
  {
    id: "p90",
    window: "61 – 90 天",
    title: "扩大并沉淀",
    items: [
      "扩展到更多 SKU 与渠道",
      "接入评论分析与产品知识库",
      "沉淀 SOP、检查表与培训材料",
      "输出下一季度 AI 应用路线图",
    ],
  },
];

export const closing = {
  title: "我希望交付的，不只是一个AI功能，而是一套持续创造价值的工作方式。",
  keywords: ["理解业务", "快速验证", "沉淀系统"],
  script:
    "我的优势不是多年大型电商系统的经验，而是能够从一个具体问题开始，把需求拆清楚，快速动手做出可以验证的方案，再通过数据和真实使用反馈迭代。如果加入公司，我会先选择一款重点耳机或音响产品，跑通一个真正有人使用的AI工作流，然后再逐步复制到更多SKU和部门。",
};
