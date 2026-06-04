"use client";
import { Calendar as CalendarIcon, GitCommit, Loader2 } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLogAction, updateLogAction } from "@/lib/actions/logs";
import { Log, LogCategory, LogStatus } from "@/interfaces/log";

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

interface LogEditorProps {
  initialData?: Log;
}

const LogEditor = ({ initialData }: LogEditorProps) => {
  const [isPending, startTransition] = useTransition();
  const todayDateStr = new Date().toISOString().split("T")[0];

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [whatIDid, setWhatIDid] = useState<string>("");
  const [whatILearned, setWhatILearned] = useState<string>("");
  const [whatIWillDoTomorrow, setWhatIWillDoTomorrow] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<LogCategory>("feature");
  const [hoursSpent, setHoursSpent] = useState<number>(1.0);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setIsCompleted(initialData.status === "completed");
      setWhatIDid(initialData.whatIDid || "");
      setWhatILearned(initialData.whatILearned || "");
      setWhatIWillDoTomorrow(initialData.whatIWillDoTomorrow || "");
      setSelectedCategory(initialData.category || "feature");
      setHoursSpent(parseFloat(initialData.hoursSpent) || 1.0);
    }
  }, [initialData]);

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

    startTransition(async () => {
      const payload = {
        whatIDid: whatIDid.trim(),
        whatILearned: whatILearned.trim(),
        whatIWillDoTomorrow: whatIWillDoTomorrow.trim(),
        status: (isCompleted ? "completed" : "draft") as LogStatus,
        hoursSpent: hoursSpent.toString(),
        category: selectedCategory,
        date: todayDateStr,
      };

      let result;
      if (initialData?.id) {
        result = await updateLogAction(initialData.id, payload);
      } else {
        result = await createLogAction(payload);
      }

      if (result.success) {
        if (!initialData) {
          // Reset form if it was a new creation
          setWhatIDid("");
          setWhatILearned("");
          setWhatIWillDoTomorrow("");
          setIsCompleted(false);
          setHoursSpent(1.0);
          setActiveTags([]);
        }
        alert(initialData ? "Log updated successfully!" : "Log saved successfully!");
      } else {
        alert("Error: " + result.error);
      }
    });
  };

  return (
    <section className="lg:col-span-8 flex flex-col gap-6 lg:max-h-full min-h-0">
      <form
        onSubmit={handleCommitLog}
        className="flex-1 flex flex-col gap-6 min-h-0 text-left"
      >
        {/* Editor Workspace Status Block */}
        <div className="border border-gray-200 p-4 md:p-5 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 transition-colors">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CalendarIcon size={15} className="text-gray-600" />
              <span className="font-mono text-sm font-bold text-gray-900">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[9px] font-mono font-bold tracking-wider">
                Current Cycle
              </span>
            </div>
            <p className="text-xs text-gray-600 font-sans">
              Logs committed for the current cycle are recorded instantly to your active profile metadata logs.
            </p>
          </div>

          {/* Status Selector Switch */}
          <div className="flex items-center gap-2.5 p-1.5 bg-white border border-gray-200 self-start sm:self-auto shrink-0">
            <span className="font-mono text-[10px] text-gray-600 select-none">
              State:
            </span>

            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                setIsCompleted(false);
              }}
              className={`font-mono text-[9px] font-bold px-2.5 py-1 transition-all cursor-pointer ${!isCompleted
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-transparent text-gray-600 hover:bg-gray-50"
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
              id="status_draft_btn"
            >
              Draft
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                setIsCompleted(true);
              }}
              className={`font-mono text-[9px] font-bold px-2.5 py-1 transition-all cursor-pointer ${isCompleted
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-transparent text-gray-600 hover:bg-gray-50"
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
              id="status_completed_btn"
            >
              Completed
            </button>
          </div>
        </div>

        {/* THREE CLEAR SECTIONS FORM AREA */}
        <div className="flex-1 min-h-[350px] overflow-y-auto space-y-6 [scrollbar-gutter:stable]">
          {/* Section 1: What I did today */}
          <div className="border border-gray-200 p-5 bg-gray-50  space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-gray-900 text-sm font-bold select-none">
                  01/
                </span>
                <h3 className="font-mono text-xs font-bold text-gray-900">
                  What I did today
                </h3>
              </div>

              {/* Quick Prompts Helper */}
              <div className="flex items-center gap-1.5 select-none">
                <span className="text-[10px] font-mono font-bold hidden sm:inline text-gray-500">
                  Quick Append:
                </span>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                      applyQuickTemplate(
                        "did",
                        "- Fixed priority-1 race condition in authentication handlers.",
                      )
                    }
                    className="bg-white hover:bg-gray-50 font-mono text-[9px] px-1.5 py-0.5 border border-gray-200  cursor-pointer text-left transition-colors disabled:opacity-50"
                  >
                    + Race Fix
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                      applyQuickTemplate(
                        "did",
                        "- Refactored styling patterns to strictly align with zero-shadow specs.",
                      )
                    }
                    className="bg-white hover:bg-gray-50 font-mono text-[9px] px-1.5 py-0.5 border border-gray-200  cursor-pointer text-left transition-colors disabled:opacity-50"
                  >
                    + Style Refactor
                  </button>
                </div>
              </div>
            </div>

            <Textarea
              placeholder="Summarize code actions, merged branches, refactored controllers, or resolved issues..."
              value={whatIDid}
              disabled={isPending}
              onChange={(e) => setWhatIDid(e.target.value)}
              className="w-full h-28 text-gray-900 text-sm font-mono leading-relaxed resize-none"
              id="editor_what_i_did"
            />
          </div>

          {/* Section 2: What I learned */}
          <div className="border border-gray-200 p-5 bg-gray-50  space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-gray-900 text-sm font-bold select-none">
                  02/
                </span>
                <h3 className="font-mono text-xs font-bold text-gray-900">
                  What I learned
                </h3>
              </div>

              {/* Quick prompts helper */}
              <div className="flex gap-1 select-none">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    applyQuickTemplate(
                      "learned",
                      "Explicit border highlights provide high contrast context cues without rendering bulky drop-shadow container layers.",
                    )
                  }
                  className="bg-white hover:bg-gray-50 font-mono text-[9px] px-1.5 py-0.5 border border-gray-200  cursor-pointer text-left transition-colors disabled:opacity-50"
                >
                  + Flat Aesthetics
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    applyQuickTemplate(
                      "learned",
                      "Event listener memory leaks are frequently averted by specifying accurate primitive states in hooks arrays.",
                    )
                  }
                  className="bg-white hover:bg-gray-50 font-mono text-[9px] px-1.5 py-0.5 border border-gray-200  cursor-pointer text-left transition-colors disabled:opacity-50"
                >
                  + Memory Traces
                </button>
              </div>
            </div>

            <Textarea
              placeholder="Document architectural insights, protocol updates, tool configs, or unexpected bugs resolved..."
              value={whatILearned}
              disabled={isPending}
              onChange={(e) => setWhatILearned(e.target.value)}
              className="w-full h-20 text-gray-900 text-sm font-mono leading-relaxed resize-none"
              id="editor_what_i_learned"
            />
          </div>

          {/* Section 3: What I will do tomorrow */}
          <div className="border border-gray-200 p-5 bg-gray-50  space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-gray-900 text-sm font-bold select-none">
                  03/
                </span>
                <h3 className="font-mono text-xs font-bold text-gray-900">
                  What I will do tomorrow
                </h3>
              </div>

              {/* Quick prompts helper */}
              <div className="flex gap-1 select-none">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    applyQuickTemplate(
                      "tomorrow",
                      "- Execute build pipeline metrics across client-side browser frames.",
                    )
                  }
                  className="bg-white hover:bg-gray-50 font-mono text-[9px] px-1.5 py-0.5 border border-gray-200  cursor-pointer text-left transition-colors disabled:opacity-50"
                >
                  + Metrics Check
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    applyQuickTemplate(
                      "tomorrow",
                      "- Structure modular unit tests for notification cron setups.",
                    )
                  }
                  className="bg-white hover:bg-gray-50 font-mono text-[9px] px-1.5 py-0.5 border border-gray-200  cursor-pointer text-left transition-colors disabled:opacity-50"
                >
                  + Unit-Test
                </button>
              </div>
            </div>

            <Textarea
              placeholder="Outline roadmap steps, testing intervals, code review processes, or scheduled syncs..."
              value={whatIWillDoTomorrow}
              disabled={isPending}
              onChange={(e) => setWhatIWillDoTomorrow(e.target.value)}
              className="w-full h-20 bg-white text-gray-900 focus:outline-none text-sm font-mono leading-relaxed resize-none"
              id="editor_what_i_tomorrow"
            />
          </div>

          {/* Categorization, Hours Spent, and Tag Picker */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Category & Hours */}
            <div className="md:col-span-5 border border-gray-200 p-4 bg-gray-50  space-y-4">
              {/* Category */}
              <div className="space-y-1.5">
                <Label className="text-xs font-mono font-bold select-none font-sans text-gray-700">
                  Dev Activity Category
                </Label>
                <Select
                  value={selectedCategory}
                  disabled={isPending}
                  onValueChange={(value) => setSelectedCategory(value as LogCategory)}
                >
                  <SelectTrigger className="w-full font-mono text-xs">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature">Feature Development</SelectItem>
                    <SelectItem value="bugfix">Bug Resolution</SelectItem>
                    <SelectItem value="refactor">Code Optimization/Refactor</SelectItem>
                    <SelectItem value="research">Technical Research</SelectItem>
                    <SelectItem value="docs">Documentation Writing</SelectItem>
                    <SelectItem value="other">Miscellaneous Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hours spent helper */}
              <div className="space-y-1.5">
                <Label className="text-xs font-mono font-bold flex justify-between select-none font-sans text-gray-700">
                  <span>Hours expended</span>
                  <span className="font-bold text-gray-900">
                    {hoursSpent.toFixed(1)} hrs
                  </span>
                </Label>

                <div className="flex gap-2">
                  <Input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="24"
                    value={hoursSpent}
                    disabled={isPending}
                    onChange={(e) =>
                      setHoursSpent(parseFloat(e.target.value) || 0)
                    }
                    className="w-20 font-mono text-center text-xs [appearance:textfield]"
                    id="editor_hours_input"
                  />

                  {/* Quick Adjusters */}
                  <div className="flex-1 grid grid-cols-4 gap-1 select-none">
                    {[-1, -0.5, 0.5, 1].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        disabled={isPending}
                        onClick={() => {
                          setHoursSpent((prev) =>
                            Math.min(24, Math.max(0.5, prev + amt)),
                          );
                        }}
                        className="hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 text-[10px] font-mono font-bold  cursor-pointer flex items-center justify-center transition-all disabled:opacity-50"
                      >
                        {amt >= 0 ? `+${amt}` : amt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submitting Tag cloud management */}
            <div className="md:col-span-7 border border-gray-200 p-4 bg-white  space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <Label className="text-xs font-mono font-bold select-none font-sans text-gray-700">
                  Tags / Metadata Tags (Not yet persisted)
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type standard tag keyword and hit enter..."
                    value={tagInput}
                    disabled={isPending}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag(tagInput);
                      }
                    }}
                    className="flex-1 font-mono text-xs placeholder:text-gray-400"
                    id="editor_tag_field"
                  />
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleAddTag(tagInput)}
                    className="hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 px-3 font-mono text-xs font-bold cursor-pointer transition-all disabled:opacity-50"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Active tags visual wrap */}
              <div className="flex flex-wrap gap-1.5 p-2 border border-gray-200 min-h-[38px] items-center bg-gray-50">
                {activeTags.length === 0 ? (
                  <span className="text-[10px] font-mono italic select-none text-gray-400">
                    No tags assigned ...
                  </span>
                ) : (
                  activeTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-700 border border-gray-200 bg-white py-0.5 px-2.5"
                    >
                      #{tag}
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-500 hover:text-gray-900 font-extrabold cursor-pointer text-[11px] leading-3 ml-0.5 transition-colors disabled:opacity-50"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Popular shortcuts */}
              <div className="pt-1.5 select-none">
                <span className="text-[9px] font-mono block font-bold mb-1 font-sans text-gray-500">
                  Quick assign standard index keywords:
                </span>
                <div className="flex flex-wrap gap-1">
                  {POPULAR_TAGS.map((tag) => {
                    const isAssigned = activeTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        disabled={isPending}
                        onClick={() =>
                          isAssigned ? handleRemoveTag(tag) : handleAddTag(tag)
                        }
                        className={`font-mono text-[9px] px-1.5 py-0.5 border  cursor-pointer transition-colors ${isAssigned
                            ? "bg-gray-900 text-white font-bold border-gray-900"
                            : "bg-transparent text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                          } disabled:opacity-50`}
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
            disabled={!whatIDid.trim() || isPending}
            className={`flex-1 p-3 font-mono text-xs font-bold flex items-center justify-center gap-2 border cursor-pointer select-none transition-all bg-black text-white disabled:bg-gray-400 disabled:cursor-not-allowed`}
            id="submit_daily_log_btn"
          >
            {isPending ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <GitCommit size={15} className="stroke-[2.5]" />
            )}
            <span>{initialData ? "Update Log" : "Save Log"}</span>
          </button>
        </div>
      </form>
    </section>
  );
};
export default LogEditor;
