import { Milestone } from "lucide-react";
import type { CSSProperties } from "react";
import { readingSteps } from "@/lib/home";
import styles from "./home.module.css";
import { withContentDelay } from "./motion";

type HomeReadingStepsProps = {
  delay?: number;
};

export function HomeReadingSteps({ delay }: HomeReadingStepsProps) {
  const style =
    delay === undefined
      ? undefined
      : (withContentDelay(delay) as CSSProperties);

  return (
    <div className={`${styles.dashedPanel} onload-animation`} style={style}>
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-fd-primary">
        <Milestone className="h-4 w-4" />
        建议阅读路径
      </div>

      <div className="space-y-3">
        {readingSteps.map((item) => (
          <div key={item.step} className={styles.stepCard}>
            <div className={styles.stepBadge}>{item.step}</div>
            <div>
              <div className={styles.stepTitle}>{item.title}</div>
              <div className={styles.stepDescription}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
