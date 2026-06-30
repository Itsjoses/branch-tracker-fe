"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchApps, fetchApp, AppSummary, AppDetail } from "@/lib/api";
import AppCard from "@/components/AppCard";
import AppDetailPanel from "@/components/AppDetailPanel";
import { GitBranch, Search, Layers, Activity, RefreshCw, AlertCircle } from "lucide-react";

export default function Home() {
  const [apps, setApps] = useState<AppSummary[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<AppDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loadApps = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApps();
      setApps(data);
    } catch {
      setError("Gagal konek ke backend. Pastiin backend jalan di port 3001.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApps();
  }, []);

  const handleSelectApp = async (app: AppSummary) => {
    setLoadingDetail(true);
    setSelectedDetail(null);
    try {
      const detail = await fetchApp(app.id);
      setSelectedDetail(detail);
    } finally {
      setLoadingDetail(false);
    }
  };

  const filtered = useMemo(() => {
    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.currentBranch.toLowerCase().includes(search.toLowerCase())
    );
  }, [apps, search]);

  return (
    <div className="min-h-screen bg-[#0d0f17]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
                <GitBranch className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Branch Tracker</h1>
            </div>
            <button
              onClick={loadApps}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400
                bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors disabled:opacity-50 shrink-0"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
          <p className="text-slate-500 text-sm ml-12">Monitor active branches across all your services</p>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard icon={<Layers className="h-4 w-4" />} label="Total Apps" value={apps.length} color="text-slate-300" />
          <StatCard icon={<GitBranch className="h-4 w-4" />} label="Terpantau" value={filtered.length} color="text-indigo-400" />
          <StatCard icon={<Activity className="h-4 w-4" />} label="Active" value={apps.filter(a => !!a.isActive).length} color="text-emerald-400" />
        </div>

        {/* search */}
        <div className="relative w-full sm:max-w-sm mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search apps atau branch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]
              text-sm text-slate-200 placeholder-slate-600
              focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06]
              transition-all duration-150"
          />
        </div>

        {/* states */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 mb-6 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl shimmer" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onClick={() => handleSelectApp(app)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-slate-600">
            <GitBranch className="h-10 w-10 mb-3 opacity-30" />
            <p className="text-sm">{apps.length === 0 ? "Belum ada data" : "Tidak ada app yang cocok"}</p>
          </div>
        )}
      </div>

      {(selectedDetail || loadingDetail) && (
        <AppDetailPanel
          app={selectedDetail}
          loading={loadingDetail}
          onClose={() => { setSelectedDetail(null); setLoadingDetail(false); }}
          onToggle={(id, isActive) => {
            setApps(prev => prev.map(a => a.id === id ? { ...a, isActive } : a));
            setSelectedDetail(prev => prev && prev.id === id ? { ...prev, isActive } : prev);
          }}
        />
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 sm:px-4 py-3.5">
      <div className={`flex items-center gap-1.5 mb-1.5 ${color}`}>
        <span className="shrink-0">{icon}</span>
        <span className="text-[10px] sm:text-xs font-medium opacity-80 truncate">{label}</span>
      </div>
      <p className={`text-xl sm:text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
