
"use client";

import { useState } from "react";
import { Button } from "./ui/button";

type RecipeMatch = {
  recipeId: string;
  recipeName: string;
  score: number;
  reasons: string[];
};

export function CoffeeLogCard({
  log,
  onEdit,
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
  onEdit?: () => void;
}) {
  const [matches, setMatches] = useState<RecipeMatch[] | null>(null);
  const [showMatches, setShowMatches] = useState(false);
  const [matchLoading, setMatchLoading] = useState(false);

  const fetchMatches = async () => {
    if (matches) {
      setShowMatches(!showMatches);
      return;
    }
    setMatchLoading(true);
    try {
      const res = await fetch(`/api/logs/${log.id}/matches`);
      if (res.ok) {
        const data = await res.json();
        setMatches(data);
        setShowMatches(true);
      }
    } finally {
      setMatchLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border-tan border-l-4 border-l-accent-warm bg-bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-rotate-1 hover:scale-[1.02] md:p-8 cursor-bean">
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

      {/* Recipe matches */}
      {showMatches && matches && matches.length > 0 && (
        <div className="mt-4 space-y-2 rounded-xl bg-bg-accent/50 p-3">
          <p className="font-mono-accent text-xs text-accent-cool font-semibold">Recipe Matches</p>
          {matches.slice(0, 3).map((m) => (
            <div key={m.recipeId} className="flex items-center justify-between gap-2">
              <span className="text-sm text-text-primary truncate">{m.recipeName}</span>
              <span className="shrink-0 rounded-full bg-accent-cool/15 px-2 py-0.5 font-mono-accent text-xs text-accent-cool">
                {m.score}%
              </span>
            </div>
          ))}
        </div>
      )}
      {showMatches && matches && matches.length === 0 && (
        <div className="mt-4 rounded-xl bg-bg-accent/50 p-3">
          <p className="text-sm text-text-secondary">No matching recipes found.</p>
        </div>
      )}

      <div className="flex flex-row items-baseline justify-between mt-4">
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
          <Button
            onClick={fetchMatches}
            variant="ghost"
            size="sm"
            disabled={matchLoading}
          >
            {matchLoading ? "..." : showMatches ? "Hide Matches" : "Find Recipes"}
          </Button>
          <Button onClick={onEdit} variant="outline" size="sm">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
