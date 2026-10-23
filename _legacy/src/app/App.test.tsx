import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import App from "./App";
import { chapters } from "../content/portfolio";

beforeAll(() => {
  window.location.hash = "#/";
});

function renderApp() {
  return render(<App />);
}

describe("顶栏与章节导航", () => {
  it("顶部只有 6 个主章节导航", async () => {
    renderApp();
    const nav = await screen.findByRole("navigation", { name: "六个主章节" });
    const buttons = within(nav).getAllByRole("button");
    expect(buttons).toHaveLength(6);
    expect(buttons.map((b) => b.textContent)).toEqual(chapters.map((c) => c.nav));
  });

  it("首屏包含标题、身份与三个入口", () => {
    renderApp();
    expect(
      screen.getByRole("heading", { level: 1, name: /把业务问题，做成真正能用的AI工作流/ }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/AI产品经理 · AI应用落地 · AIGC工作流/).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: "开始15分钟介绍" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: "8分钟精简模式" }).length).toBeGreaterThan(0);
    expect(screen.getAllByText("下载简历").length).toBeGreaterThan(0);
  });

  it("每一屏都有对应 section，且带精简模式标记", () => {
    renderApp();
    for (const id of [
      "s-hero",
      "s-match",
      "s-content",
      "s-content-accounts",
      "s-video",
      "s-c3",
      "s-director",
      "s-rag",
      "s-projects",
      "s-plan",
      "s-closing",
    ]) {
      const el = document.getElementById(id);
      expect(el, `缺少 section ${id}`).not.toBeNull();
      expect(el!.getAttribute("data-quick")).toBeTruthy();
    }
  });

  it("没有空模块和「建设中」占位", () => {
    const { container } = renderApp();
    expect(container.textContent).not.toMatch(/建设中|敬请期待|Coming soon|影片室/);
  });
});

describe("三种演示模式", () => {
  it("默认普通浏览模式不显示提词", () => {
    renderApp();
    expect(screen.queryByLabelText("讲解要点")).toBeNull();
  });

  it("切到 15 分钟标准模式后显示提词与进度", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.selectOptions(screen.getByLabelText("切换演示模式"), "standard");
    expect(await screen.findByLabelText("讲解要点")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "整体进度" })).toBeInTheDocument();
    expect(screen.getAllByText(/全程建议约 15 分钟/).length).toBeGreaterThan(0);
  });

  it("切到 8 分钟精简模式后为根节点加上 mode-quick", async () => {
    const user = userEvent.setup();
    const { container } = renderApp();
    await user.selectOptions(screen.getByLabelText("切换演示模式"), "quick");
    expect(container.querySelector(".app.mode-quick")).not.toBeNull();
    expect(screen.getAllByText(/全程建议约 8 分钟/).length).toBeGreaterThan(0);
  });

  it("提词可缩小与隐藏", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.selectOptions(screen.getByLabelText("切换演示模式"), "standard");
    await user.click(screen.getByRole("button", { name: "缩小提词" }));
    await user.click(screen.getByRole("button", { name: "隐藏提词" }));
    expect(screen.queryByLabelText("讲解要点")).toBeNull();
  });

  it("方向键与空格可以切换上一节 / 下一节", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.selectOptions(screen.getByLabelText("切换演示模式"), "standard");
    expect(screen.getAllByText(/第 1 \//).length).toBeGreaterThan(0);
    await user.keyboard("{ArrowRight}");
    expect(screen.getAllByText(/第 2 \//).length).toBeGreaterThan(0);
    await user.keyboard(" ");
    expect(screen.getAllByText(/第 3 \//).length).toBeGreaterThan(0);
    await user.keyboard("{ArrowLeft}");
    expect(screen.getAllByText(/第 2 \//).length).toBeGreaterThan(0);
  });

  it("不使用倒计时", () => {
    const { container } = renderApp();
    expect(container.textContent).not.toMatch(/倒计时|\d{2}:\d{2}/);
  });
});

describe("预设追问抽屉", () => {
  it("可以打开与关闭，并回到原来的讲解位置", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole("button", { name: "常见追问" }));
    const dialog = await screen.findByRole("dialog", { name: "常见追问与回答" });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/为什么用 Agent，而不是普通 Prompt？/)).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: /为什么用 Agent/ }));
    expect(screen.getAllByText(/我的判断标准是三条/).length).toBeGreaterThan(0);
  });

  it("关闭按钮可以收起抽屉", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole("button", { name: "常见追问" }));
    const dialog = await screen.findByRole("dialog", { name: "常见追问与回答" });
    await user.click(within(dialog).getByRole("button", { name: "关闭" }));
    expect(screen.queryByRole("dialog", { name: "常见追问与回答" })).toBeNull();
  });
});

describe("详情页", () => {
  it("内容体系详情页按 10 个步骤排列", () => {
    window.location.hash = "#/case/content-system";
    renderApp();
    for (const t of [
      "01 为什么做",
      "02 原来的业务问题",
      "03 我具体负责什么",
      "04 完整工作流程",
      "05 账号矩阵",
      "06 代表作品",
      "07 原始证据",
      "08 数据口径",
      "09 项目复盘",
      "10 下一步",
    ]) {
      expect(screen.getByRole("heading", { name: t }), `缺少 ${t}`).toBeInTheDocument();
    }
    window.location.hash = "#/";
  });

  it("AI 编导与 RAG 详情页不使用假 Demo 按钮", () => {
    window.location.hash = "#/case/ai-director";
    const { container } = renderApp();
    // 正文里可以说明「不提供在线运行/录屏」，但绝不能出现可点击的假入口
    const fake = Array.from(container.querySelectorAll("button, a")).filter((el) =>
      /打开Demo|打开 Demo|本地运行|录屏|运行演示/.test(el.textContent ?? ""),
    );
    expect(fake.map((el) => el.textContent)).toEqual([]);
    window.location.hash = "#/";
  });
});
