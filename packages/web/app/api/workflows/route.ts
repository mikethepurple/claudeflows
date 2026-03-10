import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { SAMPLE_WORKFLOWS } from "@/lib/sample-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const name = searchParams.get("name");

  // Try Supabase if configured
  if (supabase) {
    const { data: dbWorkflows, error } = await supabase
      .from("workflows")
      .select("*");

    if (!error && dbWorkflows && dbWorkflows.length > 0) {
      if (name) {
        const { data: wf } = await supabase
          .from("workflows")
          .select("*")
          .eq("name", name)
          .single();

        if (!wf) {
          return NextResponse.json(
            { error: "Workflow not found" },
            { status: 404 }
          );
        }

        const { data: stats } = await supabase
          .from("workflow_stats")
          .select("*")
          .eq("workflow_id", wf.id)
          .single();

        return NextResponse.json({
          workflow: {
            ...wf,
            installs: stats?.install_count ?? 0,
            rating: stats?.avg_rating ?? 0,
          },
        });
      }

      let filtered = dbWorkflows;
      if (category) {
        filtered = filtered.filter((wf) => wf.category === category);
      }

      return NextResponse.json({
        workflows: filtered,
        total: filtered.length,
      });
    }
  }

  // Fallback: sample data
  let workflows = [...SAMPLE_WORKFLOWS];

  if (name) {
    const found = workflows.find((wf) => wf.name === name);
    if (found) {
      return NextResponse.json({ workflow: found });
    }
    return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
  }

  if (category) {
    workflows = workflows.filter((wf) => wf.category === category);
  }

  if (q) {
    const lowerQ = q.toLowerCase();
    workflows = workflows.filter((wf) => {
      const searchable = [
        wf.name,
        wf.displayName,
        wf.description,
        wf.category,
        wf.author.name,
        ...wf.tags,
      ]
        .join(" ")
        .toLowerCase();

      return lowerQ.split(/\s+/).every((word) => searchable.includes(word));
    });
  }

  return NextResponse.json({
    workflows,
    total: workflows.length,
  });
}
