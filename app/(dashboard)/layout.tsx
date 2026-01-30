import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* This sidebar is fixed to the left */}
      <div className="hidden lg:block w-72 fixed h-full">
         <Sidebar />
      </div>
      
      {/* Main Content Area starts after the sidebar width */}
      <main className="flex-1 lg:ml-72 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}