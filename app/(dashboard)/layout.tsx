import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* This is the ONLY sidebar code allowed */}
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-white">
        {/* Everything else, including that middle menu, is removed from here */}
        {children}
      </main>
    </div>
  );
}