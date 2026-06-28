import { NextResponse } from "next/server";

const templates = {
  project_update: "Your Strategic Minds project update is ready. Open your portal to review: {{portal_link}}",
  mvp_ready: "Your MVP preview is ready for approval. Review here: {{mvp_link}}",
  proposal_ready: "Your business proposal is ready. Open it here: {{proposal_link}}"
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const templateKey = String(body.template || "project_update") as keyof typeof templates;
  const template = templates[templateKey] || templates.project_update;
  const link = String(body.link || "https://strategicminds.ai/client");
  return NextResponse.json({
    status: "preview_ready",
    channel: body.channel || "whatsapp",
    message: template.replace("{{portal_link}}", link).replace("{{mvp_link}}", link).replace("{{proposal_link}}", link),
    live_send: false
  });
}

export async function GET() {
  return NextResponse.json({ status: "ok", templates, live_send: false });
}
