import { NextResponse } from 'next/server';
import transporter from '@/lib/email/transporter';
import { emailTemplates, defaultTemplate } from '@/lib/email/templates';
import { z } from 'zod';

const enquirySchema = z.object({
    templateId: z.string().optional(),
    companyName: z.string().min(1, 'Company name is required'),
    contactPerson: z.string().min(1, 'Contact person is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    // Template specific fields (optional as they vary)
    regionsOfInterest: z.string().optional(),
    productCategory: z.string().optional(),
    orderVolume: z.string().optional(),
    typeOfGoods: z.string().optional(),
    storageRequirements: z.string().optional(),
    exportDestinations: z.string().optional(),
    estimatedVolume: z.string().optional(),
    natureOfBusiness: z.string().optional(),
    regionsOfOperation: z.string().optional(),
    typeOfTransactions: z.string().optional(),
    complianceRequirements: z.string().optional(),
    stageOfDevelopment: z.string().optional(),
    targetMarkets: z.string().optional(),
    supportRequired: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = enquirySchema.parse(body);

        const templateId = validatedData.templateId || '';
        const template = emailTemplates[templateId] || defaultTemplate;

        const mailOptions = {
            from: `"${process.env.APP_NAME || 'FMCG Exchange'}" <${process.env.SMTP_USER}>`,
            // to: process.env.SMTP_USER, // Sending to the sales email
            to: process.env.SMTP_USER, // Sending to the sales email
            subject: template.subject,
            html: template.generateHtml(validatedData as any),
            replyTo: validatedData.email,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Enquiry sent successfully' });
    } catch (error) {
        console.error('Enquiry Error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, message: 'Validation failed', errors: error.issues }, { status: 400 });
        }

        return NextResponse.json({ success: false, message: 'Failed to send enquiry' }, { status: 500 });
    }
}
