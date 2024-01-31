import Navbar from "@/components/Navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-screen bg-secondary ">
            <Navbar />
            {children}
        </main>
    );
}
