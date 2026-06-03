import LogEditor from "@/components/dashboard/workspace/LogEditor";
import LogHistoryWidget from "@/components/dashboard/workspace/LogHistoryWidget";
import WorkspaceContent from "@/components/dashboard/workspace/WorkspaceContent";

export default function WorkspacePage() {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-y-auto p-4">
      {/* Left column - Historical timeline lists */}
      <div className="lg:col-span-4 min-h-0">
        <LogHistoryWidget />
      </div>

      {/* Right column - Write Today's central editor panel */}
      <div className="lg:col-span-8 flex flex-col gap-6 min-h-0">
        <LogEditor />
      </div>
    </div>
  );
}
