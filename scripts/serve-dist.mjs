// 供 Playwright 使用的极简静态服务器（等价于 vite preview 的行为）
// 用法：node scripts/serve-dist.mjs [port] [base]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const port = Number(process.argv[2] ?? 4173);
const base = process.argv[3] ?? "/limmingjie-ai-pm/";
const root = resolve(process.cwd(), "dist");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
};

async function send(res, filePath, status = 200) {
  try {
    const buf = await readFile(filePath);
    res.writeHead(status, { "content-type": types[extname(filePath)] ?? "application/octet-stream" });
    res.end(buf);
    return true;
  } catch {
    return false;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  let pathname = decodeURIComponent(url.pathname);

  if (!pathname.startsWith(base)) {
    // 允许直接访问根路径（方便本地手工查看）
    if (pathname === "/") pathname = base;
    else {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("404");
      return;
    }
  }

  const rel = pathname.slice(base.length);
  const target = normalize(join(root, rel));

  if (!target.startsWith(root)) {
    res.writeHead(403).end("403");
    return;
  }

  if (rel === "" || rel.endsWith("/")) {
    if (await send(res, join(root, "index.html"))) return;
  } else {
    try {
      const s = await stat(target);
      if (s.isFile()) {
        const type = types[extname(target)] ?? "";
        const status = type === "video/mp4" || type === "application/pdf" ? 200 : 200;
        if (await send(res, target, status)) return;
      }
    } catch {
      /* 交给 SPA 兜底 */
    }
  }

  // SPA 兜底：Hash 路由只需要 index.html
  if (await send(res, join(root, "index.html"))) return;
  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("404");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`serve-dist: http://127.0.0.1:${port}${base}`);
});
