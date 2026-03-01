import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// GET /api/profile — Fetch the user's equipment/ingredient profile
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.userProfile.findUnique({
    where: { userId: user.id },
  });

  // Return empty arrays if no profile yet
  return NextResponse.json(
    profile ?? { equipment: [], ingredients: [] }
  );
}

// PUT /api/profile — Create or update the user's profile
export async function PUT(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const equipment: string[] = Array.isArray(body.equipment) ? body.equipment : [];
  const ingredients: string[] = Array.isArray(body.ingredients) ? body.ingredients : [];

  const profile = await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: { equipment, ingredients },
    create: { userId: user.id, equipment, ingredients },
  });

  return NextResponse.json(profile);
}
