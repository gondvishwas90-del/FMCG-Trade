import mongoose, { Schema, model, models } from 'mongoose';

export interface ICategoryTier3 {
    id: string;
    name: string;
    image: string;
    mobileImage?: string;
    mobileBackgroundImage?: string;
    description: string;
}

export interface ICategoryTier2 {
    id: string;
    name: string;
    image: string;
    mobileImage?: string;
    mobileBackgroundImage?: string;
    description: string;
    tier3: ICategoryTier3[];
}

export interface ICategory {
    _id?: string;
    id: string; // The slug (e.g. 'spirits')
    name: string;
    image: string;
    mobileImage?: string;
    mobileBackgroundImage?: string;
    descriptor: string;
    tradeGuidance: string;
    gridArea: string;
    isTrending?: boolean;
    isNew?: boolean;
    isGlobal?: boolean;
    status: 'active' | 'draft';
    tier2: ICategoryTier2[];
    createdAt?: Date;
    updatedAt?: Date;
}

const CategoryTier3Schema = new Schema<ICategoryTier3>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    mobileImage: { type: String, default: '' },
    mobileBackgroundImage: { type: String, default: '' },
    description: { type: String, default: '' },
}, { _id: false });

const CategoryTier2Schema = new Schema<ICategoryTier2>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    mobileImage: { type: String, default: '' },
    mobileBackgroundImage: { type: String, default: '' },
    description: { type: String, default: '' },
    tier3: { type: [CategoryTier3Schema], default: [] },
}, { _id: false });

const CategorySchema = new Schema<ICategory>(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        mobileImage: { type: String, default: '' },
        mobileBackgroundImage: { type: String, default: '' },
        descriptor: { type: String, default: '' },
        tradeGuidance: { type: String, default: '' },
        gridArea: { type: String, default: '' },
        isTrending: { type: Boolean, default: false },
        isNew: { type: Boolean, default: false },
        isGlobal: { type: Boolean, default: false },
        status: { type: String, enum: ['active', 'draft'], default: 'active' },
        tier2: { type: [CategoryTier2Schema], default: [] },
    },
    { 
        timestamps: true,
        suppressReservedKeysWarning: true
    }
);

if (mongoose.models.Category) {
    delete mongoose.models.Category;
}
const Category = model<ICategory>('Category', CategorySchema);

export default Category;
