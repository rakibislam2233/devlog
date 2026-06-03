"use client";
import { FileText, History } from "lucide-react";
import { useRouter } from "next/navigation";

const userLogs = [
  {
    id: "log-1",
    date: "2026-06-02",
    authorEmail: "rakib2020.tkg@gmail.com",
    whatIDid:
      "- Integrated Lucide React icons for flat design representation.\n- Optimized webpack build configurations to slash bundle sizes by 28%.\n- Refactored AppState controller to clear up memory leak in useEffect listeners.\n- Wrote complete unit-tests for the login middleware.",
    whatILearned:
      "Using deep reactivity hooks in react-motion can cause unnecessary re-renders if dependencies are objects. Better to destruct the parameters and watch primitives.",
    whatIWillDoTomorrow:
      "- Setup standard error-boundaries for the history grid view.\n- Draft initial UI parameters for the notifications time slider.",
    status: "completed",
    tags: ["build", "refactor", "ux"],
    hoursSpent: 7.5,
    category: "refactor",
    createdAt: "2026-06-02T18:30:00Z",
  },
  {
    id: "log-2",
    date: "2026-06-01",
    authorEmail: "rakib2020.tkg@gmail.com",
    whatIDid:
      "- Resolved CORS issues with the local API service by updating response headers.\n- Drafted the UI style guide specifying zero-shadow flat borders.\n- Connected mock store states through standard React Context to support user logins.",
    whatILearned:
      "Explicit focus-state borders are far more prominent and accessible than faint drop-shadow signals on low-brightness panels.",
    whatIWillDoTomorrow:
      "- Benchmark client bundles under slower network throttling profiles.\n- Expand user dashboard views to show historical stats panels.",
    status: "completed",
    tags: ["api", "ui", "state"],
    hoursSpent: 8.0,
    category: "feature",
    createdAt: "2026-06-01T17:45:00Z",
  },
  {
    id: "log-3",
    date: "2026-05-31",
    authorEmail: "rakib2020.tkg@gmail.com",
    whatIDid:
      "- Explored performance constraints on heavy lists rendered in iframe containers.\n- Replaced utility-class shadows with explicit zinc-800 borders.\n- Optimized spacing on small containers supporting mobile touch targets.",
    whatILearned:
      "To maintain fluid grid items, let flexbox or grid manage column sizes rather than hardcoded pixel measurements.",
    whatIWillDoTomorrow:
      "- Configure initial dark-first theme guidelines for Tailwind v4 CSS.\n- Research key patterns for flat checklists.",
    status: "completed",
    tags: ["research", "ui"],
    hoursSpent: 6.0,
    category: "research",
    createdAt: "2026-05-31T17:20:00Z",
  },
  {
    id: "log-4",
    date: "2026-05-30",
    authorEmail: "rakib2020.tkg@gmail.com",
    whatIDid:
      "- Initialized DevLog project blueprint and established repository structure.\n- Set up basic typescript configurations and defined system boundaries.\n- Stubbed package scripts for rapid production runs.",
    whatILearned:
      "A strict typography system makes or breaks an ultra-minimal dashboard. We should use crisp Monospace for numbers/stats and Inter for readable copy.",
    whatIWillDoTomorrow:
      "- Create basic mock databases supporting state restoration.\n- Connect sample history items with proper tags.",
    status: "completed",
    tags: ["setup", "tooling"],
    hoursSpent: 5.5,
    category: "docs",
    createdAt: "2026-05-30T16:00:00Z",
  },
];

const LogHistoryWidget = () => {
  const router = useRouter();
  const todayDateStr = new Date().toISOString().split("T")[0];
  const handleLogClickForDetail = (logId: string) => {
    router.push(`/dashboard/workspace/${logId}`);
  };

  return (
    <div className="flex flex-col gap-6 lg:max-h-full min-h-0 [scrollbar-gutter:stable]">
      {/* Timeline Summary Header Widget */}
      <div className=" border p-4 rounded-none shrink-0">
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider  flex items-center gap-1.5 mb-2">
          <History size={13} className="" />
          ARCHIVE_TIMELINE
        </h2>
        <p className="text-xs  leading-relaxed font-sans">
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
              <FileText size={24} className=" mx-auto mb-2.5" />
              <p className="font-mono text-xs ">
                NO ARCHIVED LOGS RECORDED
              </p>
              <p className="text-[11px]  mt-1">
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
                    <span className="text-[9px] font-mono font-bold  uppercase mt-1">
                      {log.date.substring(5, 7)}
                    </span>
                  </div>

                  {/* Content block snippet */}
                  <div className="flex-1 min-w-0 pr-1 select-none text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold ">
                        {new Date(log.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span
                        className={`font-mono text-[8.5px] uppercase font-bold tracking-wider px-1 inline-block ${
                          log.status === "completed"
                            ? " bg-zinc-800"
                            : "text-amber-500 bg-amber-950/10"
                        }`}
                      >
                        {log.status === "completed" ? "COMMITTED" : "DRAFT"}
                      </span>
                    </div>

                    <p className=" text-[11px] font-mono mt-1 font-bold">
                      {log.category.toUpperCase()} • {log.hoursSpent.toFixed(1)}{" "}
                      hrs
                    </p>

                    <p className="text-xs text-zinc-450 font-sans truncate mt-1.5 leading-snug">
                      {log.whatIDid || (
                        <em className=" font-mono">
                          Empty update
                        </em>
                      )}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {log.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono   px-1 border border-zinc-850"
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
