import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// GET /api/logs — Fetch all coffee logs for the authenticated user
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const logs = await prisma.coffeeLog.findMany({
    where: { userId: user.id },
    orderBy: { loggedAt: "desc" },
  });

  return NextResponse.json(logs);
}

// POST /api/logs — Create a new coffee log
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const log = await prisma.coffeeLog.create({
    data: {
      userId: user.id,
      cafeName: body.cafeName || null,
      coffeeType: body.coffeeType,
      rating: body.rating,
      notes: body.notes || null,
      brewMethod: body.brewMethod || null,
    },
  });

  return NextResponse.json(log, { status: 201 });
}
