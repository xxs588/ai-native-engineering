import { BookHomeLayout } from "@/components/layout/BookHomeLayout";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return <BookHomeLayout {...baseOptions()}>{children}</BookHomeLayout>;
}
