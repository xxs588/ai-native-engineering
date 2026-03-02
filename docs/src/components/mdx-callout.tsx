import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CalloutProps = {
  type?: string;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
};

const toneMap: Record<string, string> = {
  info: "note",
  note: "note",
  tip: "tip",
  important: "important",
  warning: "warning",
  danger: "caution",
  caution: "caution",
};

const defaultTitleMap: Record<string, string> = {
  note: "Note",
  tip: "Tip",
  important: "Important",
  warning: "Warning",
  caution: "Caution",
};

export function MdxCallout({
  type = "note",
  title,
  children,
  className,
}: CalloutProps) {
  const tone = toneMap[type] ?? "note";
  const resolvedTitle = title ?? defaultTitleMap[tone];

  return (
    <blockquote className={cn("admonition", `bdm-${tone}`, className)}>
      <span className="bdm-title">{resolvedTitle}</span>
      {children}
    </blockquote>
  );
}
