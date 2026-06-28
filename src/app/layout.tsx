// BRIDGE: This file exists to prevent Next.js routing conflicts.
// The live app is served from /app/ (root) per enterprise-site-v2 structure.
// DO NOT add routes here — use /app/ directory instead.
export default function SrcLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
