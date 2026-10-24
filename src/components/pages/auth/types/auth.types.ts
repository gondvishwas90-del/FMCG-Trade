export interface SignInData {
    email: string;
    password: string;
}

export interface SignUpData {
    name: string;
    email: string;
    company?: string;
    password: string;
}

export interface ForgotPasswordData {
    email: string;
}
