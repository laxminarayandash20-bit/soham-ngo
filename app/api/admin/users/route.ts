import { NextResponse } from 'next/server';
import { getAdminUsers, saveAdminUser, deleteAdminUser } from '@/lib/db';
import { getCurrentAdmin, isSuperAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin || !isSuperAdmin(admin.role)) {
    return NextResponse.json({ error: 'Unauthorized: Super Admin access required' }, { status: 403 });
  }
  const users = await getAdminUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin || !isSuperAdmin(admin.role)) {
    return NextResponse.json({ error: 'Unauthorized: Super Admin access required' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email, password, full_name, role, is_active } = body;

    if (!email || !full_name || !role) {
      return NextResponse.json({ error: 'Email, full name, and role are required' }, { status: 400 });
    }

    const saved = await saveAdminUser({
      email,
      password,
      full_name,
      role,
      is_active
    });

    return NextResponse.json({ success: true, user: saved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin || !isSuperAdmin(admin.role)) {
    return NextResponse.json({ error: 'Unauthorized: Super Admin access required' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  // Prevent deleting oneself
  if (id === admin.id) {
    return NextResponse.json({ error: 'Cannot delete your own active admin account' }, { status: 400 });
  }

  await deleteAdminUser(id);
  return NextResponse.json({ success: true });
}
