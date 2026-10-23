import { useCallback, useEffect, useState } from "react";
import { sizeOf } from "../../content/imageSizes";

export interface ZoomImage {
  src: string;
  label: string;
  /** public 相对路径，用于读取原始尺寸并预留空间，避免加载时跳动 */
  sizePath?: string;
}

/**
 * 图片放大与左右切换。带键盘 Esc 关闭、←/→ 切换。
 * 主要信息不放大也要能读懂，放大只作为补充。
 */
export default function ImageZoom({
  images,
  index = 0,
  className,
  imgClassName,
}: {
  images: ZoomImage[];
  index?: number;
  className?: string;
  imgClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(index);

  const close = useCallback(() => setOpen(false), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setCursor((c) => (c + dir + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close, open, step]);

  const first = images[index] ?? images[0];
  const current = images[cursor] ?? first;
  if (!first || !current) return null;

  const thumbSize = sizeOf(first.sizePath ?? "");
  const fullSize = sizeOf(current.sizePath ?? "");

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          setCursor(index);
          setOpen(true);
        }}
        aria-label={`放大查看：${first.label}`}
        style={{ display: "block", width: "100%", padding: 0, textAlign: "left" }}
      >
        <img
          src={first.src}
          alt={first.label}
          className={imgClassName}
          width={thumbSize?.w}
          height={thumbSize?.h}
          loading="lazy"
        />
      </button>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="图片放大查看">
          <div className="lightbox__bar">
            <span className="lightbox__title">{current.label}</span>
            <span className="pbar__meta" style={{ color: "#93a9c0" }}>
              {cursor + 1} / {images.length}
            </span>
            {images.length > 1 && (
              <>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => step(-1)}>
                  上一张
                </button>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => step(1)}>
                  下一张
                </button>
              </>
            )}
            <button type="button" className="btn btn--ghost btn--sm" onClick={close}>
              关闭
            </button>
          </div>
          <div className="lightbox__stage">
            <img
              src={current.src}
              alt={current.label}
              width={fullSize?.w}
              height={fullSize?.h}
            />
          </div>
        </div>
      )}
    </>
  );
}
