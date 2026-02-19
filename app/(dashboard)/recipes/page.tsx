"use client";

import { useEffect, useState } from "react";
import { RecipeCard } from "@/components/recipe-card";
import { RecipeDetail } from "@/components/recipe-detail";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Recipe = {
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
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [filterBrewMethod, setFilterBrewMethod] = useState<string>("all");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterDifficulty !== "all") params.set("difficulty", filterDifficulty);
      if (filterBrewMethod !== "all") params.set("brewMethod", filterBrewMethod);
      const res = await fetch(`/api/recipes?${params.toString()}`);
      if (res.ok) {
        setRecipes(await res.json());
      }
      setLoading(false);
    };
    fetchRecipes();
  }, [filterDifficulty, filterBrewMethod]);

  if (selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
      />
    );
  }

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl text-text-primary md:text-4xl">Brew Guides</h1>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-secondary">Difficulty:</span>
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-secondary">Brew Method:</span>
          <Select value={filterBrewMethod} onValueChange={setFilterBrewMethod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Espresso Machine">Espresso Machine</SelectItem>
              <SelectItem value="Pour Over">Pour Over</SelectItem>
              <SelectItem value="French Press">French Press</SelectItem>
              <SelectItem value="Cold Brew">Cold Brew</SelectItem>
              <SelectItem value="Aeropress">Aeropress</SelectItem>
              <SelectItem value="Moka Pot">Moka Pot</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(filterDifficulty !== "all" || filterBrewMethod !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setFilterDifficulty("all");
              setFilterBrewMethod("all");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <svg viewBox="0 0 48 48" className="mx-auto size-10 animate-steam text-accent-cool" fill="currentColor" aria-hidden="true">
              <ellipse cx="24" cy="24" rx="12" ry="18" transform="rotate(-20 24 24)" />
              <path d="M24 8 Q28 24 24 40" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            </svg>
            <p className="mt-3 text-sm text-text-secondary">Loading recipes...</p>
          </div>
        </div>
      ) : recipes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-tan px-6 py-12 text-center md:px-12 md:py-16">
          <p className="text-lg text-text-secondary">
            No recipes match your filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, i) => (
            <div key={recipe.id} className={`animate-fade-up stagger-${Math.min(i + 1, 6)}`}>
              <RecipeCard
                recipe={recipe}
                onSelect={setSelectedRecipe}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
