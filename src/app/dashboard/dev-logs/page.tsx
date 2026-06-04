import LogEditor from "@/components/dashboard/workspace/LogEditor";
import LogHistoryWidget from "@/components/dashboard/workspace/LogHistoryWidget";
import { getLogsAction } from "@/lib/actions/logs";

export default async function DevLogsPage() {
  const result = await getLogsAction();
  const logs = result.success ? result.data : [];

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Page Header */}
      <header className="border-b border-gray-200 bg-white pb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dev Logs</h1>
          <p className="text-sm text-gray-600 mt-1">Track your daily development work, learnings, and progress</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-y-auto">
        {/* Left column - Historical timeline lists */}
        <div className="lg:col-span-4 min-h-0">
          <LogHistoryWidget logs={logs} />
        </div>

        {/* Right column - Write Today's central editor panel */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-h-0">
          <LogEditor />
        </div>
      </div>
    </div>
  );
}
