"use client";
import { Compass, RotateCcw, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<typeof logs[0] | null>(null);

  const handleRestore = (log: typeof logs[0]) => {
    setSelectedLog(log);
    setRestoreDialogOpen(true);
  };

  const handlePermanentDelete = (log: typeof logs[0]) => {
    setSelectedLog(log);
    setDeleteDialogOpen(true);
  };

  const confirmRestore = () => {
    // Restore logic here
    console.log("Restoring log:", selectedLog?.id);
    setRestoreDialogOpen(false);
    setSelectedLog(null);
  };

  const confirmPermanentDelete = () => {
    // Permanent delete logic here
    console.log("Permanently deleting log:", selectedLog?.id);
    setDeleteDialogOpen(false);
    setSelectedLog(null);
  };

  return (
    <section>
      {/* Header */}
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Archived Logs</h1>
        <p className="text-gray-600">
          View, restore, or permanently delete your archived journal entries
        </p>
      </header>

      {/* Restore Confirmation Dialog */}
      {restoreDialogOpen && selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white  p-6 max-w-md w-full mx-4 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Restore Log</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to restore the log from {selectedLog.date}? This will move it back to your active Dev Logs.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setRestoreDialogOpen(false);
                  setSelectedLog(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={confirmRestore}
              >
                <RotateCcw size={16} className="mr-2" />
                Restore
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Permanent Delete Confirmation Dialog */}
      {deleteDialogOpen && selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white  p-6 max-w-md w-full mx-4 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Permanently Delete Log</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to permanently delete the log from {selectedLog.date}? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setSelectedLog(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={confirmPermanentDelete}
              >
                <Trash2 size={16} className="mr-2" />
                Delete Permanently
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:col-span-7 flex flex-col min-h-0 max-h-full">
        <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable] pr-1">
          {logs.length === 0 ? (
            <div className="p-12 border border-gray-200 text-center">
              <Compass size={32} className="text-gray-400 mx-auto mb-3" />
              <p className="font-mono text-xs uppercase tracking-wider text-gray-500">
                NO ARCHIVES MATCHED YOUR QUERY
              </p>
              <p className="text-[11px] text-gray-400 mt-1 uppercase">
                Try refining search characters or clear tag selections.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logs.map((log) => {
                return (
                  <article
                    key={log.id}
                    className="p-4 bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors flex flex-col justify-between h-[180px] cursor-pointer select-none -lg"
                  >
                    {/* Top Date Meta */}
                    <div className="space-y-1 text-left">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <time className="font-bold text-gray-700">
                          {log.date}
                        </time>
                        <span
                          className={`px-1 inline-block text-[8.5px] uppercase font-mono font-bold border ${
                            log.category === "bugfix"
                              ? "text-rose-400 bg-rose-950/10 border-rose-900/30"
                              : log.category === "feature"
                                ? "text-emerald-450 bg-emerald-950/10 border-emerald-900/30"
                                : "text-gray-600 border-gray-300"
                          }`}
                        >
                          {log.category.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-xs text-gray-900 font-bold leading-snug truncate mt-1 uppercase font-mono">
                        {log.whatIDid
                          .replace(/^- /, "")
                          .replace(/\r?\n.*/s, "") || "Empty Title"}
                      </h3>
                    </div>

                    {/* Snippet body */}
                    <p className="text-[11.5px] line-clamp-3 font-sans leading-relaxed my-2 text-left text-gray-600">
                      {log.whatIDid || (
                        <em className="text-gray-400">No actions logged</em>
                      )}
                    </p>

                    {/* Footer detail */}
                    <footer className="flex items-center justify-between border-t border-gray-200 pt-2 shrink-0">
                      <span className="text-[10px] font-mono font-bold text-gray-700">
                        {log.hoursSpent.toFixed(1)} hrs
                      </span>

                      <div className="flex gap-1.5 items-center">
                        <div className="flex gap-1.5 max-w-[50%] overflow-hidden">
                          {log.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono text-gray-500 px-1 border border-gray-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleRestore(log)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50  transition-colors"
                            title="Restore this log"
                          >
                            <RotateCcw size={14} />
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(log)}
                            className="p-1.5 text-red-600 hover:bg-red-50  transition-colors"
                            title="Permanently delete this log"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </footer>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArchiveLogsContent;
