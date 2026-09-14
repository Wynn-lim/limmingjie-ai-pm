import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * 离线版构建：base 用相对路径，产物可以直接双击 index.html 打开，
 * 不依赖网络、不依赖本地服务器，也不影响 GitHub Pages 的正式构建。
 *
 * 用法：npm run build:offline  →  dist-offline/
 */
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist-offline",
    // 字体（约 40KB）直接内嵌进 CSS，避免 file:// 下的字体跨域限制
    assetsInlineLimit: 400_000,
    emptyOutDir: true,
  },
});
