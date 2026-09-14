import { asset } from "../../content/portfolio";
import type { CaseBeat } from "../../types/portfolio";
import ImageZoom from "../media/ImageZoom";

/**
 * 截图型案例的讲解节点。
 * 每张截图旁固定显示：这一屏是什么 / 解决什么问题 / 我做了什么 / 为什么这样设计 / 这一页怎么讲。
 */
export default function BeatCard({ beat, index }: { beat: CaseBeat; index: number }) {
  return (
    <div className="beat" data-testid={`beat-${beat.id}`}>
      <div className="beat__media">
        <ImageZoom
          images={[{ src: asset(beat.image), label: beat.title }]}
          imgClassName="beat__image"
        />
      </div>
      <div>
        <h3 className="beat__title">
          <span className="beat__index">{String(index).padStart(2, "0")}</span>
          {beat.title}
        </h3>
        <div className="beat__dl">
          <div className="beat__row">
            <span className="beat__key">这一屏是什么</span>
            <span className="beat__val">{beat.what}</span>
          </div>
          <div className="beat__row">
            <span className="beat__key">解决什么问题</span>
            <span className="beat__val">{beat.problem}</span>
          </div>
          <div className="beat__row">
            <span className="beat__key">我做了什么</span>
            <span className="beat__val">{beat.did}</span>
          </div>
          <div className="beat__row">
            <span className="beat__key">为什么这样设计</span>
            <span className="beat__val">{beat.why}</span>
          </div>
        </div>
        <p className="beat__say">这一页怎么讲：{beat.say}</p>
      </div>
    </div>
  );
}
