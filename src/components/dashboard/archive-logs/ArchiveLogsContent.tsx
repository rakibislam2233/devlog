"use client";

import { Compass } from "lucide-react";

export const logs = [
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
const ArchiveLogsContent = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Archive Logs</h1>
        <p className="text-gray-600">
          View and manage your archived journal entries
        </p>
      </div>

      <div className="lg:col-span-7 flex flex-col min-h-0 max-h-full">
        <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable] pr-1">
          {logs.length === 0 ? (
            <div className="p-12 border text-center 10">
              <Compass size={32} className="text-zinc-850 mx-auto mb-3" />
              <p className="font-mono text-xs  uppercase tracking-wider">
                NO ARCHIVES MATCHED YOUR QUERY
              </p>
              <p className="text-[11px] text-zinc-650 mt-1 uppercase">
                Try refining search characters or clear tag selections.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logs.map((log) => {
                return (
                  <div
                    key={log.id}
                    className={`45 p-4 border transition-colors flex flex-col justify-between h-[180px] cursor-pointer select-none `}
                  >
                    {/* Top Date Meta */}
                    <div className="space-y-1 text-left">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className=" font-bold">
                          {log.date}
                        </span>
                        <span
                          className={`px-1 inline-block text-[8.5px] uppercase font-mono font-bold border ${
                            log.category === "bugfix"
                              ? "text-rose-400 bg-rose-950/10 border-rose-900/30"
                              : log.category === "feature"
                                ? "text-emerald-450 bg-emerald-950/10 border-emerald-900/30"
                                : "  border-zinc-900"
                          }`}
                        >
                          {log.category.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-xs text-zinc-150 font-bold leading-snug truncate mt-1 uppercase font-mono">
                        {log.whatIDid
                          .replace(/^- /, "")
                          .replace(/\r?\n.*/s, "") || "Empty Title"}
                      </h3>
                    </div>

                    {/* Snippet body */}
                    <p className="text-[11.5px]  line-clamp-3 font-sans leading-relaxed my-2 text-left">
                      {log.whatIDid || (
                        <em className="">No actions logged</em>
                      )}
                    </p>

                    {/* Footer detail */}
                    <div className="flex items-center justify-between border-t pt-2 shrink-0">
                      <span className="text-[10px]  font-mono font-bold">
                        {log.hoursSpent.toFixed(1)} hrs
                      </span>

                      <div className="flex gap-1.5 max-w-[70%] overflow-hidden">
                        {log.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono text-zinc-550  px-1 border border-zinc-900"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchiveLogsContent;
