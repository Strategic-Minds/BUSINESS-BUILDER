import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    steps: [
      { gate: 1, label: "Discovery & Brand",  status: "active"   },
      { gate: 2, label: "Site Build",          status: "pending"  },
      { gate: 3, label: "Automations",         status: "pending"  },
      { gate: 4, label: "Launch & SEO",        status: "pending"  },
    ],
  });
}
