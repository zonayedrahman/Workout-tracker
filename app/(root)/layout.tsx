import Navbar from "@/components/Navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-full bg-secondary ">
            <Navbar />
            {children}
            <div className="h-screen"></div>
        </main>
    );
}
