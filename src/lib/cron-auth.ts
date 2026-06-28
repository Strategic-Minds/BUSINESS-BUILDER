export function authorizeCron(req: Request): boolean {
  const cronSecret = process.env.CRON_SECRET ?? "";
  if (!cronSecret || cronSecret.startsWith("PLACEHOLDER")) return false;
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${cronSecret}`;
}

export function cronUnauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
