import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Children, createElement, isValidElement, type ReactNode } from "react";
import { MdxCallout } from "./components/mdx-callout";
import { Mermaid } from "./components/mdx-mermaid";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
  children?: ReactNode;
  className?: string;
  id?: string;
};

function createHeading(level: HeadingLevel) {
  return function Heading({ children, id, ...props }: HeadingProps) {
    const items = Children.toArray(children);

    const anchorIndex = items.findIndex((item) => {
      if (!isValidElement(item)) return false;
      if (item.type !== "a") return false;

      const anchorProps = item.props as {
        href?: string;
        [key: string]: unknown;
      };

      return (
        typeof anchorProps.href === "string" &&
        anchorProps.href.startsWith("#") &&
        "data-card" in anchorProps
      );
    });

    const titleNode = (() => {
      if (anchorIndex < 0) return children;

      const anchorNode = items[anchorIndex];
      if (!isValidElement(anchorNode) || anchorNode.type !== "a") {
        return children;
      }

      const anchorProps = anchorNode.props as {
        children?: ReactNode;
      };

      return anchorProps.children ?? children;
    })();

    return createElement(
      level,
      { ...props, id },
      createElement(
        "div",
        { className: "heading-wrap" },
        createElement("span", { className: "heading-title-text" }, titleNode),
        id
          ? createElement(
              "a",
              {
                href: `#${id}`,
                className: "heading-hash-link no-styling",
                "aria-label": "跳转到当前标题",
              },
              "#",
            )
          : null,
      ),
    );
  };
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    h1: createHeading("h1"),
    h2: createHeading("h2"),
    h3: createHeading("h3"),
    h4: createHeading("h4"),
    h5: createHeading("h5"),
    h6: createHeading("h6"),
    Callout: MdxCallout,
    Mermaid,
  };
}
