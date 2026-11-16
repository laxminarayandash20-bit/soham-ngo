import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const stats = await getDashboardStats();
  return NextResponse.json(stats);
}
