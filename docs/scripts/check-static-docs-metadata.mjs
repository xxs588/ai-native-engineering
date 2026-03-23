import fs from "node:fs/promises";
import path from "node:path";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is required for metadata verification.",
  );
}

const origin = new URL(siteUrl).origin;
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const normalizedBasePath =
  configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");
const expectedPrefix = `${origin}${normalizedBasePath}`;

const outDir = path.resolve("out");
const docsDir = path.join(outDir, "docs");
const files = [path.join(outDir, "docs.html")];

async function collectHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const target = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await collectHtmlFiles(target);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(target);
    }
  }
}

function extractValue(html, pattern, label, file) {
  const match = html.match(pattern);
  if (!match?.[1]) {
    throw new Error(`Missing ${label} in ${file}`);
  }

  return match[1];
}

await collectHtmlFiles(docsDir);

for (const file of files) {
  const html = await fs.readFile(file, "utf8");

  if (html.includes("http://localhost:3000")) {
    throw new Error(`Found localhost metadata in ${file}`);
  }

  const canonical = extractValue(
    html,
    /<link rel="canonical" href="([^"]+)"/,
    "canonical",
    file,
  );
  const ogImage = extractValue(
    html,
    /<meta property="og:image" content="([^"]+)"/,
    "og:image",
    file,
  );

  if (!canonical.startsWith(`${expectedPrefix}/docs`)) {
    throw new Error(
      `Canonical URL in ${file} is missing the expected docs base path: ${canonical}`,
    );
  }

  if (!ogImage.startsWith(`${expectedPrefix}/og/docs/`)) {
    throw new Error(
      `OG image URL in ${file} is missing the expected base path: ${ogImage}`,
    );
  }

  const copyrightLink = extractValue(
    html,
    /<a href="([^"]+)" class="max-w-full truncate text-fd-primary underline"/,
    "copyright link",
    file,
  );

  if (!copyrightLink.startsWith(`${normalizedBasePath}/docs`)) {
    throw new Error(
      `Copyright link in ${file} is missing the expected docs base path: ${copyrightLink}`,
    );
  }
}

console.log(`Verified static metadata for ${files.length} docs pages.`);
