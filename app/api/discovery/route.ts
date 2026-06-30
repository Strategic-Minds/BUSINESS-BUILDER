import { NextRequest, NextResponse } from "next/server";

// BUSINESS-BUILDER — Discovery Gate
// The FIRST step in the unified pipeline:
// Discovery → Analysis → QA → Auto-Fix → Auto-Heal → Evolution
// Operator: jeremy@autobuilderos.com | Identity: ai@autobuilderos.com

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export interface DiscoveryPayload {
  // What are we analyzing?
  target_url: string;
  target_name: string;
  target_type: "website" | "competitor" | "ai_company" | "tech_stack" | "own_system";
  // Why?
  purpose: "benchmark" | "monitor" | "clone_intel" | "qa_test" | "evolve" | "opportunity_score";
  // Who triggered this?
  triggered_by: "operator" | "cron" | "agent_zero" | "auto_builder" | "apex";
  project?: string;
  priority?: number;       // 1-10, 10 = highest
  strict_score_threshold?: number; // e.g. 90 means Agent-Zero must score it >= 90 to pass
  notes?: string;
}

async function writeToSupabase(table: string, data: Record<string, unknown>) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) return res.json();
  return null;
}

async function triggerAgentZero(payload: DiscoveryPayload, discoveryId: string) {
  const AGENT_ZERO_URL = process.env.AGENT_ZERO_URL ?? "";
  if (!AGENT_ZERO_URL) return { triggered: false, reason: "AGENT_ZERO_URL not set" };
  try {
    const res = await fetch(`${AGENT_ZERO_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "x-apex-token": process.env.APEX_SHARED_SECRET ?? "" },
      body: JSON.stringify({
        target_url: payload.target_url,
        target_name: payload.target_name,
        target_type: payload.target_type,
        discovery_id: discoveryId,
        strict_threshold: payload.strict_score_threshold ?? 85,
        next_step: "qa_then_heal",
      }),
      signal: AbortSignal.timeout(10000),
    });
    return { triggered: res.ok, status: res.status };
  } catch (e) {
    return { triggered: false, error: String(e) };
  }
}

export async function POST(req: NextRequest) {
  let payload: DiscoveryPayload;
  try { payload = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload.target_url || !payload.target_name || !payload.target_type) {
    return NextResponse.json({ ok: false, error: "Missing required fields: target_url, target_name, target_type" }, { status: 422 });
  }

  const discoveryId = `DISC-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
  const timestamp = new Date().toISOString();

  // 1. Write discovery job to Supabase pipeline queue
  const record = await writeToSupabase("pipeline_discovery_queue", {
    discovery_id: discoveryId,
    target_url: payload.target_url,
    target_name: payload.target_name,
    target_type: payload.target_type,
    purpose: payload.purpose ?? "benchmark",
    triggered_by: payload.triggered_by ?? "operator",
    project: payload.project ?? "AutoBuilder OS",
    priority: payload.priority ?? 5,
    strict_score_threshold: payload.strict_score_threshold ?? 85,
    notes: payload.notes,
    status: "queued",
    stage: "discovery",
    created_at: timestamp,
  });

  // 2. Trigger Agent-Zero for immediate analysis (non-blocking)
  const agentZeroResult = await triggerAgentZero(payload, discoveryId);

  // 3. Log to agent_commands bridge
  await writeToSupabase("agent_commands", {
    command_id: `CMD-${discoveryId}`,
    from_agent: "BUSINESS_BUILDER_DISCOVERY",
    to_agent: "AGENT_ZERO",
    identity_email: "ai@autobuilderos.com",
    project: payload.project ?? "AutoBuilder OS",
    command_type: "research",
    task: `Discovery: Analyze ${payload.target_name} (${payload.target_url}) — Purpose: ${payload.purpose}`,
    context: JSON.stringify(payload),
    approval_required: false,
    status: "queued",
  }).catch(() => null);

  return NextResponse.json({
    ok: true,
    discovery_id: discoveryId,
    message: `Discovery job queued. Agent-Zero will analyze and score ${payload.target_name}.`,
    pipeline: {
      step_1: "discovery (this request)",
      step_2: "agent_zero_analysis_and_scoring",
      step_3: "sm_qa_agent_frontend_backend_test",
      step_4: "auto_builder_fix_heal_optimize",
      step_5: "evolution_loop_and_memory_sync",
    },
    agent_zero: agentZeroResult,
    supabase_record: record ? "created" : "failed (env vars missing)",
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "BUSINESS-BUILDER Discovery Gate",
    description: "Entry point of the unified AI pipeline: Discovery → Analysis → QA → Fix → Heal → Evolve",
    pipeline_stages: [
      "1. POST here with target_url + purpose",
      "2. Agent-Zero analyzes + scores (12 dimensions, 0-100)",
      "3. SM QA Agent tests frontend + backend",
      "4. AUTO_BUILDER auto-fixes issues found",
      "5. Agent-Zero evolves + logs persistent memory",
      "6. Cron repeats on schedule",
    ],
    required_fields: ["target_url", "target_name", "target_type"],
    optional_fields: ["purpose", "triggered_by", "project", "priority", "strict_score_threshold"],
  });
}
