import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: "TatsukiMeng",
  repo: "ai-native-engineering",
  branch: "main",
};

const navLinks: LinkItemType[] = [
  {
    text: "首页",
    url: "/",
    active: "url",
    on: "nav",
  },
  {
    text: "文档",
    url: "/docs",
    active: "nested-url",
    on: "nav",
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "AI 原生工程",
      url: "/",
    },
    links: navLinks,
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
