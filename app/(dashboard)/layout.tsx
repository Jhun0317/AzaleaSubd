import Providers from "../providers";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/ui/DashboardShell";
import { getAuthUser } from "../lib/auth"; 

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // THIS LINE WAS MISSING OR BROKEN:
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <Providers>
      {/* Now 'user' is defined, so this won't error anymore */}
      <DashboardShell isAdmin={user.role === "admin"}>
        {children}
      </DashboardShell>
    </Providers>
  );
}