export default function AuthRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout is minimal because AuthLayout (component) handles the heavy lifting.
    // We can add route-specific metadata or context providers here if needed.
    return (
        <>
            {children}
        </>
    );
}
