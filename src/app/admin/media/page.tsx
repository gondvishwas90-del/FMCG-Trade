import MediaManager from "./_components/MediaManager";

export const metadata = {
    title: "Media Management | Admin",
    description: "Manage your MinIO assets and organized folders.",
};

export default function MediaPage() {
    return (
        <div className="flex-1 flex flex-col overflow-hidden h-[calc(100vh-64px)]">
            <MediaManager />
        </div>
    );
}
