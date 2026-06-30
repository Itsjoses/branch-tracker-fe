export type BranchEntry = {
  branch: string;
  timestamp: string;
};

export type App = {
  id: number;
  name: string;
  currentBranch: string;
  timestamp: string;
  recentBranches: BranchEntry[];
  status: "active" | "idle" | "building";
  language: string;
};

export const apps: App[] = [
  {
    id: 1,
    name: "payment-service",
    currentBranch: "feature/add-xendit-provider",
    timestamp: "2026-06-30T14:32:00Z",
    status: "active",
    language: "TypeScript",
    recentBranches: [
      { branch: "feature/add-xendit-provider", timestamp: "2026-06-30T14:32:00Z" },
      { branch: "hotfix/duplicate-charge-fix", timestamp: "2026-06-30T11:14:00Z" },
      { branch: "feature/midtrans-v3", timestamp: "2026-06-29T09:00:00Z" },
      { branch: "develop", timestamp: "2026-06-28T16:45:00Z" },
      { branch: "main", timestamp: "2026-06-25T10:00:00Z" },
    ],
  },
  {
    id: 2,
    name: "user-auth",
    currentBranch: "develop",
    timestamp: "2026-06-30T14:19:00Z",
    status: "active",
    language: "Go",
    recentBranches: [
      { branch: "develop", timestamp: "2026-06-30T14:19:00Z" },
      { branch: "feature/google-sso", timestamp: "2026-06-29T08:30:00Z" },
      { branch: "feature/mfa-support", timestamp: "2026-06-27T13:00:00Z" },
      { branch: "hotfix/token-expiry", timestamp: "2026-06-23T09:00:00Z" },
      { branch: "main", timestamp: "2026-06-16T10:00:00Z" },
    ],
  },
  {
    id: 3,
    name: "storefront-web",
    currentBranch: "feature/new-checkout-flow",
    timestamp: "2026-06-30T14:02:00Z",
    status: "building",
    language: "TypeScript",
    recentBranches: [
      { branch: "feature/new-checkout-flow", timestamp: "2026-06-30T14:02:00Z" },
      { branch: "feature/product-filter", timestamp: "2026-06-28T10:00:00Z" },
      { branch: "hotfix/mobile-nav-bug", timestamp: "2026-06-26T15:30:00Z" },
      { branch: "release/v2.4.0", timestamp: "2026-06-23T09:00:00Z" },
      { branch: "main", timestamp: "2026-06-16T10:00:00Z" },
    ],
  },
  {
    id: 4,
    name: "notification-hub",
    currentBranch: "main",
    timestamp: "2026-06-30T13:34:00Z",
    status: "idle",
    language: "Node.js",
    recentBranches: [
      { branch: "main", timestamp: "2026-06-30T13:34:00Z" },
      { branch: "feature/whatsapp-channel", timestamp: "2026-06-27T11:00:00Z" },
      { branch: "feature/email-templating", timestamp: "2026-06-23T09:00:00Z" },
      { branch: "develop", timestamp: "2026-06-16T10:00:00Z" },
      { branch: "hotfix/fcm-token-refresh", timestamp: "2026-06-09T08:00:00Z" },
    ],
  },
  {
    id: 5,
    name: "inventory-api",
    currentBranch: "hotfix/stock-race-condition",
    timestamp: "2026-06-30T14:29:00Z",
    status: "active",
    language: "Rust",
    recentBranches: [
      { branch: "hotfix/stock-race-condition", timestamp: "2026-06-30T14:29:00Z" },
      { branch: "feature/warehouse-zones", timestamp: "2026-06-28T12:00:00Z" },
      { branch: "develop", timestamp: "2026-06-27T09:00:00Z" },
      { branch: "feature/batch-import", timestamp: "2026-06-23T14:00:00Z" },
      { branch: "main", timestamp: "2026-06-16T10:00:00Z" },
    ],
  },
  {
    id: 6,
    name: "analytics-pipeline",
    currentBranch: "develop",
    timestamp: "2026-06-30T11:34:00Z",
    status: "idle",
    language: "Python",
    recentBranches: [
      { branch: "develop", timestamp: "2026-06-30T11:34:00Z" },
      { branch: "feature/kafka-consumer", timestamp: "2026-06-29T08:00:00Z" },
      { branch: "feature/funnels-v2", timestamp: "2026-06-25T13:00:00Z" },
      { branch: "hotfix/memory-leak-fix", timestamp: "2026-06-16T10:00:00Z" },
      { branch: "main", timestamp: "2026-06-09T09:00:00Z" },
    ],
  },
  {
    id: 7,
    name: "mobile-app",
    currentBranch: "release/v3.1.0",
    timestamp: "2026-06-30T13:49:00Z",
    status: "building",
    language: "TypeScript",
    recentBranches: [
      { branch: "release/v3.1.0", timestamp: "2026-06-30T13:49:00Z" },
      { branch: "feature/dark-mode", timestamp: "2026-06-27T10:00:00Z" },
      { branch: "feature/push-redesign", timestamp: "2026-06-23T09:00:00Z" },
      { branch: "develop", timestamp: "2026-06-16T10:00:00Z" },
      { branch: "main", timestamp: "2026-05-30T10:00:00Z" },
    ],
  },
  {
    id: 8,
    name: "search-engine",
    currentBranch: "main",
    timestamp: "2026-06-28T10:00:00Z",
    status: "idle",
    language: "Java",
    recentBranches: [
      { branch: "main", timestamp: "2026-06-28T10:00:00Z" },
      { branch: "feature/semantic-search", timestamp: "2026-06-23T09:00:00Z" },
      { branch: "feature/spell-correct", timestamp: "2026-06-16T10:00:00Z" },
      { branch: "develop", timestamp: "2026-06-09T09:00:00Z" },
      { branch: "hotfix/index-timeout", timestamp: "2026-05-30T10:00:00Z" },
    ],
  },
  {
    id: 9,
    name: "admin-dashboard",
    currentBranch: "feature/bulk-user-actions",
    timestamp: "2026-06-30T14:14:00Z",
    status: "active",
    language: "TypeScript",
    recentBranches: [
      { branch: "feature/bulk-user-actions", timestamp: "2026-06-30T14:14:00Z" },
      { branch: "feature/audit-log-view", timestamp: "2026-06-28T11:00:00Z" },
      { branch: "hotfix/csv-export-fix", timestamp: "2026-06-26T09:00:00Z" },
      { branch: "develop", timestamp: "2026-06-23T10:00:00Z" },
      { branch: "main", timestamp: "2026-06-16T10:00:00Z" },
    ],
  },
  {
    id: 10,
    name: "infra-scripts",
    currentBranch: "develop",
    timestamp: "2026-06-30T10:34:00Z",
    status: "idle",
    language: "HCL",
    recentBranches: [
      { branch: "develop", timestamp: "2026-06-30T10:34:00Z" },
      { branch: "feature/gcs-policy", timestamp: "2026-06-29T09:00:00Z" },
      { branch: "feature/k8s-autoscaler", timestamp: "2026-06-25T13:00:00Z" },
      { branch: "hotfix/cert-renewal", timestamp: "2026-06-16T10:00:00Z" },
      { branch: "main", timestamp: "2026-05-30T10:00:00Z" },
    ],
  },
];

export function getBranchColor(_branch: string): {
  bg: string;
  text: string;
  dot: string;
  border: string;
  glow: string;
} {
  return { bg: "bg-violet-500/10", text: "text-white", dot: "bg-violet-400", border: "border-violet-400/50", glow: "shadow-[0_0_12px_rgba(167,139,250,0.4)]" };
}

export function getStatusColor(status: App["status"]) {
  switch (status) {
    case "active":
      return { dot: "bg-emerald-400", text: "text-emerald-400", label: "Active" };
    case "building":
      return { dot: "bg-amber-400 animate-pulse", text: "text-amber-400", label: "Building" };
    case "idle":
      return { dot: "bg-slate-500", text: "text-slate-400", label: "Idle" };
  }
}

export function getLanguageColor(lang: string) {
  const map: Record<string, string> = {
    TypeScript: "text-blue-400",
    Go: "text-cyan-400",
    Python: "text-yellow-400",
    Rust: "text-orange-400",
    Java: "text-red-400",
    "Node.js": "text-green-400",
    HCL: "text-violet-400",
    Yii: "text-red-400",
  };
  return map[lang] ?? "text-slate-400";
}

export function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
