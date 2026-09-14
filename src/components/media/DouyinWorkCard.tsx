import { asset, douyinCoverNote, douyinNotice } from "../../content/portfolio";
import type { DouyinWork } from "../../types/portfolio";

/**
 * 抖音代表作品卡。
 * 三条链接均为单条作品分享链接（不是账号主页），按钮文案统一为「查看代表作品」。
 * 新标签页打开并带 rel="noopener noreferrer"。
 */
export default function DouyinWorkCard({ work }: { work: DouyinWork }) {
  return (
    <article className="work" data-testid={`douyin-${work.id}`}>
      <div className="work__cover">
        <img src={asset(work.cover)} alt={`${work.account} 账号内容截图`} loading="lazy" />
      </div>
      <div className="work__body">
        <div className="work__account">{work.account}</div>
        <h3 className="work__title">{work.workTitle}</h3>
        <p className="work__summary">{work.summary}</p>
        <div className="work__meta">
          <span>内容定位：{work.position}</span>
          <span>我的职责：{work.responsibility}</span>
        </div>

        {work.url ? (
          <>
            <div className="btn-row" style={{ marginTop: 4 }}>
              <a
                className="btn btn--primary btn--sm"
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {work.ctaLabel}
              </a>
            </div>
            <div className="work__qr">
              {work.qr && (
                <img src={asset(work.qr)} alt={`${work.workTitle} 二维码`} loading="lazy" />
              )}
              <div className="work__qr-text">
                <p>{douyinNotice}</p>
                <p style={{ marginTop: 6 }}>{douyinCoverNote}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="note" style={{ marginTop: 4 }}>
            该账号只展示截图，本站不提供外部链接。
          </p>
        )}
      </div>
    </article>
  );
}
