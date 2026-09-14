// 构建前为三条抖音代表作品生成二维码（静态 SVG，页面不需要联网生成）
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../public/assets/qr");

/** 与 src/content/portfolio.ts 中的 douyinWorks 一一对应，URL 必须完全一致 */
const targets = [
  { file: "work-chace.svg", url: "https://v.douyin.com/6r87UrzkyTM/" },
  { file: "work-narwhal.svg", url: "https://v.douyin.com/W8sCBsXM0c0/" },
  { file: "work-shenzhouxing.svg", url: "https://v.douyin.com/tvaTDnOoD5E/" },
];

const color = { dark: "#0f2035ff", light: "#ffffffff" };

await mkdir(outDir, { recursive: true });

for (const t of targets) {
  const svg = await QRCode.toString(t.url, {
    type: "svg",
    margin: 1,
    width: 240,
    errorCorrectionLevel: "M",
    color,
  });
  await writeFile(resolve(outDir, t.file), svg, "utf8");
  console.log(`qr -> public/assets/qr/${t.file}  ${t.url}`);
}
