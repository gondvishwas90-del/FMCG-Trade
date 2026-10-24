import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import Category from '@/models/Category';

export async function GET() {
    try {
        const startTime = Date.now();
        await dbConnect();
        
        const readyState = mongoose.connection.readyState;
        const readyStateMap = ['disconnected', 'connected', 'connecting', 'disconnecting'];

        const activeCategoriesCount = await Category.countDocuments({ status: 'active' });
        const totalCategoriesCount = await Category.countDocuments({});

        return NextResponse.json(
            { 
                status: "ok",
                database: {
                    connected: readyState === 1,
                    readyState: readyStateMap[readyState] || readyState,
                    pingMs: Date.now() - startTime,
                    activeCategories: activeCategoriesCount,
                    totalCategories: totalCategoriesCount,
                },
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV
            }, 
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Health check database error:", error);
        return NextResponse.json(
            {
                status: "error",
                database: {
                    connected: false,
                    error: error.message || String(error),
                    hasMongodbUri: !!process.env.MONGODB_URI,
                },
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV
            },
            { status: 500 }
        );
    }
}
