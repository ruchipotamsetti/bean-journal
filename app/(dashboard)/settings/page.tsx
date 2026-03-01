"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COMMON_EQUIPMENT = [
  "Espresso machine",
  "Espresso machine with steam wand",
  "Burr grinder",
  "Hario V60 dripper",
  "V60 paper filters",
  "Gooseneck kettle",
  "Kettle",
  "French press",
  "Aeropress",
  "Aeropress filters",
  "Moka pot",
  "Scale",
  "Timer",
  "Tamper",
  "Stovetop",
];

const COMMON_INGREDIENTS = [
  "Coffee beans",
  "Whole milk",
  "Oat milk",
  "Water",
  "Ice cubes",
  "Cocoa powder",
  "Sugar",
  "Vanilla syrup",
  "V60 paper filter",
  "Aeropress paper filter",
];

export default function SettingsPage() {
  const [equipment, setEquipment] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newEquipment, setNewEquipment] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setEquipment(data.equipment ?? []);
        setIngredients(data.ingredients ?? []);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ equipment, ingredients }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleEquipment = (item: string) => {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const toggleIngredient = (item: string) => {
    setIngredients((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const addCustomEquipment = () => {
    const trimmed = newEquipment.trim();
    if (trimmed && !equipment.includes(trimmed)) {
      setEquipment((prev) => [...prev, trimmed]);
      setNewEquipment("");
    }
  };

  const addCustomIngredient = () => {
    const trimmed = newIngredient.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
      setNewIngredient("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <svg viewBox="0 0 48 48" className="mx-auto size-10 animate-steam text-accent-warm" fill="currentColor" aria-hidden="true">
            <ellipse cx="24" cy="24" rx="12" ry="18" transform="rotate(-20 24 24)" />
            <path d="M24 8 Q28 24 24 40" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
          <p className="mt-3 text-sm text-text-secondary">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl text-text-primary md:text-4xl">Your Brew Setup</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Profile"}
        </Button>
      </div>

      <p className="mb-8 text-text-secondary">
        Tell us what equipment and ingredients you have on hand. We&apos;ll use this to match you with recipes you can actually make.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Equipment */}
        <Card className="border-border-tan">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-text-primary">Equipment</CardTitle>
            <CardDescription className="text-text-secondary">
              Select the gear you own or add custom items
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {COMMON_EQUIPMENT.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleEquipment(item)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                    equipment.includes(item)
                      ? "bg-accent-warm text-white shadow-sm"
                      : "bg-bg-accent text-text-secondary hover:bg-accent-warm/20 hover:text-accent-warm"
                  }`}
                >
                  {equipment.includes(item) ? "✓ " : ""}
                  {item}
                </button>
              ))}
            </div>

            {/* Custom equipment already added */}
            {equipment
              .filter((e) => !COMMON_EQUIPMENT.includes(e))
              .map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-full bg-accent-warm text-white px-3 py-1.5 text-sm font-medium mr-2"
                >
                  ✓ {item}
                  <button
                    type="button"
                    onClick={() => setEquipment((prev) => prev.filter((e) => e !== item))}
                    className="ml-1 text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                </span>
              ))}

            <div className="flex gap-2 pt-2">
              <Input
                placeholder="Add custom equipment..."
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomEquipment())}
              />
              <Button type="button" variant="outline" size="sm" onClick={addCustomEquipment}>
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="border-border-tan">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-text-primary">Ingredients</CardTitle>
            <CardDescription className="text-text-secondary">
              Select what you usually have on hand
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {COMMON_INGREDIENTS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleIngredient(item)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                    ingredients.includes(item)
                      ? "bg-accent-cool text-white shadow-sm"
                      : "bg-bg-accent text-text-secondary hover:bg-accent-cool/20 hover:text-accent-cool"
                  }`}
                >
                  {ingredients.includes(item) ? "✓ " : ""}
                  {item}
                </button>
              ))}
            </div>

            {/* Custom ingredients already added */}
            {ingredients
              .filter((e) => !COMMON_INGREDIENTS.includes(e))
              .map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-full bg-accent-cool text-white px-3 py-1.5 text-sm font-medium mr-2"
                >
                  ✓ {item}
                  <button
                    type="button"
                    onClick={() => setIngredients((prev) => prev.filter((e) => e !== item))}
                    className="ml-1 text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                </span>
              ))}

            <div className="flex gap-2 pt-2">
              <Input
                placeholder="Add custom ingredient..."
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomIngredient())}
              />
              <Button type="button" variant="outline" size="sm" onClick={addCustomIngredient}>
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
