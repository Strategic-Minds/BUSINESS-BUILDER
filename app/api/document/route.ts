import { NextRequest, NextResponse } from "next/server";

// BUSINESS-BUILDER — /api/document
// Ingest any document, workbook, vision, strategy, or brief
// Extracts ideas, queues them automatically

export const maxDuration = 30;
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const OPENAI_KEY = process.env.OPENAI_API_KEY ?? "";

async function extractIdeasFromDocument(content: string, docType: string): Promise<Array<{
  title: string; raw_input: string; output_type: string; priority_score: number; estimated_value: number;
}>> {
  if (!OPENAI_KEY || content.length < 50) return [];
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: `Extract up to 10 distinct buildable ideas from this ${docType}. For each, return JSON array:
[{ "title": "...", "raw_input": "...", "output_type": "website|automation|ai_agent|content_machine|ecommerce|unknown", "priority_score": 1-10, "estimated_value": 0 }]

Document content:
${content.slice(0, 4000)}

Return ONLY the JSON array.` }],
        temperature: 0.2,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const data = await res.json() as { choices: Array<{ message: { content: string } }> };
    const text = data.choices[0].message.content;
    const match = text.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    return [];
  } catch { return []; }
}

export async function POST(req: NextRequest) {
  let body: { content: string; title: string; doc_type?: string; project?: string; auto_extract?: boolean };
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { content, title, doc_type = "vision", project = "AutoBuilder OS", auto_extract = true } = body;
  if (!content?.trim() || !title?.trim()) {
    return NextResponse.json({ ok: false, error: "content and title required" }, { status: 422 });
  }

  const doc_id = `DOC-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
  let ideas_extracted = 0;

  // Extract ideas from document
  const ideas = auto_extract ? await extractIdeasFromDocument(content, doc_type) : [];
  ideas_extracted = ideas.length;

  // Write doc to vault
  if (SUPABASE_URL && SUPABASE_KEY) {
    const H = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`,
                "Content-Type": "application/json", Prefer: "return=minimal" };

    await fetch(`${SUPABASE_URL}/rest/v1/document_vault`, {
      method: "POST", headers: H,
      body: JSON.stringify({ doc_id, title, doc_type, content: content.slice(0, 10000),
        summary: content.slice(0, 200), tags: [doc_type, project.toLowerCase()],
        source: "api", linked_project: project, processed: ideas_extracted > 0,
        ideas_extracted }),
    }).catch(() => null);

    // Queue each extracted idea
    for (const idea of ideas) {
      const idea_id = `IDEA-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
      await fetch(`${SUPABASE_URL}/rest/v1/idea_queue`, {
        method: "POST", headers: H,
        body: JSON.stringify({ idea_id, raw_input: idea.raw_input ?? idea.title,
          input_type: "document", title: idea.title, output_type: idea.output_type ?? "unknown",
          description: idea.raw_input, estimated_value: idea.estimated_value ?? 0,
          feasibility_score: 75, priority_score: idea.priority_score ?? 5,
          submitted_by: "document_extractor", project, status: "queued", auto_queued: true }),
      }).catch(() => null);
    }
  }

  return NextResponse.json({
    ok: true, doc_id, title, doc_type, ideas_extracted,
    ideas: ideas.map(i => ({ title: i.title, output_type: i.output_type, priority: i.priority_score })),
    message: ideas_extracted > 0
      ? `Extracted ${ideas_extracted} ideas from document and queued them for building.`
      : "Document stored. No buildable ideas extracted automatically.",
  });
}
