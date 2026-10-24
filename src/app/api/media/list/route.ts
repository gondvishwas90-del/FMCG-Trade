import { NextResponse } from 'next/server';
import { minioClient, BUCKET_NAME } from '@/lib/storage';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder') || '';
  
  try {
    const objects: any[] = [];
    const stream = minioClient.listObjectsV2(BUCKET_NAME, folder, true);

    for await (const obj of stream) {
      if (obj.name) {
        const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http';
        const host = process.env.MINIO_ENDPOINT;
        const port = process.env.MINIO_PORT;
        
        // Construct the public URL
        // In production, port might be 443 (hidden)
        const baseUrl = port === '443' || port === '80' 
            ? `${protocol}://${host}` 
            : `${protocol}://${host}:${port}`;
            
        objects.push({
          name: obj.name.split('/').pop(),
          filePath: obj.name,
          url: `${baseUrl}/${BUCKET_NAME}/${obj.name}`,
          size: obj.size,
          updatedAt: obj.lastModified,
          fileType: obj.name.split('.').pop()
        });
      }
    }

    return NextResponse.json(objects);
  } catch (error: any) {
    console.error('MinIO List Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
