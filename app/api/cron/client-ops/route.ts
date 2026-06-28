import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')
  const expected = process.env.CRON_SECRET
  if (!expected || auth !== `Bearer ${expected}`) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  return NextResponse.json({ status: 'ok', mode: 'safe_check_only', checks: ['queues','approvals','validation','receipts'] })
}
