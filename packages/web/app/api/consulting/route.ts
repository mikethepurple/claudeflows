import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields: name, email" },
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
        name: body.name,
        email: body.email,
        role: body.role ?? null,
        needs: body.needs ?? null,
        budget: body.budget ?? null,
        source_skill: body.source_skill ?? null,
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
