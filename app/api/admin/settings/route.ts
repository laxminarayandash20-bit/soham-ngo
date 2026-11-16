import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db';
import { getCurrentAdmin, isSuperAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    // Only super_admin can toggle maintenance mode or change Formspree keys
    if ((body.maintenance_mode !== undefined || body.formspree_contact_id !== undefined) && !isSuperAdmin(admin.role)) {
      return NextResponse.json(
        { error: 'Only Super Administrators can modify sensitive system settings.' },
        { status: 403 }
      );
    }

    const updated = await updateSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}
