import { NextResponse } from 'next/server';
import { minioClient, BUCKET_NAME, ensureBucket } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    await ensureBucket();
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || '';
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name.replace(/^\/+/g, '');
    
    // Strip leading and trailing slashes from folder to avoid double slashes and invalid object keys
    const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
    const filePath = cleanFolder ? `${cleanFolder}/${fileName}` : fileName;

    await minioClient.putObject(BUCKET_NAME, filePath, buffer, buffer.length, {
      'Content-Type': file.type || 'image/jpeg',
    });

    const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http';
    const host = process.env.MINIO_ENDPOINT;
    const port = process.env.MINIO_PORT;
    const baseUrl = port === '443' || port === '80' 
        ? `${protocol}://${host}` 
        : `${protocol}://${host}:${port}`;

    const publicUrl = `${baseUrl}/${BUCKET_NAME}/${filePath}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filePath: filePath
    });
  } catch (error: any) {
    console.error('MinIO Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
