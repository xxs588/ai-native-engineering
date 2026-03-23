const DEFAULT_REPOSITORY = "TatsukiMeng/ai-native-engineering";
const DEFAULT_WORKFLOW = "netlify-smoke.yml";
const DEFAULT_REF = "main";
const SUPPORTED_CONTEXTS = new Set(["production", "deploy-preview"]);

function getEnv(name) {
  return globalThis.Netlify?.env?.get?.(name) ?? process.env[name];
}

function pickFirstString(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

function normalizeUrl(value) {
  const candidate = pickFirstString(value);
  if (!candidate) return undefined;

  try {
    const parsed = new URL(candidate);
    const normalizedPath =
      parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/$/, "");

    return `${parsed.origin}${normalizedPath}`;
  } catch {
    return undefined;
  }
}

function resolveDeployUrl(payload, site) {
  return normalizeUrl(
    payload?.deploy_ssl_url,
    payload?.ssl_url,
    payload?.deploy_url,
    payload?.url,
    payload?.links?.permalink,
    payload?.links?.alias,
    site?.ssl_url,
    site?.url,
  );
}

function resolveSiteName(site, deployUrl) {
  const explicitName = pickFirstString(site?.name);
  if (explicitName) return explicitName;

  if (!deployUrl) return "unknown-site";

  try {
    const host = new URL(deployUrl).hostname;
    return host.replace(/\.netlify\.app$/, "");
  } catch {
    return "unknown-site";
  }
}

function resolveContext(payload) {
  return pickFirstString(payload?.context, payload?.deploy_context);
}

function resolveBranch(payload, site) {
  return pickFirstString(
    payload?.branch,
    payload?.branch_name,
    payload?.head,
    site?.published_branch,
    DEFAULT_REF,
  );
}

function resolveCommitRef(payload) {
  return pickFirstString(payload?.commit_ref, payload?.sha, payload?.commit);
}

function resolveReviewId(payload) {
  const numericCandidate =
    payload?.review_id ?? payload?.review_number ?? payload?.number;

  if (typeof numericCandidate === "number") {
    return String(numericCandidate);
  }

  return pickFirstString(numericCandidate);
}

async function dispatchWorkflow({ repository, workflow, token, ref, inputs }) {
  const response = await fetch(
    `https://api.github.com/repos/${repository}/actions/workflows/${workflow}/dispatches`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        ref,
        inputs,
      }),
    },
  );

  return response;
}

export default async (req) => {
  const token = pickFirstString(getEnv("GITHUB_DISPATCH_TOKEN"));
  if (!token) {
    throw new Error("Missing GITHUB_DISPATCH_TOKEN for Netlify smoke dispatch.");
  }

  const body = await req.json();
  const payload = body?.payload ?? {};
  const site = body?.site ?? {};
  const deployContext = resolveContext(payload);

  if (!SUPPORTED_CONTEXTS.has(deployContext ?? "")) {
    console.log(
      `Skipping smoke dispatch for unsupported Netlify context: ${deployContext ?? "unknown"}`,
    );
    return;
  }

  const deployUrl = resolveDeployUrl(payload, site);
  if (!deployUrl) {
    throw new Error("Netlify event payload is missing a deploy URL.");
  }

  const repository =
    pickFirstString(getEnv("NETLIFY_SMOKE_REPOSITORY")) ?? DEFAULT_REPOSITORY;
  const workflow =
    pickFirstString(getEnv("NETLIFY_SMOKE_WORKFLOW")) ?? DEFAULT_WORKFLOW;
  const branch = resolveBranch(payload, site) ?? DEFAULT_REF;
  const inputs = {
    deploy_url: deployUrl,
    deploy_context: deployContext ?? "unknown",
    site_name: resolveSiteName(site, deployUrl),
    branch,
    commit_ref: resolveCommitRef(payload) ?? "",
    deploy_id: pickFirstString(payload?.id, payload?.deploy_id) ?? "",
    review_id: resolveReviewId(payload) ?? "",
  };

  const refCandidates = Array.from(new Set([branch, DEFAULT_REF]));
  let lastFailure = "";

  for (const ref of refCandidates) {
    const response = await dispatchWorkflow({
      repository,
      workflow,
      token,
      ref,
      inputs,
    });

    if (response.ok) {
      console.log(
        `Dispatched ${workflow} for ${deployContext} deploy ${deployUrl} on ref ${ref}.`,
      );
      return;
    }

    lastFailure = await response.text();
    console.error(
      `Failed to dispatch ${workflow} on ref ${ref}: ${response.status} ${lastFailure}`,
    );
  }

  throw new Error(
    `Unable to dispatch ${workflow} for ${deployUrl}. Last failure: ${lastFailure}`,
  );
};
