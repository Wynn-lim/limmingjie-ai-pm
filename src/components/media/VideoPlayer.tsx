import { asset } from "../../content/portfolio";

interface VideoItem {
  id: string;
  src: string;
  poster: string;
  title: string;
  spec: string;
  caption: string;
}

/**
 * 音响产品视频：提供播放、暂停、静音与全屏（浏览器原生 controls）。
 * 禁止自动播放声音 —— 不设置 autoplay；preload 使用 metadata；
 * 加载失败时仍显示 poster 与替代说明。
 */
export default function VideoPlayer({ item }: { item: VideoItem }) {
  return (
    <div className="video-card">
      <video
        controls
        playsInline
        preload="metadata"
        poster={asset(item.poster)}
        aria-label={item.title}
        data-testid={`video-${item.id}`}
      >
        <source src={asset(item.src)} type="video/mp4" />
        您的浏览器不支持视频播放。可直接打开{" "}
        <a href={asset(item.src)} target="_blank" rel="noopener noreferrer">
          视频原文件
        </a>
        。
      </video>
      <div className="video-card__body">
        <h3 className="video-card__title">{item.title}</h3>
        <p className="video-card__spec">{item.spec}</p>
        <p className="video-card__caption">{item.caption}</p>
        <p className="video-fallback">
          若视频无法加载，页面仍保留封面与说明；也可点击{" "}
          <a href={asset(item.src)} target="_blank" rel="noopener noreferrer">
            在这里
          </a>{" "}
          直接打开视频文件。
        </p>
      </div>
    </div>
  );
}
