export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#F2F3F5] p-8 flex justify-center">
            <div className="max-w-4xl w-full space-y-6">{children}</div>
        </div>
    );
}