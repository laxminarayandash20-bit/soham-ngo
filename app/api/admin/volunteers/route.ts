import { NextResponse } from 'next/server';
import { getVolunteerApplications, updateVolunteerStatus, deleteVolunteerApplication } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');
  const volunteers = await getVolunteerApplications();

  if (format === 'csv') {
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Address', 'Age', 'Occupation', 'Area of Interest', 'Skills', 'Availability', 'Motivation', 'Status', 'Internal Notes', 'Date'];
    const rows = volunteers.map(v => [
      `"${v.id}"`,
      `"${v.full_name.replace(/"/g, '""')}"`,
      `"${v.email.replace(/"/g, '""')}"`,
      `"${v.phone.replace(/"/g, '""')}"`,
      `"${(v.address || '').replace(/"/g, '""')}"`,
      `"${v.age || ''}"`,
      `"${(v.occupation || '').replace(/"/g, '""')}"`,
      `"${v.area_of_interest.replace(/"/g, '""')}"`,
      `"${(v.skills || '').replace(/"/g, '""')}"`,
      `"${(v.availability || '').replace(/"/g, '""')}"`,
      `"${v.motivation.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${v.status}"`,
      `"${(v.internal_notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${new Date(v.created_at).toLocaleDateString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="soham_ngo_volunteers_${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  }

  return NextResponse.json(volunteers);
}

export async function PUT(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, status, internal_notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const updated = await updateVolunteerStatus(id, status, internal_notes);
    return NextResponse.json({ success: true, submission: updated });
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

  await deleteVolunteerApplication(id);
  return NextResponse.json({ success: true });
}
