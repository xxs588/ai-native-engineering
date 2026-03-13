import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import styles from "./home.module.css";
import { withContentDelay } from "./motion";

type HomeListPanelProps = {
  title: string;
  icon: LucideIcon;
  items: readonly string[];
  delay?: number;
};

export function HomeListPanel({
  title,
  icon: Icon,
  items,
  delay,
}: HomeListPanelProps) {
  const style =
    delay === undefined
      ? undefined
      : (withContentDelay(delay) as CSSProperties);

  return (
    <div className={`${styles.dashedPanel} onload-animation`} style={style}>
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-fd-primary">
        <Icon className="h-4 w-4" />
        {title}
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.listItem}>
            <span className={styles.listBullet} />
            <span className={styles.listText}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
