"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BrewTimer } from "@/components/brew-timer";

type RecipeStep = {
  id: string;
  order: number;
  label: string;
  description: string | null;
  durationSec: number;
};

type RecipeWithSteps = {
  id: string;
  name: string;
  description: string;
  coffeeType: string;
  brewMethod: string;
  difficulty: string;
  prepTimeMinutes: number;
  ingredients: string[];
  instructions: string[];
  equipment: string[];
  steps: RecipeStep[];
};

export default function BrewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [recipe, setRecipe] = useState<RecipeWithSteps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`/api/recipes/${id}`);
      if (!res.ok) {
        setError("Recipe not found");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setRecipe(data);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <svg viewBox="0 0 48 48" className="mx-auto size-10 animate-steam text-accent-warm" fill="currentColor" aria-hidden="true">
            <ellipse cx="24" cy="24" rx="12" ry="18" transform="rotate(-20 24 24)" />
            <path d="M24 8 Q28 24 24 40" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
          <p className="mt-3 text-sm text-text-secondary">Loading brew timer...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-text-secondary">{error ?? "Recipe not found"}</p>
        <Button variant="ghost" onClick={() => router.back()} className="mt-4">
          ← Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl animate-fade-up">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        ← Back to Recipe
      </Button>

      {recipe.steps.length > 0 ? (
        <BrewTimer
          recipeName={recipe.name}
          steps={recipe.steps}
          onComplete={() => router.push("/recipes")}
        />
      ) : (
        <div className="rounded-2xl border border-border-tan bg-bg-card p-8 text-center">
          <div className="text-4xl mb-4">⏱️</div>
          <h2 className="font-heading text-xl text-text-primary">No Timed Steps Yet</h2>
          <p className="mt-2 text-text-secondary">
            This recipe doesn&apos;t have timed brew steps configured.
            Follow the recipe instructions at your own pace.
          </p>
          <Button variant="outline" onClick={() => router.back()} className="mt-6">
            Back to Recipe
          </Button>
        </div>
      )}
    </div>
  );
}
