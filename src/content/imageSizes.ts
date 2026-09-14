// 由 scripts/generate-image-sizes.mjs 生成，请勿手改
export interface ImageSize {
  w: number;
  h: number;
}

export const imageSizes: Record<string, ImageSize> = {
  "assets/accounts/audit-dashboard-20260914.png": {
    "w": 1912,
    "h": 956
  },
  "assets/accounts/audit.jpg": {
    "w": 1912,
    "h": 956
  },
  "assets/accounts/chace.jpg": {
    "w": 1912,
    "h": 956
  },
  "assets/accounts/narwhal.png": {
    "w": 1912,
    "h": 956
  },
  "assets/accounts/shenzhouxing.png": {
    "w": 1533,
    "h": 934
  },
  "assets/cases/ai-director/01-input.jpg": {
    "w": 2000,
    "h": 1120
  },
  "assets/cases/ai-director/02-agent-run.jpg": {
    "w": 1055,
    "h": 1370
  },
  "assets/cases/ai-director/03-script.jpg": {
    "w": 915,
    "h": 1480
  },
  "assets/cases/ai-director/04-storyboard.jpg": {
    "w": 2000,
    "h": 1520
  },
  "assets/cases/ai-director/05-review.jpg": {
    "w": 2000,
    "h": 2830
  },
  "assets/cases/ai-director/06-history.jpg": {
    "w": 2000,
    "h": 2600
  },
  "assets/cases/ai-director/full.png": {
    "w": 2000,
    "h": 13417
  },
  "assets/cases/product-os/overview.jpg": {
    "w": 1306,
    "h": 1204
  },
  "assets/cases/rag/01-prd-bg.jpg": {
    "w": 1280,
    "h": 2050
  },
  "assets/cases/rag/02-architecture.jpg": {
    "w": 1280,
    "h": 800
  },
  "assets/cases/rag/03-prototype.jpg": {
    "w": 1280,
    "h": 1700
  },
  "assets/cases/rag/04-rag-design.jpg": {
    "w": 1280,
    "h": 1450
  },
  "assets/cases/rag/05-question.jpg": {
    "w": 880,
    "h": 310
  },
  "assets/cases/rag/full.png": {
    "w": 1280,
    "h": 12295
  },
  "assets/cases/rag/qa-home.jpg": {
    "w": 1272,
    "h": 953
  },
  "assets/video/speaker-01-poster.jpg": {
    "w": 720,
    "h": 1280
  },
  "assets/video/speaker-02-poster.jpg": {
    "w": 720,
    "h": 1280
  }
};

/** 按 public 相对路径取图片尺寸；取不到时返回 undefined */
export function sizeOf(path: string): ImageSize | undefined {
  return imageSizes[path.replace(/^\/+/, "")];
}
