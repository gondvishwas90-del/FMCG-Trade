"use client";

import { LegalLayout } from "@/components/pages/legal/components/LegalLayout";
import { FileText } from "lucide-react";
import { TERMS_SECTIONS } from "@/components/pages/legal/data/terms.data";

export default function TermsPage() {
    return (
        <LegalLayout
            title="Terms of Service"
            lastUpdated="January 14, 2026"
            sections={TERMS_SECTIONS}
            icon={<FileText className="w-6 h-6" />}
        >
            <p>
                These Terms of Service ("Terms") govern your access to and use of FMCG Exchange's services.
                By accessing or using our services, you agree to be bound by these Terms.
                Please read them carefully ensuring you understand your rights and obligations.
            </p>
        </LegalLayout>
    );
}

