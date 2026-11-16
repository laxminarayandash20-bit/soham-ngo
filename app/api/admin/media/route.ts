import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getMediaItems, saveMediaItem, deleteMediaItem } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const media = await getMediaItems();
  return NextResponse.json(media);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const contentType = request.headers.get('content-type') || '';
    
    // Check if multipart form data or json
    if (contentType.includes('application/json')) {
      const body = await request.json();
      const { filename, original_name, mime_type, size_bytes, url, alt_text, category, base64Data } = body;

      let finalUrl = url;

      if (base64Data && base64Data.startsWith('data:')) {
        // Save base64 data to public/uploads directory
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const extension = matches[1].split('/')[1] || 'png';
          const safeName = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 6)}.${extension}`;
          const filePath = path.join(uploadsDir, safeName);
          const buffer = Buffer.from(matches[2], 'base64');
          fs.writeFileSync(filePath, buffer);
          finalUrl = `/uploads/${safeName}`;
        }
      }

      const item = await saveMediaItem({
        filename: filename || 'file',
        original_name: original_name || 'file',
        mime_type: mime_type || 'image/jpeg',
        size_bytes: size_bytes || 1024,
        url: finalUrl,
        alt_text: alt_text || '',
        category: category || 'general'
      });

      return NextResponse.json({ success: true, item });
    } else {
      // Multipart form upload
      const formData = await request.formData();
      const file = formData.get('file') as File;
      const category = (formData.get('category') as string) || 'general';
      const alt_text = (formData.get('alt_text') as string) || '';

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const safeOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueName = `${Date.now()}_${safeOriginalName}`;
      const filePath = path.join(uploadsDir, uniqueName);
      fs.writeFileSync(filePath, buffer);

      const item = await saveMediaItem({
        filename: uniqueName,
        original_name: file.name,
        mime_type: file.type || 'application/octet-stream',
        size_bytes: file.size,
        url: `/uploads/${uniqueName}`,
        alt_text: alt_text || file.name,
        category
      });

      return NextResponse.json({ success: true, item });
    }
  } catch (error: any) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: error.message || 'Media upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  await deleteMediaItem(id);
  return NextResponse.json({ success: true });
}
