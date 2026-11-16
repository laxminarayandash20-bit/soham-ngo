import { NextResponse } from 'next/server';
import { getActivities, saveActivity, deleteActivity } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const activities = await getActivities();
  return NextResponse.json(activities);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.title || !body.category || !body.summary || !body.description) {
      return NextResponse.json({ error: 'Title, category, summary, and description are required' }, { status: 400 });
    }
    const saved = await saveActivity(body);
    return NextResponse.json({ success: true, activity: saved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  await deleteActivity(id);
  return NextResponse.json({ success: true });
}
