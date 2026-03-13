import type { CSSProperties } from "react";

export function withContentDelay(delayMs: number): CSSProperties {
  return {
    ["--content-delay" as string]: `${delayMs}ms`,
  };
}
