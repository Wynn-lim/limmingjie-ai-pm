import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

const BASE = "http://127.0.0.1:4173/limmingjie-ai-pm/";

/**
 * 本机已存在的 Chromium。若 `npx playwright install chromium` 下载的可执行文件
 * 不在默认位置，这里会回退到本机 ms-playwright 缓存里的版本，保证离线也能跑验收。
 */
const LOCAL_CHROMIUM =
  "C:/Users/Administrator/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe";
const useLocalChromium = existsSync(LOCAL_CHROMIUM);

export default defineConfig({
  testDir: "./e2e",
  testIgnore: ["**/_*.mjs"],
  timeout: 60_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: BASE,
    trace: "off",
    video: "off",
    screenshot: "off",
    ...(useLocalChromium ? { launchOptions: { executablePath: LOCAL_CHROMIUM } } : {}),
  },
  webServer: {
    command: `${JSON.stringify(process.execPath)} scripts/serve-dist.mjs 4173 /limmingjie-ai-pm/`,
    url: BASE,
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    {
      name: "1440x900",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "1366x768",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 768 } },
    },
    {
      name: "390x844",
      use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } },
    },
  ],
});
