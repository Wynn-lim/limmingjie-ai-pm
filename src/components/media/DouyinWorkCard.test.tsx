import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DouyinWorkCard from "./DouyinWorkCard";
import { accounts, douyinWorks } from "../../content/portfolio";

describe("抖音代表作品卡", () => {
  const work = douyinWorks[0];

  it("按钮文案为「查看代表作品」，新标签页打开并带 rel", () => {
    render(<DouyinWorkCard work={work} />);
    const link = screen.getByRole("link", { name: "查看代表作品" });
    expect(link).toHaveAttribute("href", work.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(link.getAttribute("rel")).toContain("noreferrer");
  });

  it("提供二维码与扫码提示，并说明不是账号主页", () => {
    render(<DouyinWorkCard work={work} />);
    expect(screen.getByAltText(`${work.workTitle} 二维码`)).toBeInTheDocument();
    expect(screen.getByText(/如网页无法播放，可使用抖音扫码观看。/)).toBeInTheDocument();
    expect(screen.getByText(/不是账号主页/)).toBeInTheDocument();
  });

  it("按钮文案不得写成「进入账号主页」", () => {
    render(<DouyinWorkCard work={work} />);
    expect(screen.queryByText(/进入账号主页/)).toBeNull();
  });

  it("三个作品卡都渲染正常", () => {
    for (const w of douyinWorks) {
      const { unmount } = render(<DouyinWorkCard work={w} />);
      expect(screen.getByRole("link", { name: "查看代表作品" })).toHaveAttribute("href", w.url);
      unmount();
    }
  });

  it("研发费用审计账号没有外链，只展示截图", () => {
    const audit = accounts.find((a) => a.id === "audit")!;
    expect("url" in audit).toBe(false);
  });
});
