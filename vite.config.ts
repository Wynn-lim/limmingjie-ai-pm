import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 项目路径 —— 必须与本仓库名称一致。
// WorkBuddy 版本独立部署，不得使用 Codex 版或旧作品集的 base。
export const REPO_BASE = "/limmingjie-ai-pm/";

export default defineConfig({
  base: REPO_BASE,
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    exclude: ["e2e/**", "node_modules/**", "dist/**"],
  },
});
