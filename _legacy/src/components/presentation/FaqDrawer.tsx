import { useEffect, useRef, useState } from "react";
import { faq, faqIntro, faqTitle } from "../../content/faq";
import { usePresentation } from "../../presentation/PresentationContext";

/** 常见追问抽屉：一题一个直接回答；打开 / 关闭后回到原来的讲解位置 */
export default function FaqDrawer() {
  const { faqOpen, closeFaq } = usePresentation();
  const [openId, setOpenId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (faqOpen) {
      panelRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [faqOpen]);

  if (!faqOpen) return null;

  return (
    <>
      <div className="faq-scrim" onClick={closeFaq} aria-hidden="true" />
      <div
        className="faq"
        role="dialog"
        aria-modal="true"
        aria-label={faqTitle}
        tabIndex={-1}
        ref={panelRef}
      >
        <div className="faq__head">
          <span className="faq__title">{faqTitle}</span>
          <button type="button" className="btn btn--ghost btn--sm" onClick={closeFaq}>
            关闭
          </button>
        </div>
        <div className="faq__body">
          <p className="faq__intro">{faqIntro}</p>
          {faq.map((item, i) => {
            const expanded = openId === item.id;
            return (
              <div className="faq__item" key={item.id}>
                <button
                  type="button"
                  className="faq__q"
                  aria-expanded={expanded}
                  onClick={() => setOpenId(expanded ? null : item.id)}
                >
                  <span className="faq__q-no">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item.question}</span>
                  <span className="faq__chev" aria-hidden="true">
                    {expanded ? "▲" : "▼"}
                  </span>
                </button>
                {expanded && (
                  <div className="faq__a">
                    <p className="faq__para">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
