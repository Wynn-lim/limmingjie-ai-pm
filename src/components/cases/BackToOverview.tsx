import { usePresentation } from "../../presentation/PresentationContext";

/** 返回总览并恢复原来的讲解位置 */
export default function BackToOverview({ label = "返回总览" }: { label?: string }) {
  const { goBackToOverview } = usePresentation();
  return (
    <button type="button" className="btn btn--ghost btn--sm" onClick={goBackToOverview}>
      ← {label}
    </button>
  );
}
