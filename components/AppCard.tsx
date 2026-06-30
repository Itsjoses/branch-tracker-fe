"use client";

import { AppSummary } from "@/lib/api";
import { getLanguageColor, formatTimestamp } from "@/lib/mock-data";
import BranchBadge from "./BranchBadge";
import { ChevronRight } from "lucide-react";

interface AppCardProps {
  app: AppSummary;
  onClick: () => void;
}

export default function AppCard({ app, onClick }: AppCardProps) {
  const langColor = getLanguageColor(app.language ?? "");
  const isActive = !!app.isActive;

  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5
        transition-all duration-200
        hover:border-white/[0.12] hover:bg-white/[0.06]
        active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20
            border border-indigo-500/20 flex items-center justify-center">
            <span className="text-xs font-bold text-indigo-300">{String(app.id).padStart(2, "0")}</span>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-100 truncate text-sm">{app.name}</h3>
            {app.language && <span className={`text-xs font-medium ${langColor}`}>{app.language}</span>}
          </div>
        </div>
        <span className={`flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border
          ${isActive
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
            : "bg-slate-500/10 text-slate-500 border-slate-600/30"
          }`}>
          {isActive ? "active" : "inactive"}
        </span>
      </div>

      <div className="mb-4">
        <BranchBadge branch={app.currentBranch} />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-slate-600 font-mono">{formatTimestamp(app.updatedAt)}</span>
        <ChevronRight className="h-4 w-4 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" />
      </div>
    </button>
  );
}
