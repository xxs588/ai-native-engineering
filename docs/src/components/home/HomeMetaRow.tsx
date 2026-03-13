import { FileText, Milestone, Workflow } from "lucide-react";

type HomeMetaRowProps = {
  totalParts: number;
  totalChapters: number;
};

export function HomeMetaRow({ totalParts, totalChapters }: HomeMetaRowProps) {
  return (
    <div className="mb-3 flex flex-row flex-wrap gap-5 text-muted-foreground transition">
      <div className="flex flex-row items-center">
        <div className="meta-icon">
          <Milestone className="h-4 w-4 opacity-75" />
        </div>
        <div className="text-sm">共 {totalParts} 个 Part</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="meta-icon">
          <FileText className="h-4 w-4 opacity-75" />
        </div>
        <div className="text-sm">当前收录 {totalChapters} 个章节</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="meta-icon">
          <Workflow className="h-4 w-4 opacity-75" />
        </div>
        <div className="text-sm">从避坑到 Swarm 治理</div>
      </div>
    </div>
  );
}
