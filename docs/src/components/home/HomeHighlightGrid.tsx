import {
  BrainCircuit,
  type LucideIcon,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { CSSProperties } from "react";
import { bookHighlights } from "@/lib/home";
import styles from "./home.module.css";
import { withContentDelay } from "./motion";

const highlightIcons: LucideIcon[] = [BrainCircuit, ShieldCheck, Workflow];

export function HomeHighlightGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {bookHighlights.map((item, index) => {
        const Icon = highlightIcons[index] ?? BrainCircuit;

        return (
          <article
            key={item.title}
            className="card-base onload-animation h-full px-5 py-5"
            style={withContentDelay(260 + index * 60) as CSSProperties}
          >
            <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-fd-primary">
              <div className="meta-icon !mr-0 !h-8 !w-8">
                <Icon className="h-4 w-4 opacity-75" />
              </div>
              <span>{item.title}</span>
            </div>
            <p className={styles.panelDescription}>{item.description}</p>
          </article>
        );
      })}
    </div>
  );
}
