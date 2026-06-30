import { NextRequest, NextResponse } from "next/server";

// BUSINESS-BUILDER — /api/idea
//
// THE FRONT OF THE MACHINE.
// This is where everything starts — before discovery, before building.
// A human types a thought. An AI sends a vision. A dream becomes a job.
//
// Input:  anything — a sentence, a URL, a document, a desire, a need
// Output: structured IdeaRecord in Supabase → routed into the pipeline queue
//
// Every idea gets:
//   1. Parsed into structured fields (title, type, priority, purpose)
//   2. Scored for feasibility and revenue potential  
//   3. Simulated (can we build this? what would it cost/earn?)
//   4. Queued to AUTO_BUILDER pipeline
//   5. Logged to persistent memory
//
// Operator: jeremy@autobuilderos.com | ai@autobuilderos.com

export const maxDuration = 30;
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const OPENAI_KEY = process.env.OPENAI_API_KEY ?? "";

// ── The 7 types of input the machine accepts ─────────────────────────────
export type IdeaInputType =
  | "raw_thought"      // "I want to build something that..."
  | "url"              // Drop a URL → clone/analyze/benchmark it
  | "document"         // Paste a doc, spec, or vision
  | "desire"           // "I want to make $X/month doing Y"
  | "problem"          // "My customers can't do X"
  | "opportunity"      // "I found a market gap in Y"
  | "command"          // "Build me a [type] for [client]"

// ── The output types AUTO_BUILDER can produce ────────────────────────────
export type BuildOutputType =
  | "website"          // Full production website
  | "city_site"        // One of 70 city replication sites  
  | "ai_agent"         // Standalone AI agent/assistant
  | "automation"       // Workflow / cron / pipeline
  | "intelligence"     // Competitor/market research system
  | "content_machine"  // Social + SEO content factory
  | "client_portal"    // Client delivery dashboard
  | "consulting_pack"  // PDF + strategy + brand pack
  | "ecommerce"        // Shopify / store
  | "data_system"      // Database / analytics / reporting
  | "unknown"          // AI will classify

async function parseIdeaWithAI(rawInput: string, inputType: IdeaInputType): Promise<{
  title: string;
  output_type: BuildOutputType;
  description: string;
  target_audience: string;
  revenue_model: string;
  estimated_value: number;
  feasibility_score: number;
  priority_score: number;
  tags: string[];
  suggested_first_action: string;
}> {
  if (!OPENAI_KEY) {
    // Fallback: basic parse without AI
    return {
      title: rawInput.slice(0, 60),
      output_type: "unknown",
      description: rawInput,
      target_audience: "to be determined",
      revenue_model: "to be determined",
      estimated_value: 0,
      feasibility_score: 70,
      priority_score: 5,
      tags: ["idea", inputType],
      suggested_first_action: "Run discovery to analyze the opportunity",
    };
  }

  const prompt = `You are an enterprise AI business analyst for AutoBuilder OS.
A human or AI has submitted the following ${inputType}:

"${rawInput.slice(0, 2000)}"

Parse this into a structured business idea. Respond ONLY with valid JSON matching this schema:
{
  "title": "short memorable title (max 60 chars)",
  "output_type": "one of: website|city_site|ai_agent|automation|intelligence|content_machine|client_portal|consulting_pack|ecommerce|data_system|unknown",
  "description": "1-2 sentences of what this builds and why",
  "target_audience": "who benefits from this",
  "revenue_model": "how this makes money (be specific)",
  "estimated_value": number (estimated annual revenue potential in USD, be realistic),
  "feasibility_score": number 0-100 (how buildable with current stack),
  "priority_score": number 1-10 (10 = highest revenue impact fastest),
  "tags": ["array", "of", "relevant", "tags"],
  "suggested_first_action": "the single best next step to validate this idea"
}`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const data = await res.json() as { choices: Array<{ message: { content: string } }> };
    return JSON.parse(data.choices[0].message.content);
  } catch(e) {
    return {
      title: rawInput.slice(0, 60),
      output_type: "unknown",
      description: rawInput.slice(0, 200),
      target_audience: "TBD",
      revenue_model: "TBD",
      estimated_value: 0,
      feasibility_score: 70,
      priority_score: 5,
      tags: ["idea", inputType],
      suggested_first_action: "Run discovery pipeline",
    };
  }
}

async function simulate(parsed: {
  title: string; output_type: string; feasibility_score: number;
  priority_score: number; estimated_value: number;
}): Promise<{
  can_build: boolean;
  estimated_hours: number;
  estimated_cost_usd: number;
  revenue_year_1: number;
  revenue_year_3: number;
  roi_score: number;
  confidence: "high" | "medium" | "low";
  blockers: string[];
  fast_path: boolean;
}> {
  const feasible = parsed.feasibility_score >= 60;
  const fast_path = parsed.feasibility_score >= 80 && parsed.priority_score >= 7;
  const hours = fast_path ? 4 : feasible ? 24 : 72;
  const cost = hours * 0; // AI does the work — no hourly cost
  const rev1 = parsed.estimated_value * 0.3;
  const rev3 = parsed.estimated_value * 1.2;
  const roi = rev1 > 0 ? Math.min(99, Math.round((rev1 / Math.max(cost, 1)) * 100)) : 0;

  return {
    can_build: feasible,
    estimated_hours: hours,
    estimated_cost_usd: cost,
    revenue_year_1: Math.round(rev1),
    revenue_year_3: Math.round(rev3),
    roi_score: roi,
    confidence: parsed.feasibility_score >= 80 ? "high" : parsed.feasibility_score >= 60 ? "medium" : "low",
    blockers: feasible ? [] : ["feasibility_score_below_threshold", "needs_more_discovery"],
    fast_path,
  };
}

export async function POST(req: NextRequest) {
  let body: {
    raw_input: string;
    input_type?: IdeaInputType;
    submitted_by?: string;
    project?: string;
    auto_queue?: boolean;    // if true, immediately queue to AUTO_BUILDER pipeline
    priority_override?: number;
  };
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { raw_input, input_type = "raw_thought", submitted_by = "human", auto_queue = true } = body;
  if (!raw_input?.trim()) {
    return NextResponse.json({ ok: false, error: "raw_input is required" }, { status: 422 });
  }

  const idea_id = `IDEA-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
  const timestamp = new Date().toISOString();

  // Parse with AI
  const parsed = await parseIdeaWithAI(raw_input, input_type);
  const simulation = await simulate(parsed);

  const priority = body.priority_override ?? parsed.priority_score;

  // Write to Supabase idea_queue
  if (SUPABASE_URL && SUPABASE_KEY) {
    await fetch(`${SUPABASE_URL}/rest/v1/idea_queue`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`,
                 "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({
        idea_id,
        raw_input: raw_input.slice(0, 5000),
        input_type,
        title: parsed.title,
        output_type: parsed.output_type,
        description: parsed.description,
        target_audience: parsed.target_audience,
        revenue_model: parsed.revenue_model,
        estimated_value: parsed.estimated_value,
        feasibility_score: parsed.feasibility_score,
        priority_score: priority,
        roi_score: simulation.roi_score,
        can_build: simulation.can_build,
        fast_path: simulation.fast_path,
        simulation: simulation,
        tags: parsed.tags,
        suggested_first_action: parsed.suggested_first_action,
        submitted_by,
        project: body.project ?? "AutoBuilder OS",
        status: simulation.can_build ? (auto_queue ? "queued" : "draft") : "blocked",
        auto_queued: auto_queue && simulation.can_build,
        created_at: timestamp,
      }),
    }).catch(() => null);

    // If auto_queue, also push to discovery pipeline
    if (auto_queue && simulation.can_build) {
      await fetch(`${SUPABASE_URL}/rest/v1/pipeline_discovery_queue`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`,
                   "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({
          discovery_id: `DISC-${idea_id}`,
          target_url: raw_input.startsWith("http") ? raw_input.split(" ")[0] : `idea://${idea_id}`,
          target_name: parsed.title,
          target_type: parsed.output_type === "website" ? "website" : "own_system",
          purpose: "opportunity_score",
          triggered_by: submitted_by === "human" ? "operator" : "agent_zero",
          project: body.project ?? "AutoBuilder OS",
          priority: priority,
          strict_score_threshold: simulation.fast_path ? 70 : 80,
          notes: parsed.description,
          status: "queued",
          stage: "discovery",
        }),
      }).catch(() => null);
    }
  }

  return NextResponse.json({
    ok: true,
    idea_id,
    title: parsed.title,
    output_type: parsed.output_type,
    description: parsed.description,
    simulation: {
      can_build: simulation.can_build,
      fast_path: simulation.fast_path,
      estimated_hours: simulation.estimated_hours,
      revenue_year_1: simulation.revenue_year_1,
      revenue_year_3: simulation.revenue_year_3,
      roi_score: simulation.roi_score,
      confidence: simulation.confidence,
      blockers: simulation.blockers,
    },
    suggested_first_action: parsed.suggested_first_action,
    status: simulation.can_build ? (auto_queue ? "queued_to_pipeline" : "draft") : "blocked",
    pipeline_queued: auto_queue && simulation.can_build,
    message: simulation.fast_path
      ? `🚀 Fast path detected. "${parsed.title}" is queued for immediate build.`
      : simulation.can_build
      ? `✅ "${parsed.title}" is feasible and queued for discovery.`
      : `⚠️ "${parsed.title}" needs more information before building.`,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "BUSINESS-BUILDER Idea Engine",
    description: "The front of the machine. Any thought, dream, desire, or vision → structured build job.",
    accepts: {
      raw_thought: "I want to build something that...",
      url: "https://competitor.com → analyze and benchmark",
      document: "Paste any spec, vision, or strategy doc",
      desire: "I want to make $50k/month helping contractors",
      problem: "My customers can't get quotes fast enough",
      opportunity: "No one has built an AI epoxy floor visualizer",
      command: "Build me a city site for Dallas Texas",
    },
    output_types: ["website","city_site","ai_agent","automation","intelligence","content_machine","client_portal","consulting_pack","ecommerce","data_system"],
    auto_queue: true,
    simulation: "Every idea is simulated before queueing",
  });
}
