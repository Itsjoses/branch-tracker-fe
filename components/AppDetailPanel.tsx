"use client";

import { useState } from "react";
import { AppDetail, toggleActive } from "@/lib/api";
import { getBranchColor, getLanguageColor, formatTimestamp } from "@/lib/mock-data";
import BranchBadge from "./BranchBadge";
import { X, GitBranch, History, Power } from "lucide-react";

interface AppDetailPanelProps {
  app: AppDetail | null;
  loading: boolean;
  onClose: () => void;
  onToggle: (id: number, isActive: boolean) => void;
}

export default function AppDetailPanel({ app, loading, onClose, onToggle }: AppDetailPanelProps) {
  const [toggling, setToggling] = useState(false);
  const langColor = getLanguageColor(app?.language ?? "");

  const handleToggle = async () => {
    if (!app) return;
    setToggling(true);
    try {
      const res = await toggleActive(app.id);
      onToggle(app.id, res.isActive);
    } finally {
      setToggling(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-lg flex flex-col
        bg-[#0f1120] border-l border-white/[0.08] shadow-2xl shadow-black/50 overflow-y-auto">

        {/* header */}
        <div className="sticky top-0 z-10 bg-[#0f1120]/95 backdrop-blur-md border-b border-white/[0.06] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20
                border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                {app ? (
                  <span className="text-sm font-bold text-indigo-300">{String(app.id).padStart(2, "0")}</span>
                ) : (
                  <div className="h-5 w-5 rounded shimmer" />
                )}
              </div>
              <div>
                {app ? (
                  <>
                    <h2 className="font-semibold text-slate-100 text-base">{app.name}</h2>
                    {app.language && <span className={`text-xs font-medium ${langColor}`}>{app.language}</span>}
                  </>
                ) : (
                  <div className="space-y-1.5">
                    <div className="h-4 w-32 rounded shimmer" />
                    <div className="h-3 w-16 rounded shimmer" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {app && (
                <button
                  onClick={handleToggle}
                  disabled={toggling}
                  className={`flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-all
                    ${!!app.isActive
                      ? "bg-slate-500/10 text-slate-400 border-slate-600/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                    } disabled:opacity-50`}
                >
                  <Power className="h-3 w-3" />
                  {toggling ? "..." : !!app.isActive ? "Deactivate" : "Activate"}
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.06] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 px-6 py-6 space-y-6">
          {loading || !app ? (
            <div className="space-y-4">
              <div className="h-6 w-24 rounded shimmer" />
              <div className="h-10 w-48 rounded-full shimmer" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-11 rounded-xl shimmer" />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* timestamp */}
              <p className="text-xs text-slate-600 font-mono">{formatTimestamp(app.updatedAt)}</p>

              {/* current branch */}
              <Section title="Current Branch" icon={<GitBranch className="h-3.5 w-3.5" />}>
                <BranchBadge branch={app.currentBranch} />
              </Section>

              {/* last 5 branches */}
              <Section title="Last 5 Branches" icon={<History className="h-3.5 w-3.5" />}>
                {app.branchHistories.length === 0 ? (
                  <p className="text-xs text-slate-600">Belum ada history</p>
                ) : (
                  <div className="space-y-2">
                    {app.branchHistories.map((entry, i) => {
                      const colors = getBranchColor(entry.branch);
                      const isCurrent = entry.branch === app.currentBranch && i === 0;
                      return (
                        <div
                          key={i}
                          className={`flex items-center justify-between rounded-xl border px-4 py-3
                            ${isCurrent
                              ? "bg-violet-950/60 border-violet-800/50"
                              : "border-white/[0.04] bg-white/[0.02]"
                            }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${isCurrent ? "bg-violet-400" : "bg-slate-600"}`} />
                            <span className={`text-xs font-mono truncate ${isCurrent ? "text-violet-300 font-semibold" : "text-slate-500"}`}>
                              {entry.branch}
                            </span>
                            {isCurrent && (
                              <span className="text-[9px] font-bold rounded px-1.5 py-0.5 flex-shrink-0
                                bg-violet-500/20 text-violet-300 border border-violet-500/30">
                                NOW
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-600 font-mono flex-shrink-0 ml-3">
                            {formatTimestamp(entry.createdAt)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Section>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Section({ title, icon, children }: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{title}</span>
      </div>
      {children}
    </div>
  );
}
