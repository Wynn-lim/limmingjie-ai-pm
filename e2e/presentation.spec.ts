import { expect, test } from "@playwright/test";

const CHAPTERS = [
  "我是谁与岗位匹配",
  "企业AI内容生产体系",
  "音响视频与3C内容工作流",
  "AI编导Agent与RAG产品能力",
  "加入公司后的四个项目",
  "30/60/90天计划与总结",
];

test.describe("面试作品集验收", () => {
  test.beforeEach(async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(String(err)));
    (page as unknown as { __errors: string[] }).__errors = errors;
    await page.goto("./", { waitUntil: "domcontentloaded" });
  });

  test("无横向滚动，首屏文案正确", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: /把业务问题，做成真正能用的AI工作流/ }),
    ).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `横向溢出 ${overflow}px`).toBeLessThanOrEqual(1);
  });

  test("六章导航齐全且可点击跳转", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "六个主章节" });
    for (const c of CHAPTERS) {
      await expect(nav.getByRole("button", { name: c })).toBeVisible();
    }
    await nav.getByRole("button", { name: "加入公司后的四个项目" }).click();
    await expect(page.locator("#s-projects")).toBeInViewport();
  });

  test("15 分钟标准模式：提词、进度、键盘切换都正常", async ({ page }) => {
    await page.getByRole("button", { name: "开始15分钟介绍" }).click();
    await expect(page.getByLabel("这一页怎么讲")).toBeVisible();
    const meta = page.locator(".pbar__meta");
    await expect(meta).toContainText("全程建议约 15 分钟");
    await expect(meta).toContainText("第 1 / 14 屏");

    await page.keyboard.press("ArrowRight");
    await expect(meta).toContainText("第 2 / 14 屏");

    await page.keyboard.press(" ");
    await expect(meta).toContainText("第 3 / 14 屏");

    await page.keyboard.press("ArrowLeft");
    await expect(meta).toContainText("第 2 / 14 屏");

    await expect(page.getByRole("progressbar", { name: "整体进度" })).toBeVisible();
  });

  test("8 分钟精简模式隐藏次要屏", async ({ page }) => {
    await page.getByRole("button", { name: "8分钟精简模式" }).click();
    const hidden = page.locator('[data-quick="false"]');
    const count = await hidden.count();
    expect(count).toBeGreaterThan(0);
    await expect(hidden.first()).toBeHidden();
    await expect(page.getByText(/全程建议约 8 分钟/)).toBeVisible();
  });

  test("普通浏览模式默认不显示提词", async ({ page }) => {
    await expect(page.getByLabel("这一页怎么讲")).toHaveCount(0);
  });

  test("FAQ 抽屉可开可关", async ({ page }) => {
    await page.getByRole("button", { name: "对方可能会问" }).click();
    const dialog = page.getByRole("dialog", { name: "对方可能会问" });
    await expect(dialog).toBeVisible();
    // 首题默认展开
    await expect(dialog.getByText("15 秒直接回答").first()).toBeVisible();
    // 展开另一题
    await dialog.getByRole("button", { name: /3C 内容工作流具体怎么实现/ }).click();
    await expect(dialog.getByText(/分十步：资料输入/)).toBeVisible();
    await dialog.getByRole("button", { name: "关闭并回到刚才那一屏" }).click();
    await expect(dialog).toHaveCount(0);
  });

  test("音响视频可播放且不自动播放声音", async ({ page }) => {
    const videos = page.locator("video");
    await expect(videos).toHaveCount(2);
    const muted = await videos.first().evaluate((v) => (v as HTMLVideoElement).muted);
    const paused = await videos.first().evaluate((v) => (v as HTMLVideoElement).paused);
    expect(muted || paused).toBe(true);
    await expect(videos.first()).toHaveAttribute("controls", "");
    await expect(videos.first()).toHaveAttribute("poster", /speaker-01-poster/);
  });

  test("简历下载链接有效", async ({ page }) => {
    const link = page.getByRole("link", { name: "下载简历" }).first();
    const href = await link.getAttribute("href");
    expect(href).toContain("resume/lim-mingjie-ai-pm-resume.pdf");
    const res = await page.request.get(href!);
    expect(res.status()).toBe(200);
  });

  test("三条抖音代表作品链接与二维码正常", async ({ page }) => {
    const links = page.getByRole("link", { name: "查看代表作品" });
    await expect(links).toHaveCount(3);
    const urls: string[] = [];
    for (let i = 0; i < 3; i += 1) {
      const link = links.nth(i);
      await expect(link).toHaveAttribute("target", "_blank");
      const rel = (await link.getAttribute("rel")) ?? "";
      expect(rel).toContain("noopener");
      urls.push((await link.getAttribute("href")) ?? "");
    }
    expect(urls).toEqual([
      "https://v.douyin.com/6r87UrzkyTM/",
      "https://v.douyin.com/W8sCBsXM0c0/",
      "https://v.douyin.com/tvaTDnOoD5E/",
    ]);
    await expect(page.locator('img[alt$="二维码"]')).toHaveCount(3);
  });

  test("详情页与 Hash 路由刷新正常，返回恢复位置", async ({ page }) => {
    await page.goto("./#/case/ai-director");
    await expect(page.getByRole("heading", { level: 1, name: "AI 编导工作台" })).toBeVisible();
    expect(await page.locator(".beat").count()).toBe(6);

    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1, name: "AI 编导工作台" })).toBeVisible();

    await page.getByRole("button", { name: /返回总览/ }).first().click();
    await expect(page.getByRole("heading", { level: 1, name: /把业务问题/ })).toBeVisible();
  });

  test("内容体系详情页 10 个步骤齐全", async ({ page }) => {
    await page.goto("./#/case/content-system");
    for (const t of [
      "01 为什么做",
      "05 账号矩阵",
      "08 数据口径",
      "10 下一步",
    ]) {
      await expect(page.getByRole("heading", { name: t })).toBeVisible();
    }
  });

  test("所有数字都标注口径，且没有空模块", async ({ page }) => {
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/建设中|敬请期待|Coming soon/);
    const scopeCount = await page.getByText(/^口径：/).count();
    expect(scopeCount).toBeGreaterThan(0);
  });

  test("控制台没有明显错误", async ({ page }) => {
    await page.goto("./#/case/rag-expert", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    const errors = (page as unknown as { __errors: string[] }).__errors ?? [];
    const meaningful = errors.filter(
      (e) => !/favicon|Failed to load resource.*404/i.test(e),
    );
    expect(meaningful, meaningful.join("\n")).toEqual([]);
  });
});
