import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: name, email" },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!supabase) {
      // No DB — acknowledge but don't persist
      return NextResponse.json(
        {
          success: true,
          lead: {
            name: body.name,
            email: body.email,
            timestamp: new Date().toISOString(),
          },
        },
        { status: 200 }
      );
    }

    const { data: lead, error } = await (supabase as any)
      .from("consulting_leads")
      .insert({
        name,
        email,
        role: typeof body.role === "string" ? body.role.slice(0, 200) : null,
        needs: typeof body.needs === "string" ? body.needs.slice(0, 5000) : null,
        budget: typeof body.budget === "string" ? body.budget.slice(0, 100) : null,
        source_skill: typeof body.source_skill === "string" ? body.source_skill.slice(0, 200) : null,
      })
      .select("id, name, email, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        lead: {
          id: lead.id,
          name: lead.name,
          email: lead.email,
          timestamp: lead.created_at,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
