
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function CoffeeLogCard({
  log,
  onUpdated,
}: {
  log: {
    id: string;
    coffeeType: string;
    cafeName: string | null;
    rating: number;
    notes: string | null;
    brewMethod: string | null;
    loggedAt: string;
  };
  onUpdated?: () => void;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [cafeName, setCafeName] = useState(log.cafeName ?? "");
  const [coffeeType, setCoffeeType] = useState(log.coffeeType);
  const [brewMethod, setBrewMethod] = useState(log.brewMethod ?? "");
  const [rating, setRating] = useState<number>(log.rating);
  const [notes, setNotes] = useState(log.notes ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    setLoading(true);

    const payload = {
      id: log.id,
      cafeName: cafeName || null,
      coffeeType,
      brewMethod: brewMethod || null,
      rating,
      notes: notes || null,
    };

    try {
      const res = await fetch("/api/logs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || "Failed to update log");
      }

      setIsEditing(false);
      // Let parent refresh its list; also trigger a router refresh for server-side updates
      try {
        onUpdated?.();
      } catch (e) {
        // ignore
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border-tan border-l-4 border-l-accent-warm bg-bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-rotate-1 hover:scale-[1.02] md:p-8 cursor-bean">
      {!isEditing ? (
        <>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-heading text-lg text-text-primary">
                {log.coffeeType}
              </h3>
              {log.cafeName && (
                <p className="mt-0.5 text-sm text-text-secondary">{log.cafeName}</p>
              )}
            </div>
            {log.brewMethod && (
              <span className="rounded-full bg-bg-accent px-3 py-1 font-mono-accent text-xs text-accent-warm">
                {log.brewMethod}
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < log.rating ? "text-accent-pop" : "text-border-tan"}`}
              >
                ★
              </span>
            ))}
          </div>
          {log.notes && (
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{log.notes}</p>
          )}
          <div className="flex flex-row justify-between mt-4">
            <div>
              <p className="mt-4 font-mono-accent text-xs text-text-secondary/60">
                {new Date(log.loggedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div>
            <label className="text-xs text-muted-foreground">Coffee Type</label>
            <Input value={coffeeType} onChange={(e) => setCoffeeType(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Cafe Name</label>
            <Input value={cafeName} onChange={(e) => setCafeName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Brew Method</label>
            <Input value={brewMethod} onChange={(e) => setBrewMethod(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Rating (1-5)</label>
            <Input type="number" min={1} max={5} value={String(rating)} onChange={(e) => setRating(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Notes</label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
