import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePresentation } from "../../presentation/PresentationContext";
import { screens } from "../../content/scripts";

interface SectionProps {
  /** 对应 screens 中的 id，用于演示导航与提词 */
  id: string;
  no?: string;
  eyebrow?: string;
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
  eyebrow,
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
  const bodyRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

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

  /** 轻量淡入；不支持 IntersectionObserver 时直接显示，并有兜底超时 */
  useEffect(() => {
    const el = bodyRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    const safety = window.setTimeout(() => setRevealed(true), 1600);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  const cls = [
    bare ? "" : "section",
    tight ? "section--tight" : "",
    mode !== "browse" && activeScreenId === id ? "is-active" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      data-quick={quick ? "true" : "false"}
      className={cls}
      aria-label={title ?? id}
    >
      {bare ? (
        <div ref={bodyRef} data-reveal className={revealed ? "is-in" : undefined}>
          {children}
        </div>
      ) : (
        <div className="shell">
          <div ref={bodyRef} data-reveal {...(revealed ? { className: "is-in" } : {})}>
            {(no || title) && (
              <header className={no ? "sec-head" : "sec-head sec-head--solo"}>
                {no && (
                  <div className="sec-head__no" aria-hidden="true">
                    {no}
                  </div>
                )}
                <div className="sec-head__main">
                  {eyebrow && <div className="eyebrow">{eyebrow}</div>}
                  {title && <h2 className="sec-head__title">{title}</h2>}
                  {conclusion && <p className="sec-head__conclusion">{conclusion}</p>}
                </div>
              </header>
            )}
            {children}
          </div>
        </div>
      )}
    </section>
  );
}
