import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./home.module.css";
import { withContentDelay } from "./motion";

type HomeSectionProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
  id?: string;
  delay?: number;
};

export function HomeSection({
  title,
  description,
  eyebrow,
  children,
  className,
  divider = true,
  id,
  delay,
}: HomeSectionProps) {
  const style =
    delay === undefined
      ? undefined
      : (withContentDelay(delay) as CSSProperties);

  return (
    <section
      id={id}
      style={style}
      className={cn(
        "onload-animation",
        divider && styles.sectionDivider,
        className,
      )}
    >
      <div className="mb-5">
        {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
        <h2 className="relative mb-3 block w-full text-2xl font-bold transition md:before:absolute md:before:top-[0.65rem] md:before:left-[-1.125rem] md:before:h-5 md:before:w-1 md:before:rounded-md md:before:bg-fd-primary">
          {title}
        </h2>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
      {children}
    </section>
  );
}
