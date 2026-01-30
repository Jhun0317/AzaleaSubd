import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* This is the ONLY sidebar we are keeping */}
      <Sidebar />

      <main className="flex-1">
        {/* Your content (like Payments) will appear here */}
        {children}
      </main>
    </div>
  );
}