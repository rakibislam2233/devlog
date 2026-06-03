"use client";
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
  Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";
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
const LogHistory = () => {
  const user = { email: "rakib2020.tkg@gmail.com" };

  const router = useRouter();

  // Filter conditions
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(
    null,
  );
  const [isGridLayout, setIsGridLayout] = useState<boolean>(true);

  // Filter logs for this specific authenticated dev
  const userLogs = logs.filter((l) => l.authorEmail === user.email);

  // Apply conditional search queries
  const filteredLogs = userLogs.filter((log) => {
    const matchesSearch =
      log.whatIDid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.whatILearned.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.whatIWillDoTomorrow
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      log.date.includes(searchQuery);

    const matchesCategory =
      categoryFilter === "all" || log.category === categoryFilter;
    const matchesTag =
      !selectedTagFilter || log.tags.includes(selectedTagFilter);

    return matchesSearch && matchesCategory && matchesTag;
  });

  // Unique lists of tags
  const allUserTags = Array.from(new Set(userLogs.flatMap((l) => l.tags)));
    const [selectedLog, setSelectedLog] = useState<typeof logs[0] | null>(logs[0]);
  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setSelectedTagFilter(null);
  };

  const handleDeleteLog = (id: string) => {
    if (
      confirm(
        "Are you absolutely sure you want to delete this log entry descriptor from database parameters? This operation is irreversible.",
      )
    ) {
      const updatedList = logs.filter((l) => l.id !== id);
    }
  };

  const handleLoadIntoEditor = () => {
    alert(
      "To make changes to past daily logs, they are loaded back into your workspace editor. Directing you to editor panel ...",
    );
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* FILTER PANEL SECTION */}
      <section className=" border-b p-4 shrink-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Text input search */}
          <div className="md:col-span-5 flex items-center  border px-3 p-2 rounded-none transition-colors">
            <Search size={14} className=" mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search journals for updates, code strings or lessons learned..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent  text-xs font-mono w-full outline-none placeholder:"
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
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full  border  font-mono text-xs p-2.5 rounded-none cursor-pointer outline-none"
              id="history_category_filter"
            >
              <option value="all">ALL_CATEGORIES</option>
              <option value="feature">FEATURE_DEVELOPMENT</option>
              <option value="bugfix">BUG_RESOLUTION</option>
              <option value="refactor">CODE_OPTIMIZATION/REFACTOR</option>
              <option value="research">TECHNICAL_RESEARCH</option>
              <option value="docs">DOCUMENTATION_WRITING</option>
              <option value="other">MISCELLANEOUS_OPERATIONS</option>
            </select>
          </div>

          {/* Grid vs List layout switchers & reset */}
          <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3 select-none text-xs">
            <div className="flex  p-1 border rounded-none shrink-0 font-mono">
              <button
                onClick={() => setIsGridLayout(true)}
                className={`p-1.5 rounded-none cursor-pointer ${
                  isGridLayout
                    ? "text-zinc-950 font-bold"
                    : " hover:"
                }`}
                title="Bento Grid representation"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setIsGridLayout(false)}
                className={`p-1.5 rounded-none cursor-pointer ${
                  !isGridLayout
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
                className=" text-zinc-350 hover: border p-2 font-mono text-[10px] uppercase font-bold tracking-wider rounded-none cursor-pointer flex items-center gap-1.5"
                id="history_clear_filters_btn"
              >
                <RefreshCw size={11} />
                <span>CLEAR_FILTERS</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Tag Clouds Row */}
        {allUserTags.length > 0 && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t flex flex-wrap items-center gap-2 select-none">
            <span className="text-[10px] font-mono text-zinc-650 font-bold uppercase mr-1.5">
              Filter by exact tag parameter:
            </span>
            <button
              onClick={() => setSelectedTagFilter(null)}
              className={`font-mono text-[9px] px-2 py-0.5 border cursor-pointer`}
            >
              #ALL
            </button>
            {allUserTags.map((tag) => {
              const isSelected = selectedTagFilter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTagFilter(isSelected ? null : tag)}
                  className={`font-mono text-[9px] px-2 py-0.5 border cursor-pointer ${
                    isSelected
                      ? "text-zinc-950 font-bold"
                      : " hover:border-[#aaa] hover:"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* CORE SPATIAL PANES (Left grid, Right inspect panel) */}
      <section className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-y-auto">
        {/* LEFT COLUMN: ARCHIVED SEARCH LISTING GRID (7 Cols on large) */}
        <div className="lg:col-span-7 flex flex-col min-h-0 max-h-full">
          <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable] pr-1">
            {filteredLogs.length === 0 ? (
              <div className="p-12 border text-center 10">
                <Compass size={32} className="text-zinc-850 mx-auto mb-3" />
                <p className="font-mono text-xs  uppercase tracking-wider">
                  NO ARCHIVES MATCHED YOUR QUERY
                </p>
                <p className="text-[11px] text-zinc-650 mt-1 uppercase">
                  Try refining search characters or clear tag selections.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-zinc-950 p-2 font-mono text-[10px] uppercase font-bold tracking-wider rounded-none cursor-pointer"
                >
                  SHOW_ALL_RECORDS
                </button>
              </div>
            ) : isGridLayout ? (
              /* BENTO GRID REPRESENTATION (Crisp thin borders instead of shadows) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLogs.map((log) => {
                  const isSelected = selectedLog && selectedLog.id === log.id;
                  return (
                    <div
                      key={log.id}
                      className={`45 p-4 border transition-colors flex flex-col justify-between h-[180px] cursor-pointer select-none ${
                        isSelected
                          ? " "
                          : "hover:border-zinc-800"
                      }`}
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
                        <h3 className="text-xs font-bold leading-snug truncate mt-1 uppercase font-mono">
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
            ) : (
              /* TERMINAL COMPACT LIST REPRESENTATION */
              <div className="border divide-y divide-zinc-900 select-none">
                {filteredLogs.map((log) => {
                  const isSelected = selectedLog && selectedLog.id === log.id;
                  return (
                    <div
                      key={log.id}
                      className={`p-3 font-mono text-[11.5px] flex items-center justify-between gap-4 transition-colors duration-75 cursor-pointer ${
                        isSelected
                          ? " "
                          : "60 hover: hover:"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 text-left">
                        <div
                          className={`w-1.5 h-1.5 rounded-none flex-shrink-0 ${
                            isSelected ? "bg-zinc-105" : "bg-zinc-800"
                          }`}
                        />

                        <span className="text-zinc-550 shrink-0 font-bold">
                          {log.date}
                        </span>

                        <span className=" shrink-0 font-bold uppercase">
                          [{log.category.substring(0, 3)}]
                        </span>

                        <span className="truncate font-sans font-medium ">
                          {log.whatIDid.substring(0, 60).replace(/^- /, "")}...
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-zinc-650">
                          {log.hoursSpent.toFixed(1)}h
                        </span>
                        <div className="flex gap-1">
                          {log.tags.slice(0, 1).map((t) => (
                            <span
                              key={t}
                              className="text-[9px]   px-1 py-0.5 border border-zinc-850"
                            >
                              #{t}
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

        {/* RIGHT COLUMN: DEDICATED READ VIEW INSPECTOR SCREEN (5 Cols on large) */}
        <div className="lg:col-span-5 flex flex-col min-h-0 max-h-full">
          {selectedLog ? (
            <div className="border border-zinc-850 rounded-none flex-1 flex flex-col min-h-0 [scrollbar-gutter:stable]">
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
                      className={`text-[9px] font-mono font-bold px-1.5 border uppercase ${
                        selectedLog.status === "completed"
                          ? "text-emerald-400 bg-emerald-950/20 border-emerald-900/60"
                          : "text-amber-500 bg-amber-950/20 border-amber-900/60"
                      }`}
                    >
                      STATUS: {selectedLog.status.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-550 font-bold">
                      ID: {selectedLog.id}
                    </span>
                  </div>
                </div>

                {/* Edit & Delete Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleLoadIntoEditor}
                    className="p-1.5  hover:border border-zinc-850  hover: rounded-none cursor-pointer transition-colors"
                    title="Load log parameters into active workspace editor"
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    onClick={() => handleDeleteLog(selectedLog.id)}
                    className="p-1.5  hover:bg-rose-950/25 border border-zinc-850 hover:border-rose-900/40 text-rose-450 hover:text-rose-400 rounded-none cursor-pointer transition-colors"
                    title="Delete log record"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* High Contrast Parameter Indicators */}
              <div className="grid grid-cols-3 divide-x divide-zinc-850 border-b border-zinc-850  p-3 shrink-0 text-center font-mono text-xs select-none">
                <div>
                  <span className="text-[9px]  block uppercase font-bold">
                    Logged Hours
                  </span>
                  <span className=" font-bold block mt-1">
                    {selectedLog.hoursSpent} hrs spent
                  </span>
                </div>
                <div>
                  <span className="text-[9px]  block uppercase font-bold">
                    Log Category
                  </span>
                  <span className=" font-bold block mt-1 uppercase text-[11px]">
                    {selectedLog.category}
                  </span>
                </div>
                <div>
                  <span className="text-[9px]  block uppercase font-bold">
                    Log Record
                  </span>
                  <span className="text-zinc-250 block mt-1">#IndexCard</span>
                </div>
              </div>

              {/* Dedicated Scrollable Content Display */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5 [scrollbar-gutter:stable] /50 text-left">
                {/* 1. What I did today container */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5  font-mono text-[10.5px] font-bold uppercase tracking-wide">
                    <FileText size={12} />
                    <span>01. Operational updates / Tasks did</span>
                  </div>
                  <div className="p-3 border border-zinc-850 rounded-none font-mono text-xs  leading-relaxed whitespace-pre-wrap select-text">
                    {selectedLog.whatIDid || (
                      <em className="text-zinc-750">
                        No actions logged on this cycle.
                      </em>
                    )}
                  </div>
                </div>

                {/* 2. What I learned today container */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5  font-mono text-[10.5px] font-bold uppercase tracking-wide">
                    <BookOpen size={12} />
                    <span>02. Technical Insights / Learnings</span>
                  </div>
                  <div className="p-3 border border-zinc-850 rounded-none font-mono text-xs  leading-relaxed whitespace-pre-wrap select-text">
                    {selectedLog.whatILearned || (
                      <em className="text-zinc-750">
                        No insights documented during this checkpoint.
                      </em>
                    )}
                  </div>
                </div>

                {/* 3. What I will do tomorrow container */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5  font-mono text-[10.5px] font-bold uppercase tracking-wide">
                    <Compass size={12} />
                    <span>03. Next Step Roadmaps / Planning</span>
                  </div>
                  <div className="p-3 border border-zinc-850 rounded-none font-mono text-xs  leading-relaxed whitespace-pre-wrap select-text">
                    {selectedLog.whatIWillDoTomorrow || (
                      <em className="text-zinc-750">
                        No next actions specified on this cycle.
                      </em>
                    )}
                  </div>
                </div>

                {/* Assigned tags display */}
                <div className="space-y-2 pt-2 border-t select-none">
                  <div className="text-[10px] font-mono text-zinc-550 font-bold uppercase tracking-wider">
                    Assigned Log Tag parameters:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedLog.tags.length === 0 ? (
                      <span className="text-[10px]  italic">
                        No tags associated
                      </span>
                    ) : (
                      selectedLog.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-zinc-350 px-2 py-0.5 border border-zinc-850"
                        >
                          #{t}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Action Close Panel Button */}
              <div className="p-3 border-t border-zinc-850 shrink-0 flex items-center justify-between select-none">
                <span className="text-[10px] text-zinc-550 font-mono italic">
                  Committed:{" "}
                  {new Date(selectedLog.createdAt).toLocaleTimeString()}
                </span>
                <button
                  onClick={handleLoadIntoEditor}
                  className=" text-zinc-205 hover: hover: border border-zinc-850 py-1.5 px-4 font-mono text-[10px] uppercase font-bold tracking-wider rounded-none cursor-pointer transition-colors"
                >
                  LOAD_INTO_EDITOR
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-zinc-850 p-12 text-center 10 rounded-none flex-1 flex flex-col justify-center items-center select-none">
              <FileText size={40} className=" mb-3" />
              <p className="font-mono text-xs text-zinc-550 uppercase font-bold">
                NO LOG SELECTED
              </p>
              <p className="text-[10px]  mt-2 max-w-xs uppercase">
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
