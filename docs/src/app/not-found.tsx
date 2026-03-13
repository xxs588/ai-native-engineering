import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-10 md:px-6">
      <div className="card-base w-full px-6 py-8 md:px-9 md:py-10">
        <p className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground">
          Error 404
        </p>
        <h1 className="relative mb-3 text-3xl font-bold tracking-tight md:text-4xl md:before:absolute md:before:top-[0.55rem] md:before:left-[-1.125rem] md:before:h-5 md:before:w-1 md:before:rounded-md md:before:bg-fd-primary">
          页面不存在
        </h1>
        <p className="max-w-3xl text-base leading-8 text-fd-muted-foreground md:text-[1.03rem]">
          这个地址可能已经迁移、链接写错，或者内容已被整理到新的章节结构中。
          <br />
          建议先回到文档目录，再从导航继续阅读。
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-dashed border-fd-border pt-6">
          <Link
            href="/docs"
            className="btn-regular rounded-lg px-4 py-2 text-sm font-medium"
          >
            返回文档首页
          </Link>
          <Link
            href="/"
            className="btn-regular rounded-lg px-4 py-2 text-sm font-medium"
          >
            返回站点首页
          </Link>
        </div>
      </div>
    </main>
  );
}
