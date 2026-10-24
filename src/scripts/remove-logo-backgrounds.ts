import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function removeBackgrounds() {
    const inputDir = path.join(process.cwd(), 'Brand Owners Logos');
    const outputDir = path.join(process.cwd(), 'Brand Owners Logos', 'transparent');

    if (!fs.existsSync(inputDir)) {
        console.error(`Input directory does not exist: ${inputDir}`);
        process.exit(1);
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp') && !f.startsWith('transparent');
    });

    console.log(`Found ${files.length} logo images to process in "${inputDir}"`);

    let processedCount = 0;

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, path.basename(file, path.extname(file)) + '.png');

        try {
            const { data, info } = await sharp(inputPath)
                .ensureAlpha()
                .raw()
                .toBuffer({ resolveWithObject: true });

            const { width, height, channels } = info;
            const pixelBuffer = Buffer.from(data);

            // Determine corner background color (sample top-left 5x5 pixels)
            let sumR = 0, sumG = 0, sumB = 0, sampleCount = 0;
            for (let y = 0; y < Math.min(10, height); y++) {
                for (let x = 0; x < Math.min(10, width); x++) {
                    const idx = (y * width + x) * channels;
                    sumR += pixelBuffer[idx];
                    sumG += pixelBuffer[idx + 1];
                    sumB += pixelBuffer[idx + 2];
                    sampleCount++;
                }
            }
            const bgR = Math.round(sumR / sampleCount);
            const bgG = Math.round(sumG / sampleCount);
            const bgB = Math.round(sumB / sampleCount);

            // Process pixels to remove background matching corner background color or white/near-white
            for (let i = 0; i < pixelBuffer.length; i += channels) {
                const r = pixelBuffer[i];
                const g = pixelBuffer[i + 1];
                const b = pixelBuffer[i + 2];

                // Check distance to corner background color
                const bgDist = Math.sqrt(
                    Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2)
                );

                // Check general whiteness (light background)
                const brightness = (r + g + b) / 3;
                const colorDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
                const isWhiteBg = brightness > 238 && colorDiff < 18;

                if (bgDist < 35 || isWhiteBg) {
                    // Fully transparent
                    pixelBuffer[i + 3] = 0;
                } else if (bgDist < 60 || (brightness > 215 && colorDiff < 25)) {
                    // Smooth edge anti-aliasing to prevent white halos
                    const alphaFactor = Math.min(1, Math.max(0, (bgDist - 35) / 25));
                    pixelBuffer[i + 3] = Math.round(alphaFactor * 255);
                }
            }

            // Save processed PNG file
            await sharp(pixelBuffer, {
                raw: {
                    width,
                    height,
                    channels
                }
            })
            .png({ compressionLevel: 9 })
            .toFile(outputPath);

            console.log(`✅ Processed: "${file}" -> "transparent/${path.basename(outputPath)}"`);
            processedCount++;
        } catch (err: any) {
            console.error(`❌ Error processing "${file}":`, err.message);
        }
    }

    console.log(`\n🎉 Successfully processed ${processedCount}/${files.length} logos! Transparent images saved to:\n"${outputDir}"`);
}

removeBackgrounds();
