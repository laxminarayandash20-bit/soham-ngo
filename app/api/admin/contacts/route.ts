import { NextResponse } from 'next/server';
import { getContactSubmissions, updateContactStatus, deleteContactSubmission } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');
  const contacts = await getContactSubmissions();

  if (format === 'csv') {
    // Generate CSV
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Internal Notes', 'Date'];
    const rows = contacts.map(c => [
      `"${c.id}"`,
      `"${c.full_name.replace(/"/g, '""')}"`,
      `"${c.email.replace(/"/g, '""')}"`,
      `"${(c.phone || '').replace(/"/g, '""')}"`,
      `"${c.subject.replace(/"/g, '""')}"`,
      `"${c.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${c.status}"`,
      `"${(c.internal_notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${new Date(c.created_at).toLocaleDateString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="soham_ngo_contacts_${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  }

  return NextResponse.json(contacts);
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

    const updated = await updateContactStatus(id, status, internal_notes);
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

  await deleteContactSubmission(id);
  return NextResponse.json({ success: true });
}
