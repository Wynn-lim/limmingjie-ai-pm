import { useEffect, useRef, type ReactNode } from "react";
import { asset } from "../../content/portfolio";
import type { CaseStudy } from "../../types/portfolio";
import { EvidenceChip } from "../ui/MetricCard";
import BeatCard from "./BeatCard";
import ImageZoom from "../media/ImageZoom";

/**
 * 截图型案例详情页。
 * 全屏路由（可用 HashRouter 分享），不使用狭窄弹窗；
 * 返回时回到主线上原来的一屏。
 */
export default function CaseDetail({
  study,
  children,
}: {
  study: CaseStudy;
  children?: ReactNode;
}) {
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start" });
    window.scrollTo({ top: 0 });
  }, [study.id]);

  return (
    <div className="detail">
      <div className="shell" ref={topRef}>
        <div className="detail__top">
          {children}
          <span className="eyebrow">{study.kicker}</span>
        </div>

        <h1 className="detail__title">{study.title}</h1>
        <p className="detail__summary">{study.summary}</p>

        <div
          className="detail__status"
          style={{
            background: "var(--navy-soft)",
            border: "1px solid #c4d2e2",
          }}
        >
          <div className="btn-row" style={{ gap: 10 }}>
            <strong style={{ color: "var(--navy)" }}>{study.statusLabel}</strong>
            <EvidenceChip status={study.id === "rag-expert" ? "concept" : "demo"} />
          </div>
          <p style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 14.5 }}>
            {study.statusNote}
          </p>
        </div>

        <div className="grid-12" style={{ marginTop: 24 }}>
          <div className="col-6">
            <h2 className="block-title">我的角色</h2>
            <p style={{ color: "var(--ink-2)" }}>{study.role}</p>
          </div>
          <div className="col-6">
            <h2 className="block-title">验证的能力</h2>
            <div className="btn-row" style={{ gap: 8 }}>
              {study.abilities.map((a) => (
                <span className="chip" key={a}>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="detail__section">
          <h2 className="block-title">按使用顺序拆解</h2>
          <p className="note" style={{ marginBottom: 8 }}>
            每一步在做什么、原本卡在哪里、我做了哪些判断，都写在对应截图旁边。
          </p>
          {study.beats.map((b, i) => (
            <BeatCard beat={b} index={i + 1} key={b.id} />
          ))}
        </div>

        {study.deepDive && study.deepDive.length > 0 && (
          <div className="detail__section">
            <h2 className="block-title">补充细节</h2>
            <div className="grid-12">
              {study.deepDive.map((d) => (
                <div className="col-4" key={d.title}>
                  <div className="card" style={{ height: "100%" }}>
                    <h3 className="block-title--sm">{d.title}</h3>
                    <ul style={{ color: "var(--ink-2)", fontSize: 14.5 }}>
                      {d.body.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {study.fullImage && (
          <div className="detail__full">
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <strong style={{ color: "var(--navy)" }}>完整界面长图</strong>
              <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
                原始截图全貌，可上下滚动查看。
              </span>
            </div>
            <div className="detail__full-scroll">
              <ImageZoom
                images={[
                  {
                    src: asset(study.fullImage),
                    label: `${study.title} 完整界面长图`,
                    sizePath: study.fullImage,
                  },
                ]}
              />
            </div>
          </div>
        )}

        <div className="detail__section">
          {children}
        </div>
      </div>
    </div>
  );
}
