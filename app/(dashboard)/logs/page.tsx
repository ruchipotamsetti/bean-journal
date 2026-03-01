"use client";

import { useEffect, useState } from "react";
import { CoffeeLogCard } from "@/components/coffee-log-card";
import { AddCoffeeLogForm } from "@/components/add-coffee-log-form";
import { Button } from "@/components/ui/button";

type CoffeeLog = {
  id: string;
  coffeeType: string;
  cafeName: string | null;
  rating: number;
  notes: string | null;
  brewMethod: string | null;
  loggedAt: string;
};

export default function LogsPage() {
  const [logs, setLogs] = useState<CoffeeLog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    const res = await fetch("/api/logs");
    if (res.ok) {
      const data = await res.json();
      setLogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl text-text-primary md:text-4xl">Your Coffee Journey</h1>
        <Button onClick={() => setShowForm(true)} disabled={showForm}>
          + New Brew
        </Button>
      </div>

      {showForm && (
        <div className="mb-8">
          <AddCoffeeLogForm
            onSuccess={() => {
              setShowForm(false);
              fetchLogs();
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <svg viewBox="0 0 48 48" className="mx-auto size-10 animate-steam text-accent-warm" fill="currentColor" aria-hidden="true">
              <ellipse cx="24" cy="24" rx="12" ry="18" transform="rotate(-20 24 24)" />
              <path d="M24 8 Q28 24 24 40" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            </svg>
            <p className="mt-3 text-sm text-text-secondary">Brewing your logs...</p>
          </div>
        </div>
      ) : logs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-tan px-6 py-12 text-center md:px-12 md:py-16">
          <p className="text-lg text-text-secondary">No brews logged yet.</p>
          <p className="mt-1 text-sm text-text-secondary/60">
            Go grab a coffee and come back to tell us about it!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {logs.map((log, i) => (
            <div key={log.id} className={`animate-fade-up stagger-${Math.min(i + 1, 6)}`}>
              <CoffeeLogCard log={log} onUpdated={fetchLogs} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
