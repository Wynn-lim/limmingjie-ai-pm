// 把离线版的 CSS / JS 内联进 index.html。
// file:// 下 Chrome 会因 CORS 拦截模块脚本与外部样式表，内联后即可双击打开。
//
// 注意：必须用「函数式替换」。String.replace 的替换串会把 $&、$'、$1 之类
// 当成替换变量，而打包后的 JS 里含有大量 $ 符号，会直接把产物写坏。
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

const dir = resolve(process.cwd(), "dist-offline");
const indexPath = join(dir, "index.html");
let html = await readFile(indexPath, "utf8");
const assets = await readdir(join(dir, "assets"));

const cssFiles = assets.filter((f) => f.endsWith(".css"));
const jsFiles = assets.filter((f) => f.endsWith(".js"));

for (const f of cssFiles) {
  const css = await readFile(join(dir, "assets", f), "utf8");
  const linkRe = new RegExp(`<link[^>]*href="[^"]*${f}"[^>]*>`, "g");
  html = html.replace(linkRe, () => `<style>\n${css}\n</style>`);
}

for (const f of jsFiles) {
  const js = await readFile(join(dir, "assets", f), "utf8");
  const scriptRe = new RegExp(`<script[^>]*src="[^"]*${f}"[^>]*></script>`, "g");
  // 内联为模块脚本：不需要再发起网络请求，file:// 下即可执行
  html = html.replace(scriptRe, () => `<script type="module">\n${js}\n</script>`);
}

await writeFile(indexPath, html, "utf8");

const head = html.slice(0, html.indexOf("</head>"));
const externalCss = (head.match(/<link[^>]*rel="stylesheet"/g) ?? []).length;
const externalJs = (html.match(/<script[^>]*\ssrc=/g) ?? []).length;
console.log(
  `inline-offline: css=${cssFiles.length} js=${jsFiles.length} 外部样式表=${externalCss} 外部脚本=${externalJs}`,
);
