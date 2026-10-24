"use client";

import { LegalLayout } from "@/components/pages/legal/components/LegalLayout";
import { Shield } from "lucide-react";
import { PRIVACY_SECTIONS } from "@/components/pages/legal/data/privacy.data";

export default function PrivacyPolicyPage() {
    return (
        <LegalLayout
            title="Privacy Policy"
            lastUpdated="May 5, 2018"
            sections={PRIVACY_SECTIONS}
            icon={<Shield className="w-6 h-6" />}
        >
            <p>
                At FMCG Exchange, we are committed to protecting your privacy and ensuring the security of your personal information.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>
        </LegalLayout>
    );
}
