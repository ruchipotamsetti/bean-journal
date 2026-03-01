/**
 * Recipe Match Engine
 *
 * Scores each recipe against a user's coffee log based on:
 *  - Coffee type match   (40 pts)
 *  - Brew method match   (30 pts)
 *  - Equipment overlap   (20 pts, proportional)
 *  - Ingredient overlap  (10 pts, proportional)
 *
 * Returns recipes sorted by score (highest first).
 */

export type MatchableLog = {
  coffeeType: string;
  brewMethod: string | null;
};

export type MatchableRecipe = {
  id: string;
  name: string;
  coffeeType: string;
  brewMethod: string;
  equipment: string[];
  ingredients: string[];
};

export type UserEquipment = {
  equipment: string[];
  ingredients: string[];
};

export type RecipeMatch = {
  recipeId: string;
  recipeName: string;
  score: number; // 0-100
  reasons: string[];
};

/** Normalize a string for fuzzy comparison */
function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Check if two strings are a fuzzy match */
function fuzzyMatch(a: string, b: string): boolean {
  return norm(a) === norm(b) || norm(a).includes(norm(b)) || norm(b).includes(norm(a));
}

/** Calculate overlap ratio between two string arrays */
function overlapRatio(userItems: string[], recipeItems: string[]): number {
  if (recipeItems.length === 0) return 1; // no requirements = full match
  const matched = recipeItems.filter((req) =>
    userItems.some((owned) => fuzzyMatch(owned, req))
  );
  return matched.length / recipeItems.length;
}

export function scoreRecipes(
  log: MatchableLog,
  recipes: MatchableRecipe[],
  userProfile?: UserEquipment | null
): RecipeMatch[] {
  return recipes
    .map((recipe) => {
      let score = 0;
      const reasons: string[] = [];

      // Coffee type match (40 points)
      if (fuzzyMatch(log.coffeeType, recipe.coffeeType)) {
        score += 40;
        reasons.push(`Same coffee type: ${recipe.coffeeType}`);
      }

      // Brew method match (30 points)
      if (log.brewMethod && fuzzyMatch(log.brewMethod, recipe.brewMethod)) {
        score += 30;
        reasons.push(`Same brew method: ${recipe.brewMethod}`);
      }

      // Equipment overlap (20 points) — only if user has a profile
      if (userProfile && userProfile.equipment.length > 0) {
        const eqRatio = overlapRatio(userProfile.equipment, recipe.equipment);
        const eqScore = Math.round(eqRatio * 20);
        score += eqScore;
        if (eqRatio === 1) {
          reasons.push("You have all required equipment");
        } else if (eqRatio > 0) {
          reasons.push(`You have ${Math.round(eqRatio * 100)}% of the equipment`);
        }
      }

      // Ingredient overlap (10 points) — only if user has a profile
      if (userProfile && userProfile.ingredients.length > 0) {
        const ingRatio = overlapRatio(userProfile.ingredients, recipe.ingredients);
        const ingScore = Math.round(ingRatio * 10);
        score += ingScore;
        if (ingRatio === 1) {
          reasons.push("You have all ingredients on hand");
        } else if (ingRatio > 0) {
          reasons.push(`You have ${Math.round(ingRatio * 100)}% of the ingredients`);
        }
      }

      return {
        recipeId: recipe.id,
        recipeName: recipe.name,
        score,
        reasons,
      };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);
}
