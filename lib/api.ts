const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export type AppSummary = {
  id: number;
  name: string;
  language: string | null;
  isActive: boolean;
  currentBranch: string;
  updatedAt: string;
};

export type BranchHistoryEntry = {
  branch: string;
  createdAt: string;
};

export type AppDetail = AppSummary & {
  branchHistories: BranchHistoryEntry[];
};

export async function fetchApps(): Promise<AppSummary[]> {
  const res = await fetch(`${BASE}/apps`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch apps');
  return res.json();
}

export async function fetchApp(id: number): Promise<AppDetail> {
  const res = await fetch(`${BASE}/apps/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch app');
  return res.json();
}

export async function toggleActive(id: number): Promise<{ id: number; name: string; isActive: boolean }> {
  const res = await fetch(`${BASE}/apps/${id}/toggle`, { method: 'PATCH', cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to toggle');
  return res.json();
}
