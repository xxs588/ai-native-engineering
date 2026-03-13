import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function BookHomeLayout({
  children,
  nav = {},
  githubUrl,
  links,
}: BaseLayoutProps) {
  return (
    <div
      id="book-home-root"
      className="relative min-h-screen bg-fd-background pb-10 font-sans transition-colors duration-700"
    >
      <div
        id="top-row"
        className="pointer-events-none relative z-50 mx-auto w-full max-w-(--page-width) px-0 transition-all duration-700 md:px-(--layout-inline-gutter)"
      >
        <div
          id="navbar-wrapper"
          className="pointer-events-auto sticky top-0 transition-all"
        >
          <Navbar nav={nav} links={links} githubUrl={githubUrl} />
        </div>
      </div>

      <div
        id="main-panel"
        className="relative z-30 mt-4 w-full pointer-events-none"
      >
        <div className="pointer-events-auto relative mx-auto max-w-(--page-width)">
          <main className="px-0 md:px-(--layout-inline-gutter)">
            <div
              id="content-wrapper"
              className="onload-animation w-full px-4 md:px-0"
            >
              {children}
            </div>
          </main>

          <div className="px-4 md:px-(--layout-inline-gutter)">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
