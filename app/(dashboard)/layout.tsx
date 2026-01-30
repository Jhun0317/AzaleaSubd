// app/(dashboard)/layout.tsx
import Providers from "../providers";
import DashboardShell from "@/components/ui/DashboardShell";
// ... (ensure your auth logic is here)

export default async function DashboardLayout({ children }) {
  return (
    <Providers>
      <DashboardShell isAdmin={user.role === "admin"}>
        {children} 
      </DashboardShell>
    </Providers>
  );
}