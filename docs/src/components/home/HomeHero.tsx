import { DocsDescription, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { BookOpen, Github, Rocket } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import type { HomeQuickLink } from "@/lib/home";
import { HomeMetaRow } from "./HomeMetaRow";
import styles from "./home.module.css";
import { withContentDelay } from "./motion";

type HomeHeroProps = {
  entryUrl: string;
  totalParts: number;
  totalChapters: number;
  quickLinks: HomeQuickLink[];
};

export function HomeHero({
  entryUrl,
  totalParts,
  totalChapters,
  quickLinks,
}: HomeHeroProps) {
  return (
    <section
      className="onload-animation"
      style={withContentDelay(180) as CSSProperties}
    >
      <HomeMetaRow totalParts={totalParts} totalChapters={totalChapters} />

      <div className="relative z-10">
        <DocsTitle className="mb-3 block w-full font-bold transition md:before:absolute md:before:top-[0.75rem] md:before:left-[-1.125rem] md:before:h-5 md:before:w-1 md:before:rounded-md md:before:bg-fd-primary">
          AI 原生工程
        </DocsTitle>
      </div>

      <DocsDescription className={styles.pageDescription}>
        从“你写 AI 补”到“你说 AI 做”，把 AI
        从一个时灵时不灵的外挂，变成一套能稳定推进大项目的工程工作流。
      </DocsDescription>

      <p className={styles.bodyText}>
        这本书不是 AI
        工具图鉴，也不是热词科普合集。它来自一条很典型、也很笨拙的进化路线：从把代码贴进聊天框、手动复制粘贴，到研究
        Agentic Coding 系统的控制面，再到把 AI 当成能持续协作的“虚拟员工”。
        整本书真正想回答的是：为什么很多人觉得 AI
        很笨，其实往往是工作流还停在补全时代；以及怎样把这种不稳定的提效感，升级成你真敢拿去做大项目的工程系统。
      </p>

      <div className="mt-4 mb-5 flex flex-col gap-4 border-b border-dashed border-fd-border pb-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-fd-foreground/55">
            <BookOpen className="h-4 w-4 text-fd-primary" />
            推荐入口
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickLinks.slice(0, 4).map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="link-lg transition text-50 text-sm font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)] whitespace-nowrap"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <ButtonLink href={entryUrl} variant="regular" size="regularText">
            从前言开始
          </ButtonLink>

          <ButtonLink href="#catalogue" variant="regular" size="regularText">
            查看主线
          </ButtonLink>

          <ButtonLink
            href="https://github.com/TatsukiMeng/ai-native-engineering"
            variant="regular"
            size="regularText"
            className="gap-2"
          >
            <Github className="h-4 w-4" />
            GitHub
          </ButtonLink>
        </div>
      </div>

      <div className={styles.dashedPanel}>
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-fd-primary">
          <Rocket className="h-4 w-4" />
          这本书真正要教会读者什么
        </div>
        <p className={styles.ctaText}>
          不是教读者找到一个“本命 AI 工具”，而是教读者怎么把任务拆解、Context
          分发、Rules
          约束、验证兜底和外部工具接入组织成一条完整工作流。工具会换，模型会换，但这种控制面心智不会过时。
        </p>
      </div>
    </section>
  );
}
