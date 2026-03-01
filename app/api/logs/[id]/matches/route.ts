import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { scoreRecipes } from "@/lib/recipeMatching";

// GET /api/logs/[id]/matches — Get recipe matches for a specific log
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch the log
  const log = await prisma.coffeeLog.findFirst({
    where: { id, userId: user.id },
  });

  if (!log) {
    return NextResponse.json({ error: "Log not found" }, { status: 404 });
  }

  // Fetch all recipes
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      coffeeType: true,
      brewMethod: true,
      equipment: true,
      ingredients: true,
    },
  });

  // Fetch user profile (if exists)
  const profile = await prisma.userProfile.findUnique({
    where: { userId: user.id },
  });

  const matches = scoreRecipes(
    { coffeeType: log.coffeeType, brewMethod: log.brewMethod },
    recipes,
    profile ? { equipment: profile.equipment, ingredients: profile.ingredients } : null
  );

  return NextResponse.json(matches);
}
