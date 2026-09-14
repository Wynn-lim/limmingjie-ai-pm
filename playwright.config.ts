import { defineConfig, devices } from "@playwright/test";

const BASE = "http://127.0.0.1:4173/limmingjie-ai-pm/";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: BASE,
    trace: "off",
    video: "off",
    screenshot: "off",
  },
  webServer: {
    command:
      "C:/Users/Administrator/.workbuddy/binaries/node/versions/22.22.2-3/npm.cmd run preview -- --port 4173 --strictPort",
    url: BASE,
    reuseExistingServer: true,
    timeout: 120_000,
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
