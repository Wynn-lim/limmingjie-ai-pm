import { useEffect, type ReactNode } from "react";
import { usePresentation } from "../../presentation/PresentationContext";
import { screens } from "../../content/scripts";

interface SectionProps {
  /** 对应 screens 中的 id，用于演示导航与提词 */
  id: string;
  no?: string;
  title?: string;
  conclusion?: string;
  children: ReactNode;
  tight?: boolean;
  /** 不套 .shell（首屏自带整宽背景） */
  bare?: boolean;
  className?: string;
}

/**
 * 一屏 = 一个 section。
 * 演示模式下自动高亮当前屏；精简模式下 inQuick=false 的屏由 CSS 隐藏。
 */
export default function Section({
  id,
  no,
  title,
  conclusion,
  children,
  tight,
  bare,
  className,
}: SectionProps) {
  const { mode, activeScreenId, setActiveByScroll } = usePresentation();
  const screen = screens.find((s) => s.id === id);
  const quick = screen?.inQuick ?? true;

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveByScroll(id);
        });
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, setActiveByScroll]);

  const cls = [
    bare ? "" : "section",
    tight ? "section--tight" : "",
    mode !== "browse" && activeScreenId === id ? "is-active" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} data-quick={quick ? "true" : "false"} className={cls} aria-label={title ?? id}>
      {bare ? (
        children
      ) : (
        <div className="shell">
          {(no || title) && (
            <div className="section__head">
              {no && <span className="section__no">{no}</span>}
              {title && <h2 className="section__title">{title}</h2>}
            </div>
          )}
          {conclusion && <p className="section__conclusion">{conclusion}</p>}
          {children}
        </div>
      )}
    </section>
  );
}
