/**
 * Type definitions for contact form
 */
export interface FormData {
    name: string;
    email: string;
    company: string;
    phone: string;
    subject: string;
    message: string;
}

export interface FormOption {
    value: string;
    label: string;
}
