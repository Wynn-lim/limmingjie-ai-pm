import { useEffect } from "react";
import {
  accountTimingNote,
  accounts,
  asset,
  contentSystem,
  douyinNotice,
  douyinWorks,
} from "../content/portfolio";
import MetricCard from "../components/ui/MetricCard";
import AccountCard from "../components/ui/AccountCard";
import FlowRail from "../components/ui/FlowRail";
import DouyinWorkCard from "../components/media/DouyinWorkCard";
import ImageZoom from "../components/media/ImageZoom";
import BackToOverview from "../components/cases/BackToOverview";

/** 企业 AI 内容生产体系 —— 完整案例详情页（独立全屏路由，不用狭窄弹窗） */
export default function ContentSystemPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="detail">
      <div className="shell">
        <div className="detail__top">
          <BackToOverview />
          <span className="eyebrow">REAL WORK · 企业AI内容生产体系</span>
        </div>

        <h1 className="detail__title">企业AI内容生产体系</h1>
        <p className="detail__summary">
          把选题、核验、脚本、分镜、制作、审核、发布和复盘连成一条有模板、有检查表、有质检的内容生产线，
          并用一套账号矩阵承接不同业务线的内容需求。
        </p>

        {/* 01 为什么做 */}
        <div className="detail__section">
          <h2 className="block-title">01 为什么做</h2>
          <p style={{ color: "var(--ink-2)" }}>{contentSystem.background}</p>
        </div>

        {/* 02 原来的业务问题 */}
        <div className="detail__section">
          <h2 className="block-title">02 原来的业务问题</h2>
          <div className="grid-12">
            {contentSystem.problems.map((p, i) => (
              <div className="col-6" key={p}>
                <div className="card card--flat" style={{ height: "100%" }}>
                  <span className="section__no">问题 {i + 1}</span>
                  <p style={{ marginTop: 8, color: "var(--ink-2)" }}>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 03 我具体负责什么 */}
        <div className="detail__section">
          <h2 className="block-title">03 我具体负责什么</h2>
          <ul style={{ color: "var(--ink-2)" }}>
            {contentSystem.responsibility.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        {/* 04 完整工作流程 */}
        <div className="detail__section">
          <h2 className="block-title">04 完整工作流程</h2>
          <FlowRail steps={contentSystem.workflow.map((name) => ({ name }))} />
          <h3 className="block-title" style={{ marginTop: 24 }}>
            关键结果
          </h3>
          <div className="grid-12">
            {contentSystem.results.map((m) => (
              <div className="col-4" key={m.label}>
                <MetricCard metric={m} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* 05 账号矩阵 */}
        <div className="detail__section">
          <h2 className="block-title">05 账号矩阵</h2>
          <p className="note note--accent" style={{ marginBottom: 16 }}>
            {accountTimingNote}
          </p>
          <div className="account-grid">
            {accounts.map((acc) => (
              <AccountCard account={acc} key={acc.id} showDashboard />
            ))}
          </div>
        </div>

        {/* 06 代表作品 */}
        <div className="detail__section">
          <h2 className="block-title">06 代表作品</h2>
          <p className="note" style={{ marginBottom: 16 }}>
            {douyinNotice}
          </p>
          <div className="work-grid">
            {douyinWorks.map((w) => (
              <DouyinWorkCard work={w} key={w.id} />
            ))}
          </div>
        </div>

        {/* 07 原始证据 */}
        <div className="detail__section">
          <h2 className="block-title">07 原始证据</h2>
          <p className="note" style={{ marginBottom: 16 }}>
            以下为原始截图。
          </p>
          <div className="grid-12">
            {accounts.map((acc) => (
              <div className="col-6" key={`ev-${acc.id}`}>
                <div className="frame">
                  <div className="frame__bar">
                    <span className="frame__dots" aria-hidden="true">
                      <span className="frame__dot" />
                      <span className="frame__dot" />
                      <span className="frame__dot" />
                    </span>
                    <span className="frame__label">
                      {acc.name} · {acc.evidence}
                    </span>
                  </div>
                  <div className="frame__body">
                    <ImageZoom
                      images={[
                        { src: asset(acc.image), label: `${acc.name} · ${acc.evidence}`, sizePath: acc.image },
                        ...("dashboard" in acc && acc.dashboard
                          ? [
                              {
                                src: asset(acc.dashboard),
                                label: `${acc.name} · 后台截图 2026-09-14`,
                                sizePath: acc.dashboard,
                              },
                            ]
                          : []),
                      ]}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 08 数据口径 */}
        <div className="detail__section">
          <h2 className="block-title">08 数据口径</h2>
          <details open>
            <summary style={{ cursor: "pointer", fontWeight: 700, color: "var(--navy)" }}>
              计算口径明细
            </summary>
            <ul style={{ marginTop: 12, color: "var(--ink-2)" }}>
              {contentSystem.metricMethod.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </details>
          <table className="table" style={{ marginTop: 16 }}>
            <thead>
              <tr>
                <th style={{ width: "26%" }}>指标</th>
                <th style={{ width: "24%" }}>数值</th>
                <th>来源与口径</th>
              </tr>
            </thead>
            <tbody>
              {contentSystem.results.map((m) => (
                <tr key={m.label}>
                  <td style={{ fontWeight: 650, color: "var(--navy)" }}>{m.label}</td>
                  <td>{m.value}</td>
                  <td>{m.scope}</td>
                </tr>
              ))}
              {accounts.flatMap((a) =>
                a.metrics.map((m) => (
                  <tr key={a.id + m.label}>
                    <td style={{ color: "var(--ink-2)" }}>{a.name} · {m.label}</td>
                    <td>{m.value}</td>
                    <td>{m.scope}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>

        {/* 09 项目复盘 */}
        <div className="detail__section">
          <h2 className="block-title">09 项目复盘</h2>
          <ul style={{ color: "var(--ink-2)" }}>
            {contentSystem.review.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        {/* 10 下一步 */}
        <div className="detail__section">
          <h2 className="block-title">10 下一步</h2>
          <ul style={{ color: "var(--ink-2)" }}>
            {contentSystem.next.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <div className="btn-row" style={{ marginTop: 22 }}>
            <BackToOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
