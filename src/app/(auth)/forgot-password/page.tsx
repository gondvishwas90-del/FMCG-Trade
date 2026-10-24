import { AuthLayout } from "@/components/pages/auth/components/AuthLayout";
import { ForgotPasswordForm } from "@/components/pages/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <AuthLayout
            heroTitle="Account Recovery"
            heroSubtitle="Secure Reset"
            sidebarTitle="Reset Access"
            sidebarDescription="Don't worry, it happens to the best of us. We'll help you recover your account access securely."
            sidebarFeatures={[
                "Secure Verification",
                "Instant Reset Link",
                "24/7 Account Support"
            ]}
        >
            <ForgotPasswordForm />
        </AuthLayout>
    );
}
