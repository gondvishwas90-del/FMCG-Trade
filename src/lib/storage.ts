import * as Minio from 'minio';

const isProd = process.env.NODE_ENV === 'production';

export const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9100'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
  secretKey: process.env.MINIO_SECRET_KEY || 'password',
});

export const BUCKET_NAME = process.env.MINIO_BUCKET || 'fmcg-media';

// Helper to ensure bucket exists
export async function ensureBucket() {
  const exists = await minioClient.bucketExists(BUCKET_NAME);
  if (!exists) {
    await minioClient.makeBucket(BUCKET_NAME);
    // Set public read policy
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetBucketLocation", "s3:ListBucket"],
          Resource: [`arn:aws:s3:::${BUCKET_NAME}`],
        },
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
        },
      ],
    };
    await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
  }
}

export async function uploadFile(
  file: Buffer | string | ReadableStream,
  fileName: string,
  folder: string = ""
) {
  await ensureBucket();
  const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
  const cleanFileName = fileName.replace(/^\/+/g, '');
  const filePath = cleanFolder ? `${cleanFolder}/${cleanFileName}` : cleanFileName;
  
  let buffer: Buffer;
  if (Buffer.isBuffer(file)) {
    buffer = file;
  } else if (typeof file === 'string') {
    buffer = Buffer.from(file, 'base64');
  } else {
    // Handle ReadableStream if needed
    const chunks = [];
    const reader = (file as any).getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    buffer = Buffer.concat(chunks);
  }

  await minioClient.putObject(BUCKET_NAME, filePath, buffer);
  
  // Construct the public URL
  const endPoint = process.env.MINIO_PUBLIC_ENDPOINT || `https://${process.env.MINIO_ENDPOINT}`;
  return `${endPoint.replace(/\/$/, '')}/${BUCKET_NAME}/${filePath}`;
}
