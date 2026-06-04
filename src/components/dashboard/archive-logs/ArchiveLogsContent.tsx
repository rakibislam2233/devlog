"use client";
import { Compass, RotateCcw, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { deleteLogAction, updateLogAction } from "@/lib/actions/logs";
import { Log } from "@/interfaces/log";

interface ArchiveLogsContentProps {
  initialLogs?: Log[];
}

const ArchiveLogsContent = ({ initialLogs = [] }: ArchiveLogsContentProps) => {
  const [isPending, startTransition] = useTransition();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  const handleRestore = (log: Log) => {
    setSelectedLog(log);
    setRestoreDialogOpen(true);
  };

  const handlePermanentDelete = (log: Log) => {
    setSelectedLog(log);
    setDeleteDialogOpen(true);
  };

  const confirmRestore = () => {
    if (!selectedLog) return;
    startTransition(async () => {
      const result = await updateLogAction(selectedLog.id, { status: "completed" });
      if (result.success) {
        setRestoreDialogOpen(false);
        setSelectedLog(null);
      } else {
        alert("Error: " + result.error);
      }
    });
  };

  const confirmPermanentDelete = () => {
    if (!selectedLog) return;
    startTransition(async () => {
      const result = await deleteLogAction(selectedLog.id);
      if (result.success) {
        setDeleteDialogOpen(false);
        setSelectedLog(null);
      } else {
        alert("Error: " + result.error);
      }
    });
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
              Are you sure you want to restore the log from {new Date(selectedLog.date).toLocaleDateString()}? This will move it back to your active Dev Logs.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                disabled={isPending}
                onClick={() => {
                  setRestoreDialogOpen(false);
                  setSelectedLog(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-emerald-600 text-white hover:bg-emerald-700"
                disabled={isPending}
                onClick={confirmRestore}
              >
                {isPending ? <Loader2 size={16} className="animate-spin mr-2" /> : <RotateCcw size={16} className="mr-2" />}
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
              Are you sure you want to permanently delete the log from {new Date(selectedLog.date).toLocaleDateString()}? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                disabled={isPending}
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setSelectedLog(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                disabled={isPending}
                onClick={confirmPermanentDelete}
              >
                {isPending ? <Loader2 size={16} className="animate-spin mr-2" /> : <Trash2 size={16} className="mr-2" />}
                Delete Permanently
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:col-span-7 flex flex-col min-h-0 max-h-full">
        <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable] pr-1">
          {initialLogs.length === 0 ? (
            <div className="p-12 border border-gray-200 text-center">
              <Compass size={32} className="text-gray-400 mx-auto mb-3" />
              <p className="font-mono text-xs text-gray-500">
                No archives matched your query
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Try refining search characters or clear tag selections.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialLogs.map((log) => {
                return (
                  <article
                    key={log.id}
                    className="p-4 bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors flex flex-col justify-between h-[180px] cursor-pointer select-none -lg"
                  >
                    {/* Top Date Meta */}
                    <div className="space-y-1 text-left">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <time className="font-bold text-gray-700">
                          {new Date(log.date).toLocaleDateString()}
                        </time>
                        <span
                          className={`px-1 inline-block text-[8.5px] font-mono font-bold border ${
                            log.category === "bugfix"
                              ? "text-rose-400 bg-rose-950/10 border-rose-900/30"
                              : log.category === "feature"
                                ? "text-emerald-450 bg-emerald-950/10 border-emerald-900/30"
                                : "text-gray-600 border-gray-300"
                          }`}
                        >
                          {log.category}
                        </span>
                      </div>
                      <h3 className="text-xs text-gray-900 font-bold leading-snug truncate mt-1 font-mono">
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
                        {parseFloat(log.hoursSpent).toFixed(1)} hrs
                      </span>

                      <div className="flex gap-1.5 items-center">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleRestore(log)}
                            disabled={isPending}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50  transition-colors disabled:opacity-50"
                            title="Restore this log"
                          >
                            <RotateCcw size={14} />
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(log)}
                            disabled={isPending}
                            className="p-1.5 text-red-600 hover:bg-red-50  transition-colors disabled:opacity-50"
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
