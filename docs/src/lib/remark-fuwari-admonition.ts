type MdxJsxAttribute = {
  type: "mdxJsxAttribute";
  name: string;
  value?: string;
};

type NodeLike = {
  type?: string;
  name?: string;
  label?: unknown;
  value?: unknown;
  data?: unknown;
  attributes?: unknown;
  children?: NodeLike[];
  position?: {
    start?: {
      line?: number;
    };
  };
  [key: string]: unknown;
};

const supported = new Set([
  "note",
  "tip",
  "info",
  "warning",
  "danger",
  "important",
  "caution",
]);

function getTitle(node: NodeLike): string | undefined {
  const attributes = (node.attributes ?? {}) as Record<string, unknown>;
  const title = attributes.title;

  if (typeof title === "string" && title.trim().length > 0) {
    return title;
  }

  if (typeof node.label === "string" && node.label.trim().length > 0) {
    return node.label;
  }

  return undefined;
}

function getInlineText(node: NodeLike): string {
  if (node.type === "text" || node.type === "inlineCode") {
    return typeof node.value === "string" ? node.value : "";
  }

  if (!node.children?.length) return "";

  return node.children.map((child) => getInlineText(child)).join("");
}

function getInlineTitleFromDirectiveLabel(node: NodeLike): {
  title?: string;
  children: NodeLike[];
} {
  const children = [...(node.children ?? [])];
  if (!children.length) return { children };

  const first = children[0];
  const isDirectiveLabel =
    first.type === "paragraph" &&
    typeof first.data === "object" &&
    first.data !== null &&
    "directiveLabel" in (first.data as Record<string, unknown>) &&
    (first.data as Record<string, unknown>).directiveLabel === true;

  if (!isDirectiveLabel) {
    return { children };
  }

  const title = getInlineText(first).trim();
  if (!title) return { children };

  children.shift();
  return { title, children };
}

function visit(tree: NodeLike, transform: (node: NodeLike) => NodeLike) {
  if (!tree.children) return;

  tree.children = tree.children.map((child: NodeLike) => {
    if (child.children?.length) {
      visit(child, transform);
    }
    return transform(child);
  });
}

export function remarkFuwariAdmonition() {
  return (tree: NodeLike) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return node;
      if (!node.name || !supported.has(node.name)) return node;

      let children = node.children ?? [];

      const attributes: MdxJsxAttribute[] = [
        {
          type: "mdxJsxAttribute",
          name: "type",
          value: node.name,
        },
      ];

      let title = getTitle(node);
      if (!title) {
        const extracted = getInlineTitleFromDirectiveLabel(node);
        title = extracted.title;
        children = extracted.children;
      }

      if (title) {
        attributes.push({
          type: "mdxJsxAttribute",
          name: "title",
          value: title,
        });
      }

      return {
        type: "mdxJsxFlowElement",
        name: "Callout",
        attributes,
        children,
      };
    });
  };
}
