"use client";
import { Calendar, FileText, History } from "lucide-react";
import { useRouter } from "next/navigation";
import { Log } from "@/interfaces/log";

interface LogHistoryWidgetProps {
  logs?: Log[];
}

const LogHistoryWidget = ({ logs = [] }: LogHistoryWidgetProps) => {
  const router = useRouter();
  const todayDateStr = new Date().toISOString().split("T")[0];

  const handleLogClickForDetail = (logId: string) => {
    router.push(`/dashboard/dev-logs/${logId}`);
  };

  return (
    <div className="flex flex-col gap-6 lg:max-h-full min-h-0 [scrollbar-gutter:stable]">
      {/* Timeline Summary Header Widget */}
      <div className="border border-gray-200 p-4 bg-gray-50 shrink-0">
        <h2 className="font-mono text-xs font-bold flex items-center gap-1.5 mb-2 text-gray-900">
          <History size={13} className="text-gray-600" />
          Log History
        </h2>
        <p className="text-xs leading-relaxed font-sans text-gray-600">
          Click on any log to view details or edit your past entries
        </p>
      </div>

      {/* Timeline Scrollable Content Container */}
      <div className="flex-1 border border-gray-200 overflow-y-auto bg-gray-50 [scrollbar-gutter:stable] min-h-[300px] py-4 px-2">
        <div className="space-y-4 relative pl-2">
          {logs.length === 0 ? (
            <div className="py-12 px-4 text-center select-none">
              <FileText size={24} className="text-gray-400 mx-auto mb-2.5" />
              <p className="font-mono text-xs text-gray-500">
                No logs recorded
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Your daily logs will appear here once created.
              </p>
            </div>
          ) : (
            logs.map((log) => {
              const logDateStr = new Date(log.date).toISOString().split("T")[0];
              const isCurrentEditing = logDateStr === todayDateStr;
              return (
                <div
                  key={log.id}
                  onClick={() => handleLogClickForDetail(log.id)}
                  className={`relative flex gap-3 transition-colors duration-75 p-3 bg-transparent border border-transparent select-none cursor-pointer hover:border-gray-300 hover:bg-gray-50 ${isCurrentEditing
                      ? "border-blue-300 bg-blue-50"
                      : ""
                    }`}
                >
                  {/* Timeline dot state */}
                  <div className="relative flex flex-col items-center flex-shrink-0 z-10">
                    <div
                      className={`w-8 h-8 border font-mono text-[10px] flex items-center justify-center font-bold ${log.status === "completed"
                          ? "border-gray-300 bg-gray-50 text-gray-700"
                          : "border-amber-300 bg-amber-50 text-amber-600"
                        }`}
                    >
                      {logDateStr.substring(8, 10)}
                    </div>
                  </div>

                  {/* Content block snippet */}
                  <div className="flex-1 min-w-0 pr-1 select-none text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-gray-900">
                        {new Date(log.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span
                        className={`font-mono text-[8.5px] font-bold px-1.5 py-0.5 ${log.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                          }`}
                      >
                        {log.status === "completed" ? "Committed" : "Draft"}
                      </span>
                    </div>

                    <p className="text-[11px] font-mono mt-1 font-bold text-gray-700">
                      {log.category} • {parseFloat(log.hoursSpent).toFixed(1)}{" "}
                      hrs
                    </p>

                    <p className="text-xs text-gray-600 font-sans truncate mt-1.5 leading-snug">
                      {log.whatIDid || (
                        <em className="font-mono text-gray-400">
                          Empty update
                        </em>
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default LogHistoryWidget;
