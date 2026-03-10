import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.workflow || !body.version) {
      return NextResponse.json(
        { error: "Missing required fields: workflow, version" },
        { status: 400 }
      );
    }

    if (!supabase) {
      // No DB — acknowledge but don't persist
      return NextResponse.json(
        {
          success: true,
          event: {
            workflow: body.workflow,
            version: body.version,
            timestamp: new Date().toISOString(),
          },
        },
        { status: 201 }
      );
    }

    // Resolve workflow_id from name
    const { data: wf } = await supabase
      .from("workflows")
      .select("id")
      .eq("name", body.workflow)
      .single();

    if (!wf) {
      return NextResponse.json(
        { error: `Workflow not found: ${body.workflow}` },
        { status: 404 }
      );
    }

    const userAgent =
      body.userAgent ?? request.headers.get("user-agent") ?? null;

    const { data: install, error } = await supabase
      .from("installs")
      .insert({
        workflow_id: wf.id,
        version: body.version,
        user_agent: userAgent,
      })
      .select("id, version, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to log install" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        event: {
          id: install.id,
          workflow: body.workflow,
          version: install.version,
          timestamp: install.created_at,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
