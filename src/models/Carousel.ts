import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICarousel extends Document {
    title: string;
    subtitle?: string;
    cta?: string;
    layout: 'norman' | 'found' | 'measured' | 'centered';
    image: string;
    mobileImage?: string;
    order: number;
    status: 'active' | 'draft';
    createdAt: Date;
    updatedAt: Date;
}

const CarouselSchema = new Schema<ICarousel>(
    {
        title: { type: String, required: true },
        subtitle: { type: String },
        cta: { type: String },
        layout: {
            type: String,
            required: true,
            enum: ['norman', 'found', 'measured', 'centered']
        },
        image: { type: String, required: true },
        mobileImage: { type: String },
        order: { type: Number, default: 0 },
        status: {
            type: String,
            required: true,
            enum: ['active', 'draft'],
            default: 'active'
        },
    },
    { timestamps: true }
);

const Carousel: Model<ICarousel> = mongoose.models.Carousel || mongoose.model<ICarousel>('Carousel', CarouselSchema);

export default Carousel;
