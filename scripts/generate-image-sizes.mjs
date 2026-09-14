// 生成图片尺寸表，供 <img width/height> 使用，避免加载时的布局跳动
import { readdir, stat, writeFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(process.cwd(), "public");
// 允许通过环境变量指定 ffprobe；默认走 PATH，保证 CI 上也能跑
const ffprobe = process.env.FFPROBE || "ffprobe";

const exts = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const found = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (exts.has(extname(entry.name).toLowerCase())) {
      found.push(full);
    }
  }
}

await walk(root);

const sizes = {};
for (const file of found.sort()) {
  const out = execFileSync(
    ffprobe,
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height",
      "-of",
      "csv=p=0",
      file,
    ],
    { encoding: "utf8" },
  ).trim();
  const [w, h] = out.split(",").map((n) => Number(n.trim()));
  if (!w || !h) continue;
  const key = relative(root, file).split("\\").join("/");
  sizes[key] = { w, h };
}

const body = `// 由 scripts/generate-image-sizes.mjs 生成，请勿手改
export interface ImageSize {
  w: number;
  h: number;
}

export const imageSizes: Record<string, ImageSize> = ${JSON.stringify(sizes, null, 2)};

/** 按 public 相对路径取图片尺寸；取不到时返回 undefined */
export function sizeOf(path: string): ImageSize | undefined {
  return imageSizes[path.replace(/^\\/+/, "")];
}
`;

await writeFile(resolve(process.cwd(), "src/content/imageSizes.ts"), body, "utf8");
await stat(resolve(process.cwd(), "src/content/imageSizes.ts"));
console.log(`image sizes -> ${Object.keys(sizes).length} entries`);
