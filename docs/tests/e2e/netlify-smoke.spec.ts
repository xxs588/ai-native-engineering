import { expect, test } from "@playwright/test";

const docsOverviewPath = "/docs/02-foundation";
const markdownPath = "/llms.mdx/docs/02-foundation/00-overview.mdx";

function buildUrl(baseURL: string | undefined, route: string) {
  if (!baseURL) {
    throw new Error("E2E_BASE_URL is required for Netlify smoke checks.");
  }

  const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
  const parsedBase = new URL(baseURL);
  const basePath =
    parsedBase.pathname === "/" ? "" : parsedBase.pathname.replace(/\/$/, "");

  return `${parsedBase.origin}${basePath}${normalizedRoute}`;
}

test.describe("Netlify smoke", () => {
  test("core routes are reachable", async ({ request, baseURL }) => {
    for (const route of ["/", "/docs", docsOverviewPath]) {
      const response = await request.get(buildUrl(baseURL, route));
      expect(response.status(), `Route ${route} should return < 400`).toBeLessThan(
        400,
      );
    }
  });

  test("docs page renders and markdown endpoint is inline text", async ({
    page,
    request,
    baseURL,
  }) => {
    await page.goto(buildUrl(baseURL, docsOverviewPath), {
      waitUntil: "domcontentloaded",
    });

    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("article h1").first()).toBeVisible();

    const response = await request.get(buildUrl(baseURL, markdownPath));
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"] ?? "").toContain("text/plain");
    expect(response.headers()["content-disposition"] ?? "").toContain("inline");

    const content = await response.text();
    expect(content.startsWith("# ")).toBe(true);
    expect(content.length).toBeGreaterThan(100);
  });

  test("docs metadata does not leak localhost", async ({ page, baseURL }) => {
    await page.goto(buildUrl(baseURL, docsOverviewPath), {
      waitUntil: "domcontentloaded",
    });

    const canonical = await page
      .locator('link[rel="canonical"]')
      .first()
      .getAttribute("href");
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .first()
      .getAttribute("content");

    expect(canonical, "Canonical URL should exist").toBeTruthy();
    expect(ogImage, "og:image should exist").toBeTruthy();
    expect(canonical ?? "").not.toContain("localhost");
    expect(ogImage ?? "").not.toContain("localhost");
  });
});
