import { AuthLayout } from "@/components/pages/auth/components/AuthLayout";
import { SignInForm } from "@/components/pages/auth/components/SignInForm";

export default function SignInPage() {
    return (
        <AuthLayout
            heroTitle="Secure Portal"
            heroSubtitle="Client Access"
            sidebarTitle="Welcome Back"
            sidebarDescription="Access your trade dashboard, view real-time inventory, and manage your orders securely."
            sidebarFeatures={[
                "Real-time Order Tracking",
                "Exclusive Trade Pricing",
                "Priority Support Access"
            ]}
        >
            <SignInForm />
        </AuthLayout>
    );
}
