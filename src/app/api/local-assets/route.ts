import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg"];

function getFilesRecursively(dir: string, baseDir: string): string[] {
    const results: string[] = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of list) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            results.push(...getFilesRecursively(fullPath, baseDir));
        } else {
            const ext = path.extname(item.name).toLowerCase();
            if (IMAGE_EXTENSIONS.includes(ext)) {
                // Convert to relative URL from public root
                const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
                results.push("/" + relativePath);
            }
        }
    }

    return results;
}

export async function GET() {
    try {
        const publicDir = path.join(process.cwd(), "public");
        
        if (!fs.existsSync(publicDir)) {
            return NextResponse.json({ error: "Public directory not found" }, { status: 404 });
        }

        const assets = getFilesRecursively(publicDir, publicDir);
        
        // Sorting alphabetically for better UX
        assets.sort((a, b) => a.localeCompare(b));

        return NextResponse.json(assets);
    } catch (error: any) {
        console.error("Local assets list error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to list local assets" },
            { status: 500 }
        );
    }
}
