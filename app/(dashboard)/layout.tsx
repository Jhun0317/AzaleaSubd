import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* This is the ONLY sidebar that should exist */}
      <div className="w-72 hidden lg:block border-r bg-white">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}