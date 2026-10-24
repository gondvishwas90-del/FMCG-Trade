import { ENQUIRY_TEMPLATES } from "./enquiry-config";

export interface EnquiryData {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    [key: string]: string;
}

export interface EmailTemplate {
    subject: string;
    generateHtml: (data: EnquiryData) => string;
}

export const emailTemplates: Record<string, EmailTemplate> = Object.entries(ENQUIRY_TEMPLATES).reduce((acc, [key, template]) => {
    acc[key] = {
        subject: template.subject,
        generateHtml: (data: EnquiryData) => {
            const text = template.generateText(data);
            return text
                .split('\n\n')
                .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
                .join('');
        }
    };
    return acc;
}, {} as Record<string, EmailTemplate>);

export const defaultTemplate: EmailTemplate = {
    subject: 'New Enquiry - FMCG Exchange',
    generateHtml: (data) => `
        <p>New enquiry received from the website:</p>
        <ul>
            <li><strong>Company Name:</strong> ${data.companyName}</li>
            <li><strong>Contact Person:</strong> ${data.contactPerson}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.phone}</li>
        </ul>
        <p>Details:</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `
};
