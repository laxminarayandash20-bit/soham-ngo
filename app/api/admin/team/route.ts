import { NextResponse } from 'next/server';
import { getTeamMembers, saveTeamMember, deleteTeamMember } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const team = await getTeamMembers();
  return NextResponse.json(team);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.name || !body.designation || !body.photo_url) {
      return NextResponse.json({ error: 'Name, designation, and photo URL are required' }, { status: 400 });
    }
    const saved = await saveTeamMember(body);
    return NextResponse.json({ success: true, member: saved });
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

  await deleteTeamMember(id);
  return NextResponse.json({ success: true });
}
