import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  accounts,
  aiDirector,
  appendixCase,
  asset,
  caseStudies,
  chapters,
  companyProjects,
  contentSystem,
  c3Workflow,
  douyinWorks,
  mvpSkills,
  planPhases,
  proofCards,
  ragExpert,
  speakerVideos,
} from "./portfolio";
import { bannedPhrases, quickScreenIds, screens } from "./scripts";
import { faq } from "./faq";

const PUBLIC_DIR = resolve(process.cwd(), "public");
const EXPECTED_URLS = [
  "https://v.douyin.com/6r87UrzkyTM/",
  "https://v.douyin.com/W8sCBsXM0c0/",
  "https://v.douyin.com/tvaTDnOoD5E/",
];

describe("章节结构", () => {
  it("顶部只有 6 个主章节", () => {
    expect(chapters).toHaveLength(6);
    expect(chapters.map((c) => c.index)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("章节 id 唯一", () => {
    expect(new Set(chapters.map((c) => c.id)).size).toBe(chapters.length);
  });

  it("每一章至少有一屏", () => {
    for (const c of chapters) {
      expect(screens.some((s) => s.chapterId === c.id)).toBe(true);
    }
  });

  it("屏 id 唯一", () => {
    expect(new Set(screens.map((s) => s.id)).size).toBe(screens.length);
  });
});

describe("提词", () => {
  it("每屏提词为 100–180 字自然口语", () => {
    for (const s of screens) {
      const len = s.script.replace(/\s/g, "").length;
      expect(len, `${s.id} 提词长度 ${len}`).toBeGreaterThanOrEqual(100);
      expect(len, `${s.id} 提词长度 ${len}`).toBeLessThanOrEqual(180);
    }
  });

  it("提词不出现禁用空话", () => {
    for (const s of screens) {
      for (const bad of bannedPhrases) {
        expect(s.script.includes(bad), `${s.id} 出现禁用词「${bad}」`).toBe(false);
      }
    }
  });

  it("精简模式保留身份、真实实绩、3C方案、入职计划和结论", () => {
    expect(quickScreenIds).toContain("s-hero");
    expect(quickScreenIds).toContain("s-content");
    expect(quickScreenIds).toContain("s-c3");
    expect(quickScreenIds).toContain("s-projects");
    expect(quickScreenIds).toContain("s-closing");
    expect(quickScreenIds.length).toBeLessThan(screens.length);
  });
});

describe("数字与证据", () => {
  const allMetrics = [
    ...proofCards,
    ...contentSystem.results,
    ...accounts.flatMap((a) => a.metrics),
  ];

  it("每个指标都有来源或口径", () => {
    for (const m of allMetrics) {
      expect(m.scope.trim().length, `${m.label} 缺少口径`).toBeGreaterThan(6);
      expect(m.status).toBeTruthy();
    }
  });

  it("首屏不写账号总数，避免与简历口径冲突", () => {
    const heroText = proofCards.map((m) => `${m.value}${m.label}`).join("|");
    expect(heroText.includes("4个账号")).toBe(false);
    expect(heroText.includes("企业AI内容矩阵")).toBe(true);
  });

  it("图片类资源文件真实存在", () => {
    const paths = [
      ...accounts.map((a) => a.image),
      ...accounts.flatMap((a) => ("dashboard" in a && a.dashboard ? [a.dashboard] : [])),
      ...douyinWorks.map((w) => w.cover),
      ...douyinWorks.map((w) => w.qr).filter((x): x is string => Boolean(x)),
      ...speakerVideos.map((v) => v.src),
      ...speakerVideos.map((v) => v.poster),
      aiDirector.cover,
      aiDirector.fullImage!,
      ...aiDirector.beats.map((b) => b.image),
      ragExpert.cover,
      ragExpert.fullImage!,
      ...ragExpert.beats.map((b) => b.image),
      appendixCase.cover,
    ];
    for (const p of paths) {
      expect(existsSync(resolve(PUBLIC_DIR, p)), `缺少资源 ${p}`).toBe(true);
    }
  });

  it("asset() 拼接 base 后路径可定位", () => {
    expect(asset("assets/accounts/chace.jpg")).toContain("assets/accounts/chace.jpg");
  });
});

describe("抖音代表作品", () => {
  it("恰好三条外部链接，且 URL 与需求文件完全一致", () => {
    const urls = douyinWorks.map((w) => w.url).filter(Boolean);
    expect(urls).toEqual(EXPECTED_URLS);
  });

  it("按钮文案统一为「查看代表作品」，不得写成账号主页", () => {
    for (const w of douyinWorks) {
      expect(w.ctaLabel).toBe("查看代表作品");
    }
  });

  it("每条作品都有二维码与站内封面", () => {
    for (const w of douyinWorks) {
      expect(w.qr, `${w.id} 缺少二维码`).toBeTruthy();
      expect(w.cover, `${w.id} 缺少站内封面`).toBeTruthy();
      expect(w.summary.length).toBeGreaterThan(10);
    }
  });

  it("研发费用审计账号只展示截图，不挂外链", () => {
    const audit = accounts.find((a) => a.id === "audit")!;
    expect(audit).toBeTruthy();
    expect("url" in audit).toBe(false);
    expect(audit.metrics.length).toBeGreaterThan(0);
  });

  it("神州行只做作品数与职责展示，不把粉丝获赞做成数据卡", () => {
    const szx = accounts.find((a) => a.id === "shenzhouxing")!;
    const text = szx.metrics.map((m) => `${m.value}${m.label}`).join("|");
    expect(text.includes("31")).toBe(false);
    expect(text.includes("237")).toBe(false);
    expect(text.includes("36")).toBe(true);
  });
});

describe("案例状态标注", () => {
  it("AI 编导标记为产品Demo并说明边界", () => {
    expect(aiDirector.statusLabel).toContain("产品Demo");
    expect(aiDirector.statusNote).toContain("不是公司正式上线");
  });

  it("RAG 标记为产品方案与页面Demo，设计目标不作为上线结果", () => {
    expect(ragExpert.statusLabel).toContain("产品方案");
    expect(ragExpert.statusNote).toContain("设计目标");
  });

  it("两个截图型案例各有 6 个讲解节点，且节点信息完整", () => {
    for (const study of caseStudies) {
      expect(study.beats).toHaveLength(6);
      for (const b of study.beats) {
        for (const key of ["what", "problem", "did", "why", "say"] as const) {
          expect(b[key].length, `${study.id}/${b.id} 缺少 ${key}`).toBeGreaterThan(6);
        }
      }
    }
  });

  it("Product OS 只在附加区，不进入标准主线", () => {
    expect(appendixCase.id).toBe("product-os");
    expect(appendixCase.kicker).toContain("APPENDIX");
    expect(screens.some((s) => s.script.includes("Product Leader OS"))).toBe(false);
  });
});

describe("3C 工作流与入职项目", () => {
  it("主工作流为 10 步，MVP 只做 3 个 Skill", () => {
    expect(c3Workflow).toHaveLength(10);
    expect(mvpSkills).toHaveLength(3);
  });

  it("四个入职项目都有问题、方案、步骤、系统、人工审核点和指标", () => {
    expect(companyProjects).toHaveLength(4);
    for (const p of companyProjects) {
      expect(p.problem.length).toBeGreaterThan(10);
      expect(p.solution.length).toBeGreaterThan(10);
      expect(p.steps.length).toBeGreaterThan(2);
      expect(p.needs.length).toBeGreaterThan(4);
      expect(p.humanGate.length).toBeGreaterThan(4);
      expect(p.metrics.length).toBeGreaterThan(2);
    }
  });

  it("30/60/90 三个阶段齐全", () => {
    expect(planPhases.map((p) => p.window)).toEqual(["0 – 30 天", "31 – 60 天", "61 – 90 天"]);
  });
});

describe("预设追问", () => {
  it("覆盖需求要求的 13 个问题，且每题只有一个直接回答", () => {
    expect(faq.length).toBeGreaterThanOrEqual(13);
    for (const f of faq) {
      expect(f.answer.replace(/\s/g, "").length).toBeGreaterThan(80);
      expect("short" in f).toBe(false);
      expect("full" in f).toBe(false);
    }
  });

  it("包含指定关键问题", () => {
    const joined = faq.map((f) => f.question).join("|");
    for (const k of [
      "Agent",
      "Skill、Agent、RAG、RPA 和 API",
      "3C 内容工作流",
      "参数",
      "Token",
      "没有 API",
      "口径不一致",
      "值不值得做",
      "不愿使用",
      "代码",
      "Hermes 和 Codex",
      "真实使用",
      "第一件事",
    ]) {
      expect(joined.includes(k), `追问库缺少「${k}」`).toBe(true);
    }
  });
});
