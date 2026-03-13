import {
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import Link from "next/link";

export default function DocsNotFoundPage() {
  return (
    <DocsPage
      breadcrumb={{ enabled: false }}
      tableOfContentPopover={{ enabled: false }}
      tableOfContent={{ enabled: false }}
      footer={{ enabled: false }}
      className="!mx-0 !w-full !max-w-none !gap-0 !px-0 !py-0"
    >
      <div className="relative">
        <div className="card-base relative mb-4 mx-auto w-full px-6 pt-6 pb-6 md:px-9">
          <p className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground">
            Error 404
          </p>

          <DocsTitle className="mb-3 block w-full font-bold transition md:before:absolute md:before:top-[0.75rem] md:before:left-[-1.125rem] md:before:h-5 md:before:w-1 md:before:rounded-md md:before:bg-fd-primary">
            文档页面不存在
          </DocsTitle>

          <DocsDescription className="m-0 max-w-[70ch] text-[1.03rem] leading-[1.85] tracking-[0.003em] text-fd-muted-foreground">
            这个链接可能已经迁移，或者你访问的是旧目录。
            <br />
            回到文档目录继续阅读，会更快找到正确章节。
          </DocsDescription>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-dashed border-fd-border pt-6">
            <Link
              href="/docs"
              className="btn-regular rounded-lg px-4 py-2 text-sm font-medium"
            >
              返回文档目录
            </Link>
            <Link
              href="/"
              className="btn-regular rounded-lg px-4 py-2 text-sm font-medium"
            >
              返回站点首页
            </Link>
          </div>
        </div>
      </div>
    </DocsPage>
  );
}
