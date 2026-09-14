import { Link } from "react-router-dom";
import {
  accountTimingNote,
  accounts,
  accounts as accountList,
  aiDirector,
  asset,
  capabilityFlow,
  c3Workflow,
  closing,
  companyProjects,
  contentSystem,
  dataLoop,
  douyinWorks,
  geoBoundary,
  identity,
  jobMatch,
  jobMatchBoundary,
  laterAgents,
  laterAgentsNote,
  methodFive,
  mvpSkills,
  paramMap,
  planPhases,
  proofCards,
  qualityBoundary,
  ragExpert,
  speakerTask,
  speakerVideos,
} from "../content/portfolio";
import { chapters } from "../content/portfolio";
import { usePresentation } from "../presentation/PresentationContext";
import Section from "../components/ui/Section";
import MetricCard, { EvidenceChip } from "../components/ui/MetricCard";
import DouyinWorkCard from "../components/media/DouyinWorkCard";
import VideoPlayer from "../components/media/VideoPlayer";

export default function HomePage() {
  const { setMode, scrollToScreen } = usePresentation();

  const startStandard = () => {
    setMode("standard");
    requestAnimationFrame(() => scrollToScreen("s-match"));
  };
  const startQuick = () => {
    setMode("quick");
    requestAnimationFrame(() => scrollToScreen("s-content"));
  };
  const chapterOf = (id: string) => chapters.find((c) => c.id === id);

  return (
    <>
      {/* ---------------- 首屏 ---------------- */}
      <Section id="s-hero" bare className="hero">
        <div className="shell">
          <h1 className="hero__headline">{identity.headline}</h1>
          <p className="hero__identity">{identity.title}</p>
          <p className="hero__sub">{identity.subtitle}</p>
          <p className="hero__value">{identity.valueProp}</p>

          <div className="hero__flow" aria-label="能力闭环">
            {capabilityFlow.map((step, i) => (
              <span key={step} style={{ display: "contents" }}>
                <span className="hero__flow-step">{step}</span>
                {i < capabilityFlow.length - 1 && (
                  <span className="hero__flow-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>

          <div className="btn-row hero__actions">
            <button type="button" className="btn btn--primary" onClick={startStandard}>
              开始15分钟介绍
            </button>
            <button type="button" className="btn btn--accent" onClick={startQuick}>
              8分钟精简模式
            </button>
            <a className="btn btn--ghost" href={asset(identity.resume)} download="李明杰_AI产品经理简历.pdf">
              下载简历
            </a>
          </div>
          <p className="hero__hint">{identity.hint}</p>

          <div className="proof-grid">
            {proofCards.map((m) => (
              <MetricCard key={m.label + m.value} metric={m} size="sm" />
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- 01 岗位匹配 ---------------- */}
      <Section
        id="s-match"
        no="01"
        title="岗位匹配：现有经验怎么迁移到耳机音响3C业务"
        conclusion={chapterOf("ch-identity")?.conclusion}
      >
        <div className="section__block">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "34%" }}>岗位需要</th>
                <th>相关经验与迁移方式</th>
              </tr>
            </thead>
            <tbody>
              {jobMatch.map((row) => (
                <tr key={row.need}>
                  <td style={{ fontWeight: 650, color: "var(--navy)" }}>{row.need}</td>
                  <td>{row.experience}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note" style={{ marginTop: 14 }}>
            {jobMatchBoundary}
          </p>
        </div>

        <div className="section__block">
          <div className="card card--navy">
            <div className="eyebrow" style={{ color: "#9fb3c8" }}>
              关于表达方式
            </div>
            <p style={{ marginTop: 8, fontSize: 17, lineHeight: 1.75 }}>
              {identity.positionStatement}
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------- 01 AI落地方法 ---------------- */}
      <Section
        id="s-method"
        no="01"
        title="AI落地方法：先判断价值，再决定要不要上Agent"
        conclusion="一个Prompt能解决的事情，不做复杂Agent；只有涉及多步骤判断、知识来源、跨系统执行或数据反馈时，才提高系统复杂度。"
        tight
      >
        <div className="flow flow--main">
          {methodFive.map((s) => (
            <div className="flow__step" key={s.step}>
              <div className="flow__no">{s.step}</div>
              <div className="flow__name">{s.title}</div>
              <div className="flow__note">{s.note}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- 02 企业AI内容生产体系 ---------------- */}
      <Section
        id="s-content"
        no="02"
        title="企业AI内容生产体系"
        conclusion={chapterOf("ch-content")?.conclusion}
      >
        <div className="grid-12">
          <div className="col-7">
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <img
                src={asset("assets/accounts/audit-dashboard-20260914.png")}
                alt="内容账号后台截图（截图时数据）"
                style={{ width: "100%" }}
              />
              <div style={{ padding: "12px 16px", borderTop: "1px solid var(--line)" }}>
                <span className="chip chip--screenshot">截图时数据</span>
                <span style={{ fontSize: 13, color: "var(--ink-3)", marginLeft: 8 }}>
                  内容账号后台 · 2026-09-14 截图
                </span>
              </div>
            </div>
          </div>

          <div className="col-5 stack-24">
            <div>
              <h3 className="block-title">项目背景</h3>
              <p style={{ color: "var(--ink-2)", fontSize: 15.5 }}>{contentSystem.background}</p>
            </div>
            <div>
              <h3 className="block-title">我具体负责什么</h3>
              <ul style={{ color: "var(--ink-2)", fontSize: 15.5 }}>
                {contentSystem.responsibility.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="section__block">
          <h3 className="block-title">原来的业务问题</h3>
          <ul style={{ color: "var(--ink-2)", fontSize: 15.5 }}>
            {contentSystem.problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="section__block">
          <h3 className="block-title">关键结果</h3>
          <div className="grid-12">
            {contentSystem.results.map((m) => (
              <div className="col-4" key={m.label}>
                <MetricCard metric={m} size="sm" />
              </div>
            ))}
          </div>
          <p className="note" style={{ marginTop: 14 }}>
            所有数字都标注了计算口径；成本和效率属于团队内部统计，不写成经过财务审计的精确数据。
          </p>
        </div>

        <div className="section__block">
          <div className="btn-row">
            <Link className="btn btn--primary" to="/case/content-system">
              查看完整案例（背景 / 流程 / 账号矩阵 / 数据口径）
            </Link>
            <span style={{ fontSize: 13.5, color: "var(--ink-3)" }}>
              详情页保留上一节 / 下一节与提词入口，返回时回到这一屏。
            </span>
          </div>
        </div>
      </Section>

      {/* ---------------- 02 完整工作流 ---------------- */}
      <Section id="s-content-flow" no="02" title="完整工作流：每一步都有模板和检查表" tight>
        <div className="flow">
          {contentSystem.workflow.map((step, i) => (
            <div className="flow__step" key={step}>
              <div className="flow__no">{String(i + 1).padStart(2, "0")}</div>
              <div className="flow__name">{step}</div>
            </div>
          ))}
        </div>
        <div className="grid-12" style={{ marginTop: 20 }}>
          <div className="col-4">
            <MetricCard
              metric={{
                value: "100+",
                label: "场景化Prompt模板",
                scope: "任职期间沉淀并复用的模板数量，覆盖选题、脚本、分镜与质检场景",
                status: "real",
              }}
              size="sm"
            />
          </div>
          <div className="col-8">
            <div className="card card--flat" style={{ height: "100%" }}>
              <h3 className="block-title--sm">复盘结论</h3>
              <ul style={{ color: "var(--ink-2)", fontSize: 15 }}>
                {contentSystem.review.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- 02 账号矩阵 ---------------- */}
      <Section id="s-content-accounts" no="02" title="账号矩阵与代表作品" tight>
        <div className="account-grid">
          {accountList.map((acc) => (
            <article className="account" key={acc.id}>
              <div className="account__shot">
                <img src={asset(acc.image)} alt={`${acc.name} 账号截图`} loading="lazy" />
              </div>
              <div className="account__body">
                <h3 className="account__name">{acc.name}</h3>
                <p className="account__pos">{acc.position}</p>
                <p className="account__role">我的职责：{acc.responsibility}</p>
                <div className="btn-row" style={{ gap: 8 }}>
                  <span className="chip chip--screenshot">{acc.evidence}</span>
                </div>
                <div className="grid-12" style={{ gap: 10 }}>
                  {acc.metrics.map((m) => (
                    <div className="col-6" key={m.label + m.value}>
                      <div className="metric">
                        <div className="metric__value metric__value--sm">{m.value}</div>
                        <div className="metric__label">{m.label}</div>
                        <div className="metric__scope">口径：{m.scope}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {"note" in acc && acc.note && <p className="note">{acc.note}</p>}
              </div>
            </article>
          ))}
        </div>

        <p className="note note--accent" style={{ marginTop: 18 }}>
          {accountTimingNote}
        </p>

        <div className="section__block">
          <h3 className="block-title">代表作品</h3>
          <div className="work-grid">
            {douyinWorks.map((w) => (
              <DouyinWorkCard work={w} key={w.id} />
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- 03 音响视频 ---------------- */}
      <Section
        id="s-video"
        no="03"
        title="面试任务：音响产品视频"
        conclusion="先证明能快速完成具体交付，再证明能把一次制作变成可规模化的生产线。"
      >
        <div className="video-grid">
          {speakerVideos.map((v) => (
            <VideoPlayer item={v} key={v.id} />
          ))}
        </div>

        <div className="grid-12" style={{ marginTop: 22 }}>
          <div className="col-5">
            <h3 className="block-title">任务输入与我的职责</h3>
            <table className="table">
              <tbody>
                <tr>
                  <th style={{ width: 108 }}>输入需求</th>
                  <td>{speakerTask.input}</td>
                </tr>
                <tr>
                  <th>我的职责</th>
                  <td>{speakerTask.responsibility}</td>
                </tr>
                <tr>
                  <th>使用工具</th>
                  <td>{speakerTask.tools}</td>
                </tr>
                <tr>
                  <th>最终交付</th>
                  <td>{speakerTask.delivery}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-7">
            <h3 className="block-title">制作步骤</h3>
            <ol style={{ color: "var(--ink-2)", fontSize: 15.5 }}>
              {speakerTask.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="note" style={{ marginTop: 14 }}>
              {speakerTask.boundary}
            </p>
          </div>
        </div>

        <div className="section__block">
          <div className="card card--navy">
            <div className="eyebrow" style={{ color: "#9fb3c8" }}>
              过渡到下一部分
            </div>
            <p style={{ marginTop: 8, fontSize: 17, lineHeight: 1.75 }}>
              {speakerTask.transition}
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------- 03 3C 内容生产工作流 ---------------- */}
      <Section
        id="s-c3"
        no="03"
        title="从一条音响视频，到一套可规模化的3C内容生产系统"
        conclusion="这是整场展示权重最高的模块：把产品资料变成可复用、可质检、能反馈的内容生产线。"
      >
        <div className="flow flow--main">
          {c3Workflow.map((s) => (
            <div className="flow__step" key={s.step}>
              <div className="flow__no">{s.step}</div>
              <div className="flow__name">{s.name}</div>
              <div className="flow__note">{s.note}</div>
            </div>
          ))}
        </div>

        <div className="section__block">
          <h3 className="block-title">参数 → 用户价值 → 内容场景</h3>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "26%" }}>参数</th>
                <th style={{ width: "30%" }}>用户价值</th>
                <th>内容场景</th>
              </tr>
            </thead>
            <tbody>
              {paramMap.map((row) => (
                <tr key={row.param}>
                  <td style={{ fontWeight: 650, color: "var(--navy)" }}>{row.param}</td>
                  <td>{row.value}</td>
                  <td>{row.scene}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note" style={{ marginTop: 12 }}>
            参数到场景的映射是内容生成的依据，脚本不会自由发挥产品参数。
          </p>
        </div>
      </Section>

      {/* ---------------- 03 质检与数据闭环 ---------------- */}
      <Section
        id="s-c3-qa"
        no="03"
        title="MVP只做三个Skill，质检与人工边界写清楚"
        tight
      >
        <div className="grid-12">
          {mvpSkills.map((s) => (
            <div className="col-4" key={s.id}>
              <div className="card" style={{ height: "100%" }}>
                <span className="chip chip--accent">核心Skill</span>
                <h3 className="block-title" style={{ marginTop: 10, fontSize: 17 }}>
                  {s.name}
                </h3>
                <div className="stack-16" style={{ fontSize: 14, color: "var(--ink-2)" }}>
                  <div>
                    <strong>输入：</strong>
                    {s.input}
                  </div>
                  <div>
                    <strong>输出：</strong>
                    {s.output}
                  </div>
                  <div>
                    <strong>为什么：</strong>
                    {s.why}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section__block">
          <div className="card card--flat">
            <h3 className="block-title--sm">业务量增加后再拆分（当前不做）</h3>
            <div className="btn-row" style={{ marginTop: 6 }}>
              {laterAgents.map((a) => (
                <span className="chip" key={a}>
                  {a}
                </span>
              ))}
            </div>
            <p style={{ marginTop: 10, fontSize: 14, color: "var(--ink-2)" }}>{laterAgentsNote}</p>
          </div>
        </div>

        <div className="section__block grid-12">
          <div className="col-6">
            <div className="card" style={{ height: "100%" }}>
              <h3 className="block-title--sm">
                AI 质检范围 <span className="chip chip--navy">机器先查一遍</span>
              </h3>
              <ul style={{ color: "var(--ink-2)", fontSize: 14.5 }}>
                {qualityBoundary.ai.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-6">
            <div className="card" style={{ height: "100%" }}>
              <h3 className="block-title--sm">
                人工审核边界 <span className="chip chip--accent">最终由人决定</span>
              </h3>
              <ul style={{ color: "var(--ink-2)", fontSize: 14.5 }}>
                {qualityBoundary.human.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="section__block">
          <h3 className="block-title">数据反馈到下一轮内容</h3>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>采集指标</th>
                <th>判断什么</th>
              </tr>
            </thead>
            <tbody>
              {dataLoop.map((row) => (
                <tr key={row.metric}>
                  <td style={{ fontWeight: 650, color: "var(--navy)" }}>{row.metric}</td>
                  <td>{row.judge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ---------------- 04 产品能力证明 ---------------- */}
      <Section
        id="s-director"
        no="04"
        title={aiDirector.title}
        conclusion={chapterOf("ch-product")?.conclusion}
      >
        <div className="grid-12">
          <div className="col-7">
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <img
                src={asset(aiDirector.cover)}
                alt="AI 编导工作台界面截图"
                style={{ width: "100%" }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-5 stack-24">
            <div>
              <EvidenceChip status="demo" />
              <p style={{ marginTop: 8, fontSize: 15.5, fontWeight: 650, color: "var(--navy)" }}>
                {aiDirector.statusLabel}
              </p>
            </div>
            <p style={{ color: "var(--ink-2)", fontSize: 15.5 }}>{aiDirector.summary}</p>
            <div>
              <h3 className="block-title--sm">我的角色</h3>
              <p style={{ color: "var(--ink-2)", fontSize: 15 }}>{aiDirector.role}</p>
            </div>
            <div className="btn-row" style={{ gap: 8 }}>
              {aiDirector.abilities.map((a) => (
                <span className="chip" key={a}>
                  {a}
                </span>
              ))}
            </div>
            <div className="btn-row">
              <Link className="btn btn--primary" to="/case/ai-director">
                查看完整案例（6 个讲解节点）
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section id="s-rag" no="04" title={ragExpert.title} tight>
        <div className="grid-12">
          <div className="col-5 stack-24">
            <div>
              <EvidenceChip status="concept" />
              <p style={{ marginTop: 8, fontSize: 15.5, fontWeight: 650, color: "var(--navy)" }}>
                {ragExpert.statusLabel}
              </p>
            </div>
            <p style={{ color: "var(--ink-2)", fontSize: 15.5 }}>{ragExpert.summary}</p>
            <div>
              <h3 className="block-title--sm">我的角色</h3>
              <p style={{ color: "var(--ink-2)", fontSize: 15 }}>{ragExpert.role}</p>
            </div>
            <div className="btn-row" style={{ gap: 8 }}>
              {ragExpert.abilities.map((a) => (
                <span className="chip" key={a}>
                  {a}
                </span>
              ))}
            </div>
            <div className="btn-row">
              <Link className="btn btn--primary" to="/case/rag-expert">
                查看完整案例（6 个讲解节点）
              </Link>
              <Link className="btn btn--ghost" to="/appendix/product-os">
                更多产品探索
              </Link>
            </div>
          </div>
          <div className="col-7">
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <img
                src={asset(ragExpert.cover)}
                alt="研发费合规专家问答界面截图"
                style={{ width: "100%" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- 05 入职后的四个项目 ---------------- */}
      <Section
        id="s-projects"
        no="05"
        title="加入公司后能做什么：四个项目"
        conclusion={chapterOf("ch-company")?.conclusion}
      >
        <div className="grid-12">
          {companyProjects.map((p) => (
            <div className="col-6" key={p.id}>
              <div className="card" style={{ height: "100%" }}>
                <h3 className="block-title">{p.title}</h3>
                <div className="stack-16" style={{ fontSize: 14.5, color: "var(--ink-2)" }}>
                  <div>
                    <strong style={{ color: "var(--ink)" }}>当前业务问题：</strong>
                    {p.problem}
                  </div>
                  <div>
                    <strong style={{ color: "var(--ink)" }}>解决方案：</strong>
                    {p.solution}
                  </div>
                  <div>
                    <strong style={{ color: "var(--ink)" }}>实施步骤：</strong>
                    <ol style={{ marginTop: 4 }}>
                      {p.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <strong style={{ color: "var(--ink)" }}>需要的数据或系统：</strong>
                    {p.needs}
                  </div>
                  <div>
                    <strong style={{ color: "var(--ink)" }}>人工审核点：</strong>
                    {p.humanGate}
                  </div>
                  <div>
                    <strong style={{ color: "var(--ink)" }}>衡量指标：</strong>
                    <span className="btn-row" style={{ gap: 6, marginTop: 4 }}>
                      {p.metrics.map((m) => (
                        <span className="chip" key={m}>
                          {m}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="note note--accent" style={{ marginTop: 18 }}>
          {geoBoundary}
        </p>
        <p className="note" style={{ marginTop: 10 }}>
          公司具体使用的跨境销售平台以入职后确认为准，以上方案按「API 优先、无 API 时评估 RPA 或定时导出」的通用条件设计。
        </p>
      </Section>

      {/* ---------------- 06 计划与总结 ---------------- */}
      <Section
        id="s-plan"
        no="06"
        title="30 / 60 / 90 天计划"
        conclusion={chapterOf("ch-plan")?.conclusion}
      >
        <div className="grid-12">
          {planPhases.map((p) => (
            <div className="col-4" key={p.id}>
              <div className="card" style={{ height: "100%" }}>
                <span className="chip chip--navy">{p.window}</span>
                <h3 className="block-title" style={{ marginTop: 10, fontSize: 17 }}>
                  {p.title}
                </h3>
                <ul style={{ color: "var(--ink-2)", fontSize: 14.5 }}>
                  {p.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="s-closing" no="06" title="结尾" tight>
        <div className="card card--navy">
          <h3 style={{ fontSize: "clamp(19px, 1.9vw, 26px)", fontWeight: 780, lineHeight: 1.4 }}>
            {closing.title}
          </h3>
          <div className="btn-row" style={{ marginTop: 16, gap: 8 }}>
            {closing.keywords.map((k) => (
              <span
                className="chip"
                key={k}
                style={{ background: "transparent", borderColor: "rgba(255,255,255,.35)", color: "#fff" }}
              >
                {k}
              </span>
            ))}
          </div>
          <p style={{ marginTop: 18, fontSize: 16.5, lineHeight: 1.8, color: "#dbe4ee" }}>
            {closing.script}
          </p>
          <div className="btn-row" style={{ marginTop: 20 }}>
            <a
              className="btn btn--accent"
              href={asset(identity.resume)}
              download="李明杰_AI产品经理简历.pdf"
            >
              下载简历
            </a>
            <span style={{ fontSize: 13.5, color: "#9fb3c8" }}>
              其余 {accounts.length} 个账号的完整截图与数据口径，在「企业AI内容生产体系」详情页中。
            </span>
          </div>
        </div>
      </Section>
    </>
  );
}
