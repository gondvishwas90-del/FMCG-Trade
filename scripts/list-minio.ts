import 'dotenv/config';
import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT || '9100'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
    secretKey: process.env.MINIO_SECRET_KEY || 'password',
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'fmcg-media';

async function list() {
    console.log(`Listing bucket: ${BUCKET_NAME}`);
    const stream = minioClient.listObjectsV2(BUCKET_NAME, '', true);
    let count = 0;
    for await (const obj of stream) {
        console.log(`- ${obj.name}`);
        count++;
        if (count > 20) break;
    }
    console.log('...');
}

list().catch(console.error);
