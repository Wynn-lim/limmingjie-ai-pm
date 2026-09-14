import { Link, useLocation, useNavigate } from "react-router-dom";
import { chapters } from "../../content/portfolio";
import { asset } from "../../content/portfolio";
import { identity } from "../../content/portfolio";
import { usePresentation } from "../../presentation/PresentationContext";

/** 精简模式下完全没有可见屏的章节，导航直接指向对应的详情页 */
const chapterFallbackRoute: Record<string, string> = {
  "ch-product": "/case/ai-director",
};

export default function SiteHeader() {
  const { mode, visibleScreens, activeScreenId, goTo, scrollToScreen } =
    usePresentation();
  const navigate = useNavigate();
  const location = useLocation();

  const activeChapterId =
    visibleScreens.find((s) => s.id === activeScreenId)?.chapterId ?? "ch-identity";

  const handleChapterClick = (chapterId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      const target =
        visibleScreens.find((s) => s.chapterId === chapterId) ?? visibleScreens[0];
      requestAnimationFrame(() => scrollToScreen(target.id));
      return;
    }
    const target = visibleScreens.find((s) => s.chapterId === chapterId);
    if (target) {
      goTo(visibleScreens.findIndex((s) => s.id === target.id));
      return;
    }
    const fallback = chapterFallbackRoute[chapterId];
    if (fallback) navigate(fallback);
  };

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link to="/" className="brand" onClick={() => scrollToScreen("s-hero")}>
          <span className="brand__name">李明杰</span>
          <span className="brand__role">AI产品经理面试作品集</span>
        </Link>

        <nav className="nav" aria-label="六个主章节">
          {chapters.map((c) => {
            const hasVisible = visibleScreens.some((s) => s.chapterId === c.id);
            const hiddenInQuick = mode === "quick" && !hasVisible;
            return (
              <button
                key={c.id}
                type="button"
                className={[
                  "nav__item",
                  activeChapterId === c.id ? "is-active" : "",
                  hiddenInQuick ? "is-hidden-chapter" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={activeChapterId === c.id ? "true" : undefined}
                title={hiddenInQuick ? `${c.title}（精简模式：查看详情页）` : c.title}
                onClick={() => handleChapterClick(c.id)}
              >
                {c.nav}
              </button>
            );
          })}
        </nav>

        <div className="header-actions">
          <a
            className="btn btn--ghost btn--sm"
            href={asset(identity.resume)}
            download="李明杰_AI产品经理简历.pdf"
          >
            下载简历
          </a>
        </div>
      </div>
    </header>
  );
}
