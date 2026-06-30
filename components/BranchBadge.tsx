"use client";

import { getBranchColor } from "@/lib/mock-data";
import { GitBranch } from "lucide-react";

export default function BranchBadge({
  branch,
  size = "md",
}: {
  branch: string;
  size?: "sm" | "md";
}) {
  const colors = getBranchColor(branch);
  const isSmall = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 font-mono font-semibold transition-shadow duration-300
        ${isSmall ? "py-0.5 text-[10px]" : "py-1 text-xs"}
        ${colors.bg} ${colors.text} ${colors.border} ${colors.glow}`}
    >
      <GitBranch className={isSmall ? "h-2.5 w-2.5" : "h-3 w-3"} />
      {branch}
    </span>
  );
}
