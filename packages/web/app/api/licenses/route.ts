import { NextResponse } from "next/server";
import { createPrivateKey, sign } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

/**
 * GET /api/licenses?workflow=<name> — Issue a JWT license token for a purchased workflow.
 *
 * Authorization: Bearer <supabase-access-token>
 *
 * The signing key is stored in the CW_SIGNING_KEY environment variable (Ed25519 PEM).
 */

interface LicenseClaims {
  sub: string;
  workflow: string;
  versionRange?: string;
  tier: string;
  iat: number;
  exp: number;
  iss: string;
}

function base64urlEncode(data: string | Buffer): string {
  const buf = typeof data === "string" ? Buffer.from(data) : data;
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function createJwt(claims: LicenseClaims, privateKeyPem: string): string {
  const header = { alg: "EdDSA", typ: "JWT" };

  const headerB64 = base64urlEncode(JSON.stringify(header));
  const payloadB64 = base64urlEncode(JSON.stringify(claims));
  const signedContent = `${headerB64}.${payloadB64}`;

  const privateKey = createPrivateKey(privateKeyPem);
  const signature = sign(null, Buffer.from(signedContent), privateKey);
  const signatureB64 = base64urlEncode(signature);

  return `${signedContent}.${signatureB64}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const workflowName = searchParams.get("workflow");

  if (!workflowName) {
    return NextResponse.json({ error: "Missing 'workflow' parameter" }, { status: 400 });
  }

  // Verify authentication
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const accessToken = authHeader.slice(7);

  // Validate session via Supabase auth
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "License service unavailable" }, { status: 500 });
  }

  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
  if (authError || !user) {
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
  }

  // Resolve workflow
  const { data: workflow } = await supabase
    .from("workflows")
    .select("id, license")
    .eq("name", workflowName)
    .single();

  if (!workflow) {
    return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
  }

  // Check purchase record — free workflows (license = 'MIT' or similar) skip this check
  const isFree = workflow.license && ["MIT", "Apache-2.0", "ISC", "BSD-2-Clause", "BSD-3-Clause", "Unlicense"].includes(workflow.license);
  let tier = "free";

  if (!isFree) {
    const { data: purchase } = await supabase
      .from("purchases")
      .select("tier")
      .eq("user_id", user.id)
      .eq("workflow_id", workflow.id)
      .single();

    if (!purchase) {
      return NextResponse.json({ error: "No purchase found for this workflow" }, { status: 403 });
    }

    tier = purchase.tier;
  }

  // Get signing key from environment
  const signingKey = process.env.CW_SIGNING_KEY;
  if (!signingKey) {
    console.error("CW_SIGNING_KEY is not configured");
    return NextResponse.json({ error: "License service unavailable" }, { status: 500 });
  }

  // Issue JWT license token
  const now = Math.floor(Date.now() / 1000);
  const oneYear = 365 * 24 * 60 * 60;

  const claims: LicenseClaims = {
    sub: user.id,
    workflow: workflowName,
    versionRange: ">=1.0.0",
    tier,
    iat: now,
    exp: now + oneYear,
    iss: "claudeflows.dev",
  };

  try {
    const token = createJwt(claims, signingKey);
    return NextResponse.json({ token, expires: new Date((now + oneYear) * 1000).toISOString() });
  } catch (err) {
    console.error("Failed to sign license token:", err);
    return NextResponse.json({ error: "Failed to generate license" }, { status: 500 });
  }
}
