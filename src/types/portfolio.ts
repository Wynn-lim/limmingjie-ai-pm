/** 证据等级：所有对外表述必须落在其中一个等级上 */
export type EvidenceStatus =
  | "real" // 真实工作与真实结果
  | "screenshot" // 截图时数据（有截图日期）
  | "demo" // 产品 Demo / 可交互原型
  | "concept" // 产品方案 / 设计目标
  | "forecast"; // 入职后的规划与预计

/** 指标：每个数字都必须带口径 */
export interface Metric {
  value: string;
  label: string;
  /** 来源或计算口径，禁止为空 */
  scope: string;
  status: EvidenceStatus;
}

export interface Chapter {
  id: string;
  index: number;
  title: string;
  /** 顶部导航文案（仅 6 个主章节） */
  nav: string;
  /** 建议时长，分钟 */
  minutes: number;
  conclusion: string;
}

/** 面试演示模式下的一屏 */
export interface Screen {
  id: string;
  chapterId: string;
  /** 提词，100–180 字自然口语 */
  script: string;
  /** 8 分钟精简模式是否保留 */
  inQuick: boolean;
}

export interface DouyinWork {
  id: string;
  /** 账号名，前三条为单条作品分享链接，不得标注为账号主页 */
  account: string;
  /** 按钮文案统一为「查看代表作品」 */
  ctaLabel: string;
  workTitle: string;
  summary: string;
  url: string | null;
  qr: string | null;
  cover: string;
  position: string;
  responsibility: string;
}

export interface CaseBeat {
  id: string;
  title: string;
  image: string;
  /** 这一屏是什么 */
  what: string;
  /** 解决什么问题 */
  problem: string;
  /** 我做了什么 */
  did: string;
  /** 为什么这样设计 */
  why: string;
  /** 这一页怎么讲 */
  say: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  kicker: string;
  statusLabel: string;
  statusNote: string;
  cover: string;
  role: string;
  summary: string;
  abilities: string[];
  beats: CaseBeat[];
  fullImage?: string;
  deepDive?: { title: string; body: string[] }[];
}

export interface CompanyProject {
  id: string;
  title: string;
  problem: string;
  solution: string;
  steps: string[];
  needs: string;
  humanGate: string;
  metrics: string[];
}

export interface FaqEntry {
  id: string;
  question: string;
  /** 15 秒直接回答 */
  short: string;
  /** 45 秒完整回答 */
  full: string;
}

export interface PlanPhase {
  id: string;
  window: string;
  title: string;
  items: string[];
}
