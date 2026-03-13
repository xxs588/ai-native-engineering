import { HomePage } from "@/components/home/HomePage";
import { getHomePageData } from "@/lib/home";

export default function Page() {
  return <HomePage data={getHomePageData()} />;
}
