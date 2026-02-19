import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/recipes — Fetch all recipes (public, no auth required)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coffeeType = searchParams.get("coffeeType");
  const brewMethod = searchParams.get("brewMethod");
  const difficulty = searchParams.get("difficulty");

  const where: Record<string, string> = {};
  if (coffeeType) where.coffeeType = coffeeType;
  if (brewMethod) where.brewMethod = brewMethod;
  if (difficulty) where.difficulty = difficulty;

  const recipes = await prisma.recipe.findMany({
    where,
    orderBy: { name: "asc" },
  });

  return NextResponse.json(recipes);
}
