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

export function RecipeCard({
  recipe,
  onSelect,
}: {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}) {
  const difficultyColor =
    recipe.difficulty === "Easy"
      ? "bg-accent-cool/15 text-accent-cool"
      : recipe.difficulty === "Medium"
        ? "bg-accent-warm/15 text-accent-warm"
        : "bg-accent-pop/15 text-accent-pop";

  return (
    <button
      onClick={() => onSelect(recipe)}
      className="w-full cursor-bean rounded-2xl border border-border-tan border-l-4 border-l-accent-cool bg-bg-card p-6 text-left shadow-sm transition-all duration-200 hover:shadow-lg hover:rotate-1 hover:scale-[1.02] md:p-8"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading text-lg text-text-primary">{recipe.name}</h3>
        <span className={`shrink-0 rounded-full px-3 py-1 font-mono-accent text-xs ${difficultyColor}`}>
          {recipe.difficulty}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
        {recipe.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-bg-accent px-3 py-1 text-xs font-medium text-accent-warm">
          {recipe.coffeeType}
        </span>
        <span className="rounded-full bg-accent-cool/10 px-3 py-1 text-xs font-medium text-accent-cool">
          {recipe.brewMethod}
        </span>
        <span className="rounded-full bg-bg-accent px-3 py-1 font-mono-accent text-xs text-text-secondary">
          {recipe.prepTimeMinutes} min
        </span>
      </div>
    </button>
  );
}
