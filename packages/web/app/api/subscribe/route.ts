import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || typeof body.email !== "string" || !EMAIL_RE.test(body.email.trim())) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();
    const sourceSkill = body.source_skill ?? null;

    if (!supabase) {
      // No DB configured — acknowledge silently (dev/preview)
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const { error } = await (supabase as any)
      .from("email_subscribers")
      .upsert(
        { email, source_skill: sourceSkill },
        { onConflict: "email" }
      );

    if (error) {
      console.error("subscribe error:", error);
      return NextResponse.json(
        { error: "Failed to save subscription" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
