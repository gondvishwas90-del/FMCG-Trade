import mongoose, { Schema, model, models } from 'mongoose';

export interface IBrandOwner {
    _id?: string;
    id: string; // slug
    name: string;
    logo: string;
    logoDark?: string;
    logoLight?: string;
    category?: string;
    description?: string;
    website?: string;
    country?: string;
    countryCode?: string;
    status: 'active' | 'draft';
    createdAt?: Date;
    updatedAt?: Date;
}

const BrandOwnerSchema = new Schema<IBrandOwner>(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        logo: { type: String, required: true },
        logoDark: { type: String, default: '' },
        logoLight: { type: String, default: '' },
        category: { type: String, default: '' },
        description: { type: String, default: '' },
        website: { type: String, default: '' },
        country: { type: String, default: '' },
        countryCode: { type: String, default: '' },
        status: { type: String, enum: ['active', 'draft'], default: 'active' },
    },
    { timestamps: true }
);

const BrandOwner = models.BrandOwner || model<IBrandOwner>('BrandOwner', BrandOwnerSchema);

export default BrandOwner;
