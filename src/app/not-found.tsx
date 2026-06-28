import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-sm uppercase tracking-widest text-[#F6B800] mb-4">404</p>
      <h1 className="text-4xl font-black mb-4">Page Not Found</h1>
      <p className="text-gray-400 mb-8">This page doesn't exist or has been moved.</p>
      <Link href="/" className="px-6 py-3 rounded-lg bg-[#F6B800] text-black font-bold hover:bg-[#D4A000] transition-colors">
        Back to Home
      </Link>
    </main>
  );
}
