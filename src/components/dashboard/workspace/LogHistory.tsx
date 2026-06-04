"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Calendar,
  Compass,
  Edit3,
  FileText,
  LayoutGrid,
  List,
  RefreshCw,
  Search,
  Trash2,
  Loader2
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { updateLogAction } from "@/lib/actions/logs";
import { Log } from "@/interfaces/log";

interface LogHistoryProps {
  initialLogs?: Log[];
}

const LogHistory = ({ initialLogs = [] }: LogHistoryProps) => {
  const router = useRouter();
  const { logId } = useParams();
  const [isPending, startTransition] = useTransition();

  // Filter conditions
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(
    null,
  );
  const [isGridLayout, setIsGridLayout] = useState<boolean>(true);

  // Apply conditional search queries
  const filteredLogs = initialLogs.filter((log) => {
    const matchesSearch =
      log.whatIDid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.whatILearned.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.whatIWillDoTomorrow
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      new Date(log.date).toISOString().includes(searchQuery);

    const matchesCategory =
      categoryFilter === "all" || log.category === categoryFilter;
    // Tags are not in schema currently
    const matchesTag = !selectedTagFilter;

    return matchesSearch && matchesCategory && matchesTag;
  });

  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  useEffect(() => {
    if (logId) {
      const log = initialLogs.find((l) => l.id === logId);
      if (log) {
        setSelectedLog(log);
      }
    } else if (initialLogs.length > 0) {
      setSelectedLog(initialLogs[0]);
    }
  }, [logId, initialLogs]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setSelectedTagFilter(null);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [logToDelete, setLogToDelete] = useState<string | null>(null);

  const handleDeleteLog = (id: string) => {
    setLogToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteLog = () => {
    if (logToDelete) {
      startTransition(async () => {
        const result = await updateLogAction(logToDelete, { status: "archived" });
        if (result.success) {
          setDeleteDialogOpen(false);
          setLogToDelete(null);
          if (selectedLog?.id === logToDelete) {
            setSelectedLog(null);
          }
          router.push("/dashboard/dev-logs");
        } else {
          alert("Error: " + result.error);
        }
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white  p-6 max-w-md w-full mx-4 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Archive Log</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to archive this log entry? This will move it to the Archived Logs section where it can be restored or permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                disabled={isPending}
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setLogToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                disabled={isPending}
                onClick={confirmDeleteLog}
              >
                {isPending ? <Loader2 size={16} className="animate-spin mr-2" /> : <Trash2 size={16} className="mr-2" />}
                Archive
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FILTER PANEL SECTION */}
      <section className="bg-gray-50 border-b p-4 shrink-0">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Text input search */}
          <div className="md:col-span-5 flex items-center border px-3 p-2 transition-colors">
            <Search size={14} className="mr-2 shrink-0" />
            <Input
              type="text"
              placeholder="Search journals for updates, code strings or lessons learned..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent focus:outline-none focus:border-none text-xs font-mono w-full outline-none border-none p-0 h-auto"
              id="history_search_input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className=" hover: font-bold ml-1.5 text-xs cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          {/* Category SELECT filter */}
          <div className="md:col-span-3">
            <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value)}
            >
              <SelectTrigger className="w-full font-mono text-xs">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="feature">Feature Development</SelectItem>
                <SelectItem value="bugfix">Bug Resolution</SelectItem>
                <SelectItem value="refactor">Code Optimization/Refactor</SelectItem>
                <SelectItem value="research">Technical Research</SelectItem>
                <SelectItem value="docs">Documentation Writing</SelectItem>
                <SelectItem value="other">Miscellaneous Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid vs List layout switchers & reset */}
          <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3 select-none text-xs">
            <div className="flex  p-1 border -none shrink-0 font-mono">
              <button
                onClick={() => setIsGridLayout(true)}
                className={`p-1.5 -none cursor-pointer ${isGridLayout
                    ? "text-zinc-950 font-bold"
                    : " hover:"
                  }`}
                title="Bento Grid representation"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setIsGridLayout(false)}
                className={`p-1.5 -none cursor-pointer ${!isGridLayout
                    ? "text-zinc-950 font-bold"
                    : " hover:"
                  }`}
                title="Compact terminal list representation"
              >
                <List size={14} />
              </button>
            </div>

            {(searchQuery || categoryFilter !== "all" || selectedTagFilter) && (
              <button
                onClick={handleClearFilters}
                className=" text-zinc-350 hover: border p-2 font-mono text-[10px] font-bold -none cursor-pointer flex items-center gap-1.5"
                id="history_clear_filters_btn"
              >
                <RefreshCw size={11} />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* CORE SPATIAL PANES (Left grid, Right inspect panel) */}
      <section className="flex-1 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-y-auto">
        {/* LEFT COLUMN: ARCHIVED SEARCH LISTING GRID (7 Cols on large) */}
        <div className="lg:col-span-7 flex flex-col min-h-0 max-h-full">
          <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable] pr-1">
            {filteredLogs.length === 0 ? (
              <div className="p-12 border text-center 10">
                <Compass size={32} className="text-zinc-850 mx-auto mb-3" />
                <p className="font-mono text-xs">
                  No logs matched your query
                </p>
                <p className="text-[11px] text-zinc-650 mt-1">
                  Try refining search characters or clear tag selections.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-zinc-950 p-2 font-mono text-[10px] font-bold -none cursor-pointer"
                >
                  Show All Records
                </button>
              </div>
            ) : isGridLayout ? (
              /* BENTO GRID REPRESENTATION */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLogs.map((log) => {
                  const isSelected = selectedLog && selectedLog.id === log.id;
                  return (
                    <div
                      key={log.id}
                      className={`45 p-4 border transition-colors flex flex-col justify-between h-[180px] cursor-pointer select-none ${isSelected
                          ? "bg-white border-zinc-900"
                          : "bg-gray-50 border-gray-200"
                        }`}
                      onClick={() => router.push(`/dashboard/dev-logs/${log.id}`)}
                    >
                      {/* Top Date Meta */}
                      <div className="space-y-1 text-left">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className=" font-bold">
                            {new Date(log.date).toLocaleDateString()}
                          </span>
                          <span
                            className={`px-1 inline-block text-[8.5px] font-mono font-bold border ${log.category === "bugfix"
                                ? "text-rose-400 bg-rose-950/10 border-rose-900/30"
                                : log.category === "feature"
                                  ? "text-emerald-450 bg-emerald-950/10 border-emerald-900/30"
                                  : "  border-zinc-900"
                              }`}
                          >
                            {log.category}
                          </span>
                        </div>
                        <h3 className="text-xs font-bold leading-snug truncate mt-1 font-mono">
                          {log.whatIDid
                            .replace(/^- /, "")
                            .replace(/\r?\n.*/s, "") || "Empty Title"}
                        </h3>
                      </div>

                      {/* Snippet body */}
                      <p className="text-[11.5px] line-clamp-3 font-sans leading-relaxed my-2 text-left">
                        {log.whatIDid || (
                          <em className="">No actions logged</em>
                        )}
                      </p>

                      {/* Footer detail */}
                      <div className="flex items-center justify-between border-t pt-2 shrink-0">
                        <span className="text-[10px] font-mono font-bold">
                          {parseFloat(log.hoursSpent).toFixed(1)} hrs
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* TERMINAL COMPACT LIST REPRESENTATION */
              <div className="border divide-y divide-zinc-900 select-none">
                {filteredLogs.map((log) => {
                  const isSelected = selectedLog && selectedLog.id === log.id;
                  return (
                    <div
                      key={log.id}
                      className={`p-3 font-mono text-[11.5px] flex items-center justify-between gap-4 transition-colors duration-75 cursor-pointer ${isSelected
                          ? "bg-white"
                          : "bg-gray-50"
                        }`}
                      onClick={() => router.push(`/dashboard/dev-logs/${log.id}`)}
                    >
                      <div className="flex items-center gap-3 min-w-0 text-left">
                        <div
                          className={`w-1.5 h-1.5 -none flex-shrink-0 ${isSelected ? "bg-zinc-105" : "bg-zinc-800"
                            }`}
                        />

                        <span className="text-zinc-550 shrink-0 font-bold">
                          {new Date(log.date).toLocaleDateString()}
                        </span>

                        <span className=" shrink-0 font-bold">
                          [{log.category.substring(0, 3)}]
                        </span>

                        <span className="truncate font-sans font-medium ">
                          {log.whatIDid.substring(0, 60).replace(/^- /, "")}...
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-zinc-650">
                          {parseFloat(log.hoursSpent).toFixed(1)}h
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DEDICATED READ VIEW INSPECTOR SCREEN (5 Cols on large) */}
        <div className="lg:col-span-5 flex flex-col min-h-0 max-h-full bg-gray-50">
          {selectedLog ? (
            <div className="border border-zinc-850 -none flex-1 flex flex-col min-h-0 [scrollbar-gutter:stable]">
              {/* Detail Header bar */}
              <div className="p-4 border-b flex justify-between items-start gap-4 shrink-0 transition-colors">
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="" />
                    <span className="font-mono text-xs font-bold ">
                      {new Date(selectedLog.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] bg-white font-mono font-bold px-1.5 border ${selectedLog.status === "completed"
                          ? "text-emerald-400 bg-emerald-950/20 border-emerald-900"
                          : "text-amber-500 bg-amber-950/20 border-amber-900"
                        }`}
                    >
                      Status: {selectedLog.status}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-550 font-bold">
                      ID: {selectedLog.id}
                    </span>
                  </div>
                </div>

                {/* Edit & Delete Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    className="p-2 bg-white hover:bg-blue-50 cursor-pointer border border-gray-200 hover:border-blue-300 text-blue-600  transition-colors"
                    title="Load log parameters into active workspace editor"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteLog(selectedLog.id)}
                    disabled={isPending}
                    className="p-2 bg-white hover:bg-red-50 cursor-pointer border border-gray-200 hover:border-red-300 text-red-600  transition-colors disabled:opacity-50"
                    title="Archive log record"
                  >
                    {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>

              {/* High Contrast Parameter Indicators */}
              <div className="grid grid-cols-3 bg-white divide-x divide-zinc-850 border-b border-zinc-850  p-3 shrink-0 text-center font-mono text-xs select-none">
                <div>
                  <span className="text-[9px]  block font-bold">
                    Logged Hours
                  </span>
                  <span className=" font-bold block mt-1">
                    {selectedLog.hoursSpent} hrs spent
                  </span>
                </div>
                <div>
                  <span className="text-[9px]  block font-bold">
                    Log Category
                  </span>
                  <span className=" font-bold block mt-1 text-[11px]">
                    {selectedLog.category}
                  </span>
                </div>
                <div>
                  <span className="text-[9px]  block font-bold">
                    Log Record
                  </span>
                  <span className="text-zinc-250 block mt-1">#IndexCard</span>
                </div>
              </div>

              {/* Dedicated Scrollable Content Display */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5 [scrollbar-gutter:stable] /50 text-left">
                {/* 1. What I did today container */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5  font-mono text-[10.5px] font-bold">
                    <FileText size={12} />
                    <span>01. Operational updates / Tasks did</span>
                  </div>
                  <div className="p-3 border border-zinc-850 -none font-mono text-xs  leading-relaxed whitespace-pre-wrap select-text">
                    {selectedLog.whatIDid || (
                      <em className="text-zinc-750">
                        No actions logged on this cycle.
                      </em>
                    )}
                  </div>
                </div>

                {/* 2. What I learned today container */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5  font-mono text-[10.5px] font-bold">
                    <BookOpen size={12} />
                    <span>02. Technical Insights / Learnings</span>
                  </div>
                  <div className="p-3 border border-zinc-850 -none font-mono text-xs  leading-relaxed whitespace-pre-wrap select-text">
                    {selectedLog.whatILearned || (
                      <em className="text-zinc-750">
                        No insights documented during this checkpoint.
                      </em>
                    )}
                  </div>
                </div>

                {/* 3. What I will do tomorrow container */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5  font-mono text-[10.5px] font-bold">
                    <Compass size={12} />
                    <span>03. Next Step Roadmaps / Planning</span>
                  </div>
                  <div className="p-3 border border-zinc-850 -none font-mono text-xs  leading-relaxed whitespace-pre-wrap select-text">
                    {selectedLog.whatIWillDoTomorrow || (
                      <em className="text-zinc-750">
                        No next actions specified on this cycle.
                      </em>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-zinc-850 p-12 text-center 10 -none flex-1 flex flex-col justify-center items-center select-none">
              <FileText size={40} className=" mb-3" />
              <p className="font-mono text-xs text-zinc-550 font-bold">
                No Log Selected
              </p>
              <p className="text-[10px]  mt-2 max-w-xs">
                Select an entry index on the left to read compiled log
                parameters side-by-side.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default LogHistory;
