import { NextResponse } from 'next/server';
import { getGalleryImages, saveGalleryImage, deleteGalleryImage } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const gallery = await getGalleryImages();
  return NextResponse.json(gallery);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.title || !body.category || !body.image_url) {
      return NextResponse.json({ error: 'Title, category, and image URL are required' }, { status: 400 });
    }
    const saved = await saveGalleryImage(body);
    return NextResponse.json({ success: true, image: saved });
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

  await deleteGalleryImage(id);
  return NextResponse.json({ success: true });
}
