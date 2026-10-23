import { asset } from "../../content/portfolio";
import type { CaseBeat } from "../../types/portfolio";
import { usePresentation } from "../../presentation/PresentationContext";
import ImageZoom from "../media/ImageZoom";

/**
 * 截图型案例的一步。
 * 页面正文只写业务内容（界面说明 / 业务问题 / 我的工作 / 设计取舍）；
 * 「讲这一屏时这样说」只在演示模式下出现，普通浏览（面试官自己看）时不显示。
 */
export default function BeatCard({ beat, index }: { beat: CaseBeat; index: number }) {
  const { mode } = usePresentation();
  const presenting = mode !== "browse";

  return (
    <div className="beat" data-testid={`beat-${beat.id}`}>
      <div className="beat__media">
        <div className="frame">
          <div className="frame__bar">
            <span className="frame__dots" aria-hidden="true">
              <span className="frame__dot" />
              <span className="frame__dot" />
              <span className="frame__dot" />
            </span>
            <span className="frame__label">
              {String(index).padStart(2, "0")} · {beat.title}
            </span>
          </div>
          <div className="frame__body">
            <ImageZoom
              images={[{ src: asset(beat.image), label: beat.title, sizePath: beat.image }]}
              imgClassName="beat__image"
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="beat__title">
          <span className="beat__index">{String(index).padStart(2, "0")}</span>
          {beat.title}
        </h3>
        <div className="beat__dl">
          <div className="beat__row">
            <span className="beat__key">界面说明</span>
            <span className="beat__val">{beat.what}</span>
          </div>
          <div className="beat__row">
            <span className="beat__key">业务问题</span>
            <span className="beat__val">{beat.problem}</span>
          </div>
          <div className="beat__row">
            <span className="beat__key">我的工作</span>
            <span className="beat__val">{beat.did}</span>
          </div>
          <div className="beat__row">
            <span className="beat__key">设计取舍</span>
            <span className="beat__val">{beat.why}</span>
          </div>
        </div>
        {presenting && (
          <p className="beat__say">
            <span className="beat__say-tag">讲这一屏时这样说</span>
            {beat.say}
          </p>
        )}
      </div>
    </div>
  );
}
