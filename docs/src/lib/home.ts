import { getCanonicalPageUrl, source } from "@/lib/source";

type PartDefinition = {
  slug: string;
  highlight: string;
  tags: string[];
};

export type HomePart = PartDefinition & {
  title: string;
  description: string;
  url: string;
  chapterCount: number;
};

export type HomeQuickLink = {
  title: string;
  description: string;
  url: string;
};

export type HomePageData = {
  entryUrl: string;
  firstPartUrl: string;
  totalParts: number;
  totalChapters: number;
  parts: HomePart[];
  quickLinks: HomeQuickLink[];
};

const partDefinitions: PartDefinition[] = [
  {
    slug: "01-breakthrough",
    highlight: "先把脑回路掰过来",
    tags: ["范式转移", "工具判断", "控制面轮廓"],
  },
  {
    slug: "02-reefs",
    highlight: "先演练它会怎么死",
    tags: ["调试失控", "测试自洽", "规则与兜底"],
  },
  {
    slug: "03-project-core",
    highlight: "项目主线正式开工",
    tags: ["需求收敛", "架构设计", "前后端主链"],
  },
  {
    slug: "04-project-execution",
    highlight: "给项目装上手和眼",
    tags: ["CLI / Harness", "MCP", "Playwright"],
  },
  {
    slug: "05-governance",
    highlight: "从能做完到能长期跑",
    tags: ["成本治理", "Swarm 编排", "Context 治理"],
  },
];

export const bookHighlights = [
  {
    title: "先把旧脑回路掰过来",
    description:
      "Part 1 不负责把概念一次讲透，它先解决一件更重要的事：让读者意识到，很多时候不是 AI 笨，而是工作流还停在补全时代。",
  },
  {
    title: "项目不是例子，而是全书主线",
    description:
      "这本书不是每章换一个 demo。项目会从 Part 1 被抛出来，在 Part 2 先预演翻车，再在 Part 3 和 Part 4 真正做起来，最后在 Part 5 进入治理。",
  },
  {
    title: "真正要学的是控制面",
    description:
      "任务怎么拆、Context 怎么喂、Rules 怎么写、Skill 怎么沉淀、失败了怎么回滚，这些控制面能力才是把 AI 用成工程系统的关键。",
  },
] as const;

export const readerTypes = [
  "已经会用 Cursor、Copilot、Claude Code 这类工具，但总觉得 AI 一会儿聪明一会儿犯傻的人。",
  "被“AI 很笨、很贵、总在改错代码”折磨过，想知道问题到底出在哪的人。",
  "不满足于写几个 demo 或玩具自动化，而是想把 AI 真正接进项目主线的人。",
] as const;

export const learningOutcomes = [
  "理解从 Prompt 到 Context、再到 Agent Harness 的分层，不再把所有问题都粗暴归因成“模型不够强”。",
  "会把任务拆解、规则约束、验证链路、回滚兜底组织成一条可运行的工程工作流。",
  "能把 AI 从一个时灵时不灵的外挂，升级成可复用、可控、可治理的生产系统。",
] as const;

export const readingSteps = [
  {
    step: "01",
    title: "先读前言和 Part 1",
    description:
      "先看这条从古法编程到 Agentic Coding 的进化路线，再理解为什么“你写 AI 补”已经不够用了。",
  },
  {
    step: "02",
    title: "进入 Part 2，先看项目会怎么翻车",
    description:
      "别急着开工，先把黑盒面条代码、测试自洽、上下文污染和调试失控这些坑看明白。",
  },
  {
    step: "03",
    title: "再进入 Part 3 和 Part 4 把项目做起来",
    description:
      "从需求、架构、数据库、前后端主链，到 CLI、MCP、Playwright，把同一个项目真正推进到可交付。",
  },
  {
    step: "04",
    title: "最后再看 Part 5 的治理问题",
    description:
      "当项目已经能跑，真正的问题才开始：成本、Swarm、共享记忆、Context 治理和反脆弱设计。",
  },
] as const;

export function getHomePageData(): HomePageData {
  const pages = source.getPages();
  const preface = source.getPage(["00-preface"]);
  const contentPages = pages.filter(
    (page) => page.slugs.at(-1) !== "00-overview",
  );

  const parts = partDefinitions
    .map((definition) => {
      const overview = source.getPage([definition.slug, "00-overview"]);
      if (!overview) return null;

      const chapterCount = pages.filter(
        (page) =>
          page.slugs[0] === definition.slug &&
          page.slugs.at(-1) !== "00-overview",
      ).length;

      return {
        ...definition,
        title: overview.data.title,
        description: overview.data.description ?? "",
        url: getCanonicalPageUrl(overview.url),
        chapterCount,
      } satisfies HomePart;
    })
    .filter((part): part is HomePart => part !== null);

  const entryUrl = preface ? getCanonicalPageUrl(preface.url) : "/docs";

  const quickLinks = [
    preface
      ? {
          title: preface.data.title,
          description: preface.data.description ?? "",
          url: getCanonicalPageUrl(preface.url),
        }
      : null,
    ...parts.map((part) => ({
      title: part.title,
      description: part.highlight,
      url: part.url,
    })),
  ].filter((item): item is HomeQuickLink => item !== null);

  return {
    entryUrl,
    firstPartUrl: parts[0]?.url ?? "/docs",
    totalParts: parts.length,
    totalChapters: contentPages.length,
    parts,
    quickLinks,
  };
}
