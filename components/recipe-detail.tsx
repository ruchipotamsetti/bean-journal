import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export function RecipeDetail({
  recipe,
  onBack,
}: {
  recipe: Recipe;
  onBack: () => void;
}) {
  return (
    <div className="animate-fade-up">
      <Button variant="ghost" onClick={onBack} className="mb-8">
        ← Back to Brew Guides
      </Button>
      <Card className="border-border-tan">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="font-heading text-2xl text-text-primary">{recipe.name}</CardTitle>
              <CardDescription className="mt-2 text-text-secondary">
                {recipe.description}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <span className="rounded-full bg-accent-cool/15 px-3 py-1 font-mono-accent text-sm text-accent-cool">
                {recipe.brewMethod}
              </span>
              <span className="rounded-full bg-bg-accent px-3 py-1 font-mono-accent text-sm text-text-secondary">
                {recipe.prepTimeMinutes} min
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="mb-3 font-heading text-lg text-text-primary">Equipment Needed</h3>
            <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-text-secondary marker:text-accent-warm">
              {recipe.equipment.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="divider-wavy" aria-hidden="true" />
          <div>
            <h3 className="mb-3 font-heading text-lg text-text-primary">Ingredients</h3>
            <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-text-secondary marker:text-accent-cool">
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="divider-wavy" aria-hidden="true" />
          <div>
            <h3 className="mb-3 font-heading text-lg text-text-primary">Instructions</h3>
            <ol className="space-y-4 text-sm leading-relaxed text-text-secondary">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-warm font-mono-accent text-xs text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
