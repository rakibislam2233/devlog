"use client";
import { Calendar, FileText, History } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    router.push(`/dashboard/dev-logs/${logId}`);
  };

  return (
    <div className="flex flex-col gap-6 lg:max-h-full min-h-0 [scrollbar-gutter:stable]">
      {/* Timeline Summary Header Widget */}
      <div className="border border-gray-200 p-4 bg-gray-50 shrink-0">
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2 text-gray-900">
          <History size={13} className="text-gray-600" />
          LOG HISTORY
        </h2>
        <p className="text-xs leading-relaxed font-sans text-gray-600">
          Click on any log to view details or edit your past entries
        </p>
      </div>

      {/* Timeline Scrollable Content Container */}
      <div className="flex-1 border border-gray-200 overflow-y-auto bg-gray-50 [scrollbar-gutter:stable] min-h-[300px] py-4 px-2">
        <div className="space-y-4 relative pl-2">
          {userLogs.length === 0 ? (
            <div className="py-12 px-4 text-center select-none">
              <FileText size={24} className="text-gray-400 mx-auto mb-2.5" />
              <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                NO LOGS RECORDED
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Your daily logs will appear here once created.
              </p>
            </div>
          ) : (
            userLogs.map((log) => {
              const isCurrentEditing = log.date === todayDateStr;
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
                      {log.date.substring(8, 10)}
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
                        className={`font-mono text-[8.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 ${log.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                          }`}
                      >
                        {log.status === "completed" ? "COMMITTED" : "DRAFT"}
                      </span>
                    </div>

                    <p className="text-[11px] font-mono mt-1 font-bold text-gray-700">
                      {log.category.toUpperCase()} • {log.hoursSpent.toFixed(1)}{" "}
                      hrs
                    </p>

                    <p className="text-xs text-gray-600 font-sans truncate mt-1.5 leading-snug">
                      {log.whatIDid || (
                        <em className="font-mono text-gray-400">
                          Empty update
                        </em>
                      )}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {log.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono text-gray-500 px-1.5 py-0.5 border border-gray-200"
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
