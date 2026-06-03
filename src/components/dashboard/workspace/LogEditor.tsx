"use client";
import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, GitCommit } from "lucide-react";

const POPULAR_TAGS = [
  "setup",
  "auth",
  "database",
  "refactor",
  "ui",
  "api",
  "ux",
  "docs",
  "testing",
  "ops",
];

const logs = [
  {
    id: "log-1",
    date: "2026-06-03",
    authorEmail: "user@example.com",
    whatIDid: "Implemented user authentication flow with JWT tokens.",
    whatILearned:
      "Learned about JWT token management and security best practices.",
    whatIWillDoTomorrow:
      "Continue working on the API integration for the authentication service.",
    category: "feature",
    hoursSpent: 3.5,
    tags: ["auth", "backend"],
    status: "completed",
  },
];

const LogEditor = () => {
  // Mocked user and logs state (replace with actual data fetching in production)
  const user = { email: "user@example.com" };
  const todayDateStr = "2026-06-03";

  // Find today's log in central logs state
  const todayLog = logs.find(
    (l) => l.date === todayDateStr && l.authorEmail === user.email,
  );

  // Form states
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [whatIDid, setWhatIDid] = useState<string>("");
  const [whatILearned, setWhatILearned] = useState<string>("");
  const [whatIWillDoTomorrow, setWhatIWillDoTomorrow] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<
    "feature" | "bugfix" | "refactor" | "research" | "docs" | "other"
  >("feature");
  const [hoursSpent, setHoursSpent] = useState<number>(1.0);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  // Hydrate today's entries if they exist
  useEffect(() => {
    if (todayLog) {
      setWhatIDid(todayLog.whatIDid);
      setWhatILearned(todayLog.whatILearned);
      setWhatIWillDoTomorrow(todayLog.whatIWillDoTomorrow);
      setIsCompleted(todayLog.status === "completed");
      setHoursSpent(todayLog.hoursSpent);
      setActiveTags(todayLog.tags);
    } else {
      setWhatIDid("");
      setWhatILearned("");
      setWhatIWillDoTomorrow("");
      setIsCompleted(false);
      setHoursSpent(1.0);
      setSelectedCategory("feature");
      setActiveTags([]);
    }
  }, [todayLog]);

  // Apply quick templates helper helper
  const applyQuickTemplate = (
    field: "did" | "learned" | "tomorrow",
    template: string,
  ) => {
    if (field === "did") {
      const separator = whatIDid ? "\n" : "";
      setWhatIDid((prev) => prev + separator + template);
    } else if (field === "learned") {
      const separator = whatILearned ? "\n" : "";
      setWhatILearned((prev) => prev + separator + template);
    } else if (field === "tomorrow") {
      const separator = whatIWillDoTomorrow ? "\n" : "";
      setWhatIWillDoTomorrow((prev) => prev + separator + template);
    }
  };

  // Add individual tags
  const handleAddTag = (incoming: string) => {
    const clean = incoming.trim().toLowerCase().replace(/#/g, "");
    if (!clean) return;
    if (activeTags.includes(clean)) {
      setTagInput("");
      return;
    }
    setActiveTags([...activeTags, clean]);
    setTagInput("");
  };

  // Remove individual tags
  const handleRemoveTag = (tag: string) => {
    setActiveTags(activeTags.filter((t) => t !== tag));
  };

  // Submit/Commit daily logs
  const handleCommitLog = (e: React.FormEvent) => {
    e.preventDefault();

    const entryId = todayLog ? todayLog.id : `log-${Date.now()}`;
    const newEntry = {
      id: entryId,
      date: todayDateStr,
      authorEmail: user.email,
      whatIDid: whatIDid.trim(),
      whatILearned: whatILearned.trim(),
      whatIWillDoTomorrow: whatIWillDoTomorrow.trim(),
      status: isCompleted ? "completed" : "draft",
      tags: activeTags,
      hoursSpent: hoursSpent,
      category: selectedCategory,
      createdAt: new Date().toISOString(),
    };
  };

  return (
    <div className="lg:col-span-8 flex flex-col gap-6 lg:max-h-full min-h-0">
      <form
        onSubmit={handleCommitLog}
        className="flex-1 flex flex-col gap-6 min-h-0 text-left"
      >
        {/* Editor Workspace Status Block */}
        <div className="border  p-4 md:p-5 rounded-none flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 transition-colors">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CalendarIcon size={15} className="text-zinc-400" />
              <span className="font-mono text-sm font-bold text-zinc-150">
                Wednesday, June 3, 2026
              </span>
              <span className="bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 text-[9px] font-mono px-1.5 font-bold tracking-wider">
                CURRENT_CYCLE
              </span>
            </div>
            <p className="text-xs text-gray-900 font-sans">
              Logs committed for the current cycle are recorded instantly to
              your active profile metadata logs.
            </p>
          </div>

          {/* Status Selector Switch */}
          <div className="flex items-center gap-2.5  p-1.5 border border-zinc-850 self-start sm:self-auto shrink-0">
            <span className="font-mono text-[10px] text-gray-900 tracking-wide uppercase px-2 select-none">
              State Indicator:
            </span>

            <button
              type="button"
              onClick={() => {
                setIsCompleted(false);
              }}
              className={`font-mono text-[9px] font-bold px-2.5 py-1 uppercase rounded-none transition-all cursor-pointer ${
                !isCompleted
                  ? "bg-amber-500 text-zinc-950 border border-amber-500"
                  : "bg-transparent text-gray-900 hover:text-zinc-300 border border-transparent"
              }`}
              id="status_draft_btn"
            >
              Draft
            </button>

            <button
              type="button"
              onClick={() => {
                setIsCompleted(true);
              }}
              className={`font-mono text-[9px] font-bold px-2.5 py-1 uppercase rounded-none transition-all cursor-pointer ${
                isCompleted
                  ? "bg-zinc-100 text-zinc-950 border border-zinc-100"
                  : "bg-transparent text-gray-900 hover:text-zinc-300 border border-transparent"
              }`}
              id="status_completed_btn"
            >
              Completed
            </button>
          </div>
        </div>

        {/* THREE CLEAR SECTIONS FORM AREA */}
        <div className="flex-1 min-h-[350px] overflow-y-auto space-y-6 [scrollbar-gutter:stable]">
          {/* Section 1: What I did today */}
          <div className="border border-zinc-805 p-5 rounded-none space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-gray-900 text-sm font-bold select-none">
                  01/
                </span>
                <h3 className="font-mono text-xs font-bold text-gray-900 uppercase tracking-wide">
                  What I did today
                </h3>
              </div>

              {/* Quick Prompts Helper */}
              <div className="flex items-center gap-1.5 select-none">
                <span className="text-[10px] text-zinc-600 font-mono font-bold hidden sm:inline uppercase">
                  Quick Append:
                </span>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      applyQuickTemplate(
                        "did",
                        "- Fixed priority-1 race condition in authentication handlers.",
                      )
                    }
                    className=" hover:text-zinc-400 font-mono text-[9px] px-1.5 py-0.5 border border-zinc-850 cursor-pointer text-left"
                  >
                    + Race Fix
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      applyQuickTemplate(
                        "did",
                        "- Refactored styling patterns to strictly align with zero-shadow specs.",
                      )
                    }
                    className=" hover:text-zinc-400 font-mono text-[9px] px-1.5 py-0.5 border border-zinc-850 cursor-pointer text-left"
                  >
                    + Style Refactor
                  </button>
                </div>
              </div>
            </div>

            <textarea
              placeholder="Summarize code actions, merged branches, refactored controllers, or resolved issues..."
              value={whatIDid}
              onChange={(e) => setWhatIDid(e.target.value)}
              className="w-full h-28  border border-zinc-850 focus:border-zinc-200 text-gray-900 text-sm font-mono p-3 leading-relaxed rounded-none resize-none outline-none transition-colors"
              id="editor_what_i_did"
            />
          </div>

          {/* Section 2: What I learned */}
          <div className="border border-zinc-805 p-5 rounded-none space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-gray-900 text-sm font-bold select-none">
                  02/
                </span>
                <h3 className="font-mono text-xs font-bold text-gray-900 uppercase tracking-wide">
                  What I learned
                </h3>
              </div>

              {/* Quick prompts helper */}
              <div className="flex gap-1 select-none">
                <button
                  type="button"
                  onClick={() =>
                    applyQuickTemplate(
                      "learned",
                      "Explicit border highlights provide high contrast context cues without rendering bulky drop-shadow container layers.",
                    )
                  }
                  className=" hover:text-zinc-400 font-mono text-[9px] px-1.5 py-0.5 border border-zinc-850 cursor-pointer text-left"
                >
                  + Flat Aesthetics
                </button>
                <button
                  type="button"
                  onClick={() =>
                    applyQuickTemplate(
                      "learned",
                      "Event listener memory leaks are frequently averted by specifying accurate primitive states in hooks arrays.",
                    )
                  }
                  className=" hover:text-zinc-400 font-mono text-[9px] px-1.5 py-0.5 border border-zinc-850 cursor-pointer text-left"
                >
                  + Memory Traces
                </button>
              </div>
            </div>

            <textarea
              placeholder="Document architectural insights, protocol updates, tool configs, or unexpected bugs resolved..."
              value={whatILearned}
              onChange={(e) => setWhatILearned(e.target.value)}
              className="w-full h-20  border border-zinc-850 focus:border-zinc-200 text-gray-900 text-sm font-mono p-3 leading-relaxed rounded-none resize-none outline-none transition-colors"
              id="editor_what_i_learned"
            />
          </div>

          {/* Section 3: What I will do tomorrow */}
          <div className="border border-zinc-805 p-5 rounded-none space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-gray-900 text-sm font-bold select-none">
                  03/
                </span>
                <h3 className="font-mono text-xs font-bold text-gray-900 uppercase tracking-wide">
                  What I will do tomorrow
                </h3>
              </div>

              {/* Quick prompts helper */}
              <div className="flex gap-1 select-none">
                <button
                  type="button"
                  onClick={() =>
                    applyQuickTemplate(
                      "tomorrow",
                      "- Execute build pipeline metrics across client-side browser frames.",
                    )
                  }
                  className=" hover:text-zinc-400 font-mono text-[9px] px-1.5 py-0.5 border border-zinc-850 cursor-pointer text-left"
                >
                  + Metrics Check
                </button>
                <button
                  type="button"
                  onClick={() =>
                    applyQuickTemplate(
                      "tomorrow",
                      "- Structure modular unit tests for notification cron setups.",
                    )
                  }
                  className=" hover:text-zinc-400 font-mono text-[9px] px-1.5 py-0.5 border border-zinc-850 cursor-pointer text-left"
                >
                  + Unit-Test
                </button>
              </div>
            </div>

            <textarea
              placeholder="Outline roadmap steps, testing intervals, code review processes, or scheduled syncs..."
              value={whatIWillDoTomorrow}
              onChange={(e) => setWhatIWillDoTomorrow(e.target.value)}
              className="w-full h-20  border border-zinc-850 focus:border-zinc-200 text-gray-900 text-sm font-mono p-3 leading-relaxed rounded-none resize-none outline-none transition-colors"
              id="editor_what_i_tomorrow"
            />
          </div>

          {/* Categorization, Hours Spent, and Tag Picker */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Category & Hours */}
            <div className="md:col-span-5 border  p-4 rounded-none space-y-4">
              {/* Category */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase select-none font-sans">
                  Dev Activity Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value as any);
                  }}
                  className="w-full  border border-zinc-850 focus:border-zinc-200 text-zinc-100 font-mono text-xs p-2 rounded-none cursor-pointer outline-none"
                  id="editor_category_select"
                >
                  <option value="feature">FEATURE_DEVELOPMENT</option>
                  <option value="bugfix">BUG_RESOLUTION</option>
                  <option value="refactor">CODE_OPTIMIZATION/REFACTOR</option>
                  <option value="research">TECHNICAL_RESEARCH</option>
                  <option value="docs">DOCUMENTATION_WRITING</option>
                  <option value="other">MISCELLANEOUS_OPERATIONS</option>
                </select>
              </div>

              {/* Hours spent helper */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase flex justify-between select-none font-sans">
                  <span>Hours expended</span>
                  <span className="text-zinc-100 font-bold">
                    {hoursSpent.toFixed(1)} hrs
                  </span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="24"
                    value={hoursSpent}
                    onChange={(e) =>
                      setHoursSpent(parseFloat(e.target.value) || 0)
                    }
                    className="w-20  text-zinc-100 font-mono text-center text-xs p-2 border border-zinc-850 focus:border-zinc-200 rounded-none [appearance:textfield] outline-none"
                    id="editor_hours_input"
                  />

                  {/* Quick Adjusters */}
                  <div className="flex-1 grid grid-cols-4 gap-1 select-none">
                    {[-1, -0.5, 0.5, 1].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setHoursSpent((prev) =>
                            Math.min(24, Math.max(0.5, prev + amt)),
                          );
                        }}
                        className=" hover:bg-zinc-905 border border-zinc-850 hover:border-zinc-400 text-zinc-400 hover:text-gray-900 text-[10px] uppercase font-mono font-bold rounded-none cursor-pointer flex items-center justify-center transition-all"
                      >
                        {amt >= 0 ? `+${amt}` : amt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submitting Tag cloud management */}
            <div className="md:col-span-7 border  p-4 rounded-none space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase select-none font-sans">
                  Tags / Metadata Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type standard tag keyword and hit enter..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag(tagInput);
                      }
                    }}
                    className="flex-1  text-zinc-100 font-mono text-xs p-2 border border-zinc-850 focus:border-zinc-200 rounded-none outline-none placeholder:text-zinc-700"
                    id="editor_tag_field"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTag(tagInput)}
                    className=" hover:text-zinc-205 border border-zinc-850 hover:border-zinc-400 px-3 font-mono text-xs uppercase font-bold cursor-pointer transition-all"
                  >
                    ADD
                  </button>
                </div>
              </div>

              {/* Active tags visual wrap */}
              <div className="flex flex-wrap gap-1.5 p-2  border border-zinc-900 min-h-[38px] items-center">
                {activeTags.length === 0 ? (
                  <span className="text-[10px] text-zinc-700 font-mono italic select-none">
                    No tags assigned ...
                  </span>
                ) : (
                  activeTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-900 border  py-0.5 px-2.5 rounded-none"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-900 hover:text-gray-900 font-extrabold cursor-pointer text-[11px] leading-3 ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Popular shortcuts */}
              <div className="pt-1.5 select-none">
                <span className="text-[9px] font-mono text-zinc-600 block uppercase font-bold mb-1 font-sans">
                  Quick assign standard index keywords:
                </span>
                <div className="flex flex-wrap gap-1">
                  {POPULAR_TAGS.map((tag) => {
                    const isAssigned = activeTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          isAssigned ? handleRemoveTag(tag) : handleAddTag(tag)
                        }
                        className={`font-mono text-[9px] px-1.5 py-0.5 border cursor-pointer ${
                          isAssigned
                            ? "bg-zinc-100 text-zinc-950 border-zinc-100 font-bold"
                            : "bg-transparent text-gray-900 border-zinc-900 hover: hover:text-zinc-400"
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BIG ACTION COMMIT BUTTON */}
        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={!whatIDid.trim()}
            className={`flex-1 p-3 font-mono text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 border cursor-pointer select-none rounded-none transition-all ${
              whatIDid.trim()
                ? "bg-zinc-100 text-zinc-950 border-zinc-100 hover:bg-zinc-200"
                : "text-zinc-650 border-zinc-850 cursor-not-allowed"
            }`}
            id="submit_daily_log_btn"
          >
            <GitCommit size={15} className="stroke-[2.5]" />
            <span>
              {todayLog
                ? "UPDATE_TODAYS_DEVLOG_PARAMS"
                : "COMMIT_TODAYS_DEVLOG"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              const payload = `--- DEVLOG Wednesday, June 3, 2026 ---\nCategory: ${selectedCategory.toUpperCase()}\nHours spent: ${hoursSpent} hrs\nTags: ${activeTags.map((t) => "#" + t).join(", ")}\n\n1. WHAT I DID:\n${whatIDid}\n\n2. WHAT I LEARNED:\n${whatILearned}\n\n3. NEXT STEPS:\n${whatIWillDoTomorrow}`;
              alert(`[RAW DEVLOG PARAMETER EXPORT]\n\n${payload}`);
            }}
            className=" hover:border border-zinc-850 hover:border-zinc-450 text-zinc-300 font-mono text-xs uppercase font-bold p-3 rounded-none cursor-pointer shrink-0 transition-colors"
          >
            EXPORT_RAW
          </button>
        </div>
      </form>
    </div>
  );
};
export default LogEditor;
