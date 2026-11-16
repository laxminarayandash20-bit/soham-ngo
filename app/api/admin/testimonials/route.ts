import { NextResponse } from 'next/server';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const testimonials = await getTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.name || !body.role || !body.quote) {
      return NextResponse.json({ error: 'Name, role, and quote are required' }, { status: 400 });
    }
    const saved = await saveTestimonial(body);
    return NextResponse.json({ success: true, testimonial: saved });
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

  await deleteTestimonial(id);
  return NextResponse.json({ success: true });
}
