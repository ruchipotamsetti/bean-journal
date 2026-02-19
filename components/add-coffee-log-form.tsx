"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BREW_METHODS = [
  "Espresso",
  "Pour Over",
  "French Press",
  "Aeropress",
  "Drip",
  "Cold Brew",
  "Moka Pot",
  "Turkish",
  "Other",
];

const COFFEE_TYPES = [
  "Espresso",
  "Cortado",
  "Latte",
  "Cappuccino",
  "Americano",
  "Flat White",
  "Macchiato",
  "Mocha",
  "Pour Over",
  "Cold Brew",
  "Iced Latte",
  "Other",
];

export function AddCoffeeLogForm({ onSuccess }: { onSuccess: () => void }) {
  const [coffeeType, setCoffeeType] = useState("");
  const [cafeName, setCafeName] = useState("");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [brewMethod, setBrewMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!coffeeType) {
      setError("Please select a coffee type.");
      return;
    }
    if (rating === 0) {
      setError("Please give a rating.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coffeeType,
        cafeName: cafeName || null,
        rating,
        notes: notes || null,
        brewMethod: brewMethod || null,
      }),
    });

    if (!res.ok) {
      setError("Failed to save. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.refresh();
    onSuccess();
  };

  return (
    <Card className="border-border-tan animate-fade-up">
      <CardHeader>
        <CardTitle className="font-heading text-xl text-text-primary">What did you drink?</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <CardContent className="space-y-5">
          {error && (
            <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label>Coffee Type *</Label>
            <Select value={coffeeType} onValueChange={setCoffeeType}>
              <SelectTrigger>
                <SelectValue placeholder="Pick your poison" />
              </SelectTrigger>
              <SelectContent>
                {COFFEE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cafeName">Cafe Name</Label>
            <Input
              id="cafeName"
              placeholder="Where did you get it?"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Brew Method</Label>
            <Select value={brewMethod} onValueChange={setBrewMethod}>
              <SelectTrigger>
                <SelectValue placeholder="How was it brewed?" />
              </SelectTrigger>
              <SelectContent>
                {BREW_METHODS.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className={`min-h-[44px] min-w-[44px] text-3xl transition-all duration-150 hover:scale-110 active:scale-95 ${
                    i < rating
                      ? "text-accent-pop animate-star-pop"
                      : "text-border-tan hover:text-accent-pop/50"
                  }`}
                  aria-label={`Rate ${i + 1} star${i > 0 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Tasting notes, thoughts..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Log"}
          </Button>
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
