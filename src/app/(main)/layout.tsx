import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
         <SmoothScroll />
            <Navigation />
            {children}
            <Footer />
            <WhatsAppWidget />
        </>
    );
}
