import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import SiteHeader from "../components/layout/SiteHeader";
import PresentationBar from "../components/layout/PresentationBar";
import SpeakerNotes from "../components/presentation/SpeakerNotes";
import FaqDrawer from "../components/presentation/FaqDrawer";
import HomePage from "../pages/HomePage";
import ContentSystemPage from "../pages/ContentSystemPage";
import AiDirectorPage from "../pages/AiDirectorPage";
import RagExpertPage from "../pages/RagExpertPage";
import ProductOsPage from "../pages/ProductOsPage";
import { PresentationProvider, usePresentation } from "../presentation/PresentationContext";
import { identity } from "../content/portfolio";

/** 从详情页返回总览时，恢复到原来那一屏 */
function RestorePosition() {
  const { consumeRestore, scrollToScreen } = usePresentation();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;
    const id = consumeRestore();
    if (!id) return;
    const timer = window.setTimeout(() => scrollToScreen(id), 60);
    return () => window.clearTimeout(timer);
  }, [consumeRestore, location.pathname, scrollToScreen]);

  return null;
}

function Shell() {
  const { mode, notes } = usePresentation();
  const cls = [
    "app",
    mode === "quick" ? "mode-quick" : "",
    mode === "standard" ? "mode-standard" : "",
    mode === "browse" ? "mode-browse" : "",
    notes === "hidden" ? "" : "has-notes",
    notes === "mini" ? "has-notes--mini" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>
      <SiteHeader />
      <PresentationBar />
      <RestorePosition />
      <main id="main" className="presentation-surface">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case/content-system" element={<ContentSystemPage />} />
          <Route path="/case/ai-director" element={<AiDirectorPage />} />
          <Route path="/case/rag-expert" element={<RagExpertPage />} />
          <Route path="/appendix/product-os" element={<ProductOsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="shell site-footer__row">
          <strong style={{ color: "#fff" }}>李明杰｜AI产品经理面试作品集</strong>
          <span>AI应用落地 · AIGC工作流 · Agent与RAG产品能力</span>
          <a href={identity.resume} download="李明杰_AI产品经理简历.pdf">
            下载简历
          </a>
          <span style={{ color: "#7f93a8" }}>
            站内所有数字均标注来源与口径；Demo、产品方案与真实工作严格区分。
          </span>
        </div>
      </footer>
      <SpeakerNotes />
      <FaqDrawer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <PresentationProvider>
        <Shell />
      </PresentationProvider>
    </HashRouter>
  );
}
