import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { screens } from "../content/scripts";

export type PresentationMode = "browse" | "standard" | "quick";
export type NotesState = "hidden" | "open" | "mini";

interface PresentationValue {
  mode: PresentationMode;
  setMode: (mode: PresentationMode) => void;
  /** 当前屏序号（在 screens 中的索引） */
  activeIndex: number;
  activeScreenId: string;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  /** 当前模式下可见的屏 */
  visibleScreens: typeof screens;
  visiblePercent: number;
  suggestedMinutes: number;
  notes: NotesState;
  setNotes: (state: NotesState) => void;
  toggleNotes: () => void;
  faqOpen: boolean;
  setFaqOpen: (open: boolean) => void;
  /** 打开抽屉前记录的讲解位置，用于关闭后恢复 */
  openFaq: () => void;
  closeFaq: () => void;
  /** 详情页返回总览时恢复到的屏 */
  pendingRestoreId: string | null;
  consumeRestore: () => string | null;
  goBackToOverview: () => void;
  /** 进入某一屏时同步当前屏（滚动联动用） */
  setActiveByScroll: (id: string) => void;
  scrollToScreen: (id: string) => void;
}

const PresentationContext = createContext<PresentationValue | null>(null);

const SCREEN_IDS = screens.map((s) => s.id);

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PresentationMode>("browse");
  const [activeIndex, setActiveIndex] = useState(0);
  const [notes, setNotes] = useState<NotesState>("hidden");
  const [faqOpen, setFaqOpen] = useState(false);
  const pendingRestoreRef = useRef<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const visibleScreens = useMemo(
    () => (mode === "quick" ? screens.filter((s) => s.inQuick) : screens),
    [mode],
  );

  const activeScreenId = screens[activeIndex]?.id ?? screens[0].id;

  const scrollToScreen = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(screens.length - 1, index));
      setActiveIndex(clamped);
      if (location.pathname !== "/") {
        pendingRestoreRef.current = screens[clamped].id;
        navigate("/");
        return;
      }
      scrollToScreen(screens[clamped].id);
    },
    [location.pathname, navigate, scrollToScreen],
  );

  const next = useCallback(() => {
    const list = mode === "quick" ? screens.filter((s) => s.inQuick) : screens;
    const currentId = screens[activeIndex]?.id;
    const posInList = list.findIndex((s) => s.id === currentId);
    const target =
      posInList >= 0
        ? list[Math.min(list.length - 1, posInList + 1)]
        : list[0];
    goTo(screens.findIndex((s) => s.id === target.id));
  }, [activeIndex, goTo, mode]);

  const prev = useCallback(() => {
    const list = mode === "quick" ? screens.filter((s) => s.inQuick) : screens;
    const currentId = screens[activeIndex]?.id;
    const posInList = list.findIndex((s) => s.id === currentId);
    const target =
      posInList >= 0 ? list[Math.max(0, posInList - 1)] : list[0];
    goTo(screens.findIndex((s) => s.id === target.id));
  }, [activeIndex, goTo, mode]);

  const setMode = useCallback(
    (next2: PresentationMode) => {
      setModeState(next2);
      setNotes(next2 === "browse" ? "hidden" : notes === "hidden" ? "open" : notes);
      if (next2 === "quick") {
        const list = screens.filter((s) => s.inQuick);
        if (!list.some((s) => s.id === screens[activeIndex].id)) {
          setActiveIndex(SCREEN_IDS.indexOf(list[0].id));
        }
      } else if (next2 === "browse") {
        setNotes("hidden");
      }
    },
    [activeIndex, notes],
  );

  const toggleNotes = useCallback(() => {
    setNotes((n) => (n === "hidden" ? "open" : n === "open" ? "mini" : "hidden"));
  }, []);

  const openFaq = useCallback(() => {
    // 记录当前讲解位置；关闭后按记录恢复，不跳回页面顶部
    const el = document.getElementById(activeScreenId);
    if (el) {
      const rect = el.getBoundingClientRect();
      const offset = Math.max(0, window.scrollY + rect.top - 120);
      try {
        sessionStorage.setItem("lmj-faq-scroll", String(offset));
      } catch {
        /* 隐私模式下忽略 */
      }
    }
    setFaqOpen(true);
  }, [activeScreenId]);

  const closeFaq = useCallback(() => {
    setFaqOpen(false);
    let offset: number | null = null;
    try {
      const raw = sessionStorage.getItem("lmj-faq-scroll");
      if (raw) offset = Number(raw);
    } catch {
      /* 忽略 */
    }
    if (offset !== null && Number.isFinite(offset)) {
      requestAnimationFrame(() => window.scrollTo({ top: offset, behavior: "auto" }));
    }
  }, []);

  const pendingRestoreId = pendingRestoreRef.current;

  const consumeRestore = useCallback(() => {
    const id = pendingRestoreRef.current;
    pendingRestoreRef.current = null;
    return id;
  }, []);

  const goBackToOverview = useCallback(() => {
    pendingRestoreRef.current = activeScreenId;
    navigate("/");
  }, [activeScreenId, navigate]);

  const setActiveByScroll = useCallback((id: string) => {
    setActiveIndex((cur) => {
      const idx = SCREEN_IDS.indexOf(id);
      return idx >= 0 && idx !== cur ? idx : cur;
    });
  }, []);

  /** 键盘：方向键与空格切换；Esc 关闭抽屉 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName ?? "";
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;

      if (e.key === "Escape") {
        if (faqOpen) {
          e.preventDefault();
          closeFaq();
        }
        return;
      }

      if (mode === "browse") return;

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeFaq, faqOpen, mode, next, prev]);

  const visiblePercent = useMemo(() => {
    const list = visibleScreens;
    const pos = list.findIndex((s) => s.id === activeScreenId);
    if (pos < 0) return 0;
    return Math.round(((pos + 1) / list.length) * 100);
  }, [activeScreenId, visibleScreens]);

  const suggestedMinutes = useMemo(() => {
    const map = { browse: 0, standard: 15, quick: 8 } as const;
    return map[mode];
  }, [mode]);

  const value: PresentationValue = {
    mode,
    setMode,
    activeIndex,
    activeScreenId,
    goTo,
    next,
    prev,
    visibleScreens,
    visiblePercent,
    suggestedMinutes,
    notes,
    setNotes,
    toggleNotes,
    faqOpen,
    setFaqOpen,
    openFaq,
    closeFaq,
    pendingRestoreId,
    consumeRestore,
    goBackToOverview,
    setActiveByScroll,
    scrollToScreen,
  };

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation 必须在 PresentationProvider 内使用");
  return ctx;
}
