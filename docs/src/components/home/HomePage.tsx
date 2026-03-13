import { Bot, BrainCircuit, Rocket } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import type { HomePageData } from "@/lib/home";
import { learningOutcomes, readerTypes } from "@/lib/home";
import { HomeHero } from "./HomeHero";
import { HomeHighlightGrid } from "./HomeHighlightGrid";
import { HomeListPanel } from "./HomeListPanel";
import { HomePartGrid } from "./HomePartGrid";
import { HomeReadingSteps } from "./HomeReadingSteps";
import { HomeSection } from "./HomeSection";
import styles from "./home.module.css";
import { withContentDelay } from "./motion";

type HomePageProps = {
  data: HomePageData;
};

export function HomePage({ data }: HomePageProps) {
  return (
    <div className={styles.pageRoot}>
      <div className="relative">
        <div className="card-base relative mb-4 mx-auto w-full px-6 pt-6 pb-6 md:px-9">
          <HomeHero
            entryUrl={data.entryUrl}
            totalParts={data.totalParts}
            totalChapters={data.totalChapters}
            quickLinks={data.quickLinks}
          />

          <HomeSection
            delay={240}
            eyebrow="Book Scope"
            title="这本书真正要教会读者什么"
            description="首页不该只是放一个大标题。它应该先告诉读者：这本书到底在解决什么问题，为什么后面一定要沿着这条路线读下去。"
          >
            <HomeHighlightGrid />
          </HomeSection>

          <HomeSection
            id="catalogue"
            delay={300}
            eyebrow="Project Line"
            title="全书主线怎么推进"
            description="Part 1 不求讲透，而是先把脑回路掰过来；Part 2 先演练项目会怎么翻车；Part 3 和 Part 4 再把同一个项目真正做起来；Part 5 最后抬升到治理。"
          >
            <HomePartGrid parts={data.parts} />
          </HomeSection>

          <HomeSection
            delay={360}
            eyebrow="Reader Guide"
            title="谁该读、该怎么读、读完之后该得到什么"
            description="如果只是想找一个“最强工具排行榜”，这本书可能不会让人立刻爽到；但如果想把 AI 真正接进项目，这部分会告诉读者该抓哪些重点。"
          >
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_0.92fr]">
              <div className="space-y-4">
                <HomeListPanel
                  title="这本书更适合谁"
                  icon={Bot}
                  items={readerTypes}
                  delay={420}
                />
                <HomeReadingSteps delay={470} />
              </div>

              <div className="space-y-4">
                <HomeListPanel
                  title="读完后应该得到什么"
                  icon={BrainCircuit}
                  items={learningOutcomes}
                  delay={440}
                />

                <div
                  className={`${styles.dashedPanel} onload-animation`}
                  style={withContentDelay(500) as CSSProperties}
                >
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-fd-primary">
                    <Rocket className="h-4 w-4" />
                    直接开始阅读
                  </div>

                  <p className={styles.ctaText}>
                    如果想顺着作者那条从“古法编程”一路进化到 Agentic Coding
                    的路线读，就先从前言开始。 如果已经被 AI
                    的笨、乱、贵折磨得很烦，也可以直接进入 Part
                    1，先把那层“问题都在模型”的误解拆掉。
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink
                      href={data.entryUrl}
                      variant="regular"
                      size="regularText"
                      className="justify-center"
                    >
                      进入前言
                    </ButtonLink>

                    <ButtonLink
                      href={data.firstPartUrl}
                      variant="regular"
                      size="regularText"
                      className="justify-center"
                    >
                      直接读 Part 1
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </HomeSection>
        </div>
      </div>
    </div>
  );
}
