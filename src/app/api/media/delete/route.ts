import { NextResponse } from 'next/server';
import { minioClient, BUCKET_NAME } from '@/lib/storage';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('filePath');

    if (!filePath) {
      return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
    }

    await minioClient.removeObject(BUCKET_NAME, filePath);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('MinIO Delete Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
