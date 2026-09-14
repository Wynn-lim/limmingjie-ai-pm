import { chapters } from "../../content/portfolio";
import { screens, screenMinutes } from "../../content/scripts";
import { usePresentation } from "../../presentation/PresentationContext";

/** 右侧提词面板：只在演示模式显示，可关闭 / 缩小 / 恢复 */
export default function SpeakerNotes() {
  const { mode, notes, setNotes, activeIndex, visibleScreens, activeScreenId } =
    usePresentation();

  if (mode === "browse" || notes === "hidden") return null;

  const screen = screens[activeIndex];
  if (!screen) return null;

  const chapter = chapters.find((c) => c.id === screen.chapterId);
  const pos = visibleScreens.findIndex((s) => s.id === activeScreenId);

  return (
    <aside
      className={notes === "mini" ? "notes notes--mini" : "notes"}
      aria-label="这一页怎么讲"
    >
      <div className="notes__head">
        <span className="notes__label">这一页怎么讲</span>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => setNotes(notes === "mini" ? "open" : "mini")}
        >
          {notes === "mini" ? "放大" : "缩小"}
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => setNotes("hidden")}
        >
          关闭
        </button>
      </div>
      <div className="notes__body">
        <p className="notes__script">{screen.script}</p>
      </div>
      <div className="notes__foot">
        {chapter ? `${chapter.nav} · ` : ""}
        {pos >= 0 ? `第 ${pos + 1} / ${visibleScreens.length} 屏` : ""}
        {` · 建议 ${screenMinutes[screen.id] ?? 1} 分钟`}
      </div>
    </aside>
  );
}
