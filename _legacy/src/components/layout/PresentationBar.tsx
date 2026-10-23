import { useLocation } from "react-router-dom";
import { chapters } from "../../content/portfolio";
import { screens, screenMinutes } from "../../content/scripts";
import { faqEntryLabel } from "../../content/faq";
import { usePresentation } from "../../presentation/PresentationContext";

const modeLabel = {
  browse: "普通浏览",
  standard: "15分钟标准模式",
  quick: "8分钟精简模式",
} as const;

const detailLabel: Record<string, string> = {
  "/case/content-system": "详情页 · 企业AI内容生产体系",
  "/case/ai-director": "详情页 · AI 编导工作台",
  "/case/rag-expert": "详情页 · 研发费合规专家",
  "/appendix/product-os": "附加内容 · AI Product Leader OS",
};

export default function PresentationBar() {
  const {
    mode,
    setMode,
    activeIndex,
    activeScreenId,
    visibleScreens,
    visiblePercent,
    suggestedMinutes,
    notes,
    toggleNotes,
    openFaq,
    prev,
    next,
  } = usePresentation();
  const location = useLocation();

  const screen = screens[activeIndex];
  const chapter = chapters.find((c) => c.id === screen?.chapterId);
  const pos = visibleScreens.findIndex((s) => s.id === activeScreenId);
  const detail = detailLabel[location.pathname];

  return (
    <div className="pbar">
      <div className="shell pbar__inner">
        <div style={{ minWidth: 0 }}>
          <div className="pbar__now">
            {detail
              ? detail
              : chapter
                ? `${String(chapter.index).padStart(2, "0")} · ${chapter.nav}`
                : "总览"}
          </div>
          <div className="pbar__meta">
            {modeLabel[mode]}
            {mode !== "browse" && pos >= 0
              ? ` · 第 ${pos + 1} / ${visibleScreens.length} 屏`
              : ""}
            {mode !== "browse" && screen
              ? ` · 本屏建议 ${screenMinutes[screen.id] ?? 1} 分钟`
              : ""}
            {mode !== "browse" ? ` · 全程建议约 ${suggestedMinutes} 分钟` : ""}
          </div>
        </div>

        <div
          className="pbar__track"
          role="progressbar"
          aria-label="整体进度"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={mode === "browse" ? 0 : visiblePercent}
        >
          <div
            className="pbar__fill"
            style={{ width: `${mode === "browse" ? 0 : visiblePercent}%` }}
          />
        </div>

        <div className="pbar__actions">
          <select
            aria-label="切换演示模式"
            value={mode}
            onChange={(e) => setMode(e.target.value as typeof mode)}
            style={{
              height: 34,
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.3)",
              background: "transparent",
              color: "#fff",
              padding: "0 6px",
              fontSize: 13.5,
            }}
          >
            <option value="browse" style={{ color: "#111" }}>
              普通浏览
            </option>
            <option value="standard" style={{ color: "#111" }}>
              15分钟标准
            </option>
            <option value="quick" style={{ color: "#111" }}>
              8分钟精简
            </option>
          </select>

          {mode !== "browse" && (
            <>
              <button type="button" className="btn btn--ghost btn--sm" onClick={prev}>
                上一节
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={next}>
                下一节
              </button>
              <button
                type="button"
                className="btn btn--accent btn--sm"
                onClick={toggleNotes}
                aria-pressed={notes !== "hidden"}
              >
                {notes === "hidden" ? "显示提词" : notes === "open" ? "缩小提词" : "隐藏提词"}
              </button>
            </>
          )}

          <button type="button" className="btn btn--ghost btn--sm" onClick={openFaq}>
            {faqEntryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
