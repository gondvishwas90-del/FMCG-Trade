import type { ReactNode } from "react";
import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayoutClient } from "./_components/AdminLayoutClient";

export const dynamic = "force-dynamic";

interface LayoutProps {
    children: ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
    const session = await verifySession();

    if (!session) {
        redirect("/login");
    }

    return (
        <AdminLayoutClient role={session.role} email={session.email}>
            {children}
        </AdminLayoutClient>
    );
}
