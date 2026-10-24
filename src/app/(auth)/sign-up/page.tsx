import { AuthLayout } from "@/components/pages/auth/components/AuthLayout";
import { SignUpForm } from "@/components/pages/auth/components/SignUpForm";

export default function SignUpPage() {
    return (
        <AuthLayout
            heroTitle="Join Network"
            heroSubtitle="Trade Partnership"
            sidebarTitle="Become a Partner"
            sidebarDescription="Apply for a trade account to unlock wholesale pricing, volume discounts, and global distribution."
            sidebarFeatures={[
                "Instant Catalogue Access",
                "Volume & Trade Discounts",
                "Global Logistics Support"
            ]}
        >
            <SignUpForm />
        </AuthLayout>
    );
}
