import { NextRequest, NextResponse } from "next/server";

// BUSINESS-BUILDER — /api/queue
// Real-time view of the idea queue + build queue + pipeline status

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

async function sbGet(path: string) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  return res.ok ? res.json() : [];
}

export async function GET(req: NextRequest) {
  const [ideas, builds, pipeline, auditResults] = await Promise.all([
    sbGet("idea_queue?select=idea_id,title,output_type,priority_score,status,estimated_value,created_at&order=priority_score.desc&limit=20"),
    sbGet("build_queue?select=job_id,title,output_type,status,qa_score,preview_url&order=priority.desc&limit=10"),
    sbGet("pipeline_discovery_queue?select=discovery_id,target_name,status,stage,analysis_score,qa_score&order=created_at.desc&limit=10"),
    sbGet("pipeline_audit_results?select=target_name,overall_score,passed&order=created_at.desc&limit=5"),
  ]);

  const ideasByStatus = (ideas as Array<{status: string}>).reduce((acc: Record<string,number>, i) => {
    acc[i.status] = (acc[i.status] ?? 0) + 1; return acc;
  }, {});
  const totalPipelineValue = (ideas as Array<{estimated_value: number}>).reduce((s, i) => s + (i.estimated_value ?? 0), 0);

  return NextResponse.json({
    ok: true,
    summary: {
      total_ideas: (ideas as unknown[]).length,
      total_builds: (builds as unknown[]).length,
      total_pipeline_value_usd: totalPipelineValue,
      ideas_by_status: ideasByStatus,
    },
    ideas,
    builds,
    pipeline,
    recent_audits: auditResults,
    timestamp: new Date().toISOString(),
  });
}
