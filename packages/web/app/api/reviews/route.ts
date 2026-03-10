import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Fallback in-memory store when Supabase isn't configured
const fallbackReviews = [
  {
    id: "r1",
    author: "builder42",
    rating: 5,
    body: "This completely changed how I validate startup ideas. The step-by-step methodology is incredibly thorough.",
    createdAt: "2025-12-15T10:30:00Z",
    workflow: "venture-studio",
  },
  {
    id: "r2",
    author: "sarah-dev",
    rating: 4,
    body: "Great workflow. The execution step could use more templates, but overall a solid framework.",
    createdAt: "2026-01-03T14:22:00Z",
    workflow: "venture-studio",
  },
  {
    id: "r3",
    author: "research-pro",
    rating: 5,
    body: "Saves hours of manual research. The Google Sheets sync is seamless.",
    createdAt: "2026-01-20T09:15:00Z",
    workflow: "scout",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const workflow = searchParams.get("workflow");

  if (!workflow) {
    return NextResponse.json(
      { error: "Missing required query param: workflow" },
      { status: 400 }
    );
  }

  if (!supabase) {
    const filtered = fallbackReviews.filter((r) => r.workflow === workflow);
    return NextResponse.json({ reviews: filtered, total: filtered.length });
  }

  // Query by workflow name via join
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select(
      `
      id, author_name, rating, body, created_at,
      workflows!inner(name)
    `
    )
    .eq("workflows.name", workflow)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    reviews: (reviews ?? []).map((r) => ({
      id: r.id,
      author: r.author_name,
      rating: r.rating,
      body: r.body,
      createdAt: r.created_at,
    })),
    total: reviews?.length ?? 0,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.workflow || !body.author || !body.rating) {
      return NextResponse.json(
        { error: "Missing required fields: workflow, author, rating" },
        { status: 400 }
      );
    }

    if (
      typeof body.rating !== "number" ||
      body.rating < 1 ||
      body.rating > 5
    ) {
      return NextResponse.json(
        { error: "Rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
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

    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        workflow_id: wf.id,
        author_name: body.author,
        rating: body.rating,
        body: body.body ?? null,
      })
      .select("id, author_name, rating, body, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create review" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        review: {
          id: review.id,
          author: review.author_name,
          rating: review.rating,
          body: review.body,
          createdAt: review.created_at,
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
