import { NextResponse } from 'next/server'

export async function POST() { return NextResponse.json({ status: 'draft_only', message: 'Preview-safe route. Live actions require approval.' }) }
export async function GET() { return NextResponse.json({ status: 'ok', mode: 'preview' }) }
