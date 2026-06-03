"use client";
import { History, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const userLogs = [
  {
    id: "1",
    date: "2024-06-20",
    category: "feature",
    whatIDid: "Implemented user authentication flow with JWT tokens.",
    hoursSpent: 3.5,
    tags: ["auth", "backend"],
    status: "completed",
  },
  {
    id: "2",
    date: "2024-06-21",
    category: "bugfix",
    whatIDid: "Fixed responsive layout issues on mobile devices.",
    hoursSpent: 2,
    tags: ["frontend", "responsive"],
    status: "completed",
  },
  {
    id: "3",
    date: "2024-06-22",
    category: "feature",
    whatIDid: "",
    hoursSpent: 1.5,
    tags: ["api", "integration"],
    status: "draft",
  },
];

const handleLogClickForDetail = (logId: string) => {
  // Navigate to log detail page (placeholder)
  console.log(`Navigate to detail view for log ID: ${logId}`);
};

const LogHistoryWidget = () => {
  const router = useRouter();
  const todayDateStr = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-6 lg:max-h-full min-h-0 [scrollbar-gutter:stable]">
      {/* Timeline Summary Header Widget */}
      <div className=" border p-4 rounded-none shrink-0">
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
          <History size={13} className="text-zinc-500" />
          ARCHIVE_TIMELINE
        </h2>
        <p className="text-xs text-zinc-500 leading-relaxed font-sans">
          Review and click archived log cards beneath to inspect historical
          outputs or inspect parameter keys.
        </p>
      </div>

      {/* Timeline Scrollable Content Container */}
      <div className="flex-1  border overflow-y-auto rounded-none [scrollbar-gutter:stable] min-h-[300px]">
        <div className="p-4 space-y-4 relative">
          {/* Vertical Connector Line */}
          <div className="absolute left-[33px] top-6 bottom-6 w-0.5 bg-zinc-850 pointer-events-none" />

          {userLogs.length === 0 ? (
            <div className="py-12 px-4 text-center select-none">
              <FileText size={24} className="text-zinc-700 mx-auto mb-2.5" />
              <p className="font-mono text-xs text-zinc-500">
                NO ARCHIVED LOGS RECORDED
              </p>
              <p className="text-[11px] text-zinc-600 mt-1">
                Daily journals committed will show up here.
              </p>
            </div>
          ) : (
            userLogs.map((log) => {
              const isCurrentEditing = log.date === todayDateStr;
              return (
                <div
                  key={log.id}
                  onClick={() => handleLogClickForDetail(log.id)}
                  className={`relative flex gap-3 transition-colors duration-75 p-2 bg-transparent border border-zinc-900 select-none cursor-pointer ${
                    isCurrentEditing
                      ? " border-zinc-700 font-bold"
                      : "hover: hover"
                  }`}
                >
                  {/* Timeline dot state */}
                  <div className="relative flex flex-col items-center flex-shrink-0 z-10">
                    <div
                      className={`w-8 h-8 rounded-none border font-mono text-[10px] flex items-center justify-center font-bold ${
                        log.status === "completed"
                          ? " border-zinc-700 text-zinc-150"
                          : " border-amber-600/50 text-amber-500"
                      }`}
                    >
                      {log.date.substring(8, 10)}
                    </div>
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase mt-1">
                      {log.date.substring(5, 7)}
                    </span>
                  </div>

                  {/* Content block snippet */}
                  <div className="flex-1 min-w-0 pr-1 select-none text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-zinc-200">
                        {new Date(log.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span
                        className={`font-mono text-[8.5px] uppercase font-bold tracking-wider px-1 inline-block ${
                          log.status === "completed"
                            ? "text-zinc-400 bg-zinc-800"
                            : "text-amber-500 bg-amber-950/10"
                        }`}
                      >
                        {log.status === "completed" ? "COMMITTED" : "DRAFT"}
                      </span>
                    </div>

                    <p className="text-zinc-500 text-[11px] font-mono mt-1 font-bold">
                      {log.category.toUpperCase()} • {log.hoursSpent.toFixed(1)}{" "}
                      hrs
                    </p>

                    <p className="text-xs text-zinc-450 font-sans truncate mt-1.5 leading-snug">
                      {log.whatIDid || (
                        <em className="text-zinc-700 font-mono">
                          Empty update
                        </em>
                      )}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {log.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono text-zinc-500  px-1 border border-zinc-850"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
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
