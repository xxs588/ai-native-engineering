import { defineConfig, devices } from "@playwright/test";

const remoteBaseURL = process.env.E2E_BASE_URL;

if (!remoteBaseURL) {
  throw new Error(
    "E2E_BASE_URL is required. Playwright smoke checks now run against Netlify URLs only.",
  );
}

export default defineConfig({
  testDir: "./tests/e2e",
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [
        ["list"],
        ["html", { open: "never", outputFolder: "playwright-report" }],
        ["junit", { outputFile: "test-results/junit.xml" }],
      ]
    : "list",
  use: {
    baseURL: remoteBaseURL,
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
